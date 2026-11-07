const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf-8');
const scriptRegex = /<script(?![^>]*src=)([^>]*)>([\s\S]*?)<\/script>/gi;

let match;
let count = 0;
while ((match = scriptRegex.exec(html)) !== null) {
  count++;
  if (count === 3) {
    const code = match[2];
    fs.writeFileSync('scratch/inline_script_3.js', code);
    console.log('Saved inline_script_3.js, lines:', code.split('\n').length);
    // Let's run node -c scratch/inline_script_3.js
    const { execSync } = require('child_process');
    try {
      execSync('node -c scratch/inline_script_3.js', { encoding: 'utf-8' });
      console.log('node -c passed!');
    } catch (e) {
      console.log('node -c error output:\n', e.stderr || e.stdout || e.message);
    }
  }
}
