const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PORT = 8089;
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const rootDir = path.join(__dirname, '..');

const viewports = [
  { name: 'desktop_1920x1080', width: 1920, height: 1080 },
  { name: 'laptop_1366x768', width: 1366, height: 768 },
  { name: 'tablet_768x1024', width: 768, height: 1024 },
  { name: 'mobile_390x844', width: 390, height: 844 },
  { name: 'small_mobile_360x800', width: 360, height: 800 }
];

let auditResults = {};
let currentViewport = null;
let resolveViewport = null;

// Audit script to inject
const auditClientScript = `
<script id="prompt7-audit-script">
window.addEventListener('load', () => {
  setTimeout(() => {
    const issues = [];
    const docEl = document.documentElement;
    const body = document.body;
    const vpWidth = window.innerWidth;
    const vpHeight = window.innerHeight;

    // 1. Check page-level horizontal overflow
    if (docEl.scrollWidth > docEl.clientWidth + 1) {
      issues.push({
        type: 'HORIZONTAL_PAGE_OVERFLOW',
        scrollWidth: docEl.scrollWidth,
        clientWidth: docEl.clientWidth,
        diff: docEl.scrollWidth - docEl.clientWidth
      });
    }

    // 2. Find any elements causing overflow past viewport width
    const allEls = document.querySelectorAll('body *');
    allEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.right > vpWidth + 2) {
        const id = el.id ? '#' + el.id : '';
        const cls = el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\\s+/).slice(0, 2).join('.') : '';
        issues.push({
          type: 'ELEMENT_OVERFLOW_RIGHT',
          tag: el.tagName.toLowerCase() + id + cls,
          right: Math.round(rect.right),
          vpWidth: vpWidth,
          overflowPx: Math.round(rect.right - vpWidth)
        });
      }
    });

    // 3. Inspect all images in the document
    const images = Array.from(document.querySelectorAll('img')).map(img => {
      const rect = img.getBoundingClientRect();
      const style = window.getComputedStyle(img);
      const naturalRatio = img.naturalWidth && img.naturalHeight ? +(img.naturalWidth / img.naturalHeight).toFixed(3) : null;
      const renderedRatio = rect.width && rect.height ? +(rect.width / rect.height).toFixed(3) : null;
      const isVisible = rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
      
      let isDistorted = false;
      let ratioDiff = 0;
      if (naturalRatio && renderedRatio && isVisible && (style.objectFit === 'fill' || !style.objectFit || style.objectFit === 'none')) {
        ratioDiff = Math.abs(naturalRatio - renderedRatio) / naturalRatio;
        if (ratioDiff > 0.08) isDistorted = true;
      }

      return {
        src: img.getAttribute('src'),
        alt: img.getAttribute('alt') || '',
        className: img.className,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        naturalRatio,
        renderedWidth: Math.round(rect.width),
        renderedHeight: Math.round(rect.height),
        renderedRatio,
        objectFit: style.objectFit,
        objectPosition: style.objectPosition,
        aspectRatioStyle: style.aspectRatio,
        loading: img.getAttribute('loading'),
        isVisible,
        isDistorted,
        ratioDiffPct: +(ratioDiff * 100).toFixed(1)
      };
    });

    // 4. Slider Caption vs Controls collision check
    const slider = document.querySelector('.smart-city-slider');
    let sliderCollision = null;
    if (slider) {
      const caption = slider.querySelector('.slider-caption');
      const controls = slider.querySelector('.slider-controls-bar');
      const prevBtn = slider.querySelector('.slider-prev');
      const nextBtn = slider.querySelector('.slider-next');
      
      if (caption && controls) {
        const capRect = caption.getBoundingClientRect();
        const ctrlRect = controls.getBoundingClientRect();
        const overlapX = Math.max(0, Math.min(capRect.right, ctrlRect.right) - Math.max(capRect.left, ctrlRect.left));
        const overlapY = Math.max(0, Math.min(capRect.bottom, ctrlRect.bottom) - Math.max(capRect.top, ctrlRect.top));
        if (overlapX > 0 && overlapY > 0) {
          sliderCollision = {
            overlapWidth: Math.round(overlapX),
            overlapHeight: Math.round(overlapY),
            area: Math.round(overlapX * overlapY),
            captionRect: { top: Math.round(capRect.top), bottom: Math.round(capRect.bottom), left: Math.round(capRect.left), right: Math.round(capRect.right) },
            controlsRect: { top: Math.round(ctrlRect.top), bottom: Math.round(ctrlRect.bottom), left: Math.round(ctrlRect.left), right: Math.round(ctrlRect.right) }
          };
        }
      }
    }

    // 5. Navigation collision check
    const navMenu = document.querySelector('.nav-menu');
    const navActions = document.querySelector('.nav-actions');
    let navCollision = null;
    if (navMenu && navActions) {
      const menuRect = navMenu.getBoundingClientRect();
      const actRect = navActions.getBoundingClientRect();
      if (menuRect.width > 0 && actRect.width > 0 && menuRect.right > actRect.left) {
        navCollision = {
          menuRight: Math.round(menuRect.right),
          actionsLeft: Math.round(actRect.left),
          overlap: Math.round(menuRect.right - actRect.left)
        };
      }
    }

    // Send data back to local audit server
    fetch('/__report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        viewport: { width: vpWidth, height: vpHeight },
        issues,
        images,
        sliderCollision,
        navCollision
      })
    }).catch(() => {});
  }, 1000);
});
</script>
`;

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.jfif': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.json': 'application/json'
};

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/__report') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        if (currentViewport) {
          auditResults[currentViewport.name] = data;
        }
      } catch (e) {
        console.error('Error parsing audit report:', e);
      }
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('OK');
      if (resolveViewport) resolveViewport();
    });
    return;
  }

  // Serve static files
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/' || reqPath === '/index.html') {
    const indexPath = path.join(rootDir, 'index.html');
    let htmlContent = fs.readFileSync(indexPath, 'utf-8');
    htmlContent = htmlContent.replace('</body>', auditClientScript + '</body>');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(htmlContent);
    return;
  }

  const filePath = path.join(rootDir, decodeURIComponent(reqPath));
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found: ' + reqPath);
  }
});

