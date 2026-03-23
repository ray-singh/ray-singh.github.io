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
  // Maintain a captions file mapping filename -> caption (create/update)
  const captionsFile = path.join(__dirname, '..', 'src', 'photo-captions.json');
  let existing = {};
  if (fs.existsSync(captionsFile)) {
    try { existing = JSON.parse(fs.readFileSync(captionsFile, 'utf8') || '{}'); } catch (e) { existing = {}; }
  }

  function deriveCaptionFromFilename(filename) {
    const ext = path.extname(filename);
    let name = path.basename(filename, ext);
    // replace underscores/hyphens/dots with spaces, collapse spaces
    name = name.replace(/[_\-.]+/g, ' ').replace(/\s+/g, ' ').trim();
    // lowercase then title case each word except numbers
    return name
      .split(' ')
      .map((w) => {
        if (/^\d+$/.test(w)) return w;
        return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
      })
      .join(' ');
  }

  const newCaptions = {};
  sorted.forEach((f) => { newCaptions[f] = (existing[f] && existing[f].trim()) ? existing[f] : deriveCaptionFromFilename(f); });
  fs.writeFileSync(captionsFile, JSON.stringify(newCaptions, null, 2));
  console.log('Updated captions template at', captionsFile);
} catch (err) {
  console.error(err);
  process.exit(1);
}
