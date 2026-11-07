# MOVISABIO — WEBSITE STRUCTURE & NAVIGATION ARCHITECTURE
**Document ID:** `docs/WEBSITE_STRUCTURE.md`  
**Phase:** Phase C — Technical Foundation, Project Audit & Development Readiness  
**Target Repository:** `movisabio-website`  
**Status:** Complete & Validated  

---

## 1. Global Navigation Architecture

The MoviSabio website utilizes a unified, enterprise-grade navigation bar across all desktop and mobile views:

```
[Logo: MoviSabio Enterprise] -> Link to index.html
├── Platform                     -> index.html#platform or platform.html
├── Products ▾                   -> Dropdown Menu (Accessible ARIA menuitem)
│   ├── MoviSabio Smart City     -> products/smart-city.html [Flagship]
│   ├── AI Traffic Signals       -> products/traffic-signal-coordination.html
│   ├── Computer Vision Vehicle  -> products/vehicle-detection.html [Phase 2]
│   ├── Smart Public Transit     -> products/public-transit-router.html [Concept]
│   └── Virtual Fencing          -> products/virtual-fencing.html [Solution Concept]
├── Smart City                   -> index.html#smart-city
├── Audiences                    -> index.html#audiences
├── Technology                   -> index.html#architecture or technology.html
├── Solutions                    -> index.html#solutions or solutions.html
├── Company ▾                    -> Dropdown Menu
│   ├── About MoviSabio          -> index.html#about or about.html
│   ├── Leadership & Advisors    -> index.html#leadership or leadership.html
│   ├── Global Map               -> index.html#presence or global.html
│   └── Research & ESG           -> index.html#research or research.html
├── Investor ▾                   -> Dropdown Menu
│   ├── Market & Economics       -> index.html#economics
│   └── Partners & Pitch Deck    -> partners.html
├── Language Switcher (6 Langs)  -> [EN, DE, PT, ES, IT, ZH]
└── Primary CTA: "Partner With Us" -> contact.html or #contact
```

---

## 2. Complete Page & Route Mapping

The platform comprises **15 distinct HTML documents**:

### 2.1 Core Platform & Corporate Pages
1. **`index.html` (Homepage & Primary Portal):**
   - Canonical URL: `https://www.movisabio.com/`
   - Purpose: Multi-audience landing portal integrating company positioning, TIP ecosystem, flagship Smart City intro, 7-project modal portfolio, global presence, leadership, investor unit economics, open innovation pitch form, and general contact.
2. **`platform.html` (Territorial Intelligence Platform Technical Specs):**
   - Canonical URL: `https://www.movisabio.com/platform.html`
   - Purpose: Deep technical architecture of TIP (6-layer stack, 27-capability matrix, data ingestion protocols, honest status indicators).
3. **`partners.html` (Institutional LOIs & Pitch Submission Portal):**
   - Canonical URL: `https://www.movisabio.com/partners.html`
   - Purpose: Structured engagement frameworks for municipal LOIs, university research labs, technology integrators, and open innovation project pitch submissions.
4. **`solutions.html` (Sector-Specific Solutions):**
   - Canonical URL: `https://www.movisabio.com/solutions.html`
   - Purpose: Dedicated breakdowns for smart mobility, public transit, environmental monitoring, and logistics.
5. **`technology.html` (Technology Architecture & Edge Computing):**
   - Canonical URL: `https://www.movisabio.com/technology.html`
   - Purpose: Deep dive into edge AI inference, SUMO/TraCI micro-simulation algorithms, and geospatial vector indexing.
6. **`about.html` (Company Profile & Ethos):**
   - Canonical URL: `https://www.movisabio.com/about.html`
   - Purpose: Company mission, founding story, territorial sustainability philosophy, and core team principles.
7. **`leadership.html` (Governance & Executive Team):**
   - Canonical URL: `https://www.movisabio.com/leadership.html`
   - Purpose: Detailed profiles for Alimul Fazal Nabil (CTO & Chief AI Architect), Leandro Patrón (Engineering & Public Sector), and Douglas Amante (Strategic Partnerships).
8. **`global.html` (Interactive Global Deployment Map):**
   - Canonical URL: `https://www.movisabio.com/global.html`
   - Purpose: Leaflet.js interactive map displaying verified pilot test corridors across Germany, Brazil, and Uruguay.
9. **`research.html` (Research, Academic Alliances & ESG):**
   - Canonical URL: `https://www.movisabio.com/research.html`
   - Purpose: Documentation on HBEFA emissions modeling, UN SDG 11 & 13 metrics, and peer-reviewed research papers.
10. **`contact.html` (Direct Inquiries & Briefings):**
    - Canonical URL: `https://www.movisabio.com/contact.html`
    - Purpose: Filtered contact routing for municipal procurement, enterprise pilots, press, and general inquiries.

---

### 2.2 Dedicated Product Suite (`products/`)
11. **`products/smart-city.html` (Flagship Enterprise Application):**
    - Canonical URL: `https://www.movisabio.com/products/smart-city.html`
    - Purpose: Production-ready core architecture of MoviSabio Smart City. 5-Tier system diagram, SUMO/TraCI digital twin, AITCS coordination, MQTT edge mesh, and audience-tailored ROI pathways.
12. **`products/traffic-signal-coordination.html` (AITCS Signal Optimization):**
    - Canonical URL: `https://www.movisabio.com/products/traffic-signal-coordination.html`
    - Purpose: Algorithmic arterial timing (MAXBAND + DQN), calibrated simulation KPIs (-31.4% delay, -27.8% queue), and simulation vs. real-world comparison matrix.
