const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'index.html');
const rawHtml = fs.readFileSync(htmlPath, 'utf8');

// We want to isolate the sections inside <main id="main-content"> ... </main>
const mainStart = rawHtml.indexOf('<main id="main-content">');
const mainEnd = rawHtml.indexOf('</main>');

if (mainStart === -1 || mainEnd === -1) {
  console.error('Could not find <main id="main-content"> or </main>');
  process.exit(1);
}

const beforeMain = rawHtml.substring(0, mainStart + '<main id="main-content">'.length);
const mainContent = rawHtml.substring(mainStart + '<main id="main-content">'.length, mainEnd);
const afterMain = rawHtml.substring(mainEnd);

console.log('mainContent length:', mainContent.length);

// Let's test finding the sections
