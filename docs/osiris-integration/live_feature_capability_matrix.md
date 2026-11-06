# OSIRIS Live Feature Capability Matrix for MoviSabio

**Document ID:** `MOVI-CAP-2026-03`  
**Parent Project:** MoviSabio Live Territorial Intelligence Platform  
**Target Environments:** MoviSabio Corporate Platform × OSIRIS Engine  
**Audit Date:** November 2026  
**Auditor:** Principal Enterprise Architect & Telemetry Systems Engineer  

---

## 1. Executive Overview

This matrix provides an exhaustive, 13-point engineering assessment for every individual live telemetry and intelligence capability identified in the OSIRIS repository. Each module is evaluated for source files, existing API routes, upstream providers, authentication, rate limits, caching, refresh behavior, CORS, licensing, deployment, security risks, integration effort, and recommended deployment disposition within the MoviSabio ecosystem.

Capabilities are categorized into four operational tiers:
1. **Tier 1: Core Civic & Territorial Modules (Immediate Priority)** — CCTV, Aviation, Maritime, Earthquakes, Wildfires, Weather, Satellites, Global Map.
2. **Tier 2: AI Territorial Intelligence (High Value)** — OI Assist (Spatial Copilot), GeoJSON Area Analysis.
3. **Tier 3: Contextual Monitoring (Selective/Enterprise)** — Live Broadcasters, Curated News Wires, Telegram Geoparsed Feeds.
4. **Tier 4: Quarantined Cybersecurity & Specialized Systems** — RECON Scanner, Shodan, CVEs, OFAC Sanctions, Crypto Wallet Tracing, OI Forecast.

---

