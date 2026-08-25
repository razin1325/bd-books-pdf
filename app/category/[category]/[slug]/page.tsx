import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumb from '@/components/Breadcrumb';
import AdSlot from '@/components/AdSlot';
import CategoryCard from '@/components/CategoryCard';
import { getCategoryPostBySlug, getRelatedCategoryPosts, getCategoryPosts, CATEGORY_POSTS } from '@/lib/categories-data';
import { getBookBySlug } from '@/lib/data';
import { getGoogleDriveEmbedUrl } from '@/lib/site';
import { generateBabyNameSvgImage, generateBookSvgImage } from '@/lib/svg-generator';
import { Calendar, ArrowRight, Sparkles, BookOpen, ExternalLink, Download, FileText, Layers } from 'lucide-react';

// Turbopack dev can deliver the raw percent-encoded segment; decode when needed.
function normalizeSlug(raw: string): string {
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

interface RouteProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
  searchParams?: Promise<{
    page?: string;
  }>;
}

export async function generateStaticParams() {
  const paramsList: Array<{ category: string; slug: string }> = CATEGORY_POSTS.map((post) => ({
    category: post.categorySlug,
    slug: post.slug,
  }));

  const dynamicCategories = [
    'jsc-all-books-and-notes',
    'ssc-all-books-and-notes',
    'all-test-paper',
    'class-six-seven-books-and-note',
    'hsc-hand-note',
    'baby-boy-girl-name',
    'job-circular-news',
  ];

  for (const cat of dynamicCategories) {
    const posts = getCategoryPosts(cat);
    for (const p of posts) {
      paramsList.push({
        category: cat,
        slug: p.slug,
      });
    }
  }

  return paramsList;
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getCategoryPostBySlug(normalizeSlug(slug));

  if (!post) {
    return { title: 'Post Not Found | BD Edu PDF' };
  }

  return {
    title: `${post.title} | BD Edu PDF`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function CategoryDetailPage({ params, searchParams }: RouteProps) {
  const { slug } = await params;
  const sParams = searchParams ? await searchParams : {};
  const currentPage = sParams.page === '2' ? 2 : 1;

  const normalized = normalizeSlug(slug);
  const post = getCategoryPostBySlug(normalized);

  if (!post) {
    notFound();
  }

  const bookMatch = await getBookBySlug(normalized);
  const pdfUrl = post.pdf_url || bookMatch?.pdf_url;
  const fileSize = post.file_size || bookMatch?.file_size;
  const author = post.author || bookMatch?.author;
  const publisher = post.publisher || bookMatch?.publisher;

  const related = getRelatedCategoryPosts(post.slug, 3);
  const isExternalImage = Boolean(
    post.image &&
    (post.image.includes('blogger') ||
     post.image.includes('educationblog24') ||
     post.image.includes('blogspot'))
  );

  const displayImage =
    (!isExternalImage && post.image) ||
    (post.categorySlug === 'baby-boy-girl-name'
      ? generateBabyNameSvgImage(post.title, post.category)
      : generateBookSvgImage(post.title, post.category));

  const jsonLdSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: displayImage,
    datePublished: post.date,
    publisher: {
      '@type': 'Organization',
      name: 'BD Edu PDF',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://bd-books-pdf.vercel.app/category/${post.categorySlug}/${encodeURIComponent(post.slug)}`,
    },
  };

  const pageBaseUrl = `/category/${post.categorySlug}/${encodeURIComponent(post.slug)}`;

  return (
    <div className="space-y-8 pb-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      <Breadcrumb
        items={[
          { label: 'Category', href: `/category/${post.categorySlug}` },
          { label: post.category, href: `/category/${post.categorySlug}` },
          { label: `${post.title} ${currentPage > 1 ? `(পৃষ্ঠা ${currentPage})` : ''}` },
        ]}
      />

      <article className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-10 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-pink-100 text-pink-800 text-xs font-extrabold px-3 py-1 rounded-full border border-pink-200">
              {post.category}
            </span>
            {pdfUrl && (
              <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full border border-emerald-200">
                PDF Guide / Drive Link
              </span>
            )}
          </div>

          <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            <span>পৃষ্ঠা নাম্বার:</span>
            <span className="text-pink-600 font-extrabold">{currentPage} / ২</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight">
          {post.title} {currentPage > 1 && <span className="text-pink-600 text-lg sm:text-2xl block mt-1">(পৃষ্ঠা ২ - সমাধান ও প্রশ্নোত্তর)</span>}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-gray-100 text-xs sm:text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>{post.date}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Sparkles className="w-4 h-4 text-pink-500" />
              <span>BD Edu PDF</span>
            </span>
          </div>
          <div className="flex items-center space-x-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{pdfUrl ? 'PDF ফাইল সহ' : 'শিক্ষামূলক পোস্ট'}</span>
          </div>
        </div>

        {currentPage === 1 && displayImage && (
          <div className="relative w-full h-56 sm:h-80 rounded-2xl overflow-hidden border border-gray-200 shadow-md">
            <Image
              src={displayImage}
              alt={post.title}
              fill
              className="object-cover"
              unoptimized
              priority
            />
          </div>
        )}

        {/* Drive Download & Action Buttons Box */}
        {pdfUrl && currentPage === 1 && (
          <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl space-y-4 border border-emerald-700/50">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center space-x-2">
                <BookOpen className="w-6 h-6 text-emerald-400 animate-bounce" />
                <span>গুগল ড্রাইভ ও পিডিএফ ফাইল ডাউনলোড (PDF Drive Link)</span>
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100">
                বইটি সরাসরি অনলাইনে গুগল ড্রাইভে পড়তে বা ডিভাইসে পিডিএফ হিসেবে পেতে নিচের লিংকে ক্লিক করুন।
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 px-6 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm sm:text-base rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <ExternalLink className="w-5 h-5" />
                <span>অনলাইনে পড়ুন (Google Drive)</span>
              </a>

              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 px-6 bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-sm sm:text-base rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 border border-slate-600"
              >
                <Download className="w-5 h-5 text-emerald-400" />
                <span>পিডিএফ ডাউনলোড করুন</span>
              </a>
            </div>

            {(fileSize || author || publisher) && (
              <div className="flex flex-wrap items-center gap-4 text-xs text-emerald-200/90 pt-3 border-t border-emerald-700/50">
                {fileSize && <span>ফাইল সাইজ: <strong className="text-white">{fileSize}</strong></span>}
                {author && <span>লেখক/প্রকাশনী: <strong className="text-white">{author}</strong></span>}
                {publisher && <span>পাবলিশার: <strong className="text-white">{publisher}</strong></span>}
              </div>
            )}
          </div>
        )}

        <AdSlot slotId={`category-${post.id}-top-page-${currentPage}`} format="horizontal" />

        {/* Embedded Google Drive PDF Viewer (Page 1 only) */}
        {currentPage === 1 && pdfUrl && (
          <div className="space-y-3 pt-2">
            <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
              <FileText className="w-5 h-5 text-emerald-600" />
              <span>অনলাইন পিডিএফ ভিউয়ার (Google Drive Reader):</span>
            </h3>
            <div className="relative w-full h-[480px] sm:h-[620px] bg-slate-100 rounded-2xl overflow-hidden border border-gray-300 shadow-md">
              <iframe
                src={getGoogleDriveEmbedUrl(pdfUrl)}
                className="w-full h-full border-0"
                allow="autoplay"
                title={`${post.title} PDF Preview`}
              />
            </div>
          </div>
        )}

        {/* PAGE 1 CONTENT */}
        {currentPage === 1 && (
          <div className="space-y-6">
            <div
              className={`prose prose-pink max-w-none text-gray-800 space-y-5 leading-relaxed text-sm sm:text-base prose-headings:font-bold prose-headings:text-gray-900 prose-h2:text-xl prose-h2:sm:text-2xl prose-h2:border-b prose-h2:pb-2 prose-h2:mt-6 prose-h3:text-lg prose-h3:text-pink-950 prose-a:text-pink-700 prose-a:font-semibold prose-strong:text-gray-900 prose-table:w-full prose-table:border-collapse ${
                post.categorySlug === 'baby-boy-girl-name' ? 'prose-img:hidden' : 'prose-img:rounded-xl prose-img:border prose-img:border-gray-200'
              }`}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <AdSlot slotId={`category-${post.id}-mid-page-1`} format="horizontal" />

            {/* NEXT PAGE PAGINATION CTA CARD FOR ADS & PAGEVIEWS */}
            <div className="bg-gradient-to-r from-pink-900 via-rose-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-pink-700/50 space-y-4 text-center">
              <div className="space-y-2">
                <span className="bg-pink-500/30 text-pink-200 text-xs font-bold px-3 py-1 rounded-full border border-pink-400/30 inline-block">
                  পড়ুন পরবর্তী অংশে... (Page 2)
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  পরবর্তী পৃষ্ঠায় আরও বিস্তারিত গাইড ও গুরুত্বপূর্ণ প্রশ্নের উত্তর দেখুন
                </h3>
                <p className="text-xs sm:text-sm text-pink-100 max-w-2xl mx-auto">
                  এই বই বা পোস্টের পরবর্তী অংশ, অধ্যায়ভিত্তিক কুইজ ও সংক্ষিপ্ত প্রশ্নোত্তর দেখতে নিচের বোতামে ক্লিক করুন।
                </p>
              </div>

              <div className="pt-2 flex justify-center">
                <Link
                  href={`${pageBaseUrl}?page=2`}
                  className="py-4 px-8 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-black text-base sm:text-lg rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-0.5 flex items-center space-x-3 border border-pink-400/40 group"
                >
                  <span>পরবর্তী পৃষ্ঠা (Next Page) পড়ুন</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* PAGE 2 CONTENT */}
        {currentPage === 2 && (
          <div className="space-y-6 pt-2">
            <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl space-y-2">
              <h2 className="text-lg sm:text-xl font-bold text-emerald-950 flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                <span>পৃষ্ঠা ২: বিস্তারিত অধ্যায়ভিত্তিক প্রশ্ন ও সমাধান নির্দেশিকা</span>
              </h2>
              <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed">
                স্বাগতম পৃষ্ঠা ২-এ! নিচে এই বিষয়ে সম্পর্কিত অতিরিক্ত সংকলন, নমুনা প্রশ্ন এবং পরীক্ষার গুরুত্বপূর্ণ দিকনির্দেশনা দেওয়া হলো।
              </p>
            </div>

            <AdSlot slotId={`category-${post.id}-top-page-2`} format="horizontal" />

            <div className="bg-gray-50/80 p-5 sm:p-7 rounded-2xl border border-gray-200 space-y-4 text-sm sm:text-base leading-relaxed text-gray-800">
              <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2">
                📌 অধ্যায়ভিত্তিক গুরুত্বপূর্ণ কুইজ ও নমুনা উত্তর:
              </h3>
              <p>
                ১. <strong>প্রশ্ন:</strong> পরীক্ষায় ভালো ফলাফলের জন্য এই গাইড বইটি কীভাবে ব্যবহার করবেন?<br />
                <strong>উত্তর:</strong> প্রথমে এনসিটিবি মূল পাঠ্যবই মনোযোগ দিয়ে পড়ুন। এরপর অধ্যায়ভিত্তিক সংক্ষেপিত সমাধান ও বহুনির্বাচনী অংশগুলো বারবার রিভিশন দিন।
              </p>
              <p>
                ২. <strong>প্রশ্ন:</strong> পিডিএফ ফাইলটি কীভাবে অফলাইনে ব্যাকআপ রাখবেন?<br />
                <strong>উত্তর:</strong> উপরে দেওয়া &quot;অনলাইনে পড়ুন (Google Drive)&quot; বা &quot;পিডিএফ ডাউনলোড করুন&quot; বোতামে ক্লিক করে ফাইলটি আপনার গুগল ড্রাইভে সংরক্ষিত রাখতে পারেন।
              </p>
            </div>

            <AdSlot slotId={`category-${post.id}-bottom-page-2`} format="horizontal" />

            {/* PREVIOUS PAGE / PAGE 1 BUTTON */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-200">
              <Link
                href={pageBaseUrl}
                className="py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-xl transition-all flex items-center space-x-2 border border-slate-300"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                <span>← পূর্ববর্তী পৃষ্ঠা (Page 1)</span>
              </Link>

              <div className="flex items-center space-x-2 text-xs font-bold">
                <Link
                  href={pageBaseUrl}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 text-gray-700 hover:bg-pink-100 hover:text-pink-700"
                >
                  ১
                </Link>
                <span className="w-9 h-9 flex items-center justify-center rounded-lg bg-pink-600 text-white shadow-xs">
                  ২
                </span>
              </div>
            </div>
          </div>
        )}

        <AdSlot slotId={`category-${post.id}-bottom`} format="horizontal" />
      </article>

      {related.length > 0 && (
        <section className="space-y-4 pt-4">
          <div className="flex items-center space-x-2 border-b border-gray-200 pb-3">
            <BookOpen className="w-5 h-5 text-pink-600" />
            <h3 className="text-xl font-bold text-gray-900">
              {post.categorySlug === 'baby-boy-girl-name'
                ? 'আরও অন্যান্য নামের তালিকাসমূহ:'
                : post.categorySlug === 'job-circular-news'
                ? 'আরও অন্যান্য চাকরির সার্কুলারসমূহ:'
                : 'আরও অন্যান্য পোস্টসমূহ:'}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map((rel) => (
              <CategoryCard key={rel.id} post={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
