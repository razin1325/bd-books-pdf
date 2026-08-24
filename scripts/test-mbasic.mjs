import fs from 'fs';

async function testMBasic() {
  const url = 'https://mbasic.facebook.com/photo.php?fbid=3158760564307049&set=a.2631377630378681';
  console.log('Fetching mbasic photo page...');

  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9,bn;q=0.8'
    }
  });

  console.log('Status:', res.status, 'Final URL:', res.url);
  const html = await res.text();
  console.log('HTML Len:', html.length);
  fs.writeFileSync('mbasic_photo.html', html, 'utf8');

  // Search for links
  const links = html.match(/href=["']([^"']+)["']/gi) || [];
  console.log(`Found ${links.length} total links.`);
  const photoLinks = links.filter(l => l.includes('photo.php'));
  console.log('Photo links:', photoLinks);
}

testMBasic().catch(err => console.error(err));
