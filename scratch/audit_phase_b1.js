const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');

console.log('=== PHASE B1 PRE-IMPLEMENTATION AUDIT ===');

const sections = [];
const regex = /<section[^>]*id=["']([^"']+)["'][^>]*>/gi;
let m;
while ((m = regex.exec(html)) !== null) {
  sections.push(m[1]);
}
console.log('1. Sections in order:', sections);

console.log('2. Key Content Presence:');
console.log('  Hero (#hero):', html.includes('id="hero"'));
console.log('  Platform (#platform):', html.includes('id="platform"'));
console.log('  Smart City (#smart-city):', html.includes('id="smart-city"'));
console.log('  Architecture (#architecture):', html.includes('id="architecture"'));
console.log('  Solutions (#solutions):', html.includes('id="solutions"'));
console.log('  Presence (#presence):', html.includes('id="presence"'));
console.log('  Videos (#videos):', html.includes('id="videos"'));
console.log('  Research (#research):', html.includes('id="research"'));
console.log('  About (#about):', html.includes('id="about"'));
console.log('  Leadership (#leadership):', html.includes('id="leadership"'));
console.log('  Economics (#economics):', html.includes('id="economics"'));
console.log('  Pitch Form (#submit-idea):', html.includes('id="submit-idea"'));
console.log('  Contact Form (#contact):', html.includes('id="contact"'));

console.log('3. Investor Economics Protection Audit:');
console.log('  US$ 1.1 Trillion TAM:', html.includes('1.1 Trillion'));
console.log('  US$ 25 Billion SAM:', html.includes('25 Billion'));
console.log('  €50.3 Million ARR:', html.includes('50.3 Million'));
console.log('  48% EBITDA Margin:', html.includes('48%'));
console.log('  Category Creation TIP:', html.includes('Category Creation: Territorial Intelligence Platform (TIP)'));
console.log('  Competitive Analysis (Esri, Palantir, Bentley):', html.includes('vs. Esri') && html.includes('vs. Palantir') && html.includes('vs. Bentley'));
console.log('  Four-Pillar Revenue Model:', html.includes('Four-Pillar Revenue Architecture'));
console.log('  3-Stage Funding Roadmap:', html.includes('3-Stage Estimated Funding Roadmap'));
console.log('  Investor SaaS Badges (81% Gross Margin, 21.9x LTV/CAC, 115% NRR):', html.includes('81% Gross Margin') && html.includes('21.9x LTV/CAC') && html.includes('115% NRR'));

console.log('4. Tech Portfolio 7 Entries Audit:');
const portfolioItems = [
  'movisabio-enterprise-smart-city',
  'Territorial Intelligence & Quantum Platform',
  'AI Traffic Signal Coordination',
  'Computer Vision Vehicle Detection',
  'Smart Public Transit Router',
  'Virtual Fencing',
  'Category Creation: Territorial Intelligence Platform (TIP)'
];
portfolioItems.forEach(item => {
  console.log(`  "${item}":`, html.includes(item));
});

console.log('5. Translation Parity Audit:');
const i18n = require('../assets/js/i18n.js');
const langs = ['en', 'de', 'pt', 'es', 'it', 'zh'];
const enKeys = Object.keys(i18n.en);
console.log(`  English keys count: ${enKeys.length}`);
langs.forEach(lang => {
  const missing = enKeys.filter(k => !i18n[lang] || !(k in i18n[lang]));
  console.log(`  Language [${lang}] missing keys count: ${missing.length}`);
});
