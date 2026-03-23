const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const outFile = path.join(__dirname, '..', 'src', 'photo-manifest.json');

const exts = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']);

try {
  const files = fs.existsSync(publicDir) ? fs.readdirSync(publicDir) : [];
  const images = files.filter((f) => {
    const ext = path.extname(f).toLowerCase();
    if (!exts.has(ext)) return false;
    if (f.toLowerCase() === 'profile.jpg') return false;
    return true;
  });
  const sorted = images.sort();
  fs.writeFileSync(outFile, JSON.stringify(sorted, null, 2));
  console.log('Wrote photo manifest with', sorted.length, 'images to', outFile);
} catch (err) {
  console.error(err);
  process.exit(1);
}
