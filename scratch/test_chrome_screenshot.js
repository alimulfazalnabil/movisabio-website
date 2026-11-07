const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const htmlPath = path.resolve('index.html').replace(/\\/g, '/');
const fileUrl = `file:///${htmlPath}#economics`;

const desktopOut = path.resolve('recovery/restored_economics_desktop.png').replace(/\\/g, '/');
const mobileOut = path.resolve('recovery/restored_economics_mobile.png').replace(/\\/g, '/');

let log = '';

try {
  // Desktop 1440x900
  const cmdDesktop = `"${chromePath}" --headless=new --disable-gpu --window-size=1440,900 --virtual-time-budget=3000 --screenshot="${desktopOut}" "${fileUrl}"`;
  log += 'Running Desktop:\n' + cmdDesktop + '\n';
  execSync(cmdDesktop, { stdio: 'inherit' });
  log += 'Desktop screenshot captured: ' + fs.existsSync(desktopOut) + '\n';
} catch (e) {
  log += 'Desktop error: ' + e.message + '\n';
}

try {
  // Mobile 390x844
  const cmdMobile = `"${chromePath}" --headless=new --disable-gpu --window-size=390,844 --virtual-time-budget=3000 --screenshot="${mobileOut}" "${fileUrl}"`;
  log += 'Running Mobile:\n' + cmdMobile + '\n';
  execSync(cmdMobile, { stdio: 'inherit' });
  log += 'Mobile screenshot captured: ' + fs.existsSync(mobileOut) + '\n';
} catch (e) {
  log += 'Mobile error: ' + e.message + '\n';
}

fs.writeFileSync('scratch/screenshot_test_result.txt', log, 'utf8');
