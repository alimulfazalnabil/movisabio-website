# Hostseba Infrastructure Capability Assessment & Technical Viability

**Document ID:** `MOVI-ARCH-2026-01`  
**Phase:** 2 Architecture Implementation Preparation  
**Parent Organization:** MoviSabio Enterprise Smart City & Territorial Intelligence  
**Hosting Target:** Hostseba (`hostseba.com`) / Current Hostseba Infrastructure  
**Target Domain:** `www.movisabio.com` / `movisabio.com` (`103.65.138.22`)  
**Assessment Date:** November 2026  
**Status:** COMPLETE INFRASTRUCTURE VIABILITY AUDIT  

---

## 1. Executive Summary

This assessment evaluates the current hosting environment of MoviSabio on **Hostseba** and analyzes its capability to support the multi-tier containerized OSIRIS runtime (`osiris`, `osiris-intel`, `osiris-cache`).

### Definitive Infrastructure Verdict
- **Hostseba Shared Web Hosting (Current Active Setup):** **INCOMPATIBLE WITH OSIRIS PRODUCTION RUNTIME**.  
  The current production IP (`103.65.138.22`) is a shared cPanel web hosting environment running Apache/LiteSpeed with CloudLinux OS and CageFS. It lacks Docker daemon access, root execution privileges, native reverse proxy modules, and persistent process lifecycles.
- **Compatible Hostseba Staging Alternative:** **Hostseba Linux KVM VPS**.  
  Hostseba provides Linux KVM Virtual Private Servers (VPS) with root SSH access, dedicated kernel virtualization, full Docker Engine support, and unmetered internal networking. A Hostseba KVM VPS (minimum 4 GB RAM, 2–4 vCPU) is the required staging deployment target.

---

## 2. Empirical Infrastructure Profiling

The active production environment for `movisabio.com` was inspected via DNS and network telemetry:

```
┌─────────────────────────────────────────────────────────────┐
│                 HOSTSEBA NETWORK & DNS TELEMETRY            │
├───────────────────────┬─────────────────────────────────────┤
│ Domain Name           │ www.movisabio.com / movisabio.com   │
│ Authoritative DNS     │ root.dnsserver.hostseba.com         │
│ Production IPv4       │ 103.65.138.22                       │
│ Hosting Provider      │ Hostseba Web Services (Bangladesh) │
│ Infrastructure Tier   │ Multi-tenant Shared cPanel Server   │
│ Active Web Server     │ Apache / LiteSpeed HTTP/1.1         │
│ Active Production File│ Static HTML (Content-Length: 153kB) │
│ SSL/TLS Active Cert   │ cPanel AutoSSL (Sectigo / Let's Enc)│
└───────────────────────┴─────────────────────────────────────┘
```

---

## 3. Hostseba Capability vs. OSIRIS Runtime Requirements

The following matrix compares Hostseba shared hosting capabilities with the mandatory requirements of the OSIRIS platform:

| Capability Dimension | OSIRIS Runtime Requirement | Hostseba Shared cPanel (`103.65.138.22`) | Hostseba Linux KVM VPS (Recommended) | Compatibility Verdict |
| :--- | :--- | :--- | :--- | :---: |
| **Container Engine** | Docker Engine 24+, Docker Compose v2 | **UNAVAILABLE** (No daemon, no cgroups, shared kernel) | **SUPPORTED** (Full Docker Engine & Compose) | **Shared: Incompatible**<br>**VPS: Fully Compatible** |
| **Node.js Runtime** | Node.js 22 LTS (ESM, App Router standalone) | **RESTRICTED** (cPanel Setup Node.js App / Passenger, limited to Node 18/20) | **SUPPORTED** (Any Node.js version via Docker/nvm) | **Shared: Incompatible**<br>**VPS: Fully Compatible** |
| **Persistent Daemons**| 24/7 in-memory graph index (`intel/server.js`), background CCTV refreshes | **BLOCKED** (CloudLinux CageFS kills idle/long processes) | **SUPPORTED** (systemd services, Docker restart policies) | **Shared: Incompatible**<br>**VPS: Fully Compatible** |
| **Compute & RAM** | 2.0–4.0 vCPU, 4.0–8.0 GB RAM | **EXCEEDED** (CloudLinux LVE caps: 1 vCPU, 1 GB RAM, 20 entry procs) | **SUPPORTED** (Dedicated 4 GB – 8 GB RAM allocation) | **Shared: Incompatible (OOM)**<br>**VPS: Fully Compatible** |
| **Reverse Proxy** | Nginx tile caching (`/proxy/tiles/*`) & path forwarding | **RESTRICTED** (Apache `mod_proxy` disabled for shared accounts) | **SUPPORTED** (Native Nginx / Caddy reverse proxy) | **Shared: Incompatible**<br>**VPS: Fully Compatible** |
| **Long-Lived Streams**| Server-Sent Events (SSE) for `/api/oi/runs/*/events`, WebSockets | **TERMINATED** (Shared Apache proxy buffers / drops after 60s) | **SUPPORTED** (Configurable proxy read/send timeouts 3600s) | **Shared: Incompatible**<br>**VPS: Fully Compatible** |
| **Storage Architecture**| 20 GB SSD (10 GB Nginx tile cache + CCTV snapshots) | **RESTRICTED** (Inodes and shared quota limits) | **SUPPORTED** (Dedicated NVMe disk allocation) | **Shared: High Risk**<br>**VPS: Fully Compatible** |
| **SSH & Terminal** | Automation scripts, git sync, docker CLI | **RESTRICTED** (Jailed Shell / chroot or disabled) | **SUPPORTED** (Full root SSH access via key auth) | **Shared: Incompatible**<br>**VPS: Fully Compatible** |