## 2. Comprehensive 17-Module Capability Evaluation

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        OSIRIS CAPABILITY DISPOSITION SPECTRUM                          │
├──────────────────────────┬─────────────────────────────┬───────────────────────────────┤
│    EMBED DIRECTLY        │     BACKEND PROXIED         │     QUARANTINED / ISOLATED    │
│  (Client GPU / Static)   │  (Container Runtime Req.)   │   (Internal / Secluded Only)  │
├──────────────────────────┼─────────────────────────────┼───────────────────────────────┤
│ • Global Map (MapLibre)  │ • Aviation Tracking (ADS-B) │ • RECON Scanner (Port Scan)   │
│ • USGS Earthquakes       │ • Public CCTV Streams       │ • Shodan Host Intelligence    │
│ • Satellite Orbit (SGP4) │ • NASA Wildfires (FIRMS)    │ • CVE Vulnerability Lookup    │
│ • GeoJSON Drawing / AOI  │ • Maritime Intelligence     │ • Crypto Wallet Tracing       │
│ • Verified News Streams  │ • Weather & Air Quality     │ • OFAC Sanctions Matching     │
│                          │ • OI Assist (BYOK AI)       │ • OI Forecast (Macro Engine)  │
└──────────────────────────┴─────────────────────────────┴───────────────────────────────┘
```

---

### Module 1: Global Live Intelligence Map (MapLibre WebGL Canvas)
1. **Relevant Source Files:** `src/components/OsirisMap.tsx` (3,425 lines), `src/lib/map-terrain.ts`, `src/lib/terrain-tiles.ts`, `src/lib/live-clouds.ts`, `public/dark-matter-style.json`.
2. **Existing API Routes:** `/api/proxy-tiles/route.ts` (for custom vector tile sets).
3. **Data Provider:** MapLibre GL open-source vector engine; basemap styles from CARTO / OpenStreetMap / local GeoJSON tiles.
4. **Authentication Requirements:** Keyless; uses local style configuration and open tile servers.
5. **Rate Limits:** Depends on basemap tile provider; none for local vector styles.
6. **Caching:** Tile-level browser caching (Cache-Control: 7 days) and Service Worker asset caching.
7. **Data Refresh Behaviour:** Continuous 60 FPS GPU redraw; camera fly-to animations driven by reactive props.
8. **CORS Requirements:** Tile servers must return `Access-Control-Allow-Origin: *`.
9. **Licensing & Attribution:** MapLibre GL (BSD 3-Clause); CARTO Dark Matter / OpenStreetMap (ODbL, requires visible map attribution).
10. **Deployment Requirements:** Modern WebGL2-compatible browser environment.
11. **Security Risks:** Minimal (client-side rendering). Ensure tile URL inputs are sanitized to prevent CSS injection.
12. **Integration Effort:** Low to Medium.
13. **Recommended MoviSabio Use:** **EMBED AS CORE CANVASS.** Replace static Leaflet map with this high-performance GPU map for the MoviSabio Live Center.

---

### Module 2: Aircraft & Aviation Tracking (ADS-B Live Fleet)
1. **Relevant Source Files:** `src/app/api/flights/route.ts`, `src/app/api/aircraft/route.ts`, `src/app/api/flight-route/route.ts`, `src/components/FlightWatchPanel.tsx`.
2. **Existing API Routes:** `/api/flights`, `/api/aircraft`, `/api/flight-route`.
3. **Data Provider:** Primary: `opendata.adsb.fi/api/v2` (free tar1090/ADSBexchange format); Secondary/Fallback: OpenSky Network API.
4. **Authentication Requirements:** Keyless for `adsb.fi`. OpenSky supports optional `OPENSKY_CLIENT_ID` and `OPENSKY_CLIENT_SECRET` for higher quotas.
5. **Rate Limits:** `adsb.fi` soft-throttles requests under 1 req/sec (1100ms gap enforced in `ADSBFI_GAP_MS`).
6. **Caching:** Server-side in-memory caching partitioned across 30 geographic airspace sectors.
7. **Data Refresh Behaviour:** Periodic client polling (every 15–30 seconds per active sector).
8. **CORS Requirements:** Internal Next.js API route handles CORS; requires proxying if called from external domain.
9. **Licensing & Attribution:** OpenSky (Attribution-NonCommercial/Academic); `adsb.fi` (Open Community ADS-B feed).
10. **Deployment Requirements:** Node.js server runtime executing outgoing HTTPS requests.
11. **Security Risks:** Low. Downstream military indicators filtered for operational safety.
12. **Integration Effort:** Medium.
13. **Recommended MoviSabio Use:** **EMBED DIRECTLY (CORRIDOR FOCUSED).** Showcase multimodal freight and airport connectivity around MoviSabio hubs (Campinas Viracopos Airport, Munich MUC, Milan MXP).

---

### Module 3: Maritime Intelligence & Vessel Tracking
1. **Relevant Source Files:** `src/app/api/maritime/route.ts`, `src/components/OsirisMap.tsx` (marine layers).
2. **Existing API Routes:** `/api/maritime`.
3. **Data Provider:** Real-time AIS stream via `aisstream.io` WebSocket; static curated catalog of 39 global container/energy ports and 10 strategic naval chokepoints.
4. **Authentication Requirements:** Static ports/chokepoints are keyless. Live real-time vessel stream requires `AIS_API_KEY`.
5. **Rate Limits:** `aisstream.io` enforces connection quotas based on API subscription tier.
6. **Caching:** Server-side in-memory `shipsCache` Map updated via persistent WebSocket listener.
7. **Data Refresh Behaviour:** Push-based WebSocket ingestion; client REST polls `/api/maritime` every 60 seconds.
8. **CORS Requirements:** Proxy handled via Next.js route.
9. **Licensing & Attribution:** Port metadata (MoviSabio / Public domain); `aisstream.io` data terms apply.
10. **Deployment Requirements:** Persistent Node.js container (cannot run on stateless serverless functions due to WebSocket listener).
11. **Security Risks:** Low. Displays international civilian and commercial shipping corridors.
12. **Integration Effort:** Low (static ports) to Medium (live AIS stream).
13. **Recommended MoviSabio Use:** **EMBED DIRECTLY.** Highly relevant for MoviSabio's Montevideo (Uruguay) Port Digital Twin and Santos (Brazil) maritime freight corridor.

---

### Module 4: Public Municipal Traffic Cameras (CCTV Network)
1. **Relevant Source Files:** `src/app/api/cctv/route.ts`, `src/app/api/cctv/proxy/route.ts`, `src/app/api/cctv/resolve/route.ts`, `src/app/api/cctv/texas.ts`, `src/app/api/cctv/germany.ts`, `src/app/api/cctv/italy.ts`, `src/app/api/cctv/world-live.ts`, `src/components/CameraViewer.tsx`, `src/components/CctvPreviews.tsx`.
2. **Existing API Routes:** `/api/cctv`, `/api/cctv/proxy`, `/api/cctv/resolve`, `/api/cctv/stream-status`.
3. **Data Provider:** 38+ municipal DOTs (TfL London, WSDOT, Caltrans, TxDOT, Autostrade per l'Italia, Autobahn GmbH, THB Taiwan, etc.) and Bekijkhet.nu directory.
4. **Authentication Requirements:** Keyless; all streams originate from public departmental web portals.
5. **Rate Limits:** Governed by individual municipal DOT servers; mitigated by OSIRIS's 30-minute in-memory cache and connection pooling.
6. **Caching:** 30-minute TTL in `sourceCache.ts` with in-flight stampede deduplication and stale-on-error fallback.
7. **Data Refresh Behaviour:** Camera index loaded per geographic bounding box; video plays live via HLS; snapshots refresh every 3–10 seconds.
8. **CORS Requirements:** Upstream camera images often block cross-origin requests; handled by `/api/cctv/proxy`.
9. **Licensing & Attribution:** Public government data / Open data; requires attribution link back to original transit operator.
10. **Deployment Requirements:** Node.js backend to execute proxy and token resolution.
11. **Security Risks:** Low (all cameras are positioned on public roadways, low-resolution, non-biometric, non-facial).
12. **Integration Effort:** Medium.
13. **Recommended MoviSabio Use:** **FLAGSHIP INTEGRATION MODULE.** Connect directly to MoviSabio's Computer Vision & Edge AI claims, focusing cameras on Germany, Italy, and Latin American pilot corridors.

---

### Module 5: Earthquake & Seismic Monitoring
1. **Relevant Source Files:** `src/app/api/earthquakes/route.ts`, `src/components/OsirisMap.tsx`.
2. **Existing API Routes:** `/api/earthquakes`.
3. **Data Provider:** United States Geological Survey (USGS) Earthquake Hazards Program (`earthquake.usgs.gov`).
4. **Authentication Requirements:** Keyless. Open public scientific API.
5. **Rate Limits:** Generous public allowance; upstream updates every minute.
6. **Caching:** `Cache-Control: public, s-maxage=60, stale-while-revalidate=120`.
7. **Data Refresh Behaviour:** Client polls every 60 seconds; map displays pulsing magnitude-scaled epicenters.
8. **CORS Requirements:** USGS natively sends `Access-Control-Allow-Origin: *`. Can be fetched directly by client if needed.
9. **Licensing & Attribution:** US Government Work / Public Domain.
10. **Deployment Requirements:** None (can even be fetched directly from static browser if needed).
11. **Security Risks:** Zero.
12. **Integration Effort:** Low (plug-and-play).
13. **Recommended MoviSabio Use:** **EMBED DIRECTLY.** Core component of MoviSabio's Environmental Intelligence & Urban Climate Resilience dashboard.

---

### Module 6: Wildfire Hotspots & Thermal Anomaly Intelligence
1. **Relevant Source Files:** `src/app/api/fires/route.ts`, `src/components/OsirisMap.tsx`.
2. **Existing API Routes:** `/api/fires`.
3. **Data Provider:** NASA FIRMS (Fire Information for Resource Management System) VIIRS/MODIS 24h CSV + NASA EONET v3.
4. **Authentication Requirements:** Keyless for public 24h CSV; `FIRMS_API_KEY` optional for custom satellite sectors.
5. **Rate Limits:** Standard NASA open data quotas; capped to ~2,000 sampled points globally to avoid WebGL lag.
6. **Caching:** `Cache-Control: public, s-maxage=600, stale-while-revalidate=1200` (10-minute server cache).
7. **Data Refresh Behaviour:** Refreshes on map layer activation or every 15 minutes.
8. **CORS Requirements:** Handled by Next.js route handler.
9. **Licensing & Attribution:** NASA Open Data Policy (freely usable with NASA attribution).
10. **Deployment Requirements:** Node.js runtime to download and parse large CSV telemetry.
11. **Security Risks:** Zero.
12. **Integration Effort:** Low to Medium.
13. **Recommended MoviSabio Use:** **EMBED DIRECTLY.** Demonstrates real-time territorial risk sensing for urban fringes and climate vulnerability modeling.

---

### Module 7: Severe Weather, Atmospheric Fronts & Air Quality
1. **Relevant Source Files:** `src/app/api/weather/route.ts`, `src/app/api/air-quality/route.ts`, `src/app/api/space-weather/route.ts`.
2. **Existing API Routes:** `/api/weather`, `/api/air-quality`, `/api/space-weather`.
3. **Data Provider:** Open-Meteo, NOAA EONET, NOAA Space Weather Prediction Center (SWPC).
4. **Authentication Requirements:** Keyless for open tiers.
5. **Rate Limits:** Open-Meteo allows up to 10,000 daily calls for non-commercial/academic use.
6. **Caching:** 15-minute to 1-hour cache headers (`s-maxage=900` to `3600`).
7. **Data Refresh Behaviour:** On-demand viewport queries and 15-minute background polling.
8. **CORS Requirements:** Proxy handled via Next.js API route.
9. **Licensing & Attribution:** Open-Meteo (Attribution CC-BY 4.0); NOAA (Public domain).
10. **Deployment Requirements:** Node.js backend.
11. **Security Risks:** Zero.
12. **Integration Effort:** Low to Medium.
13. **Recommended MoviSabio Use:** **EMBED DIRECTLY.** Direct reinforcement for MoviSabio's Weather-Adaptive Signal Actuation ($PM_{2.5}$ and rainfall telemetry).

---

### Module 8: Satellite Tracking & Real-Time Orbit Propagation
1. **Relevant Source Files:** `src/app/api/satellites/route.ts`, `src/app/api/satellites/orbit/route.ts`, `src/lib/orbit.ts`, `src/components/SatelliteCard.tsx`.
2. **Existing API Routes:** `/api/satellites`, `/api/satellites/orbit`.
3. **Data Provider:** CelesTrak NORAD two-line element sets (TLE); `N2YO` API (optional fallback).
4. **Authentication Requirements:** Keyless for CelesTrak; `N2YO_API_KEY` optional.
5. **Rate Limits:** CelesTrak throttles rapid bulk queries; solved in OSIRIS by fanning out across partitioned group endpoints.
6. **Caching:** In-memory TLE catalog cached for 6 hours; real-time latitude/longitude/altitude computed on-the-fly via client SGP4 solver.
7. **Data Refresh Behaviour:** Orbit propagation calculations run continuously on the client at 1 Hz.
8. **CORS Requirements:** Handled by backend proxy.
9. **Licensing & Attribution:** CelesTrak (Free educational/research use with citation); NORAD (Public domain).
10. **Deployment Requirements:** Node.js server for TLE fetching; client browser executes `satellite.js` math.
11. **Security Risks:** Low (tracks unclassified orbital objects published by Space-Track/NORAD).
12. **Integration Effort:** Medium.
13. **Recommended MoviSabio Use:** **EMBED DIRECTLY.** Validates MoviSabio's "Quantum-Ready & Space-Time Territorial Intelligence" branding by tracking Earth Observation satellites (Sentinel, Landsat, Planet).

---

### Module 9: Live Broadcaster Network (24/7 Global News Streams)
1. **Relevant Source Files:** `src/app/api/live-news/route.ts`, `src/components/LiveNewsPreviews.tsx`.
2. **Existing API Routes:** `/api/live-news`.
3. **Data Provider:** 23 curated international broadcasters (Sky News, France 24, DW News, Al Jazeera, NHK World, CNA, WION).
4. **Authentication Requirements:** Keyless; YouTube public live streams.
5. **Rate Limits:** None (uses standard YouTube embed player).
6. **Caching:** Static configuration with 24-hour cache header.
7. **Data Refresh Behaviour:** On-demand playback when operator clicks broadcaster pin.
8. **CORS Requirements:** Rendered inside YouTube `<iframe>` elements configured with `embed_allowed: true`.
9. **Licensing & Attribution:** YouTube Embed Terms of Service; broadcast rights remain with parent newsrooms.
10. **Deployment Requirements:** None.
11. **Security Risks:** Low (sandboxed iframes, muted autoplay).
12. **Integration Effort:** Low.
13. **Recommended MoviSabio Use:** **SELECTIVE INTEGRATION.** Include major business/civic broadcasters (DW, France 24, Sky News) inside a collapsible operations drawer.

---

### Module 10: News Feeds & Live Breaking Alerts
1. **Relevant Source Files:** `src/app/api/news/route.ts`, `src/lib/telegram.ts`, `src/lib/alert-places.ts`, `src/components/LiveAlerts.tsx`.
2. **Existing API Routes:** `/api/news`.
3. **Data Provider:** 9 international wire RSS feeds (BBC, Guardian, Al Jazeera, Times of Israel, TASS, Anadolu, SCMP, CNA, Africanews) + 9 public Telegram war/incident channels.
4. **Authentication Requirements:** Keyless; unauthenticated `t.me/s/<channel>` web scraping.
5. **Rate Limits:** Scrapes rate-paced with 3-minute in-memory caching.
6. **Caching:** 3-minute TTL for Telegram; 5-minute TTL for RSS wires.
7. **Data Refresh Behaviour:** Polled every 3 minutes; updates the Live Alerts ticker.
8. **CORS Requirements:** Handled by backend proxy.
9. **Licensing & Attribution:** Content quoted with link directly to original publisher. Partisan bias explicitly labeled (`western`, `russian`, `regional`, `independent`).
10. **Deployment Requirements:** Node.js backend.
11. **Security Risks:** Medium (unfiltered live event reports; potential misinformation during breaking crises).
12. **Integration Effort:** Medium.
13. **Recommended MoviSabio Use:** **FILTERED / CIVIC ONLY.** For MoviSabio corporate deployment, filter news feeds strictly to civil infrastructure, environmental events, and international logistics, suppressing partisan wartime channels.

---

### Module 11: Cyber Threat & Botnet C2 Intelligence
1. **Relevant Source Files:** `src/app/api/cyber-threats/route.ts`, `src/app/api/cyber-attacks/route.ts`, `src/app/api/malware/route.ts`, `src/lib/malware-intel.ts`.
2. **Existing API Routes:** `/api/cyber-threats`, `/api/cyber-attacks`, `/api/malware`, `/api/malware/stream`.
3. **Data Provider:** Public threat intelligence feeds (abuse.ch, URLhaus, ThreatFox, Feodo Tracker).
4. **Authentication Requirements:** Keyless.
5. **Rate Limits:** Standard community limits; cached server-side.
6. **Caching:** 15-minute to 1-hour cache.
7. **Data Refresh Behaviour:** Renders vector attack lines and active malware beacons on the map.
8. **CORS Requirements:** Handled by Next.js backend.
9. **Licensing & Attribution:** Abuse.ch open terms.
10. **Deployment Requirements:** Node.js runtime.
11. **Security Risks:** Low (passive consumption of known malicious C2 IP indicators).
12. **Integration Effort:** Medium.
13. **Recommended MoviSabio Use:** **SECONDARY / ENTERPRISE ONLY.** Can be included as an optional "Critical Infrastructure Cyber Defense" toggle, but kept subordinate to physical smart-city telemetry.

---

### Module 12: OFAC SDN Sanctions Search & Graph Matching
1. **Relevant Source Files:** `src/app/api/osint/sanctions/route.ts`, `intel/server.js`, `src/lib/sanctions.ts`.
2. **Existing API Routes:** `/api/osint/sanctions`, `http://osiris-intel:4000/resolve`.
3. **Data Provider:** OpenSanctions (`data.opensanctions.org`) mirroring US OFAC Specially Designated Nationals (SDN).
4. **Authentication Requirements:** Keyless.
5. **Rate Limits:** Downloaded once every 24 hours into memory (~7 MB CSV).
6. **Caching:** In-memory graph index refreshed daily.
7. **Data Refresh Behaviour:** On-demand string/entity query search.
8. **CORS Requirements:** Handled by internal Express microservice.
9. **Licensing & Attribution:** OpenSanctions (Creative Commons CC-BY 4.0).
10. **Deployment Requirements:** Requires running the `osiris-intel` microservice container.
11. **Security Risks:** Medium (false-positive defamation risk if automated name matching is not qualified with legal disclaimers).
12. **Integration Effort:** High.
13. **Recommended MoviSabio Use:** **QUARANTINED / INTERNAL ONLY.** Not suitable for a municipal corporate smart-city homepage. Keep isolated.

