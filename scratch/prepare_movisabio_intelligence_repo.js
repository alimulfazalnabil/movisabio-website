const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const sourceDir = path.resolve('..', 'osiris-master');
const targetDir = path.resolve('..', 'movisabio-intelligence');

console.log('Source:', sourceDir);
console.log('Target:', targetDir);

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
  console.log('Created target directory:', targetDir);
}

// List of top-level items to copy
const allowedEntries = [
  'src',
  'intel',
  'nginx',
  'public',
  'engine',
  'docs',
  'tools',
  'package.json',
  'package-lock.json',
  'next.config.ts',
  'tsconfig.json',
  'Dockerfile',
  '.dockerignore',
  'docker-compose.yml',
  'DOCKER.md',
  'README.md',
  'LICENSE',
  'SECURITY.md',
  '.gitignore',
  '.gitattributes',
  'eslint.config.mjs',
  'postcss.config.mjs',
  'vitest.config.ts',
  '.env.example'
];

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach(child => {
      // Exclude heavy/cache directories
      if (child === 'node_modules' || child === '.next' || child === '.cache' || child === 'dist') return;
      copyRecursive(path.join(src, child), path.join(dest, child));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

allowedEntries.forEach(entry => {
  const srcPath = path.join(sourceDir, entry);
  const destPath = path.join(targetDir, entry);
  if (fs.existsSync(srcPath)) {
    copyRecursive(srcPath, destPath);
    console.log(`Copied ${entry}`);
  } else {
    console.warn(`Source item not found: ${entry}`);
  }
});

// Initialize git in movisabio-intelligence
try {
  execSync('git init', { cwd: targetDir, stdio: 'inherit' });
  execSync('git add .', { cwd: targetDir, stdio: 'inherit' });
  execSync('git commit -m "feat(baseline): initialize MoviSabio Intelligence platform from OSIRIS baseline"', { cwd: targetDir, stdio: 'inherit' });
  console.log('Git repository initialized and committed successfully in movisabio-intelligence.');
} catch (e) {
  console.error('Git initialization error:', e.message);
}
