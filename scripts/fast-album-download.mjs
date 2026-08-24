import fs from 'fs';
import path from 'path';

const destDir = 'D:\\HAND NOTE';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Clear old files
const files = fs.readdirSync(destDir);
for (const f of files) fs.unlinkSync(path.join(destDir, f));

const foundPhotos = [];
const seenHashes = new Set();

async function checkId(idStr) {
  const url = `https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=${idStr}`;
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
      }
    });

    if (!res.ok) return null;
    const type = res.headers.get('content-type') || '';
    if (!type.includes('image')) return null;

    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    if (buffer.length < 10000) return null; // skip avatars & icons under 10KB

    const hashKey = `${buffer.length}_${buffer.slice(100, 300).toString('hex')}`;
    if (seenHashes.has(hashKey)) return null;

    seenHashes.add(hashKey);
    return { id: idStr, buffer };
  } catch (e) {
    return null;
  }
}

async function main() {
  console.log('Generating media candidate IDs...');
  const candidates = [];
  const startId = 3158760500000000n;
  const endId   = 3158762000000000n;

  // We test candidate steps between startId and endId in steps of ~100,000 to ~266,666
  // Also include exact known media IDs
  const known = [
    '3158760564307049',
    '3158760617640377',
    '3158760664307039',
    '3158760717640367',
    '3158760797640359',
    '3158760854307020',
    '3158760910973681',
    '3158760964307009',
    '3158761017640337',
    '3158761117640327',
    '3158761937640245'
  ];

  candidates.push(...known);

  // Generate pattern candidates
  const step = 5333333n; // ~5.33 million spacing
  for (let k = 0n; k <= 30n; k++) {
    const center = 3158760564307049n + k * step;
    // offsets around each expected photo slot
    for (let delta = -500000n; delta <= 500000n; delta += 25000n) {
      candidates.push((center + delta).toString());
    }
  }

  const uniqueCandidates = [...new Set(candidates)];
  console.log(`Total candidate IDs to test: ${uniqueCandidates.length}`);

  const batchSize = 30;
  for (let i = 0; i < uniqueCandidates.length; i += batchSize) {
    const batch = uniqueCandidates.slice(i, i + batchSize);
    console.log(`Testing batch ${i + 1} to ${Math.min(i + batchSize, uniqueCandidates.length)}...`);
    const results = await Promise.all(batch.map(id => checkId(id)));
    for (const r of results) {
      if (r) {
        foundPhotos.push(r);
        console.log(`  ✓ Found Photo #${foundPhotos.length}! MediaID: ${r.id} (${(r.buffer.length / 1024).toFixed(1)} KB)`);
      }
    }
    // Stop if we found 24 photos
    if (foundPhotos.length >= 24) {
      console.log('Reached 24 photos limit!');
      break;
    }
  }

  console.log(`\n==============================================`);
  console.log(`Total Unique Photos Found: ${foundPhotos.length}`);
  console.log(`Saving files to: ${destDir}`);

  foundPhotos.forEach((photo, idx) => {
    const num = String(idx + 1).padStart(2, '0');
    const fileName = `Physics-HandNote-Page-${num}.jpg`;
    const filePath = path.join(destDir, fileName);
    fs.writeFileSync(filePath, photo.buffer);
    console.log(`Saved [${num}] -> ${fileName} (${(photo.buffer.length / 1024).toFixed(1)} KB)`);
  });
  console.log(`==============================================`);
}

main();
