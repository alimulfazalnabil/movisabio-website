const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const previewPath = path.resolve('scratch/preview_economics.html').replace(/\\/g, '/');
const desktopOut = path.resolve('recovery/restored_economics_desktop.png').replace(/\\/g, '/');
const mobileOut = path.resolve('recovery/restored_economics_mobile.png').replace(/\\/g, '/');

console.log('Capturing Full-Height Desktop 1440x2500...');
execSync(`"${chromePath}" --headless=new --disable-gpu --window-size=1440,2500 --allow-file-access-from-files --screenshot="${desktopOut}" "file:///${previewPath}"`, { stdio: 'inherit' });

console.log('Capturing Full-Height Mobile 390x3600...');
execSync(`"${chromePath}" --headless=new --disable-gpu --window-size=390,3600 --allow-file-access-from-files --screenshot="${mobileOut}" "file:///${previewPath}"`, { stdio: 'inherit' });

console.log('Desktop file exists:', fs.existsSync(desktopOut), 'Size:', fs.statSync(desktopOut).size);
console.log('Mobile file exists:', fs.existsSync(mobileOut), 'Size:', fs.statSync(mobileOut).size);