---

### Module 13: Crypto Wallet Intelligence & Transaction Tracing
1. **Relevant Source Files:** `src/app/api/crypto/route.ts`, `src/app/api/osint/crypto/route.ts`, `src/lib/chainIntel.ts`.
2. **Existing API Routes:** `/api/crypto`, `/api/osint/crypto`.
3. **Data Provider:** Blockstream Esplora API (Bitcoin) and Blockscout (Ethereum), cross-referenced with OFAC sanctioned wallet list.
4. **Authentication Requirements:** Keyless.
5. **Rate Limits:** Public API limits on Blockstream and Blockscout.
6. **Caching:** 5-minute cache per queried address.
7. **Data Refresh Behaviour:** User-initiated address lookup.
8. **CORS Requirements:** Handled by Next.js route.
9. **Licensing & Attribution:** Open APIs.
10. **Deployment Requirements:** Node.js backend.
11. **Security Risks:** Low.
12. **Integration Effort:** Medium.
13. **Recommended MoviSabio Use:** **QUARANTINED / EXCLUDE.** Crypto asset tracing has zero relevance to municipal traffic signal synchronization or territorial digital twins. Exclude from MoviSabio.

---

### Module 14: OI Assist (Conversational Spatial AI Copilot)
1. **Relevant Source Files:** `src/app/api/oi/assist/route.ts`, `src/lib/oi/assist/server.ts`, `src/lib/oi/assist/tools.ts`, `src/components/oi/assist/AssistView.tsx`.
2. **Existing API Routes:** `/api/oi/assist`.
3. **Data Provider:** Multi-LLM provider abstraction: Google Gemini (`gemini-2.0-flash`), OpenAI, Anthropic Claude, Groq, DeepSeek, Mistral.
4. **Authentication Requirements:** Client BYOK (Bring Your Own Key) via `X-OI-Key` and `X-OI-Provider` HTTP headers.
5. **Rate Limits:** Controlled by client's personal API key; server applies token-bucket throttling (40 steps/min).
6. **Caching:** Stateless; conversations buffered in browser memory.
7. **Data Refresh Behaviour:** Streaming conversational turn; AI executes spatial tool calls (pans camera, activates layers, queries entity count).
8. **CORS Requirements:** Cross-origin allowed with preflight `OPTIONS` handling.
9. **Licensing & Attribution:** LLM provider terms of service.
10. **Deployment Requirements:** Node.js backend running `@google/generative-ai` or provider SDKs.
11. **Security Risks:** Low (user brings their own key; keys never stored on server).
12. **Integration Effort:** High.
13. **Recommended MoviSabio Use:** **HIGH-VALUE OPTIONAL EMBED.** Branded as *"MoviSabio Territory Copilot"*, allowing city managers to command the map using natural language.

