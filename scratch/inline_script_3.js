
        // Listen to language changes to update dynamic territorial map or solutions
        window.addEventListener('movisabio:langchange', (e) => {
            if (typeof renderSolutions === 'function') renderSolutions();
        });

        // --- 2. PRESERVED TECH SOLUTIONS DATABASE ---
        const techSolutions = [
            
            {
        id: 5,
        title: "movisabio-enterprise-smart-city",
        badge: "Enterprise Platform",
        badgeColor: "var(--white)",
        badgeBg: "linear-gradient(135deg, var(--primary-color), var(--accent-blue))",
        borderColor: "var(--accent-blue)",
        shortDesc: "A next-generation smart city and intelligent transportation platform acting as the central nervous system of modern urban areas.",
        subtitle: "Complete Stakeholder Guide, Feature Breakdown, Deployment Roadmap & Investor Deck.",
        longDesc: `
            <h2 class="detail-heading">movisabio-enterprise-smart-city: Complete Architecture, Roadmap & Pitch Deck</h2>
            
            <div class="presentation-slide" style="border-top-color: var(--accent-blue);">
                <div class="slide-header" style="color: var(--accent-blue);">Introduction & Overview</div>
                <p style="text-align: center; color: var(--text-light); font-size: 1.05rem; line-height: 1.7;">
                    To fully understand how <strong>movisabio-enterprise-smart-city</strong> transforms a bustling urban area into a smoothly running, safe, and eco-friendly home, let's walk through every single feature tier, strategic phase, and executive presentation slide.
                </p>
            </div>

            <!-- PART 1: TRAFFIC CONTROL & AI -->
            <div class="presentation-slide" style="border-top-color: var(--primary-color);">
                <div class="slide-header" style="color: var(--primary-color);">Part 1: Traffic Control & Artificial Intelligence</div>
                <div class="slide-grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
                    <div class="slide-item">
                        <div class="icon" style="font-size: 2rem;">🚦</div>
                        <h4>1. AI Traffic Control System (AITCS)</h4>
                        <p><strong>Adaptive Signal Control:</strong> Changes green and red lights based on real-time vehicle queues.<br><br><strong>Green-Wave Coordination:</strong> Syncs a series of lights along major corridors.<br><br><strong>Fail-Safe Override:</strong> Allows human operators to take manual control during emergencies.</p>
                    </div>
                    <div class="slide-item">
                        <div class="icon" style="font-size: 2rem;">🧠</div>
                        <h4>6. Reinforcement Learning</h4>
                        <p><strong>Trial-and-Error AI:</strong> Uses Deep Q-Networks to simulate thousands of traffic scenarios, discovering optimal timing strategies faster than human calculation.</p>
                    </div>
                </div>
            </div>

            <!-- PART 2: VISION, EYES, & SECURITY -->
            <div class="presentation-slide" style="border-top-color: var(--accent-green);">
                <div class="slide-header" style="color: var(--accent-green);">Part 2: Vision, Eyes, & Security</div>
                <div class="slide-grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
                    <div class="slide-item">
                        <div class="icon" style="font-size: 2rem;">👁️</div>
                        <h4>2. Computer Vision & Edge AI</h4>
                        <p><strong>Object Detection:</strong> Recognizes cars, buses, trucks, motorcycles, and pedestrians.<br><br><strong>Crowd & Lane Analytics:</strong> Monitors traffic density and public plazas to spot overcrowded areas.</p>
                    </div>
                    <div class="slide-item">
                        <div class="icon" style="font-size: 2rem;">🛡️</div>
                        <h4>3. Automatic Number Plate Recognition (ANPR)</h4>
                        <p><strong>Security Tracking:</strong> Cross-references scanned plates with databases for stolen vehicle alerts.<br><br><strong>Travel Time Calculation:</strong> Measures point-to-point transit times via plate scanning.</p>
                    </div>
                </div>
            </div>

            <!-- PART 3: ANALYTICS & PREDICTION -->
            <div class="presentation-slide" style="border-top-color: var(--accent-yellow);">
                <div class="slide-header" style="color: var(--accent-yellow);">Part 3: Analytics & Prediction</div>
                <div class="slide-grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
                    <div class="slide-item">
                        <div class="icon" style="font-size: 2rem;">📊</div>
                        <h4>4. Traffic Analytics</h4>
                        <p><strong>Congestion Index & Density:</strong> Real-time road crowding metrics.<br><br><strong>Level of Service (LOS):</strong> Grades road performance from smooth (A) to gridlocked (F).</p>
                    </div>
                    <div class="slide-item">
                        <div class="icon" style="font-size: 2rem;">🔮</div>
                        <h4>5. AI Prediction</h4>
                        <p><strong>Multi-Horizon Forecasting:</strong> Uses LSTM/GRU deep learning models to predict traffic jams 10, 30, or 60 minutes ahead of time.</p>
                    </div>
                </div>
            </div>

            <!-- PART 4: SAFETY & EMERGENCY MANAGEMENT -->
            <div class="presentation-slide" style="border-top-color: var(--accent-red);">
                <div class="slide-header" style="color: var(--accent-red);">Part 4: Safety & Emergency Management</div>
                <div class="slide-grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
                    <div class="slide-item">
                        <div class="icon" style="font-size: 2rem;">🚑</div>
                        <h4>7. Emergency Management</h4>
                        <p><strong>Priority Corridors:</strong> Automatically turns emergency vehicle routes green.<br><br><strong>Evacuation Routing:</strong> Guides citizens safely out during crises.</p>
                    </div>
                    <div class="slide-item">
                        <div class="icon" style="font-size: 2rem;">⚠️</div>
                        <h4>10. Incident Detection</h4>
                        <p><strong>Accident Alerts:</strong> Instantly flags stopped vehicles, collisions, wrong-way drivers, or debris for dispatchers.</p>
                    </div>
                </div>
            </div>

            <!-- PART 5: PUBLIC TRANSIT, PARKING, & PEDESTRIANS -->
            <div class="presentation-slide" style="border-top-color: var(--accent-blue);">
                <div class="slide-header" style="color: var(--accent-blue);">Part 5: Public Transit, Parking, & Pedestrians</div>
                <div class="slide-grid three-col">
                    <div class="slide-item">
                        <div class="icon">🚌</div>
                        <h4>8. Public Transport</h4>
                        <p><strong>Transit Signal Priority (TSP):</strong> Grants green extensions to crowded buses and BRT systems.</p>
                    </div>
                    <div class="slide-item">
                        <div class="icon">🅿️</div>
                        <h4>11. Smart Parking</h4>
                        <p><strong>Occupancy & Guidance:</strong> Directs drivers to open garage spaces to eliminate block-circling gridlock.</p>
                    </div>
                    <div class="slide-item">
                        <div class="icon">🚶</div>
                        <h4>9. Pedestrian Intelligence</h4>
                        <p><strong>Adaptive Crossing:</strong> Gives children, elderly citizens, and crowds extra time at crosswalks.</p>
                    </div>
                </div>
            </div>

            <!-- PART 6: ENVIRONMENT & WEATHER -->
            <div class="presentation-slide" style="border-top-color: var(--accent-green);">
                <div class="slide-header" style="color: var(--accent-green);">Part 6: Environment & Weather</div>
                <div class="slide-grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
                    <div class="slide-item">
                        <div class="icon" style="font-size: 2rem;">🌱</div>
                        <h4>12. Environmental Intelligence</h4>
                        <p><strong>Emissions Tracking:</strong> Estimates $CO_2$ and $PM_{2.5}$ pollution around busy junctions based on vehicle idling times.</p>
                    </div>
                    <div class="slide-item">
                        <div class="icon" style="font-size: 2rem;">🌧️</div>
                        <h4>13. Weather Intelligence</h4>
                        <p><strong>Weather Adjustments:</strong> Automatically modifies speed limits and signal timings during rain, fog, or snow.</p>
                    </div>
                </div>
            </div>

            <!-- PART 7: DRONES & DIGITAL TWINS -->
            <div class="presentation-slide" style="border-top-color: var(--primary-color);">
                <div class="slide-header" style="color: var(--primary-color);">Part 7: Drones & Digital Twins</div>
                <div class="slide-grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
                    <div class="slide-item">
                        <div class="icon" style="font-size: 2rem;">🛸</div>
                        <h4>14. Drone Operations</h4>
                        <p><strong>Autonomous Drones:</strong> Dispatches rooftop drones to accident scenes for live aerial video and flood assessments.</p>
                    </div>
                    <div class="slide-item">
                        <div class="icon" style="font-size: 2rem;">🌐</div>
                        <h4>15. Digital Twin</h4>
                        <p><strong>City Simulation:</strong> Uses SUMO/CARLA simulation to test layouts and traffic rules in a virtual world before building.</p>
                    </div>
                </div>
            </div>

            <!-- PART 8: MAPPING, IOT, & V2X -->
            <div class="presentation-slide" style="border-top-color: var(--accent-yellow);">
                <div class="slide-header" style="color: var(--accent-yellow);">Part 8: Mapping, IoT, & Connected Vehicles</div>
                <div class="slide-grid three-col">
                    <div class="slide-item">
                        <div class="icon">🗺️</div>
                        <h4>16. GIS & Mapping</h4>
                        <p>OpenStreetMap and PostGIS spatial modeling across the city.</p>
                    </div>
                    <div class="slide-item">
                        <div class="icon">📡</div>
                        <h4>17. IoT & Edge Computing</h4>
                        <p>MQTT, WebSockets, and NTCIP hardware protocol integration.</p>
                    </div>
                    <div class="slide-item">
                        <div class="icon">🚗</div>
                        <h4>27. V2X Support</h4>
                        <p>Connected vehicle telemetry communication directly with signals.</p>
                    </div>
                </div>
            </div>

            <!-- PART 9: CLOUD, BACKEND, & FRONTEND -->
            <div class="presentation-slide" style="border-top-color: var(--accent-blue);">
                <div class="slide-header" style="color: var(--accent-blue);">Part 9: Cloud, Backend, & Frontend Command Center</div>
                <div class="slide-grid" style="grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 15px;">
                    <div class="slide-item"><h4>18. Cloud Platform</h4><p>Microsoft Azure & Kubernetes (AKS) high-availability clustering.</p></div>
                    <div class="slide-item"><h4>19. Backend Services</h4><p>Asynchronous APIs processing thousands of requests per second.</p></div>
                    <div class="slide-item"><h4>20. Frontend UI</h4><p>React & Tailwind CSS 3D command dashboard for operators.</p></div>
                    <div class="slide-item"><h4>21. Data & Storage</h4><p>PostgreSQL and Redis high-performance municipal databases.</p></div>
                </div>
            </div>

            <!-- PART 10: OBSERVABILITY, SECURITY, DEVOPS, & MLOPS -->
            <div class="presentation-slide" style="border-top-color: var(--accent-red);">
                <div class="slide-header" style="color: var(--accent-red);">Part 10: Observability, Security, DevOps, & Integration</div>
                <div class="slide-grid" style="grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 15px;">
                    <div class="slide-item"><h4>22. Observability</h4><p>System health monitoring and error logging alerts.</p></div>
                    <div class="slide-item"><h4>23. Security</h4><p>OAuth, JWT, TLS encryption, and Azure Key Vault protection.</p></div>
                    <div class="slide-item"><h4>24. DevOps</h4><p>GitOps, Docker, and zero-downtime CI/CD pipelines.</p></div>
                    <div class="slide-item"><h4>25. AI & MLOps</h4><p>Explainable AI (XAI) confidence scores and safety checks.</p></div>
                    <div class="slide-item" style="grid-column: 1 / -1;"><h4>26. Smart City Integrations</h4><p>Unified municipal hub connecting traffic with utilities, smart lighting, port logistics, and citizen reporting.</p></div>
                </div>
            </div>

            <!-- PART 11: DEPLOYMENT & STRATEGIC SCALING ROADMAP -->
            <div class="presentation-slide" style="border-top-color: var(--accent-purple);">
                <div class="slide-header" style="color: var(--primary-color);">Part 11: Deployment & Strategic Scaling Roadmap</div>
                <p style="text-align: center; color: var(--text-light); font-size: 1.05rem; line-height: 1.7; margin-bottom: 25px;">
                    With the codebase fully engineered, tested, and documented for both technical and non-technical stakeholders, the next logical milestone for <strong>movisabio-enterprise-smart-city</strong> is transitioning from a monorepo architecture into a live municipal pilot program.
                </p>
                <div class="slide-grid" style="grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px;">
                    <div class="slide-item">
                        <div class="icon" style="font-size: 2rem;">🗺️</div>
                        <h4>Phase 1: Pilot Corridor</h4>
                        <p><strong>Objective:</strong> Select a controlled urban corridor of 5 to 10 interconnected intersections.<br><br><strong>Actions:</strong> Deploy Edge AI hardware boxes with camera feeds, connect loop sensors, and establish secure VPN tunnels to AKS.</p>
                    </div>
                    <div class="slide-item">
                        <div class="icon" style="font-size: 2rem;">📊</div>
                        <h4>Phase 2: Baseline Calibration</h4>
                        <p><strong>Objective:</strong> Establish baseline traffic performance metrics before active AI control.<br><br><strong>Actions:</strong> Run in "shadow mode" for two weeks. AI observes traffic flows and queues without modifying lights to fine-tune Deep Reinforcement Learning models.</p>
                    </div>
                    <div class="slide-item">
                        <div class="icon" style="font-size: 2rem;">🚦</div>
                        <h4>Phase 3: Active Control</h4>
                        <p><strong>Objective:</strong> Go live with dynamic signal timing and emergency green-wave corridors.<br><br><strong>Actions:</strong> Activate ATSC engine during off-peak hours first, expanding to full 24/7 autonomous coordination. Integrate emergency station dispatch feeds.</p>
                    </div>
                    <div class="slide-item">
                        <div class="icon" style="font-size: 2rem;">🏛️</div>
                        <h4>Phase 4: City Hall Dashboard</h4>
                        <p><strong>Objective:</strong> Unveil the 3D Digital Twin Command Center at City Hall and open citizen channels.<br><br><strong>Actions:</strong> Train operators and dispatchers on the React command center. Launch the citizen mobile portal for reporting hazards and streetlights.</p>
                    </div>
                </div>
            </div>

            <!-- PART 12: STAKEHOLDER & INVESTOR PRESENTATION DECK -->
            <div class="presentation-slide" style="border-top-color: var(--accent-yellow);">
                <div class="slide-header" style="color: var(--primary-color);">Part 12: Stakeholder & Investor Presentation Deck</div>
                <p style="text-align: center; color: var(--text-light); font-size: 1.05rem; line-height: 1.7; margin-bottom: 25px;">
                    This executive presentation outline and pitch summary is designed for city officials, municipal stakeholders, and investors to clearly communicate the value, architecture, and operational impact of <strong>movisabio-enterprise-smart-city</strong>.
                </p>
                <div class="slide-grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
                    <div class="slide-item">
                        <div class="icon" style="font-size: 2rem;">🚀</div>
                        <h4> 1 --> Title & Vision</h4>
                        <p><strong>Transforming Urban Mobility with AI:</strong> Introducing movisabio-enterprise-smart-city as the intelligent neural backbone for modern cities, shifting from reactive management to proactive ecosystems.</p>
                    </div>
                    <div class="slide-item">
                        <div class="icon" style="font-size: 2rem;">💸</div>
                        <h4> 2 --> The Urban Dilemma</h4>
                        <p><strong>The Cost of Gridlock:</strong> Billions lost in wasted fuel, heightened carbon footprints ($CO_2$, $PM_{2.5}$), emergency delays, and fragmented legacy municipal silos.</p>
                    </div>
                    <div class="slide-item">
                        <div class="icon" style="font-size: 2rem;">🧠</div>
                        <h4>3 --> Solution Overview</h4>
                        <p><strong>Meet MoviSabio Enterprise:</strong> An enterprise-grade, cloud-native platform acting as the central nervous system and brain of the city, unifying traffic, vision, and utilities.</p>
                    </div>
                    <div class="slide-item">
                        <div class="icon" style="font-size: 2rem;">☁️</div>
                        <h4>4 --> Enterprise Architecture</h4>
                        <p><strong>Built for Scale & Reliability:</strong> Powered by Microsoft Azure AKS, PostgreSQL/PostGIS spatial repository, Redis caching, and secure MQTT/WebSocket edge IoT nodes.</p>
                    </div>
                    <div class="slide-item">
                        <div class="icon" style="font-size: 2rem;">🚦</div>
                        <h4>5 --> Core Adaptive Control</h4>
                        <p><strong>Traffic That Thinks:</strong> Features dynamic green splits, green-wave corridor coordination, and deep reinforcement learning trained via digital twin simulations.</p>
                    </div>
                    <div class="slide-item">
                        <div class="icon" style="font-size: 2rem;">🚑</div>
                        <h4>6 --> Life Safety & Incidents</h4>
                        <p><strong>Saving Lives:</strong> Automated emergency green corridors for first responders and computer vision incident detection for immediate hazard alerting.</p>
                    </div>
                    <div class="slide-item">
                        <div class="icon" style="font-size: 2rem;">🌱</div>
                        <h4>7 --> Sustainability & Weather</h4>
                        <p><strong>Eco-Resilient Infrastructure:</strong> Real-time emissions tracking (CO2, PM2.5) and weather-aware speed limit and signal adjustments during rain or snow.</p>
                    </div>
                    <div class="slide-item">
                        <div class="icon" style="font-size: 2rem;">🖥️</div>
                        <h4>8 --> City Hall Command Center</h4>
                        <p><strong>3D Digital Twin Dashboard:</strong> Interactive React-based situational awareness platform enabling unified monitoring and virtual "what-if" scenario simulations.</p>
                    </div>
                    <div class="slide-item">
                        <div class="icon" style="font-size: 2rem;">📈</div>
                        <h4>9 --> Measurable ROI</h4>
                        <p><strong>Tangible Impact:</strong> Up to 25% reduction in travel times, 30% faster emergency response, lower carbon emissions, and data-driven planning via Explainable AI.</p>
                    </div>
                    <div class="slide-item">
                        <div class="icon" style="font-size: 2rem;">🗺️</div>
                        <h4>10 --> Implementation Roadmap</h4>
                        <p><strong>Phased Rollout:</strong> Sandbox corridor selection, shadow mode baseline calibration, active go-live with emergency preemption, and full city-wide expansion.</p>
                    </div>
                    <div class="slide-item" style="grid-column: 1 / -1;">
                        <div class="icon" style="font-size: 2rem;">🎯</div>
                        <h4> 11 --> Conclusion & Call to Action</h4>
                        <p><strong>Shaping the Future:</strong> Transforming the vision of a sustainable, efficient metropolis into a deployed reality. Partner with us to pilot movisabio-enterprise-smart-city today.</p>
                    </div>
                </div>
            </div>
        `
    },
            
            {
                id: 0,
                title: "Territorial Intelligence & Quantum Platform",
                badge: "Core Ecosystem",
                badgeColor: "var(--white)",
                badgeBg: "linear-gradient(135deg, var(--primary-color), var(--accent-blue))",
                borderColor: "var(--accent-blue)",
                shortDesc: "Our cloud-native platform consolidating IoT, AI, electric mobility, and quantum computing to solve complex rural and urban territorial challenges.",
                subtitle: "Transforming fragmented data into predictive and actionable strategic intelligence.",
                longDesc: `
                    <h2 class="detail-heading">Platform Architecture: AI & Quantum-Ready Ecosystem</h2>
                    
                    <div class="presentation-slide" style="border-top-color: var(--accent-blue);">
                        <div class="slide-header" style="color: var(--accent-blue);">The Role of Quantum Computing</div>
                        <p style="text-align: center; margin-bottom: 30px; color: var(--text-light); font-size: 1.1rem;">Rather than serving as a standalone feature, quantum technologies are woven into our technological identity to solve computationally intensive territorial optimization problems.</p>
                        
                        <div class="slide-grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));">
                            <div class="slide-item" style="border-left: 4px solid var(--accent-blue);">
                                <div class="icon">☁️</div>
                                <h4>1. Hybrid Classical-Quantum Phase</h4>
                                <p>Initially, we leverage hybrid algorithms using cloud-based quantum platforms and simulators while continuing to scale our advanced classical AI models.</p>
                            </div>
                            <div class="slide-item" style="border-left: 4px solid var(--accent-yellow);">
                                <div class="icon">⚛️</div>
                                <h4>2. Quantum Machine Learning (QML)</h4>
                                <p>As commercial quantum hardware matures, our cloud-native platform will progressively incorporate QML capabilities for complex simulation and decision-making.</p>
                            </div>
                        </div>
                    </div>

                    <div class="presentation-slide" style="border-top-color: var(--primary-color);">
                        <div class="slide-header" style="color: var(--primary-color);">8 Strategic Future-Ready Applications</div>
                        <p style="text-align: center; margin-bottom: 30px; color: var(--text-light); font-size: 1rem;">Our unified digital ecosystem generates actionable intelligence across eight critical sectors of territorial management:</p>
                        
                        <div class="slide-grid" style="grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));">
                            <div class="slide-item center-text">
                                <div class="icon" style="font-size: 2.2rem;">🚗</div>
                                <h4>Smart Mobility</h4>
                                <p>Traffic flow optimization, intelligent routing, public transit planning, and EV charging optimization.</p>
                            </div>
                            <div class="slide-item center-text">
                                <div class="icon" style="font-size: 2.2rem;">🌱</div>
                                <h4>Environmental Intelligence</h4>
                                <p>Climate risk modeling, pollution forecasting, biodiversity monitoring, and ecosystem simulation.</p>
                            </div>
                            <div class="slide-item center-text">
                                <div class="icon" style="font-size: 2.2rem;">🏗️</div>
                                <h4>Infrastructure Management</h4>
                                <p>Predictive maintenance, digital twins, asset optimization, and resilient infrastructure planning.</p>
                            </div>
                            <div class="slide-item center-text">
                                <div class="icon" style="font-size: 2.2rem;">⚡</div>
                                <h4>Energy Systems</h4>
                                <p>Smart grid optimization, renewable energy integration, and real-time demand forecasting.</p>
                            </div>
                            <div class="slide-item center-text">
                                <div class="icon" style="font-size: 2.2rem;">🚜</div>
                                <h4>Agriculture</h4>
                                <p>Precision farming, irrigation optimization, crop prediction, and sustainable resource management.</p>
                            </div>
                            <div class="slide-item center-text">
                                <div class="icon" style="font-size: 2.2rem;">🏥</div>
                                <h4>Healthcare</h4>
                                <p>Intelligent resource allocation, epidemiological modeling, and territorial healthcare logistics.</p>
                            </div>
                            <div class="slide-item center-text">
                                <div class="icon" style="font-size: 2.2rem;">🏛️</div>
                                <h4>Public Administration</h4>
                                <p>Policy simulation, evidence-based urban planning, emergency management, and data-driven governance.</p>
                            </div>
                            <div class="slide-item center-text">
                                <div class="icon" style="font-size: 2.2rem;">📊</div>
                                <h4>ESG & Financial Analytics</h4>
                                <p>Investment prioritization, sustainability metrics tracking, risk analysis, and long-term impact assessment.</p>
                            </div>
                        </div>
                    </div>

                    <div class="presentation-slide" style="border-top-color: var(--accent-green);">
                        <div class="slide-header" style="color: var(--accent-green);">Core Economic & Social Value Creation</div>
                        <div class="flow-container">
                            <div class="flow-step" style="border-color: var(--accent-blue);"><h4>Operational Efficiency</h4><p style="font-size: 0.85rem;">Transforming fragmented data into unified workflows.</p></div>
                            <div class="flow-arrow">➔</div>
                            <div class="flow-step" style="border-color: var(--accent-green);"><h4>Cost Reduction</h4><p style="font-size: 0.85rem;">Lowering municipal infrastructure and maintenance costs.</p></div>
                            <div class="flow-arrow">➔</div>
                            <div class="flow-step" style="border-color: var(--accent-yellow);"><h4>ESG Performance</h4><p style="font-size: 0.85rem;">Accelerating measurable sustainability outcomes.</p></div>
                        </div>
                    </div>
                `
            },
            {
                id: 1,
                title: "AI Traffic Signal Coordination",
                badge: "Flagship Product",
                badgeColor: "var(--accent-green)",
                badgeBg: "rgba(46, 182, 125, 0.1)",
                borderColor: "var(--accent-green)",
                shortDesc: "A software-only platform utilizing Reinforcement Learning to dynamically adjust traffic signals. Reduces urban congestion by up to 45%.",
                subtitle: "Zero-cost deployment MVP leveraging cloud-free and open-source foundations.",
                longDesc: `
                    <h2 class="detail-heading">Presentation Highlights: Shaping Urban Mobility</h2>
                    
                    <div class="presentation-slide" style="border-top-color: var(--accent-red);">
                        <div class="slide-header" style="color: var(--accent-red);">Urban Congestion: A Global Challenge</div>
                        <div class="slide-grid three-col">
                            <div class="slide-item center-text"><div class="icon">💰</div><h4>Affordability Barrier</h4><p>Mid-sized cities frequently lack access to affordable, cutting-edge traffic optimisation tools, hindering their progress.</p></div>
                            <div class="slide-item center-text"><div class="icon">🚗</div><h4>Significant Congestion</h4><p>Inefficient traffic signal timing is a major contributor to urban congestion, accounting for 30-40% of all delays.</p></div>
                            <div class="slide-item center-text"><div class="icon">🚦</div><h4>Outdated Infrastructure</h4><p>Existing systems are often hardware-heavy, expensive, and lack the scalability required for modern urban demands.</p></div>
                        </div>
                    </div>

                    <div class="presentation-slide" style="border-top-color: var(--primary-color);">
                        <div class="slide-header" style="color: var(--primary-color);">Our Core Innovation: Hierarchical Hybrid Framework</div>
                        <p style="text-align: center; margin-bottom: 30px; color: var(--text-light); font-size: 1.1rem; max-width: 800px; margin-left: auto; margin-right: auto;">Combining classical traffic engineering with modern artificial intelligence to create a system that is both immediately deployable and highly adaptive.</p>
                        <div class="slide-grid" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));">
                            <div class="slide-item" style="border-left: 4px solid var(--text-light);">
                                <h4>1. Classical Foundation (MAXBAND)</h4>
                                <p>We use established traffic engineering principles to set baseline 'green waves' and strict safety constraints. This ensures the system acts predictably and is safe for municipal regulators from day one.</p>
                            </div>
                            <div class="slide-item" style="border-left: 4px solid var(--accent-yellow);">
                                <h4>2. AI Adaptation (Deep RL)</h4>
                                <p>Multi-agent Deep Q-Networks (DQN) continuously tweak the timing phases in real-time within those safety boundaries, reacting to live traffic anomalies that classical systems cannot handle.</p>
                            </div>
                        </div>
                    </div>

                    <div class="presentation-slide" style="border-top-color: var(--accent-blue);">
                        <div class="slide-header" style="color: var(--accent-blue);">Technical Implementation: Data at the Core</div>
                        <div class="flow-container">
                            <div class="flow-step"><h4>1. Data Acquisition</h4><p style="font-size: 0.9rem;">Sources: Municipal traffic sensors, CCTV feeds. Processed via Python ETL pipelines.</p></div>
                            <div class="flow-arrow">➔</div>
                            <div class="flow-step"><h4>2. AI / ML Models</h4><p style="font-size: 0.9rem;"><strong>Prediction:</strong> LSTM / GRU.<br><strong>Optimisation:</strong> Reinforcement Learning (DQN).</p></div>
                            <div class="flow-arrow">➔</div>
                            <div class="flow-step"><h4>3. Simulation Engine</h4><p style="font-size: 0.9rem;"><strong>SUMO</strong> combined with the TraCI interface to simulate policies before physical deployment.</p></div>
                        </div>
                    </div>
                `
            },
            {
                id: 2,
                title: "Computer Vision Vehicle Detection",
                badge: "Phase 2 Initiative",
                badgeColor: "var(--accent-red)",
                badgeBg: "rgba(224, 30, 90, 0.1)",
                borderColor: "var(--accent-red)",
                shortDesc: "Real-time vehicle counting and classification module using YOLOv8. Designed to feed visual data into core AI algorithms.",
                subtitle: "Advanced edge-computing object detection for urban environments.",
                longDesc: `
                    <h2 class="detail-heading">Presentation Highlights: Edge-AI Vision</h2>
                    
                    <div class="presentation-slide" style="border-top-color: var(--accent-red);">
                        <div class="slide-header" style="color: var(--accent-red);">Leveraging Existing Infrastructure</div>
                        <p style="text-align: center; margin-bottom: 30px; color: var(--text-light); font-size: 1.1rem;">This secondary priority module turns raw video feeds from existing city cameras into structured datasets, removing the need for costly physical sensor upgrades.</p>
                        
                        <div class="slide-grid" style="grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));">
                            <div class="slide-item center-text">
                                <div class="icon">📷</div>
                                <h4>Zero New Hardware</h4>
                                <p>We tap into existing municipal CCTV and traffic cameras via RTSP protocols, eliminating the need for expensive radar or inductive loop installations.</p>
                            </div>
                            <div class="slide-item center-text">
                                <div class="icon">👁️</div>
                                <h4>Advanced Computer Vision</h4>
                                <p>Utilizing state-of-the-art YOLOv8 object detection to accurately count, track, and classify vehicles (cars, buses, trucks, motorcycles) in real-time under varying weather conditions.</p>
                            </div>
                        </div>
                    </div>

                    <div class="presentation-slide" style="border-top-color: var(--accent-blue);">
                        <div class="slide-header" style="color: var(--accent-blue);">The Data Integration Pipeline</div>
                        <div class="flow-container">
                            <div class="flow-step"><h4>1. Video Stream</h4><p style="font-size: 0.9rem;">Capture continuous real-time frames from city intersections.</p></div>
                            <div class="flow-arrow">➔</div>
                            <div class="flow-step"><h4>2. Edge Inference</h4><p style="font-size: 0.9rem;">Run YOLOv8 models locally or on edge nodes to extract vehicle counts and density metrics.</p></div>
                            <div class="flow-arrow">➔</div>
                            <div class="flow-step"><h4>3. AI Signal Engine</h4><p style="font-size: 0.9rem;">Feed structured metrics directly into our core Deep RL optimization platform.</p></div>
                        </div>
                    </div>
                `
            },
            {
                id: 3,
                title: "Smart Public Transit Router",
                badge: "In Concept",
                badgeColor: "var(--accent-blue)",
                badgeBg: "rgba(54, 197, 240, 0.1)",
                borderColor: "var(--accent-blue)",
                shortDesc: "An upcoming API designed to prioritize public transport dynamically at intersections to ensure schedule adherence.",
                subtitle: "Making public transit faster and more reliable than private vehicles.",
                longDesc: `
                    <h2 class="detail-heading">Presentation Highlights: Transit Prioritization</h2>
                    
                    <div class="presentation-slide" style="border-top-color: var(--accent-blue);">
                        <div class="slide-header" style="color: var(--accent-blue);">The Vision: Zero-Delay Public Transit</div>
                        <p style="text-align: center; margin-bottom: 30px; color: var(--text-light); font-size: 1.1rem;">A Phase 3 initiative designed to seamlessly integrate with our core AI platform, providing specific advantages to mass transit vehicles.</p>
                        
                        <div class="slide-grid three-col">
                            <div class="slide-item center-text">
                                <div class="icon">🚌</div>
                                <h4>Dynamic Prioritization</h4>
                                <p>Automatically extend green lights or truncate red lights when a delayed bus approaches a connected intersection.</p>
                            </div>
                            <div class="slide-item center-text">
                                <div class="icon">⏱️</div>
                                <h4>Schedule Adherence</h4>
                                <p>Targeting a massive 20-40% improvement in public transport punctuality, actively encouraging citizens to shift away from private cars.</p>
                            </div>
                            <div class="slide-item center-text">
                                <div class="icon">📡</div>
                                <h4>V2X Foundation</h4>
                                <p>Laying the initial groundwork for Vehicle-to-Everything communication, relying entirely on existing bus GPS telemetry rather than new hardware.</p>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                id: 4,
                title: "Virtual Fencing",
                badge: "AgriTech Solution",
                badgeColor: "var(--accent-yellow)",
                badgeBg: "rgba(236, 178, 46, 0.1)",
                borderColor: "var(--accent-yellow)",
                shortDesc: "A spatial management technology using GPS, cloud computing, and animal behavior conditioning to contain and move livestock without physical barriers.",
                subtitle: "Replacing wire and posts with intelligent digital boundaries.",
                longDesc: `
                    <h2 class="detail-heading">Presentation Highlights: Livestock Management Revolution</h2>
                    
                    <div class="presentation-slide" style="border-top-color: var(--accent-yellow);">
                        <div class="slide-header" style="color: var(--accent-yellow);">Virtual Fencing: The Next Generation of Grazing Management</div>
                        <p style="text-align: center; margin-bottom: 30px; color: var(--text-light); font-size: 1.1rem;">Digital lines drawn on a map replace traditional wire and posts, enabling dynamic grazing management powered by GPS and cloud technology.</p>
                        
                        <div class="slide-grid three-col">
                            <div class="slide-item center-text">
                                <div class="icon">📡</div>
                                <h4>The Wearable Device</h4>
                                <p>Solar-powered collar or ear tag with GPS module, cellular/satellite radio, and battery for continuous monitoring and control.</p>
                            </div>
                            <div class="slide-item center-text">
                                <div class="icon">📱</div>
                                <h4>Software Interface</h4>
                                <p>Mobile or web app where managers draw virtual paddocks and exclusion zones directly on a map with real-time updates.</p>
                            </div>
                            <div class="slide-item center-text">
                                <div class="icon">☁️</div>
                                <h4>Cloud Server</h4>
                                <p>Coordinates communication between the app and collars, processing location data and sending boundary updates seamlessly.</p>
                            </div>
                        </div>
                    </div>

                    <div class="presentation-slide" style="border-top-color: var(--accent-green);">
                        <div class="slide-header" style="color: var(--accent-green);">How It Works: Negative Reinforcement Learning</div>
                        <p style="text-align: center; margin-bottom: 30px; color: var(--text-light); font-size: 1rem;">Animals learn a predictable sequence of events when approaching digital boundaries, resulting in rapid behavioral adaptation.</p>
                        <div class="slide-grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));">
                            <div class="slide-item" style="border-left: 4px solid var(--accent-blue);">
                                <div class="icon" style="font-size: 2rem;">⚠️</div>
                                <h4>Warning Zone</h4>
                                <p>As the animal approaches the digital line, the collar emits a distinct high-pitched audio cue to alert the animal.</p>
                            </div>
                            <div class="slide-item" style="border-left: 4px solid var(--accent-red);">
                                <div class="icon" style="font-size: 2rem;">⚡</div>
                                <h4>Correction Zone</h4>
                                <p>If the animal continues forward, it receives a mild electric pulse—significantly lower energy than standard fencing but sufficiently uncomfortable.</p>
                            </div>
                            <div class="slide-item" style="border-left: 4px solid var(--accent-green);">
                                <div class="icon" style="font-size: 2rem;">✓</div>
                                <h4>Learning & Adaptation</h4>
                                <p>Most animals learn to turn back upon hearing the beep alone within days, often avoiding the pulse entirely after initial training.</p>
                            </div>
                        </div>
                    </div>

                    <div class="presentation-slide" style="border-top-color: var(--accent-green);">
                        <div class="slide-header" style="color: var(--accent-green);">Major Advantages</div>
                        <div class="slide-grid" style="grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));">
                            <div class="slide-item center-text">
                                <div class="icon">🚜</div>
                                <h4>Dynamic Grazing</h4>
                                <p>Move herds daily to fresh grass from your phone, preventing overgrazing and dramatically improving soil health and productivity.</p>
                            </div>
                            <div class="slide-item center-text">
                                <div class="icon">⏰</div>
                                <h4>Labor Savings</h4>
                                <p>Eliminate the physical labor of driving posts, stringing wire, and walking fences to find breaks. Passive management from anywhere.</p>
                            </div>
                            <div class="slide-item center-text">
                                <div class="icon">🌿</div>
                                <h4>Environmental Protection</h4>
                                <p>Easily exclude cattle from waterways and reforestation areas without expensive permanent fencing in difficult terrain.</p>
                            </div>
                            <div class="slide-item center-text">
                                <div class="icon">📊</div>
                                <h4>Data Insights</h4>
                                <p>Collars track rumination times and activity levels, alerting you to sick animals or heat cycles for proactive herd health management.</p>
                            </div>
                        </div>
                    </div>

                    <div class="presentation-slide" style="border-top-color: var(--accent-red);">
                        <div class="slide-header" style="color: var(--accent-red);">Challenges & Limitations</div>
                        <div class="slide-grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));">
                            <div class="slide-item" style="border-left: 4px solid var(--accent-red);">
                                <h4>Signal Reliability</h4>
                                <p>GPS requires clear sky visibility. Heavily forested or deep canyon areas can cause "GPS drift," creating false boundary violations.</p>
                            </div>
                            <div class="slide-item" style="border-left: 4px solid var(--accent-red);">
                                <h4>Upfront Cost</h4>
                                <p>Wearable collars range from $50 to $300+ per unit. While maintenance is low, initial investment can be significant for large herds.</p>
                            </div>
                            <div class="slide-item" style="border-left: 4px solid var(--accent-red);">
                                <h4>Battery & Durability</h4>
                                <p>Though solar-powered, devices may struggle in dark winters or if covered in thick mud, requiring occasional manual charging or cleaning.</p>
                            </div>
                            <div class="slide-item" style="border-left: 4px solid var(--accent-red);">
                                <h4>Animal Welfare</h4>
                                <p>Strict training protocols required to ensure animals understand the collar's "language" and avoid unnecessary stress or behavioral issues.</p>
                            </div>
                        </div>
                    </div>

                    <div class="presentation-slide" style="border-top-color: var(--primary-color);">
                        <div class="slide-header" style="color: var(--primary-color);">Hardware Architecture</div>
                        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                            <tr style="background: linear-gradient(135deg, var(--primary-color), #6a1b72); color: var(--white);">
                                <td style="padding: 15px; border: 1px solid #ddd; font-weight: bold;">Component</td>
                                <td style="padding: 15px; border: 1px solid #ddd; font-weight: bold;">Primary Function</td>
                            </tr>
                            <tr style="background: var(--white);">
                                <td style="padding: 12px; border: 1px solid #ddd;">GPS Antenna</td>
                                <td style="padding: 12px; border: 1px solid #ddd;">Determines real-time coordinates (Lat/Long) for boundary monitoring</td>
                            </tr>
                            <tr style="background: rgba(236, 178, 46, 0.05);">
                                <td style="padding: 12px; border: 1px solid #ddd;">Solar Panels</td>
                                <td style="padding: 12px; border: 1px solid #ddd;">Maintains battery charge for continuous 24/7 operation in field</td>
                            </tr>
                            <tr style="background: var(--white);">
                                <td style="padding: 12px; border: 1px solid #ddd;">Accelerometer</td>
                                <td style="padding: 12px; border: 1px solid #ddd;">Tracks movement patterns (grazing, walking, lying down) for health insights</td>
                            </tr>
                            <tr style="background: rgba(236, 178, 46, 0.05);">
                                <td style="padding: 12px; border: 1px solid #ddd;">Connectivity Module</td>
                                <td style="padding: 12px; border: 1px solid #ddd;">Uses LoRaWAN, 4G/5G, or Satellite to sync with cloud app in real-time</td>
                            </tr>
                        </table>
                    </div>
                `
            },
            {
                id: 101,
                title: "Category Creation: Territorial Intelligence Platform (TIP)",
                badge: "Investor Thesis",
                badgeColor: "var(--white)",
                badgeBg: "linear-gradient(135deg, var(--accent-red), var(--primary-color))",
                borderColor: "var(--accent-red)",
                shortDesc: "Why MoviSabio does not compete directly with legacy GIS or analytics vendors, creating an entirely new software category.",
                subtitle: "Integrating GIS, AI, IoT, Mobility, and ESG into a unified SaaS ecosystem.",
                longDesc: `
                    <h2 class="detail-heading">Strategic Competitive Analysis & Category Creation</h2>
                    
                    <div class="presentation-slide" style="border-top-color: var(--accent-red);">
                        <div class="slide-header" style="color: var(--accent-red);">The Convergence of 5 Growing Markets</div>
                        <p style="text-align: center; margin-bottom: 30px; color: var(--text-light); font-size: 1.1rem;">Most existing competitors specialize in only a single layer of territorial management. MoviSabio operates at the convergence of Smart Cities, IoT, GIS, Digital Twins, and Territorial AI.</p>
                        
                        <div class="slide-grid" style="grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));">
                            <div class="slide-item" style="border-left: 4px solid var(--accent-blue);">
                                <h4>vs. Esri (ArcGIS)</h4>
                                <p>While Esri dominates traditional GIS mapping, they were not natively designed for real-time IoT mobility, smart agriculture, or integrated ESG analytics. We complement GIS by adding an AI-powered territorial layer.</p>
                            </div>
                            <div class="slide-item" style="border-left: 4px solid var(--accent-yellow);">
                                <h4>vs. Palantir</h4>
                                <p>Palantir provides powerful decision intelligence but involves multi-million-euro deployments inaccessible to medium municipalities. We act as an accessible, SaaS-based territorial intelligence layer for Latin America and Europe.</p>
                            </div>
                            <div class="slide-item" style="border-left: 4px solid var(--accent-green);">
                                <h4>vs. Bentley & Siemens</h4>
                                <p>Legacy industrial giants focus heavily on custom, expensive heavy-infrastructure digital twins. We deliver agility, lower total cost of ownership, and SaaS accessibility extending into agriculture and biodiversity.</p>
                            </div>
                        </div>
                    </div>

                    <div class="presentation-slide" style="border-top-color: var(--primary-color);">
                        <div class="slide-header" style="color: var(--primary-color);">3-Stage Estimated Funding Roadmap</div>
                        <p style="text-align: center; margin-bottom: 30px; color: var(--text-light); font-size: 1rem;">Our capital strategy balances non-dilutive research grants with equity scaling to achieve a €400M–€750M valuation by Year 10:</p>
                        
                        <div class="slide-grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));">
                            <div class="slide-item center-text" style="border-top: 4px solid var(--accent-blue);">
                                <h4>Stage 1: Validation (2026–2028)</h4>
                                <p style="font-size: 1.2rem; font-weight: bold; color: var(--accent-blue); margin: 10px 0;">€750k – €1.2 Million</p>
                                <p style="font-size: 0.85rem;">Secure non-dilutive grants (EIC, Horizon Europe, EIT Urban Mobility) to build the MVP and execute anchor pilots in Germany and Uruguay.</p>
                            </div>
                            <div class="slide-item center-text" style="border-top: 4px solid var(--accent-green);">
                                <h4>Stage 2: Commercialization (2028–2030)</h4>
                                <p style="font-size: 1.2rem; font-weight: bold; color: var(--accent-green); margin: 10px 0;">€2 – €3 Million (Seed)</p>
                                <p style="font-size: 0.85rem;">Scale commercial operations across Brazil, strengthen AI/Digital Twin capabilities, and grow recurring SaaS revenue to ~€1.2M ARR.</p>
                            </div>
                            <div class="slide-item center-text" style="border-top: 4px solid var(--accent-yellow);">
                                <h4>Stage 3: International Scale (2030+)</h4>
                                <p style="font-size: 1.2rem; font-weight: bold; color: var(--accent-yellow); margin: 10px 0;">€5 – €10 Million (Series A)</p>
                                <p style="font-size: 0.85rem;">Expand across Europe and Latin America, establishing MoviSabio as the leading Territorial Intelligence Operating System (TIOS).</p>
                            </div>
                        </div>
                    </div>
                `
            }
        ];

        // --- 3. PRESERVED VIDEO DATABASE ---
        
            {
                id: 1,
                title: "AI Traffic Signal Demo - Campinas",
                date: "March 2026",
                youtubeId: "4Gexo2-tHFs",
                localVideo: "AI Traffic Signal.mp4",
                description: "Watch our AI-powered traffic signal system in action at Campinas, Brazil. The system reduces intersection wait times by up to 45% using deep reinforcement learning while maintaining safety constraints."
            },
            {
                id: 2,
                title: "Digital Twin Technology Explanation",
                date: "February 2026",
                youtubeId: "",
                description: "Learn how MoviSabio builds highly accurate digital twins using OpenStreetMap data and municipal sensors to predict traffic flow patterns and optimize signal timing in real-time."
            },
            {
                id: 3,
                title: "Montevideo Pilot Benchmark",
                date: "January 2026",
                youtubeId: "",
                description: "Highlights from our Montevideo, Uruguay digital twin benchmark. See how our team modeled municipal corridors in SUMO for bus transit signal priority."
            },
            {
                id: 4,
                title: "Computer Vision Vehicle Detection",
                date: "December 2025",
                youtubeId: "",
                description: "Showcase of our YOLOv8-based vehicle detection system processing real-time CCTV feeds for automated density tracking."
            },
            {
                id: 5,
                title: "Sustainability & ESG Impact",
                date: "November 2025",
                youtubeId: "",
                description: "Discover how MoviSabio's solutions contribute to UN Sustainable Development Goals 11 and 13 through reduced idle times."
            },
            {
                id: 6,
                title: "Executive Leadership Introduction",
                date: "October 2025",
                youtubeId: "",
                description: "Meet the engineering leadership behind MoviSabio and our vision for intelligent territorial infrastructure."
            }
        ];

        // --- 4. PRESERVED TERRITORIAL MAP DATA ---
        const territoryData = [
            {
                id: 'campinas',
                region: 'latam',
                city: 'Campinas',
                country: 'Brazil 🇧🇷',
                coords: [-22.9099, -47.0626],
                status: 'Pilot Proposal (Corridor A)',
                badgeBg: 'var(--accent-success)',
                badgeColor: '#07111F',
                title: 'Flagship AI Traffic Signal Pilot Proposal',
                description: 'Deploying multi-agent Deep Q-Networks (DQN) with MAXBAND safety bounds across 10 interconnected signalized intersections. Dynamic signal timing and emergency vehicle green-wave preemption.',
                metrics: [
                    { label: 'Corridors', value: '10 Intersections' },
                    { label: 'Delay Target', value: 'Up to 45%' },
                    { label: 'CO₂ Goal', value: 'Target 15–30%' },
                    { label: 'Architecture', value: 'MAXBAND + Deep RL' }
                ],
                icon: '🚦',
                color: '#78DFB0'
            },
            {
                id: 'montevideo',
                region: 'latam',
                city: 'Montevideo',
                country: 'Uruguay 🇺🇾',
                coords: [-34.9011, -56.1645],
                status: 'Digital Twin Benchmark',
                badgeBg: 'var(--accent-primary)',
                badgeColor: '#07111F',
                title: 'OpenStreetMap Digital Twin & Sensor Mesh',
                description: 'Leveraging OpenStreetMap topology and municipal loop sensors to construct high-fidelity digital twin corridors in SUMO for predictive forecasting and public transit signal priority.',
                metrics: [
                    { label: 'Network Data', value: 'OpenStreetMap' },
                    { label: 'Simulator', value: 'SUMO & TraCI' },
                    { label: 'Focus', value: 'Bus Signal Priority' },
                    { label: 'Telemetry', value: 'CCTV + Loop Mesh' }
                ],
                icon: '🌐',
                color: '#55D7E8'
            },
            {
                id: 'germany',
                region: 'europe',
                city: 'Munich & Berlin',
                country: 'Germany 🇩🇪',
                coords: [48.1351, 11.5820],
                status: 'Grant Pipeline Target',
                badgeBg: 'var(--accent-warning)',
                badgeColor: '#07111F',
                title: 'EU Grant & Horizon Europe Pipeline',
                description: 'Strategic European expansion corridor targeting EIT Urban Mobility and Horizon Europe non-dilutive climate tech grants for urban digital twin deployments.',
                metrics: [
                    { label: 'Pipeline', value: 'Horizon Europe' },
                    { label: 'Target Phase', value: '2026–2028' },
                    { label: 'Ecosystem', value: 'EIT Urban Mobility' },
                    { label: 'Scope', value: 'Anchor Pilot MVP' }
                ],
                icon: '🇩🇪',
                color: '#F5B842'
            },
            {
                id: 'italy',
                region: 'europe',
                city: 'Milan',
                country: 'Italy 🇮🇹',
                coords: [45.4642, 9.1900],
                status: 'Expansion Corridor',
                badgeBg: 'var(--accent-secondary)',
                badgeColor: '#07111F',
                title: 'Territorial SaaS & Low-Emission Zone Analytics',
                description: 'Evaluating urban Low-Emission Zone (LEZ) monitoring, multi-sensor air quality telemetry, and cross-border decision infrastructure for municipal climate compliance.',
                metrics: [
                    { label: 'Platform Layer', value: 'Territorial SaaS' },
                    { label: 'Urban Focus', value: 'LEZ & Air Quality' },
                    { label: 'ESG Standard', value: 'UN SDGs 11 & 13' },
                    { label: 'Architecture', value: 'Edge Telemetry' }
                ],
                icon: '🇮🇹',
                color: '#6C9CFF'
            }
        ];

        // --- 5. RENDER SOLUTIONS CATALOG ---
        function renderSolutions() {
            const grid = document.getElementById('dynamic-project-grid');
            if (!grid) return;
            grid.innerHTML = '';

            const badgeStyles = {
                'Enterprise Platform': { bg: 'rgba(85, 215, 232, 0.15)', text: 'var(--accent-primary)', border: 'rgba(85, 215, 232, 0.4)' },
                'Core Ecosystem': { bg: 'rgba(108, 156, 255, 0.15)', text: 'var(--accent-secondary)', border: 'rgba(108, 156, 255, 0.4)' },
                'Flagship Product': { bg: 'rgba(120, 223, 176, 0.15)', text: 'var(--accent-success)', border: 'rgba(120, 223, 176, 0.4)' },
                'Phase 2 Initiative': { bg: 'rgba(224, 30, 90, 0.15)', text: 'var(--accent-danger)', border: 'rgba(224, 30, 90, 0.4)' },
                'In Concept': { bg: 'rgba(54, 197, 240, 0.15)', text: '#36C5F0', border: 'rgba(54, 197, 240, 0.4)' },
                'AgriTech Solution': { bg: 'rgba(245, 184, 66, 0.15)', text: 'var(--accent-warning)', border: 'rgba(245, 184, 66, 0.4)' },
                'Investor Thesis': { bg: 'linear-gradient(135deg, rgba(224, 30, 90, 0.2), rgba(108, 156, 255, 0.2))', text: '#FF94B4', border: 'rgba(224, 30, 90, 0.4)' }
            };

            const icons = {
                5: '🏙️',
                0: '⚛️',
                1: '🚦',
                2: '👁️',
                3: '🚌',
                4: '🌾',
                101: '📊'
            };

            techSolutions.forEach(project => {
                const card = document.createElement('div');
                card.className = 'card-enterprise';
                card.onclick = () => openProject(project.id);
                card.setAttribute('tabindex', '0');
                card.setAttribute('role', 'button');
                card.setAttribute('aria-label', `View details for ${project.title}`);
                card.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openProject(project.id); } };
                card.style.cursor = 'pointer';

                const style = badgeStyles[project.badge] || { bg: 'rgba(255, 255, 255, 0.08)', text: 'var(--text-primary)', border: 'var(--border-subtle)' };
                const icon = icons[project.id] || '💡';

                card.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-md);">
                        <span class="status-pill" style="background: ${style.bg}; color: ${style.text}; border: 1px solid ${style.border}; font-weight: 700;">
                            <span class="status-dot" style="background: ${style.text};"></span> ${project.badge}
                        </span>
                        <span style="font-size: 1.4rem;">${icon}</span>
                    </div>
                    <h3 class="card-title" style="margin-bottom: var(--space-sm);">${project.title}</h3>
                    <p class="card-desc" style="margin-bottom: var(--space-lg); line-height: 1.6; color: var(--text-secondary);">${project.shortDesc}</p>
                    <div style="margin-top: auto; padding-top: var(--space-md); border-top: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between;">
                        <span style="font-size: var(--font-size-xs); color: var(--accent-primary); font-weight: var(--font-weight-bold); display: inline-flex; align-items: center; gap: 4px;">
                            View Details →
                        </span>
                        <span style="color: var(--text-muted); font-size: 0.8rem;">Architecture & Deck</span>
                    </div>
                `;
                grid.appendChild(card);
            });
        }

        function renderVideos() {
            const grid = document.getElementById('video-grid');
            if (!grid) return;
            grid.innerHTML = '';
            projectVideos.forEach(v => {
                const card = document.createElement('div');
                card.className = 'video-card-enterprise';
                card.onclick = () => openVideoModal(v.id);
                card.setAttribute('tabindex', '0');
                card.setAttribute('role', 'button');
                card.setAttribute('aria-label', `Play video: ${v.title}`);
                card.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openVideoModal(v.id); } };

                card.innerHTML = `
                    <div class="video-thumb-wrap">
                        <div class="video-play-btn">▶</div>
                    </div>
                    <div class="video-card-body">
                        <h4 class="video-card-title">${v.title}</h4>
                        <p class="video-card-desc">${v.description}</p>
                        <div class="video-card-date">📅 ${v.date}</div>
                    </div>
                `;
                grid.appendChild(card);
            });
        }

        // --- 7. LEAFLET MAP LOGIC (CARTODB DARK MATTER) ---
        let territorialMap = null;
        let mapMarkers = [];

        function initTerritorialMap() {
            const mapContainer = document.getElementById('territorial-map');
            if (!mapContainer || territorialMap) return;

            territorialMap = L.map('territorial-map', {
                center: [10.0, -25.0],
                zoom: 3,
                minZoom: 2,
                maxZoom: 18,
                scrollWheelZoom: false
            });

            // Modern CartoDB Dark Matter Raster Tiles for Dark Theme
            L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
                subdomains: 'abcd',
                maxZoom: 19
            }).addTo(territorialMap);

            renderMapMarkers('all');
        }

        function renderMapMarkers(filter) {
            if (!territorialMap) return;

            mapMarkers.forEach(m => territorialMap.removeLayer(m));
            mapMarkers = [];

            const filtered = filter === 'all' 
                ? territoryData 
                : territoryData.filter(t => t.region === filter);

            filtered.forEach(item => {
                const customIcon = L.divIcon({
                    className: 'custom-pin-wrapper',
                    html: `<div class="custom-pin" style="background:${item.color}; width:42px; height:42px; font-size:1.2rem;">${item.icon}</div>`,
                    iconSize: [42, 42],
                    iconAnchor: [21, 21],
                    popupAnchor: [0, -22]
                });

                const metricsHTML = item.metrics.map(m => `
                    <div style="background: rgba(255,255,255,0.03); padding: 8px 10px; border-radius: 6px; border-left: 2px solid ${item.color};">
                        <div style="font-size: 0.68rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">${m.label}</div>
                        <div style="font-size: 0.85rem; color: var(--text-primary); font-weight: bold; margin-top: 2px;">${m.value}</div>
                    </div>
                `).join('');

                const popupHTML = `
                    <div style="min-width: 280px; max-width: 320px; padding: 4px 0;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                            <h4 style="margin: 0; color: var(--text-primary); font-size: 1.15rem; font-weight: 800;">${item.city}</h4>
                            <span style="background: ${item.badgeBg}; color: ${item.badgeColor}; font-size: 0.68rem; font-weight: bold; padding: 3px 8px; border-radius: 12px;">${item.status}</span>
                        </div>
                        <div style="font-size: 0.82rem; font-weight: 700; color: var(--accent-primary); margin-bottom: 8px;">${item.country}</div>
                        <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 12px;">${item.description}</p>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
                            ${metricsHTML}
                        </div>
                    </div>
                `;

                const marker = L.marker(item.coords, { icon: customIcon })
                    .bindPopup(popupHTML)
                    .addTo(territorialMap);

                marker.territoryId = item.id;
                marker.territoryCoords = item.coords;
                mapMarkers.push(marker);
            });

            if (mapMarkers.length > 0) {
                const group = L.featureGroup(mapMarkers);
                territorialMap.fitBounds(group.getBounds().pad(0.3));
            }
        }

        function filterMap(region, btn) {
            document.querySelectorAll('.map-filter-group .map-filter-btn').forEach(b => b.classList.remove('active'));
            if (btn) btn.classList.add('active');
            renderMapMarkers(region);
        }

        function flyToTerritory(lat, lng, zoom) {
            if (!territorialMap) return;
            const mapCard = document.querySelector('.map-card-wrapper');
            if (mapCard) {
                mapCard.scrollIntoView({ behavior: 'smooth' });
            }
            territorialMap.flyTo([lat, lng], zoom || 11, { duration: 1.5 });
            setTimeout(() => {
                const marker = mapMarkers.find(m => m.territoryCoords && Math.abs(m.territoryCoords[0] - lat) < 0.01 && Math.abs(m.territoryCoords[1] - lng) < 0.01);
                if (marker) marker.openPopup();
            }, 1200);
        }

        // --- 8. PROJECT DETAIL NAVIGATION (SPA ROUTING) ---
        function openProject(id) {
            const project = techSolutions.find(p => p.id === id);
            if (!project) return;
            document.getElementById('detail-title').innerText = project.title;
            document.getElementById('detail-subtitle').innerText = project.subtitle;
            document.getElementById('detail-content').innerHTML = project.longDesc;
            document.getElementById('home-view').style.display = 'none';
            document.getElementById('project-view').style.display = 'block';
            window.scrollTo(0, 0);
        }

        function showHome() {
            document.getElementById('project-view').style.display = 'none';
            document.getElementById('home-view').style.display = 'block';
            window.scrollTo(0, 0);
        }

        function scrollToSection(sectionId) {
            const navMenu = document.getElementById('nav-menu');
            if (navMenu && navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
            }
            if (document.getElementById('project-view').style.display === 'block') {
                showHome();
            }
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
                if ((sectionId === 'presence' || sectionId === 'impact') && territorialMap) {
                    setTimeout(() => territorialMap.invalidateSize(), 400);
                }
            }
        }

        function toggleMobileNav() {
            const navMenu = document.getElementById('nav-menu');
            const btn = document.querySelector('.mobile-toggle-btn');
            if (navMenu) {
                const isOpen = navMenu.classList.toggle('open');
                if (btn) btn.setAttribute('aria-expanded', String(isOpen));
            }
        }

        // --- 9. VIDEO MODAL ENGINE ---
        function openVideoModal(videoId) {
            const video = projectVideos.find(v => v.id === videoId);
            if (!video) return;

            document.getElementById('modal-video-title').innerText = video.title;
            document.getElementById('modal-video-description').innerText = video.description;

            const iframe = document.getElementById('modal-video-iframe');
            const localVideo = document.getElementById('modal-local-video');
            const placeholder = document.getElementById('modal-placeholder');
            const switcher = document.getElementById('video-source-switcher');

            iframe.style.display = 'none';
            iframe.src = '';
            localVideo.style.display = 'none';
            localVideo.pause();
            localVideo.src = '';
            placeholder.style.display = 'none';
            switcher.innerHTML = '';

            if (video.localVideo) {
                localVideo.src = encodeURI(video.localVideo);
                localVideo.style.display = 'block';

                if (video.youtubeId) {
                    switcher.style.display = 'flex';
                    switcher.innerHTML = `
                        <button type="button" class="btn btn-outline btn-sm active" onclick="switchVideoSource('local', '${encodeURI(video.localVideo)}', '${video.youtubeId}', this)">📼 Local HD Video</button>
                        <button type="button" class="btn btn-outline btn-sm" onclick="switchVideoSource('youtube', '${encodeURI(video.localVideo)}', '${video.youtubeId}', this)">▶️ YouTube Stream</button>
                    `;
                }
            } else if (video.youtubeId && video.youtubeId.trim() !== '') {
                iframe.src = `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`;
                iframe.style.display = 'block';
            } else {
                placeholder.style.display = 'block';
            }

            document.getElementById('video-modal').classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function switchVideoSource(source, localPath, ytId, btn) {
            const iframe = document.getElementById('modal-video-iframe');
            const localVideo = document.getElementById('modal-local-video');
            const buttons = document.querySelectorAll('#video-source-switcher .btn');
            buttons.forEach(b => b.classList.remove('active'));
            if (btn) btn.classList.add('active');

            if (source === 'local') {
                iframe.style.display = 'none';
                iframe.src = '';
                localVideo.src = localPath;
                localVideo.style.display = 'block';
                localVideo.play().catch(() => {});
            } else {
                localVideo.pause();
                localVideo.style.display = 'none';
                localVideo.src = '';
                iframe.src = `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`;
                iframe.style.display = 'block';
            }
        }

        function closeVideoModal() {
            const iframe = document.getElementById('modal-video-iframe');
            const localVideo = document.getElementById('modal-local-video');
            if (iframe) { iframe.src = ''; iframe.style.display = 'none'; }
            if (localVideo) { localVideo.pause(); localVideo.src = ''; localVideo.style.display = 'none'; }
            document.getElementById('video-modal').classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        // --- 10. LEADERSHIP MODAL ---
        function openLeaderModal(name, position, motto) {
            document.getElementById('modal-leader-name').innerText = name;
            document.getElementById('modal-leader-position').innerText = position;
            document.getElementById('modal-leader-motto').innerText = motto;
            document.getElementById('leader-modal').classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeLeaderModal() {
            document.getElementById('leader-modal').classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        function handleBackdropClick(event, modalId) {
            if (event.target && event.target.id === modalId) {
                if (modalId === 'video-modal') closeVideoModal();
                if (modalId === 'leader-modal') closeLeaderModal();
            }
        }

        // Keyboard ESC handler for modals
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeVideoModal();
                closeLeaderModal();
            }
        });

        // --- 11. INITIALIZATION ON DOM READY ---
        
        // --- PHOTO SLIDER ENGINE (MOVISABIO SMART CITY FLAGSHIP) ---
        let currentSlide = 0;
        const totalSlides = 6;
        let sliderAutoplayTimer = null;
        let isSliderPlaying = true;

        function initSmartCitySlider() {
            const track = document.getElementById('smart-city-slider-track');
            const slider = document.querySelector('.smart-city-slider');
            if (!track || !slider) return;

            updateSliderUI();
            startSliderAutoplay();

            // Hover pause
            slider.addEventListener('mouseenter', pauseSliderAutoplay);
            slider.addEventListener('mouseleave', () => { if (isSliderPlaying) startSliderAutoplay(); });

            // Keyboard navigation when slider is focused
            slider.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') { prevSlide(); }
                else if (e.key === 'ArrowRight') { nextSlide(); }
            });

            // Touch / Swipe support
            let touchStartX = 0;
            let touchEndX = 0;

            slider.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            slider.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, { passive: true });

            function handleSwipe() {
                const diff = touchEndX - touchStartX;
                if (Math.abs(diff) > 40) {
                    if (diff > 0) { prevSlide(); }
                    else { nextSlide(); }
                }
            }
        }

        function updateSliderUI() {
            const track = document.getElementById('smart-city-slider-track');
            const counter = document.getElementById('slider-counter');
            const dots = document.querySelectorAll('.slider-dot');
            if (track) {
                track.style.transform = `translateX(-${currentSlide * 100}%)`;
            }
            if (counter) {
                counter.innerText = `${currentSlide + 1} / ${totalSlides}`;
            }
            dots.forEach((dot, idx) => {
                if (idx === currentSlide) {
                    dot.classList.add('active');
                    dot.setAttribute('aria-current', 'true');
                } else {
                    dot.classList.remove('active');
                    dot.removeAttribute('aria-current');
                }
            });
        }

        function goToSlide(index) {
            currentSlide = (index + totalSlides) % totalSlides;
            updateSliderUI();
        }

        function nextSlide() {
            goToSlide(currentSlide + 1);
        }

        function prevSlide() {
            goToSlide(currentSlide - 1);
        }

        function startSliderAutoplay() {
            stopSliderAutoplay();
            sliderAutoplayTimer = setInterval(() => {
                nextSlide();
            }, 6000);
        }

        function pauseSliderAutoplay() {
            stopSliderAutoplay();
        }

        function stopSliderAutoplay() {
            if (sliderAutoplayTimer) {
                clearInterval(sliderAutoplayTimer);
                sliderAutoplayTimer = null;
            }
        }

        function toggleSliderAutoplay() {
            const btn = document.getElementById('slider-play-pause-btn');
            isSliderPlaying = !isSliderPlaying;
            if (isSliderPlaying) {
                startSliderAutoplay();
                if (btn) btn.innerText = '⏸';
                if (btn) btn.setAttribute('aria-label', 'Pause Autoplay');
            } else {
                stopSliderAutoplay();
                if (btn) btn.innerText = '▶';
                if (btn) btn.setAttribute('aria-label', 'Resume Autoplay');
            }
        }

        window.addEventListener('DOMContentLoaded', () => {
            renderSolutions();
            renderVideos();
            initTerritorialMap();
            initSmartCitySlider();
        });

        window.addEventListener('load', () => {
            if (territorialMap) territorialMap.invalidateSize();
        });
    