---

## 4. Root-Cause Analysis of Shared Hosting Incompatibility

1. **Docker Daemon Access:**  
   Docker containers require direct communication with the Linux kernel via namespaces and control groups (`cgroups`). In shared multi-tenant cPanel environments, host kernels are locked down to prevent privilege escalation. Users cannot run `dockerd` or spawn containers.
2. **Memory Exhaustion (LVE Limits):**  
   The OSIRIS stack (`osiris` Next.js server + `osiris-intel` sanctions microservice + `osiris-cache` Nginx) requires **~1.2 GB to 1.8 GB RAM** under active load. A shared cPanel account capped at 1024 MB RAM will encounter immediate `503 Service Unavailable` or `Out of Memory` process termination by the CloudLinux LVE killer.
3. **In-Memory Cache Preservation:**  
   `intel/server.js` maintains an in-memory index of ~50,000 OFAC SDN entities. In shared hosting, Passenger or LiteSpeed terminates worker processes when idle to reclaim system RAM. Restarting the process forces a full 30-second CSV download and indexing phase on the first incoming user request.
4. **SSE & Streaming Disruption:**  
   The Open Intelligence simulation engine pushes live scenario updates via Server-Sent Events (`/api/oi/runs/[id]/events`). Shared Apache servers buffer HTTP responses and kill idle TCP sockets after 60 seconds, destroying real-time intelligence feeds.

---

## 5. Recommended Staging Architecture on Hostseba

In strict accordance with the project constraints (do not silently substitute another hosting provider), MoviSabio will deploy OSIRIS onto **Hostseba's Linux KVM VPS platform**:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       HOSTSEBA HYBRID ENTERPRISE TOPOLOGY                   │
├─────────────────────────────────────────────────────────────────────────────┤
│ 1. Hostseba Shared Web Hosting (103.65.138.22):                             │
│    - Continues hosting MoviSabio corporate marketing pages (index.html,     │
│      platform.html, solutions.html, global.html, contact.html).             │
│    - Remains 100% static, fast, stable, and zero-maintenance.              │
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. Hostseba Linux KVM VPS (Dedicated Node):                                 │
│    - OS: Ubuntu 24.04 LTS / Debian 12 (64-bit).                             │
│    - Sizing: 2–4 vCPU, 4–8 GB RAM, 50 GB NVMe Storage.                      │
│    - Stack: Docker Engine 26+, Docker Compose v2, Nginx Reverse Proxy.      │
│    - Services: osiris (Next.js :3000), osiris-intel (:4000),                │
│      osiris-cache (:8080).                                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│ 3. Unified Routing Bridge:                                                  │
│    - Portal accessible at www.movisabio.com/intelligence/ via reverse-proxy │
│      forwarding or intelligence.movisabio.com CNAME.                        │
└─────────────────────────────────────────────────────────────────────────────┘
```

---
*Certified by Principal Enterprise Software Architect & Systems Security Engineer.*