---

### Module 15: OI Forecast (Multi-Agent Geopolitical & Macro Simulation)
1. **Relevant Source Files:** `src/app/api/oi/route.ts`, `src/app/api/oi/runs/route.ts`, `src/app/api/oi/runs/[id]/events/route.ts`, `src/lib/oi/engine.ts`, `src/components/oi/Workspace.tsx`.
2. **Existing API Routes:** `/api/oi/runs`, `/api/oi/runs/[id]`, `/api/oi/runs/[id]/events` (SSE).
3. **Data Provider:** Multi-agent LLM reasoning based on MiroFish architecture, pulling GDELT, Wikipedia Current Events, Polymarket prediction prices, and historical market feeds.
4. **Authentication Requirements:** Client BYOK.
5. **Rate Limits:** Consumes significant LLM tokens per simulation run (~34 to ~132 model calls).
6. **Caching:** Runs stored in ephemeral memory for the duration of the browser session.
7. **Data Refresh Behaviour:** Real-time Server-Sent Events (SSE) streaming actor moves, world states, and probability curves.
8. **CORS Requirements:** SSE streaming requires specific reverse-proxy headers (`X-Accel-Buffering: no`).
9. **Licensing & Attribution:** Original OSIRIS implementation; MiroFish methodology cited.
10. **Deployment Requirements:** High-compute Node.js runtime with sustained SSE connection support.
11. **Security Risks:** Medium (heavy token consumption, potential prompt injection).
12. **Integration Effort:** High.
13. **Recommended MoviSabio Use:** **QUARANTINED / SPECIALIZED PHASE 2.** Too complex and resource-intensive for the public corporate site. Preserve as an enterprise consulting module.

