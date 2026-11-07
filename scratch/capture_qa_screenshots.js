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
  { name: 'desktop_1440x1000', alias: 'phase_b_desktop_1440', width: 1440, height: 1000 },
  { name: 'tablet_768x1024', alias: 'phase_b_tablet_768', width: 768, height: 1024 },
  { name: 'mobile_390x844', alias: 'phase_b_mobile_390', width: 390, height: 844 }
];

console.log('Capturing responsive screenshots via Chrome Headless...');

viewports.forEach(vp => {
  const outPath1 = path.join(recoveryDir, `screenshot_${vp.name}.png`);
  const outPath2 = path.join(recoveryDir, `${vp.alias}.png`);
  const outPath3 = path.join(recoveryDir, `phase_b1_${vp.name.split('_')[0]}_${vp.width}.png`);
  
  const cmd = `"${chromePath}" --headless=new --screenshot="${outPath1}" --window-size=${vp.width},${vp.height} --hide-scrollbars --virtual-time-budget=3000 "${fileUrl}"`;
  try {
    execSync(cmd, { stdio: 'pipe' });
    fs.copyFileSync(outPath1, outPath2);
    fs.copyFileSync(outPath1, outPath3);
    console.log(`Captured ${vp.name} -> ${outPath1} (${fs.statSync(outPath1).size} bytes)`);
    console.log(`Saved copy -> ${outPath2}`);
    console.log(`Saved copy -> ${outPath3}`);
  } catch (err) {
    console.error(`Error capturing ${vp.name}:`, err.message);
  }
});

console.log('All screenshots captured successfully!');
