const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'index.html');
const lines = fs.readFileSync(htmlPath, 'utf8').split('\n');

const sectionStarts = [];
lines.forEach((line, idx) => {
  const m = line.match(/<section[^>]*id=["']([^"']+)["'][^>]*>/i);
  if (m) {
    sectionStarts.push({ id: m[1], line: idx + 1, tag: line.trim() });
  }
});

console.log('Section starts:');
sectionStarts.forEach(s => console.log(`Line ${s.line}: #${s.id} -> ${s.tag}`));
