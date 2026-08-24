import fs from 'fs';

async function testPhoto() {
  const url = 'https://www.facebook.com/photo.php?fbid=3158760564307049&set=a.2631377630378681';
  console.log('Fetching photo.php...');

  const res = await fetch(url, {
    headers: {
      'User-Agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
    }
  });

  const html = await res.text();
  console.log('HTML length:', html.length);
  fs.writeFileSync('photo_page.html', html, 'utf8');

  const photoMatches = html.match(/fbid=\d+/g) || [];
  console.log('FBIDs found:', [...new Set(photoMatches)]);

  const mediaMatches = html.match(/media_id=\d+/g) || [];
  console.log('Media IDs found:', [...new Set(mediaMatches)]);
}

testPhoto().catch(err => console.error(err));
