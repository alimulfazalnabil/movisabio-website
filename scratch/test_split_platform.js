const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'index.html');
const rawHtml = fs.readFileSync(htmlPath, 'utf8');

// Find the smart-city div inside platform
const smartCityDivMarker = '<div class="flagship-banner" id="smart-city"';
const smartCityIndex = rawHtml.indexOf(smartCityDivMarker);

console.log('smartCityIndex:', smartCityIndex);
if (smartCityIndex !== -1) {
  console.log('Snippet around smartCityIndex:');
  console.log(rawHtml.substring(smartCityIndex - 100, smartCityIndex + 200));
}
