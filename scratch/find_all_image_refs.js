const fs = require('fs');
const path = require('path');

const cssDir = path.join(__dirname, '..', 'assets', 'css');
const cssFiles = fs.readdirSync(cssDir).filter(f => f.endsWith('.css'));

console.log('--- Background images referenced in CSS files ---');
cssFiles.forEach(file => {
  const filePath = path.join(cssDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  const matches = content.match(/url\(['"]?([^'")]+)['"]?\)/gi) || [];
  if (matches.length > 0) {
    console.log(`\nIn ${file}:`);
    matches.forEach(m => console.log(`   ${m}`));
  }
});

const htmlFiles = fs.readdirSync(path.join(__dirname, '..')).filter(f => f.endsWith('.html'));
console.log('\n--- Images referenced in all HTML files ---');
htmlFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  const content = fs.readFileSync(filePath, 'utf-8');
  const imgMatches = content.match(/<img\b[^>]*src=["']([^"']+)["']/gi) || [];
  const bgMatches = content.match(/background(?:-image)?:\s*url\(['"]?([^'")]+)['"]?\)/gi) || [];
  if (imgMatches.length > 0 || bgMatches.length > 0) {
    console.log(`\nIn ${file} (${imgMatches.length} <img> tags, ${bgMatches.length} inline bg urls):`);
    imgMatches.forEach(m => console.log(`   ${m}`));
    bgMatches.forEach(m => console.log(`   ${m}`));
  }
});
