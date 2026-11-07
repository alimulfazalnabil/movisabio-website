const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const recoveryDir = path.join(__dirname, '..', 'recovery');

const fileUrl = 'file:///' + path.resolve(__dirname, '..', 'index.html').replace(/\\/g, '/') + '#smart-city';

const viewports = [
  { name: 'desktop_1920x1080_slider', width: 1920, height: 1080 },
  { name: 'tablet_768x1024_slider', width: 768, height: 1024 }
];

viewports.forEach(vp => {
  const outPath = path.join(recoveryDir, `prompt7_${vp.name}_after.png`);
  const cmd = `"${chromePath}" --headless=new --screenshot="${outPath}" --window-size=${vp.width},${vp.height} --hide-scrollbars --virtual-time-budget=3500 "${fileUrl}"`;
  try {
    execSync(cmd, { stdio: 'pipe' });
    console.log(`Captured slider ${vp.name} -> ${outPath}`);
  } catch (err) {
    console.error(`Error capturing ${vp.name}:`, err.message);
  }
});
