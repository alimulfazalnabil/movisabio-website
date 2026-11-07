const fs = require('fs');
const origHtml = fs.readFileSync('recovery/original_historical/index.html', 'utf8');

const match = origHtml.match(/<section[^>]*id=["']company["'][^>]*>([\s\S]*?)<\/section>/i);
if (match) {
  fs.writeFileSync('scratch/historical_about_section.html', match[0], 'utf8');
  console.log('Saved scratch/historical_about_section.html, length:', match[0].length);
} else {
  console.log('Not found');
}
