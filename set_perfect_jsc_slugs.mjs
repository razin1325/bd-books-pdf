import fs from 'fs';

let content = fs.readFileSync('./lib/data.ts', 'utf-8');

const perfectSlugs = {
  "b-jsc-scraped-1787683963478-0": "class-8-bangla-grammar-book-2026-pdf",
  "b-jsc-scraped-1787683963478-1": "class-8-bangla-anandapath-book-2026-pdf",
  "b-jsc-scraped-1787683963478-2": "class-8-islam-and-moral-education-book-2026-pdf",
  "b-jsc-scraped-1787683963478-3": "class-8-home-science-book-2026-pdf",
  "b-jsc-scraped-1787683963478-4": "class-8-agriculture-education-book-2026-pdf",
  "b-jsc-scraped-1787683963478-5": "class-8-life-and-livelihood-education-book-2026-pdf",
  "b-jsc-scraped-1787683963478-6": "class-8-physical-education-and-health-book-2026-pdf",
  "b-jsc-scraped-1787683963478-7": "class-8-bangladesh-and-global-studies-bgs-book-2026-pdf",
  "b-jsc-scraped-1787683963478-8": "class-8-math-textbook-2026-pdf",
  "b-jsc-scraped-1787683963478-9": "class-8-english-2nd-paper-guide-book-2026-pdf",
  "b-jsc-scraped-1787683963478-10": "class-8-english-grammar-and-composition-book-2026-pdf",
  "b-jsc-scraped-1787683963478-11": "class-8-english-for-today-book-2026-pdf",
  "b-jsc-scraped-1787683963478-12": "class-8-math-solution-chapter-3-pdf",
  "b-jsc-scraped-1787683963478-13": "class-8-math-solution-chapter-2-pdf",
  "b-jsc-scraped-1787683963478-14": "class-8-math-solution-chapter-1-pdf",
  "b-jsc-scraped-1787683963478-15": "class-8-math-solution-chapter-10-pdf",
  "b-jsc-scraped-1787683963478-16": "class-8-math-solution-chapter-9-pdf",
  "b-jsc-scraped-1787683963478-17": "class-8-math-solution-chapter-8-pdf",
  "b-jsc-scraped-1787683963478-18": "class-8-math-solution-chapter-7-pdf",
  "b-jsc-scraped-1787683963478-19": "class-8-math-solution-chapter-6-pdf",
  "b-jsc-scraped-1787683963478-20": "class-8-math-solution-chapter-5-pdf",
  "b-jsc-scraped-1787683963478-21": "class-8-math-solution-chapter-4-pdf",
  "b-jsc-scraped-1787683963478-22": "class-8-english-textbook-eight-pdf"
};

// Also map old slugs into oldSlug array/map if needed, but here we set perfect clean slugs!
let count = 0;
for (const [id, newSlug] of Object.entries(perfectSlugs)) {
  const regex = new RegExp(`("id":\\s*"${id}"[\\s\\S]*?"slug":\\s*")[^"]+(")`);
  if (regex.test(content)) {
    content = content.replace(regex, `$1${newSlug}$2`);
    count++;
  }
}

fs.writeFileSync('./lib/data.ts', content);
console.log(`Updated ${count} JSC books with 100% clean, valid SEO slugs!`);
