const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Target files to process
const FILES_TO_PROCESS = [
  path.join(__dirname, '../src/services/api.ts'),
  path.join(__dirname, '../src/context/CartContext.tsx'),
  path.join(__dirname, '../src/app/track-order/page.tsx'),
  path.join(__dirname, '../src/app/page.tsx')
];

const IMAGES_DIR = path.join(__dirname, '../public/images');

// Ensure public/images directory exists
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
  console.log(`Created directory: ${IMAGES_DIR}`);
} else {
  console.log(`Directory exists: ${IMAGES_DIR}`);
}

// Regex to capture the remote image URLs
const URL_REGEX = /(https:\/\/(?:images\.unsplash\.com|lh3\.googleusercontent\.com)\/[^\s"']+)/g;

async function downloadFile(url, destPath) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(destPath, buffer);
    return true;
  } catch (err) {
    console.error(`Error downloading ${url}:`, err.message);
    return false;
  }
}

async function run() {
  const urlToLocalMap = new Map();
  const allUrls = new Set();

  // Step 1: Scan files and collect all URLs
  for (const filePath of FILES_TO_PROCESS) {
    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}`);
      continue;
    }
    const content = fs.readFileSync(filePath, 'utf8');
    let match;
    while ((match = URL_REGEX.exec(content)) !== null) {
      // Clean up &amp; to & in urls
      const cleanUrl = match[1].replace(/&amp;/g, '&');
      allUrls.add(cleanUrl);
    }
  }

  console.log(`Found ${allUrls.size} unique remote image URLs.`);

  // Step 2: Download all unique images
  let downloadedCount = 0;
  let index = 0;
  for (const url of allUrls) {
    index++;
    // Generate a hash based on the URL
    const hash = crypto.createHash('md5').update(url).digest('hex');
    const filename = `${hash}.jpg`;
    const destPath = path.join(IMAGES_DIR, filename);
    const localUrl = `/images/${filename}`;

    urlToLocalMap.set(url, localUrl);

    console.log(`[${index}/${allUrls.size}] Downloading ${url} ...`);
    const success = await downloadFile(url, destPath);
    if (success) {
      downloadedCount++;
    }
  }

  console.log(`Successfully downloaded ${downloadedCount}/${allUrls.size} images.`);

  // Step 3: Replace URLs in target files
  for (const filePath of FILES_TO_PROCESS) {
    if (!fs.existsSync(filePath)) continue;
    let content = fs.readFileSync(filePath, 'utf8');
    let replacedCount = 0;

    for (const [remoteUrl, localUrl] of urlToLocalMap.entries()) {
      // Try to replace both clean URL and HTML-encoded amp URLs if any
      const remoteUrlAmp = remoteUrl.replace(/&/g, '&amp;');
      if (content.includes(remoteUrl)) {
        content = content.split(remoteUrl).join(localUrl);
        replacedCount++;
      } else if (content.includes(remoteUrlAmp)) {
        content = content.split(remoteUrlAmp).join(localUrl);
        replacedCount++;
      }
    }

    if (replacedCount > 0) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${filePath} with ${replacedCount} replaced image paths.`);
    }
  }

  console.log("Process complete!");
}

run();
