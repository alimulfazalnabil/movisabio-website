const fs = require('fs');
const path = require('path');

console.log('====================================================');
console.log('MOVISABIO WEBSITE INTEGRITY & UX QA VERIFICATION');
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

// CHECK 1: Task 1 - Platform & Smart City Connection
const narrative = "The Territorial Intelligence Platform provides the underlying intelligence ecosystem. MoviSabio Smart City applies this ecosystem to urban mobility, infrastructure management and municipal decision-making.";
assert(html.includes(narrative), 'Task 1: Narrative bridge connecting Platform and Smart City is present verbatim');
assert(html.includes('id="platform"'), 'Task 1: Platform section id="platform" exists');
assert(html.includes('id="smart-city"'), 'Task 1: Smart City application id="smart-city" exists');
assert(html.includes('platform_cta_smart_city'), 'Task 1: Reciprocal CTA leading to Smart City is present');
assert(html.includes('platform_cta_back'), 'Task 1: Reciprocal link leading back to Platform Core is present');

// CHECK 2: Task 5 - Photo Slider in Smart City section
assert(html.includes('class="smart-city-slider"'), 'Task 5: Photo slider container .smart-city-slider is present');
assert(html.includes('id="smart-city-slider-track"'), 'Task 5: Photo slider track #smart-city-slider-track is present');
assert(html.includes('AI-Powered Smart City at Dusk-3.png'), 'Task 5: Slide 1 image present');
assert(html.includes('AI Traffic Coordination at Sunset.png'), 'Task 5: Slide 2 image present');
assert(html.includes('MoviSabio Smart City Control Centre.png'), 'Task 5: Slide 3 image present');
assert(html.includes('MoviSabio Smart City Detection.png'), 'Task 5: Slide 4 image present');
assert(html.includes('Smart BRT City Mobility Dashboard.png'), 'Task 5: Slide 5 image present');
assert(html.includes('MoviSabio GIS Command Centre.png'), 'Task 5: Slide 6 image present');
assert(html.includes('id="slider-prev-btn"') && html.includes('id="slider-next-btn"'), 'Task 5: Prev/Next navigation buttons are present');
assert(html.includes('id="slider-dots-container"'), 'Task 5: Pagination dots container is present');
assert(html.includes('id="slider-play-pause-btn"'), 'Task 5: Autoplay pause/play button is present');

// CHECK 3: Task 2 - About MoviSabio section
assert(html.includes('id="about"'), 'Task 2: Restored section id="about" exists');
assert(html.includes('Global Vision & Mission'), 'Task 2: Global Vision & Mission header exists');
assert(html.includes('We are building the world\'s leading Territorial Intelligence Platform. Our mission is to scale AI, IoT, and quantum-ready digital ecosystems globally'), 'Task 2: Vision & Mission exact copy matches');
assert(html.includes('Borderless SaaS Architecture'), 'Task 2: Borderless SaaS Architecture header exists');
assert(html.includes('Engineered for immediate international deployment, our cloud-native platform transforms fragmented territorial data into standardized'), 'Task 2: SaaS Architecture exact copy matches');
assert(html.includes('Worldwide Climate & ESG Impact'), 'Task 2: Climate & ESG Impact header exists');
assert(html.includes('Addressing universal challenges in urbanization, agriculture, and resource management. Our predictive AI models help global municipalities'), 'Task 2: Climate & ESG exact copy matches');

// CHECK 4: Task 3 - Tech Portfolio (all 7 entries)
const requiredTitles = [
  'movisabio-enterprise-smart-city',
  'Territorial Intelligence & Quantum Platform',
  'AI Traffic Signal Coordination',
  'Computer Vision Vehicle Detection',
  'Smart Public Transit Router',
  'Virtual Fencing',
  'Category Creation: Territorial Intelligence Platform (TIP)'
];

requiredTitles.forEach(title => {
  assert(html.includes(title), `Task 3: Portfolio item "${title}" exists in index.html`);
});

// CHECK 5: Task 4 - Header & Navigation
assert(html.includes('class="nav-item-dropdown"'), 'Task 4: Dropdown menu container .nav-item-dropdown is present');
assert(html.includes('data-i18n="nav_company"'), 'Task 4: Company dropdown trigger exists');
assert(html.includes('data-i18n="nav_investor"'), 'Task 4: Investor dropdown trigger exists');
assert(html.includes('id="nav-cta-btn"'), 'Task 4: Partner With Us CTA button is present');

// CHECK 6: Preservation of Existing Critical Content
assert(html.includes('id="economics"'), 'Content Integrity: #economics is preserved');
assert(html.includes('US$ 1.1 Trillion') || html.includes('1.1 Trillion'), 'Content Integrity: TAM $1.1 Trillion is preserved');
assert(html.includes('US$ 25 Billion') || html.includes('25 Billion'), 'Content Integrity: SAM $25 Billion is preserved');
assert(html.includes('€50.3 Million') || html.includes('50.3 Million'), 'Content Integrity: Year 10 ARR Target is preserved');
assert(html.includes('48% EBITDA') || html.includes('48%'), 'Content Integrity: 48% EBITDA margin is preserved');
assert(html.includes('id="leadership"'), 'Content Integrity: #leadership section preserved');
assert(html.includes('id="presence"'), 'Content Integrity: #presence section preserved');
assert(html.includes('id="videos"'), 'Content Integrity: #videos section preserved');
assert(html.includes('id="research"'), 'Content Integrity: #research section preserved');
assert(html.includes('id="submit-idea"'), 'Content Integrity: #submit-idea form preserved');
assert(html.includes('id="contact"'), 'Content Integrity: #contact form preserved');