---

### Module 16: RECON Toolkit & Active Vulnerability Scanning
1. **Relevant Source Files:** `src/app/api/scanner/route.ts`, `src/app/api/osint/*`, `src/lib/ssrf-guard.ts`, `src/components/OsintPanel.tsx`.
2. **Existing API Routes:** `/api/scanner`, `/api/osint/whois`, `/api/osint/dns`, `/api/osint/ip`, `/api/osint/cve`, `/api/osint/certs`, `/api/osint/shodan`.
3. **Data Provider:** Dedicated backend scanner daemon (`SCANNER_URL`), NVD, Shodan, RDAP/WHOIS.
4. **Authentication Requirements:** `SCANNER_KEY` required; returns 503 if omitted.
5. **Rate Limits:** Strictly capped to 5 scans per minute per client IP.
6. **Caching:** 1-hour to 24-hour cache for passive records; active scans un-cached.
7. **Data Refresh Behaviour:** On-demand scanning upon target submission.
8. **CORS Requirements:** Handled by Next.js proxy.
9. **Licensing & Attribution:** Proprietary scanning scripts / NVD open public domain.
10. **Deployment Requirements:** External scanning daemon with elevated networking privileges.
11. **Security Risks:** **HIGH / DANGEROUS.** Active port scanning, TCP connect probes, and version banner harvesting from a public corporate domain can trigger security blacklisting, abuse reports, or legal liability.
12. **Integration Effort:** High.
13. **Recommended MoviSabio Use:** **STRICTLY PROHIBITED ON PUBLIC SITE / 100% QUARANTINED.** Must be omitted or locked behind internal enterprise VPN authentication.

