const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('====================================================');
console.log('MOVISABIO PHASE B1 INTEGRITY & UX QA VERIFICATION');
console.log('====================================================\n');

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passCount++;
  } else {
    console.error(`[FAIL] ${message}`);
    failCount++;
  }
}

// 1. Read index.html
const htmlPath = path.join(__dirname, '..', 'index.html');
const html = fs.readFileSync(htmlPath, 'utf-8');

// CHECK 1: Hero Section Positioning & CTAs
assert(html.includes('Intelligence for the Territories of Tomorrow.'), 'Hero: Headline "Intelligence for the Territories of Tomorrow." is present');
assert(html.includes('MoviSabio develops AI-powered territorial intelligence ecosystems'), 'Hero: Supporting description is present');
assert(html.includes('data-i18n="btn_explore_platform"'), 'Hero: CTA "Explore Our Platform" is present');
assert(html.includes('data-i18n="btn_discover_smart_city"'), 'Hero: CTA "Discover Smart City" is present');
assert(html.includes('data-i18n="btn_partner_movisabio"'), 'Hero: CTA "Partner With MoviSabio" is present');

// CHECK 2: Platform & Smart City Connection
const narrative = "The Territorial Intelligence Platform provides the underlying intelligence ecosystem. MoviSabio Smart City applies this ecosystem to urban mobility, infrastructure management and municipal decision-making.";
assert(html.includes(narrative), 'Platform: Narrative bridge connecting Platform and Smart City is present verbatim');
assert(html.includes('id="platform"'), 'Platform: Platform section id="platform" exists');
assert(html.includes('id="smart-city"'), 'Smart City: Smart City section id="smart-city" exists');

// CHECK 3: Audience Pathways (#audiences)
assert(html.includes('id="audiences"'), 'Audiences: Section id="audiences" exists');
assert(html.includes('data-i18n="sec_audiences_title"'), 'Audiences: "One Platform, Three Value Propositions" title present');
assert(html.includes('data-i18n="cta_gov"'), 'Audiences: Government pathway with "Explore Municipal Solutions" CTA present');
assert(html.includes('data-i18n="cta_enterprise"'), 'Audiences: Enterprise pathway with "Discuss Enterprise Solutions" CTA present');
assert(html.includes('data-i18n="cta_investors"'), 'Audiences: Investor pathway with "Investor Relations" CTA present');

// CHECK 4: Photo Slider in Smart City section
assert(html.includes('class="smart-city-slider"'), 'Smart City: Photo slider container .smart-city-slider is present');
assert(html.includes('id="smart-city-slider-track"'), 'Smart City: Photo slider track #smart-city-slider-track is present');
assert(html.includes('AI-Powered Smart City at Dusk-3.png'), 'Smart City: Slide 1 image present');
assert(html.includes('AI Traffic Coordination at Sunset.png'), 'Smart City: Slide 2 image present');
assert(html.includes('MoviSabio Smart City Control Centre.png'), 'Smart City: Slide 3 image present');
assert(html.includes('MoviSabio Smart City Detection.png'), 'Smart City: Slide 4 image present');
assert(html.includes('Smart BRT City Mobility Dashboard.png'), 'Smart City: Slide 5 image present');
assert(html.includes('MoviSabio GIS Command Centre.png'), 'Smart City: Slide 6 image present');
assert(html.includes('id="slider-prev-btn"') && html.includes('id="slider-next-btn"'), 'Smart City: Prev/Next navigation buttons are present');
assert(html.includes('id="slider-dots-container"'), 'Smart City: Pagination dots container is present');
assert(html.includes('id="slider-play-pause-btn"'), 'Smart City: Autoplay pause/play button is present');

