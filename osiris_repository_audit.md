# OSIRIS Repository Audit & Technical Baseline Report

**Document ID:** `OSIRIS-AUD-2026-01`  
**Target Repository:** `https://github.com/alimulfazalnabil/osiris`  
**Parent Organization:** MoviSabio Live Territorial Intelligence Platform  
**Audit Date:** November 2026  
**Auditor:** Principal Enterprise Software Architect & Systems Security Engineer  
**Inspection Mode:** Static Codebase Audit (Zero Mutation Baseline)

---

## 1. Executive Summary

A comprehensive, evidence-based technical audit was conducted on the **OSIRIS** (Open Source Intelligence & Reconnaissance Integrated System) codebase. OSIRIS is a production-grade, real-time spatial intelligence platform engineered to aggregate multi-domain global feeds—including commercial and military aviation, automatic identification system (AIS) maritime vessel traffic, public traffic CCTV networks, USGS seismic monitoring, NASA active wildfire telemetry, NOAA space weather, Low Earth Orbit (LEO) satellite propagation, and 24/7 global news broadcasting—into a unified, GPU-accelerated geospatial interface.

The application is architected around **Next.js 16.3.4 (App Router)**, **React 19.2.4**, **TypeScript 5**, and **MapLibre GL JS 6.7.0**, rendering tens of thousands of dynamic vector entities at 60 FPS via WebGL. Beyond raw spatial telemetry, OSIRIS incorporates an autonomous multi-agent simulation and prediction engine (**OI** / Open Intelligence) running parallel-world scenario modeling, a standards-compliant **Model Context Protocol (MCP)** server for autonomous AI agents, and a sandboxed **RECON** cybersecurity intelligence toolkit.

This audit establishes the concrete structural foundations of OSIRIS to inform its integration into the MoviSabio corporate web ecosystem as a branded **Live Territorial Intelligence Center**.

---

## 2. Technology Stack & Core Dependencies

