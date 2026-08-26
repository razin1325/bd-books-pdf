import fs from 'fs';

const IN = 'C:/Users/Haque/AppData/Local/Temp/opencode/xi-all.json';
const items = JSON.parse(fs.readFileSync(IN, 'utf8'));

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const used = new Map();
const records = items.map((c) => {
  let s = slugify(c.name || '');
  if (!s || s.length < 2) s = `college-${c.eiin}`;
  const n = used.get(s) || 0;
  used.set(s, n + 1);
  if (n > 0) s = `${s}-${c.eiin}`;
  return {
    eiin: c.eiin,
    slug: s,
    name: (c.name || '').trim(),
    board: c.board || '',
    district: c.district || '',
    thana: c.thana || '',
    gender: c.gender || '',
    gpa: c.cutoff ?? 0,
    gpaHi: c.cutoffHi ?? 0,
    seats: c.seats ?? 0,
    groups: c.groups || [],
    shifts: c.shifts || [],
    versions: c.versions || [],
  };
});

// sanity: unique slugs
if (new Set(records.map((r) => r.slug)).size !== records.length) {
  console.error('DUPLICATE SLUGS!');
  process.exit(1);
}

// ---- lib/xi-colleges-data.ts ----
const ts = `export interface XiCollege {
  eiin: number;
  slug: string;
  name: string;
  board: string;
  district: string;
  thana: string;
  gender: string;
  gpa: number;
  gpaHi: number;
  seats: number;
  groups: string[];
  shifts: string[];
  versions: string[];
}

export const XI_COLLEGES: XiCollege[] = ${JSON.stringify(records)};

export function getXiCollegeBySlug(slug: string): XiCollege | undefined {
  const s = decodeURIComponent(slug).toLowerCase();
  return XI_COLLEGES.find((c) => c.slug === s || String(c.eiin) === s);
}

export function getRelatedXiColleges(college: XiCollege, limit = 8): XiCollege[] {
  return XI_COLLEGES.filter((c) => c.eiin !== college.eiin && (c.district === college.district || c.board === college.board)).slice(0, limit);
}
`;
fs.writeFileSync('lib/xi-colleges-data.ts', ts);

// ---- public/data/xi-colleges.json (compact for client lazy-load) ----
fs.mkdirSync('public/data', { recursive: true });
fs.writeFileSync('public/data/xi-colleges.json', JSON.stringify(records));

console.log(`Generated lib/xi-colleges-data.ts and public/data/xi-colleges.json (${records.length} colleges)`);
const sample = records.slice(0, 3).map((r) => r.slug);
console.log('sample slugs:', sample.join(', '));
