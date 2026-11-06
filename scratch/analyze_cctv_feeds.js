const fs = require('fs');
const path = require('path');

const osirisRoot = path.resolve('..', 'osiris-master');
const cctvDir = path.join(osirisRoot, 'src', 'app', 'api', 'cctv');

const files = fs.readdirSync(cctvDir);
const cctvFiles = files.filter(f => f.endsWith('.ts') && !f.endsWith('.test.ts'));

console.log('--- CCTV SOURCE FILES ---');
console.log('Total CCTV provider files:', cctvFiles.length);

const results = [];

cctvFiles.forEach(f => {
  const filePath = path.join(cctvDir, f);
  const code = fs.readFileSync(filePath, 'utf8');

  // Count hardcoded camera objects or generated entries
  // Check for arrays of objects with { id:, lat:, lng:, ... }
  const matches = [...code.matchAll(/\{\s*id\s*:\s*['"`]([^'"`]+)['"`]/g)];
  
  // Check external fetches
  const fetches = [];
  const fetchRegex = /stealthFetch\s*\(\s*['"`]([^'"`]+)['"`]/g;
  let fm;
  while ((fm = fetchRegex.exec(code)) !== null) {
    fetches.push(fm[1]);
  }
  const fetchRegex2 = /fetch\s*\(\s*['"`](https?:\/\/[^'"`]+)['"`]/g;
  while ((fm = fetchRegex2.exec(code)) !== null) {
    fetches.push(fm[1]);
  }

  results.push({
    file: f,
    hardcodedCount: matches.length,
    externalFetches: fetches,
    codeLength: code.length
  });
});

let totalHardcoded = 0;
results.forEach(r => {
  totalHardcoded += r.hardcodedCount;
  if (r.hardcodedCount > 0 || r.externalFetches.length > 0) {
    console.log(`- ${r.file}: ${r.hardcodedCount} embedded cameras, ${r.externalFetches.length} external fetch endpoints`);
  }
});

console.log('\nTotal static/generated embedded cameras:', totalHardcoded);

// Now inspect route.ts to see regions and estimated feed counts
const routeCode = fs.readFileSync(path.join(cctvDir, 'route.ts'), 'utf8');
const regionMatches = [...routeCode.matchAll(/case\s+['"`]([a-z0-9_-]+)['"`]\s*:/gi)].map(m => m[1]);
console.log('\nSupported regions in route.ts:', [...new Set(regionMatches)]);

fs.writeFileSync(path.resolve('scratch', 'cctv_analysis.json'), JSON.stringify({
  totalHardcoded,
  regions: [...new Set(regionMatches)],
  files: results
}, null, 2));