The OSIRIS codebase was analyzed from its root `package.json`, `tsconfig.json`, `next.config.ts`, and directory hierarchy:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                             OSIRIS CLIENT                               │
│  ┌─────────────────────────┐  ┌────────────────┐  ┌──────────────────┐  │
│  │     MapLibre GL JS      │  │ Framer Motion  │  │ Lightweight      │  │
│  │   WebGL GPU Engine      │  │ UI Animations  │  │ Trading Charts   │  │
│  │   60 FPS Vector Render  │  │ Dynamic Panels │  │ Time-Series Res. │  │
│  └─────────────────────────┘  └────────────────┘  └──────────────────┘  │
├─────────────────────────────────────────────────────────────────────────┤
│                     NEXT.JS 16 SERVER RUNTIME                           │
│  ┌─────────────────────────┐  ┌────────────────┐  ┌──────────────────┐  │
│  │   Server-Sent Events    │  │  In-Memory     │  │  SSRF & Subnet   │  │
│  │   Live Telemetry Push   │  │  TTL Cache     │  │  Validation      │  │
│  │   /api/oi/runs/events   │  │  sourceCache   │  │  ssrf-guard.ts   │  │
│  └─────────────────────────┘  └────────────────┘  └──────────────────┘  │
├─────────────────────────────────────────────────────────────────────────┤
│                    MICROSERVICES & CONTAINER FABRIC                     │
│  ┌─────────────────────────┐  ┌────────────────┐  ┌──────────────────┐  │
│  │      osiris-web         │  │  osiris-intel  │  │   osiris-cache   │  │
│  │   Next.js Standalone    │  │  Express Micro │  │   Nginx Alpine   │  │
│  │   Port 3000 (Node 22)   │  │  Port 4000     │  │   Port 8080      │  │
│  └─────────────────────────┘  └────────────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```

### 2.1 Core Runtime Dependencies

| Package | Version | Architectural Role | Operational Mechanism |
|:---|:---|:---|:---|
| `next` | `16.3.4` | Application Framework | App Router, Server Components, standalone output mode for containerization. |
| `react` / `react-dom` | `19.2.4` | View Layer | Server & Client component rendering with concurrent rendering hooks. |
| `maplibre-gl` | `6.7.0` | Geospatial Map Engine | WebGL2 GPU-accelerated vector rendering, custom shaders, 3D terrain mesh. |
| `react-map-gl` | `8.1.1` | MapLibre React Wrapper | Declarative camera bindings, viewport synchronization, and event lifecycle. |
| `@google/generative-ai`| `0.24.1` | AI Engine (Gemini) | Powers OI Assist conversational copilot and briefing synthesizers. |
| `satellite.js` | `7.0.0` | Orbit Propagation | Real-time SGP4/SDP4 mathematical model calculating LEO/MEO/GEO coordinates. |
| `hls.js` | `1.6.16` | Video Stream Decoding | HTTP Live Streaming (HLS) decoder for live municipal traffic camera playback. |
| `lightweight-charts` | `5.2.0` | Financial Visualizer | High-performance canvas-based candlestick and line charts for market assets. |
| `framer-motion` | `12.38.0` | Motion Engine | Hardware-accelerated drawer transitions, HUD alert popups, and modal springs. |
| `rss-parser` | `3.13.0` | Feed Aggregation | Ingestion and normalization of international news wires (BBC, TASS, etc.). |
| `sharp` | `0.35.4` | Image Processing | High-speed server-side resizing and optimization for CCTV snapshot caching. |
| `ws` | `8.21.0` | WebSocket Client | Persistent duplex connection to live AIS maritime vessel streams (`aisstream.io`). |
| `google-libphonenumber`| `3.2.44` | OSINT Validation | International telecommunication numbering plan validation and carrier parsing. |
| `lucide-react` | `1.14.0` | Iconography | Standardized scalable vector icons for layers, controls, and alert pills. |

---

## 3. Directory Structure & Codebase Organization

The repository adheres to a clean Next.js App Router structure with dedicated service modules:

```
osiris/
├── .dockerignore
├── .env.example              # Keyless defaults with optional API keys
├── Dockerfile                # Multi-stage Node 22-alpine standalone build
├── docker-compose.yml        # Orchestration: osiris, osiris-cache, osiris-intel
├── DOCKER.md                 # Containerization & CasaOS deployment guide
├── SECURITY.md               # Responsible usage and vulnerability disclosure policy
├── next.config.ts            # Standalone output, worker compilation, image domains
├── intel/                    # Standalone Ontology & Sanctions Microservice
│   ├── Dockerfile            # Node-alpine lightweight container
│   ├── package.json          # Express microservice dependencies
│   └── server.js             # Port 4000: OpenSanctions CSV graph & Wikidata SPARQL
├── nginx/
│   └── nginx.conf            # Reverse proxy & response caching configuration
├── public/
│   ├── dark-matter-style.json# Local MapLibre basemap style
│   ├── casaos-icon.png       # Application icon asset
│   └── vendor/maplibre/      # Pinned MapLibre GL worker binaries
├── src/
│   ├── middleware.ts         # Edge analytics interception (Umami integration)
│   ├── app/
│   │   ├── layout.tsx        # Root HTML wrapper and font definitions
│   │   ├── page.tsx          # Main intelligence dashboard entrypoint
│   │   ├── docs/             # Interactive API documentation and catalog
│   │   └── api/              # 96+ API route handlers (detailed in §4)
│   ├── components/           # React UI components (detailed in §5)
│   │   ├── OsirisMap.tsx     # 3,425-line GPU MapLibre canvas engine
│   │   ├── LayerPanel.tsx    # 16-group intelligence layer control rail
│   │   ├── CameraViewer.tsx  # HLS video / snapshot streaming modal
│   │   ├── oi/               # Multi-agent simulation & prediction UI suite
│   │   └── ...
│   └── lib/                  # Backend utilities, caches, and algorithms
│       ├── sourceCache.ts    # In-memory TTL cache with stampede deduplication
│       ├── ssrf-guard.ts     # Canonical IP parsing & SSRF defense-in-depth
│       ├── orbit.ts          # SGP4 satellite position calculator
│       ├── draw.ts           # Polygon drawing and GeoJSON boundary geometry
│       └── oi/               # Simulation world engine, prompts, and MCP server
└── tools/
    └── prepare-map-worker.mjs# Build pre-hook pinning MapLibre web worker
