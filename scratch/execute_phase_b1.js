const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'index.html');
const rawHtml = fs.readFileSync(htmlPath, 'utf8');

// 1. Navigation Menu with Audiences
const oldNavMenuRegex = /<ul class="nav-menu" id="nav-menu">[\s\S]*?<\/ul>/;
const updatedNavMenu = `<ul class="nav-menu" id="nav-menu">
                    <li><a href="#platform" onclick="scrollToSection('platform')" class="nav-link" data-i18n="nav_platform">Platform</a></li>
                    <li><a href="#smart-city" onclick="scrollToSection('smart-city')" class="nav-link" data-i18n="nav_smart_city">Smart City</a></li>
                    <li><a href="#audiences" onclick="scrollToSection('audiences')" class="nav-link" data-i18n="nav_audiences">Audiences</a></li>
                    <li><a href="#architecture" onclick="scrollToSection('architecture')" class="nav-link" data-i18n="nav_architecture">Technology</a></li>
                    <li><a href="#solutions" onclick="scrollToSection('solutions')" class="nav-link" data-i18n="nav_solutions">Solutions</a></li>
                    
                    <li class="nav-item-dropdown">
                        <button type="button" class="nav-link dropdown-toggle" aria-expanded="false" aria-haspopup="true">
                            <span data-i18n="nav_company">Company</span> <span class="dropdown-caret">▾</span>
                        </button>
                        <ul class="dropdown-menu" role="menu">
                            <li><a href="#about" onclick="scrollToSection('about')" class="dropdown-item" data-i18n="nav_about" role="menuitem">About MoviSabio</a></li>
                            <li><a href="#leadership" onclick="scrollToSection('leadership')" class="dropdown-item" data-i18n="nav_leadership" role="menuitem">Executive Leadership</a></li>
                            <li><a href="#presence" onclick="scrollToSection('presence')" class="dropdown-item" data-i18n="nav_map" role="menuitem">Global Map & Digital Twins</a></li>
                            <li><a href="#research" onclick="scrollToSection('research')" class="dropdown-item" data-i18n="nav_research" role="menuitem">Research & ESG</a></li>
                        </ul>
                    </li>

                    <li class="nav-item-dropdown">
                        <button type="button" class="nav-link dropdown-toggle" aria-expanded="false" aria-haspopup="true">
                            <span data-i18n="nav_investor">Investor</span> <span class="dropdown-caret">▾</span>
                        </button>
                        <ul class="dropdown-menu" role="menu">
                            <li><a href="#economics" onclick="scrollToSection('economics')" class="dropdown-item" data-i18n="nav_economics" role="menuitem">Market Opportunity & Economics</a></li>
                            <li><a href="#submit-idea" onclick="scrollToSection('submit-idea')" class="dropdown-item" data-i18n="sec_submit_idea" role="menuitem">Open Innovation Pitch</a></li>
                            <li><a href="partners.html" class="dropdown-item" data-i18n="nav_submit_idea" role="menuitem" style="color: var(--accent-success); font-weight: 700;">Partners & Pitch Deck</a></li>
                        </ul>
                    </li>
                </ul>`;

let updated = rawHtml.replace(oldNavMenuRegex, updatedNavMenu);

// 2. Hero Section Update
const oldHeroTitleRegex = /<h1 class="section-title"[^>]*data-i18n="hero_title">[\s\S]*?<\/h1>/;
const updatedHeroTitle = `<h1 class="section-title" style="margin-bottom: var(--space-lg); font-size: clamp(2.4rem, 5.5vw, 3.8rem);" data-i18n="hero_title">Intelligence for the Territories of Tomorrow.</h1>`;

const oldHeroSubtitleRegex = /<p class="section-subtitle"[^>]*data-i18n="hero_subtitle">[\s\S]*?<\/p>/;
const updatedHeroSubtitle = `<p class="section-subtitle" style="font-size: var(--font-size-md); max-width: 840px; margin: 0 auto var(--space-2xl);" data-i18n="hero_subtitle">MoviSabio develops AI-powered territorial intelligence ecosystems that connect geospatial data, mobility, IoT and environmental intelligence to help governments, enterprises and communities make smarter, evidence-based decisions.</p>`;

