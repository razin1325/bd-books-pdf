import fs from 'fs';
import https from 'https';

const rawLinks = JSON.parse(fs.readFileSync('extracted_panjeree_links.json', 'utf-8'));

function fetchPage(urlStr) {
  return new Promise((resolve) => {
    if (!urlStr.startsWith('https://') && !urlStr.startsWith('http://')) {
      return resolve('');
    }
    https.get(urlStr, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', () => resolve(''));
  });
}

function extractDriveLink(html) {
  const match = html.match(/https:\/\/drive\.google\.com\/[^\s"'<>]+/i);
  return match ? match[0] : '';
}

async function run() {
  const validItems = [];
  const visitedUrls = new Set();

  for (const item of rawLinks) {
    const title = (item.text || '').trim();
    const href = item.href || item.driveHref;

    if (!href || !href.startsWith('http')) continue;
    if (title === 'Facebook' || title === 'WhatsApp' || title === 'Download' || title.includes('Share via') || title === 'Messenger') continue;
    if (visitedUrls.has(href)) continue;
    visitedUrls.add(href);

    console.log('Processing:', title, '=>', href);

    let driveUrl = '';
    if (href.includes('drive.google.com')) {
      driveUrl = href;
    } else {
      const html = await fetchPage(href);
      driveUrl = extractDriveLink(html);
    }

    if (!driveUrl) {
      console.log('Skipping (No drive link):', title);
      continue;
    }

    validItems.push({
      title,
      href,
      driveUrl
    });
  }

  console.log(`========================================`);
  console.log(`Extracted ${validItems.length} VALID books with working Google Drive links!`);
  fs.writeFileSync('valid_panjeree_books.json', JSON.stringify(validItems, null, 2));
}

run();
