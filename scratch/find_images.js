const fs = require('fs');
const path = require('path');

function findImages(dir, results = []) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    if (f === 'node_modules' || f === '.git' || f === 'scratch' || f === 'osiris_project') continue;
    const p = path.join(dir, f);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) {
      findImages(p, results);
    } else if (/\.(png|jpg|jpeg|webp|svg|gif)$/i.test(f)) {
      results.push({ path: p.replace(/\\/g, '/'), size: stat.size, name: f });
    }
  }
  return results;
}

const images = findImages('.');
let out = 'Existing images in repository:\n';
images.forEach(img => {
  out += `- ${img.path} (${img.size} bytes)\n`;
});
fs.writeFileSync('scratch/image_assets.txt', out, 'utf8');
