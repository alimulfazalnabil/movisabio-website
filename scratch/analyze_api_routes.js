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

const allApiFiles = getFiles(apiDir);
const routeFiles = allApiFiles.filter(f => path.basename(f).startsWith('route.'));

let totalHandlers = 0;
const detailedRoutes = [];

routeFiles.forEach(f => {
  const rel = path.relative(apiDir, f);
  const routePath = '/api/' + path.dirname(rel).replace(/\\/g, '/');
  const code = fs.readFileSync(f, 'utf8');

  // Check exported methods
  const methods = [];
  ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'].forEach(m => {
    const regex = new RegExp(`export\\s+(async\\s+)?function\\s+${m}\\b`);
    if (regex.test(code)) {
      methods.push(m);
      totalHandlers++;
    }
  });

  // Check external fetches
  const fetchMatches = [...code.matchAll(/fetch\s*\(\s*[`'"](https?:\/\/[^`'"]+)/g)].map(m => m[1]);
  // Also check template literals with env vars or variables in fetch
  const dynamicFetches = [...code.matchAll(/fetch\s*\(\s*`([^`]+)`/g)].map(m => m[1]);

  // Check data nature: mock, simulated, static, external, cache
  const hasMock = /mock|dummy|synthetic|sampleData|generateMock|faker/i.test(code);
  const hasRandom = /Math\.random/i.test(code);
  const hasSimulation = /simulate|simulation|forecast|agent|scenario/i.test(code);
  const hasCache = /cache|sourceCache|lru|ttl|stale/i.test(code);
  const hasStaticImport = /import.*from.*(\.json|static|data)/i.test(code) || /fs\.readFile/i.test(code);

  detailedRoutes.push({
    file: rel,
    path: routePath,
    methods,
    handlerCount: methods.length,
    externalUrls: fetchMatches,
    dynamicFetches: dynamicFetches.filter(f => f.startsWith('http') || f.includes('${')),
    hasMock,
    hasRandom,
    hasSimulation,
    hasCache,
    hasStaticImport,
    codeLength: code.length
  });
});

console.log('--- ROUTE SUMMARY ---');
console.log('Total Route Files:', routeFiles.length);
console.log('Total Exported HTTP Handlers:', totalHandlers);

// Group by category prefix
const categories = {};
detailedRoutes.forEach(r => {
  const parts = r.path.split('/');
  const cat = parts[2] || 'root';
  categories[cat] = (categories[cat] || 0) + 1;
});
console.log('\n--- ROUTES BY CATEGORY ---');
console.table(categories);

fs.writeFileSync(path.resolve('scratch', 'detailed_api_routes.json'), JSON.stringify({
  totalRouteFiles: routeFiles.length,
  totalHandlers,
  routes: detailedRoutes
}, null, 2));

console.log('\nWrote scratch/detailed_api_routes.json');
