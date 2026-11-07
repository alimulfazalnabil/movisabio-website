const { execSync } = require('child_process');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const cmd = `"${chromePath}" --headless=old --dump-dom --window-size=360,800 "data:text/html,<html><head><meta name='viewport' content='width=device-width,initial-scale=1'></head><body><script>document.write(window.innerWidth + 'x' + window.innerHeight);</script></body></html>"`;

try {
  const out = execSync(cmd).toString();
  console.log('Result with headless=old:', out);
} catch (e) {
  console.error(e);
}
