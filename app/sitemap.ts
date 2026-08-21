import { MetadataRoute } from 'next';
import { CLASSES_LIST, SUBJECTS_LIST, DIVISION_COLLEGES_REQ, DETAILED_COLLEGES_LIST } from '@/lib/types';
import { getBooks } from '@/lib/data';
import { getAdmissionBookHref } from '@/lib/admission';
import { getBaseUrl } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();
  const books = await getBooks();

  const divisionRoutes = DIVISION_COLLEGES_REQ.map((d) => `/college-admission/${d.slug}`);
  const individualCollegeRoutes = DETAILED_COLLEGES_LIST.map((c) => `/college/${c.slug}`);

  // Static & Hub routes
  const staticRoutes = [
    '',
    '/books',
    '/textbooks',
    '/guide-books',
    '/hsc-exam-routine',
    '/hsc-routine',
    '/college-admission',
    '/college-admission/ndc',
    '/college-admission/holy-cross',
    '/college-admission/st-joseph',
    '/college-admission/how-to-apply',
    '/college-admission/requirements-gpa-cut-marks',
    '/blogs',
    '/blogs/ssc-vocational-result-2026-bteb',
    '/blogs/ssc-result-2026-marksheet-check-online',
    '/blogs/disability-allowance-online-application-2026',
    '/blogs/prize-bond-draw-124-result-2026',
    '/blogs/boyosko-bhata-online-application-2026',
    '/blogs/banglalink-refer-code-free-internet',
    '/blogs/sylhet-board-ssc-result-marksheet-2026',
    '/blogs/how-to-recover-lost-academic-certificate',
    '/blogs/new-voter-id-card-download-online-2026',
    '/blogs/widow-allowance-online-application-2026',
    '/blogs/shikhsha-upobitti-application-rules-eligibility-2026',
    '/blogs/new-voter-list-check-online',
    '/blogs/nu-honours-1st-year-routine-2026-pdf',
    '/nu-honours-routine',
    '/blogs/primary-scholarship-routine-2026-pdf',
    '/blogs/degree-admission-circular-2026-nu',
    '/blogs/honours-1st-year-ict-suggestion-2026-pdf',
    '/blogs/honours-1st-year-history-suggestion-pdf',
    '/blogs/honours-1st-year-history-of-emergence-syllabus-suggestion',
    '/blogs/honours-1st-year-ict-book-pdf-download',
    '/blogs/nu-masters-final-year-result-2026',
    '/blogs/fazil-honours-routine-2026-pdf',
    '/blogs/nu-degree-1st-year-form-fillup-2026',
    '/blogs/honours-1st-year-history-of-bangladesh-short-suggestion',
    '/blogs/honours-1st-year-ict-guide-book-pdf',
    ...divisionRoutes,
    '/colleges',
    ...individualCollegeRoutes,
    '/class/admission',
    '/admission/du',
    '/admission/buet',
    '/admission/medical',
    '/admission/cu',
    '/admission/ru',
    '/admission/gst',
    '/admission/agri',
    '/search',
    '/sitemap',
    '/about',
    '/privacy-policy',
    '/terms',
    '/disclaimer',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' || route === '/hsc-exam-routine' || route === '/college-admission' || route === '/colleges' ? 1.0 : 0.8,
  }));

  // Class routes
  const classRoutes = CLASSES_LIST.map((cls) => ({
    url: `${baseUrl}/class/${cls.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Subject routes
  const subjectRoutes: MetadataRoute.Sitemap = [];
  CLASSES_LIST.forEach((cls) => {
    SUBJECTS_LIST.forEach((subj) => {
      subjectRoutes.push({
        url: `${baseUrl}/${cls.slug}/${subj.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      });
    });
  });

  // Book detail routes
  const bookRoutes = books.map((book) => ({
    url: `${baseUrl}${getAdmissionBookHref(book)}`,
    lastModified: new Date(book.updated_at || book.created_at || Date.now()),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...classRoutes, ...subjectRoutes, ...bookRoutes];
}
