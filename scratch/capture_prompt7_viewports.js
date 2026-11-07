const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const recoveryDir = path.join(__dirname, '..', 'recovery');
if (!fs.existsSync(recoveryDir)) {
  fs.mkdirSync(recoveryDir, { recursive: true });
}

const fileUrl = 'file:///' + path.resolve(__dirname, '..', 'index.html').replace(/\\/g, '/');

const viewports = [
  { name: 'desktop_1920x1080', width: 1920, height: 1080 },
  { name: 'laptop_1366x768', width: 1366, height: 768 },
  { name: 'tablet_768x1024', width: 768, height: 1024 },
  { name: 'mobile_390x844', width: 390, height: 844 },
  { name: 'small_mobile_360x800', width: 360, height: 800 }
];

console.log('Capturing responsive screenshots for all 5 requested viewports...');

viewports.forEach(vp => {
  const outPath = path.join(recoveryDir, `prompt7_${vp.name}.png`);
  const cmd = `"${chromePath}" --headless=new --screenshot="${outPath}" --window-size=${vp.width},${vp.height} --hide-scrollbars --virtual-time-budget=3500 "${fileUrl}"`;
  try {
    execSync(cmd, { stdio: 'pipe' });
    console.log(`Captured ${vp.name} (${vp.width}x${vp.height}) -> ${outPath} (${fs.statSync(outPath).size} bytes)`);
  } catch (err) {
    console.error(`Error capturing ${vp.name}:`, err.message);
  }
});

console.log('All 5 viewports captured successfully!');
