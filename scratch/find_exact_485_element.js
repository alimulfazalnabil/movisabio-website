const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const testHtmlPath = path.join(__dirname, 'test_width_finder.html');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf-8');

const injected = `
<script>
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const wideElements = [];
    document.querySelectorAll('*').forEach(el => {
      if (['HTML', 'BODY', 'SCRIPT', 'STYLE'].includes(el.tagName)) return;
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      if (rect.width > 360 || rect.right > 360) {
        let sel = el.tagName.toLowerCase();
        if (el.id) sel += '#' + el.id;
        if (el.className && typeof el.className === 'string') sel += '.' + el.className.trim().split(/\\s+/).join('.');
        wideElements.push({
          selector: sel,
          width: Math.round(rect.width),
          right: Math.round(rect.right),
          left: Math.round(rect.left),
          scrollWidth: el.scrollWidth,
          styleWidth: style.width,
          styleMinWidth: style.minWidth
        });
      }
    });

    const pre = document.createElement('pre');
    pre.id = 'wide-report';
    pre.textContent = JSON.stringify(wideElements);
    document.body.appendChild(pre);
  }, 1000);
});
</script>
`;

fs.writeFileSync(testHtmlPath, html.replace('</body>', injected + '</body>'), 'utf-8');
const fileUrl = 'file:///' + testHtmlPath.replace(/\\/g, '/');

const cmd = `"${chromePath}" --headless=new --dump-dom --window-size=360,800 --virtual-time-budget=2500 "${fileUrl}"`;
try {
  const stdout = execSync(cmd, { maxBuffer: 10 * 1024 * 1024 }).toString();
  const m = stdout.match(/<pre id="wide-report">([\s\S]*?)<\/pre>/);
  if (m) {
    const list = JSON.parse(m[1]);
    console.log(`Found ${list.length} wide elements at 360px window width:`);
    // Group and sort by width descending
    list.sort((a, b) => b.width - a.width);
    list.slice(0, 30).forEach(item => {
      console.log(`- ${item.selector}: width=${item.width}px, right=${item.right}px, left=${item.left}px, styleWidth=${item.styleWidth}, minWidth=${item.styleMinWidth}`);
    });
  } else {
    console.log('No wide-report found.');
  }
} catch (e) {
  console.error('Error:', e.message);
}

if (fs.existsSync(testHtmlPath)) fs.unlinkSync(testHtmlPath);
