const fs = require('fs');
const content = fs.readFileSync('recovery/original_i18n.js', 'utf8');

const regex = /(nav_economics|sec_economics):\s*"([^"]+)"/g;
let match;
let out = '';
while ((match = regex.exec(content)) !== null) {
  out += `${match[1]}: "${match[2]}"\n`;
}
fs.writeFileSync('scratch/extracted_keys_output.txt', out, 'utf8');