// CHECK 5: Restored About MoviSabio section
assert(html.includes('id="about"'), 'About: Section id="about" exists');
assert(html.includes('data-i18n="card_mission_title"'), 'About: Global Vision & Mission header exists');
assert(html.includes("We are building the world's leading Territorial Intelligence Platform."), 'About: Vision & Mission exact copy matches');
assert(html.includes('data-i18n="card_structure_title"'), 'About: Borderless SaaS Architecture header exists');
assert(html.includes("Engineered for immediate international deployment"), 'About: SaaS Architecture exact copy matches');
assert(html.includes('data-i18n="card_strategy_title"'), 'About: Climate & ESG Impact header exists');
assert(html.includes("Addressing universal challenges in urbanization"), 'About: Climate & ESG exact copy matches');

// CHECK 6: Restored Tech Portfolio items (7 items)
const expectedItems = [
  'movisabio-enterprise-smart-city',
  'Territorial Intelligence & Quantum Platform',
  'AI Traffic Signal Coordination',
  'Computer Vision Vehicle Detection',
  'Smart Public Transit Router',
  'Virtual Fencing',
  'Category Creation: Territorial Intelligence Platform (TIP)'
];
expectedItems.forEach(item => {
  assert(html.includes(item), `Tech Portfolio: "${item}" exists in index.html`);
});

// CHECK 7: Header & Navigation
assert(html.includes('class="nav-item-dropdown"'), 'Nav: Dropdown menu container .nav-item-dropdown is present');
assert(html.includes('data-i18n="nav_company"'), 'Nav: Company dropdown trigger exists');
assert(html.includes('data-i18n="nav_investor"'), 'Nav: Investor dropdown trigger exists');
assert(html.includes('data-i18n="nav_audiences"'), 'Nav: Audiences link exists');
assert(html.includes('id="nav-cta-btn"'), 'Nav: Partner With Us CTA button is present');

// CHECK 8: Protected Investor Content (#economics)
assert(html.includes('id="economics"'), 'Content Integrity: #economics is preserved');
assert(html.includes('US$ 1.1 Trillion') || html.includes('1.1 Trillion'), 'Content Integrity: TAM $1.1 Trillion is preserved');
assert(html.includes('US$ 25 Billion') || html.includes('25 Billion'), 'Content Integrity: SAM $25 Billion is preserved');
assert(html.includes('€50.3 Million') || html.includes('50.3 Million'), 'Content Integrity: Year 10 ARR Target is preserved');
assert(html.includes('48% EBITDA') || html.includes('48%'), 'Content Integrity: 48% EBITDA margin is preserved');
assert(html.includes('vs. Esri') && html.includes('vs. Palantir') && html.includes('vs. Bentley'), 'Content Integrity: Competitive analysis preserved');
assert(html.includes('Four-Pillar Revenue Architecture'), 'Content Integrity: Four-pillar revenue model preserved');
assert(html.includes('3-Stage Estimated Funding Roadmap'), 'Content Integrity: Funding roadmap preserved');
assert(html.includes('81% Gross Margin') && html.includes('21.9x LTV/CAC'), 'Content Integrity: Investor SaaS metrics preserved');

// CHECK 9: Other core sections preserved
assert(html.includes('id="leadership"'), 'Content Integrity: #leadership section preserved');
assert(html.includes('id="presence"'), 'Content Integrity: #presence section preserved');
assert(html.includes('id="videos"'), 'Content Integrity: #videos section preserved');
assert(html.includes('id="research"'), 'Content Integrity: #research section preserved');
assert(html.includes('id="submit-idea"'), 'Content Integrity: #submit-idea form preserved');
assert(html.includes('id="contact"'), 'Content Integrity: #contact form preserved');

// CHECK 10: Duplicate IDs check
const idMatches = html.match(/\bid=["']([^"']+)["']/g) || [];
const idCounts = {};
idMatches.forEach(attr => {
  const m = attr.match(/\bid=["']([^"']+)["']/);
  if (m) {
    const id = m[1];
    idCounts[id] = (idCounts[id] || 0) + 1;
  }
});
const duplicateIds = Object.keys(idCounts).filter(id => idCounts[id] > 1);
assert(duplicateIds.length === 0, `Technical: Zero duplicate IDs (duplicates found: ${duplicateIds.join(', ') || 'none'})`);

