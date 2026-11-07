const { execSync } = require('child_process');

try {
  const log = execSync('git log -S "card_mission_text" --oneline', { encoding: 'utf-8' });
  console.log('Commits with card_mission_text:', log);
} catch (e) {
  console.log('Error checking git log:', e.message);
}
