const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Searching git history for "1.1 Trillion" or "TAM"...');

try {
  const gitLog = execSync('git log -S "1.1 Trillion" --oneline', { encoding: 'utf8' });
  console.log('Git log -S "1.1 Trillion":\n', gitLog);
} catch (e) {
  console.log('git log -S error:', e.message);
}

try {
  const gitLog2 = execSync('git log -S "Palantir" --oneline', { encoding: 'utf8' });
  console.log('Git log -S "Palantir":\n', gitLog2);
} catch (e) {
  console.log('git log -S Palantir error:', e.message);
}

try {
  const gitLog3 = execSync('git log -S "Unit Economics" --oneline', { encoding: 'utf8' });
  console.log('Git log -S "Unit Economics":\n', gitLog3);
} catch (e) {
  console.log('git log -S Unit Economics error:', e.message);
}

// Check recovery folder
const recoveryDir = path.resolve('recovery');
if (fs.existsSync(recoveryDir)) {
  fs.readdirSync(recoveryDir).forEach(f => {
    if (f.endsWith('.md') || f.endsWith('.txt') || f.endsWith('.json') || f.endsWith('.html') || f.endsWith('.js')) {
      const full = path.join(recoveryDir, f);
      const stat = fs.statSync(full);
      if (stat.isFile()) {
        const text = fs.readFileSync(full, 'utf8');
        if (text.includes('1.1 Trillion') || text.includes('TAM') || text.includes('Palantir') || text.includes('Economics')) {
          console.log(`Found match in recovery/${f}!`);
        }
      }
    }
  });
}

// Check artifacts directory in appDataDir
const artifactDir = 'C:\\Users\\aflna\\.gemini\\antigravity\\brain\\2a6d3723-354c-4cb6-a2c2-4abe06b62c60';
if (fs.existsSync(artifactDir)) {
  fs.readdirSync(artifactDir).forEach(f => {
    if (f.endsWith('.md')) {
      const text = fs.readFileSync(path.join(artifactDir, f), 'utf8');
      if (text.includes('1.1 Trillion') || text.includes('Palantir') || text.includes('Unit Economics')) {
        console.log(`Found match in artifact: ${f}`);
      }
    }
  });
}
