const fs = require('fs');
const path = require('path');

function getDims(filePath) {
  const buf = fs.readFileSync(filePath);
  if (buf.length >= 24 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4E && buf[3] === 0x47) {
    return { type: 'PNG', width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  if (buf.length >= 4 && buf[0] === 0xFF && buf[1] === 0xD8) {
    let offset = 2;
    while (offset < buf.length) {
      if (buf[offset] !== 0xFF) { offset++; continue; }
      const marker = buf[offset + 1];
      if ((marker >= 0xC0 && marker <= 0xC3) || (marker >= 0xC5 && marker <= 0xC7) || (marker >= 0xC9 && marker <= 0xCB) || (marker >= 0xCD && marker <= 0xCF)) {
        if (offset + 9 < buf.length) {
          return { type: 'JPEG', height: buf.readUInt16BE(offset + 5), width: buf.readUInt16BE(offset + 7) };
        }
      }
      if (offset + 3 < buf.length) {
        offset += 2 + buf.readUInt16BE(offset + 2);
      } else break;
    }
  }
  return { type: 'UNKNOWN', size: buf.length };
}

const rootFiles = fs.readdirSync(path.join(__dirname, '..'));
const imageFiles = rootFiles.filter(f => f.match(/\.(png|jpe?g|jfif|webp|svg)$/i));

console.log(`Found ${imageFiles.length} image files in root:\n`);
imageFiles.forEach(f => {
  const dims = getDims(path.join(__dirname, '..', f));
  const ratio = dims.width && dims.height ? (dims.width / dims.height).toFixed(3) : 'N/A';
  const sizeMB = (fs.statSync(path.join(__dirname, '..', f)).size / (1024*1024)).toFixed(2);
  console.log(`${f.padEnd(50)} | ${dims.type} | ${String(dims.width || '?').padStart(5)}x${String(dims.height || '?').padEnd(5)} | Ratio: ${ratio.padEnd(6)} | ${sizeMB} MB`);
});
