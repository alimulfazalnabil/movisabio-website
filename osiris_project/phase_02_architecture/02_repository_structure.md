# MoviSabio Intelligence Repository Structure & Codebase Baseline

**Document ID:** `MOVI-ARCH-2026-02`  
**Phase:** 2 Architecture Implementation Preparation  
**Target Repository:** `movisabio-intelligence`  
**Source Baseline:** OSIRIS Engine (`osiris-master`)  
**Parent Organization:** MoviSabio Enterprise Smart City & Territorial Intelligence  
**Preparation Date:** November 2026  
**Status:** REPOSITORY INITIALIZED & COMMITTED LOCALLY  

---

## 1. Executive Summary

As approved in the Phase 2 project charter, an independent, modular repository named **`movisabio-intelligence`** was created at `H:\Software Projects\movisabio-intelligence`.

This repository isolates the live geospatial intelligence runtime from the static corporate marketing website (`movisabio-website`), ensuring:
1. **Zero Contamination:** Heavy Node.js dependencies, WebGL shaders, Docker manifests, and spatial caches do not clutter or degrade the corporate marketing repository.
2. **Upstream Git Maintainability:** Retains complete architectural alignment with the OSIRIS upstream codebase, allowing clean merging of future open-source intelligence patches.
3. **Artifact Sanitization:** All build outputs (`.next/`), package caches (`node_modules/`), persistent catalog caches (`.cache/`), archive zips (`*.zip`), and test scratchpads were strictly excluded during the migration.

---

## 2. Repository Verification & Initial Baseline Metrics

```
┌─────────────────────────────────────────────────────────────┐
│              MOVISABIO-INTELLIGENCE REPOSITORY AUDIT        │
├───────────────────────┬─────────────────────────────────────┤
│ Repository Name       │ movisabio-intelligence              │
│ Local Workspace Path  │ H:\Software Projects\movisabio-inte │
│ Initial Baseline Commit│ d4843b1 (feat: baseline extraction) │
│ Total Tracked Files   │ 466 files                           │
│ Total Lines of Code   │ 96,563 lines                        │
│ Working Tree Status   │ Clean (Zero uncommitted changes)    │
│ License               │ MIT License (Retained with credits) │
│ Security Hardening    │ ssrf-guard.ts, scanner proxy intact │
└───────────────────────┴─────────────────────────────────────┘
```

---

## 3. Directory Layout & Functional Hierarchy

