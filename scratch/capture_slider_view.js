const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const recoveryDir = path.join(__dirname, '..', 'recovery');

// Let's create a temporary test wrapper that includes the stylesheets and the slider HTML snippet so it renders at top of page!
const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

// Extract head stylesheets and slider element
const headMatch = indexHtml.match(/<head>[\s\S]*?<\/head>/);
const sliderMatch = indexHtml.match(/<div class="smart-city-slider"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/);

const testHtml = `<!DOCTYPE html>
<html>
${headMatch ? headMatch[0] : ''}
<body style="background: #07111F; padding: 40px 20px;">
  <div style="max-width: 1080px; margin: 0 auto;">
    <h2 style="color: #fff; margin-bottom: 20px; font-family: sans-serif;">Smart City Flagship Slider (16:9 Display Verification)</h2>
    ${sliderMatch ? sliderMatch[0] : ''}
  </div>
</body>
</html>`;

const testFile = path.join(__dirname, 'slider_test.html');
fs.writeFileSync(testFile, testHtml);

const fileUrl = 'file:///' + testFile.replace(/\\/g, '/');

const viewports = [
  { name: 'slider_desktop_1920x1080', width: 1920, height: 1080 },
  { name: 'slider_tablet_768x1024', width: 768, height: 1024 },
  { name: 'slider_mobile_390x844', width: 390, height: 844 }
];

viewports.forEach(vp => {
  const outPath = path.join(recoveryDir, `prompt7_${vp.name}_verified.png`);
  const cmd = `"${chromePath}" --headless=new --screenshot="${outPath}" --window-size=${vp.width},${vp.height} --hide-scrollbars --virtual-time-budget=3000 "${fileUrl}"`;
  try {
    execSync(cmd, { stdio: 'pipe' });
    console.log(`Captured ${vp.name} -> ${outPath} (${fs.statSync(outPath).size} bytes)`);
  } catch (e) {
    console.error(e.message);
  }
});

console.log('Slider captures complete!');
