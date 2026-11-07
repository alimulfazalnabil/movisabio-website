const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// We can run a small script inside Chrome or check using a puppeteer/playwright/DOM script if available, or write a node script that checks CSS widths.
// Let's check which elements have min-width or fixed widths in all CSS files!

const cssFiles = ['assets/css/base.css', 'assets/css/components.css', 'assets/css/navigation.css', 'assets/css/platform.css', 'assets/css/map.css'];
cssFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, i) => {
    if (line.match(/(min-width|width):\s*(\d{3,})px/)) {
      const match = line.match(/(min-width|width):\s*(\d{3,})px/);
      const val = parseInt(match[2], 10);
      if (val > 320) {
        console.log(`${file}:${i+1} -> ${line.trim()}`);
      }
    }
  });
});
