const fs = require('fs');
const path = require('path');

function getImageDimensions(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const buf = fs.readFileSync(filePath);
  
  // PNG: signature 89 50 4E 47 0D 0A 1A 0A
  if (buf.length >= 24 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4E && buf[3] === 0x47) {
    const width = buf.readUInt32BE(16);
    const height = buf.readUInt32BE(20);
    return { type: 'PNG', width, height };
  }
  
  // JPEG / JFIF
  if (buf.length >= 4 && buf[0] === 0xFF && buf[1] === 0xD8) {
    let offset = 2;
    while (offset < buf.length) {
      if (buf[offset] !== 0xFF) {
        offset++;
        continue;
      }
      const marker = buf[offset + 1];
      // SOF0, SOF1, SOF2 (baseline, extended sequential, progressive)
      if ((marker >= 0xC0 && marker <= 0xC3) || (marker >= 0xC5 && marker <= 0xC7) || (marker >= 0xC9 && marker <= 0xCB) || (marker >= 0xCD && marker <= 0xCF)) {
        if (offset + 9 < buf.length) {
          const height = buf.readUInt16BE(offset + 5);
          const width = buf.readUInt16BE(offset + 7);
          return { type: 'JPEG', width, height };
        }
      }
      if (offset + 3 < buf.length) {
        const length = buf.readUInt16BE(offset + 2);
        offset += 2 + length;
      } else {
        break;
      }
    }
  }
  
  return { type: 'UNKNOWN', size: buf.length };
}

const htmlPath = path.join(__dirname, '..', 'index.html');
const html = fs.readFileSync(htmlPath, 'utf-8');

// Find all <img> tags in index.html
const imgRegex = /<img\b([^>]*)>/gi;
let match;
const images = [];

while ((match = imgRegex.exec(html)) !== null) {
  const fullTag = match[0];
  const attrs = match[1];
  
  const srcMatch = attrs.match(/src=["']([^"']+)["']/i);
  const altMatch = attrs.match(/alt=["']([^"']+)["']/i);
  const classMatch = attrs.match(/class=["']([^"']+)["']/i);
  const styleMatch = attrs.match(/style=["']([^"']+)["']/i);
  const loadingMatch = attrs.match(/loading=["']([^"']+)["']/i);
  const widthAttr = attrs.match(/width=["']([^"']+)["']/i);
  const heightAttr = attrs.match(/height=["']([^"']+)["']/i);
  
  const src = srcMatch ? srcMatch[1] : '';
  const alt = altMatch ? altMatch[1] : '';
  const className = classMatch ? classMatch[1] : '';
  const style = styleMatch ? styleMatch[1] : '';
  const loading = loadingMatch ? loadingMatch[1] : '';
  const width = widthAttr ? widthAttr[1] : '';
  const height = heightAttr ? heightAttr[1] : '';
  
  // Find context: nearest enclosing section or div id
  const pos = match.index;
  const preceding = html.substring(Math.max(0, pos - 1500), pos);
  const sectionMatch = preceding.match(/<section[^>]*id=["']([^"']+)["']/gi);
  const lastSection = sectionMatch ? sectionMatch[sectionMatch.length - 1] : 'unknown';
  
  let dims = null;
  if (src && !src.startsWith('http')) {
    const fullPath = path.join(__dirname, '..', src);
    dims = getImageDimensions(fullPath);
  }
  
  images.push({
    src,
    alt,
    className,
    style,
    loading,
    widthAttr: width,
    heightAttr: height,
    section: lastSection,
    dims
  });
}

console.log(`Found ${images.length} <img> tags in index.html:\n`);
images.forEach((img, idx) => {
  const dimStr = img.dims ? `${img.dims.width}x${img.dims.height} (${(img.dims.width/img.dims.height).toFixed(2)}:1)` : 'N/A';
  console.log(`[#${idx + 1}] src="${img.src}"`);
  console.log(`     Class: "${img.className}" | Loading: "${img.loading || 'NONE'}"`);
  console.log(`     Attrs: width="${img.widthAttr}" height="${img.heightAttr}" | Style: "${img.style}"`);
  console.log(`     Dimensions: ${dimStr}`);
  console.log(`     Section: ${img.section}\n`);
});
