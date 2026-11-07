const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf-8');
const scriptRegex = /<script(?![^>]*src=)([^>]*)>([\s\S]*?)<\/script>/gi;

let match;
let count = 0;
while ((match = scriptRegex.exec(html)) !== null) {
  count++;
  const attrs = match[1];
  const code = match[2];
  if (attrs.includes('ld+json')) {
    console.log(`Script #${count} is JSON-LD. Validating with JSON.parse...`);
    try {
      JSON.parse(code);
      console.log(`JSON-LD #${count} is valid JSON.`);
    } catch (e) {
      console.error(`JSON-LD #${count} error:`, e.message);
    }
  } else {
    console.log(`Script #${count} is JS. Validating with new Function...`);
    try {
      new Function(code);
      console.log(`Script #${count} JS is 100% VALID!`);
    } catch (e) {
      console.error(`Script #${count} JS error:`, e.message);
    }
  }
}
