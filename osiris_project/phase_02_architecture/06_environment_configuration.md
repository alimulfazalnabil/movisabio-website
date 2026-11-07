# MoviSabio Intelligence Staging Environment Configuration & Security Templates

**Document ID:** `MOVI-ARCH-2026-06`  
**Phase:** 2 Architecture Implementation Preparation  
**Parent Organization:** MoviSabio Enterprise Smart City & Territorial Intelligence  
**Security Policy:** Zero Actual Secrets Committed — Placeholder Values Only  
**Preparation Date:** November 2026  
**Status:** COMPLETE ENVIRONMENT SPECIFICATION  

---

## 1. Executive Summary

This document specifies the complete environment configuration schema for the MoviSabio Intelligence Platform staging deployment.

In strict compliance with enterprise security protocols:
- **Zero Secrets Committed:** All credentials, keys, and tokens utilize standardized placeholders (`PLACEHOLDER_REPLACE_WITH_...`).
- **File System Permissions:** Staging `.env` files on the host VPS must be restricted to `chmod 600` (readable only by the root/docker user).
- **Client Bundle Isolation:** Zero secret keys are prefixed with `NEXT_PUBLIC_`, ensuring that no private credentials can ever be compiled into browser-accessible JavaScript.

---

## 2. Staging Environment Variable Template (`.env.staging.template`)

```ini
# ==============================================================================
# MOVISABIO INTELLIGENCE PLATFORM — STAGING ENVIRONMENT CONFIGURATION
# File: .env.staging
# Permissions: chmod 600 .env.staging
# ==============================================================================

# ------------------------------------------------------------------------------
# 1. CORE SERVER RUNTIME
# ------------------------------------------------------------------------------
NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0
NODE_OPTIONS=--dns-result-order=ipv4first
BASE_PATH=/intelligence

# ------------------------------------------------------------------------------
# 2. INTERNAL MICROSERVICES & NETWORKING
# ------------------------------------------------------------------------------
# Internal Docker bridge address for the Express sanctions/ontology microservice
INTEL_URL=http://movi-intel:4000
INTEL_PORT=4000

# ------------------------------------------------------------------------------
# 3. RECON AUTHENTICATION & ACCESS CONTROL (MANDATORY PRIVATE)
# ------------------------------------------------------------------------------
# Cryptographic secret for signing RECON session JWT tokens (generate via: openssl rand -hex 32)
JWT_SECRET=PLACEHOLDER_REPLACE_WITH_STRONG_RANDOM_SECRET_KEY_MIN_32_CHARS
JWT_EXPIRATION_HOURS=12

# Internal URL to the private RECON scanning daemon (isolated on private network)
SCANNER_URL=PLACEHOLDER_OPTIONAL_INTERNAL_SCANNER_URL_E_G_HTTP_SCANNER_7700
# Pre-shared authentication secret between Next.js proxy and scanning daemon
SCANNER_KEY=PLACEHOLDER_REPLACE_WITH_SHARED_SCANNER_SECRET

# ------------------------------------------------------------------------------
# 4. OPTIONAL EXTERNAL TELEMETRY API KEYS (Elevate Rate Limits)
# Note: Platform functions with keyless public sources if these are omitted.
# ------------------------------------------------------------------------------
# OpenSky Network researcher credentials for real-time commercial aviation
OPENSKY_CLIENT_ID=PLACEHOLDER_OPTIONAL_OPENSKY_USERNAME
OPENSKY_CLIENT_SECRET=PLACEHOLDER_OPTIONAL_OPENSKY_PASSWORD

# AISStream.io API key for live global AIS maritime vessel tracking
AIS_API_KEY=PLACEHOLDER_OPTIONAL_AISSTREAM_API_KEY

# NASA FIRMS API key for MODIS/VIIRS thermal active fire monitoring
FIRMS_API_KEY=PLACEHOLDER_OPTIONAL_NASA_FIRMS_MAP_KEY

# N2YO API key for satellite tracking and pass predictions
N2YO_API_KEY=PLACEHOLDER_OPTIONAL_N2YO_API_KEY

# ------------------------------------------------------------------------------
# 5. OPEN INTELLIGENCE (OI) & AI AGENT INTEGRATION
# ------------------------------------------------------------------------------
# Allowed CORS origins for external autonomous Model Context Protocol (MCP) clients
OI_MCP_ORIGINS=https://www.movisabio.com,https://intelligence.movisabio.com

# ------------------------------------------------------------------------------
# 6. CACHE & PERSISTENCE PATHS
# ------------------------------------------------------------------------------
# Overrides default catalog cache location inside container
OSIRIS_CCTV_SNAPSHOT=/app/.cache/cctv-catalog.json
```

---

## 3. Detailed Parameter Dictionary & Fallback Matrix

| Variable Name | Required? | Recommended Staging Value | Purpose & Fallback Behavior |
| :--- | :---: | :--- | :--- |
| `NODE_ENV` | **Yes** | `production` | Enforces production React optimizations and minification. |
| `BASE_PATH` | **Yes** | `/intelligence` | Sets App Router subpath; routes all assets to `/intelligence/_next/...`. |
| `INTEL_URL` | **Yes** | `http://movi-intel:4000` | Points to the companion `osiris-intel` sanctions microservice. |
| `JWT_SECRET` | **Yes** | Generated 64-char Hex | Signs RECON authentication tokens. Defaults to error if missing. |
| `SCANNER_KEY` | Conditional | Strong random key | Required only if active host scanning is enabled. Route returns 503 if missing. |
| `OPENSKY_CLIENT_ID` | Optional | Registered researcher ID | If empty, OpenSky queries anonymously (rate limited); falls back to synthetic flights. |
| `AIS_API_KEY` | Optional | Key string from aisstream.io | If empty, maritime layer renders synthetic cargo/tanker traffic at key chokepoints. |
| `FIRMS_API_KEY` | Optional | Key string from NASA | If empty, queries open MODIS active-fire endpoint. |
| `OI_MCP_ORIGINS` | Optional | MoviSabio domains | Enforces strict CORS for autonomous AI agents connecting via MCP. |

---

## 4. Secure Credential Provisioning Protocol

During actual staging deployment on the Hostseba VPS, operators must execute the following secure onboarding protocol:

1. **Root-Only Permissions:**
   ```bash
   chmod 600 /opt/movisabio-intelligence/.env.staging
   chown root:root /opt/movisabio-intelligence/.env.staging
   ```
2. **Cryptographic Key Generation:**
   Generate the `JWT_SECRET` directly on the server:
   ```bash
   openssl rand -hex 32
   ```
3. **Audit Verification:**
   Run automated string scan to guarantee that no default placeholder strings (`PLACEHOLDER_...`) remain active in production-bound configuration.

---
*Certified by Principal Enterprise Software Architect & Systems Security Engineer.*
