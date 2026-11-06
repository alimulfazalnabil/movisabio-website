# OSIRIS Security, Compliance & Regulatory Gap Analysis

**Document ID:** `OSIRIS-VAL-2026-05`  
**Phase:** 1.1 Technical Validation & Implementation Readiness  
**Target Repository:** `https://github.com/alimulfazalnabil/osiris` (`osiris-master`)  
**Parent Ecosystem:** MoviSabio Enterprise Smart City & Territorial Intelligence  
**Validation Date:** November 2026  
**Status:** COMPREHENSIVE SECURITY & LEGAL AUDIT  

---

## 1. Executive Summary

This audit evaluates the cybersecurity defenses, threat surface, external data source licensing, privacy compliance, and regulatory obligations of OSIRIS (`osiris-master`) when integrated into MoviSabio's commercial enterprise portfolio.

Key determinations:
1. **SSRF Protections:** **ROBUST**. The codebase features an enterprise-grade Server-Side Request Forgery (SSRF) defense (`src/lib/ssrf-guard.ts`, 313 lines) that canonicalizes IPs, DNS-resolves hostnames before outbound requests, and blocks cloud metadata (169.254.169.254) and private subnets.
2. **Scanner Proxy Restrictions:** High-risk offensive recon scans (65,535 port sweeps, banner grabbing, traceroutes) have been intentionally removed from the public API; only defensive passive checks are permitted with strict IP rate limiting (5 scans/min).
3. **Data Licensing Gaps:** Several upstream providers (OpenSky Network, OpenSanctions, IP-API) require commercial licensing or explicit written exemptions when used within a commercial enterprise corporate website.
4. **CCTV Privacy Compliance:** While public DOT feeds provide low-resolution traffic streams compliant with GDPR and US state statutes, MoviSabio must explicitly display required public attributions and disclaimers prohibiting surveillance or license plate harvesting.

---

## 2. Technical Cybersecurity Audit

