const fs = require('fs');
const path = require('path');

const content = fs.readFileSync('src/services/api.ts', 'utf8');
const regex = /\/images\/[a-f0-9]+\.jpg/g;
const matches = [...new Set(content.match(regex))];

const invalid = [];
for (const imgPath of matches) {
  const fullPath = path.join('public', imgPath);
  if (!fs.existsSync(fullPath)) {
    invalid.push({ path: imgPath, reason: 'missing' });
  } else {
    const stats = fs.statSync(fullPath);
    if (stats.size < 100) {
      invalid.push({ path: imgPath, reason: `too small (${stats.size} bytes)` });
    }
  }
}

console.log('Invalid/Missing images in api.ts:', invalid);
