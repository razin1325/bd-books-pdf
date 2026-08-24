import fs from 'fs';

async function testNext() {
  const url = 'https://m.facebook.com/photo.php?fbid=3158760564307049';
  console.log('Fetching m.facebook.com photo page...');

  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
      'Accept-Language': 'en-US,en;q=0.9',
    }
  });

  const html = await res.text();
  console.log('HTML Len:', html.length);
  fs.writeFileSync('m_photo.html', html, 'utf8');

  // Search for next photo link or photo IDs
  const photoLinks = html.match(/\/photo\.php\?[^\s"'>]+/gi) || [];
  console.log(`Found ${photoLinks.length} photo links:`);
  console.log([...new Set(photoLinks)]);
}

testNext().catch(err => console.error(err));
