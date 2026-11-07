# MoviSabio RECON Security Architecture & Access Control Specification

**Document ID:** `MOVI-ARCH-2026-04`  
**Phase:** 2 Architecture Implementation Preparation  
**Parent Organization:** MoviSabio Enterprise Smart City & Territorial Intelligence  
**Security Classification:** RESTRICTED — INTERNAL ENTERPRISE SPECIFICATION  
**Mandate:** All RECON Tools Must Remain Private, Authenticated, and Audited  
**Preparation Date:** November 2026  
**Status:** COMPLETE SECURITY & AUTHENTICATION ARCHITECTURE  

---

## 1. Executive Summary & Policy Mandate

The Phase 2 project charter mandates that **all RECON cybersecurity scanning and sensitive OSINT tools must remain strictly private, authenticated, and role-authorized**. Under no circumstances will unauthenticated public visitors be permitted to trigger active vulnerability scans, port sweeps, or target investigations from MoviSabio servers.

This document establishes the enterprise defense-in-depth architecture required to secure the RECON module before staging deployment.

---

## 2. Access Control Model & Role-Based Authorization (RBAC)

The platform divides features into three operational tiers:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      MOVISABIO INTELLIGENCE ACCESS TIERS                    │
├───────────────────┬───────────────────────────┬─────────────────────────────┤
│ Access Tier       │ Permitted Capabilities    │ Authentication Requirement  │
├───────────────────┼───────────────────────────┼─────────────────────────────┤
│ 1. PUBLIC GUEST   │ Public Transit CCTV,      │ None (Public Access)        │
│    (Unauthenticated)│ Earthquakes, NASA Fires, │ Read-only public telemetry  │
│                   │ Space Weather, Satellites │                             │
├───────────────────┼───────────────────────────┼─────────────────────────────┤
│ 2. ENTERPRISE     │ Passive OSINT (BGP, DNS,  │ Authenticated Session       │
│    ANALYST        │ WHOIS, SSL Certs, Threat  │ (JWT Session Token / SSO)   │
│                   │ Feeds), OI Simulation     │ Rate limit: 1 scan / minute │
├───────────────────┼───────────────────────────┼─────────────────────────────┤
│ 3. INFRASTRUCTURE │ Active Host Scanner       │ Multi-Factor Auth (MFA)     │
│    ADMINISTRATOR  │ (Quick, SSL, Headers,     │ Role: `ADMIN`               │
│                   │ Vuln), API Key Management │ Rate limit: 5 scans / minute│
└───────────────────┴───────────────────────────┴─────────────────────────────┘
```

---

## 3. Server-Side Middleware & Route Protection

All requests to `/api/scanner/*`, `/api/osint/*`, and `/scanner` UI routes must pass through a mandatory Next.js Edge Middleware layer ([`src/middleware.ts`](file:///H:/Software%20Projects/movisabio-intelligence/src/middleware.ts)) before reaching route handlers:

```typescript
// movisabio-intelligence/src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAuthToken } from '@/lib/auth';

// Protected path patterns
const PROTECTED_ROUTES = [
  '/api/scanner',
  '/api/osint/sweep',
  '/api/osint/threats',
  '/api/osint/leaks',
  '/api/osint/username',
  '/scanner',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if requested path falls within private RECON scope
  const isProtected = PROTECTED_ROUTES.some(route => pathname.startsWith(route));

  if (isProtected) {
    // 1. Extract Bearer token or session cookie
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace(/^Bearer\s+/i, '') || request.cookies.get('movi_session')?.value;

    if (!token) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json(
          { error: 'Unauthorized: Authentication required to access RECON tools' },
          { status: 401 }
        );
      }
      // Redirect UI requests to enterprise login portal
      const loginUrl = new URL('/intelligence/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // 2. Validate cryptographic signature and expiration
    const session = await verifyAuthToken(token);
    if (!session || !session.valid) {
      return NextResponse.json(
        { error: 'Forbidden: Invalid or expired session token' },
        { status: 403 }
      );
    }

    // 3. Enforce Role-Based Access Control (RBAC)
    if (pathname.startsWith('/api/scanner') && session.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Forbidden: Active scanning requires Administrator privileges' },
        { status: 403 }
      );
    }

    // Inject verified user context into request headers for downstream audit logging
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', session.userId);
    requestHeaders.set('x-user-role', session.role);

    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/scanner/:path*', '/api/osint/:path*', '/scanner/:path*'],
};
```

---

## 4. Hardened Scanner API Route Implementation

Inspection of [`src/app/api/scanner/route.ts`](file:///H:/Software%20Projects/movisabio-intelligence/src/app/api/scanner/route.ts) confirms that the scanner is a proxy client requiring a remote backend. The route will be updated to enforce strict session logging:

```typescript
// Enhanced Security in src/app/api/scanner/route.ts
import { NextResponse } from 'next/server';
import { validateHost, isRateLimited, getClientIp } from '@/lib/ssrf-guard';
import { logSecurityAudit } from '@/lib/audit-logger';

export async function GET(req: Request) {
  const userId = req.headers.get('x-user-id');
  const userRole = req.headers.get('x-user-role');

  // Hard assertion: Must have passed authentication middleware
  if (!userId || userRole !== 'ADMIN') {
    return NextResponse.json({ error: 'Access Denied: Administrative authorization required' }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const target = searchParams.get('target')?.trim();
  const scanType = searchParams.get('type') || 'quick';
  const clientIp = getClientIp(req);

  // Validate target host against SSRF & cloud metadata
  const guard = await validateHost(target);
  if (!guard.ok) {
    await logSecurityAudit({
      event: 'SCAN_REJECTED_SSRF',
      userId,
      clientIp,
      target,
      reason: guard.reason
    });
    return NextResponse.json({ error: 'Target blocked: Private or metadata address' }, { status: 403 });
  }

  // Execute scan and log completion
  const startTime = Date.now();
  try {
    const res = await executeScan(target, scanType);
    await logSecurityAudit({
      event: 'SCAN_EXECUTED',
      userId,
      clientIp,
      target,
      scanType,
      durationMs: Date.now() - startTime,
      status: res.status
    });
    return NextResponse.json(res.data, { status: res.status });
  } catch (err: any) {
    await logSecurityAudit({
      event: 'SCAN_FAILED',
      userId,
      clientIp,
      target,
      error: err.message
    });
    return NextResponse.json({ error: 'Scanner execution failed' }, { status: 502 });
  }
}
```

---

## 5. Security Audit Logging Architecture

Every access attempt to private RECON capabilities is recorded in an immutable, append-only structured JSON log:
- **Storage Target:** `/var/log/movisabio/recon-audit.jsonl` (persisted outside the Docker container via volume mount).
- **Log Entry Schema:**
  ```json
  {
    "timestamp": "2026-11-07T05:30:00.000Z",
    "event": "SCAN_EXECUTED",
    "userId": "usr_sec_admin_09",
    "clientIp": "198.51.100.42",
    "target": "example.com",
    "scanType": "ssl",
    "durationMs": 420,
    "status": 200
  }
  ```
- **Log Retention Policy:** Retained for 180 days with daily logrotate compression.

---

## 6. Secret Isolation & Zero-Leakage Guarantee

To prevent credential leakage:
1. **Server-Side Only:** `SCANNER_KEY`, `SCANNER_URL`, and `JWT_SECRET` are strictly injected via runtime environment variables (`process.env`) and never prefixed with `NEXT_PUBLIC_`.
2. **Client Build Inspection:** Webpack build manifests are verified to ensure that no secret tokens are compiled into static `.js` bundles served to client browsers.

---
*Certified by Principal Enterprise Software Architect & Systems Security Engineer.*
