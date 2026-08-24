import fs from 'fs';
import path from 'path';

const destDir = 'D:\\HAND NOTE';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Master list of all FBIDs provided by the user in sequence 1 to end
const allFbids = [
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
  '3158761117640327',
  '3158761154306990',
  '3158761204306985',
  '3158761274306978',
  '3158761320973640',
  '3158761430973629',
  '3158761480973624',
  '3158761557640283',
  '3158761614306944',
  '3158761734306932',
  '3158761780973594',
  '3158761824306923',
  '3158761937640245',
];

const seenHashes = new Set();
const savedFiles = [];

async function downloadPhoto(idStr) {
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

    // Skip tiny avatars/placeholders under 10KB
    if (buffer.length < 10000) return null;

    // Strict deduplication by buffer size + content sample hash
    const hashKey = `${buffer.length}_${buffer.slice(200, 500).toString('hex')}`;
    if (seenHashes.has(hashKey)) {
      console.log(`  [Skip Duplicate] Media ${idStr}`);
      return null;
    }

    seenHashes.add(hashKey);
    return { id: idStr, buffer };
  } catch (e) {
    console.error(`  ✗ Error fbid ${idStr}: ${e.message}`);
    return null;
  }
}

async function main() {
  console.log(`Starting download of all ${allFbids.length} photos into: ${destDir}`);

  // Clear existing directory contents
  const oldFiles = fs.readdirSync(destDir);
  for (const f of oldFiles) fs.unlinkSync(path.join(destDir, f));
  console.log('Cleaned old directory.');

  for (let i = 0; i < allFbids.length; i++) {
    const id = allFbids[i];
    const result = await downloadPhoto(id);
    if (result) {
      savedFiles.push(result);
      const num = String(savedFiles.length).padStart(2, '0');
      const fileName = `Physics-HandNote-Page-${num}.jpg`;
      const filePath = path.join(destDir, fileName);
      fs.writeFileSync(filePath, result.buffer);
      console.log(`✓ Saved [${num}] -> ${fileName} (${(result.buffer.length / 1024).toFixed(1)} KB) [MediaID: ${id}]`);
    }
  }

  console.log(`\n==============================================`);
  console.log(`SUCCESS! Downloaded ${savedFiles.length} Unique Hand Note Pages`);
  console.log(`Location: ${destDir}`);
  console.log(`==============================================`);
}

main();
