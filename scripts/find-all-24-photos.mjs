import fs from 'fs';
import path from 'path';

const destDir = 'D:\\HAND NOTE';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// We know start ID is ~ 3158760564307049 and end ID is ~ 3158761937640245
// Total span is ~ 1,373,333,196. Each photo ID is spaced by approximately 53,333,333 or 57,222,216.

const startId = 3158760564307049n;
const endId = 3158761937640245n;

const foundImages = [];
const seenHashes = new Set();

async function checkMedia(idStr) {
  const url = `https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=${idStr}`;
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
      }
    });

    if (!res.ok) return false;
    const type = res.headers.get('content-type') || '';
    if (!type.includes('image')) return false;

    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    if (buffer.length < 5000) return false; // skip icon placeholders

    const hashKey = `${buffer.length}_${buffer.slice(100, 200).toString('hex')}`;
    if (seenHashes.has(hashKey)) return false;

    seenHashes.add(hashKey);
    foundImages.push({ id: idStr, buffer });
    console.log(`✓ Found image #${foundImages.length}! MediaID: ${idStr} (${(buffer.length / 1024).toFixed(1)} KB)`);
    return true;
  } catch (e) {
    return false;
  }
}

async function scan() {
  console.log(`Scanning Facebook media IDs for all 24 photos...`);

  // Try dense step search
  const step = 53333333n; 
  // We probe base points + fine search around each base point
  for (let i = 0n; i <= 26n; i++) {
    const base = startId + i * step;
    // Check offsets around base
    for (let offset = -200000n; offset <= 200000n; offset += 50000n) {
      const candidate = (base + offset).toString();
      await checkMedia(candidate);
    }
  }

  console.log(`\nScan complete! Found ${foundImages.length} unique images.`);
  
  // Save all found images to D:\HAND NOTE
  foundImages.forEach((img, idx) => {
    const num = String(idx + 1).padStart(2, '0');
    const fileName = `Physics-HandNote-Page-${num}.jpg`;
    const filePath = path.join(destDir, fileName);
    fs.writeFileSync(filePath, img.buffer);
    console.log(`Saved: ${fileName}`);
  });
}

scan();
