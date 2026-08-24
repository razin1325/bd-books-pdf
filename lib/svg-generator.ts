function escapeXml(str: string): string {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function wordWrap(text: string, maxCharsPerLine = 22): string[] {
  const words = (text || '').trim().split(/\s+/);
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + ' ' + word).trim().length <= maxCharsPerLine) {
      currentLine = (currentLine + ' ' + word).trim();
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines.slice(0, 3);
}

export function generateBabyNameSvgImage(title: string, categoryName: string = 'Baby Boy & Girl Name'): string {
  const cleanTitle = title
    .replace(/&#\d+;/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\|\s*BD\s*Edu\s*PDF/gi, '')
    .trim();

  const lines = wordWrap(cleanTitle, 24);
  const escapedCategory = escapeXml(categoryName);

  const lineCount = lines.length;
  const startY = lineCount === 1 ? 315 : lineCount === 2 ? 280 : 250;
  const lineHeight = 65;

  const lineElements = lines
    .map((line, idx) => {
      const y = startY + idx * lineHeight;
      return `<text x="600" y="${y}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'SolaimanLipi', Arial, sans-serif" font-size="44" font-weight="900" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">${escapeXml(line)}</text>`;
    })
    .join('\n');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#4c0519"/>
        <stop offset="35%" stop-color="#831843"/>
        <stop offset="70%" stop-color="#9d174d"/>
        <stop offset="100%" stop-color="#4c1d95"/>
      </linearGradient>
      <linearGradient id="cardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="rgba(255,255,255,0.18)"/>
        <stop offset="100%" stop-color="rgba(0,0,0,0.4)"/>
      </linearGradient>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.5"/>
      </filter>
    </defs>
    
    <!-- Background -->
    <rect width="1200" height="630" fill="url(#bgGrad)"/>
    
    <!-- Decorative Glowing Circles -->
    <circle cx="120" cy="100" r="220" fill="rgba(255,255,255,0.05)"/>
    <circle cx="1080" cy="530" r="290" fill="rgba(236,72,153,0.15)"/>
    <circle cx="980" cy="120" r="170" fill="rgba(255,255,255,0.06)"/>

    <!-- Inner Card Frame -->
    <rect x="45" y="45" width="1110" height="540" rx="28" fill="url(#cardGrad)" stroke="rgba(255,255,255,0.25)" stroke-width="2.5"/>
    
    <!-- Top Pill Badge -->
    <rect x="410" y="85" width="380" height="54" rx="27" fill="#f43f5e" filter="url(#shadow)"/>
    <text x="600" y="119" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'SolaimanLipi', Arial, sans-serif" font-size="22" font-weight="800" fill="#ffffff" text-anchor="middle">👶 ${escapedCategory} 🌸</text>
    
    <!-- Title Lines -->
    <g filter="url(#shadow)">
      ${lineElements}
    </g>

    <!-- Divider -->
    <line x1="250" y1="485" x2="950" y2="485" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
    
    <!-- Footer Branding -->
    <text x="600" y="530" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'SolaimanLipi', Arial, sans-serif" font-size="24" font-weight="700" fill="#fbcfe8" text-anchor="middle">BD Edu PDF • ১০০% নির্ভুল নামের অর্থ সংকলন</text>
  </svg>`;

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

export function cleanBabyNamePostContent(html: string): string {
  if (!html) return '';
  return html
    .replace(/<a\s+[^>]*href=["'][^"']*(?:blogger|googleusercontent|educationblog24|blogspot)[^"']*["'][^>]*>[\s\S]*?<\/a>/gi, '')
    .replace(/<figure[^>]*>[\s\S]*?<\/figure>/gi, '')
    .replace(/<img[^>]*\/?>/gi, '')
    .replace(/<div\s+style=["'][^"']*text-align:\s*center;?["']>\s*<\/div>/gi, '')
    .replace(/<div[^>]*>\s*<\/div>/gi, '')
    .replace(/<p>\s*<\/p>/gi, '')
    .trim();
}
