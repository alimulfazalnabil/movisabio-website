const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
console.log('HTML files in root:', files);
