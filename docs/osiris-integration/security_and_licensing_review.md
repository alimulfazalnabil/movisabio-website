# Security, Privacy & Public Licensing Review

**Document ID:** `MOVI-SEC-2026-06`  
**Parent Project:** MoviSabio Live Territorial Intelligence Platform  
**Target Environments:** OSIRIS Engine × MoviSabio Enterprise Platform  
**Audit Date:** November 2026  
**Auditor:** Principal Cyber Risk Consultant & Information Security Officer (CISO Advisor)  

---

## 1. Executive Summary

Integrating live intelligence and sensor feeds into a corporate municipal technology platform introduces distinct cybersecurity, legal, privacy, and regulatory considerations. This audit establishes a formal security and licensing review of the OSIRIS repository, evaluating its built-in defenses, data governance frameworks, privacy safeguards, and open-source attribution requirements.

The central finding is that **OSIRIS contains state-of-the-art defensive safeguards** against Server-Side Request Forgery (SSRF), DNS rebinding, and IP evasion. However, because OSIRIS also houses offensive scanning tools (the RECON suite), **strict architectural segregation (air-gapping) is legally and commercially mandatory** before surfacing any live features under the MoviSabio brand.

---

## 2. Defensive Security Architecture Review

```
┌────────────────────────────────────────────────────────────────────────┐
│                   OSIRIS MULTI-TIER DEFENSE IN DEPTH                   │
├────────────────────────────────────────────────────────────────────────┤
│ 1. EDGE PERIMETER (Nginx Reverse Proxy & Cloudflare WAF)               │
│    • SSL/TLS 1.3 Termination • Strict CORS Origin Whitelisting        │
│    • Rate Limiting (Token Bucket per IP) • Anti-DDoS Buffering         │
├────────────────────────────────────────────────────────────────────────┤
│ 2. APPLICATION MIDDLEWARE (Next.js Edge & Runtime)                     │
│    • Path Matcher Exclusions • Bounded Analytics Interception          │
│    • Content Security Policy (CSP) • Frame Ancestors Sandboxing        │
├────────────────────────────────────────────────────────────────────────┤
│ 3. NETWORK & INGESTION DEFENSE (ssrf-guard.ts)                         │
│    • Canonical IP Parsing • Rejection of Non-Dotted Quads (Hex/Octal)  │
│    • Complete RFC1918 & Link-Local Block • DNS Rebinding Pre-Lookup   │
├────────────────────────────────────────────────────────────────────────┤
│ 4. ISOLATION FIREWALL (Architectural Air-Gap)                          │
│    • RECON Port Scanner 503 Disabled • Host Probes Quarantined         │
└────────────────────────────────────────────────────────────────────────┘
```

### 2.1 Server-Side Request Forgery (SSRF) Subsystem (`src/lib/ssrf-guard.ts`)
The SSRF defense implemented in OSIRIS is rigorous and goes far beyond standard regex matching:
1. **Canonicalization of Inputs:** Rejects non-canonical IPv4 representations (such as decimal single integers `2130706433`, dotted-octal `0177.0.0.1`, and dotted-hex `0x7f.0.0.1`) that attackers use to bypass string-matching filters.
2. **Comprehensive Subnet Blacklist:**
   - `0.0.0.0/8` ("This" network)
   - `10.0.0.0/8` (RFC1918 Private)
   - `100.64.0.0/10` (Shared Address Space / CGNAT / Tailscale)
   - `127.0.0.0/8` (Loopback interface)
   - `169.254.0.0/16` (Link-Local, including Cloud Metadata service `169.254.169.254`)
   - `172.16.0.0/12` (RFC1918 Private)
   - `192.0.0.0/24`, `192.0.2.0/24`, `198.51.100.0/24`, `203.0.113.0/24` (IETF Documentation & Benchmarking)
   - `192.168.0.0/16` (RFC1918 Private)
   - `224.0.0.0/4` (Multicast)
   - `240.0.0.0/4` (Reserved / Broadcast `255.255.255.255`)
   - IPv6 equivalents: `::`, `::1`, `::ffff:`, `64:ff9b::`, `100::`, `2001:db8:`, `fc00::/7` (Unique Local), `fe80::/10` (Link-Local), `fec0::/10` (Site-Local), and `ff00::/8` (Multicast).
