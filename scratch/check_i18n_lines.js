const fs = require('fs');
const content = fs.readFileSync('assets/js/i18n.js', 'utf8');
const lines = content.split('\n');

let out = '';
lines.forEach((line, idx) => {
  if (line.match(/^\s*(en|de|pt|es|it|zh):\s*\{/)) {
    out += `Line ${idx + 1}: ${line.trim()}\n`;
  }
  if (line.includes('nav_') || line.includes('sec_economics')) {
    out += `  Line ${idx + 1}: ${line.trim()}\n`;
  }
});
fs.writeFileSync('scratch/i18n_lines_output.txt', out, 'utf8');
