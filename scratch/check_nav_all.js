const fs = require('fs');

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
let out = '';
for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const navMatch = content.match(/<ul class="nav-menu"[^>]*>([\s\S]*?)<\/ul>/);
  if (navMatch) {
    const hasEconomics = navMatch[1].includes('economics');
    out += `${file}: has Economics in nav-menu = ${hasEconomics}\n`;
  } else {
    out += `${file}: no nav-menu found\n`;
  }
}
fs.writeFileSync('scratch/nav_check_all_html.txt', out, 'utf8');
