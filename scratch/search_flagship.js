const fs = require('fs');
const path = require('path');

function searchDir(dir) {
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      searchDir(full);
    } else if (f.endsWith('.css') || f.endsWith('.js') || f.endsWith('.html')) {
      const content = fs.readFileSync(full, 'utf8');
      if (content.includes('flagship-banner')) {
        console.log(`Found flagship-banner in ${full}`);
      }
    }
  });
}

searchDir(path.join(__dirname, '..', 'assets'));