server.listen(PORT, async () => {
  console.log(`Audit server listening on http://127.0.0.1:${PORT}`);

  for (const vp of viewports) {
    currentViewport = vp;
    console.log(`Testing viewport: ${vp.name} (${vp.width}x${vp.height})...`);
    
    const waitPromise = new Promise(resolve => {
      resolveViewport = resolve;
      // Safety timeout after 6 seconds
      setTimeout(resolve, 6000);
    });

    const cmd = `"${chromePath}" --headless=new --window-size=${vp.width},${vp.height} --hide-scrollbars --virtual-time-budget=4000 "http://127.0.0.1:${PORT}/index.html"`;
    try {
      execSync(cmd, { stdio: 'pipe' });
    } catch (e) {
      console.error(`Chrome execution error on ${vp.name}:`, e.message);
    }

    await waitPromise;
  }

  // Save audit results
  const outJson = path.join(__dirname, 'audit_report.json');
  fs.writeFileSync(outJson, JSON.stringify(auditResults, null, 2), 'utf-8');
  console.log(`\nAudit completed! Report saved to ${outJson}`);

  // Print summary of issues per viewport
  console.log('\n====================================================');
  console.log('BROWSER LAYOUT AUDIT FINDINGS:');
  console.log('====================================================');
  for (const [vpName, data] of Object.entries(auditResults)) {
    console.log(`\n--- Viewport: ${vpName} (${data.viewport.width}x${data.viewport.height}) ---`);
    if (data.issues && data.issues.length > 0) {
      console.log(`  Issues found (${data.issues.length}):`);
      data.issues.slice(0, 10).forEach(iss => {
        console.log(`    - [${iss.type}] ${iss.element || iss.tag || ''} (overflow: ${iss.overflowPx || iss.diff || ''}px)`);
      });
      if (data.issues.length > 10) console.log(`    ... and ${data.issues.length - 10} more`);
    } else {
      console.log('  No element or page overflows detected.');
    }

    if (data.sliderCollision) {
      console.log(`  ⚠️ SLIDER COLLISION: caption overlaps controls bar by ${data.sliderCollision.overlapWidth}x${data.sliderCollision.overlapHeight}px (area: ${data.sliderCollision.area}px²)`);
    } else {
      console.log('  Slider caption: no collision with controls.');
    }

    if (data.navCollision) {
      console.log(`  ⚠️ NAVIGATION COLLISION: menu overlaps actions by ${data.navCollision.overlap}px`);
    } else {
      console.log('  Navigation: no menu collision.');
    }

    // Distorted images
    const distorted = (data.images || []).filter(img => img.isDistorted);
    if (distorted.length > 0) {
      console.log(`  ⚠️ DISTORTED IMAGES (${distorted.length}):`);
      distorted.forEach(d => {
        console.log(`    - ${d.src}: natural ${d.naturalWidth}x${d.naturalHeight} (${d.naturalRatio}) vs rendered ${d.renderedWidth}x${d.renderedHeight} (${d.renderedRatio}) [${d.ratioDiffPct}% distorted]`);
      });
    } else {
      console.log('  All images: correct aspect ratio & no distortion.');
    }
  }

  server.close(() => {
    console.log('\nAudit server closed.');
    process.exit(0);
  });
});
