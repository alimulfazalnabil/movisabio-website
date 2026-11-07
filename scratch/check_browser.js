const fs = require('fs');
const { execSync } = require('child_process');

let out = '';
try {
  const p = require('puppeteer');
  out += 'puppeteer is available\n';
} catch (e) {
  out += 'puppeteer not installed in current dir\n';
}

try {
  const p = require('playwright');
  out += 'playwright is available\n';
} catch (e) {
  out += 'playwright not installed in current dir\n';
}

// Check Chrome executable
const chromePaths = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
];

for (const cp of chromePaths) {
  if (fs.existsSync(cp)) {
    out += `Found browser at: ${cp}\n`;
  }
}

fs.writeFileSync('scratch/browser_check.txt', out, 'utf8');
