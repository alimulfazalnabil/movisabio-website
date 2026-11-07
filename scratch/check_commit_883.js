const { execSync } = require('child_process');
const fs = require('fs');

let out = '';
try {
  out += execSync('git log --grep="economics" -n 5 --oneline', { encoding: 'utf8' }) + '\n';
  out += execSync('git show 6390433:index.html | grep -n "<section" -B 2 -A 2', { encoding: 'utf8' }) + '\n';
} catch (e) {
  out += 'Error: ' + e.message;
}
fs.writeFileSync('scratch/commit_check_output.txt', out, 'utf8');
