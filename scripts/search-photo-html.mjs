import fs from 'fs';

const html = fs.readFileSync('photo_page.html', 'utf8');

// Find all 15+ digit numbers starting with 3158
const numbers = html.match(/3158\d{10,14}/g) || [];
const unique = [...new Set(numbers)];

console.log(`Found ${unique.length} unique photo IDs starting with 3158:`);
unique.forEach((id, i) => console.log(`${i + 1}: ${id}`));