---

### Module 17: GeoJSON Drawing Tools & Area-of-Interest (AOI) Analysis
1. **Relevant Source Files:** `src/lib/draw.ts`, `src/lib/aoi.ts`, `src/components/DrawingToolbar.tsx`, `src/components/DrawHud.tsx`.
2. **Existing API Routes:** Client-side compute only (pure vector geometry in `draw.ts`).
3. **Data Provider:** Turf.js / MapLibre GL spatial geometry calculations.
4. **Authentication Requirements:** Keyless.
5. **Rate Limits:** None (client-side execution).
6. **Caching:** LocalStorage / memory state.
7. **Data Refresh Behaviour:** Interactive drawing lifecycle (polygon vertex creation, bounding box drag, perimeter/area calculation).
8. **CORS Requirements:** None.
9. **Licensing & Attribution:** Open-source MIT.
10. **Deployment Requirements:** Standard browser environment.
11. **Security Risks:** Zero.
12. **Integration Effort:** Low.
13. **Recommended MoviSabio Use:** **EMBED DIRECTLY.** Excellent feature for municipal clients to draw a custom corridor polygon (e.g., across Campinas or Milan) and automatically count and inspect all cameras and traffic nodes enclosed within it.

---

## 3. Summary Capability Disposition Table

| Module Name | Public Embedding Feasibility | Infrastructure Requirement | Disposition for MoviSabio |
|:---|:---|:---|:---|
| **1. Global WebGL Map** | **Immediate (100%)** | Client Browser (WebGL2) | **Core Canvas** on `live.movisabio.com` |
| **2. Aviation Tracking** | **Immediate (100%)** | Backend Proxy Node | **Embed (Corridor Focused)** |
| **3. Maritime Ports/AIS**| **Immediate (100%)** | Node Container / WebSocket | **Embed (Santos/Montevideo Focused)**|
| **4. Municipal CCTV** | **Immediate (100%)** | Node Proxy + HLS Decoder | **Flagship Smart City Feature** |
| **5. USGS Earthquakes** | **Immediate (100%)** | Static Client / Server Cache| **Embed Directly (Disaster Resilience)**|
| **6. NASA Wildfires** | **Immediate (100%)** | Node CSV Ingestion | **Embed Directly (Thermal Sensing)** |
| **7. Weather & Air Quality**| **Immediate (100%)**| Open-Meteo Proxy | **Embed Directly ($PM_{2.5}$ Modeling)** |
| **8. Satellites (SGP4)** | **Immediate (100%)** | Client `satellite.js` Solver | **Embed Directly (Space-Time Twin)** |
| **9. Live News Streams** | **Conditional (80%)** | Sandboxed YouTube IFrames | **Selective (Business/Civic Only)** |
| **10. Telegram/Wire Alerts**| **Conditional (50%)**| Node Scraper + Caching | **Filtered (Civic/Urban Incidents Only)**|
| **11. Cyber Threat C2** | **Selective (40%)** | Community Threat Proxies | **Phase 2 / Critical Infrastructure Only**|
| **12. OFAC Sanctions** | **Prohibited (0%)** | `osiris-intel` Microservice | **Quarantined / Internal Only** |
| **13. Crypto Tracing** | **Prohibited (0%)** | Blockstream/Blockscout API | **Excluded (Off-Brand)** |
| **14. OI Assist (Copilot)**| **High Value (90%)** | BYOK Gemini/OpenAI Proxy | **Optional Feature ("Territory Copilot")**|
| **15. OI Forecast** | **Prohibited (10%)** | SSE Engine + Heavy LLM Compute| **Quarantined / Enterprise Consulting** |
| **16. RECON Scanner** | **STRICTLY PROHIBITED (0%)**| Host Scanning Daemon | **100% Air-Gapped / Isolated** |
| **17. GeoJSON AOI Tools** | **Immediate (100%)** | Client Vector Geometry | **Embed Directly (Corridor Scoping)** |

*End of Deliverable 3.*
