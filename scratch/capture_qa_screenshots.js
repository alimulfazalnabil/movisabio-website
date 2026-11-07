const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
if (!fs.existsSync(chromePath)) {
  console.error('Chrome not found at', chromePath);
  process.exit(1);
}

const recoveryDir = path.join(__dirname, '..', 'recovery');
if (!fs.existsSync(recoveryDir)) {
  fs.mkdirSync(recoveryDir, { recursive: true });
}

const fileUrl = 'file:///' + path.resolve(__dirname, '..', 'index.html').replace(/\\/g, '/');

const viewports = [
  { name: 'desktop_1440x1000', width: 1440, height: 1000 },
  { name: 'tablet_768x1024', width: 768, height: 1024 },
  { name: 'mobile_390x844', width: 390, height: 844 }
];

console.log('Capturing responsive screenshots via Chrome Headless...');

viewports.forEach(vp => {
  const outPath = path.join(recoveryDir, `screenshot_${vp.name}.png`);
  // Use --virtual-time-budget=2000 to allow CSS and JS animations/render to settle
  const cmd = `"${chromePath}" --headless=new --screenshot="${outPath}" --window-size=${vp.width},${vp.height} --hide-scrollbars --virtual-time-budget=3000 "${fileUrl}"`;
  try {
    execSync(cmd, { stdio: 'pipe' });
    console.log(`Captured ${vp.name} -> ${outPath} (${fs.statSync(outPath).size} bytes)`);
  } catch (err) {
    console.error(`Error capturing ${vp.name}:`, err.message);
  }
});

console.log('All screenshots captured successfully!');