// CHECK 11: Valid in-page internal links
const hrefMatches = html.match(/\bhref=["']#([^"']+)["']/g) || [];
const missingAnchors = [];
hrefMatches.forEach(attr => {
  const m = attr.match(/\bhref=["']#([^"']+)["']/);
  if (m && m[1]) {
    const targetId = m[1];
    if (!idCounts[targetId]) {
      missingAnchors.push(targetId);
    }
  }
});
assert(missingAnchors.length === 0, `Technical: All in-page anchors point to existing IDs (missing: ${missingAnchors.join(', ') || 'none'})`);

// CHECK 12: Image files exist on disk
const imgMatches = html.match(/\bsrc=["']([^"']+\.(png|jpg|jpeg|jfif|svg|gif))["']/g) || [];
const missingImages = [];
imgMatches.forEach(attr => {
  const m = attr.match(/\bsrc=["']([^"']+)["']/);
  if (m && m[1] && !m[1].startsWith('http')) {
    const rel = m[1];
    const full = path.join(__dirname, '..', rel);
    if (!fs.existsSync(full)) {
      missingImages.push(rel);
    }
  }
});
assert(missingImages.length === 0, `Technical: All referenced image files exist on disk (missing: ${missingImages.join(', ') || 'none'})`);

// CHECK 13: i18n Translation completeness
const i18nPath = path.join(__dirname, '..', 'assets', 'js', 'i18n.js');
assert(fs.existsSync(i18nPath), 'i18n: assets/js/i18n.js exists');

let dictionaries = null;
try {
  const i18nCode = fs.readFileSync(i18nPath, 'utf-8');
  const sandbox = {
    window: {
      location: { search: '' },
      dispatchEvent: () => true
    },
    document: {
      addEventListener: () => {},
      readyState: 'complete',
      querySelectorAll: () => [],
      documentElement: { lang: 'en', dir: 'ltr' },
      body: { setAttribute: () => {} }
    },
    localStorage: { getItem: () => null, setItem: () => {} },
    navigator: { language: 'en', userLanguage: 'en' },
    CustomEvent: class CustomEvent { constructor(type, detail) { this.type = type; Object.assign(this, detail); } },
    URLSearchParams: global.URLSearchParams || class { get() { return null; } },
    console: console
  };
  vm.createContext(sandbox);
  vm.runInContext(i18nCode, sandbox);
  dictionaries = sandbox.translations || sandbox.window.translations || (sandbox.i18n && sandbox.i18n.dictionaries);
  if (!dictionaries) {
    const dictMatch = i18nCode.match(/const\s+translations\s*=\s*(\{[\s\S]*?\n\};)/);
    if (dictMatch) {
      const parsed = vm.runInNewContext('(' + dictMatch[1].replace(/;\s*$/, '') + ')');
      dictionaries = parsed;
    }
  }
} catch (err) {
  console.error('Error parsing i18n dictionaries:', err);
}
assert(dictionaries !== null, 'i18n: Dictionaries object parsed successfully');

if (dictionaries) {
  const dataI18nMatches = html.match(/\bdata-i18n=["']([^"']+)["']/g) || [];
  const requiredKeys = new Set();
  dataI18nMatches.forEach(attr => {
    const m = attr.match(/\bdata-i18n=["']([^"']+)["']/);
    if (m && m[1]) requiredKeys.add(m[1]);
  });

  const languages = ['en', 'de', 'pt', 'es', 'it', 'zh'];
  languages.forEach(lang => {
    const dict = dictionaries[lang] || {};
    const missing = [];
    requiredKeys.forEach(k => {
      if (typeof dict[k] === 'undefined') {
        missing.push(k);
      }
    });
    assert(missing.length === 0, `i18n [${lang}]: All ${requiredKeys.size} HTML data-i18n keys are translated (missing: ${missing.join(', ') || 'none'})`);
  });
}

console.log('\n====================================================');
console.log(`QA SUMMARY: ${passCount} Passed, ${failCount} Failed`);
console.log('====================================================\n');

if (failCount > 0) {
  process.exit(1);
}
