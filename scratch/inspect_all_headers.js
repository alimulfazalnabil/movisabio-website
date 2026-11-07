const fs = require('fs');

const files = [
  'index.html',
  'about.html',
  'platform.html',
  'solutions.html',
  'technology.html',
  'leadership.html',
  'global.html',
  'research.html',
  'partners.html',
  'contact.html'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf-8');
    const hasNavMenu = content.includes('id="nav-menu"');
    const hasEconomics = content.includes('nav_economics') || content.includes('#economics');
    console.log(`${file}: hasNavMenu=${hasNavMenu}, hasEconomics=${hasEconomics}`);
  }
});
