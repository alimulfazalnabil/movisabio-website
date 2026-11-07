const fs = require('fs');
const glob = ['assets/css/variables.css', 'assets/css/base.css', 'assets/css/components.css', 'assets/css/navigation.css', 'assets/css/map.css', 'assets/css/platform.css', 'assets/css/main.css'];
glob.forEach(f => {
  if (fs.existsSync(f)) {
    const txt = fs.readFileSync(f, 'utf8');
    txt.split('\n').forEach((line, i) => {
      if (line.includes('brand-tag')) {
        console.log(`${f}:${i+1} -> ${line}`);
      }
    });
  }
});
