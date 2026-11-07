const fs = require('fs');

const origHtml = fs.readFileSync('recovery/original_historical/index.html', 'utf8');
const currHtml = fs.readFileSync('index.html', 'utf8');

let out = '=== INSPECTION OF ABOUT & PORTFOLIO ===\n\n';

// 1. Check About section in original
const origAboutMatch = origHtml.match(/<section[^>]*id=["']company["'][^>]*>([\s\S]*?)<\/section>/i) ||
                       origHtml.match(/<section[^>]*id=["']about["'][^>]*>([\s\S]*?)<\/section>/i);
out += '--- Original Historical About/Company section ---\n';
if (origAboutMatch) {
  out += origAboutMatch[0].substring(0, 800) + '...\n\n';
} else {
  out += 'No section id="company" or "about" in original_historical/index.html\n\n';
}

// 2. Check current About in index.html
const currAboutMatch = currHtml.match(/<section[^>]*id=["']about["'][^>]*>([\s\S]*?)<\/section>/i);
out += '--- Current About in index.html ---\n';
if (currAboutMatch) {
  out += currAboutMatch[0].substring(0, 800) + '...\n\n';
} else {
  out += 'No section id="about" in index.html\n\n';
}

// 3. Check about.html
if (fs.existsSync('about.html')) {
  out += '--- about.html exists (length: ' + fs.readFileSync('about.html', 'utf8').length + ') ---\n';
}

// 4. Check original Portfolio in historical
const origProjectsMatch = origHtml.match(/const\s+projects\s*=\s*\[([\s\S]*?)\];/);
out += '--- Original Projects array in historical index.html ---\n';
if (origProjectsMatch) {
  out += origProjectsMatch[0].substring(0, 1000) + '...\n\n';
}

// 5. Check current techSolutions array in index.html
const currSolutionsMatch = currHtml.match(/const\s+techSolutions\s*=\s*\[([\s\S]*?)\];/);
out += '--- Current techSolutions array in index.html ---\n';
if (currSolutionsMatch) {
  out += 'techSolutions length in index.html: ' + currSolutionsMatch[0].length + ' characters\n\n';
}

fs.writeFileSync('scratch/sections_detail.txt', out, 'utf8');
