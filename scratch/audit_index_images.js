const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const regex = /<img[^>]+>/g;
let match;
let count = 0;
while ((match = regex.exec(html)) !== null) {
    count++;
    console.log(`[${count}] ${match[0]}`);
}
