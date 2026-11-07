const fs = require('fs');

let out = '';
try {
  require('../assets/js/i18n.js');
  out = 'assets/js/i18n.js syntax is VALID!\n';
} catch (e) {
  if (e.message.includes('window is not defined') || e.message.includes('document is not defined')) {
    out = 'assets/js/i18n.js syntax is VALID! (DOM reference expected in browser)\n';
  } else {
    out = 'Syntax error in assets/js/i18n.js: ' + e.message + '\n';
  }
}
fs.writeFileSync('scratch/validate_i18n_result.txt', out, 'utf8');
