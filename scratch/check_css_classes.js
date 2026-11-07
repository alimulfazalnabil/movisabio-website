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

const cssFiles = fs.readdirSync('assets/css').filter(f => f.endsWith('.css'));
for (const file of cssFiles) {
  const content = fs.readFileSync(`assets/css/${file}`, 'utf8');
  console.log(`\n=== File: assets/css/${file} ===`);
  for (const c of classes) {
    if (content.includes(c)) {
      console.log(`  Contains class .${c}`);
    }
  }
}
