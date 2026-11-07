const fs = require('fs');

const sec = fs.readFileSync('scratch/historical_economics_section.html', 'utf8');
const i18nMatches = [...sec.matchAll(/data-i18n=["']([^"']+)["']/g)];
console.log('data-i18n attributes found in historical_economics_section.html:');
i18nMatches.forEach(m => console.log(' - ' + m[1]));

// Also check recovery/original_i18n.js for any other economics keys
const origI18n = fs.readFileSync('recovery/original_i18n.js', 'utf8');
const econKeys = origI18n.match(/[a-zA-Z0-9_]*econ[a-zA-Z0-9_]*/gi) || [];
console.log('Economics keys in recovery/original_i18n.js:', [...new Set(econKeys)]);