3. **DNS Pre-Lookup Resolution:** For domain name targets, resolves all `A` and `AAAA` records using `node:dns/promises` before making any network request. If *any* returned IP falls into a reserved subnet, the request is blocked, mitigating DNS rebinding attacks.

### 2.2 Rate Limiting & Client Throttling
- The scanner route `/api/scanner` enforces IP-based rate limiting via `isRateLimited(clientIp, 5, 60_000)` (maximum 5 requests per minute).
- The OI Assist route `/api/oi/assist` enforces `limited(req, 'assist', 40)` (maximum 40 steps per minute).
- The MCP server `/api/mcp` enforces `limited(req, 'mcp', 120)` (maximum 120 requests per minute).
- Upstream requests to slow municipal DOT portals utilize a shared connection pool (`createPool`) to avoid overwhelming government servers.

### 2.3 Cross-Origin Resource Sharing (CORS) & Content Security Policy (CSP)
- **CORS Allowlist:** In the proposed architecture, the reverse proxy restricts cross-origin `fetch` calls to:
  - `https://www.movisabio.com`
  - `https://movisabio.com`
  - `https://live.movisabio.com`
- **Content Security Policy (CSP):**
  - `default-src 'self' https: data: blob: 'unsafe-inline' 'unsafe-eval';`
  - `connect-src 'self' https: wss:;`
  - `worker-src 'self' blob:;` (Mandatory for MapLibre GL Web Workers)
  - `frame-ancestors 'self' https://www.movisabio.com https://movisabio.com;` (Prevents third-party clickjacking while allowing embedding inside MoviSabio corporate pages).

---

## 3. Privacy Assessment & Regulatory Compliance

