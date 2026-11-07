const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf-8');
const scriptRegex = /<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi;

let match;
let count = 0;
while ((match = scriptRegex.exec(html)) !== null) {
  count++;
  const code = match[1];
  try {
    new Function(code);
    console.log(`Inline script #${count} syntax is VALID.`);
  } catch (err) {
    console.error(`Inline script #${count} syntax error:`, err.message);
    process.exit(1);
  }
}
console.log(`All ${count} inline scripts in index.html are syntax-valid!`);
