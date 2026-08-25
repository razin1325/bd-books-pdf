import { MOCK_BOOKS } from './lib/data.ts';

const classSlugs = [...new Set(MOCK_BOOKS.map(b => b.class_slug))];
console.log('Unique class_slugs in MOCK_BOOKS:', classSlugs);

const sscBooks = MOCK_BOOKS.filter(b => 
  b.class_slug === 'class-9' || 
  b.class_slug === 'class-10' || 
  b.class_slug === 'class-9-10' || 
  b.class_slug === 'ssc' ||
  b.title.toLowerCase().includes('ssc') ||
  b.title.includes('এসএসসি') ||
  b.title.includes('৯ম') ||
  b.title.includes('১০ম') ||
  b.title.includes('নবম') ||
  b.title.includes('দশম')
);

console.log('SSC / Class 9-10 books count:', sscBooks.length);
