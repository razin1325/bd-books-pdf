/**
 * Dynamic Base URL Helper for Next.js (Vercel & Local Development)
 * Ensures localhost URLs are never leaked in production sitemap / canonical metadata.
 */
export function getBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  // If NEXT_PUBLIC_SITE_URL is explicitly set and NOT localhost, use it
  if (envUrl && !envUrl.includes('localhost') && !envUrl.includes('127.0.0.1')) {
    return envUrl.replace(/\/$/, '');
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
    return 'https://bd-edu-books.vercel.app';
  }

  // Fallback for local development
  return envUrl ? envUrl.replace(/\/$/, '') : 'http://localhost:3000';
}
