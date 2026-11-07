const fs = require('fs');
const content = fs.readFileSync('recovery/original_i18n.js', 'utf8');

let out = '';
const langs = ['en', 'es', 'pt', 'it', 'de', 'zh'];
for (const l of langs) {
  // Find where l: { starts
  const startIdx = content.indexOf(`${l}: {`);
  if (startIdx !== -1) {
    // Find next language or end
    const nextLangIdx = content.indexOf('};', startIdx);
    const chunk = content.substring(startIdx, nextLangIdx);
    const secMatch = chunk.match(/sec_economics:\s*"([^"]+)"/);
    const navMatch = chunk.match(/nav_economics:\s*"([^"]+)"/);
    out += `Lang [${l}]: nav_economics = "${navMatch ? navMatch[1] : 'NOT FOUND'}", sec_economics = "${secMatch ? secMatch[1] : 'NOT FOUND'}"\n`;
  } else {
    out += `Lang [${l}] start not found\n`;
  }
}
fs.writeFileSync('scratch/check_lang_mapping_output.txt', out, 'utf8');
