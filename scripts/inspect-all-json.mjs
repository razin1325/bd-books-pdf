import fs from 'fs';

const html = fs.readFileSync('fb_Googlebot.html', 'utf8');

// Find all script tags containing JSON or subattachments
const scripts = html.match(/<script[^>]*>([\s\S]*?)<\/script>/gi) || [];
console.log(`Found ${scripts.length} script tags.`);

let subattachmentsCount = 0;
const photoIds = new Set();

for (const s of scripts) {
  if (s.includes('subattachments') || s.includes('photo') || s.includes('media')) {
    const ids = s.match(/id["']?\s*:\s*["']?(\d{10,20})["']?/g) || [];
    ids.forEach(i => {
      const num = i.match(/\d+/)[0];
      if (num.startsWith('315876')) photoIds.add(num);
    });
  }
}

console.log('All photo IDs starting with 315876 found in script tags:');
console.log([...photoIds]);
