const fs = require('fs');
const content = fs.readFileSync('assets/js/i18n.js', 'utf-8');

const keysToCheck = [
  'sec_about',
  'card_mission_title',
  'card_mission_text',
  'card_structure_title',
  'card_structure_text',
  'card_strategy_title',
  'card_strategy_text',
  'nav_company',
  'nav_investor'
];

keysToCheck.forEach(k => {
  const matches = (content.match(new RegExp(`['"]?${k}['"]?\\s*:`, 'g')) || []).length;
  console.log(`Key ${k}: found ${matches} times`);
});
