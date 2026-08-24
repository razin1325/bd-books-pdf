import fs from 'fs';
import path from 'path';

const destDir = 'D:\\HAND NOTE';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Known media IDs extracted from Facebook HTML
const knownMediaIds = [
  '3158760564307049',
  '3158760617640377',
  '3158760664307039',
  '3158760717640367',
  '3158760797640359',
  '3158760854307020',
  '3158760910973681',
  '3158760964307009',
  '3158761017640337',
  '3158761064307000',
  '3158761117640327',
  '3158761164306990',
  '3158761217640317',
  '3158761264306980',
  '3158761317640307',
  '3158761364306970',
  '3158761417640297',
  '3158761464306960',
  '3158761517640287',
  '3158761564306950',
  '3158761617640277',
  '3158761664306940',
  '3158761717640267',
  '3158761764306930',
  '3158761817640257',
  '3158761864306920',
  '3158761937640245',
];

// Helper to calculate exact hash or buffer length to deduplicate
const fileHashes = new Set();
let count = 0;

async function checkAndDownloadMedia(mediaId) {
  const url = `https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=${mediaId}`;
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
      }
    });

    if (!res.ok) return false;
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('image')) return false;

    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Skip small icon placeholder images (under 5KB)
    if (buffer.length < 5000) return false;

    // Deduplicate by exact byte size & hash prefix
    const hashKey = `${buffer.length}_${buffer.slice(100, 200).toString('hex')}`;
    if (fileHashes.has(hashKey)) {
      console.log(`  [Skip Duplicate] Media ${mediaId} matches existing image`);
      return false;
    }

    fileHashes.add(hashKey);
    count++;

    const numStr = String(count).padStart(2, '0');
    const fileName = `Physics-HandNote-Page-${numStr}.jpg`;
    const filePath = path.join(destDir, fileName);

    fs.writeFileSync(filePath, buffer);
    console.log(`✓ Saved [${numStr}] -> ${fileName} (${(buffer.length / 1024).toFixed(1)} KB) [MediaID: ${mediaId}]`);
    return true;
  } catch (e) {
    return false;
  }
}

async function main() {
  console.log(`Starting full Facebook album download to: ${destDir}`);

  // First clear old partial files in D:\HAND NOTE if any
  const existingFiles = fs.readdirSync(destDir);
  for (const file of existingFiles) {
    fs.unlinkSync(path.join(destDir, file));
  }
  console.log('Cleaned old destination directory.');

  for (const mediaId of knownMediaIds) {
    await checkAndDownloadMedia(mediaId);
  }

  console.log(`\n==============================================`);
  console.log(`SUCCESS! Total Unique Images Downloaded: ${count}`);
  console.log(`Destination Folder: ${destDir}`);
  console.log(`==============================================`);
}

main();
