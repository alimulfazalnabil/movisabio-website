const fs = require('fs');
const path = require('path');

const osirisRoot = path.resolve('..', 'osiris-master');
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

const allFiles = getFiles(apiDir);
const realRoutes = allFiles.filter(f => path.basename(f) === 'route.ts' || path.basename(f) === 'route.js');

const analysis = [];

realRoutes.forEach(f => {
  const rel = path.relative(apiDir, f);
  const routePath = '/api/' + path.dirname(rel).replace(/\\/g, '/');
  const code = fs.readFileSync(f, 'utf8');

  // Find all process.env occurrences
  const envVars = [...new Set([...code.matchAll(/process\.env\.([A-Z0-9_]+)/g)].map(m => m[1]))];

  // Find fetch URLs
  const fetches = [];
  const fetchRegex = /fetch\s*\(\s*([`'"][^`'"]+[`'"]|`[^`]+`)/g;
  let match;
  while ((match = fetchRegex.exec(code)) !== null) {
    fetches.push(match[1].trim());
  }

  // Determine data classification:
  // LIVE: calls external real HTTP API
  // CACHED: uses sourceCache, in-memory cache, or Redis/TTL
  // STATIC: imports local JSON / reads static file
  // SIMULATED: generates synthetic physics/agent models
  // MOCK: returns hardcoded or Math.random dummy data
  // FALLBACK_MOCK: calls external API, but catches error and returns mock data

  const usesCache = /sourceCache|cache|lru|ttl|stale-while-revalidate/i.test(code);
  const hasExternalFetch = fetches.some(u => u.includes('http') || u.includes('process.env'));
  const hasMockGeneration = /mock|dummy|synthetic|faker/i.test(code);
  const hasRandom = /Math\.random/i.test(code);
  const hasStaticData = /\.json['"]|fs\.readFile|staticData/i.test(code);
  const isSimulation = /agent|forecast|simulate|prediction|engine|scenario/i.test(code);

  let classification = 'UNKNOWN';
  if (hasExternalFetch && !hasMockGeneration && !hasRandom) {
    classification = 'LIVE_STRICT';
  } else if (hasExternalFetch && (hasMockGeneration || hasRandom)) {
    classification = 'LIVE_WITH_FALLBACK_MOCK';
  } else if (!hasExternalFetch && hasStaticData) {
    classification = 'STATIC';
  } else if (!hasExternalFetch && isSimulation) {
    classification = 'SIMULATED';
  } else if (!hasExternalFetch && (hasMockGeneration || hasRandom)) {
    classification = 'MOCK_ONLY';
  } else if (hasExternalFetch) {
    classification = 'LIVE';
  }

  analysis.push({
    route: routePath,
    file: rel,
    classification,
    usesCache,
    envVars,
    fetches,
    codeLength: code.length
  });
});

fs.writeFileSync(path.resolve('scratch', 'route_provider_analysis.json'), JSON.stringify(analysis, null, 2));

console.log('Total operational route files analyzed:', analysis.length);

const byClass = {};
analysis.forEach(a => {
  byClass[a.classification] = (byClass[a.classification] || 0) + 1;
});
console.log('\n--- DATA NATURE CLASSIFICATION ---');
console.table(byClass);

// Print all env vars used across routes
const allEnvs = [...new Set(analysis.flatMap(a => a.envVars))].sort();
console.log('\n--- ALL ENV VARS USED IN API ROUTES ---');
console.log(allEnvs.join(', '));
