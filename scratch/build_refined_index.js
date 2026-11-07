const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'index.html');
const rawHtml = fs.readFileSync(htmlPath, 'utf8');

// Section markers
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
  if (!match) throw new Error('Missing ' + item.id);
  indices.push({ id: item.id, index: match.index });
});

indices.sort((a, b) => a.index - b.index);
const mainEndIndex = rawHtml.indexOf('</main>');

const sections = {};
for (let i = 0; i < indices.length; i++) {
  const cur = indices[i];
  const nextIdx = (i + 1 < indices.length) ? indices[i + 1].index : mainEndIndex;
  sections[cur.id] = rawHtml.substring(cur.index, nextIdx).trim();
}

console.log('All 12 sections successfully captured.');

// Now let's split `platform` into `platform` (Core) and `smart-city` (Flagship Product)
const platformBlock = sections['platform'];
const smartCityMarker = '<div class="flagship-banner" id="smart-city"';
const scIdx = platformBlock.indexOf(smartCityMarker);

if (scIdx === -1) {
  throw new Error('Could not find smart-city inside platform');
}

// In platformBlock:
// Before scIdx:
// The section starts with:
// <!-- ================================================================== -->
// <!-- 3. TERRITORIAL INTELLIGENCE PLATFORM & SMART CITY SHOWCASE         -->
// <!-- ================================================================== -->
// <section id="platform" ...>
// <div class="container">
// ...
// </div> (the grid-2 ends)
// Then scIdx begins with:
// <!-- MoviSabio Smart City Flagship Application Container -->
// <div class="flagship-banner" id="smart-city" ...
// And ends with:
// </div> (flagship-banner)
// </div> (container)
// </section>

let platformPart = platformBlock.substring(0, scIdx).trim();
// Ensure platformPart ends with closing container and section:
if (!platformPart.endsWith('</section>')) {
  // If it ended after grid-2, close the container and section
  platformPart += '\n                </div>\n            </section>';
}

// Extract the smart city inner content
let smartCityPart = platformBlock.substring(scIdx).trim();
// Strip the trailing </div>\n</section> if present
smartCityPart = smartCityPart.replace(/<\/div>\s*<\/section>$/, '').trim();

// Wrap smartCityPart in its own dedicated <section id="smart-city">
const smartCitySection = `            <!-- ================================================================== -->
            <!-- 3. MOVISABIO SMART CITY FLAGSHIP PRODUCT                           -->
            <!-- ================================================================== -->
            <section id="smart-city" class="section-padding" style="background: var(--bg-primary); border-bottom: 1px solid var(--border-subtle);">
                <div class="container">
                    ${smartCityPart}
                </div>
            </section>`;

console.log('Platform Core length:', platformPart.length);
console.log('Smart City Section length:', smartCitySection.length);

// Now refine CTAs in Hero:
let heroSection = sections['hero'];
// Add the requested CTAs:
// - Explore the Platform (points to #platform)
// - Discover Smart City (points to #smart-city)
// - View Technology Portfolio (points to #solutions)
// - Become a Strategic Partner (points to #contact)
// - Investor Enquiries (points to #contact)
// - Contact MoviSabio (points to #contact)

console.log('Hero section extracted length:', heroSection.length);

// Reconstruct in the 10-step requested visitor journey:
// 1. Hero and company positioning.
// 2. Territorial Intelligence Platform.
// 3. MoviSabio Smart City flagship product.
// 4. Technology and solutions (architecture).
// 5. Our Tech Portfolio (solutions).
// 6. Global Impact and pilot regions (presence, videos, research).
// 7. About MoviSabio (about).
// 8. Leadership and partnerships (leadership).
// 9. Market Opportunity and Investor Economics (economics).
// 10. Contact and partnership CTA (submit-idea, contact).

const newMainContent = [
  heroSection,
  platformPart,
  smartCitySection,
  sections['architecture'],
  sections['solutions'],
  sections['presence'],
  sections['videos'],
  sections['research'],
  sections['about'],
  sections['leadership'],
  sections['economics'],
  sections['submit-idea'],
  sections['contact']
].join('\n\n');

console.log('New main content length:', newMainContent.length);

// Check if all essential IDs are present
const essentialIds = [
  'hero', 'platform', 'smart-city', 'architecture', 'solutions',
  'presence', 'videos', 'research', 'about', 'leadership',
  'economics', 'submit-idea', 'contact'
];

essentialIds.forEach(id => {
  const present = newMainContent.includes(`id="${id}"`);
  console.log(`ID #${id} present:`, present);
  if (!present) throw new Error(`Missing ID #${id}`);
});

console.log('All IDs verified!');