13. **`products/vehicle-detection.html` (Edge Computer Vision Perception):**
    - Canonical URL: `https://www.movisabio.com/products/vehicle-detection.html`
    - Purpose: YOLOv8 edge perception, multi-class vehicle classification, optical flow velocity estimation, and GDPR/LGPD privacy guard.
14. **`products/public-transit-router.html` (Multimodal Transit Router):**
    - Canonical URL: `https://www.movisabio.com/products/public-transit-router.html`
    - Purpose: Dynamic dispatch, GTFS ingestion, passenger demand modeling (Concept Stage).
15. **`products/virtual-fencing.html` (Geospatial Virtual Fencing):**
    - Canonical URL: `https://www.movisabio.com/products/virtual-fencing.html`
    - Purpose: PostGIS boundary monitoring, sub-second GPS telemetry, and AgriTech asset protection (Solution Concept).

---

## 3. Detailed Mapping of the "Data Area" & Project System

The website features an interactive **Data and Portfolio System** anchored in `index.html` and managed via JavaScript.

### 3.1 The 7 Tech Portfolio Solutions
In `index.html` (lines 1390–2250), an embedded JSON dataset defines 7 modular solutions rendered dynamically into `.modal-container`:

| Project ID | Project Key / Title | Maturity Badge | Primary Purpose / Scope |
| :---: | :--- | :--- | :--- |
| **5** | **`movisabio-enterprise-smart-city`** | **Enterprise Platform** | **Flagship Smart City: 27-Feature Breakdown, 12-Part Presentation Deck, Deployment Roadmap** |
| **0** | `Territorial Intelligence & Quantum Platform` | Core Ecosystem | Foundation TIP platform, geospatial ingestion, predictive AI, quantum-ready algorithms |
| **1** | `AI Traffic Signal Coordination` | Simulation Core | Algorithmic signal control, green-wave coordination, MAXBAND arterial timing |
| **2** | `Computer Vision Vehicle Detection` | Phase 2 Active | Real-time vehicle counting, speed calculation, ANPR edge inference |
| **3** | `Smart Public Transit Router` | Concept Stage | Multimodal public transit optimization, passenger heatmaps, GTFS |
| **4** | `Virtual Fencing (AgriTech)` | Solution Concept | Geospatial boundaries, livestock & territorial asset monitoring |
| **101** | `Category Creation: Territorial Intelligence Platform (TIP)` | Strategic Market Category | Investor and industry positioning unifying GIS, AI, IoT, Mobility, and ESG |

---

### 3.2 Specific Location of `movisabio-enterprise-smart-city`
The `movisabio-enterprise-smart-city` asset is currently accessible through two complementary architectural pathways:

1. **Embedded Interactive Modal Presentation (Project 5):**
   - **Trigger:** `onclick="openProject(5)"`
   - **Invocation Points:**
     - Homepage Smart City Hero CTA: `index.html#smart-city`
     - Homepage Footer: "Enterprise Smart City" link
     - Solutions Page: "Explore Smart City Architecture" button
   - **Content Data Source:** Defined in `index.html:1394-1668` and backed up in `recovery/original_tech_solutions.json`.
   - **Data Structure:** Contains 12 discrete parts covering:
     - Part 1: AI Traffic Control System (AITCS) & Reinforcement Learning (Features 1 & 6)
     - Part 2: Computer Vision & ANPR (Features 2 & 3)
     - Part 3: Analytics & Prediction (Features 4 & 5)
     - Part 4: Emergency Management & Incident Detection (Features 7 & 10)
     - Part 5: Public Transport & Smart Parking (Features 8 & 11)
     - Part 6: Pedestrian & Environmental Intelligence (Features 9, 12 & 13)
     - Part 7: Drone Operations & V2X Support (Features 14 & 27)
     - Part 8: Digital Twin & GIS Mapping (Features 15 & 16)
     - Part 9: IoT, Edge Computing & Cloud Platform (Features 17 & 18)
     - Part 10: Backend Services, Frontend UI, Data & Observability, Security, DevOps, MLOps & Integrations (Features 19 to 26)
     - Part 11: Deployment & Strategic Scaling Roadmap (Phases 1–4)
     - Part 12: Stakeholder & Investor Presentation Deck (Slides 1–11)

2. **Dedicated Product Page (`products/smart-city.html`):**
   - **URL:** `https://www.movisabio.com/products/smart-city.html`
   - **Structure:** Standalone enterprise product page with 5-tier architecture visualizer, SUMO/TraCI technical capabilities, and tailored municipal/investor pathways.

---

## 4. Internal Link & Anchor Architecture

### 4.1 In-Page Hash Anchors (`index.html`)
- `#platform`: Territorial Intelligence Platform overview
- `#smart-city`: MoviSabio Smart City flagship section with interactive image slider
- `#audiences`: Three-audience strategic breakdown (Municipalities, Enterprise, Investors)
- `#architecture`: 6-layer system architecture overview
- `#solutions`: Interactive Tech Portfolio card grid
- `#presence`: Global impact metrics and pilot region summary
- `#videos`: Explanatory video modal showcase
- `#research`: ESG carbon accounting & academic publications
- `#about`: Company founding story and vision
- `#leadership`: Executive team cards with bio modals
- `#economics`: Market Opportunity, TAM/SAM, ARR targets, and unit economics
- `#submit-idea`: Open Innovation Pitch submission form
- `#contact`: Direct inquiry form

### 4.2 Cross-Page Link Verification
All 304 internal links across the repository have been verified with 0 broken links or 404 errors. Relative links consistently use:
- Top-level to products: `href="products/smart-city.html"`
- Product pages to root: `href="../index.html"`, `href="../platform.html"`, `href="../contact.html"`
