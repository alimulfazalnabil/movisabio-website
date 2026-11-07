const fs = require('fs');

const content = fs.readFileSync('scratch/commit_2_index.html', 'utf8');

// Search for economics
let idx = content.indexOf('id="economics"');
if (idx === -1) {
  idx = content.indexOf('economics');
}

console.log('Index of economics:', idx);

if (idx !== -1) {
  const sectionStart = content.lastIndexOf('<section', idx);
  // Find matching </section>
  let pos = idx;
  let sectionEnd = -1;
  while ((pos = content.indexOf('</section>', pos)) !== -1) {
    // Check if there is another <section between sectionStart and pos
    const nextSec = content.indexOf('<section', sectionStart + 1);
    if (nextSec === -1 || nextSec > pos) {
      sectionEnd = pos + 10;
      break;
    }
    pos += 10;
  }
  if (sectionEnd === -1) sectionEnd = content.indexOf('</section>', idx) + 10;

  console.log(`Found section: [${sectionStart}, ${sectionEnd}] (Length: ${sectionEnd - sectionStart})`);
  const sectionHtml = content.substring(sectionStart, sectionEnd);
  fs.writeFileSync('scratch/original_economics_section.html', sectionHtml, 'utf8');
  console.log('Saved original economics section to scratch/original_economics_section.html');

  // Also check if there are CSS styles specifically for economics in commit_2_index.html
  const styleStart = content.indexOf('<style>');
  const styleEnd = content.indexOf('</style>');
  if (styleStart !== -1 && styleEnd !== -1) {
    const css = content.substring(styleStart, styleEnd);
    const econCssMatches = css.match(/[^{}]*economics[^{}]*\{[^}]*\}/gi) || [];
    console.log('Economics CSS rules found:', econCssMatches.length);
    fs.writeFileSync('scratch/original_economics_css.css', econCssMatches.join('\n\n'), 'utf8');
  }

  // Also check translations in commit_2_index.html for economics
  const trIdx = content.indexOf('economics:');
  console.log('Translation economics index:', trIdx);
}
