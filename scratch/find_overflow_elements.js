const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf-8');
const cssFiles = ['variables.css', 'base.css', 'components.css', 'navigation.css', 'map.css', 'platform.css'];

console.log('--- Checking for hardcoded widths, min-widths, and overflow causes ---');

// Search for min-width > 300px, width > 350px, or rigid dimensions in CSS
cssFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', 'assets', 'css', file);
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf-8');
  
  const matches = content.match(/([^{}]+)\{([^{}]+)\}/g) || [];
  matches.forEach(m => {
    const selector = m.substring(0, m.indexOf('{')).trim();
    const rules = m.substring(m.indexOf('{') + 1, m.lastIndexOf('}')).trim();
    
    // Check for min-width, width in px
    const wMatch = rules.match(/(?:min-width|width)\s*:\s*(\d+)px/i);
    if (wMatch) {
      const px = parseInt(wMatch[1], 10);
      if (px > 340) {
        console.log(`[${file}] ${selector} -> width/min-width: ${px}px`);
      }
    }

    // Check for grid repeat minmax > 300px
    const gridMatch = rules.match(/grid-template-columns\s*:\s*repeat\([^)]*minmax\((\d+)px/i);
    if (gridMatch) {
      const minPx = parseInt(gridMatch[1], 10);
      if (minPx > 300) {
        console.log(`[${file}] ${selector} -> grid minmax(${minPx}px)`);
      }
    }
  });
});

// Also search inline styles in index.html
console.log('\n--- Checking inline styles in index.html for wide fixed widths ---');
const inlineMatches = html.match(/style=["'][^"']*(?:min-width|width)\s*:\s*\d+px[^"']*["']/gi) || [];
inlineMatches.forEach(m => {
  const num = m.match(/(?:min-width|width)\s*:\s*(\d+)px/i);
  if (num && parseInt(num[1], 10) > 340) {
    console.log(`Inline style: ${m}`);
  }
});

// Check hero container and badges in index.html
const heroBadgesMatch = html.match(/<div class="hero-badges[^"]*"[\s\S]*?<\/div>/);
if (heroBadgesMatch) {
  console.log('\nHero badges HTML:\n', heroBadgesMatch[0].substring(0, 300));
}
