const fs = require('fs');
const path = require('path');

const FILES = [
  'src/services/api.ts',
  'src/context/CartContext.tsx',
  'src/app/track-order/page.tsx',
  'src/app/page.tsx'
];

const invalid = [];
const regex = /\/images\/[a-f0-9]+\.jpg/g;

for (const file of FILES) {
  if (!fs.existsSync(file)) continue;
  const content = fs.readFileSync(file, 'utf8');
  const matches = [...new Set(content.match(regex) || [])];
  
  for (const imgPath of matches) {
    const fullPath = path.join('public', imgPath);
    if (!fs.existsSync(fullPath)) {
      invalid.push({ file, path: imgPath, reason: 'missing' });
    }
  }
}

console.log('Invalid/Missing images across all files:', invalid);
