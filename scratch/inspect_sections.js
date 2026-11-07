const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const lines = html.split('\n');

console.log('Total lines in index.html:', lines.length);

const sectionRegex = /<section[^>]*id=["']([^"']+)["'][^>]*>/g;
let match;
while ((match = sectionRegex.exec(html)) !== null) {
  const lineNo = html.substring(0, match.index).split('\n').length;
  console.log(`Line ${lineNo}: id="${match[1]}" -> ${match[0].substring(0, 80)}`);
}
