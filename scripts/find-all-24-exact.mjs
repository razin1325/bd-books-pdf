import fs from 'fs';
import path from 'path';

const destDir = 'D:\\HAND NOTE';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Known first 5 media IDs
const knownMediaIds = [
  '3158760564307049',
  '3158760617640377',
  '3158760664307039',
  '3158760717640367',
  '3158760797640359',
];

const foundPhotos = [];
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
    if (buffer.length < 5000) return false; // skip avatar/icon placeholders

    const hashKey = `${buffer.length}_${buffer.slice(100, 250).toString('hex')}`;
    if (seenHashes.has(hashKey)) return false;

    seenHashes.add(hashKey);
    foundPhotos.push({ id: idStr, buffer });
    console.log(`✓ [Found Photo #${foundPhotos.length}] MediaID: ${idStr} (${(buffer.length / 1024).toFixed(1)} KB)`);
    return true;
  } catch (e) {
    return false;
  }
}

async function main() {
  console.log('Downloading initial 5 known photos...');
  for (const id of knownMediaIds) {
    await checkMedia(id);
  }

  console.log('\nSearching for remaining photos (6 through 24+)...');
  const basePhoto5 = 3158760797640359n;

  // Each photo gap is around 5,333,333n (or multiples of ~2,666,666n)
  // We probe steps from index 1 to 25
  for (let i = 1n; i <= 22n; i++) {
    const center = basePhoto5 + i * 5333333n;
    // Search a narrow window of offsets around center
    let foundInWindow = false;
    for (let offset = -300000n; offset <= 300000n; offset += 10000n) {
      const candidate = (center + offset).toString();
      const ok = await checkMedia(candidate);
      if (ok) {
        foundInWindow = true;
        break; // found the photo for this position, move to next!
      }
    }
    if (!foundInWindow) {
      // try slightly wider search if missed
      for (let offset = -800000n; offset <= 800000n; offset += 50000n) {
        const candidate = (center + offset).toString();
        const ok = await checkMedia(candidate);
        if (ok) break;
      }
    }
  }

  console.log(`\nTotal Unique Photos Found: ${foundPhotos.length}`);

  // Clear directory
  const files = fs.readdirSync(destDir);
  for (const f of files) fs.unlinkSync(path.join(destDir, f));

  // Save all unique photos to D:\HAND NOTE
  foundPhotos.forEach((photo, idx) => {
    const num = String(idx + 1).padStart(2, '0');
    const fileName = `Physics-HandNote-Page-${num}.jpg`;
    const filePath = path.join(destDir, fileName);
    fs.writeFileSync(filePath, photo.buffer);
    console.log(`Saved -> ${fileName} (${(photo.buffer.length / 1024).toFixed(1)} KB)`);
  });
}

main();
