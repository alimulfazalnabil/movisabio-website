# OSIRIS API and Environment Dependency Matrix

**Document ID:** `MOVI-DEP-2026-05`  
**Parent Project:** MoviSabio Live Territorial Intelligence Platform  
**Target Environments:** OSIRIS Engine × MoviSabio Integration Gateway  
**Audit Date:** November 2026  
**Auditor:** Principal DevOps Engineer & Cloud Systems Architect  

---

## 1. Executive Summary

This document establishes the exhaustive technical dependency specification for the OSIRIS real-time intelligence engine. It inventories every environment variable, configuration flag, upstream service endpoint, network protocol, timeout threshold, and failover mechanism across the application. 

A critical finding of this audit is that **OSIRIS is fully functional in a 100% keyless configuration for all core territorial intelligence layers** (aviation, traffic CCTV, USGS earthquakes, NASA wildfires, NOAA weather, and CelesTrak satellite orbits). Upstream API credentials are only required for the optional RECON scanner daemon, higher-tier commercial rate limits, and client-side conversational AI copilot features.

---

## 2. Master Environment Variables Specification

The following variables are defined across `Dockerfile`, `docker-compose.yml`, `.env.example`, and source code files:

| Variable Identifier | Scope | Type | Default Value | Mandatory? | Architectural Purpose & Operational Impact |
|:---|:---|:---|:---|:---|:---|
| `NODE_ENV` | Container / OS | String | `production` | **Yes** | Enforces Next.js production optimizations and standalone server bundle execution. |
| `PORT` | Container | Integer | `3000` | **Yes** | Internal listening port for the Next.js standalone HTTP server inside the container. |
| `HOSTNAME` | Container | String | `0.0.0.0` | **Yes** | Binds the Node.js server to all internal container network interfaces. |
| `OSIRIS_PORT` | Host OS | Integer | `3000` | No | Configures the published host machine port in `docker-compose.yml` (e.g., `3005`). |
| `NODE_OPTIONS` | Container | String | `--dns-result-order=ipv4first` | Recommended | Prevents IPv6 resolution delays on container networks lacking dual-stack IPv6 routing. |
| `SCANNER_URL` | Server | URL | `""` | No | Internal network URL of the RECON scanner daemon (e.g., `http://scanner:7700`). |
| `SCANNER_KEY` | Server | Secret | `""` | No | Shared 32-byte hexadecimal authentication secret matching backend `OSIRIS_KEY`. |
| `FIRMS_API_KEY` | Server | Secret | `""` | No | NASA FIRMS MAP_KEY for prioritized satellite fire queries. If empty, falls back to open CSV. |
| `OPENSKY_CLIENT_ID` | Server | Secret | `""` | No | OpenSky Network OAuth2 Client ID (effective March 2025) for authenticated higher-rate ADS-B limits. |
| `OPENSKY_CLIENT_SECRET` | Server | Secret | `""` | No | OpenSky Network OAuth2 Client Secret for token rotation. |
| `N2YO_API_KEY` | Server | Secret | `""` | No | N2YO API key for auxiliary satellite passes. If empty, CelesTrak TLE handles 100% of orbits. |
| `AIS_API_KEY` | Server | Secret | `""` | No | `aisstream.io` API key for real-time AIS vessel WebSocket streams. If empty, serves static ports. |
| `UMAMI_WEBSITE_ID` | Client/Edge | UUID | `cd8f216c...` | No | Website identifier for self-hosted privacy-focused analytics tracking. |
| `OI_MCP_ORIGINS` | Server | Comma CSV | `""` | No | Additional allowed browser CORS origins permitted to invoke the `/api/mcp` JSON-RPC server. |

---

## 3. Client-Side AI Byok (Bring Your Own Key) Specification

The OI Assist spatial copilot and OI Forecast multi-agent simulation engine do not require server-stored API keys. Instead, they operate on a zero-knowledge **BYOK (Bring Your Own Key)** architecture:

```
┌────────────────────────────────────────────────────────────────────────┐
│                    CLIENT-SIDE BYOK FLOW (ZERO-STORAGE)                │
├────────────────────────────────────────────────────────────────────────┤
│ 1. User enters API key in browser settings modal (stored in LocalStorage)│
│ 2. Browser injects key per-request via HTTP headers:                   │
│    • X-OI-Provider : "google" | "openai" | "anthropic" | "groq"        │
│    • X-OI-Key      : "AIzaSy..." | "sk-ant-..." | "sk-..."             │
│    • X-OI-Model    : "gemini-2.0-flash" | "gpt-4o" (optional)         │
│ 3. Next.js API route (/api/oi/assist) executes step and returns actions│
│ 4. Key is never written to disk, database, or server logs              │
└────────────────────────────────────────────────────────────────────────┘
```

