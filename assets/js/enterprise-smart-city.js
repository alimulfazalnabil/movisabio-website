/**
 * MOVISABIO ENTERPRISE SMART CITY — INTERACTION & FEATURE EXPLORER ENGINE
 * Provides:
 * 1. Sticky Chapter Navigation ScrollSpy
 * 2. 27-Feature Portfolio Explorer (Filter, Search, Expandable 14-Field Drawers)
 * 3. Interactive Traffic Intersection Phase Simulator
 * 4. FAQ Accordion Engine with WCAG ARIA States
 * 5. 8-Layer Architecture Explorer
 */

(function () {
    'use strict';

    // --- 1. 27-FEATURE PORTFOLIO DATA (All 14 Technical Fields) ---
    const features27Data = [
        {
            num: "01",
            name: "AI Traffic Control System (AITCS)",
            category: "Intelligent Mobility",
            maturity: "Implemented & Demonstrated",
            maturityClass: "maturity-implemented",
            shortDesc: "Real-time adaptive signal split and cycle modulation engine using mathematical arterial progression and queue thresholds.",
            detailedExplanation: "AITCS synchronizes traffic signal phases along major municipal corridors by evaluating real-time queue lengths and arrival platoons, transitioning legacy time-of-day plans into continuous demand-responsive coordination.",
            problemAddressed: "Fixed-time traffic lights create artificial delays, excessive idling, and stop-and-go waves during non-peak or asymmetrical traffic surges.",
            workflow: "Detector counts / camera feeds -> Ingestion broker -> Phase split calculation (MAXBAND + DQN) -> NTCIP 1202 controller command -> Signal actuation.",
            coreTech: "Python, C++, MAXBAND arterial progression, SUMO TraCI, NTCIP 1202 protocol.",
            inputs: "Stopline detector pulses, virtual queue occupancy, radar feeds, upstream platoon arrival estimates.",
            outputs: "Dynamic green split durations, cycle lengths, corridor phase offsets, fail-safe status heartbeats.",
            integrations: "Municipal traffic management center (TMC), NEMA TS2 cabinets, 2070/170 controllers, SCADA networks.",
            municipalUseCases: "Arterial congestion mitigation, morning/evening peak tidal flow coordination, school zone speed moderation.",
            enterpriseValue: "Reduces arterial delays by up to 31.4% in calibrated corridors, cutting municipal emissions and driver transit frustration.",
            considerations: "Requires certified hardware interface unit (HIU) or modern IP-enabled controller firmware."
        },
        {
            num: "02",
            name: "Computer Vision and Edge AI",
            category: "AI & Computer Vision",
            maturity: "In Development (Phase 2)",
            maturityClass: "maturity-indev",
            shortDesc: "Edge-deployed YOLOv8 neural network inference pipeline converting municipal CCTV video streams into structured vehicle and crowd metadata.",
            detailedExplanation: "Performs optical detection, classification, and tracking of multi-modal road users directly on edge compute nodes without transmitting raw video over municipal networks.",
            problemAddressed: "Inductive pavement loops are costly to install, easily damaged by roadwork, and cannot classify vehicle types or count pedestrians.",
            workflow: "RTSP camera stream -> H.264 decode -> YOLOv8 tensor inference -> ByteTrack association -> Privacy frame purge -> JSON telemetry push.",
            coreTech: "YOLOv8, OpenCV, TensorRT, ByteTrack, NVIDIA Jetson / Intel OpenVINO.",
            inputs: "RTSP / ONVIF IP camera feeds (1080p @ 15–30 FPS).",
            outputs: "Vehicle bounding boxes, class labels (car, bus, truck, motorcycle, bicycle, pedestrian), trajectory vectors, occupancy rates.",
            integrations: "Municipal CCTV surveillance networks, milestone video management systems (VMS), edge microservers.",
            municipalUseCases: "Intersection vehicle counting, bus lane violation monitoring, pedestrian crosswalk occupancy sensing.",
            enterpriseValue: "Eliminates in-pavement loop cutting costs; leverages existing camera investments with complete GDPR/LGPD privacy preservation.",
            considerations: "Requires edge GPU hardware (NVIDIA Jetson Orin or x86 with accelerator) and line-of-sight camera positioning."
        },
        {
            num: "03",
            name: "Automatic Number Plate Recognition (ANPR)",
            category: "AI & Computer Vision",
            maturity: "Planned (Phase 2)",
            maturityClass: "maturity-planned",
            shortDesc: "High-speed optical character recognition pipeline for localized vehicle identification, travel time measurement, and access enforcement.",
            detailedExplanation: "Extracts alphanumeric plate characters using localized edge OCR, immediately converting them to cryptographic one-way hashes for travel-time telemetry and permitted access validation.",
            problemAddressed: "Inability to accurately measure point-to-point corridor transit times or enforce low-emission and freight-restricted zones.",
            workflow: "Camera trigger -> Vehicle localization -> Plate crop -> OCR character segmentation -> SHA-256 pseudonymization -> Origin-destination log.",
            coreTech: "PyTorch, PaddleOCR / Tesseract, OpenCV, SHA-256 salted hashing.",
            inputs: "High-resolution optical camera frames, IR illuminator strobes.",
            outputs: "Salted alphanumeric hash, state/jurisdiction classification, timestamp, lane ID.",
            integrations: "Law enforcement access lists (authorized only), tolling APIs, municipal travel-time sign displays.",
            municipalUseCases: "Corridor travel-time calculation, congestion charging zone verification, freight delivery permit auditing.",
            enterpriseValue: "Provides true origin-destination travel-time statistics across arterial links without violating individual privacy.",
            considerations: "Strict legal and statutory retention limits; raw plate images must be discarded immediately after hash generation."
        },
        {
            num: "04",
            name: "Intelligent Traffic Analytics",
            category: "Predictive Intelligence",
            maturity: "Implemented & Demonstrated",
            maturityClass: "maturity-implemented",
            shortDesc: "Macroscopic corridor indexing and spatial bottleneck analytics aggregating volume, density, and level of service (LOS).",
            detailedExplanation: "Processes continuous time-series traffic telemetry across spatial road graphs, calculating Highway Capacity Manual (HCM) Level of Service metrics and bottleneck indicators.",
            problemAddressed: "Traffic operators lack unified, historical visibility into recurring gridlock causes, leading to guesswork in signal timing updates.",
            workflow: "Sensor telemetry ingestion -> TimescaleDB / PostGIS aggregation -> HCM LOS calculation -> Spatial heatmap rendering -> Executive reports.",
            coreTech: "PostgreSQL/PostGIS, Apache Arrow, TimescaleDB, Grafana, MapLibre GL.",
            inputs: "Speed, flow, density, signal phase logs, weather conditions.",
            outputs: "Corridor Level of Service (LOS A–F), queue persistence duration, congestion heatmaps, bottleneck index.",
            integrations: "Municipal GIS departments, open data portals, urban planning mobility models.",
            municipalUseCases: "Monthly mobility auditing, infrastructure investment prioritization, construction detour impact analysis.",
            enterpriseValue: "Enables evidence-based capital planning, eliminating expensive third-party manual traffic counting studies.",
            considerations: "Requires minimum 30-day baseline data collection for statistical calibration."
        },
        {
            num: "05",
            name: "AI Traffic Prediction",
            category: "Predictive Intelligence",
            maturity: "In Development",
            maturityClass: "maturity-indev",
            shortDesc: "Time-series deep learning models (LSTM & GRU) forecasting corridor congestion 15 to 60 minutes into the future.",
            detailedExplanation: "Leverages Long Short-Term Memory networks to learn recurring diurnal and weekly traffic dynamics, forecasting queue build-ups before shockwaves propagate upstream.",
            problemAddressed: "Conventional signal controllers only react after traffic queues have already formed, failing to prevent gridlock propagation.",
            workflow: "Historical time-series window -> Feature normalization -> LSTM/GRU inference -> Confidence interval calculation -> Preemptive signal alert.",
            coreTech: "TensorFlow / PyTorch, LSTM, GRU, Temporal Convolutional Networks (TCN), Redis cache.",
            inputs: "Historical volume trends, real-time 5-minute rolling averages, calendar events, weather telemetry.",
            outputs: "Projected 15/30/60-minute vehicle density, anticipated queue length, shockwave warning probabilities.",
            integrations: "AITCS optimization core, navigation broadcast APIs, variable message signs (VMS).",
            municipalUseCases: "Preemptive green-time allocation, proactive event traffic routing, stadium egress management.",
            enterpriseValue: "Prevents gridlock inception by intervening 15 minutes before congestion reaches critical density.",
            considerations: "Requires continuous online retraining to adapt to seasonal shifts and structural road network alterations."
        },
        {
            num: "06",
            name: "Reinforcement Learning Optimization",
            category: "Intelligent Mobility",
            maturity: "Implemented & Demonstrated",
            maturityClass: "maturity-implemented",
            shortDesc: "Deep Q-Networks (DQN) and Proximal Policy Optimization (PPO) agents learning optimal cycle length and phase split policies.",
            detailedExplanation: "Simulates thousands of traffic scenarios in Eclipse SUMO where AI agents receive rewards for reducing vehicle delays, queue lengths, and vehicle stops, converging on superior timing policies.",
            problemAddressed: "Manual signal timing optimization requires months of consultant engineering and quickly becomes obsolete as traffic patterns evolve.",
            workflow: "SUMO state observation -> Vector embedding -> Policy network forward pass -> Candidate action -> TraCI execution -> Delay reward feedback.",
            coreTech: "Stable-Baselines3, PyTorch, Deep Q-Networks (DQN), PPO, SUMO TraCI.",
            inputs: "Lane-level vehicle counts, queue lengths, current signal phase duration, waiting time of halting vehicles.",
            outputs: "Next phase selection, phase duration extension/truncation (+/- seconds), reward diagnostics.",
            integrations: "Closed-loop simulation environments, shadow-mode field controller validators.",
            municipalUseCases: "Complex irregular multi-leg intersections, dynamic arterial green-wave adaptation, fluctuating port freight corridors.",
            enterpriseValue: "Self-improving control policies that maintain peak efficiency throughout unpredictable weather, holidays, and incidents.",
            considerations: "Must be trained and verified in simulation; field deployment requires hard safety bounds and minimum green times."
        },
        {
            num: "07",
            name: "Emergency Management & Priority Coordination",
            category: "Intelligent Mobility",
            maturity: "Concept-Stage",
            maturityClass: "maturity-concept",
            shortDesc: "Dynamic green corridor preemption system clearing signals ahead of ambulances, fire engines, and police convoys.",
            detailedExplanation: "Monitors emergency vehicle GNSS telemetry and automated vehicle location (AVL) feeds, computing route paths and actuating downstream signals to clear standing queues before arrival.",
            problemAddressed: "Emergency vehicles lose critical minutes navigating gridlocked intersections, increasing mortality and property loss.",
            workflow: "Emergency AVL trigger -> Route trajectory calculation -> Preemption request -> Signal queue-flush sequence -> Normalcy recovery.",
            coreTech: "Kafka, MQTT, PostGIS ST_DWithin, NTCIP 1202 Preemption objects, GeoJSON.",
            inputs: "Emergency vehicle CAD/AVL location, velocity, active route destination, emergency priority level.",
            outputs: "Preemption phase actuation, upstream queue-clearing greens, cross-street red hold, recovery cycle.",
            integrations: "City 911 / emergency dispatch (CAD), ambulance fleet tracking, fire department sirens.",
            municipalUseCases: "Hospital arterial clearance, disaster evacuation corridors, fire station egress priority.",
            enterpriseValue: "Reduces emergency response travel times by up to 25%, saving lives and mitigating secondary collisions.",
            considerations: "Requires inter-agency municipal memorandum of understanding and fail-safe transition recovery."
        },
        {
            num: "08",
            name: "Public Transport Priority",
            category: "Intelligent Mobility",
            maturity: "Concept-Stage",
            maturityClass: "maturity-concept",
            shortDesc: "Transit Signal Priority (TSP) granting selective green extensions and phase insertions for delayed public buses and BRT units.",
            detailedExplanation: "Evaluates real-time bus adherence to timetable schedules via GTFS-RT feeds, granting green extension or early green recall only when a transit vehicle is running behind schedule.",
            problemAddressed: "Buses trapped in general automobile congestion lead to service bunching, erratic headways, and declining transit ridership.",
            workflow: "GTFS-RT vehicle position -> Timetable delay calculation -> Priority threshold check -> Signal phase extension command -> Transit clearance.",
            coreTech: "GTFS / GTFS-RT, Python, NTCIP 1202 TSP objects, Redis, MQTT.",
            inputs: "Bus GPS position, door-close sensor, route ID, delay relative to timetable, passenger occupancy load.",
            outputs: "Green extension (+5 to 15s), early red truncation, transit phase insertion, passenger delay savings.",
            integrations: "Metropolitan transit authorities, BRT dispatch consoles, automated passenger counters (APC).",
            municipalUseCases: "High-frequency BRT corridors, cross-town feeder bus routes, light-rail grade crossings.",
            enterpriseValue: "Improves public transit reliability and on-time performance without requiring physical segregated busways.",
            considerations: "Must balance transit priority against cross-street private vehicle delay to avoid collateral gridlock."
        },
        {
            num: "09",
            name: "Pedestrian Intelligence",
            category: "AI & Computer Vision",
            maturity: "Planned (Phase 2)",
            maturityClass: "maturity-planned",
            shortDesc: "Computer vision and infrared sensing evaluating crosswalk waiting volumes and dynamically extending pedestrian walk intervals.",
            detailedExplanation: "Detects vulnerable road users (pedestrians, wheelchairs, elderly, school children) waiting at curbs, automatically calling pedestrian phases and extending clearance times when slow-moving walkers are present.",
            problemAddressed: "Fixed pedestrian clearance times force mobility-impaired citizens to rush across wide intersections, risking pedestrian fatalities.",
            workflow: "CCTV/IR detection -> Pedestrian count & bounding box tracking -> Crosswalk dwell time -> Dynamic walk signal extension -> Safety log.",
            coreTech: "YOLOv8-pose, OpenCV, Edge TPU, NTCIP 1202 Pedestrian calls.",
            inputs: "Curbside camera frames, thermal sensor matrices, accessible push-button calls.",
            outputs: "Automated pedestrian call, dynamic Flashing Don't Walk (FDW) clearance extension, crowd density index.",
            integrations: "Accessible pedestrian signals (APS), Vision Zero municipal safety scorecards, smart streetlighting.",
            municipalUseCases: "Senior center crosswalks, school safety zones, downtown pedestrian retail plazas.",
            enterpriseValue: "Substantially lowers pedestrian fatality risk (Vision Zero compliance) while eliminating empty pedestrian cycles.",
            considerations: "Optical sensors must withstand varying weather, rain glare, and nocturnal illumination changes."
        },
        {
            num: "10",
            name: "Incident Detection",
            category: "AI & Computer Vision",
            maturity: "In Development",
            maturityClass: "maturity-indev",
            shortDesc: "Automated anomaly detection spotting stopped vehicles, wrong-way driving, collisions, and road debris within seconds.",
            detailedExplanation: "Analyzes continuous vehicle trajectory vectors and optical flow, generating immediate operator alerts when a vehicle comes to an unscheduled halt or exhibits erratic behavior in active lanes.",
            problemAddressed: "Municipal traffic operators rely on manual phone calls or sporadic CCTV scanning, delaying incident clearance by 15–30 minutes.",
            workflow: "Edge vehicle tracking -> Velocity drop / stationary timer -> Spatial polygon check -> Incident confidence score -> TMC alert dispatch.",
            coreTech: "Optical flow, OpenCV, YOLOv8, WebSocket, FastAPI, Redis Pub/Sub.",
            inputs: "Continuous vehicle bounding box trajectories, lane geometry polygons, speed vectors.",
            outputs: "Incident alert type, timestamp, bounding box thumbnail, lane number, estimated severity.",
            integrations: "Municipal traffic management consoles, emergency roadside assistance, digital overhead message signs.",
            municipalUseCases: "Expressway shoulder breakdowns, tunnel stall detection, wrong-way highway entry prevention.",
            enterpriseValue: "Reduces secondary collision risk by up to 40% through rapid incident detection and lane closure warnings.",
            considerations: "Filtering required to avoid false alarms from normal red-light stopline queues."
        },
        {
            num: "11",
            name: "Smart Parking Intelligence",
            category: "Geospatial & Digital Twin",
            maturity: "Concept-Stage",
            maturityClass: "maturity-concept",
            shortDesc: "Predictive on-street and off-street parking availability modeling using camera analytics and payment transaction data.",
            detailedExplanation: "Estimates real-time parking space occupancy and turnover rates across commercial zones, guiding motorists to available spots and reducing cruising congestion.",
            problemAddressed: "Up to 30% of downtown urban traffic is caused by drivers cruising in circles searching for parking spaces.",
            workflow: "Camera/sensor occupancy check -> Parking meter API sync -> Spatial probability model -> Navigation feed distribution.",
            coreTech: "PostGIS, GeoPandas, FastAPI, MQTT, OpenStreetMap curb polygons.",
            inputs: "Curb-facing camera feeds, smart meter transaction timestamps, magnetometer sensor telemetry.",
            outputs: "Block-by-block occupancy percentage, turnover duration, cruising index, dynamic pricing recommendations.",
            integrations: "Municipal parking authority, commercial navigation apps (Google Maps, Waze), digital parking signs.",
            municipalUseCases: "Downtown retail district management, dynamic curb loading zone enforcement, event parking routing.",
            enterpriseValue: "Drastically cuts cruising vehicle emissions and improves retail parking access efficiency.",
            considerations: "Requires high-angle camera mounting or dedicated magnetometer sensors per parking bay."
        },
        {
            num: "12",
            name: "Environmental Intelligence",
            category: "Geospatial & Digital Twin",
            maturity: "Implemented & Demonstrated",
            maturityClass: "maturity-implemented",
            shortDesc: "Continuous tailpipe emissions and air quality impact modeling calculating CO2, NOx, and PM2.5 within simulation loops.",
            detailedExplanation: "Integrates the European HBEFA (Handbook Emission Factors for Road Transport) model directly into vehicle trajectory calculations, quantifying emissions reductions achieved through signal optimization.",
            problemAddressed: "Municipalities lack granular street-level emissions models to verify whether traffic interventions actually reduce carbon footprint.",
            workflow: "Vehicle trajectory & acceleration -> HBEFA formula lookup -> Instantaneous emission calculation -> Spatial aggregation -> ESG report.",
            coreTech: "HBEFA 4.1 model, SUMO emission engine, Python, PostGIS, Matplotlib / Chart.js.",
            inputs: "Vehicle class, instantaneous velocity, acceleration, road grade, fleet fuel type distribution.",
            outputs: "Grams of CO₂, NOx, PM2.5, carbon monoxide per second, cumulative fuel consumption in liters.",
            integrations: "Municipal environmental departments, UN SDG 11/13 reporting dashboards, carbon credit verifiers.",
            municipalUseCases: "Low-emission zone validation, green corridor grants justification, municipal climate pledge tracking.",
            enterpriseValue: "Provides verifiable, peer-reviewed environmental metrics essential for securing green infrastructure funding.",
            considerations: "Models calculate estimated emissions based on fleet profiles; field calibration with physical air sensors enhances accuracy."
        },
        {
            num: "13",
            name: "Weather Intelligence",
            category: "Predictive Intelligence",
            maturity: "Concept-Stage",
            maturityClass: "maturity-concept",
            shortDesc: "Micro-climate telemetry ingestion adapting signal clearance intervals and speed advice to rain, snow, fog, and ice.",
            detailedExplanation: "Ingests atmospheric and road friction telemetry from IoT weather stations, automatically adjusting yellow-light clearance times and pedestrian clearance intervals when pavement is wet or slippery.",
            problemAddressed: "Fixed traffic signal timings assume dry pavement braking distances, leading to rear-end crashes and intersection skid collisions in inclement weather.",
            workflow: "Weather station API -> Pavement friction coefficient estimate -> Safety clearance margin multiplier -> AITCS timing adjustment.",
            coreTech: "FastAPI, Open-Meteo API, NWS/DWD weather feeds, PostGIS spatial join.",
            inputs: "Rainfall rate, ambient temperature, road surface wetness, visibility range, wind speed.",
            outputs: "Safety timing multiplier (+15–30% yellow/all-red time), speed advisory messages, fog warning flags.",
            integrations: "Road maintenance fleets, snow plow tracking, regional meteorological services.",
            municipalUseCases: "Winter storm signal adaptation, flash flood intersection alerts, coastal fog speed regulation.",
            enterpriseValue: "Substantially lowers wet-weather intersection crash rates through automated physics-informed timing margins.",
            considerations: "Requires reliable local meteorological sensor integration or high-resolution radar API subscription."
        },
        {
            num: "14",
            name: "Drone Operations & Aerial Intelligence",
            category: "AI & Computer Vision",
            maturity: "Concept-Stage",
            maturityClass: "maturity-concept",
            shortDesc: "Authorized aerial video feed ingestion providing bird's-eye macroscopic queue tracing during major civic events or disasters.",
            detailedExplanation: "Ingests authorized municipal drone camera feeds, utilizing stabilization and spatial orthorectification to measure queue lengths and bottleneck points across multi-mile arterial spans.",
            problemAddressed: "Fixed street-level cameras suffer from occlusions and limited field of view during massive traffic disruptions or natural disasters.",
            workflow: "Drone video telemetry -> Image stabilization & homography -> Orthorectified coordinate mapping -> Macro queue extraction -> Command UI.",
            coreTech: "OpenCV homography, DeepSORT, RTMP/WebRTC ingestion, GIS GeoTIFF mapping.",
            inputs: "UAV optical camera feed, gimbal pitch/yaw coordinates, drone GNSS location and altitude.",
            outputs: "Arterial queue length in meters, congestion front propagation speed, emergency access route validation.",
            integrations: "Disaster management command centers, police aerial units, public works emergency teams.",
            municipalUseCases: "Hurricane evacuation corridor monitoring, major marathon road closure management, flood perimeter traffic rerouting.",
            enterpriseValue: "Instant macroscopic tactical awareness without waiting for permanent roadside sensor construction.",
            considerations: "Strict civil aviation authority regulations (FAA Part 107 / EASA), flight duration limits, and privacy zoning."
        },
        {
            num: "15",
            name: "Digital Twin & Traffic Simulation",
            category: "Geospatial & Digital Twin",
            maturity: "Implemented & Demonstrated",
            maturityClass: "maturity-implemented",
            shortDesc: "High-fidelity microscopic simulation engine (Eclipse SUMO) modeling street networks, driver psychology, and signal timings.",
            detailedExplanation: "Replicates real metropolitan street grids in virtual space, simulating thousands of individual vehicles governed by car-following physics (Krauss) and lane-changing behavior (LC2013) to safely test AI control policies.",
            problemAddressed: "Testing untested traffic timing changes directly on real city streets causes public outrage, gridlock, and potential collisions.",
            workflow: "OSM road network import -> OD matrix / flow calibration -> SUMO execution -> TraCI step-by-step control -> Baseline vs AI comparison.",
            coreTech: "Eclipse SUMO, TraCI, Python, Netconvert, Duarouter, Polyconvert.",
            inputs: "Road network geometry, intersection phase configurations, hourly traffic counts, vehicle fleet distributions.",
            outputs: "Individual vehicle trajectories, second-by-second delay logs, queue lengths, fuel consumption, simulated emissions.",
            integrations: "Urban planning software (VISSIM, Aimsun export), municipal GIS datasets, research testbeds.",
            municipalUseCases: "Corridor signal retiming validation, new light-rail transit line impact studies, major bridge closure simulations.",
            enterpriseValue: "Provides 100% risk-free algorithmic testing and mathematical proof of delay reduction before touching physical controllers.",
            considerations: "Simulation fidelity depends on accurate network geometry calibration and realistic traffic demand matrices."
        },
        {
            num: "16",
            name: "GIS & Spatial Intelligence",
            category: "Geospatial & Digital Twin",
            maturity: "Implemented & Demonstrated",
            maturityClass: "maturity-implemented",
            shortDesc: "Geospatial coordinate engine aligning OpenStreetMap, municipal shapefiles, and sensor telemetry onto spatial polygon layers.",
            detailedExplanation: "Serves as the spatial foundation of the Territorial Intelligence Platform, projecting all traffic observations, camera positions, signal controllers, and transit lines into standardized EPSG:4326/3857 coordinates.",
            problemAddressed: "Disparate municipal departments use incompatible coordinate systems and isolated CAD/GIS files, creating disconnected data islands.",
            workflow: "GeoJSON/Shapefile ingestion -> PostGIS spatial indexing (GIST) -> Spatial join with detector telemetry -> Vector tile generation.",
            coreTech: "PostgreSQL, PostGIS, GeoPandas, Shapely, MapLibre GL, GeoJSON.",
            inputs: "Municipal GIS layers, OpenStreetMap vector data, intersection coordinate points, elevation models.",
            outputs: "Vector map tiles (MVT), spatial intersection buffers, distance-to-bottleneck metrics, territorial polygons.",
            integrations: "Municipal ESRI ArcGIS platforms, QGIS workstations, open regional spatial data servers.",
            municipalUseCases: "Multi-jurisdictional corridor planning, city border traffic harmonization, flood hazard road overlay.",
            enterpriseValue: "Eliminates geographic discrepancies, providing a single spatial source of truth across all municipal infrastructure.",
            considerations: "Requires regular synchronization with municipal road maintenance and construction geodatabases."
        },
        {
            num: "17",
            name: "IoT & Edge Computing",
            category: "Infrastructure & Integration",
            maturity: "In Development",
            maturityClass: "maturity-indev",
            shortDesc: "Distributed edge runtime and MQTT sensor broker network running on ruggedized roadside intersection hardware.",
            detailedExplanation: "Deploys containerized edge services directly into traffic cabinet microservers, performing local video inference, protocol translation, and fail-safe watchdog monitoring with low latency.",
            problemAddressed: "Centralized cloud architectures suffer from internet outages, fiber cuts, and bandwidth limits when processing high-res camera streams.",
            workflow: "Local camera/detector capture -> Edge container inference -> Telemetry aggregation -> MQTT push to cloud -> Local fail-safe monitor.",
            coreTech: "Docker, Eclipse Mosquitto (MQTT), TLS 1.3, Linux (Ubuntu Core), ARM64 / x86_64.",
            inputs: "Local video feeds, detector contact closures, controller serial/Ethernet telemetry.",
            outputs: "Filtered JSON telemetry streams, edge health heartbeats, local fallback commands.",
            integrations: "NEMA / 2070 controller cabinets, roadside ITS enclosures, cellular 4G/5G industrial modems.",
            municipalUseCases: "Isolated rural highway intersections, high-reliability arterial networks, bandwidth-constrained corridors.",
            enterpriseValue: "Zero municipal downtime; local signal timing continues operating seamlessly even if central cloud connection drops.",
            considerations: "Hardware must be industrial-grade (NEMA TS2 temperature certified: -34°C to +74°C)."
        },
        {
            num: "18",
            name: "Vehicle-to-Everything (V2X) Support",
            category: "Infrastructure & Integration",
            maturity: "Concept-Stage",
            maturityClass: "maturity-concept",
            shortDesc: "Cooperative V2X communication gateway preparing infrastructure for autonomous vehicles and in-vehicle dash advisories.",
            detailedExplanation: "Standardizes signal phase and timing (SPaT) and geographic intersection description (MAP) messages for broadcast over C-V2X (Cellular V2X) and DSRC to connected and autonomous vehicles.",
            problemAddressed: "Connected vehicles cannot anticipate traffic signal state changes, resulting in harsh braking and missed green waves.",
            workflow: "AITCS controller state -> SAE J2735 SPaT message generation -> C-V2X roadside unit (RSU) broadcast -> In-vehicle display.",
            coreTech: "SAE J2735 protocol, ASN.1 encoding, C-V2X (3GPP Rel 14/15), MQTT, WebSocket.",
            inputs: "Real-time signal phase timing, countdown seconds to green/red, lane geometry descriptions.",
            outputs: "Broadcast SPaT and MAP messages, optimal green speed advisory (GLOSA) recommendations.",
            integrations: "Connected vehicle onboard units (OBU), commercial navigation apps, autonomous shuttle fleets.",
            municipalUseCases: "Green Light Optimized Speed Advisory (GLOSA), autonomous bus lane coordination, blind spot collision warning.",
            enterpriseValue: "Positions municipal infrastructure for the upcoming wave of connected and autonomous vehicle fleets.",
            considerations: "Requires certified roadside units (RSUs) and spectrum licensing compliance (5.9 GHz ITS band)."
        },
        {
            num: "19",
            name: "Cloud and Deployment Platform",
            category: "Infrastructure & Integration",
            maturity: "Implemented & Demonstrated",
            maturityClass: "maturity-implemented",
            shortDesc: "Cloud-neutral containerized deployment topology deployable on Azure AKS, AWS EKS, Google GKE, or bare-metal on-premises servers.",
            detailedExplanation: "Architected using standard microservices, Helm charts, and container orchestration, allowing sovereign public authorities to choose on-premises, cloud, or hybrid operational hosting.",
            problemAddressed: "Public authorities fear commercial vendor cloud lock-in and mandatory ongoing hosting markups.",
            workflow: "Source repository commit -> Automated CI container build -> Helm deployment -> Kubernetes pod scaling -> Load-balanced ingress.",
            coreTech: "Kubernetes, Docker, Helm, Azure AKS, AWS EKS, Linux bare-metal.",
            inputs: "Aggregated municipal telemetry streams, API user queries, microservice configuration files.",
            outputs: "Highly available web dashboards, scalable background workers, automated database replicas.",
            integrations: "Municipal datacenter infrastructure, public cloud sovereign tenant accounts, hybrid edge meshes.",
            municipalUseCases: "Sovereign on-premises municipal hosting, regional multi-city shared cloud clusters, disaster backup pods.",
            enterpriseValue: "Complete hosting flexibility; zero proprietary cloud vendor dependency guarantees sovereign data custody.",
            considerations: "On-premises deployments require municipal IT teams to manage server hardware and firewall configurations."
        },
        {
            num: "20",
            name: "Backend and API Services",
            category: "Infrastructure & Integration",
            maturity: "Implemented & Demonstrated",
            maturityClass: "maturity-implemented",
            shortDesc: "High-performance asynchronous REST and WebSocket API gateway built with FastAPI and Redis message brokers.",
            detailedExplanation: "Serves real-time corridor metrics, accepts detector telemetry streams, and manages user authentication with sub-second response times and automated OpenAPI documentation.",
            problemAddressed: "Legacy municipal software uses closed binary protocols and sluggish monolithic servers that crash during traffic spikes.",
            workflow: "Client request -> Reverse proxy (Nginx) -> FastAPI endpoint validation (Pydantic) -> Redis cache/TimescaleDB -> JSON response.",
            coreTech: "FastAPI, Python 3.11, Pydantic, Redis, Uvicorn, Nginx.",
            inputs: "HTTP requests, WebSocket connections, telemetry JSON payloads, query parameters.",
            outputs: "JSON API responses, real-time WebSocket metric streams, OpenAPI / Swagger interactive documentation.",
            integrations: "Third-party urban dashboards, mobile citizen apps, external academic research queries.",
            municipalUseCases: "Municipal open-data feeds, inter-agency transit synchronization, emergency operations dashboards.",
            enterpriseValue: "Modern, developer-friendly REST and WebSocket APIs enabling seamless third-party app ecosystem integration.",
            considerations: "Requires API rate limiting and token authentication to prevent denial-of-service degradation."
        },
        {
            num: "21",
            name: "Frontend and Command Interface",
            category: "Infrastructure & Integration",
            maturity: "Implemented & Demonstrated",
            maturityClass: "maturity-implemented",
            shortDesc: "High-contrast, accessible operator console with MapLibre GL 3D mapping, corridor speed heatmaps, and alert panels.",
            detailedExplanation: "Designed for traffic management centers and operations rooms, featuring dark/light modes, live signal phase monitoring, drill-down intersection statistics, and responsive desktop/tablet layouts.",
            problemAddressed: "Outdated, clunky traffic software overwhelms operators with dense tables, causing critical delays in incident recognition.",
            workflow: "Operator login -> WebSocket telemetry hook -> MapLibre GL vector canvas render -> Incident alert banner -> Signal inspection modal.",
            coreTech: "HTML5, CSS3 Variables, JavaScript (ES6+), MapLibre GL, Chart.js, SVG canvas.",
            inputs: "Real-time WebSocket data, user filter selections, intersection query clicks.",
            outputs: "Interactive 3D vector map, color-coded corridor speed lines, live signal phase animations, metric charts.",
            integrations: "Traffic management video walls, operator dual-monitor workstations, tablet field inspector consoles.",
            municipalUseCases: "Daily traffic monitoring, incident dispatch management, executive mobility briefings.",
            enterpriseValue: "Intuitive command center UX minimizes training requirements for municipal staff and accelerates response times.",
            considerations: "Requires modern WebGL-compatible web browsers (Chrome, Edge, Firefox, Safari)."
        },
        {
            num: "22",
            name: "Data Management and Storage",
            category: "Infrastructure & Integration",
            maturity: "Implemented & Demonstrated",
            maturityClass: "maturity-implemented",
            shortDesc: "Hybrid relational, geospatial, and time-series persistence layer powered by PostgreSQL, PostGIS, and TimescaleDB.",
            detailedExplanation: "Separates real-time ephemeral detector pulses (Redis in-memory) from long-term aggregated corridor statistics and spatial road vectors (PostgreSQL/PostGIS) with automated partitioning.",
            problemAddressed: "High-frequency traffic sensor streams quickly overwhelm conventional relational databases, causing query timeouts and data corruption.",
            workflow: "Raw telemetry arrival -> Redis buffer -> Batch insert worker -> TimescaleDB hypertable -> Automated monthly data aggregation.",
            coreTech: "PostgreSQL 15+, PostGIS 3+, TimescaleDB, Redis, SQLAlchemy.",
            inputs: "Sub-second detector pulses, signal phase event logs, vehicle trajectories, weather samples.",
            outputs: "Partitioned time-series tables, spatial GIST indexes, historical query rollups, automated backup archives.",
            integrations: "Enterprise database backup storage, municipal data lakes, spatial business intelligence tools.",
            municipalUseCases: "Five-year longitudinal traffic trend analysis, municipal climate audit archives, incident liability investigations.",
            enterpriseValue: "Scales to billions of sensor readings with sub-second query performance and zero data loss.",
            considerations: "Requires configured automated hypertable chunk compression and retention policy enforcement."
        },
        {
            num: "23",
            name: "Observability and System Health",
            category: "Security & Governance",
            maturity: "In Development",
            maturityClass: "maturity-indev",
            shortDesc: "End-to-end distributed telemetry and alerting framework tracking CPU, memory, API latency, and edge heartbeat drops.",
            detailedExplanation: "Monitors every microservice, edge node, and detector stream using Prometheus metrics and Grafana dashboards, alerting operations teams the instant a sensor fails or controller drops offline.",
            problemAddressed: "Municipal ITS networks often suffer silent failures where damaged detector loops go unnoticed for months.",
            workflow: "Prometheus exporter scrape -> Time-series metric store -> Alertmanager rule evaluation -> PagerDuty / Slack / Email alert.",
            coreTech: "Prometheus, Grafana, Alertmanager, Loki (centralized logging), OpenTelemetry.",
            inputs: "Container metrics, API response latency, edge MQTT heartbeat timestamps, database query durations.",
            outputs: "Real-time health status dashboards, uptime SLA percentage reports, automated incident tickets.",
            integrations: "Municipal IT ticketing systems, cloud monitoring infrastructure, operations notification pagers.",
            municipalUseCases: "Predictive roadside equipment maintenance, 99.9% uptime SLA verification, network bottleneck diagnostics.",
            enterpriseValue: "Eliminates undetected sensor outages, ensuring traffic algorithms always operate on fresh, verified data.",
            considerations: "Log retention must be balanced against available storage space."
        },
        {
            num: "24",
            name: "Security and Identity Management",
            category: "Security & Governance",
            maturity: "Implemented & Demonstrated",
            maturityClass: "maturity-implemented",
            shortDesc: "Granular Role-Based Access Control (RBAC), OAuth2/JWT authentication, and end-to-end TLS 1.3 encryption across all communication links.",
            detailedExplanation: "Enforces strict principle-of-least-privilege permissions, separating view-only traffic observers from authorized traffic engineers permitted to adjust signal timings, with complete audit logging.",
            problemAddressed: "Connected smart city infrastructure represents an attractive target for unauthorized access, tampering, or malicious override.",
            workflow: "User login -> Identity provider verification -> JWT token issue -> API RBAC validation -> Cryptographic audit log entry.",
            coreTech: "OAuth2, JWT, bcrypt password hashing, TLS 1.3, AES-256 encryption-at-rest.",
            inputs: "User credentials, multi-factor authentication (MFA) tokens, API access keys.",
            outputs: "Scoped JWT access tokens, role permission matrices, immutable administrative audit logs.",
            integrations: "Municipal Active Directory / LDAP, municipal single sign-on (SSO) gateways.",
            municipalUseCases: "Role separation between police dispatchers, transit planners, public works contractors, and system admins.",
            enterpriseValue: "Enterprise-grade cyber defenses protecting critical municipal arterial infrastructure against tampering.",
            considerations: "Requires regular security audits, dependency vulnerability scanning, and periodic key rotation."
        },
        {
            num: "25",
            name: "DevOps and Delivery Automation",
            category: "Security & Governance",
            maturity: "Implemented & Demonstrated",
            maturityClass: "maturity-implemented",
            shortDesc: "Automated continuous integration and deployment (CI/CD) pipelines running regression tests, security scans, and rolling updates.",
            detailedExplanation: "Executes automated unit tests, SUMO simulation benchmark verifications, and Docker container builds on every code commit, preventing regressions from ever reaching production environments.",
            problemAddressed: "Manual municipal software upgrades cause unexpected service downtime and software bugs during deployment.",
            workflow: "Git push -> GitHub Actions pipeline -> Pytest & Linter -> SUMO regression run -> Docker image build -> Staging deploy.",
            coreTech: "GitHub Actions, Docker Compose, Pytest, Flake8, Trivy security scanner.",
            inputs: "Source code commits, pull requests, automated test scripts, environment configuration files.",
            outputs: "Verified Docker images, test coverage reports, automated staging deployment status.",
            integrations: "GitHub container registry (GHCR), staging test environments, production release gates.",
            municipalUseCases: "Zero-downtime rolling software updates, rapid hotfix deployment for field edge bugs.",
            enterpriseValue: "Guarantees software reliability, security compliance, and predictable maintenance release cycles.",
            considerations: "Edge nodes require resilient over-the-air (OTA) update mechanisms with automatic rollback capabilities."
        },
        {
            num: "26",
            name: "AI Governance and MLOps",
            category: "Security & Governance",
            maturity: "In Development",
            maturityClass: "maturity-indev",
            shortDesc: "Model registry, statistical drift detection, explainability logging, and human-in-the-loop safety oversight.",
            detailedExplanation: "Maintains full lineage of all neural network models and reinforcement learning policies, logging every timing decision with deterministic explanations and alerting when traffic patterns drift.",
            problemAddressed: "Black-box AI models that produce unexplained timing anomalies erode municipal trust and risk chaotic traffic jams.",
            workflow: "Model training -> Validation benchmark -> MLflow model registry -> Online inference monitoring -> Drift alert -> Human sign-off.",
            coreTech: "MLflow, Evidently AI, Explainable AI (SHAP / feature attribution), Python.",
            inputs: "Model training datasets, online inference predictions, observed ground-truth traffic distributions.",
            outputs: "Model accuracy scorecards, feature attribution logs, drift detection alerts, rollback triggers.",
            integrations: "Municipal AI ethics review committees, academic research benchmarking portals.",
            municipalUseCases: "Post-incident algorithm auditability, seasonal model adaptation, compliance with international AI ethics standards.",
            enterpriseValue: "Builds unshakeable public trust through complete algorithmic explainability and auditable decision trails.",
            considerations: "Human-in-the-loop sign-off is mandatory before deploying newly trained policies to live signal controllers."
        },
        {
            num: "27",
            name: "Smart City Integration Hub",
            category: "Infrastructure & Integration",
            maturity: "Concept-Stage",
            maturityClass: "maturity-concept",
            shortDesc: "Standardized municipal data bus translating legacy SCADA, UTMC, and smart city platforms into open OpenAPI schemas.",
            detailedExplanation: "Acts as a universal adapter between modern cloud microservices and legacy municipal systems (SCADA, SCOOT, SCATS, UTMC), enabling phased modernization without ripping and replacing hardware.",
            problemAddressed: "Cities are trapped in proprietary vendor ecosystems where expanding or modernizing requires multi-million-dollar rip-and-replace contracts.",
            workflow: "Legacy protocol ingestion (serial/NTCIP/UTMC) -> Normalization engine -> JSON message bus -> Open API export.",
            coreTech: "FastAPI, Apache Kafka, Protocol Buffers, NTCIP 1202, UTMC specifications.",
            inputs: "Legacy controller status feeds, third-party urban sensor APIs, municipal work order systems.",
            outputs: "Standardized REST/GraphQL APIs, uniform incident data models, bi-directional command bridges.",
            integrations: "Siemens SCOOT, Tyco SCATS, legacy municipal SCADA systems, regional 511 traveler traveler information systems.",
            municipalUseCases: "Phased smart city migration, legacy controller overlay, multi-vendor equipment unification.",
            enterpriseValue: "Protects existing municipal capital investments while unlocking modern AI optimization capabilities.",
            considerations: "Requires vendor cooperation or open protocol documentation for legacy controller cabinet interfaces."
        }
    ];

    // --- 2. RENDER FEATURE CARDS ---
    function renderFeatures(filterCat, searchTerm) {
        const container = document.getElementById('features-container');
        if (!container) return;

        container.innerHTML = '';
        let filtered = features27Data;

        if (filterCat && filterCat !== 'all') {
            filtered = filtered.filter(f => f.category.toLowerCase().replace(/[^a-z0-9]/g, '-') === filterCat);
        }

        if (searchTerm && searchTerm.trim() !== '') {
            const term = searchTerm.toLowerCase().trim();
            filtered = filtered.filter(f => 
                f.name.toLowerCase().includes(term) ||
                f.shortDesc.toLowerCase().includes(term) ||
                f.coreTech.toLowerCase().includes(term) ||
                f.detailedExplanation.toLowerCase().includes(term) ||
                f.num.includes(term)
            );
        }

        if (filtered.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; background: #FFFFFF; border-radius: var(--radius-lg); border: 1px dashed var(--border-subtle);">
                    <span style="font-size: 2.5rem; display: block; margin-bottom: 10px;">🔍</span>
                    <h4 style="color: var(--text-primary); margin-bottom: 6px;">No features match your query</h4>
                    <p style="color: var(--text-secondary); font-size: 0.85rem;">Try adjusting your search terms or selecting a different category filter.</p>
                </div>
            `;
            return;
        }

        filtered.forEach(f => {
            const card = document.createElement('div');
            card.className = 'feature-card';
            card.id = `feat-${f.num}`;

            card.innerHTML = `
                <div>
                    <div class="feature-card-header">
                        <span class="feature-num-badge">Feature ${f.num}</span>
                        <span class="feature-maturity-badge ${f.maturityClass}">${f.maturity}</span>
                    </div>
                    <h3 class="feature-card-title">${f.name}</h3>
                    <div style="font-size: 0.72rem; color: var(--color-brand-primary); font-weight: 700; margin-bottom: 8px; text-transform: uppercase;">
                        📁 ${f.category}
                    </div>
                    <p class="feature-card-desc">${f.shortDesc}</p>
                </div>

                <div>
                    <div class="feature-card-footer">
                        <span class="feature-tech-pill">⚙️ ${f.coreTech.split(',')[0].trim()}</span>
                        <button type="button" class="feature-expand-btn" onclick="toggleFeatureDrawer('${f.num}')" aria-expanded="false" aria-controls="drawer-${f.num}">
                            Inspect Details ▾
                        </button>
                    </div>

                    <!-- Expandable 14-Field Detail Drawer -->
                    <div class="feature-detail-drawer" id="drawer-${f.num}">
                        <div class="feature-detail-grid">
                            <div class="feature-detail-item" style="grid-column: 1 / -1;">
                                <strong>Detailed Technical Description:</strong>
                                <p>${f.detailedExplanation}</p>
                            </div>
                            <div class="feature-detail-item">
                                <strong>Urban Problem Addressed:</strong>
                                <span>${f.problemAddressed}</span>
                            </div>
                            <div class="feature-detail-item">
                                <strong>Technical Workflow:</strong>
                                <span>${f.workflow}</span>
                            </div>
                            <div class="feature-detail-item">
                                <strong>Core Technology Stack:</strong>
                                <span>${f.coreTech}</span>
                            </div>
                            <div class="feature-detail-item">
                                <strong>Data Inputs:</strong>
                                <span>${f.inputs}</span>
                            </div>
                            <div class="feature-detail-item">
                                <strong>Expected Outputs:</strong>
                                <span>${f.outputs}</span>
                            </div>
                            <div class="feature-detail-item">
                                <strong>Integration Opportunities:</strong>
                                <span>${f.integrations}</span>
                            </div>
                            <div class="feature-detail-item">
                                <strong>Municipal Use Cases:</strong>
                                <span>${f.municipalUseCases}</span>
                            </div>
                            <div class="feature-detail-item">
                                <strong>Enterprise & ESG Value:</strong>
                                <span>${f.enterpriseValue}</span>
                            </div>
                            <div class="feature-detail-item" style="grid-column: 1 / -1;">
                                <strong>Implementation & Regulatory Considerations:</strong>
                                <span>${f.considerations}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    }

    // --- 3. TOGGLE FEATURE DRAWER ---
    window.toggleFeatureDrawer = function (num) {
        const drawer = document.getElementById(`drawer-${num}`);
        const btn = document.querySelector(`#feat-${num} .feature-expand-btn`);
        if (!drawer || !btn) return;

        const isOpen = drawer.classList.contains('open');
        if (isOpen) {
            drawer.classList.remove('open');
            btn.innerHTML = 'Inspect Details ▾';
            btn.setAttribute('aria-expanded', 'false');
        } else {
            drawer.classList.add('open');
            btn.innerHTML = 'Hide Details ▴';
            btn.setAttribute('aria-expanded', 'true');
        }
    };

    // --- 4. INTERACTION EVENT LISTENERS ---
    document.addEventListener('DOMContentLoaded', function () {
        // Render all 27 features initially
        renderFeatures('all', '');

        // Category Filter Buttons
        const filterBtns = document.querySelectorAll('.cat-filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const cat = this.getAttribute('data-category');
                const searchVal = document.getElementById('feature-search-input')?.value || '';
                renderFeatures(cat, searchVal);
            });
        });

        // Search Input
        const searchInput = document.getElementById('feature-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', function () {
                const activeCatBtn = document.querySelector('.cat-filter-btn.active');
                const cat = activeCatBtn ? activeCatBtn.getAttribute('data-category') : 'all';
                renderFeatures(cat, this.value);
            });
        }

        // --- 5. STICKY CHAPTER NAV SCROLLSPY ---
        const chapterLinks = document.querySelectorAll('.chapter-nav-item a');
        const sections = document.querySelectorAll('section[id]');

        function updateScrollSpy() {
            let currentId = '';
            const scrollPos = window.scrollY + 180;

            sections.forEach(sec => {
                const top = sec.offsetTop;
                const height = sec.offsetHeight;
                if (scrollPos >= top && scrollPos < top + height) {
                    currentId = sec.getAttribute('id');
                }
            });

            if (currentId) {
                chapterLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        }

        window.addEventListener('scroll', updateScrollSpy, { passive: true });
        updateScrollSpy();

        // --- 6. FAQ ACCORDION ENGINE ---
        const faqBtns = document.querySelectorAll('.faq-question-btn');
        faqBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                const item = this.closest('.faq-item');
                const isOpen = item.classList.contains('open');

                // Close other items
                document.querySelectorAll('.faq-item').forEach(i => {
                    i.classList.remove('open');
                    const b = i.querySelector('.faq-question-btn');
                    if (b) b.setAttribute('aria-expanded', 'false');
                });

                if (!isOpen) {
                    item.classList.add('open');
                    this.setAttribute('aria-expanded', 'true');
                }
            });
        });

        // --- 7. TRAFFIC INTERSECTION SIMULATOR ENGINE ---
        const simBtns = document.querySelectorAll('.sim-phase-btn');
        const phaseName = document.getElementById('sim-current-phase');
        const metricThroughput = document.getElementById('sim-metric-throughput');
        const metricDelay = document.getElementById('sim-metric-delay');
        const metricQueue = document.getElementById('sim-metric-queue');

        const phaseStates = {
            'ns-green': {
                name: 'Phase 1: North-South Arterial Green Wave',
                throughput: '1,840 veh/hr',
                delay: '14.2s / veh',
                queue: '4 vehicles'
            },
            'ew-green': {
                name: 'Phase 2: East-West Cross-Street Flow',
                throughput: '1,120 veh/hr',
                delay: '22.8s / veh',
                queue: '11 vehicles'
            },
            'ped-scramble': {
                name: 'Phase 3: Protected Multi-Directional Pedestrian Walk',
                throughput: '320 veh/hr (Vehicles Held)',
                delay: '31.5s / veh',
                queue: '18 vehicles'
            },
            'emergency-preempt': {
                name: 'Phase 4: Blue-Light Emergency Corridor Preemption',
                throughput: '2,400 veh/hr (Cleared)',
                delay: '6.1s / veh',
                queue: '0 vehicles'
            }
        };

        simBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                simBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                const phase = this.getAttribute('data-phase');
                const data = phaseStates[phase];
                if (data) {
                    if (phaseName) phaseName.textContent = data.name;
                    if (metricThroughput) metricThroughput.textContent = data.throughput;
                    if (metricDelay) metricDelay.textContent = data.delay;
                    if (metricQueue) metricQueue.textContent = data.queue;
                }
            });
        });

        // --- 8. SYSTEM ENGINEERING INTERACTIVE CONTROLLER ---
        const sysengTabs = document.querySelectorAll('.syseng-tab-btn');
        const sysengLayers = document.querySelectorAll('.syseng-layer-card');
        const sysengDividers = document.querySelectorAll('.syseng-flow-divider');

        if (sysengTabs.length > 0) {
            sysengTabs.forEach(tab => {
                tab.addEventListener('click', function () {
                    sysengTabs.forEach(t => {
                        t.classList.remove('active');
                        t.setAttribute('aria-selected', 'false');
                    });
                    this.classList.add('active');
                    this.setAttribute('aria-selected', 'true');

                    const selectedLayer = this.getAttribute('data-layer');

                    if (selectedLayer === 'all') {
                        sysengLayers.forEach(l => l.classList.remove('hidden'));
                        sysengDividers.forEach(d => { d.style.display = 'flex'; });
                    } else {
                        sysengLayers.forEach(l => {
                            if (l.getAttribute('data-layer') === selectedLayer) {
                                l.classList.remove('hidden');
                            } else {
                                l.classList.add('hidden');
                            }
                        });
                        sysengDividers.forEach(d => { d.style.display = 'none'; });
                    }
                });
            });
        }

        // Module Spec Drawer Toggles
        const specToggles = document.querySelectorAll('.syseng-spec-toggle');
        specToggles.forEach(btn => {
            btn.addEventListener('click', function () {
                const drawer = this.parentElement.querySelector('.syseng-spec-drawer');
                if (!drawer) return;

                const isOpen = drawer.classList.contains('open');
                if (isOpen) {
                    drawer.classList.remove('open');
                    this.setAttribute('aria-expanded', 'false');
                    const textSpan = this.querySelector('.toggle-text');
                    if (textSpan) textSpan.textContent = 'Inspect Specs';
                } else {
                    drawer.classList.add('open');
                    this.setAttribute('aria-expanded', 'true');
                    const textSpan = this.querySelector('.toggle-text');
                    if (textSpan) textSpan.textContent = 'Hide Specs';
                }
            });
        });
    });

})();

