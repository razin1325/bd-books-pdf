const s = require('fs').readFileSync('lib/categories-data.ts', 'utf8');
const m = s.match(/slug: "([^"]+)"/);
const dataSlug = m[1];
console.log('dataSlug:', dataSlug);
console.log('dataSlug len:', dataSlug.length);
console.log('dataSlug codepoints:', [...dataSlug].map((c) => c.codePointAt(0).toString(16)).join(' '));
console.log('dataSlug encoded:', encodeURIComponent(dataSlug));

const testSlug = 'মেয়েদের-নাম-আ-দিয়ে-মেয়';
console.log('testSlug len:', testSlug.length);
console.log('testSlug codepoints:', [...testSlug].map((c) => c.codePointAt(0).toString(16)).join(' '));
console.log('equal:', dataSlug === testSlug);