Supported Providers & Header Identifiers:
- `google`: Google Gemini Models (`gemini-2.0-flash`, `gemini-1.5-pro`).
- `openai`: OpenAI GPT Models (`gpt-4o`, `gpt-4o-mini`).
- `anthropic`: Anthropic Claude Models (`claude-3-5-sonnet`, `claude-3-haiku`).
- `groq`: Groq Ultra-Low Latency Inference (`llama-3.3-70b-versatile`).
- `deepseek`: DeepSeek Reasoner & Chat (`deepseek-chat`, `deepseek-reasoner`).
- `xai`: xAI Grok Models (`grok-2-1212`).
- `mistral`: Mistral AI Enterprise Models (`mistral-large-latest`).
- `openrouter`: OpenRouter Universal Gateway.

---

## 4. Complete Endpoint Dependency & Failure Mode Matrix

This matrix catalogs all major OSIRIS API routes, detailing upstream hosts, networking protocols, cache durations, failure modes, and MoviSabio deployment disposition:

| Route Path | Method | Protocol | Upstream Host / URL | Cache Lifetime | Failure Mode & Fallback | Disposition for MoviSabio |
|:---|:---:|:---:|:---|:---|:---|:---|
| `/api/flights` | `GET` | HTTPS | `opendata.adsb.fi/api/v2` | In-memory 30 sectors | Degrades to OpenSky; returns empty array if both fail. | **Enabled (Corridors)** |
| `/api/aircraft` | `GET` | HTTPS | ADS-B Aggregator | 5 minutes | Disables detailed airframe card; keeps map marker. | **Enabled** |
| `/api/flight-route` | `GET` | HTTPS | FlightAware / Internal | 1 hour | Falls back to direct great-circle interpolation. | **Enabled** |
| `/api/maritime` | `GET` | WS / HTTPS | `stream.aisstream.io` | In-memory `shipsCache` | If key missing or WS disconnects, serves 39 static global ports & 10 chokepoints. | **Enabled** |
| `/api/cctv` | `GET` | HTTPS | 38+ Municipal DOTs & Bekijkhet.nu | 30 minutes | `stale-on-error`: serves last good cached cameras if DOT is offline. | **Flagship Enabled** |
| `/api/cctv/proxy` | `GET` | HTTPS | Upstream Camera Hosts | Pass-through | Returns 502 with diagnostic detail if camera IP is unreachable. | **Enabled** |
| `/api/cctv/resolve` | `GET` | HTTPS | Streaming Host Portals | 5 minutes | Drops live video back to static snapshot mode. | **Enabled** |
| `/api/earthquakes` | `GET` | HTTPS | `earthquake.usgs.gov` | `s-maxage=60` | Returns error object with empty array; map retains previous seismic frame. | **Enabled** |
| `/api/fires` | `GET` | HTTPS | `firms.modaps.eosdis.nasa.gov` | `s-maxage=600` | Falls back to NASA EONET v3 active volcanoes. | **Enabled** |
| `/api/weather` | `GET` | HTTPS | `api.open-meteo.com` | `s-maxage=900` | Suppresses severe weather polygons; base map operates unaffected. | **Enabled** |
| `/api/air-quality` | `GET` | HTTPS | `air-quality-api.open-meteo.com` | `s-maxage=1800` | Returns null contours; logs soft warning. | **Enabled** |
| `/api/satellites` | `GET` | HTTPS | `celestrak.org` | 6 hours | Falls back to cached local TLE snapshot; client SGP4 continues orbital math. | **Enabled** |
| `/api/satellites/orbit`| `GET` | Internal| SGP4 Solver | On-demand | Omits orbital track line; renders pinpoint satellite dot. | **Enabled** |
| `/api/space-weather` | `GET` | HTTPS | `services.swpc.noaa.gov` | `s-maxage=3600` | Silently hides solar flare HUD status pill. | **Enabled** |
| `/api/news` | `GET` | HTTPS | `t.me/s/*` + 9 RSS Wires | 3m (TG) / 5m (RSS) | Failed sources drop out of feed; remaining channels merge seamlessly. | **Filtered (Civic)** |
| `/api/live-news` | `GET` | Static | YouTube Live Streams | Static (24h) | External channels open in YouTube tab if embedding is rejected. | **Selective** |
| `/api/gdelt` | `GET` | HTTPS | `api.gdeltproject.org` | 15 minutes | Silently drops global incident dots. | **Optional** |
| `/api/conflicts` | `GET` | Static | Local Static Dataset | Static (24h) | Always succeeds from container bundle. | **Optional** |
| `/api/oi` | `GET` | Internal| Service Declaration | No-store | Returns 503 `disabledResponse` if feature flag is toggled off. | **Enabled** |
| `/api/oi/assist` | `POST` | HTTPS | Provider LLM APIs | Stateless | Returns 400 if client key is missing; 429 if rate-limited. | **Enabled (BYOK)** |
| `/api/oi/runs` | `POST` | HTTPS | Multi-Agent World Model | In-memory | Returns error if LLM budget exceeded; cancels active simulation. | **Quarantined** |
| `/api/mcp` | `POST` | HTTP | JSON-RPC 2.0 Handler | Stateless | Rejects disallowed origins with 403; validates protocol versions. | **Internal / Agents** |
| `/api/scanner` | `GET` | HTTP | `SCANNER_URL` Daemon | IP Rate-Limited | Returns 503 "Scanner not configured" when `SCANNER_KEY` is omitted. | **100% QUARANTINED** |
| `/api/osint/whois` | `GET` | HTTPS | RDAP Registry | 1 hour | Times out after 10s; surfaces sanitized WHOIS error. | **100% QUARANTINED** |
| `/api/osint/dns` | `GET` | DNS | Node `dns/promises` | No cache | Blocked by `ssrf-guard.ts` if target points to internal/private IP. | **100% QUARANTINED** |
| `/api/osint/crypto` | `GET` | HTTPS | `blockstream.info` / Blockscout | 5 minutes | Returns 400 for invalid blockchain address formats. | **EXCLUDED** |
| `/api/osint/sanctions` | `GET` | HTTP | `osiris-intel:4000` | 24 hours | Returns empty list if microservice container is unlinked. | **100% QUARANTINED** |

