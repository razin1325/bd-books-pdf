import { MOCK_BOOKS } from './lib/data.ts';

const c910 = MOCK_BOOKS.filter(b => b.class_slug === 'class-9-10');
console.log('Total books in class-9-10:', c910.length);
c910.forEach((b, i) => console.log(`${i+1}. [${b.book_type}] ${b.title}`));
