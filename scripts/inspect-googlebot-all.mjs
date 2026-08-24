import fs from 'fs';

const html = fs.readFileSync('fb_Googlebot.html', 'utf8');

// Regex for image URLs inside Quotes or JSON
const matches = html.match(/https:\/\/[^\s"'<>\\]+/gi) || [];
const cleaned = matches.map(u => u.replace(/\\/g, '').replace(/&amp;/g, '&'));
const unique = [...new Set(cleaned)];

const imgUrls = unique.filter(u => u.includes('scontent') || u.includes('fbcdn') || u.includes('lookaside') || u.includes('.jpg') || u.includes('.png') || u.includes('.jpeg') || u.includes('.webp'));

console.log(`Found ${imgUrls.length} total image candidate URLs in Googlebot HTML:`);
imgUrls.forEach((u, i) => console.log(`${i + 1}: ${u}`));
