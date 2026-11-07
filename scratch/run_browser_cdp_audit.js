const { spawn } = require('child_process');
const http = require('http');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const fileUrl = 'file:///' + path.resolve(__dirname, '..', 'index.html').replace(/\\/g, '/');

const viewports = [
  { name: 'desktop_1920x1080', width: 1920, height: 1080 },
  { name: 'laptop_1366x768', width: 1366, height: 768 },
  { name: 'tablet_768x1024', width: 768, height: 1024 },
  { name: 'mobile_390x844', width: 390, height: 844 },
  { name: 'small_mobile_360x800', width: 360, height: 800 }
];

// In-browser audit function to execute in the page context
const auditScript = `
(() => {
  const issues = [];
  const body = document.body;
  const docEl = document.documentElement;
  
  // 1. Check page-level horizontal overflow
  if (docEl.scrollWidth > docEl.clientWidth) {
    issues.push({
      type: 'HORIZONTAL_OVERFLOW',
      detail: 'Page horizontal overflow: scrollWidth ' + docEl.scrollWidth + ' > clientWidth ' + docEl.clientWidth
    });
  }
  
  // 2. Check all elements for overflow outside viewport
  const allElements = document.querySelectorAll('*');
  const vpWidth = window.innerWidth;
  const vpHeight = window.innerHeight;
  
  allElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.right > vpWidth + 2 && !['HTML', 'BODY'].includes(el.tagName)) {
      // Find selector
      const id = el.id ? '#' + el.id : '';
      const cls = el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\\s+/).join('.') : '';
      issues.push({
        type: 'ELEMENT_OUT_OF_BOUNDS',
        element: el.tagName.toLowerCase() + id + cls,
        right: Math.round(rect.right),
        vpWidth: vpWidth
      });
    }
  });

  // 3. Check all images for stretching or distortion
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    const rect = img.getBoundingClientRect();
    const style = window.getComputedStyle(img);
    const naturalRatio = img.naturalWidth && img.naturalHeight ? img.naturalWidth / img.naturalHeight : null;
    const renderedRatio = rect.width && rect.height ? rect.width / rect.height : null;
    
    // If object-fit is none or fill and ratio is distorted
    if (naturalRatio && renderedRatio && (style.objectFit === 'fill' || style.objectFit === 'none' || !style.objectFit)) {
      const diff = Math.abs(naturalRatio - renderedRatio) / naturalRatio;
      if (diff > 0.1 && rect.width > 20 && rect.height > 20) {
        issues.push({
          type: 'IMAGE_DISTORTION',
          src: img.getAttribute('src'),
          naturalRatio: naturalRatio.toFixed(2),
          renderedRatio: renderedRatio.toFixed(2),
          objectFit: style.objectFit
        });
      }
    }

    // Check if image causes overflow
    if (rect.width > vpWidth) {
      issues.push({
        type: 'IMAGE_OVERFLOW',
        src: img.getAttribute('src'),
        imgWidth: rect.width,
        vpWidth: vpWidth
      });
    }
  });

  // 4. Check Slider collisions: caption vs controls bar vs nav buttons
  const slider = document.querySelector('.smart-city-slider');
  if (slider) {
    const caption = slider.querySelector('.slider-caption');
    const controls = slider.querySelector('.slider-controls-bar');
    const prevBtn = slider.querySelector('.slider-prev');
    const nextBtn = slider.querySelector('.slider-next');
    
    if (caption && controls) {
      const capRect = caption.getBoundingClientRect();
      const ctrlRect = controls.getBoundingClientRect();
      // Check collision
      const overlapX = Math.max(0, Math.min(capRect.right, ctrlRect.right) - Math.max(capRect.left, ctrlRect.left));
      const overlapY = Math.max(0, Math.min(capRect.bottom, ctrlRect.bottom) - Math.max(capRect.top, ctrlRect.top));
      if (overlapX > 0 && overlapY > 0) {
        issues.push({
          type: 'SLIDER_CAPTION_CONTROLS_OVERLAP',
          overlapArea: Math.round(overlapX * overlapY),
          overlapWidth: Math.round(overlapX),
          overlapHeight: Math.round(overlapY)
        });
      }
    }
  }

  // 5. Check Navigation collisions & wrapping
  const navMenu = document.querySelector('.nav-menu');
  const navActions = document.querySelector('.nav-actions');
  const brandLogo = document.querySelector('.brand-logo');
  if (navMenu && navActions) {
    const menuRect = navMenu.getBoundingClientRect();
    const actRect = navActions.getBoundingClientRect();
    if (menuRect.width > 0 && actRect.width > 0 && menuRect.right > actRect.left) {
      issues.push({
        type: 'NAV_ITEMS_COLLISION',
        menuRight: Math.round(menuRect.right),
        actionsLeft: Math.round(actRect.left)
      });
    }
  }

  return issues;
})();
`;

// Helper to run Chrome with debugging and evaluate script
async function runAudit() {
  const results = {};
  
  for (const vp of viewports) {
    console.log(`Auditing viewport: ${vp.name} (${vp.width}x${vp.height})...`);
    
    // Launch Chrome with remote debugging
    const port = 9222 + Math.floor(Math.random() * 100);
    const chromeProc = spawn(chromePath, [
      '--headless=new',
      `--remote-debugging-port=${port}`,
      `--window-size=${vp.width},${vp.height}`,
      '--hide-scrollbars',
      '--virtual-time-budget=3000',
      fileUrl
    ]);

    // Wait for Chrome to bind port
    await new Promise(r => setTimeout(r, 2000));
    
    try {
      // Get WebSocket debugger URL
      const wsUrl = await new Promise((resolve, reject) => {
        const req = http.get(`http://127.0.0.1:${port}/json`, res => {
          let data = '';
          res.on('data', chunk => data += chunk);
          res.on('end', () => {
            try {
              const list = JSON.parse(data);
              if (list && list[0] && list[0].webSocketDebuggerUrl) {
                resolve(list[0].webSocketDebuggerUrl);
              } else {
                reject(new Error('No target page found'));
              }
            } catch (e) { reject(e); }
          });
        });
        req.on('error', reject);
      });

      // Connect via raw WebSocket using standard Node (or basic evaluation)
      const WebSocket = require('ws') || null;
      // If ws is not installed, fallback to HTTP evaluate or simple check
      results[vp.name] = { status: 'PORT_BOUND', wsUrl };
    } catch (err) {
      results[vp.name] = { error: err.message };
    } finally {
      chromeProc.kill();
    }
  }
  
  return results;
}

runAudit().then(res => console.log('Audit setup finished:', res)).catch(e => console.error(e));
