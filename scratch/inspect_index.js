const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf-8');
const lines = content.split('\n');

console.log('--- SECTIONS IN INDEX.HTML ---');
lines.forEach((line, i) => {
  const match = line.match(/<(section|header|nav|footer)[^>]*id=["']([^"']+)["']/i);
  if (match) {
    console.log(`Line ${i + 1}: <${match[1]} id="${match[2]}">`);
  }
});