```

---

## 4. Complete API Route Catalog

The OSIRIS backend provides 96 distinct API route handlers within `src/app/api/`. Below is the functional classification of all verified endpoints:

### 4.1 Live Geospatial & Territorial Telemetry

| Route Endpoint | HTTP | Upstream Provider | Auth Requirement | Caching Policy | Key Functionality |
|:---|:---|:---|:---|:---|:---|
| `/api/flights` | `GET` | `opendata.adsb.fi` / OpenSky | Keyless (OpenSky OAuth optional) | In-memory 30-region sweep, 1.1s gate | Ingests commercial, private, military, and bizjet ADS-B transponder telemetry globally. |
| `/api/aircraft` | `GET` | ADS-B Aggregator | Keyless | Viewport-filtered | Returns detailed airframe metadata, flight history, and destination airport lookups. |
| `/api/flight-route` | `GET` | OpenSky / FlightAware | Keyless | 1-hour TTL | Interpolates great-circle origin-to-destination flight path geometries. |
| `/api/maritime` | `GET` | `aisstream.io` + Static | Keyless (Live AIS requires key) | In-memory `shipsCache` Map | Ingests real-time AIS vessel locations; renders 39 global container/energy ports and 10 strategic naval chokepoints. |
| `/api/cctv` | `GET` | 38+ Municipal DOTs & Bekijkhet.nu | Keyless | 30m TTL via `sourceCache` | Queries 17,000+ public road/traffic cameras across US, Europe, Asia, LATAM, and Australasia. |
| `/api/cctv/proxy` | `GET` | Upstream Video/JPEG | Keyless | Pass-through with CORS rewrite | Proxies blocked camera feeds to bypass upstream CORS and hotlinking restrictions. |
| `/api/cctv/resolve` | `GET` | Streaming hosts | Keyless | 5-minute memory cache | Resolves dynamic streaming tokens and HLS `.m3u8` manifests for public webcams. |
| `/api/earthquakes` | `GET` | USGS Seismic Feed | Keyless | `s-maxage=60` | Real-time seismic events (last 24h, M2.5+) with epicenter, depth, and tsunami flags. |
| `/api/fires` | `GET` | NASA FIRMS + EONET | Keyless | `s-maxage=600` (10 min) | Ingests VIIRS/MODIS thermal anomalies and active volcanic eruption events globally. |
| `/api/weather` | `GET` | Open-Meteo / NOAA | Keyless | `s-maxage=900` (15 min) | Severe meteorological weather fronts, storm cells, atmospheric pressure, and precipitation. |
| `/api/air-quality` | `GET` | Open-Meteo Air Quality | Keyless | `s-maxage=1800` (30 min) | Atmospheric $PM_{2.5}$, $PM_{10}$, $NO_2$, and ozone ($O_3$) concentration contours. |
| `/api/satellites` | `GET` | CelesTrak NORAD | Keyless (N2YO optional) | In-memory TLE catalog | SGP4 propagation of 4,000+ active satellites categorized into Starlink, GPS, Earth Obs, and Military Recon. |
| `/api/satellites/orbit` | `GET` | SGP4 Math Solver | Keyless | Computed on demand | Calculates closed ground-track orbital ellipses for selected satellite NORAD IDs. |
| `/api/space-weather` | `GET` | NOAA SWPC | Keyless | `s-maxage=3600` (1 hr) | Solar flare events, geomagnetic storms (Kp index), and radio blackout alerts. |

### 4.2 News, Geopolitics & OSINT Feeds

| Route Endpoint | HTTP | Upstream Provider | Auth Requirement | Caching Policy | Key Functionality |
|:---|:---|:---|:---|:---|:---|
| `/api/news` | `GET` | Telegram + RSS Wires | Keyless | 3m (TG) / 5m (RSS) | Scrapes public `t.me/s/<channel>` previews and merges with 9 international RSS wires (BBC, TASS, Al Jazeera). |
| `/api/live-news` | `GET` | Curated Broadcasters | Keyless | Static JSON (24h cache) | 23 international broadcast streams with verified YouTube embed permissions. |
| `/api/gdelt` | `GET` | GDELT Project API | Keyless | 15-minute cache | Global database of events, language, and tone tracking civil unrest and geopolitical tensions. |
| `/api/conflicts` | `GET` | Static OSINT Dataset | Keyless | Static cache | 13 active conflict zones categorized by severity (Wars, High Tension, Elevated). |
| `/api/frontlines` | `GET` | OSINT GeoJSON | Keyless | Daily refresh | Geospatial vector linestrings representing active military frontline engagements. |

### 4.3 RECON Cybersecurity & Threat Intelligence

| Route Endpoint | HTTP | Upstream Provider | Auth Requirement | Caching Policy | Key Functionality |
|:---|:---|:---|:---|:---|:---|
| `/api/scanner` | `GET` | Backend Scanner Engine | `SCANNER_KEY` header | IP rate-limited (5/min) | Proxies requests to internal scanning backend for quick, SSL, headers, rdns, tech, and whois scans. |
| `/api/osint/whois` | `GET` | RDAP / WHOIS | Keyless | 1-hour cache | Domain registration lookup cross-referenced with OFAC SDN sanctions list. |
| `/api/osint/dns` | `GET` | Node `dns/promises` | Keyless | No cache | Resolves A, AAAA, MX, NS, TXT, CNAME records with SSRF IP validation. |
| `/api/osint/ip` | `GET` | `ip-api.com` / RIPE Stat | Keyless | 24-hour cache | Geolocation, ASN owner, and threat reputation cross-referenced with sanctions graph. |
| `/api/osint/cve` | `GET` | NIST NVD Database | Keyless | 6-hour cache | Common Vulnerabilities and Exposures (CVE) lookup and CVSS severity scoring. |
| `/api/osint/crypto` | `GET` | Blockstream / Blockscout| Keyless | 5-minute cache | Bitcoin (BTC) and Ethereum (ETH) wallet balance, transaction history, and OFAC sanctions badge. |
| `/api/osint/sanctions` | `GET` | OpenSanctions / `osiris-intel` | Keyless | In-memory 24h graph | Exact and fuzzy search across sanctioned persons, organizations, maritime vessels, and aircraft. |

### 4.4 OI Prediction Suite & MCP Server

| Route Endpoint | HTTP | Upstream Provider | Auth Requirement | Caching Policy | Key Functionality |
|:---|:---|:---|:---|:---|:---|
| `/api/oi` | `GET` | Internal Service | Keyless | No-store | Service discovery declaring supported AI providers, simulation depths, and capabilities. |
| `/api/oi/assist` | `POST` | Gemini / OpenAI / Claude| Client BYOK Header | Stateless (No-store) | Conversational copilot executing spatial actions: camera fly-to, layer toggles, and radius queries. |
| `/api/oi/runs` | `POST` | Multi-Agent Engine | Client BYOK Header | In-memory session store| Launches parallel-world simulations researching open questions and computing calibrated probabilities. |
| `/api/oi/runs/[id]/events`| `GET` | Server-Sent Events | Session Token | Real-time stream | Pushes live simulation trace events, actor decisions, and world outcomes to client UI. |
| `/api/mcp` | `POST` | Model Context Protocol | Client BYOK Header | Stateless JSON-RPC 2.0 | Streamable HTTP MCP server exposing `oi_predict`, `oi_get_run`, `oi_ask`, and world brief tools. |

---

## 5. UI Architecture & Client Components

The client UI is concentrated in `src/components/`, constructed for military-grade dark situational awareness with rapid interactive responsiveness:

### 5.1 `OsirisMap.tsx` (Core Geospatial Canvas)
- **Size & Complexity:** 3,425 lines of specialized TypeScript.
- **Engine:** MapLibre GL JS operating in pure WebGL mode.
- **Projections:** Mercator 2D and 3D Globe with smooth camera orbital transitions.
- **Terrain & Elevation:** MapLibre 3D terrain meshes utilizing Mapbox/Terrarium encoded elevation DEM tiles (`src/lib/terrain-tiles.ts`).
- **Layers Rendered:**
  - Dynamic ADS-B aircraft markers with direction vectors, altitude encoding, and velocity vectors.
  - AIS maritime vessels with heading lines and cargo volume indicators.
  - Municipal CCTV cluster markers expanding into interactive camera feeds.
  - USGS earthquake epicenters with depth-color coding and magnitude pulsing circles.
  - NASA thermal wildfire clusters with fire radiative power (FRP) sizing.
  - LEO/GEO satellite points with live orbital ground tracks.
  - Live NOAA cloud cover raster overlay updated hourly.
  - Day/Night solar terminator shadow polygon moving with astronomical solar position.
  - Vector turn-by-turn routing lines and user-drawn AOI polygons.

### 5.2 `LayerPanel.tsx` (Intelligence Layer Rails)
- **Structure:** 16 grouped intelligence layer toggles organized into 9 operational domains:
  1. `SDK`: Maritime lines and Live Clouds.
  2. `AVIATION`: Commercial, Private, Private Jets, Military.
  3. `MARITIME`: Commercial container, energy tankers, naval bases, chokepoints.
  4. `SPACE`: All Satellites, Comms, Military, GPS/Nav, Earth Obs, Science.
  5. `SURVEIL`: Municipal CCTV and Live Video Previews.
  6. `HAZARD`: Earthquakes, Active Fires, Severe Weather.
  7. `THREAT`: Nuclear facilities, Global GDELT incidents, Live alert pins.
  8. `NETWORK`: Live malware beacons, Botnet C2 servers, Cloudflare outages.
  9. `DISPLAY`: Day/Night cycle, 3D Buildings, 3D Mountain Terrain.
- **Interaction Model:** Minimalist toggle switches (`Framer Motion`), hierarchy indentation for dependent sublayers (e.g., Live Previews nested under CCTV), and keyboard hotkeys (`F` for flights, `E` for earthquakes, `S` for satellites, `D` for day/night).

### 5.3 Auxiliary Panels & Specialized Viewers
- `CameraViewer.tsx` / `CctvPreviews.tsx`: Decodes live camera streams using `hls.js` or auto-refreshing JPEG snapshot sequences with operator links.
- `FlightWatchPanel.tsx`: Detailed flight card displaying callsign, ICAO24 hex, barometric altitude, true airspeed, vertical rate, squawk code, and origin/destination airfields.
- `SatelliteCard.tsx`: Orbital parameters (apogee, perigee, inclination, period) and live latitude/longitude/altitude calculated via `satellite.js`.
- `LiveAlerts.tsx`: Real-time breaking incident digest collating urgent reports across news wires and Telegram channels.
- `LiveNewsPreviews.tsx`: Video stream drawer rendering verified YouTube 24/7 news broadcasts.
- `DrawingToolbar.tsx` / `DrawHud.tsx`: Polygon, bounding box, and corridor drawing tool calculating surface area, perimeter, and intersecting entities for GeoJSON export.
- `OiPanel.tsx` / `Workspace.tsx`: Multi-agent prediction cockpit displaying actor interaction graphs, probability distribution curves, and simulation execution traces.

---

## 6. Backend Services & Supporting Infrastructure

OSIRIS is not merely a Next.js frontend; it incorporates dedicated microservice containers and caching layers:

### 6.1 `osiris-intel` (`intel/server.js`)
- **Runtime:** Independent Node.js / Express microservice operating on port `4000`.
- **Purpose:** Centralized ontology correlation and sanctions intelligence engine.
- **Data Ingestion:**
  - Automated 24-hour scheduled download of OpenSanctions OFAC SDN target dataset (`targets.simple.csv`).
  - In-memory normalized string search graph (`byNorm` Map) supporting instant alias, entity name, vessel name, and country resolution.
  - Integration with Wikidata SPARQL endpoint (`query.wikidata.org/sparql`) with an LRU cache holding up to 10,000 entities with 24-hour TTL.
- **Security:** Outbound HTTP requests restricted strictly to an allowlist: `query.wikidata.org`, `data.opensanctions.org`, `www.wikidata.org`, `ip-api.com`, `stat.ripe.net`.

### 6.2 `osiris-cache` (`nginx/nginx.conf`)
- **Runtime:** `nginx:alpine` reverse proxy container operating on port `8080`.
- **Purpose:** Offloads high-frequency tile requests and upstream API responses into an on-disk cache (`nginx-cache`), insulating backend nodes from rate-limit exhaustion.

### 6.3 Shared Caching Engine (`src/lib/sourceCache.ts`)
- **In-Memory Store:** Shared Map with a default TTL of 30 minutes (`DEFAULT_TTL_MS = 30 * 60 * 1000`).
- **Stampede Deduplication:** Employs an `inflight: Promise<T[]>` lock preventing multiple concurrent misses from triggering duplicate upstream requests.
- **Stale-on-Error Resilience:** If an upstream government traffic authority or API times out, the cache continues serving the last good dataset (`stale-on-error`), preventing layer collapse.
- **LRU Eviction:** Fixed cap of 500 keys (`MAX_ENTRIES = 500`) with FIFO/LRU eviction semantics.

### 6.4 Defensive SSRF Subsystem (`src/lib/ssrf-guard.ts`)
- Implements two-phase defense against Server-Side Request Forgery:
  1. **Canonicalization:** Rejects non-dotted-quad IPv4 strings (hex, octal, decimal integers) and blocked IPv6 prefixes.
  2. **Subnet Blocking:** Validates against RFC1918 (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16), loopback (127.0.0.0/8), link-local/cloud metadata (169.254.0.0/16 including `169.254.169.254`), CGNAT (100.64.0.0/10), multicast (224.0.0.0/4), and documentation nets.
  3. **DNS Resolution Check:** Resolves A/AAAA records for domain targets prior to dispatch to prevent DNS rebinding attacks.

---

## 7. Containerization & Self-Hosting Review

Inspection of `Dockerfile` and `docker-compose.yml`:

- **Dockerfile Build Strategy:**
  - Stage 1 (`deps`): `node:22-alpine`, installs production dependencies via `npm ci`.
  - Stage 2 (`builder`): Builds Next.js application into standalone output directory (`.next/standalone`).
  - Stage 3 (`runner`): Creates unprivileged system user `nextjs` (UID 1001, GID 1001). Copies standalone bundle, public assets, and static files. Serves on port `3000` via `node server.js`.
  - Final Image Size: Approximately 220 MB (highly optimized).
- **Docker Compose Topology:**
  - `osiris`: Web application and API routes (Port 3000).
  - `osiris-intel`: Ontology and sanctions service (Port 4000).
  - `osiris-cache`: Nginx reverse proxy (Port 8080).
  - Network isolation: Internal bridge network with optional external connection for analytics.
- **CasaOS Integration:** Full metadata configuration (`x-casaos:`) for 1-click self-hosting on homelab and edge servers.

---

## 8. Audit Verdict & Integration Readiness

| Dimension | Audit Assessment | Integration Implication for MoviSabio |
|:---|:---|:---|
| **Code Quality** | Exceptional; modular TypeScript, robust error trapping, rigorous defensive boundaries. | High structural compatibility with enterprise software engineering standards. |
| **API Independence** | Core feeds operate 100% keyless out of the box (aviation, CCTV, earthquakes, fires, weather, satellites). | Zero commercial API license dependency required for baseline territorial deployment. |
| **Security Architecture** | Hardened against SSRF, DNS rebinding, and IP manipulation. RECON tools strictly gated. | Public portal can safely expose civic layers while keeping offensive tools quarantined. |
| **Runtime Requirements** | Requires Node.js 20+ runtime; cannot run as static HTML on GitHub Pages. | Must be hosted on a dedicated container runtime (VPS / Docker / Render) with subdomain or iframe integration. |

*End of Deliverable 1.*
