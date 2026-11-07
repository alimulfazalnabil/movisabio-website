const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const indexPath = path.join(__dirname, '..', 'index.html');
const testHtmlPath = path.join(__dirname, 'test_audit.html');

let html = fs.readFileSync(indexPath, 'utf-8');

// Inject layout measurement script before </body>
const auditScript = `
<script id="dom-auditor">
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const report = {
      vp: { width: window.innerWidth, height: window.innerHeight },
      docScrollWidth: document.documentElement.scrollWidth,
      docClientWidth: document.documentElement.clientWidth,
      bodyScrollWidth: document.body.scrollWidth,
      overflowElements: [],
      images: [],
      slider: {}
    };

    const vpW = window.innerWidth;

    // Check all elements for overflow
    document.querySelectorAll('*').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.right > vpW + 1 && !['HTML', 'BODY', 'SCRIPT', 'STYLE'].includes(el.tagName)) {
        const id = el.id ? '#' + el.id : '';
        const cls = el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\\s+/)[0] : '';
        report.overflowElements.push({
          selector: el.tagName.toLowerCase() + id + cls,
          right: Math.round(r.right),
          width: Math.round(r.width),
          left: Math.round(r.left),
          overflow: Math.round(r.right - vpW)
        });
      }
    });

    // Check images
    document.querySelectorAll('img').forEach(img => {
      const r = img.getBoundingClientRect();
      const style = window.getComputedStyle(img);
      report.images.push({
        src: img.getAttribute('src'),
        class: img.className,
        renderedW: Math.round(r.width),
        renderedH: Math.round(r.height),
        naturalW: img.naturalWidth,
        naturalH: img.naturalHeight,
        objectFit: style.objectFit,
        aspectRatio: style.aspectRatio,
        overflows: r.right > vpW
      });
    });

    // Check slider
    const sl = document.querySelector('.smart-city-slider');
    if (sl) {
      const cap = sl.querySelector('.slider-caption');
      const ctrl = sl.querySelector('.slider-controls-bar');
      const prev = sl.querySelector('.slider-prev');
      const next = sl.querySelector('.slider-next');
      report.slider = {
        width: Math.round(sl.getBoundingClientRect().width),
        height: Math.round(sl.getBoundingClientRect().height),
        captionHeight: cap ? Math.round(cap.getBoundingClientRect().height) : null,
        controlsBottom: ctrl ? Math.round(ctrl.getBoundingClientRect().bottom) : null,
        captionOverlapsControls: false
      };
      if (cap && ctrl) {
        const cr = cap.getBoundingClientRect();
        const tr = ctrl.getBoundingClientRect();
        const ox = Math.max(0, Math.min(cr.right, tr.right) - Math.max(cr.left, tr.left));
        const oy = Math.max(0, Math.min(cr.bottom, tr.bottom) - Math.max(cr.top, tr.top));
        if (ox > 0 && oy > 0) {
          report.slider.captionOverlapsControls = true;
          report.slider.overlapWidth = Math.round(ox);
          report.slider.overlapHeight = Math.round(oy);
        }
      }
    }

    const out = document.createElement('pre');
    out.id = 'audit-report-data';
    out.textContent = JSON.stringify(report);
    document.body.appendChild(out);
  }, 1200);
});
</script>
`;

fs.writeFileSync(testHtmlPath, html.replace('</body>', auditScript + '</body>'), 'utf-8');

const viewports = [
  { name: 'desktop_1920x1080', width: 1920, height: 1080 },
  { name: 'laptop_1366x768', width: 1366, height: 768 },
  { name: 'tablet_768x1024', width: 768, height: 1024 },
  { name: 'mobile_390x844', width: 390, height: 844 },
  { name: 'small_mobile_360x800', width: 360, height: 800 }
];

const fileUrl = 'file:///' + testHtmlPath.replace(/\\/g, '/');
console.log('Running Dump-DOM audit across 5 viewports...\n');

viewports.forEach(vp => {
  const cmd = `"${chromePath}" --headless=new --dump-dom --window-size=${vp.width},${vp.height} --virtual-time-budget=3000 "${fileUrl}"`;
  try {
    const stdout = execSync(cmd, { maxBuffer: 10 * 1024 * 1024 }).toString();
    const match = stdout.match(/<pre id="audit-report-data">([\s\S]*?)<\/pre>/);
    if (match) {
      const data = JSON.parse(match[1]);
      console.log(`=== Viewport: ${vp.name} (${vp.width}x${vp.height}) ===`);
      console.log(`Document scrollWidth: ${data.docScrollWidth} (clientWidth: ${data.docClientWidth})`);
      if (data.docScrollWidth > data.docClientWidth) {
        console.log(`🚨 PAGE HORIZONTAL OVERFLOW: ${data.docScrollWidth - data.docClientWidth}px`);
        console.log(`Top overflowing elements (${data.overflowElements.length}):`);
        // Deduplicate selectors
        const seen = new Set();
        data.overflowElements.forEach(el => {
          if (!seen.has(el.selector)) {
            seen.add(el.selector);
            console.log(`   - ${el.selector}: width ${el.width}px, right ${el.right}px (overflows by ${el.overflow}px)`);
          }
        });
      } else {
        console.log('✅ No horizontal overflow.');
      }

      if (data.slider.captionOverlapsControls) {
        console.log(`🚨 SLIDER COLLISION: Caption overlaps controls bar by ${data.slider.overlapWidth}x${data.slider.overlapHeight}px!`);
        console.log(`   Slider height: ${data.slider.height}px | Caption height: ${data.slider.captionHeight}px`);
      } else {
        console.log(`✅ Slider: no caption collision (height: ${data.slider.height}px, caption: ${data.slider.captionHeight}px).`);
      }

      console.log('');
    } else {
      console.log(`Could not find audit-report-data in ${vp.name}`);
    }
  } catch (err) {
    console.error(`Error auditing ${vp.name}:`, err.message);
  }
});

// Clean up test file
if (fs.existsSync(testHtmlPath)) fs.unlinkSync(testHtmlPath);
console.log('Dump-DOM audit finished!');