// CHECK 7: Duplicate IDs check
const idRegex = /\sid=["']([^"']+)["']/g;
const ids = new Map();
let m;
let duplicateIds = [];
while ((m = idRegex.exec(html)) !== null) {
  const id = m[1];
  if (ids.has(id)) {
    duplicateIds.push(id);
  } else {
    ids.set(id, true);
  }
}
assert(duplicateIds.length === 0, `Technical: Zero duplicate IDs (duplicates found: ${duplicateIds.join(', ') || 'none'})`);

// CHECK 8: Internal # Anchor Links Validity
const anchorRegex = /href=["']#([^"']+)["']/g;
let missingAnchors = [];
while ((m = anchorRegex.exec(html)) !== null) {
  const targetId = m[1];
  if (!ids.has(targetId)) {
    missingAnchors.push(targetId);
  }
}
assert(missingAnchors.length === 0, `Technical: All in-page anchors point to existing IDs (missing: ${missingAnchors.join(', ') || 'none'})`);

// CHECK 9: Image Assets Existence on Disk
const imgRegex = /<img[^>]+src=["']([^"':]+)["']/g;
let missingImages = [];
while ((m = imgRegex.exec(html)) !== null) {
  const src = m[1];
  if (!src.startsWith('http') && !src.startsWith('data:')) {
    const fullImgPath = path.join(__dirname, '..', src);
    if (!fs.existsSync(fullImgPath)) {
      missingImages.push(src);
    }
  }
}
assert(missingImages.length === 0, `Technical: All referenced image files exist on disk (missing: ${missingImages.join(', ') || 'none'})`);

// CHECK 10: Multilingual Support & i18n Dictionary
const i18nPath = path.join(__dirname, '..', 'assets', 'js', 'i18n.js');
assert(fs.existsSync(i18nPath), 'i18n: assets/js/i18n.js exists');

// Extract dictionaries from i18n.js
const i18nRaw = fs.readFileSync(i18nPath, 'utf-8');
let dictionariesObj = null;
try {
  // Execute in isolated vm
  const vm = require('vm');
  const sandbox = {};
  vm.createContext(sandbox);
  // Remove IIFE wrapper to get dictionaries
  const dictMatch = i18nRaw.match(/const dictionaries\s*=\s*(\{[\s\S]*?\n\s*\};)/);
  if (dictMatch) {
    vm.runInContext('var dictionaries = ' + dictMatch[1], sandbox);
    dictionariesObj = sandbox.dictionaries;
  }
} catch (e) {
  console.error('Failed to extract dictionaries object:', e.message);
}

assert(dictionariesObj !== null, 'i18n: Dictionaries object parsed successfully');

const i18nRegex = /data-i18n=["']([^"']+)["']/g;
const usedKeys = new Set();
while ((m = i18nRegex.exec(html)) !== null) {
  usedKeys.add(m[1]);
}

if (dictionariesObj) {
  const langs = ['en', 'de', 'pt', 'es', 'it', 'zh'];
  langs.forEach(lang => {
    const langDict = dictionariesObj[lang];
    if (!langDict) {
      assert(false, `i18n [${lang}]: Language dictionary missing`);
      return;
    }
    const missingKeys = [];
    usedKeys.forEach(k => {
      if (!langDict[k]) {
        missingKeys.push(k);
      }
    });
    assert(missingKeys.length === 0, `i18n [${lang}]: All ${usedKeys.size} HTML data-i18n keys are translated (missing: ${missingKeys.join(', ') || 'none'})`);
  });
}

// CHECK 11: Inline JavaScript Syntax Check
const scriptRegex = /<script(?![^>]*src=)([^>]*)>([\s\S]*?)<\/script>/gi;
let scriptIdx = 0;
let jsErrors = 0;
while ((m = scriptRegex.exec(html)) !== null) {
  scriptIdx++;
  const attrs = m[1];
  const code = m[2];
  if (attrs.includes('ld+json')) {
    try {
      JSON.parse(code);
    } catch (e) {
      jsErrors++;
      assert(false, `JSON-LD #${scriptIdx} invalid: ${e.message}`);
    }
  } else {
    try {
      new Function(code);
    } catch (e) {
      jsErrors++;
      assert(false, `Inline Script #${scriptIdx} invalid JS: ${e.message}`);
    }
  }
}
assert(jsErrors === 0, 'Technical: All inline scripts have 100% valid JavaScript syntax');

console.log('\n====================================================');
console.log(`QA SUMMARY: ${passCount} Passed, ${failCount} Failed`);
console.log('====================================================\n');

if (failCount > 0) {
  process.exit(1);
}
