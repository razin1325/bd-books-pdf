import fs from 'fs';
import path from 'path';

async function fetchFB() {
  const url = 'https://www.facebook.com/share/p/19CAcdckia/';
  console.log('Fetching FB share URL:', url);

  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9,bn;q=0.8',
    },
    redirect: 'follow',
  });

  const finalUrl = res.url;
  console.log('Final URL:', finalUrl);
  const html = await res.text();
  console.log('HTML Length:', html.length);

  // Write HTML for inspection
  fs.writeFileSync('fb_page.html', html, 'utf8');

  // Search for image URLs
  const imgRegex = /https:\\?\/\\?\/scontent[^\s"'>\\]+/g;
  const matches = html.match(imgRegex) || [];
  console.log(`Found ${matches.length} scontent URLs`);

  const cleaned = matches.map(m => m.replace(/\\/g, ''));
  const unique = [...new Set(cleaned)];
  console.log(`Unique image URLs: ${unique.length}`);
  unique.forEach((img, i) => console.log(`${i + 1}: ${img}`));
}

fetchFB().catch(err => console.error(err));
