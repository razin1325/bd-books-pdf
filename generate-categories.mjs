import fs from 'fs';
import path from 'path';

const SITE = 'https://educationblog24.com';
const CATEGORY_ID = 39;
const CATEGORY_SLUG = 'baby-boy-girl-name';
const CATEGORY_NAME = 'Baby Boy & Girl Name';
const PER_PAGE = 50;
const PAGES = 1; // pulls 50 posts

function decodeEntities(str) {
  return (str || '')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8216;/g, '‘')
    .replace(/&#8217;/g, '’')
    .replace(/&#8220;/g, '“')
    .replace(/&#8221;/g, '”')
    .replace(/&#8230;/g, '…')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(parseInt(n, 10)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)));
}

function stripHtml(html) {
  return decodeEntities(
    (html || '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<[^>]+>/g, ' ')
  )
    .replace(/\s+/g, ' ')
    .trim();
}

function escapeXml(str) {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function wordWrap(text, maxCharsPerLine = 22) {
  const words = (text || '').trim().split(/\s+/);
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + ' ' + word).trim().length <= maxCharsPerLine) {
      currentLine = (currentLine + ' ' + word).trim();
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines.slice(0, 3);
}

function generateBabyNameSvgImage(title, categoryName = 'Baby Boy & Girl Name') {
  const cleanTitle = title
    .replace(/&#\d+;/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\|\s*BD\s*Edu\s*PDF/gi, '')
    .trim();

  const lines = wordWrap(cleanTitle, 24);
  const escapedCategory = escapeXml(categoryName);

  const lineCount = lines.length;
  const startY = lineCount === 1 ? 315 : lineCount === 2 ? 280 : 250;
  const lineHeight = 65;

  const lineElements = lines
    .map((line, idx) => {
      const y = startY + idx * lineHeight;
      return `<text x="600" y="${y}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'SolaimanLipi', Arial, sans-serif" font-size="44" font-weight="900" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">${escapeXml(line)}</text>`;
    })
    .join('\n');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#4c0519"/>
        <stop offset="35%" stop-color="#831843"/>
        <stop offset="70%" stop-color="#9d174d"/>
        <stop offset="100%" stop-color="#4c1d95"/>
      </linearGradient>
      <linearGradient id="cardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="rgba(255,255,255,0.18)"/>
        <stop offset="100%" stop-color="rgba(0,0,0,0.4)"/>
      </linearGradient>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.5"/>
      </filter>
    </defs>
    
    <!-- Background -->
    <rect width="1200" height="630" fill="url(#bgGrad)"/>
    
    <!-- Decorative Glowing Circles -->
    <circle cx="120" cy="100" r="220" fill="rgba(255,255,255,0.05)"/>
    <circle cx="1080" cy="530" r="290" fill="rgba(236,72,153,0.15)"/>
    <circle cx="980" cy="120" r="170" fill="rgba(255,255,255,0.06)"/>

    <!-- Inner Card Frame -->
    <rect x="45" y="45" width="1110" height="540" rx="28" fill="url(#cardGrad)" stroke="rgba(255,255,255,0.25)" stroke-width="2.5"/>
    
    <!-- Top Pill Badge -->
    <rect x="410" y="85" width="380" height="54" rx="27" fill="#f43f5e" filter="url(#shadow)"/>
    <text x="600" y="119" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'SolaimanLipi', Arial, sans-serif" font-size="22" font-weight="800" fill="#ffffff" text-anchor="middle">👶 ${escapedCategory} 🌸</text>
    
    <!-- Title Lines -->
    <g filter="url(#shadow)">
      ${lineElements}
    </g>

    <!-- Divider -->
    <line x1="250" y1="485" x2="950" y2="485" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
    
    <!-- Footer Branding -->
    <text x="600" y="530" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'SolaimanLipi', Arial, sans-serif" font-size="24" font-weight="700" fill="#fbcfe8" text-anchor="middle">BD Edu PDF • ১০০% নির্ভুল নামের অর্থ সংকলন</text>
  </svg>`;

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

function cleanBabyNamePostContent(html) {
  if (!html) return '';
  return html
    .replace(/<a\s+[^>]*href=["'][^"']*(?:blogger|googleusercontent|educationblog24|blogspot)[^"']*["'][^>]*>[\s\S]*?<\/a>/gi, '')
    .replace(/<figure[^>]*>[\s\S]*?<\/figure>/gi, '')
    .replace(/<img[^>]*\/?>/gi, '')
    .replace(/Educationblog24\.com/gi, 'BD Edu PDF')
    .replace(/Educationblog\.com/gi, 'BD Edu PDF')
    .replace(/educationblog24\.com/gi, 'bdedupdf.app')
    .replace(/<div\s+style=["'][^"']*text-align:\s*center;?["']>\s*<\/div>/gi, '')
    .replace(/<div[^>]*>\s*<\/div>/gi, '')
    .replace(/<p>\s*<\/p>/gi, '')
    .trim();
}

async function fetchPosts() {
  const all = [];
  for (let page = 1; page <= PAGES; page++) {
    const url = `${SITE}/wp-json/wp/v2/posts?categories=${CATEGORY_ID}&per_page=${PER_PAGE}&page=${page}&_embed`;
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`Page ${page} failed: ${res.status}`);
      break;
    }
    const posts = await res.json();
    if (!Array.isArray(posts) || posts.length === 0) break;
    for (const p of posts) {
      const rawSlug = p.slug;
      const slug = decodeURIComponent(rawSlug);
      const title = stripHtml(p.title?.rendered || '');
      const rawContent = p.content?.rendered || '';
      const content = cleanBabyNamePostContent(rawContent);
      const image = generateBabyNameSvgImage(title, CATEGORY_NAME);
      const excerpt = stripHtml(p.excerpt?.rendered || '')
        .replace(/Educationblog24\.com/gi, 'BD Edu PDF')
        .replace(/Educationblog\.com/gi, 'BD Edu PDF')
        .slice(0, 200);
      all.push({
        id: p.id,
        title,
        slug,
        excerpt,
        content,
        image,
        date: (p.date || '').slice(0, 10),
        link: p.link,
        category: CATEGORY_NAME,
        categorySlug: CATEGORY_SLUG,
      });
    }
    console.log(`Fetched page ${page}: ${posts.length} posts (total ${all.length})`);
  }
  return all;
}

function tsEscape(s) {
  return (s || '').replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

function buildTsFile(posts) {
  const items = posts
    .map(
      (p) => `  {
    id: ${p.id},
    title: \`${tsEscape(p.title)}\`,
    slug: ${JSON.stringify(p.slug)},
    excerpt: \`${tsEscape(p.excerpt)}\`,
    content: \`${tsEscape(p.content)}\`,
    image: ${JSON.stringify(p.image)},
    date: ${JSON.stringify(p.date)},
    link: ${JSON.stringify(p.link)},
    category: ${JSON.stringify(p.category)},
    categorySlug: ${JSON.stringify(p.categorySlug)},
  },`
    )
    .join('\n');

  return `export interface CategoryPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: string;
  date: string;
  link: string;
  category: string;
  categorySlug: string;
}

import { JOB_CIRCULAR_POSTS } from './job-circular-data';

const BABY_NAME_POSTS: CategoryPost[] = [
${items}
];

export const CATEGORY_POSTS: CategoryPost[] = [...BABY_NAME_POSTS, ...JOB_CIRCULAR_POSTS];

export interface CategoryMeta {
  name: string;
  slug: string;
  bnName: string;
  description: string;
  source: string;
}

export const CATEGORY_LIST: CategoryMeta[] = [
  {
    name: 'Baby Boy & Girl Name',
    slug: 'baby-boy-girl-name',
    bnName: 'ছেলে ও মেয়ে শিশুর নাম',
    description: 'ছেলেদের ও মেয়েদের ইসলামিক নাম, ইমো/ফেসবুক আইডির নাম, বিদেশি নাম ও নামের অর্থসহ তালিকা',
    source: 'https://educationblog24.com/category/baby-boy-girl-name',
  },
  {
    name: 'Job Circular News',
    slug: 'job-circular-news',
    bnName: 'চাকরির সার্কুলার ও নিয়োগ বিজ্ঞপ্তি',
    description: 'বিসিএস, ব্যাংক, সরকারি-বেসরকারি চাকরির সার্কুলার, নিয়োগ বিজ্ঞপ্তি ও সাপ্তাহিক চাকরির খবর',
    source: 'https://educationblog24.com/category/job-circular-news',
  },
];

export function getCategoryPosts(categorySlug: string = '${CATEGORY_SLUG}'): CategoryPost[] {
  return CATEGORY_POSTS.filter((p) => p.categorySlug === categorySlug);
}

export function getCategoryPostBySlug(slug: string): CategoryPost | undefined {
  return CATEGORY_POSTS.find((p) => p.slug === slug);
}

export function getRelatedCategoryPosts(slug: string, limit = 3): CategoryPost[] {
  const current = getCategoryPostBySlug(slug);
  if (!current) return [];
  return CATEGORY_POSTS.filter((p) => p.slug !== slug && p.categorySlug === current.categorySlug).slice(0, limit);
}
`;
}

function sqlEscape(s) {
  return (s || '').replace(/'/g, "''");
}

function buildSql(posts) {
  const rows = posts
    .map((p) => {
      const slug = sqlEscape(p.slug);
      const title = sqlEscape(p.title);
      const desc = sqlEscape(p.excerpt);
      const img = sqlEscape(p.image);
      const link = sqlEscape(p.link);
      return `INSERT INTO books (title, slug, class_name, class_slug, subject, subject_slug, book_type, year, description, cover_image, pdf_url, author, publisher, is_published, is_latest)
VALUES ('${title}', '${slug}', 'Baby Boy & Girl Name', 'baby-boy-girl-name', 'বেবি নেম লিস্ট', 'baby-names', 'other', 2026, '${desc}', '${img}', '${link}', 'Educationblog24.com', 'BD Edu PDF', true, false);`;
    })
    .join('\n');

  return `-- Seed data: Baby Boy & Girl Name category (from educationblog24.com)
-- Run in Supabase SQL editor. Slugs are unique; re-running is safe because of ON CONFLICT-free plain inserts.

${rows}
`;
}

(async () => {
  const posts = await fetchPosts();
  if (posts.length === 0) {
    console.error('No posts fetched.');
    process.exit(1);
  }
  const outDir = path.resolve(process.cwd());
  fs.writeFileSync(path.join(outDir, 'lib', 'categories-data.ts'), buildTsFile(posts), 'utf8');
  fs.writeFileSync(path.join(outDir, 'supabase', 'seed-baby-names.sql'), buildSql(posts), 'utf8');
  console.log(`Wrote lib/categories-data.ts (${posts.length} posts) and supabase/seed-baby-names.sql`);
})();
