const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'index.html');
const rawHtml = fs.readFileSync(htmlPath, 'utf8');

// Find start and end of sections
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
  const match = rawHtml.match(item.regex);
  if (match) {
    indices.push({ id: item.id, index: match.index });
  } else {
    console.error('Failed to find marker for', item.id);
  }
});

indices.sort((a, b) => a.index - b.index);

const mainEndIndex = rawHtml.indexOf('</main>');
console.log('Found', indices.length, 'section markers in order:');
indices.forEach(i => console.log(`  ${i.id} at index ${i.index}`));

const sectionsMap = {};
for (let i = 0; i < indices.length; i++) {
  const current = indices[i];
  const nextIndex = (i + 1 < indices.length) ? indices[i + 1].index : mainEndIndex;
  sectionsMap[current.id] = rawHtml.substring(current.index, nextIndex).trim();
}

console.log('Extracted all sections.');
Object.keys(sectionsMap).forEach(k => {
  console.log(`  ${k}: ${sectionsMap[k].length} chars`);
});