---

## 5. Network Egress & Port Whitelist Requirements

For firewalled enterprise or municipal cloud deployments, the host environment hosting OSIRIS requires outbound internet access on the following network destinations:

```
┌────────────────────────────────────────────────────────────────────────┐
│                  MANDATORY OUTBOUND NETWORK RULES                      │
├──────────────────────────┬───────────┬─────────────────────────────────┤
│ Destination Host / Range │ Port      │ Service Description             │
├──────────────────────────┼───────────┼─────────────────────────────────┤
│ opendata.adsb.fi         │ 443 (TCP) │ Live ADS-B Aviation Telemetry   │
│ *.adsbexchange.com       │ 443 (TCP) │ Aviation Fallback Stream        │
│ stream.aisstream.io      │ 443 (WSS) │ Real-Time AIS Maritime Vessel WS│
│ earthquake.usgs.gov      │ 443 (TCP) │ USGS Seismic Feed Ingestion     │
│ firms.modaps.eosdis.nasa │ 443 (TCP) │ NASA Active Fire Hotspots       │
│ eonet.gsfc.nasa.gov      │ 443 (TCP) │ NASA Volcano & Severe Events    │
│ api.open-meteo.com       │ 443 (TCP) │ Global Weather Telemetry        │
│ celestrak.org            │ 443 (TCP) │ NORAD Satellite TLE Elements    │
│ api.tfl.gov.uk           │ 443 (TCP) │ Transport for London Traffic Cam│
│ data.wsdot.wa.gov        │ 443 (TCP) │ Washington State DOT CCTV       │
│ feeds.bbci.co.uk         │ 443 (TCP) │ International News RSS Feeds    │
│ t.me                     │ 443 (TCP) │ Public Telegram Web Previews    │
│ generativelanguage.google│ 443 (TCP) │ Google Gemini API (OI Assist)   │
│ api.openai.com           │ 443 (TCP) │ OpenAI API (OI Assist)          │
│ api.anthropic.com        │ 443 (TCP) │ Anthropic API (OI Assist)       │
└──────────────────────────┴───────────┴─────────────────────────────────┘
```

*End of Deliverable 5.*
