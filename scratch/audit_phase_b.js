const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');

console.log('--- PRE-IMPLEMENTATION AUDIT FOR PHASE B ---');

// 1. Identify all sections and their exact order
const sectionRegex = /<section[^>]*id=["']([^"']+)["'][^>]*>/gi;
const sections = [];
let m;
while ((m = sectionRegex.exec(html)) !== null) {
  sections.push(m[1]);
}
console.log('\nCurrent Section Order in index.html:');
sections.forEach((sec, idx) => console.log(`  ${idx + 1}. #${sec}`));

// 2. Verify Investor Economics
const hasEconomics = html.includes('id="economics"');
const hasTAM = html.includes('1.1 Trillion') || html.includes('US$ 1.1 Trillion');
const hasSAM = html.includes('25 Billion') || html.includes('US$ 25 Billion');
const hasARR = html.includes('50.3 Million') || html.includes('50.3M');
const hasEBITDA = html.includes('48%');
console.log('\nInvestor Economics Section Audit:');
console.log('  #economics present:', hasEconomics);
console.log('  TAM 1.1T present:', hasTAM);
console.log('  SAM 25B present:', hasSAM);
console.log('  ARR 50.3M present:', hasARR);
console.log('  48% EBITDA present:', hasEBITDA);

// 3. Verify About MoviSabio
const hasAbout = html.includes('id="about"');
const hasVision = html.includes('Global Vision & Mission');
const hasBorderless = html.includes('Borderless SaaS Architecture');
const hasClimate = html.includes('Worldwide Climate & ESG Impact');
console.log('\nAbout MoviSabio Section Audit:');
console.log('  #about present:', hasAbout);
console.log('  Global Vision & Mission present:', hasVision);
console.log('  Borderless SaaS Architecture present:', hasBorderless);
console.log('  Worldwide Climate & ESG Impact present:', hasClimate);

// 4. Verify all seven Tech Portfolio entries
const techItems = [
  'movisabio-enterprise-smart-city',
  'Territorial Intelligence & Quantum Platform',
  'AI Traffic Signal Coordination',
  'Computer Vision Vehicle Detection',
  'Smart Public Transit Router',
  'Virtual Fencing',
  'Category Creation: Territorial Intelligence Platform (TIP)'
];
console.log('\nTech Portfolio 7 Entries Audit:');
techItems.forEach(item => {
  console.log(`  "${item}":`, html.includes(item));
});

// 5. Verify Platform and Smart City connectivity
const hasPlatform = html.includes('id="platform"');
const hasSmartCity = html.includes('id="smart-city"');
const hasBridge = html.includes('The Territorial Intelligence Platform provides the underlying intelligence ecosystem');
const hasReciprocalCTA1 = html.includes('href="#smart-city"');
const hasReciprocalCTA2 = html.includes('href="#platform"');
console.log('\nPlatform and Smart City Connectivity Audit:');
console.log('  #platform present:', hasPlatform);
console.log('  #smart-city present:', hasSmartCity);
console.log('  Narrative bridge present:', hasBridge);
console.log('  CTA to #smart-city present:', hasReciprocalCTA1);
console.log('  CTA to #platform present:', hasReciprocalCTA2);

// 6. Verify Leadership, Global Impact, Videos, Research, and Forms
console.log('\nOther Sections & Forms Audit:');
console.log('  #leadership present:', html.includes('id="leadership"'));
console.log('  #presence (Global Presence) present:', html.includes('id="presence"'));
console.log('  #videos present:', html.includes('id="videos"'));
console.log('  #research present:', html.includes('id="research"'));
console.log('  #submit-idea form present:', html.includes('id="submit-idea"'));
console.log('  #contact form present:', html.includes('id="contact"'));
console.log('  #smart-city photo slider present:', html.includes('smart-city-slider'));
