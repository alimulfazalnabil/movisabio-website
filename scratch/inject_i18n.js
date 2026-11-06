const fs = require('fs');

const newEntries = JSON.parse(fs.readFileSync('scratch/new_i18n_entries.json', 'utf8'));
let i18nContent = fs.readFileSync('assets/js/i18n.js', 'utf8');

const langs = ['en', 'de', 'pt', 'es', 'it', 'zh'];

for (const lang of langs) {
    let additions = `\n            // --- PLATFORM ENTERPRISE SMART CITY EXPANSION (${lang.toUpperCase()}) ---`;
    for (const [key, transObj] of Object.entries(newEntries)) {
        const text = (transObj[lang] || transObj['en'] || '').replace(/"/g, '\\"');
        additions += `\n            ${key}: "${text}",`;
    }

    // Find the end of this language dictionary block
    // E.g. find "de: {" then find the closing "}," before next language
    const langStart = i18nContent.indexOf(`${lang}: {`);
    if (langStart === -1) {
        console.error(`Could not find ${lang}: { in i18n.js`);
        continue;
    }

    // Find the matching closing brace for this language
    // In i18n.js, each language block ends with "        }," or "        }\n    };" for zh
    let searchFrom = langStart + `${lang}: {`.length;
    let nextLangIdx;
    if (lang === 'zh') {
        nextLangIdx = i18nContent.indexOf('\n    };', searchFrom);
    } else {
        const nextLang = langs[langs.indexOf(lang) + 1];
        nextLangIdx = i18nContent.indexOf(`${nextLang}: {`, searchFrom);
        // Step back to the last "}," before nextLang
        nextLangIdx = i18nContent.lastIndexOf('},', nextLangIdx);
    }

    if (nextLangIdx === -1) {
        console.error(`Could not find closing point for ${lang}`);
        continue;
    }

    // Insert additions before nextLangIdx
    i18nContent = i18nContent.slice(0, nextLangIdx) + additions + '\n' + i18nContent.slice(nextLangIdx);
    console.log(`Successfully appended ${Object.keys(newEntries).length} keys for ${lang}`);
}

fs.writeFileSync('assets/js/i18n.js', i18nContent, 'utf8');
console.log('Successfully updated assets/js/i18n.js');
