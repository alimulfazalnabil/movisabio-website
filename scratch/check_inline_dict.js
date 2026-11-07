const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const hasDict = html.includes('dictionaries') || html.includes('translations');
console.log('Has dictionaries in index.html:', hasDict);
fs.writeFileSync('scratch/inline_dict_result.txt', `Has dictionaries in index.html: ${hasDict}\n`, 'utf8');