```
movisabio-intelligence/
├── .dockerignore                 # Excludes node_modules, .next, git from image
├── .env.example                  # Environment variable template with placeholders
├── .gitattributes                # Line ending normalizations (LF)
├── .gitignore                    # Ignores .next, node_modules, .cache, *.log, .env
├── deploy.sh                     # Automated Linux VPS build & launch script
├── docker-compose.yml            # Multi-service orchestration (osiris, intel, cache)
├── DOCKER.md                     # Self-hosting and container operations guide
├── Dockerfile                    # Multi-stage Next.js standalone container build
├── eslint.config.mjs             # Next.js ESLint linting configuration
├── LICENSE                       # MIT License (simplifaisoul / MoviSabio)
├── next.config.ts                # Next.js App Router configuration & basePath
├── package.json                  # Dependencies: MapLibre GL, Framer Motion, etc.
├── package-lock.json             # Deterministic dependency lockfile
├── postcss.config.mjs            # Tailwind & CSS post-processing
├── README.md                     # Technical architecture documentation
├── SECURITY.md                   # Defensive usage policy & vulnerability reporting
├── tsconfig.json                 # Strict TypeScript 5 compiler settings
├── vitest.config.ts              # Unit test configuration
│
├── docs/                         # Architecture documentation & screenshots
│   └── screenshots/              # UI screenshots (Seoul, Taiwan CCTV, etc.)
│
├── engine/                       # Supplementary simulation & rule engine
│
├── intel/                        # Standalone Express 4 Ontology Microservice
│   ├── Dockerfile                # Dedicated node:22-alpine container build
│   ├── package.json              # Express dependencies
│   ├── package-lock.json         # Lockfile
│   └── server.js                 # OFAC SDN sanctions search & Wikidata SPARQL
│
├── nginx/                        # Local Reverse Proxy & Tile Cache Layer
│   └── nginx.conf                # 10GB tile cache, GZIP, and proxy buffer rules
│
├── public/                       # Public Static Geospatial Assets
│   ├── dark-matter-style.json    # MapLibre vector dark-matter style definition
│   ├── manifest.json             # Web App Manifest
│   └── data/
│       ├── submarine-cables.json # Global transoceanic fiber cable GeoJSON (649kB)
│       └── submarine-cables-filtered.json
│
├── src/                          # Next.js 16 App Router Source
│   ├── app/                      # App Router Pages & API Endpoints
│   │   ├── api/                  # 81 Operational Next.js Route Handlers
│   │   │   ├── aircraft/         # OpenSky Network live aviation telemetry
│   │   │   ├── cctv/             # 48 regional camera source aggregators
│   │   │   ├── earthquakes/      # USGS real-time seismic GeoJSON
│   │   │   ├── fires/            # NASA FIRMS active wildfire detections
│   │   │   ├── maritime/         # AISStream.io vessel positioning
│   │   │   ├── oi/               # Open Intelligence scenario & forecast engine
│   │   │   ├── osint/            # 18 reconnaissance routes (BGP, DNS, WHOIS)
│   │   │   ├── satellites/       # CelesTrak TLE orbital ground tracks
│   │   │   ├── scanner/          # Hardened proxy to RECON scanner backend
│   │   │   ├── space-weather/    # NOAA SWPC geomagnetic flux
│   │   │   └── weather/          # Open-Meteo weather forecasts
│   │   ├── favicon.ico
│   │   ├── globals.css           # Core styling tokens & CSS variables
│   │   ├── layout.tsx            # Global HTML shell & font providers
│   │   └── page.tsx              # Main Geospatial Live Control Dashboard
│   │
│   ├── components/               # React 19 UI Components
│   │   ├── OsirisMap.tsx         # MapLibre GL 6.7.0 WebGL GPU Map Engine (3,425 lines)
│   │   ├── CameraViewer.tsx      # CCTV video stream & snapshot modal player
│   │   ├── CctvPreviews.tsx      # Interactive thumbnail preview drawer
│   │   ├── LayerPanel.tsx        # 16-layer toggle control panel
│   │   ├── MapControls.tsx       # 3D pitch, bearing, and zoom controls
│   │   ├── MarketsPanel.tsx      # Commodity, equity, and crypto monitors
│   │   ├── OsintPanel.tsx        # Reconnaissance and network analysis tools
│   │   ├── SatelliteCard.tsx     # Orbital parameters and NORAD ID inspector
│   │   └── oi/                   # Open Intelligence interactive simulation views
│   │
│   ├── lib/                      # Core Engineering & Math Libraries
│   │   ├── cctv-snapshot.ts      # Persistent GZIP camera catalogue cache
│   │   ├── draw.ts               # Geospatial measurement & polygon drawing
│   │   ├── fetch-pool.ts         # Concurrency pooling for external upstreams
│   │   ├── live-clouds.ts        # Real-time satellite cloud cover synthesis
│   │   ├── map-palette.ts        # Spatial color palette tokens
│   │   ├── map-terrain.ts        # MapLibre 3D DEM elevation tiles
│   │   ├── orbit.ts              # Keplerian orbital mechanics propagation
│   │   ├── sourceCache.ts        # In-memory TTL cache with background revalidation
│   │   ├── ssrf-guard.ts         # Two-layer SSRF defense & IP canonicalizer
│   │   ├── stealthFetch.ts       # Anti-blocking User-Agent HTTP fetcher
│   │   └── oi/                   # Open Intelligence multi-agent prediction logic
│   │
│   └── middleware.ts             # Edge request routing & security headers
│
└── tools/                        # Development & testing utilities
    ├── maplibre-url-loader.cjs
    ├── prepare-map-worker.mjs
    └── preview-smoke.mjs
```

---

## 4. Preservation of Intellectual Property & Attributions

In strict compliance with open-source licensing:
1. **MIT License Preserved:** The original copyright notice (`Copyright (c) 2026 simplifaisoul`) is retained in `LICENSE`.
2. **Third-Party Disclosures:** Embedded credits for MapLibre GL, OpenStreetMap, CARTO, CelesTrak, and USGS are preserved in source headers and `SECURITY.md`.
3. **MoviSabio Branding Layer:** Ready to accept MoviSabio corporate visual tokens without modifying core underlying geospatial algorithms.

---
*Certified by Principal Enterprise Software Architect & Systems Security Engineer.*
