# MoviSabio Intelligence Portal Subpath Routing Architecture

**Document ID:** `MOVI-ARCH-2026-03`  
**Phase:** 2 Architecture Implementation Preparation  
**Target URL:** `www.movisabio.com/intelligence/`  
**Corporate Website Baseline:** `www.movisabio.com/` (Static Corporate Site on Hostseba)  
**Parent Organization:** MoviSabio Enterprise Smart City & Territorial Intelligence  
**Preparation Date:** November 2026  
**Status:** COMPLETE ROUTING ARCHITECTURE SPECIFICATION  

---

## 1. Executive Summary & Routing Objectives

The project charter specifies that the MoviSabio Intelligence Center must be accessible at:
```
https://www.movisabio.com/intelligence/
```
To satisfy this requirement without breaking existing corporate marketing pages, forms, stylesheets, or analytics on `www.movisabio.com`, the routing layer must bridge requests for `/intelligence/*` to the OSIRIS runtime while allowing all root and marketing requests (`/`, `/about.html`, `/platform.html`, `/solutions.html`, `/assets/*`) to be handled natively by the existing web server.

---

## 2. Next.js BasePath & Asset Routing Configuration

Next.js App Router defaults to serving assets from the root path (`/_next/...`, `/api/...`). To operate cleanly under a subpath like `/intelligence/`, [`next.config.ts`](file:///H:/Software%20Projects/movisabio-intelligence/next.config.ts) must be configured with `basePath` and `assetPrefix`:

```typescript
// movisabio-intelligence/next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Scopes all pages, links, and API routes under /intelligence
  basePath: process.env.BASE_PATH || '/intelligence',
  
  // Ensures webpack chunks, CSS, and media load from /intelligence/_next/...
  assetPrefix: process.env.BASE_PATH || '/intelligence',
  
  output: 'standalone',
  trailingSlash: false,
  
  images: {
    unoptimized: true,
  },
  
  // Custom rewrites to map internal API calls seamlessly
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
};

export default nextConfig;
```

### Impact of `basePath: '/intelligence'`
1. **HTML & Chunk URLs:** Next.js automatically prefixes all `<script>` tags, CSS links, and image sources with `/intelligence/_next/static/...`.
2. **API Endpoint Calls:** Client-side `fetch('/api/aircraft')` calls automatically resolve to `/intelligence/api/aircraft`.
3. **Internal Routing:** Next.js client router links (`<Link href="/">`) navigate internally to `/intelligence`, preventing unexpected redirects to the corporate root homepage.

---

## 3. Reverse Proxy Evaluation & Routing Implementations

Because the corporate website is hosted on Hostseba shared hosting (`103.65.138.22`) while OSIRIS requires a Linux KVM VPS or containerized host, a reverse proxy must route incoming requests based on URL prefix:

```
                                  INCOMING TRAFFIC
                             https://www.movisabio.com
                                        │
                                        ▼
                         ┌─────────────────────────────┐
                         │      URL Path Evaluator     │
                         └──────────────┬──────────────┘
                                        │
                ┌───────────────────────┴───────────────────────┐
                │                                               │
          Path: /* (Default)                          Path: /intelligence/*
                │                                               │
                ▼                                               ▼
  ┌───────────────────────────┐                   ┌───────────────────────────┐
  │   Hostseba Shared Host    │                   │     Hostseba KVM VPS      │
  │     (103.65.138.22)       │                   │    (OSIRIS Docker Fleet)  │
  ├───────────────────────────┤                   ├───────────────────────────┤
  │ - index.html              │                   │ - Nginx Tile Cache (:8080)│
  │ - platform.html           │                   │ - Next.js Standalone(:3000│
  │ - solutions.html          │                   │ - Express Intel (:4000)   │
  │ - assets/css/, js/, img/  │                   │ - 23k CCTV / AIS / Planes │
  └───────────────────────────┘                   └───────────────────────────┘
```

### Strategy 1: Hostseba cPanel Apache `.htaccess` Proxy (Conditional on cPanel Modules)
If Hostseba enables `mod_proxy` and `mod_proxy_http` on the shared hosting account, the root `.htaccess` on `103.65.138.22` can proxy subpath requests directly to the VPS:

```apache
# /public_html/.htaccess on Hostseba Shared Server
RewriteEngine On
RewriteBase /

# 1. Reverse-proxy /intelligence to the OSIRIS staging VPS
RewriteRule ^intelligence(/.*)?$ http://<HOSTSEBA_VPS_IP>:8080/intelligence$1 [P,L]
ProxyPassReverse /intelligence/ http://<HOSTSEBA_VPS_IP>:8080/intelligence/

# 2. Existing MoviSabio website rules (Remain 100% untouched)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.html [L]
```
**Limitation / Risk:** Most shared cPanel providers (including Hostseba) disable `mod_proxy` for shared hosting users to prevent proxy abuse and DDoS amplification. If `mod_proxy` is disabled, Apache will throw a `500 Internal Server Error`.

### Strategy 2: Hostseba VPS Nginx Gateway (Unified Reverse Proxy)
In this pattern, DNS for `www.movisabio.com` points directly to the Hostseba KVM VPS. Nginx handles SSL and acts as the master edge router:

```nginx
# Hostseba VPS /etc/nginx/sites-available/movisabio.conf
server {
    listen 443 ssl http2;
    server_name www.movisabio.com movisabio.com;

    ssl_certificate /etc/letsencrypt/live/movisabio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/movisabio.com/privkey.pem;

    # 1. Route /intelligence/ to local OSIRIS Docker stack
    location /intelligence/ {
        proxy_pass http://127.0.0.1:8080/intelligence/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 3600s;
        proxy_send_timeout 3600s;
    }

    # 2. Route all root and marketing pages to Hostseba Shared Web Server
    location / {
        proxy_pass http://103.65.138.22:80;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
**Benefits:**  
- 100% seamless URL: `www.movisabio.com/intelligence/`.
- The corporate website on `103.65.138.22` continues to run completely unmodified.
- Full support for WebSockets, SSE long-polling, and Nginx tile caching.

### Strategy 3: Cloudflare Edge Routing Rule / Worker (Zero Server Mutation)
If the domain `movisabio.com` uses Cloudflare DNS:
- Root traffic `/*` routes to Hostseba Shared Hosting (`103.65.138.22`).
- A Cloudflare Page Rule or Cloudflare Worker routes `/intelligence/*` directly to the Hostseba KVM VPS IP.
- **Benefit:** Requires zero configuration changes on the Hostseba shared cPanel server.

---

## 4. Zero-Breakage Verification Protocol

To guarantee that the corporate marketing website remains 100% operational during and after portal activation, the following checks must be validated on staging:

1. **Asset Collision Check:**  
   The corporate website stores assets in `/assets/css/`, `/assets/js/`, `/assets/images/`. OSIRIS stores assets in `/intelligence/_next/static/`. Because the namespace paths are completely disjoint, zero file collisions can occur.
2. **Form Submission Check:**  
   Contact, Idea Pitch, and Partner forms on `movisabio.com` submit to `/contact.html` or client scripts. They are untouched by the proxy rules.
3. **Canonical SEO Isolation:**  
   The corporate website maintains its own `sitemap.xml` and `robots.txt`. OSIRIS operates with its own localized metadata under `/intelligence/`.

---
*Certified by Principal Enterprise Software Architect & Systems Security Engineer.*
