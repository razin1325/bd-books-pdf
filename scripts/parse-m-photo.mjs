import fs from 'fs';

const html = fs.readFileSync('m_photo.html', 'utf8');

// Match image URLs
const urlRegex = /https:\/\/[^\s"'<>\\]*(?:scontent|fbcdn|lookaside)[^\s"'<>\\]*/gi;
const matches = (html.match(urlRegex) || []).map(u => u.replace(/\\/g, '').replace(/&amp;/g, '&'));
const cleaned = matches.filter(u => !u.includes('static.xx') && !u.includes('emoji.php') && !u.includes('rsrc.php'));

const unique = [...new Set(cleaned)];
console.log(`Found ${unique.length} unique photo URLs in m_photo.html:`);
unique.forEach((u, i) => console.log(`${i + 1}: ${u}`));