### 2.1 Server-Side Request Forgery (SSRF) Defense
The primary threat vector for any platform that queries user-provided URLs or IP addresses (e.g., geosearch, scanner proxy, CCTV snapshot, OSINT WHOIS) is SSRF. OSIRIS addresses this through [`src/lib/ssrf-guard.ts`](file:///H:/Software%20Projects/osiris-master/src/lib/ssrf-guard.ts):

```
┌─────────────────────────────────────────────────────────────────┐
│                 SSRF-GUARD TWO-LAYER DEFENSE                    │
├─────────────────────────────────────────────────────────────────┤
│ 1. Canonicalization:                                            │
│    - Rejects decimal IPs (e.g. 2130706433 -> 127.0.0.1)        │
│    - Rejects hex IPs (e.g. 0x7f000001)                          │
│    - Rejects octal notation (e.g. 0177.0.0.1)                   │
│    - Strips brackets from IPv6 and normalizes dotted quads      │
├─────────────────────────────────────────────────────────────────┤
│ 2. Subnet Filtering (IPv4 & IPv6):                              │
│    - 127.0.0.0/8 (Loopback)                                     │
│    - 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16 (RFC1918)      │
│    - 169.254.0.0/16 (Link-Local & Cloud Metadata 169.254.169.254)│
│    - 100.64.0.0/10 (Carrier-Grade NAT / Tailscale)              │
│    - ::1, ::ffff: (IPv4-mapped), fc00::/7, fe80::/10 (IPv6)     │
├─────────────────────────────────────────────────────────────────┤
│ 3. Pre-flight DNS Resolution:                                   │
│    - Resolves A and AAAA records via Node.js dns/promises       │
│    - Rejects hostname if ANY resolved address is private        │
└─────────────────────────────────────────────────────────────────┘
```

**Residual Risk (DNS Rebinding):**  
While pre-flight lookup blocks standard domain tricks, an attacker controlling a malicious authoritative DNS server with `TTL=0` could return a public IP during `validateHost()`, then immediately answer with `169.254.169.254` during the downstream `fetch()`.  
**Enterprise Remediation:** In production, outbound network egress from the container should be locked down at the Linux firewall / Docker network level, blocking access to `169.254.169.254` entirely.

### 2.2 RECON Scanner Attack Surface & Scope Restrictions
Inspection of [`src/app/api/scanner/route.ts`](file:///H:/Software%20Projects/osiris-master/src/app/api/scanner/route.ts) demonstrates strict perimeter hardening:
1. **Dangerous Scan Modes Stripped:** Lines 32–37 explicitly remove `deep` (65k port scans), `banner` (software fingerprinters), `traceroute` (infrastructure mapping), and arbitrary `ports` scans from the public interface to prevent DDoS amplification or port scanning originating from MoviSabio's server IP.
2. **Safe Whitelist:** Only safe, passive checks are exposed: `quick`, `ssl`, `headers`, `rdns`, `subdomains`, `tech`, `whois`, `geoloc`, `vuln`.
3. **Throttling:** Enforces 5 scans per minute per client IP (`isRateLimited(clientIp, 5, 60_000)`).
4. **Secret Key Isolation:** The backend scanner secret (`SCANNER_KEY`) is stored server-side and never leaked in client bundle assets.

### 2.3 Model Context Protocol (MCP) Endpoint Security
OSIRIS implements an MCP server at [`src/app/api/mcp/route.ts`](file:///H:/Software%20Projects/osiris-master/src/app/api/mcp/route.ts) allowing external autonomous AI agents to query situational telemetry.
- **CORS Verification:** Evaluates incoming `Origin` headers against the `OI_MCP_ORIGINS` environment variable.
- **Read-Only Tools:** Tools exposed via MCP (`query_aircraft`, `query_fires`, `query_earthquakes`, `get_cctv_feeds`) are strictly read-only and execute within memory sandboxes without write permissions to the host filesystem.

---

## 3. Data Source Licensing & Commercial Compliance Audit

Because MoviSabio is an international commercial enterprise, external data feeds cannot be treated as personal or non-commercial hobbies. The licensing terms of each data provider were reviewed:

| Data Provider | Current OSIRIS Usage | Upstream License / Terms | Commercial Enterprise Status | Required Action for MoviSabio |
| :--- | :--- | :--- | :---: | :--- |
| **OSIRIS Codebase** | Core Application | MIT License (Copyright 2026 simplifaisoul) | **Fully Compliant** | Retain original copyright notice in repo headers. |
| **CARTO Basemaps** | Vector Map Tiles (`basemaps.cartocdn.com`) | Free tier terms of service + OpenStreetMap ODbL | **Requires Attribution** | Must display visible map attribution: `© CARTO, © OpenStreetMap contributors`. |
| **OpenSky Network** | Global Aircraft States (`opensky-network.org`) | Academic / Non-commercial Research License | **Commercial License Required** | For commercial deployment, MoviSabio must either obtain a commercial OpenSky API tier, use ADS-B Exchange commercial feeds, or rely on simulated traffic fallbacks. |
| **OpenSanctions** | OFAC SDN Sanctions (`data.opensanctions.org`) | Creative Commons Attribution 4.0 (CC-BY 4.0) | **Permitted with Attribution** (Commercial license required above revenue threshold) | Display OpenSanctions attribution; procure commercial data license if annual turnover exceeds OpenSanctions community thresholds. |
| **IP-API.com** | IP Geolocation & ASN (`ip-api.com`) | Free endpoint is strictly non-commercial | **Non-Compliant for Commercial Use** | Replace free IP-API HTTP calls with local MaxMind GeoLite2/GeoIP2 database in `osiris-intel`. |
| **USGS Earthquakes** | Seismic Feeds | US Public Domain (USGS) | **Fully Compliant** | Free for commercial reuse; display attribution: `Data courtesy of U.S. Geological Survey`. |
| **NASA FIRMS** | Thermal Fire Data | NASA Open Data (Public Domain) | **Fully Compliant** | Free for commercial reuse; display attribution: `NASA LANCE FIRMS`. |
| **NOAA SWPC** | Space Weather | US Public Domain (NOAA) | **Fully Compliant** | Free for commercial reuse. |
| **DOT Traffic CCTV** | Municipal Traffic Cams (WSDOT, Caltrans, TfL, TxDOT) | Public Records / Open Traffic Data | **Permitted for Live Transit Info** | Feeds are for real-time traffic awareness only. Resale, facial recognition, or continuous video archiving is strictly prohibited. |

---

## 4. Privacy, Surveillance & GDPR Regulatory Assessment

### 4.1 Traffic CCTV Feeds & Biometric Privacy (GDPR / US Privacy)
The integration of 17,400+ worldwide cameras raises immediate privacy compliance considerations under the EU General Data Protection Regulation (GDPR) and regional surveillance laws:
- **Optical Resolution Reality:** Public highway DOT cameras operate at low resolution (typically 320x240 to 640x480 JPEG at 1–5 FPS). At these resolutions and camera angles, individual human faces and vehicle license plates cannot be resolved or processed for biometric identification.
- **Zero Local Video Storage:** OSIRIS does not store, record, or buffer camera video footage on server disks. Video streams and snapshots are streamed directly from the agency to the client browser or passed through a transient stateless proxy.
- **Automated Processing Restriction:** OSIRIS must **not** attach automated automated number plate recognition (ANPR) or facial recognition AI models to external public DOT feeds, as doing so without statutory authority violates EU GDPR Article 9 (Special category biometric data) and US state privacy statutes.
- **Mandatory User-Facing Disclaimer:** The MoviSabio Live Intelligence Center must display an enterprise disclaimer:
  > *"Camera feeds are provided directly by municipal transportation authorities strictly for real-time traffic and transit situational awareness. MoviSabio does not record, archive, or process public video feeds for biometric tracking or surveillance."*

### 4.2 OSINT & Personally Identifiable Information (PII)
OSIRIS contains username search (`/api/osint/username`), leak checking (`/api/osint/leaks`), and phone parsing (`/api/osint/phone`).
- In an enterprise B2B website, publicly exposing tools that query leaked credentials or private individuals' usernames could invite reputational damage or regulatory scrutiny under GDPR/CCPA.
- **Recommendation:** Restrict or disable individual-person OSINT tools (`username`, `leaks`, `phone`) on the public MoviSabio deployment, focusing exclusively on **territorial intelligence, geospatial mobility, infrastructure, and climate risk**.

---

## 5. Security & Compliance Action Plan

```
┌─────────────────────────────────────────────────────────────────┐
│              ENTERPRISE COMPLIANCE ACTION PLAN                  │
├─────────────────────────────────────────────────────────────────┤
│ 1. Legal Attributions: Embed standard footer attributions for   │
│    CARTO, OpenStreetMap, OpenSanctions, USGS, NASA, and TfL.    │
│ 2. MaxMind GeoIP Migration: Replace ip-api.com with local MMDB  │
│    to eliminate external rate limits and commercial risk.       │
│ 3. Egress Firewalling: Block container access to link-local     │
│    cloud metadata address 169.254.169.254 at the Docker level.  │
│ 4. Feature Gating: Disable personal recon tabs (username, leaks)│
│    on the public interface; retain infrastructure OSINT.        │
│ 5. CCTV Disclaimer: Publish clear traffic-monitoring terms of   │
│    use disclaiming video archival or facial surveillance.       │
└─────────────────────────────────────────────────────────────────┘
```

---
*Certified by Principal Enterprise Software Architect & Systems Security Engineer.*