const oldHeroButtonsRegex = /<div style="display: flex; justify-content: center; gap: var\(--space-md\); flex-wrap: wrap; margin-bottom: var\(--space-3xl\);">[\s\S]*?<\/div>/;
const updatedHeroButtons = `<div style="display: flex; justify-content: center; gap: var(--space-md); flex-wrap: wrap; margin-bottom: var(--space-3xl);">
                        <a href="#platform" onclick="scrollToSection('platform')" class="btn btn-primary btn-lg" data-i18n="btn_explore_platform">Explore Our Platform ↓</a>
                        <a href="#smart-city" onclick="scrollToSection('smart-city')" class="btn btn-secondary btn-lg" data-i18n="btn_discover_smart_city">Discover Smart City 🏙️</a>
                        <a href="#contact" onclick="scrollToSection('contact')" class="btn btn-outline btn-lg" data-i18n="btn_partner_movisabio">Partner With MoviSabio →</a>
                    </div>`;

updated = updated.replace(oldHeroTitleRegex, updatedHeroTitle);
updated = updated.replace(oldHeroSubtitleRegex, updatedHeroSubtitle);
updated = updated.replace(oldHeroButtonsRegex, updatedHeroButtons);

// 3. Define the Audience Pathways Section Markup
const audiencePathwaysSection = `            <!-- ================================================================== -->
            <!-- 4. AUDIENCE PATHWAYS (THREE VALUE PROPOSITIONS)                   -->
            <!-- ================================================================== -->
            <section id="audiences" class="section-padding" style="background: var(--bg-secondary); border-top: 1px solid var(--border-subtle); border-bottom: 1px solid var(--border-subtle);">
                <div class="container">
                    <div class="section-header" style="text-align: center; margin-bottom: var(--space-3xl);">
                        <div class="section-tag" data-i18n="sec_audiences_tag">Strategic Pathways • Tailored Value Propositions</div>
                        <h2 class="section-title" data-i18n="sec_audiences_title">One Platform, Three Value Propositions</h2>
                        <p class="section-subtitle" style="margin: 0 auto; max-width: 840px;" data-i18n="sec_audiences_subtitle">
                            Whether you are a municipal policymaker, an enterprise technology leader, or an institutional investor, MoviSabio provides a purpose-built engagement route tailored to your objectives.
                        </p>
                    </div>

                    <div class="grid-3" style="gap: var(--space-xl); align-items: stretch;">
                        
                        <!-- Pathway 1: Government and Municipalities -->
                        <div class="audience-card audience-card-gov">
                            <div class="audience-header">
                                <span class="audience-badge audience-badge-gov" data-i18n="audience_gov_badge">Public-Sector Impact</span>
                                <span style="font-size: 1.6rem;">🏛️</span>
                            </div>
                            <h3 class="audience-title" data-i18n="audience_gov_title">Government & Municipalities</h3>
                            <p class="audience-desc">
                                Empowering public administrators, transportation authorities, and municipal planners with real-time evidence to govern urban congestion, infrastructure stress, and climate targets.
                            </p>
                            <ul class="audience-pillars">
                                <li><span>✓</span> <div><strong>Urban Mobility Optimization:</strong> Adaptive signal control cutting corridor transit delays by up to 45%.</div></li>
                                <li><span>✓</span> <div><strong>Evidence-Based Territorial Planning:</strong> SUMO and CARLA digital twins simulating detours and policies before field rollout.</div></li>
                                <li><span>✓</span> <div><strong>Climate Resilience & ESG Compliance:</strong> Continuous telemetry on intersection idling times targeting 15–30% CO₂ emissions reductions.</div></li>
                                <li><span>✓</span> <div><strong>Municipal Pilot Opportunities:</strong> Rapid 10-corridor validation pilots without costly hardware retrofits.</div></li>
                            </ul>
                            <div class="audience-actions">
                                <a href="#smart-city" onclick="scrollToSection('smart-city')" class="btn btn-primary btn-sm" data-i18n="cta_gov">Explore Municipal Solutions ↓</a>
                                <a href="#contact" onclick="selectInquiry('Municipal Partnership'); scrollToSection('contact')" class="btn btn-outline btn-sm">Request Pilot LOI →</a>
                            </div>
                        </div>

                        <!-- Pathway 2: Enterprise Clients & Technology Partners -->
                        <div class="audience-card audience-card-enterprise">
                            <div class="audience-header">
                                <span class="audience-badge audience-badge-enterprise" data-i18n="audience_enterprise_badge">Technology Partnerships</span>
                                <span style="font-size: 1.6rem;">🏢</span>
                            </div>
                            <h3 class="audience-title" data-i18n="audience_enterprise_title">Enterprise & Technology Partners</h3>
                            <p class="audience-desc">
                                Delivering a scalable, cloud-native spatial operating plane for infrastructure operators, transit fleets, logistics hubs, and hardware sensor integrators.
                            </p>
                            <ul class="audience-pillars">
                                <li><span>✓</span> <div><strong>Enterprise SaaS Architecture:</strong> Cloud-native Kubernetes clustering on Microsoft Azure with 99.9% uptime design.</div></li>
                                <li><span>✓</span> <div><strong>API & Data Stream Integration:</strong> Hardware-agnostic MQTT brokers, NTCIP 1202, RTSP CCTV ingestion, and REST/GraphQL APIs.</div></li>
                                <li><span>✓</span> <div><strong>Digital Twin Command Center:</strong> Microscopic simulation engines integrated with PostGIS spatial models and Redis caches.</div></li>
                                <li><span>✓</span> <div><strong>Implementation Partnerships:</strong> Commercial co-development, hardware certification, and regional distribution alliances.</div></li>
                            </ul>
                            <div class="audience-actions">
                                <a href="#architecture" onclick="scrollToSection('architecture')" class="btn btn-primary btn-sm" data-i18n="cta_enterprise">Discuss Enterprise Solutions →</a>
                                <a href="#solutions" onclick="scrollToSection('solutions')" class="btn btn-outline btn-sm">View Tech Portfolio →</a>
                            </div>
                        </div>

                        <!-- Pathway 3: Investors & Venture Capital -->
                        <div class="audience-card audience-card-investor">
                            <div class="audience-header">
                                <span class="audience-badge audience-badge-investor" data-i18n="audience_investor_badge">Business Opportunity</span>
                                <span style="font-size: 1.6rem;">📈</span>
                            </div>
                            <h3 class="audience-title" data-i18n="audience_investor_title">Investors & Venture Capital</h3>
                            <p class="audience-desc">
                                Pioneering the Territorial Intelligence Platform (TIP) category at the convergence of GIS, AI, IoT, Digital Twins, and ESG with high-margin recurring SaaS economics.
                            </p>
                            <ul class="audience-pillars">
                                <li><span>✓</span> <div><strong>US$ 1.1 Trillion TAM & US$ 25B SAM:</strong> Unlocking massive market potential across Latin America and the European Union.</div></li>
                                <li><span>✓</span> <div><strong>High-Margin Unit Economics:</strong> 81% gross margin B2B SaaS architecture with a projected 48% EBITDA margin at scale.</div></li>
                                <li><span>✓</span> <div><strong>Strategic Moat & Category Creation:</strong> Differentiated from static GIS (Esri) and costly consulting (Palantir) via accessible SaaS.</div></li>
                                <li><span>✓</span> <div><strong>Valuation Roadmap:</strong> 3-stage capital strategy targeting €50.3M ARR and €400M–€750M valuation by Year 10.</div></li>
                            </ul>
                            <div class="audience-actions">
                                <a href="#economics" onclick="scrollToSection('economics')" class="btn btn-primary btn-sm" data-i18n="cta_investors">Investor Relations ↓</a>
                                <a href="partners.html" class="btn btn-outline btn-sm">Pitch Deck & Partners 📄</a>
                            </div>
                        </div>

                    </div>
                </div>
            </section>`;

