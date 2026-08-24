import fs from 'fs';

async function parsePlugin() {
  const pluginUrl = 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid0FRVxY9oqfh8qW1dDXQAPtukpnVyREpLhaTzjQhG81yKrftRpVfnLAvDttLb7L2Uyl%26id%3D100005194097988&show_text=true&width=500';

  const res = await fetch(pluginUrl, {
    headers: {
      'User-Agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
    }
  });

  const html = await res.text();
  fs.writeFileSync('plugin_fb.html', html, 'utf8');

  // Extract all src="..." or image URLs
  const srcRegex = /src=["']([^"']+)["']/gi;
  let match;
  const srcs = [];
  while ((match = srcRegex.exec(html)) !== null) {
    srcs.push(match[1].replace(/&amp;/g, '&'));
  }
  console.log(`Found ${srcs.length} src attributes:`);
  srcs.forEach((s, i) => console.log(`${i + 1}: ${s}`));

  // Extract all http/https URLs containing photo or fbsbx or fbcdn
  const allUrlsRegex = /https:\/\/[^\s"'<>\\]+/gi;
  const allUrls = html.match(allUrlsRegex) || [];
  const cleaned = allUrls.map(u => u.replace(/\\/g, '').replace(/&amp;/g, '&'));
  const unique = [...new Set(cleaned)];
  console.log(`\nFound ${unique.length} unique URLs total:`);
  unique.forEach((u, i) => console.log(`${i + 1}: ${u}`));
}

parsePlugin().catch(err => console.error(err));
