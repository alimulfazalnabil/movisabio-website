const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf-8');
const scriptRegex = /<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi;

let match;
let count = 0;
while ((match = scriptRegex.exec(html)) !== null) {
  count++;
  if (count === 2) {
    const code = match[1];
    fs.writeFileSync('scratch/script2_extracted.js', code);
    console.log('Saved script #2, length:', code.length);
    // Let's test lines
    const lines = code.split('\n');
    for (let i = 0; i < lines.length; i++) {
      try {
        new Function(lines.slice(0, i + 1).join('\n'));
      } catch (err) {
        if (!err.message.includes('Unexpected end of input')) {
          console.log(`Error around line ${i + 1}: ${err.message}`);
          console.log(`Line content: ${lines[i]}`);
          console.log(`Context:\n${lines.slice(Math.max(0, i - 3), i + 4).join('\n')}`);
          break;
        }
      }
    }
    break;
  }
}
