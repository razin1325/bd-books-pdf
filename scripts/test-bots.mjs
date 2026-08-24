import fs from 'fs';

const bots = [
  { name: 'Googlebot', ua: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' },
  { name: 'Bingbot', ua: 'Mozilla/5.0 (compatible; Bingbot/2.0; +http://www.bing.com/bingbot.htm)' },
  { name: 'Twitterbot', ua: 'Twitterbot/1.0' },
  { name: 'LinkedInBot', ua: 'LinkedInBot/1.0 (compatible; Mozilla/5.0; Jakarta Commons-HttpClient/3.1)' },
  { name: 'WhatsApp', ua: 'WhatsApp/2.21.12.21 A' },
  { name: 'TelegramBot', ua: 'TelegramBot (like TwitterBot)' },
];

const target = 'https://www.facebook.com/permalink.php?story_fbid=pfbid0FRVxY9oqfh8qW1dDXQAPtukpnVyREpLhaTzjQhG81yKrftRpVfnLAvDttLb7L2Uyl&id=100005194097988';

async function testAll() {
  for (const bot of bots) {
    console.log(`Testing ${bot.name}...`);
    try {
      const res = await fetch(target, { headers: { 'User-Agent': bot.ua } });
      const html = await res.text();
      const imgs = html.match(/https:\/\/[^\s"'<>\\]*(?:scontent|fbcdn|lookaside)[^\s"'<>\\]*/gi) || [];
      console.log(`  Status: ${res.status}, Len: ${html.length}, Images: ${imgs.length}`);
      if (imgs.length > 5) {
        fs.writeFileSync(`fb_${bot.name}.html`, html, 'utf8');
      }
    } catch (e) {
      console.error(`  Failed: ${e.message}`);
    }
  }
}

testAll();
