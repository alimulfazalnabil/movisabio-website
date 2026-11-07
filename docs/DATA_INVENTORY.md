# MOVISABIO — DATA INVENTORY & PRESERVATION AUDIT
**Document ID:** `docs/DATA_INVENTORY.md`  
**Phase:** Phase C — Technical Foundation, Project Audit & Development Readiness  
**Target Repository:** `movisabio-website`  
**Status:** Complete & Validated  

---

## 1. Executive Summary

This inventory documents all content assets, data repositories, media references, and preservation mechanisms across the MoviSabio platform. In compliance with the non-negotiable rule (*Preserve First, Audit Second*), this document establishes a verifiable registry of all critical data items, preventing accidental deletion or unauthorized alteration during future development phases.

---

## 2. Content Storage & Architecture Classification

The MoviSabio platform utilizes a hybrid static-reactive data model:

| Data Type | Primary Storage Location | Storage Format | Rendering Mechanism | Update Method |
| :--- | :--- | :--- | :--- | :--- |
| **Investor Economics & TAM/SAM** | `index.html` (#economics) | Hardcoded Semantic HTML5 | Static server-side DOM | Version-controlled Git commit |
| **7 Tech Portfolio Solutions** | `index.html` (script) & `recovery/original_tech_solutions.json` | JSON Objects within ES6 Script | Dynamic DOM Injection (`openProject(id)`) | Script edit & recovery JSON sync |
| **27 Smart City Features** | `index.html` (Project 5 `longDesc`) | Nested HTML in JSON string | Injected into `.modal-container` | Git version control |
| **Multilingual Dictionaries** | `assets/js/i18n.js` | Nested JSON Dictionary | Client-side reactive traversal (`data-i18n`) | Central key-value addition in `i18n.js` |
| **Interactive Video Catalog** | `index.html` & `recovery/original_project_videos.json` | JSON Array of Video Objects | Injected into video modal player | JSON synchronization |
| **Global Pilot Coordinates** | `global.html` (inline Leaflet script) | GeoJSON / Lat-Lng Array | Leaflet marker layer creation | Script coordinates update |
| **Media & Static Assets** | Root directory & `assets/` | Binary `.png`, `.jpeg`, `.mp4`, `.jfif` | Static relative path resolution (`img src`, `video src`) | Git LFS / Direct tracking |
| **Contact & Pitch Submissions**| Client DOM (`contact.html`, `partners.html`) | Dynamic Form Data | Client-side validation (`assets/js/forms.js`) | Dispatches to API or mailto fallback |

---

## 3. Preservation Inventory: Critical Data Items

The following items are designated **Strictly Protected Assets**. Under no circumstances may they be modified, simplified, or deleted without explicit executive authorization:

### 3.1 Market Opportunity & Unit Economics Registry

| Metric / Financial Item | Authoritative Value | Authoritative Location | Verification Status |
| :--- | :--- | :--- | :---: |
| **Total Addressable Market (TAM)** | **US$ 1.1 Trillion** | `index.html:750` & `recovery/current_backup/index.html` | **VERIFIED INTACT** |
| **Serviceable Available Market (SAM)**| **US$ 25 Billion** | `index.html:755` & `recovery/current_backup/index.html` | **VERIFIED INTACT** |
| **Year 10 ARR Target** | **€50.3 Million** | `index.html:760` & `recovery/current_backup/index.html` | **VERIFIED INTACT** |
| **Target Active Customer Accounts** | **1,000 accounts** | `index.html:765` & `recovery/current_backup/index.html` | **VERIFIED INTACT** |
| **Target EBITDA Margin** | **48%** | `index.html:770` & `recovery/current_backup/index.html` | **VERIFIED INTACT** |
| **Category Creation Definition** | Territorial Intelligence Platform (TIP) | `index.html` & `products/smart-city.html` | **VERIFIED INTACT** |

---

### 3.2 Executive Leadership & Governance Registry

| Leader Name | Role / Function | Contact Email | Verified Profile Link | Image Asset |
| :--- | :--- | :--- | :--- | :--- |
| **Alimul Fazal Nabil** | Chief Technology Officer (CTO) | `nabil@movisabio.com` | `https://www.linkedin.com/in/alimul-fazal-nabil/` | `alimul_photo.jpeg` (74.6 KB) |
| **Leandro Patrón** | Engineering & Public Sector Relations | `leandro@movisabio.com` | `https://www.linkedin.com/in/leandro/` | `leandro_photo.jfif` (8.7 KB) |
| **Douglas Amante** | Strategic Partnerships | `douglas@movisabio.com` | `https://www.linkedin.com/in/douglasamante/` | `douglas_photo.jfif` (29.3 KB) |

---

### 3.3 The 27-Feature Portfolio Registry (`movisabio-enterprise-smart-city`)
Preserved in `index.html` (Project 5) and `recovery/original_tech_solutions.json`:
1. *Feature 1:* AI Traffic Control System (AITCS) — Adaptive signal control & green-wave sync.
2. *Feature 2:* Computer Vision & Edge AI — Multi-class vehicle and crowd density detection.
3. *Feature 3:* Automatic Number Plate Recognition (ANPR) — Point-to-point transit timing.
4. *Feature 4:* Traffic Analytics — Macroscopic bottleneck and congestion indexing.
5. *Feature 5:* AI Prediction — Real-time 15-minute forward corridor congestion forecasting.
6. *Feature 6:* Reinforcement Learning — Deep Q-Network cycle length optimization.
7. *Feature 7:* Emergency Management — Blue-light vehicle signal preemption corridors.
8. *Feature 8:* Public Transport — Dynamic Bus Rapid Transit (BRT) TSP priority.
9. *Feature 9:* Pedestrian Intelligence — Crosswalk call extension for vulnerable road users.
10. *Feature 10:* Incident Detection — Automated stopped-vehicle and hazard alerts.
11. *Feature 11:* Smart Parking — Predictive curb space guidance and turnover analytics.
12. *Feature 12:* Environmental Intelligence — Real-time tailpipe emissions modeling (HBEFA).
13. *Feature 13:* Weather Intelligence — Micro-climate and road friction telemetry.
14. *Feature 14:* Drone Operations — Aerial traffic monitoring and disaster survey feeds.
15. *Feature 15:* Digital Twin — SUMO & TraCI microscopic street simulation.
16. *Feature 16:* GIS & Mapping — OpenStreetMap and municipal basemap ingestion.
17. *Feature 17:* IoT & Edge Computing — Distributed MQTT sensor mesh nodes.
18. *Feature 18:* Cloud Platform — Microsoft Azure AKS containerized orchestration.
19. *Feature 19:* Backend Services — Microservices event-bus and REST API gateway.
20. *Feature 20:* Frontend UI — High-contrast operations command center dashboard.
21. *Feature 21:* Data & Storage — PostgreSQL / PostGIS spatial time-series database.
22. *Feature 22:* Observability — Distributed Prometheus telemetry and Grafana monitoring.
23. *Feature 23:* Security — Role-based access control (RBAC), end-to-end mTLS encryption.
24. *Feature 24:* DevOps — Continuous integration and automated regression pipelines.
25. *Feature 25:* AI & MLOps — Model registry, automated drift detection, retraining triggers.
26. *Feature 26:* Smart City Integrations — Open municipal API connectors and legacy SCADA.
27. *Feature 27:* V2X Support — Cooperative vehicle-to-infrastructure (V2I) telemetry.

---

## 4. Media & Asset Registry

All media assets are tracked directly within the repository:

### 4.1 Image Assets (High-Resolution Visualizations)
- `logo.png`: Canonical MoviSabio purple brand logo (73.0 KB).
- `Connected Smart City at Dusk-1.png`: Flagship hero graphic (3.05 MB).
- `AI Traffic Coordination at Sunset.png`: Traffic coordination graphic (3.01 MB).
- `MoviSabio Smart Cities Intelligence Grid-4.png`: Urban grid visualization (2.80 MB).
- `MoviSabio Climate Risk Dashboard.png`: Environmental telemetry mockup (3.05 MB).
- `MoviSabio Environmental Intelligence Dashboard.png`: Air quality dashboard (2.60 MB).
- `MoviSabio GIS Command Centre.png`: Geospatial command center (2.59 MB).
- `MoviSabio Smart City Control Centre.png`: Operations center view (2.58 MB).
- `MoviSabio Smart City Detection.png`: Edge detection graphic (2.59 MB).
- `Global Presence and Connected Territories.png`: Territorial network graphic (2.39 MB).
- `MoviSabio's Vision for Smarter Cities.png`: Visionary urban render (2.38 MB).
- `MoviSabio Leadership Team Overview.png`: Leadership collage (2.14 MB).
- `MoviSabio Partnership Ecosystem.png`: Strategic partner landscape (2.23 MB).

### 4.2 Video Assets
- `AI Traffic Signal.mp4`: High-definition micro-simulation MP4 video (4.51 MB), served natively via HTML5 `<video>` tags with poster fallback and lazy loading.

---

## 5. Potential Data Integrity Risks & Safeguards

| Risk Factor | Potential Impact | Implemented Safeguard |
| :--- | :--- | :--- |
| **Accidental Overwrite of Project 5** | Loss of 27-feature presentation deck | Preserved redundantly in `recovery/original_tech_solutions.json` and `index.html`. |
| **Hardcoded Investor Metric Drift** | Inconsistent financial claims presented to VCs | Single source of truth in `index.html:#economics`, cross-audited against Phase B2.1 report. |
| **Broken Image Links on Asset Renaming** | 404 image errors on client browsers | All 304 internal links verified via automated link verification script (`scratch/audit_links.js`). |
| **Missing Translations in `i18n.js`** | Text fallback to English or blank strings | Automated parity testing (`scratch/audit_i18n_quality.js`) enforcing 100% key coverage. |
