const fs = require('fs');
const orig = fs.readFileSync('recovery/original_historical/index.html', 'utf8');
const secRegex = /<section[^>]*id=["']([^"']+)["'][^>]*>/g;
let m;
while ((m = secRegex.exec(orig)) !== null) {
  console.log(m[1]);
}
