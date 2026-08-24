import fs from 'fs';

async function fetchPlugin() {
  const pluginUrl = 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid0FRVxY9oqfh8qW1dDXQAPtukpnVyREpLhaTzjQhG81yKrftRpVfnLAvDttLb7L2Uyl%26id%3D100005194097988&show_text=true&width=500';

  console.log('Fetching FB iframe plugin...');
  const res = await fetch(pluginUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
    }
  });

  const html = await res.text();
  console.log('Plugin HTML length:', html.length);
  fs.writeFileSync('fb_plugin.html', html, 'utf8');

  // Search for image URLs (scontent / fbcdn / externalhit)
  const imgRegex = /https:\/\/[^\s"'<>\\]*(?:scontent|fbcdn|lookaside)[^\s"'<>\\]*/gi;
  const matches = (html.match(imgRegex) || []).map(u => u.replace(/\\/g, '').replace(/&amp;/g, '&'));
  const unique = [...new Set(matches)];

  console.log(`Found ${unique.length} unique image/media URLs in plugin HTML:`);
  unique.forEach((u, i) => console.log(`${i + 1}: ${u}`));
}

fetchPlugin().catch(err => console.error(err));
