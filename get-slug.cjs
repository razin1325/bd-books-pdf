const s = require('fs').readFileSync('lib/categories-data.ts', 'utf8');
const m = s.match(/slug: "([^"]+)"/);
console.log(m ? m[1] : 'none');
