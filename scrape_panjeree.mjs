import https from 'https';
import fs from 'fs';

const targetUrl = 'https://educationblog24.com/2026/08/class-1-to-12-all-guide-pdf-download-%e0%a6%aa%e0%a6%be%e0%a6%9e%e0%a7%8d%e0%a6%9c%e0%a7%87%e0%a6%b0%e0%a7%80-%e0%a6%97%e0%a6%be%e0%a6%87%e0%a6%a1-%e0%a6%a1%e0%a6%be%e0%a6%89%e0%a6%a8%e0%a6%b2.html';

function fetchPage(urlStr) {
  return new Promise((resolve) => {
    https.get(urlStr, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', () => resolve(''));
  });
}

async function run() {
  console.log('Fetching target page:', targetUrl);
  const html = await fetchPage(targetUrl);
  fs.writeFileSync('panjeree_page.html', html);
  console.log('Saved page to panjeree_page.html, size:', html.length);

  // Extract links inside table / paragraph
  const linkMatches = [...html.matchAll(/<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)];
  console.log('Total <a> tags found:', linkMatches.length);

  const internalBookLinks = [];
  linkMatches.forEach(m => {
    const href = m[1];
    const text = m[2].replace(/<[^>]+>/g, '').trim();
    if (href.includes('educationblog24.com') && href.endsWith('.html') && !href.includes('/category/')) {
      internalBookLinks.push({ text, href });
    } else if (href.includes('drive.google.com')) {
      internalBookLinks.push({ text, driveHref: href });
    }
  });

  console.log('Extracted relevant book items:', internalBookLinks.length);
  fs.writeFileSync('extracted_panjeree_links.json', JSON.stringify(internalBookLinks, null, 2));
}

run();
