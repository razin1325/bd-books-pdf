import fs from 'fs';

async function main() {
  const targetUrl = 'https://www.facebook.com/permalink.php?story_fbid=pfbid0FRVxY9oqfh8qW1dDXQAPtukpnVyREpLhaTzjQhG81yKrftRpVfnLAvDttLb7L2Uyl&id=100005194097988';
  
  const res = await fetch(targetUrl, {
    headers: {
      'User-Agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
      'Accept-Language': 'en-US,en;q=0.9',
    }
  });

  const html = await res.text();
  console.log('HTML Length:', html.length);
  fs.writeFileSync('fb_permalink.html', html, 'utf8');

  // Extract meta property="og:image"
  const metaRegex = /<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/gi;
  let match;
  const ogImages = [];
  while ((match = metaRegex.exec(html)) !== null) {
    ogImages.push(match[1].replace(/&amp;/g, '&'));
  }
  console.log('OG Images found:', ogImages.length);
  ogImages.forEach((img, i) => console.log(`OG Image ${i + 1}: ${img}`));

  // Extract all scontent / fbcdn URLs in HTML
  const urlRegex = /https:\/\/[^\s"'<>\\]*(?:scontent|fbcdn)[^\s"'<>\\]*/gi;
  const cdnMatches = html.match(urlRegex) || [];
  const cleaned = cdnMatches.map(u => u.replace(/\\/g, '').replace(/&amp;/g, '&'));
  const unique = [...new Set(cleaned)];
  console.log('\nUnique CDN URLs found:', unique.length);
  unique.slice(0, 20).forEach((u, i) => console.log(`CDN ${i + 1}: ${u}`));
}

main().catch(err => console.error(err));
