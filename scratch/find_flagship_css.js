const fs = require('fs');
const path = require('path');

const cssDir = path.join(__dirname, '..', 'assets', 'css');
fs.readdirSync(cssDir).forEach(f => {
  if (f.endsWith('.css')) {
    const text = fs.readFileSync(path.join(cssDir, f), 'utf8');
    if (text.includes('flagship-banner')) {
      console.log(`Found flagship-banner in ${f}`);
    }
  }
});
