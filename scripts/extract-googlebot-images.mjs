import fs from 'fs';
import path from 'path';

const destDir = 'D:\\HAND NOTE';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const html = fs.readFileSync('fb_Googlebot.html', 'utf8');

// Extract all img src or URL strings containing scontent, fbcdn, lookaside
const urlRegex = /https:\/\/[^\s"'<>\\]*(?:scontent|fbcdn|lookaside)[^\s"'<>\\]*/gi;
const matches = html.match(urlRegex) || [];

const cleaned = matches.map(u => {
  return u
    .replace(/\\/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '')
    .replace(/\\u00253D/g, '=')
    .replace(/\\u002526/g, '&');
});

// Filter only actual photo content URLs (skip icons/emojis/avatars)
const photoUrls = cleaned.filter(u => {
  if (u.includes('emoji.php') || u.includes('rsrc.php') || u.includes('static.xx')) return false;
  // lookaside or scontent images
  return true;
});

const uniqueUrls = [...new Set(photoUrls)];
console.log(`Extracted ${uniqueUrls.length} photo URLs from Googlebot HTML.`);

const foundBuffers = [];
const seenHashes = new Set();

async function processUrls() {
  for (let i = 0; i < uniqueUrls.length; i++) {
    const url = uniqueUrls[i];
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
        }
      });
      if (!res.ok) continue;
      const type = res.headers.get('content-type') || '';
      if (!type.includes('image')) continue;

      const arrayBuffer = await res.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Skip small icons/avatars (under 15KB)
      if (buffer.length < 15000) continue;

      // Hash key based on size and content slice
      const hashKey = `${buffer.length}_${buffer.slice(500, 1000).toString('hex')}`;
      if (seenHashes.has(hashKey)) continue;

      seenHashes.add(hashKey);
      foundBuffers.push({ url, buffer });
      console.log(`✓ Image #${foundBuffers.length}: ${(buffer.length / 1024).toFixed(1)} KB [${path.basename(url.split('?')[0])}]`);
    } catch (e) {
      console.error(`Failed ${url}: ${e.message}`);
    }
  }

  console.log(`\n==============================================`);
  console.log(`TOTAL UNIQUE HAND NOTE IMAGES: ${foundBuffers.length}`);
  console.log(`Saving to: ${destDir}`);
  console.log(`==============================================`);

  // Clear directory
  const files = fs.readdirSync(destDir);
  for (const f of files) fs.unlinkSync(path.join(destDir, f));

  // Save all unique images in order
  foundBuffers.forEach((item, idx) => {
    const num = String(idx + 1).padStart(2, '0');
    const fileName = `Physics-HandNote-Page-${num}.jpg`;
    const filePath = path.join(destDir, fileName);
    fs.writeFileSync(filePath, item.buffer);
    console.log(`Saved -> ${fileName} (${(item.buffer.length / 1024).toFixed(1)} KB)`);
  });
}

processUrls().catch(err => console.error(err));
