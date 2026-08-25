import https from 'https';
import fs from 'fs';
import { MOCK_BOOKS } from './lib/data.ts';

const catUrls = [
  'https://educationblog24.com/category/class-six-seven-books-and-note',
  'https://educationblog24.com/category/ssc-all-books-and-notes',
  'https://educationblog24.com/category/all-test-paper'
];

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

function parsePosts(html) {
  const matches = [...html.matchAll(/<h[23][^>]*>\s*<a[^>]+href="([^"]+)"[^>]*>([^<]+)<\/a>/gi)];
  return matches.map(m => ({ link: m[1], title: m[2].trim() }));
}

function extractDriveLink(html) {
  const match = html.match(/https:\/\/drive\.google\.com\/[^\s"'<>]+/i);
  return match ? match[0] : '';
}

async function run() {
  const existingSlugs = new Set(MOCK_BOOKS.map(b => b.slug));
  const existingTitles = new Set(MOCK_BOOKS.map(b => b.title.toLowerCase().trim()));

  const newItems = [];

  for (const catUrl of catUrls) {
    console.log('Fetching category page:', catUrl);
    const html = await fetchPage(catUrl);
    const posts = parsePosts(html);
    console.log(`Found ${posts.length} posts in ${catUrl}`);

    for (const post of posts) {
      const titleClean = post.title.replace(/&amp;/g, '&').replace(/&#038;/g, '&').trim();
      const titleLower = titleClean.toLowerCase();

      // Check if already in site
      let exists = false;
      for (const t of existingTitles) {
        if (t.includes(titleLower.slice(0, 20)) || titleLower.includes(t.slice(0, 20))) {
          exists = true;
          break;
        }
      }
      if (exists) {
        console.log('Skipping existing:', titleClean);
        continue;
      }

      console.log('Fetching detail for:', titleClean);
      const postHtml = await fetchPage(post.link);
      const driveUrl = extractDriveLink(postHtml) || 'https://drive.google.com/file/d/1KxkCURG9cuwUHh7PEJ9-AlTMtOpy9W0m/view';

      // Generate slug
      let slug = post.link.split('/').pop().replace('.html', '').toLowerCase();
      if (slug.length > 80) slug = slug.slice(0, 80);

      newItems.push({
        title: titleClean,
        url: post.link,
        driveUrl,
        slug,
        catUrl
      });
    }
  }

  console.log(`=================================`);
  console.log(`Total NEW items to add: ${newItems.length}`);
  fs.writeFileSync('new_scraped_items.json', JSON.stringify(newItems, null, 2));
}

run();
