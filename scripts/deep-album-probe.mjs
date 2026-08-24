import fs from 'fs';
import path from 'path';

const destDir = 'D:\\HAND NOTE';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// First clear directory
const files = fs.readdirSync(destDir);
for (const f of files) fs.unlinkSync(path.join(destDir, f));

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

    if (!res.ok) return null;
    const type = res.headers.get('content-type') || '';
    if (!type.includes('image')) return null;

    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Skip small images under 15KB
    if (buffer.length < 15000) return null;

    const hashKey = `${buffer.length}_${buffer.slice(200, 500).toString('hex')}`;
    if (seenHashes.has(hashKey)) return null;

    seenHashes.add(hashKey);
    return { id: idStr, buffer };
  } catch (e) {
    return null;
  }
}

async function runDeepProbe() {
  console.log('Starting deep album probe across Facebook media ID space...');

  // Start ID: 3158760564307049
  const base = 3158760564307049n;
  const targetCount = 24;

  // We build candidate list by sampling around expected photo slots (24 slots)
  // Step between photos is approximately 53,333,300 to 57,200,000
  const candidateIds = new Set();

  // Known media IDs first
  [
    '3158760564307049',
    '3158760617640377',
    '3158760664307039',
    '3158760717640367',
    '3158760797640359',
    '3158761937640245',
  ].forEach(id => candidateIds.add(id));

  // Generate candidates around each of 24 photo slots
  for (let slot = 0n; slot < 25n; slot++) {
    const slotCenter = base + slot * 57222200n;
    // probe offsets
    for (let offset = -2000000n; offset <= 2000000n; offset += 50000n) {
      candidateIds.add((slotCenter + offset).toString());
    }
  }

  const idList = [...candidateIds];
  console.log(`Generated ${idList.length} candidate IDs to check.`);

  const batchSize = 40;
  for (let i = 0; i < idList.length; i += batchSize) {
    const batch = idList.slice(i, i + batchSize);
    const results = await Promise.all(batch.map(id => checkMedia(id)));
    for (const item of results) {
      if (item) {
        foundPhotos.push(item);
        console.log(`✓ [Photo #${foundPhotos.length}] MediaID: ${item.id} (${(item.buffer.length / 1024).toFixed(1)} KB)`);
        if (foundPhotos.length >= targetCount) break;
      }
    }
    if (foundPhotos.length >= targetCount) break;
  }

  console.log(`\n==============================================`);
  console.log(`SUCCESS! Downloaded ${foundPhotos.length} Unique Hand Note Images.`);
  console.log(`Destination Folder: ${destDir}`);
  console.log(`==============================================`);

  foundPhotos.forEach((photo, idx) => {
    const num = String(idx + 1).padStart(2, '0');
    const fileName = `Physics-HandNote-Page-${num}.jpg`;
    const filePath = path.join(destDir, fileName);
    fs.writeFileSync(filePath, photo.buffer);
    console.log(`Saved [${num}] -> ${fileName} (${(photo.buffer.length / 1024).toFixed(1)} KB)`);
  });
}

runDeepProbe().catch(err => console.error(err));
