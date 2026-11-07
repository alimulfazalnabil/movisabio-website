const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf-8');
const lines = content.split('\n');

lines.forEach((line, i) => {
  if (line.includes('const techSolutions = [')) {
    console.log('techSolutions starts at line', i + 1);
  }
  if (line.includes('// --- 3. PRESERVED VIDEO DATABASE ---')) {
    console.log('techSolutions ends around line', i + 1);
  }
  if (line.includes('function renderSolutions()')) {
    console.log('renderSolutions starts at line', i + 1);
  }
});
