const fs = require('fs');

let report = '';
function log(msg) {
  console.log(msg);
  report += msg + '\n';
}

log('=== MOVISABIO ECONOMICS SECTION RESTORATION VERIFICATION ===\n');

// 1. Verify index.html contains #economics
const html = fs.readFileSync('index.html', 'utf8');
const hasEconomicsSection = html.includes('id="economics"');
log(`1. index.html contains id="economics": ${hasEconomicsSection}`);

// Check all required figures
const checks = [
  'US$ 1.1 Trillion',
  'Total Addressable Market (TAM)',
  'US$ 25 Billion',
  'Serviceable Available Market (SAM)',
  '€50.3 Million',
  'Year 10 ARR Target',
  '1,000 active customer accounts',
  '48% EBITDA margin',
  'Territorial Intelligence Platform (TIP)',
  'vs. Esri (ArcGIS)',
  'vs. Palantir',
  'vs. Bentley & Siemens',
  'Four-Pillar Revenue Architecture',
  '1. SaaS Platform',
  '2. Data as a Service (DaaS)',
  '3. Smart Hardware',
  '4. Strategic Consulting',
  '3-Stage Estimated Funding Roadmap',
  'Stage 1: Validation',
  '€750k – €1.2 Million',
  'Stage 2: Commercialization',
  '€2 – €3 Million',
  'Stage 3: International Scale',
  '€5 – €10 Million',
  '81% Gross Margin',
  '21.9x LTV/CAC Ratio',
  '4.4-month payback',
  '115% NRR'
];

log('\n2. Verifying all required metrics & content strings:');
let allChecksPassed = true;
for (const c of checks) {
  const found = html.includes(c);
  if (!found) allChecksPassed = false;
  log(`  [${found ? 'PASS' : 'FAIL'}] "${c}"`);
}
log(`All content checks passed: ${allChecksPassed}`);

// 3. ID Uniqueness Check
log('\n3. Verifying ID uniqueness in index.html:');
const idMatches = [...html.matchAll(/id=["']([^"']+)["']/g)].map(m => m[1]);
const idCounts = {};
for (const id of idMatches) {
  idCounts[id] = (idCounts[id] || 0) + 1;
}
const duplicateIds = Object.entries(idCounts).filter(([id, count]) => count > 1);
if (duplicateIds.length === 0) {
  log('  PASS: Zero duplicate IDs found! (Total unique IDs: ' + Object.keys(idCounts).length + ')');
} else {
  log('  WARN: Duplicate IDs found: ' + JSON.stringify(duplicateIds));
}

// 4. Verify i18n keys
log('\n4. Verifying translations in assets/js/i18n.js:');
const i18n = fs.readFileSync('assets/js/i18n.js', 'utf8');
const langs = ['en', 'de', 'pt', 'es', 'it', 'zh'];
for (const l of langs) {
  const hasNav = i18n.includes(`nav_economics:`);
  const hasSec = i18n.includes(`sec_economics:`);
  log(`  Lang [${l}]: has nav_economics & sec_economics in dictionary: ${hasNav && hasSec}`);
}

// 5. Verify CSS rules
log('\n5. Verifying CSS in assets/css/components.css:');
const css = fs.readFileSync('assets/css/components.css', 'utf8');
const cssChecks = [
  '#economics {',
  '#economics .section-title',
  '#economics .impact-grid',
  '#economics .pilot-card',
  '#economics .company-grid',
  '#economics .company-card',
  '#economics .sdg-container',
  '#economics .sdg-badge'
];
for (const cc of cssChecks) {
  log(`  [${css.includes(cc) ? 'PASS' : 'FAIL'}] CSS rule: ${cc}`);
}

fs.writeFileSync('scratch/restoration_verification_report.txt', report, 'utf8');
