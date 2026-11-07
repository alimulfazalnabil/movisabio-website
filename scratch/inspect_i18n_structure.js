const fs = require('fs');
const content = fs.readFileSync('assets/js/i18n.js', 'utf-8');
const lines = content.split('\n');

const langs = ['en', 'de', 'pt', 'es', 'it', 'zh'];
langs.forEach(lang => {
  lines.forEach((line, i) => {
    if (new RegExp(`^\\s*${lang}:\\s*\\{`).test(line)) {
      console.log(`Language ${lang} starts at line ${i + 1}`);
    }
  });
});
