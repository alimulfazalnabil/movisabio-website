const fs = require('fs');

// Restore original from backup
const backupI18n = fs.readFileSync('recovery/current_backup/assets/js/i18n.js', 'utf8');
const newEntries = JSON.parse(fs.readFileSync('scratch/new_i18n_entries.json', 'utf8'));

let i18nContent = backupI18n;
const langs = ['en', 'de', 'pt', 'es', 'it', 'zh'];

for (const lang of langs) {
    let additions = ',\n            // --- PLATFORM ENTERPRISE SMART CITY EXPANSION (' + lang.toUpperCase() + ') ---';
    for (const [key, transObj] of Object.entries(newEntries)) {
        const text = (transObj[lang] || transObj['en'] || '').replace(/"/g, '\\"');
        additions += '\n            ' + key + ': "' + text + '",';
    }

    const langStart = i18nContent.indexOf(lang + ': {');
    let searchFrom = langStart + (lang + ': {').length;
    
    // Find the closing '\n        }' for this lang
    const closeLangStr = '\n        }';
    const closePos = i18nContent.indexOf(closeLangStr, searchFrom);
    if (closePos === -1) {
        console.error('Could not find closePos for ' + lang);
        continue;
    }
    
    i18nContent = i18nContent.slice(0, closePos) + additions + i18nContent.slice(closePos);
    console.log('Appended for ' + lang);
}

fs.writeFileSync('assets/js/i18n.js', i18nContent, 'utf8');
console.log('Cleanly updated assets/js/i18n.js with leading commas');
