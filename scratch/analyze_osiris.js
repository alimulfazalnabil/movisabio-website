const fs = require('fs');
const path = require('path');

const osirisRoot = path.resolve('..', 'osiris-master');

console.log('OSIRIS root:', osirisRoot);

// 1. Check package.json
const pkgPath = path.join(osirisRoot, 'package.json');
if (fs.existsSync(pkgPath)) {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  console.log('\n--- PACKAGE.JSON ---');
  console.log('Name:', pkg.name);
  console.log('Version:', pkg.version);
  console.log('Dependencies:', Object.keys(pkg.dependencies || {}));
  console.log('DevDependencies:', Object.keys(pkg.devDependencies || {}));
}

// 2. Scan all API routes in src/app/api
const apiDir = path.join(osirisRoot, 'src', 'app', 'api');
function getFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(fullPath));
    } else {
      results.push(fullPath);
    }
  });
  return results;
}

const allApiFiles = getFiles(apiDir);
const routeFiles = allApiFiles.filter(f => path.basename(f).startsWith('route.'));
console.log('\n--- NEXT.JS API ROUTES ---');
console.log('Total route files in src/app/api:', routeFiles.length);

const routesList = routeFiles.map(f => {
  const rel = path.relative(apiDir, f);
  const routePath = '/api/' + path.dirname(rel).replace(/\\/g, '/');
  // Check HTTP methods in the file
  const content = fs.readFileSync(f, 'utf8');
  const methods = [];
  ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'].forEach(m => {
    if (new RegExp(`export\\s+(async\\s+)?function\\s+${m}\\b`).test(content)) {
      methods.push(m);
    }
  });
  return { path: routePath, file: rel, methods, length: content.length };
});

console.log('Sample routes (first 10):', routesList.slice(0, 10));

// 3. Scan intel/ service
const intelDir = path.join(osirisRoot, 'intel');
console.log('\n--- INTEL DIRECTORY ---');
if (fs.existsSync(intelDir)) {
  const intelFiles = getFiles(intelDir);
  console.log('Total files in intel/:', intelFiles.length);
  intelFiles.forEach(f => console.log('  -', path.relative(intelDir, f)));
} else {
  console.log('intel/ directory does not exist!');
}

// 4. Scan public/ directory for CCTV or data files
const publicDir = path.join(osirisRoot, 'public');
console.log('\n--- PUBLIC DATA ASSETS ---');
if (fs.existsSync(publicDir)) {
  const publicFiles = getFiles(publicDir);
  console.log('Total files in public/:', publicFiles.length);
  const jsonFiles = publicFiles.filter(f => f.endsWith('.json') || f.endsWith('.geojson') || f.endsWith('.csv'));
  jsonFiles.forEach(f => {
    const stat = fs.statSync(f);
    console.log(`  - ${path.relative(publicDir, f)} (${(stat.size / 1024).toFixed(1)} KB)`);
  });
}

// 5. Scan src/layers or map components
const srcDir = path.join(osirisRoot, 'src');
const allSrcFiles = getFiles(srcDir);
console.log('\n--- SRC CODEBASE SUMMARY ---');
console.log('Total files in src/:', allSrcFiles.length);

const summary = {
  routes: routesList,
};
fs.writeFileSync(path.resolve('scratch', 'osiris_scan_summary.json'), JSON.stringify(summary, null, 2));
console.log('Saved summary to scratch/osiris_scan_summary.json');
