const fs = require('fs');

const sec = fs.readFileSync('scratch/historical_economics_section.html', 'utf8');
const i18nMatches = [...sec.matchAll(/data-i18n=["']([^"']+)["']/g)];
let out = 'data-i18n attributes found in historical_economics_section.html:\n';
i18nMatches.forEach(m => out += ' - ' + m[1] + '\n');

const origI18n = fs.readFileSync('recovery/original_i18n.js', 'utf8');
const econKeys = origI18n.match(/[a-zA-Z0-9_]*econ[a-zA-Z0-9_]*/gi) || [];
out += '\nEconomics keys in recovery/original_i18n.js:\n' + [...new Set(econKeys)].join(', ') + '\n';

fs.writeFileSync('scratch/combined_check.txt', out, 'utf8');
