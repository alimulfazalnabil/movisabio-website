# MOVISABIO — LOCAL DEVELOPMENT & ENGINEERING WORKFLOW GUIDE
**Document ID:** `docs/DEVELOPMENT_GUIDE.md`  
**Phase:** Phase C — Technical Foundation, Project Audit & Development Readiness  
**Target Repository:** `movisabio-website`  
**Status:** Complete & Validated  

---

## 1. Prerequisites & Environment Setup

The MoviSabio website is engineered as a lightweight, high-performance static web platform. It requires zero heavy build toolchains or compilation steps, but benefits from Node.js for local serving, automated testing, and headless browser validation.

### System Requirements:
- **Node.js:** v18.x or v20.x+ (v22.x verified)
- **NPM:** v9.x or v10.x+
- **Git:** v2.35+
- **Google Chrome / Chromium:** (Optional: for running automated multi-viewport headless screenshot suites)

---

## 2. Local Installation & Quick Start

### 2.1 Clone & Repository Navigation
```bash
git clone https://github.com/alimulfazalnabil/movisabio-website.git
cd movisabio-website
```

### 2.2 Running a Local Development Server
Because the website relies on relative assets, clean path resolution, and asynchronous ES6 JavaScript modules, it should be served over an HTTP server rather than opening `file:///` directly:

#### Option A: Using Node's `npx serve` (Recommended)
```bash
npx serve -l 3000 .
```
Access the application at: `http://localhost:3000/`

#### Option B: Using Python built-in HTTP server
```bash
python -m http.server 8080
```
Access the application at: `http://localhost:8080/`

---

## 3. Directory Layout & Routing Conventions

When adding or modifying pages:
- **Root Pages:** Place general corporate and platform pages in the repository root (`index.html`, `platform.html`, `partners.html`).
- **Product Pages:** Place specialized, dedicated product views inside the `products/` subdirectory (`products/smart-city.html`, etc.).
- **Asset Paths:**
  - From root pages: `assets/css/...`, `assets/js/...`, `image.png`
  - From `products/` pages: `../assets/css/...`, `../assets/js/...`, `../image.png`
- **Canonical Tags:** Always include `<link rel="canonical" href="https://www.movisabio.com/...">` in the `<head>` of every document.

---

## 4. Internationalization (i18n) Workflow

The platform maintains 100% parity across all 6 supported languages (`en`, `de`, `pt`, `es`, `it`, `zh`).

### 4.1 Adding a New Translation Key
When introducing new text elements to the website:
1. Open [`assets/js/i18n.js`](file:///h:/Software%20Projects/Movisabio%20Website/assets/js/i18n.js).
2. Locate `const dictionaries = { ... }`.
3. Add the new key to `en`, and immediately provide localized translations in `de`, `pt`, `es`, `it`, and `zh`.
4. In your HTML document, add `data-i18n="your_new_key"` to the target element.

### 4.2 Validating i18n Parity Locally
Run the validation script to ensure zero missing keys across all 6 languages:
```bash
node -e "
const fs = require('fs');
const code = fs.readFileSync('assets/js/i18n.js', 'utf8');
const start = code.indexOf('const dictionaries = {') + 'const dictionaries = '.length;
let depth = 0, end = -1;
for (let i = start; i < code.length; i++) {
  if (code[i] === '{') depth++;
  else if (code[i] === '}') { depth--; if (depth === 0) { end = i + 1; break; } }
}
const dicts = eval('(' + code.substring(start, end) + ')');
const enCount = Object.keys(dicts.en).length;
console.log('EN Key Count:', enCount);
['de', 'pt', 'es', 'it', 'zh'].forEach(l => {
  const m = Object.keys(dicts.en).filter(k => !Object.keys(dicts[l]).includes(k));
  console.log(l.toUpperCase() + ' Parity: ' + (m.length === 0 ? '100% PASS' : m.length + ' MISSING'));
});
"
```

---

## 5. Automated Multi-Viewport Screenshot Suite

To verify visual responsiveness across desktop, laptop, tablet, and mobile breakpoints before committing:

```bash
node scratch/batch_capture_all.js
```
This command invokes headless Google Chrome across 5 standard viewport resolutions:
- Desktop: `1920x1080`
- Laptop: `1366x768`
- Tablet: `768x1024`
- Modern Mobile: `390x844`
- Compact Mobile: `360x800`

Screenshots are output to `screenshots/phase_b2/` for visual diffing.

---

## 6. Testing & Quality Assurance Guidelines

### 6.1 Link Integrity Verification
Before submitting changes, run the automated link verifier:
```bash
node scratch/audit_links.js
```
Ensures 100% of internal links (`href`) resolve to physical files on disk with zero broken links.

### 6.2 Pre-Commit Checklist
- [ ] Working tree is clean (`git status`).
- [ ] Design tokens in `variables.css` are respected (no arbitrary dark colors `#07111F` / `#040912`).
- [ ] Critical investor figures ($1.1T TAM, $25B SAM, €50.3M ARR, 1,000 customers, 48% EBITDA) remain intact.
- [ ] All 6 languages have 100% translation parity.
- [ ] No broken links or 404s.
- [ ] No unauthorized `git push` to remote or live hosting.
