const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'index.html');
const rawHtml = fs.readFileSync(htmlPath, 'utf8');

// 1. Update Navigation Bar
const navStart = rawHtml.indexOf('<ul class="nav-menu" id="nav-menu">');
const navEnd = rawHtml.indexOf('</ul>\n            </nav>', navStart);

if (navStart === -1 || navEnd === -1) {
  throw new Error('Could not find nav menu');
}

const refinedNavMenu = `<ul class="nav-menu" id="nav-menu">
                    <li><a href="#platform" onclick="scrollToSection('platform')" class="nav-link" data-i18n="nav_platform">Platform</a></li>
                    <li><a href="#smart-city" onclick="scrollToSection('smart-city')" class="nav-link" data-i18n="nav_smart_city">Smart City</a></li>
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

let updatedHtml = rawHtml.substring(0, navStart) + refinedNavMenu + rawHtml.substring(navEnd + '</ul>'.length);

// 2. Identify sections
const sectionMarkers = [
  { id: 'hero', regex: /<!-- =+\s*-->\s*<!--\s*2\.\s*HIGH-IMPACT HERO SECTION\s*-->\s*<!-- =+\s*-->\s*<section id="hero"/ },
  { id: 'platform', regex: /<!-- =+\s*-->\s*<!--\s*3\.\s*TERRITORIAL INTELLIGENCE PLATFORM & SMART CITY SHOWCASE\s*-->\s*<!-- =+\s*-->\s*<section id="platform"/ },
  { id: 'solutions', regex: /<!-- =+\s*-->\s*<!--\s*4\.\s*MODULAR SOLUTIONS CATALOG\s*-->\s*<!-- =+\s*-->\s*<section id="solutions"/ },
  { id: 'architecture', regex: /<!-- =+\s*-->\s*<!--\s*5\.\s*MULTI-LAYER PLATFORM ARCHITECTURE\s*-->\s*<!-- =+\s*-->\s*<section id="architecture"/ },
  { id: 'economics', regex: /<!-- =+\s*-->\s*<!--\s*5\.5\.\s*MARKET OPPORTUNITY & UNIT ECONOMICS[^\n]*-->\s*<!-- =+\s*-->\s*<section id="economics"/ },
  { id: 'about', regex: /<!-- =+\s*-->\s*<!--\s*5B\.\s*ABOUT MOVISABIO SECTION[^\n]*-->\s*<!-- =+\s*-->\s*<section id="about"/ },
  { id: 'videos', regex: /<!-- =+\s*-->\s*<!--\s*6\.\s*INTERACTIVE MEDIA & VIDEO SHOWCASE\s*-->\s*<!-- =+\s*-->\s*<section id="videos"/ },
  { id: 'presence', regex: /<!-- =+\s*-->\s*<!--\s*7\.\s*GLOBAL PRESENCE & INTERACTIVE MAP\s*-->\s*<!-- =+\s*-->\s*<section id="presence"/ },
  { id: 'research', regex: /<!-- =+\s*-->\s*<!--\s*8\.\s*RESEARCH, INNOVATION & ESG STRATEGY\s*-->\s*<!-- =+\s*-->\s*<section id="research"/ },
  { id: 'leadership', regex: /<!-- =+\s*-->\s*<!--\s*9\.\s*EXECUTIVE LEADERSHIP\s*-->\s*<!-- =+\s*-->\s*<section id="leadership"/ },
  { id: 'submit-idea', regex: /<!-- =+\s*-->\s*<!--\s*10\.\s*OPEN INNOVATION & STARTUP PITCH SUBMISSION\s*-->\s*<!-- =+\s*-->\s*<section id="submit-idea"/ },
  { id: 'contact', regex: /<!-- =+\s*-->\s*<!--\s*11\.\s*INSTITUTIONAL INQUIRIES & PARTNERSHIPS\s*-->\s*<!-- =+\s*-->\s*<section id="contact"/ }
];

const indices = [];
sectionMarkers.forEach(item => {
  const match = updatedHtml.match(item.regex);
  if (!match) throw new Error('Missing ' + item.id);
  indices.push({ id: item.id, index: match.index });
});

indices.sort((a, b) => a.index - b.index);
const mainEndIndex = updatedHtml.indexOf('</main>');

const sections = {};
for (let i = 0; i < indices.length; i++) {
  const cur = indices[i];
  const nextIdx = (i + 1 < indices.length) ? indices[i + 1].index : mainEndIndex;
  sections[cur.id] = updatedHtml.substring(cur.index, nextIdx).trim();
}

// 3. Refine Hero Section CTAs
let heroBlock = sections['hero'];
const heroButtonsOld = /<div style="display: flex; justify-content: center; gap: var\(--space-md\); flex-wrap: wrap; margin-bottom: var\(--space-3xl\);">[\s\S]*?<\/div>/;
const heroButtonsRefined = `<div style="display: flex; justify-content: center; gap: var(--space-md); flex-wrap: wrap; margin-bottom: var(--space-3xl);">
                        <a href="#platform" onclick="scrollToSection('platform')" class="btn btn-primary btn-lg" data-i18n="btn_explore_platform">Explore the Platform ↓</a>
                        <a href="#smart-city" onclick="scrollToSection('smart-city')" class="btn btn-secondary btn-lg" data-i18n="btn_discover_smart_city">Discover Smart City 🏙️</a>
                        <a href="#solutions" onclick="scrollToSection('solutions')" class="btn btn-outline btn-lg" data-i18n="btn_view_portfolio">View Technology Portfolio →</a>
                    </div>`;

heroBlock = heroBlock.replace(heroButtonsOld, heroButtonsRefined);

// 4. Split Platform into Platform Core and Smart City Flagship Section
const platformFull = sections['platform'];
const scMarker = '<div class="flagship-banner" id="smart-city"';
const scIdx = platformFull.indexOf(scMarker);
if (scIdx === -1) throw new Error('smart-city div not found');

let platformCore = platformFull.substring(0, scIdx).trim();
if (!platformCore.endsWith('</section>')) {
  platformCore += '\n                </div>\n            </section>';
}

let smartCityInner = platformFull.substring(scIdx).trim();
smartCityInner = smartCityInner.replace(/<\/div>\s*<\/section>$/, '').trim();

const smartCitySection = `            <!-- ================================================================== -->
            <!-- 3. MOVISABIO SMART CITY FLAGSHIP PRODUCT                           -->
            <!-- ================================================================== -->
            <section id="smart-city" class="section-padding" style="background: var(--bg-primary); border-bottom: 1px solid var(--border-subtle);">
                <div class="container">
                    ${smartCityInner}
                </div>
            </section>`;

// 5. Refine Architecture Section with Portfolio CTA
let archBlock = sections['architecture'];
if (!archBlock.includes('View Technology Portfolio →')) {
  const archEnd = archBlock.lastIndexOf('</div>\n                </div>\n            </section>');
  const archCta = `                    <!-- Architecture to Solutions CTA Strip -->
                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-md); margin-top: var(--space-2xl); padding-top: var(--space-lg); border-top: 1px solid var(--border-subtle);">
                        <div>
                            <span style="font-weight: var(--font-weight-bold); color: var(--text-primary); font-size: var(--font-size-md);">Modular Solutions Built on This Architecture</span>
                            <p style="font-size: var(--font-size-sm); color: var(--text-secondary); margin: 0;">Explore our 7 modular territorial intelligence solutions addressing urban, transit, and rural environments.</p>
                        </div>
                        <a href="#solutions" onclick="scrollToSection('solutions')" class="btn btn-primary btn-sm" data-i18n="btn_view_portfolio">View Technology Portfolio →</a>
                    </div>\n`;
  archBlock = archBlock.replace('</div>\n                </div>\n            </section>', archCta + '                </div>\n            </section>');
}

// 6. Refine Presence Section with Strategic Partner CTA
let presenceBlock = sections['presence'];
if (!presenceBlock.includes('Become a Strategic Partner →')) {
  const presCta = `                    <!-- Strategic Partner CTA Strip -->
                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-md); margin-top: var(--space-2xl); padding-top: var(--space-lg); border-top: 1px solid var(--border-subtle);">
                        <div>
                            <span style="font-weight: var(--font-weight-bold); color: var(--text-primary); font-size: var(--font-size-md);">Interested in a municipal pilot in your region?</span>
                            <p style="font-size: var(--font-size-sm); color: var(--text-secondary); margin: 0;">We partner with municipal transportation authorities, regional planning agencies, and university labs.</p>
                        </div>
                        <a href="#contact" onclick="selectInquiry('Municipal Partnership'); scrollToSection('contact')" class="btn btn-primary btn-sm" data-i18n="btn_become_partner">Become a Strategic Partner →</a>
                    </div>\n`;
  presenceBlock = presenceBlock.replace('</div>\n            </section>', presCta + '            </div>\n            </section>');
}

// 7. Refine Economics Section with Investor Enquiries CTA
let economicsBlock = sections['economics'];
if (!economicsBlock.includes('Investor Enquiries →')) {
  const econCta = `                    <!-- Investor Conversion CTA Strip -->
                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-md); margin-top: 35px; padding-top: 25px; border-top: 1px solid rgba(0,0,0,0.1);">
                        <div>
                            <h4 style="color: var(--primary-color); margin-bottom: 4px; font-size: 1.15rem; font-weight: 700;">Institutional Capital & Strategic Alliances</h4>
                            <p style="font-size: 0.9rem; color: var(--text-light); margin: 0;">Request investor briefs, grant co-funding details, and unit economics modeling.</p>
                        </div>
                        <div style="display: flex; gap: var(--space-sm); flex-wrap: wrap;">
                            <a href="#contact" onclick="selectInquiry('Investor Enquiry'); scrollToSection('contact')" class="btn btn-primary btn-sm" data-i18n="btn_investor_enquiries">Investor Enquiries →</a>
                            <a href="partners.html" class="btn btn-outline btn-sm">Partners & Pitch Deck 📄</a>
                        </div>
                    </div>\n`;
  economicsBlock = economicsBlock.replace('</div>\n            </section>', econCta + '            </div>\n            </section>');
}

// 8. Reconstruct Main Content in the 10-Step Visitor Journey:
// 1. Hero and company positioning (#hero)
// 2. Territorial Intelligence Platform (#platform)
// 3. MoviSabio Smart City flagship product (#smart-city)
// 4. Technology and solutions (#architecture)
// 5. Our Tech Portfolio (#solutions)
// 6. Global Impact and pilot regions (#presence, #videos, #research)
// 7. About MoviSabio (#about)
// 8. Leadership and partnerships (#leadership)
// 9. Market Opportunity and Investor Economics (#economics)
// 10. Contact and partnership CTA (#submit-idea, #contact)

const reconstructedMain = [
  heroBlock,
  platformCore,
  smartCitySection,
  archBlock,
  sections['solutions'],
  presenceBlock,
  sections['videos'],
  sections['research'],
  sections['about'],
  sections['leadership'],
  economicsBlock,
  sections['submit-idea'],
  sections['contact']
].join('\n\n');

// Assemble final HTML
const heroGlobalIndex = updatedHtml.indexOf(indices[0].index !== undefined ? sections['hero'] : '<section id="hero"');
const beforeHero = updatedHtml.substring(0, indices.find(x => x.id === 'hero').index);
const afterMainRest = updatedHtml.substring(mainEndIndex);

let finalHtml = beforeHero + reconstructedMain + '\n        ' + afterMainRest;

// Add selectInquiry helper if not already present
if (!finalHtml.includes('function selectInquiry(')) {
  const helperScript = `
        // Phase B: Programmatic Category Pre-selection for CTAs
        function selectInquiry(category) {
            const sel = document.getElementById('contact-category');
            if (sel) {
                for (let i = 0; i < sel.options.length; i++) {
                    if (sel.options[i].value.toLowerCase().includes(category.toLowerCase())) {
                        sel.selectedIndex = i;
                        break;
                    }
                }
            }
        }
`;
  finalHtml = finalHtml.replace('function scrollToSection(id) {', helperScript + '\n        function scrollToSection(id) {');
}

fs.writeFileSync(htmlPath, finalHtml, 'utf8');
console.log('Successfully written refined index.html with 10-step hierarchy and conversion CTAs!');
