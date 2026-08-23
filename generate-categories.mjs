import fs from 'fs';
import path from 'path';

const SITE = 'https://educationblog24.com';
const CATEGORY_ID = 39;
const CATEGORY_SLUG = 'baby-boy-girl-name';
const CATEGORY_NAME = 'Baby Boy & Girl Name';
const PER_PAGE = 50;
const PAGES = 1; // increase to pull more (category has ~1990 posts)

function decodeEntities(str) {
  return str
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

function firstImage(html) {
  const m = (html || '').match(/<img[^>]+src=["']([^"']+)["']/i);
  return m ? m[1] : '';
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
      const content = p.content?.rendered || '';
      const image = firstImage(content) || 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=1200&q=80';
      all.push({
        id: p.id,
        title: stripHtml(p.title?.rendered || ''),
        slug,
        excerpt: stripHtml(p.excerpt?.rendered || '').slice(0, 200),
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

export const CATEGORY_POSTS: CategoryPost[] = [
${items}
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
  return CATEGORY_POSTS.filter((p) => p.slug !== slug).slice(0, limit);
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
