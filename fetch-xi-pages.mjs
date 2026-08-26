import fs from 'fs';

const BASE = 'https://xiclass.bd/wp-json/xccf/v1/search';
const REV = '3eff79e70e';
const OUT = 'C:/Users/Haque/AppData/Local/Temp/opencode/xi-all.json';

async function main() {
  const all = [];
  let page = 1;
  while (true) {
    const url = `${BASE}?year=2026&sort=cutoff_desc&page=${page}&per_page=100&rev=${REV}`;
    let j;
    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.error(`HTTP ${res.status} on page ${page}`);
        break;
      }
      j = await res.json();
    } catch (e) {
      console.error(`FETCH FAIL page ${page}: ${e.message}`);
      break;
    }
    if (!j.items || j.items.length === 0) break;
    all.push(...j.items);
    if (page % 10 === 0 || !j.items.length) console.log(`page ${page}: cumulative ${all.length}/${j.total}`);
    if (all.length >= j.total) break;
    page++;
    await new Promise((r) => setTimeout(r, 150));
  }
  fs.writeFileSync(OUT, JSON.stringify(all));
  console.log(`DONE: saved ${all.length} colleges to ${OUT}`);
}

main();
