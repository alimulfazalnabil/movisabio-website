const fs = require('fs');

const classes = [
  'section-padding',
  'bg-light',
  'container',
  'section-title',
  'impact-grid',
  'pilot-card',
  'company-grid',
  'company-card',
  'sdg-container',
  'sdg-badge'
];

let out = '';
const cssFiles = fs.readdirSync('assets/css').filter(f => f.endsWith('.css'));
for (const file of cssFiles) {
  const content = fs.readFileSync(`assets/css/${file}`, 'utf8');
  out += `\n=== File: assets/css/${file} ===\n`;
  for (const c of classes) {
    if (content.includes(c)) {
      out += `  Contains class .${c}\n`;
    }
  }
}

// Also check original CSS if any exists in recovery
if (fs.existsSync('recovery/original_historical/style.css')) {
  out += '\n=== recovery/original_historical/style.css ===\n';
  const origCss = fs.readFileSync('recovery/original_historical/style.css', 'utf8');
  for (const c of classes) {
    if (origCss.includes(c)) {
      out += `  Contains class .${c}\n`;
    }
  }
}

fs.writeFileSync('scratch/css_check_result.txt', out, 'utf8');
console.log('Done writing css_check_result.txt');
