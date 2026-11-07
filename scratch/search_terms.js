const fs = require('fs');

function searchInFiles(dir, term) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = `${dir}/${file}`;
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'osiris_project' && file !== 'recovery' && file !== 'scratch') {
        searchInFiles(fullPath, term);
      }
    } else if (file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.css')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.toLowerCase().includes(term.toLowerCase())) {
        console.log(`Found "${term}" in ${fullPath}`);
      }
    }
  }
}

console.log('Searching for "economics":');
searchInFiles('.', 'economics');

console.log('\nSearching for "1.1 Trillion":');
searchInFiles('.', '1.1 Trillion');
