const fs = require('fs');
const path = require('path');

const cssDir = path.join(__dirname, '..', 'assets', 'css');
const cssFiles = fs.readdirSync(cssDir).filter(f => f.endsWith('.css'));

console.log('--- CSS Rules targeting images, sliders, leaders, cards ---');
cssFiles.forEach(file => {
  const filePath = path.join(cssDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Find selectors of interest
  const lines = content.split('\n');
  let currentBlock = [];
  let capturing = false;
  
  lines.forEach(line => {
    if (line.match(/(?:img|\.slider|\.smart-city|\.leader|\.card|\.flagship|\.hero|\.navbar|height|overflow|z-index)/i) && line.includes('{')) {
      capturing = true;
    }
    if (capturing) {
      currentBlock.push(line);
      if (line.includes('}')) {
        const block = currentBlock.join('\n');
        if (block.match(/(?:slider-img|smart-city-slider|leader-img|object-fit|aspect-ratio|overflow:\s*hidden|height:\s*\d+px)/i)) {
          console.log(`[${file}]`);
          console.log(block);
          console.log('---------------------------');
        }
        currentBlock = [];
        capturing = false;
      }
    }
  });
});