// 4. Insert Audience Pathways directly after Smart City Section
// Check where </section> of smart-city is
const smartCityClose = '</section>\n\n            <!-- ================================================================== -->\n            <!-- 5. MULTI-LAYER PLATFORM ARCHITECTURE';
const smartCityCloseAlt = '</section>\n\n            <!-- ================================================================== -->\n            <!-- 4. MULTI-LAYER PLATFORM ARCHITECTURE';

// Find smart city section end
const scSectionEnd = updated.indexOf('</section>', updated.indexOf('id="smart-city"'));
if (scSectionEnd === -1) {
  throw new Error('Could not find </section> for smart-city');
}

const beforeArchitecture = updated.indexOf('<!-- ================================================================== -->\n            <!-- 5. MULTI-LAYER PLATFORM ARCHITECTURE', scSectionEnd);
const beforeArchitectureFallback = updated.indexOf('<section id="architecture"', scSectionEnd);

const insertPoint = beforeArchitecture !== -1 ? beforeArchitecture : beforeArchitectureFallback;

updated = updated.substring(0, insertPoint) + audiencePathwaysSection + '\n\n' + updated.substring(insertPoint);

fs.writeFileSync(htmlPath, updated, 'utf8');
console.log('Successfully applied Phase B1 updates to index.html!');
