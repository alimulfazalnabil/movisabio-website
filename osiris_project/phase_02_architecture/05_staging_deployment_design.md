# MoviSabio Intelligence Staging Deployment Design & Container Specification

**Document ID:** `MOVI-ARCH-2026-05`  
**Phase:** 2 Architecture Implementation Preparation  
**Target Environment:** Hostseba Staging Linux KVM VPS  
**Parent Organization:** MoviSabio Enterprise Smart City & Territorial Intelligence  
**Preparation Date:** November 2026  
**Status:** COMPLETE STAGING DEPLOYMENT BLUEPRINT  

---

## 1. Executive Summary

This specification outlines the staging deployment topology, Docker Compose configuration, health-check automation, logging strategy, and rollback procedures for the MoviSabio Intelligence Platform (`movisabio-intelligence`).

The design decouples all external analytics dependencies, binds services to dedicated internal staging ports, and implements automated container health probes to guarantee zero-downtime updates and reliable rollback.

---

## 2. Staging Architecture Diagram

```
                              STAGING CLIENT INGRESS
                        https://staging.movisabio.com (or :8080)
                                        │
                                        ▼
                        ┌───────────────────────────────┐
                        │       Host Nginx Ingress      │
                        │    (SSL Termination & TLS)    │
                        └───────────────┬───────────────┘
                                        │
                                  Port: 8080 (HTTP)
                                        │
                                        ▼
    ┌────────────────────────────────────────────────────────────────────────┐
    │                 DOCKER NETWORK: movi_intel_staging_net                 │
    │                                                                        │
    │   ┌────────────────────────────────────────────────────────────────┐   │
    │   │                  movi-cache (Nginx Alpine)                     │   │
    │   │  - Port 8080 Internal                                          │   │
    │   │  - Tile Proxy Cache: /var/cache/nginx (10GB Volume)            │   │
    │   │  - Healthcheck: wget -qO- http://localhost:8080/healthz        │   │
    │   └───────────────────────┬────────────────────────────────────────┘   │
    │                           │                                            │
    │         /proxy/tiles/*    │    /* (Next.js Application & API Traffic)  │
    │         (Cached locally)  │                                            │
    │                           ▼                                            │
    │   ┌────────────────────────────────────────────────────────────────┐   │
    │   │                   movi-web (Next.js 16)                        │   │
    │   │  - Port 3000 Internal (Non-root user: nextjs)                  │   │
    │   │  - Node 22 Alpine Standalone Build                             │   │
    │   │  - Healthcheck: curl -f http://localhost:3000/api/health       │   │
    │   └───────────────────────┬────────────────────────────────────────┘   │
    │                           │                                            │
    │            Internal HTTP  │ /resolve (OFAC SDN & Wikidata Graph)       │
    │                           ▼                                            │
    │   ┌────────────────────────────────────────────────────────────────┐   │
    │   │                 movi-intel (Express 4)                         │   │
    │   │  - Port 4000 Internal                                          │   │
    │   │  - In-Memory OpenSanctions Index (50k Entities)                │   │
    │   │  - Healthcheck: wget -qO- http://localhost:4000/health         │   │
    │   └────────────────────────────────────────────────────────────────┘   │
    │                                                                        │
    └────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Staging Docker Compose Configuration (`docker-compose.staging.yml`)

The following staging manifest resolves the `umami_default` network blocker identified in Phase 1.1, isolates container ports, and establishes automatic restart and health probes:

```yaml
# movisabio-intelligence/docker-compose.staging.yml
name: movisabio-intelligence-staging

services:
  movi-web:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: movi-intelligence-web-staging
    restart: unless-stopped
    environment:
      - NODE_ENV=production
      - PORT=3000
      - HOSTNAME=0.0.0.0
      - NODE_OPTIONS=--dns-result-order=ipv4first
      - INTEL_URL=http://movi-intel:4000
      - BASE_PATH=/intelligence
    env_file:
      - path: .env.staging
        required: false
    networks:
      - movi_staging_net
    healthcheck:
      test: ["CMD", "wget", "-qO-", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 20s
    logging:
      driver: "json-file"
      options:
        max-size: "50m"
        max-file: "3"

  movi-intel:
    build:
      context: ./intel
      dockerfile: Dockerfile
    container_name: movi-intelligence-intel-staging
    restart: unless-stopped
    environment:
      - INTEL_PORT=4000
    networks:
      - movi_staging_net
    healthcheck:
      test: ["CMD", "wget", "-qO-", "http://localhost:4000/health"]
      interval: 30s
      timeout: 5s
      retries: 3
      start_period: 15s
    logging:
      driver: "json-file"
      options:
        max-size: "20m"
        max-file: "2"

  movi-cache:
    image: nginx:alpine
    container_name: movi-intelligence-cache-staging
    restart: unless-stopped
    ports:
      - "8080:8080"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - movi_staging_tile_cache:/var/cache/nginx
    depends_on:
      movi-web:
        condition: service_healthy
      movi-intel:
        condition: service_healthy
    networks:
      - movi_staging_net
    logging:
      driver: "json-file"
      options:
        max-size: "50m"
        max-file: "3"

volumes:
  movi_staging_tile_cache:
    name: movi_staging_tile_cache

networks:
  movi_staging_net:
    name: movi_intel_staging_net
    driver: bridge
```

---

## 4. Automated Health Monitoring & Probes

Each tier implements an independent, non-blocking health probe:

1. **`movi-web` Next.js Health Check (`/api/health`):**
   - Returns HTTP 200 with runtime memory RSS, Node version, uptime, and active sourceCache status.
2. **`movi-intel` Sanctions Microservice Health Check (`/health`):**
   - Returns HTTP 200 with loaded OFAC SDN entity count, sanctions update timestamp, and Wikidata LRU cache size.
3. **`movi-cache` Reverse Proxy Probe:**
   - Evaluates Nginx worker responsiveness and tile cache volume read/write accessibility.

---

## 5. Logging & Audit Architecture

To prevent disk saturation on the staging VPS:
- **Docker JSON File Driver:** Caps individual container logs at **50 MB** with a 3-file retention cycle (`max-size: "50m"`, `max-file: "3"`). Total container log consumption will never exceed 150 MB.
- **Security Audit Logs:** RECON access logs are written to `/var/log/movisabio/recon-audit.jsonl` outside the containers and managed via Linux host `logrotate`.

---

## 6. Backup & Rollback Strategy

In the event of an unexpected regression during staging validation:

1. **Deterministic Image Tagging:**  
   Docker images are tagged with Git commit hashes (e.g. `movisabio-intelligence:staging-d4843b1`).
2. **One-Command Rollback:**  
   To revert to the prior stable release:
   ```bash
   # Emergency Rollback Procedure
   docker compose -f docker-compose.staging.yml down
   git checkout <PREVIOUS_STABLE_COMMIT_TAG>
   docker compose -f docker-compose.staging.yml up -d --build
   ```
3. **Persistent Volume Safety:**  
   The `movi_staging_tile_cache` Docker volume persists across container redeployments. Rebuilding or rolling back the application does not discard cached CARTO tiles, preventing cold-start map tile latency.

---
*Certified by Principal Enterprise Software Architect & Systems Security Engineer.*
