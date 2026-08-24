import fs from 'fs';
import path from 'path';

const destDir = 'D:\\HAND NOTE';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// First 10 links provided by user
const fbids = [
  '3158760564307049',
  '3158760617640377',
  '3158760664307039',
  '3158760717640367',
  '3158760797640359',
  '3158760850973687',
  '3158760890973683',
  '3158760944307011',
  '3158760997640339',
  '3158761060973666',
];

const seenHashes = new Set();
let savedCount = 0;

async function downloadPhoto(idStr, index) {
  const url = `https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=${idStr}`;
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
      }
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const type = res.headers.get('content-type') || '';
    if (!type.includes('image')) throw new Error('Not an image response');

    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const hashKey = `${buffer.length}_${buffer.slice(200, 400).toString('hex')}`;
    if (seenHashes.has(hashKey)) {
      console.log(`[Skip Duplicate] Media ${idStr}`);
      return;
    }

    seenHashes.add(hashKey);
    savedCount++;
    const num = String(index + 1).padStart(2, '0');
    const fileName = `Physics-HandNote-Page-${num}.jpg`;
    const filePath = path.join(destDir, fileName);

    fs.writeFileSync(filePath, buffer);
    console.log(`✓ Saved [${num}] -> ${fileName} (${(buffer.length / 1024).toFixed(1)} KB)`);
  } catch (e) {
    console.error(`✗ Failed photo ${index + 1} (fbid: ${idStr}): ${e.message}`);
  }
}

async function main() {
  console.log('Downloading first 10 photos...');
  for (let i = 0; i < fbids.length; i++) {
    await downloadPhoto(fbids[i], i);
  }
  console.log(`Downloaded ${savedCount} of 10 photos so far.`);
}

main();
