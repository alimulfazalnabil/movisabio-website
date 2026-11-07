const { execSync } = require('child_process');

try {
  const result = execSync('git grep -i "sec_economics"', { encoding: 'utf8' });
  console.log('git grep result:\n', result);
} catch (e) {
  console.log('git grep error/not found:\n', e.stdout || e.message);
}

try {
  const logResult = execSync('git log -S "sec_economics" --oneline', { encoding: 'utf8' });
  console.log('git log -S result:\n', logResult);
} catch (e) {
  console.log('git log error:\n', e.stdout || e.message);
}
