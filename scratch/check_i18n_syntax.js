const vm = require('vm');
const fs = require('fs');
const path = require('path');

const code = fs.readFileSync(path.join(__dirname, '..', 'assets', 'js', 'i18n.js'), 'utf8');
try {
  new vm.Script(code);
  console.log('assets/js/i18n.js is 100% syntactically valid!');
} catch (e) {
  console.error('Syntax error:', e);
  process.exit(1);
}
