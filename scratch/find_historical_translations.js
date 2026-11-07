const { execSync } = require('child_process');

try {
  const show = execSync(`git show 6390433:index.html`, { maxBuffer: 10 * 1024 * 1024, encoding: 'utf-8' });
  console.log('6390433 index.html size:', show.length);
  // find translations object
  const transIdx = show.indexOf('const translations =');
  if (transIdx !== -1) {
    console.log('Found translations at', transIdx);
    const slice = show.substring(transIdx, transIdx + 15000);
    const fs = require('fs');
    fs.writeFileSync('scratch/original_translations.js', slice);
    console.log('Saved to scratch/original_translations.js');
  } else {
    console.log('translations not found directly');
    // search for card_mission_text
    const idx = show.indexOf('card_mission_text');
    console.log('card_mission_text index:', idx);
    if (idx !== -1) {
      console.log('Context:', show.substring(idx - 100, idx + 400));
    }
  }
} catch(e) {
  console.log(e);
}
