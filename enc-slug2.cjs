const s = require('fs').readFileSync('lib/categories-data.ts', 'utf8');
const matches = [...s.matchAll(/slug: "([^"]+)"/g)].map((m) => m[1]);
// print slugs 4..6 (indexes) url-encoded
for (const i of [3, 4, 5]) {
  console.log(matches[i] ? encodeURIComponent(matches[i]) : 'none');
}
