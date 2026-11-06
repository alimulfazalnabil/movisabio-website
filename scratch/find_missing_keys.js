const fs = require('fs');

const html = fs.readFileSync('platform.html', 'utf8');
const regex = /data-i18n="([^"]+)"/g;
let match;
const platformKeys = new Set();
while ((match = regex.exec(html)) !== null) {
    platformKeys.add(match[1]);
}

const i18nContent = fs.readFileSync('assets/js/i18n.js', 'utf8');

const vm = require('vm');
const sandbox = {
    window: {
        location: { search: '' },
        dispatchEvent: () => {}
    },
    navigator: {
        language: 'en'
    },
    CustomEvent: class CustomEvent {},
    document: {
        readyState: 'complete',
        documentElement: { lang: 'en' },
        querySelectorAll: () => [],
        getElementById: () => null,
        addEventListener: () => {}
    },
    localStorage: {
        getItem: () => null,
        setItem: () => {}
    },
    URLSearchParams: URLSearchParams
};
vm.createContext(sandbox);
vm.runInContext(i18nContent, sandbox);

const translations = sandbox.window.MoviSabioI18n.getDictionaries();
const langs = ['en', 'de', 'pt', 'es', 'it', 'zh'];

console.log('--- MISSING KEYS PER LANGUAGE ---');
const missingMap = {};
for (const lang of langs) {
    const missing = [];
    for (const key of platformKeys) {
        if (!translations[lang] || typeof translations[lang][key] === 'undefined') {
            missing.push(key);
        }
    }
    missingMap[lang] = missing;
    console.log(`${lang.toUpperCase()}: ${missing.length} missing keys out of ${platformKeys.size}`);
}

fs.writeFileSync('scratch/missing_keys.json', JSON.stringify(missingMap, null, 2), 'utf8');
console.log('Saved scratch/missing_keys.json');
