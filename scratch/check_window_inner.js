const { execSync } = require('child_process');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const htmlSnippet = `data:text/html,<html><body><script>console.log('INNER_WIDTH:' + window.innerWidth + ' INNER_HEIGHT:' + window.innerHeight);</script></body></html>`;
const cmd = `"${chromePath}" --headless=new --window-size=360,800 --enable-logging=stderr --v=1 "${htmlSnippet}"`;
try {
  const out = execSync(cmd, { stdio: 'pipe' }).toString();
  console.log(out);
} catch (e) {
  console.log('stdout:', e.stdout ? e.stdout.toString() : '');
  console.log('stderr:', e.stderr ? e.stderr.toString() : '');
}
