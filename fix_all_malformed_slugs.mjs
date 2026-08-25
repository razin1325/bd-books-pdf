import fs from 'fs';

let content = fs.readFileSync('./lib/data.ts', 'utf-8');

function cleanSlug(slug) {
  if (!slug) return slug;
  let s = slug.trim();

  // Try decoding if percent encoded
  if (s.includes('%')) {
    try {
      s = decodeURIComponent(s);
    } catch {
      // Fix broken trailing % sequences
      s = s.replace(/(%[0-9a-f]{0,2})$/i, '');
      try {
        s = decodeURIComponent(s);
      } catch {}
    }
  }

  // Slugify nicely into clean URL string
  return s
    .toLowerCase()
    .replace(/[^\w\s\u0980-\u09FF-]/g, '') // Keep alphanumeric, Bengali, hyphens
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Find all slugs in lib/data.ts and sanitize them
let count = 0;
content = content.replace(/"slug":\s*"([^"]+)"/g, (match, p1) => {
  const cleaned = cleanSlug(p1);
  if (cleaned !== p1) {
    count++;
    console.log(`Fixing broken slug:\n  OLD: ${p1}\n  NEW: ${cleaned}\n`);
  }
  return `"slug": "${cleaned}"`;
});

fs.writeFileSync('./lib/data.ts', content);
console.log(`Fixed ${count} malformed/truncated slugs in lib/data.ts!`);