### 3.1 Public Municipal CCTV Cameras & GDPR / LGPD Compliance
MoviSabio serves clients in Brazil (governed by **LGPD - Lei Geral de Proteção de Dados**) and the European Union (governed by **GDPR**). Incorporating 17,000+ CCTV camera feeds requires strict privacy compliance:
- **Nature of Feeds:** All integrated cameras originate from public departments of transportation (TfL, Autostrade per l'Italia, Autobahn GmbH, WSDOT, etc.) and public tourist webcams.
- **Resolution & Field of View:** Roadway cameras are elevated traffic monitoring units positioned to assess vehicle flow, queuing, and weather. Stream resolutions (typically 360p to 720p at low frame rates) are technically insufficient to resolve facial features.
- **Biometric & Facial Recognition Policy:** OSIRIS performs **zero facial recognition, zero automated biometric extraction, and zero individual pedestrian re-identification**.
- **License Plate Masking:** In compliance with LGPD Article 6 and GDPR Article 5 (Data Minimization), live video streams are not recorded or persisted to disk; they pass ephemerally through browser memory for real-time situational awareness.
- **Compliance Verdict:** The camera feeds qualify as legitimate public interest infrastructure monitoring under GDPR Recital 45 and LGPD Article 7 (IX).

### 3.2 Sanctions Search & Automated Matching Limitations
The `/api/osint/sanctions` endpoint cross-references names against the OpenSanctions OFAC SDN database:
- **Legal Disclaimer:** Automated string matching using Levenshtein or token normalization cannot substitute for formal Know Your Customer (KYC) or Anti-Money Laundering (AML) legal compliance.
- **Defamation & False Positives:** Publicly labeling an individual or corporate partner as "Sanctioned" based on an automated alias match creates severe commercial and legal liability.
- **Policy:** The sanctions search module must remain quarantined from the public MoviSabio website.

### 3.3 Active Network Scanning & Legal Authorization
The RECON toolkit in OSIRIS includes TCP connect scanning and port probes:
- **Legal Exposure:** Performing unsolicited port scans against external IP addresses or domains without explicit written consent can violate the **US Computer Fraud and Abuse Act (CFAA)**, the **UK Computer Misuse Act**, and equivalent international cybersecurity statutes.
- **Blacklisting Risk:** Operating an open public scanner proxy from a MoviSabio-branded domain would quickly cause MoviSabio's domain and IP blocks to be added to abuse blacklists (Spamhaus, abuse.ch, Cloudflare Threat Intelligence).
- **Policy:** As highlighted in OSIRIS `SECURITY.md`, scanning tools are strictly for authorized targets. **The entire RECON scanning suite (`/api/scanner`) must be disabled (503 response) on public-facing MoviSabio instances.**

---

## 4. Open-Source Licensing & Attribution Audit

All integrated software components and upstream data providers operate under permissive open-source or open-access government terms:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        DATA PROVENANCE & LICENSES                      │
├──────────────────────────┬─────────────────────────────┬───────────────┤
│ Component / Provider     │ License / Terms             │ Attribution   │
├──────────────────────────┼─────────────────────────────┼───────────────┤
│ OSIRIS Platform Core     │ MIT License                 │ Required      │
│ MapLibre GL JS           │ BSD 3-Clause                │ Required      │
│ OpenStreetMap Carto      │ Open Database License (ODbL)│ Required      │
│ USGS Seismic Data        │ US Public Domain (USGS)     │ Required      │
│ NASA FIRMS & EONET       │ NASA Open Data Policy       │ Required      │
│ Open-Meteo Weather       │ CC-BY 4.0 International     │ Required      │
│ CelesTrak Satellite TLE  │ Educational / Open Access   │ Required      │
│ Bekijkhet.nu Directory   │ Curated Open Index          │ Required      │
│ OpenSanctions SDN Mirror │ CC-BY 4.0 International     │ Required      │
│ opendata.adsb.fi         │ Community ADS-B Open Data   │ Required      │
│ Municipal DOT Portals    │ Open Government License / PS│ Required      │
└──────────────────────────┴─────────────────────────────┴───────────────┘
```

### 4.1 MIT License Compliance for OSIRIS
OSIRIS is distributed under the standard MIT License:
- **Permissions:** Commercial use, modification, distribution, sublicensing, and private use are 100% permitted.
- **Conditions:** The copyright notice and permission notice must be included in all copies or substantial portions of the software.
- **Implementation:** The MoviSabio Live Center footer and documentation must maintain the original copyright attribution: *"Powered by OSIRIS Open Source Intelligence Platform (MIT License)"*.

### 4.2 Mandatory UI Attribution Notice Template
To satisfy all open-source and open-data legal requirements, the MoviSabio Live Center interface must render a persistent attribution bar:

> **Data Provenance & Attribution:**  
> • **Geospatial Engine:** MapLibre GL (BSD 3-Clause) | Vector Tiles © [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors (ODbL).  
> • **Aviation Telemetry:** Powered by community ADS-B transponder data via [adsb.fi](https://adsb.fi) & OpenSky Network.  
> • **Traffic CCTV:** Public municipal feeds provided by Transport for London (TfL), WSDOT, TxDOT, Autostrade per l'Italia, Autobahn GmbH, and the [Bekijkhet.nu](https://www.bekijkhet.nu) international index.  
> • **Seismic & Thermal Sensing:** Earthquakes courtesy of the [U.S. Geological Survey (USGS)](https://earthquake.usgs.gov); thermal active fire hotspots courtesy of [NASA FIRMS](https://firms.modaps.eosdis.nasa.gov) and NASA EONET.  
> • **Meteorological Intelligence:** Weather and atmospheric data powered by [Open-Meteo](https://open-meteo.com) (CC-BY 4.0).  
> • **Satellite Orbit Tracking:** SGP4 orbit propagation powered by [satellite.js](https://github.com/shashwatak/satellite-js) using NORAD TLE elements curated by [CelesTrak](https://celestrak.org).

*End of Deliverable 6.*
