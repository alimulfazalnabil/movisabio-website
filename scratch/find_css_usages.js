const fs = require('fs');
const path = require('path');

const cssDir = path.join(__dirname, '..', 'assets', 'css');
fs.readdirSync(cssDir).forEach(file => {
  if (file.endsWith('.css')) {
    const content = fs.readFileSync(path.join(cssDir, file), 'utf8');
    if (content.includes('bg-light')) {
      console.log(`Found 'bg-light' in ${file}`);
    }
  }
});
