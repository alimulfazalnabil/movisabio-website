const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

const regex = /<section[^>]*id=["']([^"']+)["'][^>]*style=["']([^"']*)["'][^>]*>|<section[^>]*class=["']([^"']*)["'][^>]*id=["']([^"']+)["'][^>]*>/gi;
let m;
while ((m = regex.exec(html)) !== null) {
  console.log(m[0]);
}
