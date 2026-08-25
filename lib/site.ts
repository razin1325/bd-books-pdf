/**
 * Dynamic Base URL Helper for Next.js (Vercel & Local Development)
 * Ensures localhost URLs are never leaked in production sitemap / canonical metadata.
 */
export function getBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  // If NEXT_PUBLIC_SITE_URL is explicitly set and NOT localhost, use it with HTTPS
  if (envUrl && !envUrl.includes('localhost') && !envUrl.includes('127.0.0.1')) {
    let formatted = envUrl.replace(/\/$/, '');
    if (formatted.startsWith('http://')) {
      formatted = formatted.replace('http://', 'https://');
    } else if (!formatted.startsWith('https://')) {
      formatted = `https://${formatted}`;
    }
    return formatted;
  }

  // Vercel automatic production URL
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`.replace(/\/$/, '');
  }

  // Vercel deployment preview / branch URL
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`.replace(/\/$/, '');
  }

  // Default fallback for production environment
  if (process.env.NODE_ENV === 'production') {
    return 'https://www.dyingfield.com';
  }

  // Fallback for local development
  return envUrl ? envUrl.replace(/\/$/, '') : 'http://localhost:3000';
}

/**
 * Normalizes any Google Drive file or folder URL into a clean, embeddable iframe preview URL.
 */
export function getGoogleDriveEmbedUrl(url?: string | null): string {
  if (!url) return '';
  const cleanUrl = url.trim();

  // 1. File ID matching (/file/d/ID/...)
  const fileMatch = cleanUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch && fileMatch[1]) {
    return `https://drive.google.com/file/d/${fileMatch[1]}/preview`;
  }

  // 2. Folder ID matching (/folders/ID or ?id=ID)
  const folderMatch =
    cleanUrl.match(/\/(?:mobile\/)?folders\/([a-zA-Z0-9_-]+)/) ||
    cleanUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (folderMatch && folderMatch[1]) {
    return `https://drive.google.com/embeddedfolderview?id=${folderMatch[1]}#list`;
  }

  // 3. Fallback replace /view with /preview
  return cleanUrl.replace(/\/view(\?.*)?$/, '/preview');
}
