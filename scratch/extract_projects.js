const fs = require('fs');
const origHtml = fs.readFileSync('recovery/original_historical/index.html', 'utf8');

// Look for projects array or dynamic projects in original
const projMatch = origHtml.match(/const\s+projects\s*=\s*\[([\s\S]*?)\];/);
if (projMatch) {
  fs.writeFileSync('scratch/historical_projects.js', projMatch[0], 'utf8');
  console.log('Found projects array, length:', projMatch[0].length);
} else {
  // Let's find any array with id: or title:
  const allArrays = [...origHtml.matchAll(/const\s+([a-zA-Z0-9_]+)\s*=\s*\[([\s\S]*?)\];/g)];
  console.log('Arrays found in original:', allArrays.map(a => a[1]));
  allArrays.forEach(a => {
    if (a[0].includes('movisabio-enterprise-smart-city') || a[0].includes('Virtual Fencing')) {
      fs.writeFileSync(`scratch/historical_${a[1]}.js`, a[0], 'utf8');
      console.log(`Saved scratch/historical_${a[1]}.js`);
    }
  });
}
