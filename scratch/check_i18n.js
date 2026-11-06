const fs = require('fs');

const html = fs.readFileSync('platform.html', 'utf8');
const regex = /data-i18n="([^"]+)"/g;
let match;
const keys = new Set();
while ((match = regex.exec(html)) !== null) {
    keys.add(match[1]);
}

console.log('Unique data-i18n keys on platform.html:', keys.size);
console.log(Array.from(keys));
