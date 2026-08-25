import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import BookCard from '@/components/BookCard';
import ExpandableBookGrid from '@/components/ExpandableBookGrid';
import BookCover from '@/components/BookCover';
import AdSlot from '@/components/AdSlot';
import { CLASSES_LIST, SUBJECTS_LIST } from '@/lib/types';
import { getAdmissionBookHref } from '@/lib/admission';
import { getBaseUrl, getGoogleDriveEmbedUrl } from '@/lib/site';
import {
  getBookBySlug,
  getBooksBySubject,
  getRelatedBooks,
  getBooksByClass,
} from '@/lib/data';
import {
  BookOpen,
  Download,
  ExternalLink,
  FileText,
  Calendar,
  Layers,
  User,
  Building,
} from 'lucide-react';

interface RouteProps {
  params: Promise<{
    classSlug: string;
    secondSlug: string;
  }>;
  searchParams?: Promise<{
    page?: string;
  }>;
}

function safeDecodeSlug(raw: string): string {
  if (!raw) return '';
  try {
    return decodeURIComponent(raw);
  } catch {
    try {
      return decodeURIComponent(raw.replace(/(%[0-9a-f]{0,2})$/i, ''));
    } catch {
      return raw;
    }
  }
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { classSlug, secondSlug: rawSecondSlug } = await params;
  const secondSlug = safeDecodeSlug(rawSecondSlug);
  const currentClass = CLASSES_LIST.find((c) => c.slug === classSlug);

  if (!currentClass) return { title: 'Page Not Found' };

  // Check if secondSlug matches a standard or custom subject
  let currentSubject = SUBJECTS_LIST.find((s) => s.slug === secondSlug);
  if (!currentSubject) {
    const subjectBooks = await getBooksBySubject(classSlug, secondSlug);
    if (subjectBooks.length > 0) {
      currentSubject = {
        name: subjectBooks[0].subject,
        slug: secondSlug,
        bnName: subjectBooks[0].subject,
      };
    }
  }

  if (currentSubject) {
    const title = `${currentClass.name} ${currentSubject.name} Book & Guide PDF 2026`;
    const description = `${currentClass.name} ${currentSubject.name} Book & Guide PDF 2026. ${currentClass.bnName}-এর ${currentSubject.bnName} বিষয়ের সকল পাঠ্যবই ও গাইড PDF পড়ুন ও ডাউনলোড করুন।`;
    return {
      title,
      description,
      openGraph: { title, description },
    };
  }

  // Otherwise check if secondSlug is a book
  const book = await getBookBySlug(secondSlug);
  if (book) {
    const title = `${book.title} | ${book.subject} PDF`;
    const description = `${book.description.substring(0, 160)}`;
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: book.cover_image ? [{ url: book.cover_image }] : [],
      },
    };
  }

  return { title: 'Page Not Found' };
}

export default async function DynamicRoutePage({ params, searchParams }: RouteProps) {
  const { classSlug, secondSlug: rawSecondSlug } = await params;
  const secondSlug = safeDecodeSlug(rawSecondSlug);
  const sParams = searchParams ? await searchParams : {};
  const currentPage = sParams.page === '2' ? 2 : 1;

  const currentClass = CLASSES_LIST.find((c) => c.slug === classSlug);

  if (!currentClass) {
    notFound();
  }

  // Check standard subject first, then custom subject from books
  let currentSubject = SUBJECTS_LIST.find((s) => s.slug === secondSlug);
  const subjectBooks = await getBooksBySubject(classSlug, secondSlug);

  if (!currentSubject && subjectBooks.length > 0) {
    currentSubject = {
      name: subjectBooks[0].subject,
      slug: secondSlug,
      bnName: subjectBooks[0].subject,
    };
  }

  // CASE 1: Subject Page (standard or custom)
  if (currentSubject) {
    const textbookBooks = subjectBooks.filter((b) => b.book_type === 'textbook');
    const guideBooks = subjectBooks.filter((b) => b.book_type === 'guide' || b.book_type === 'solution');

    return (
      <div className="space-y-8">
        <Breadcrumb
          items={[
            { label: currentClass.name, href: `/class/${classSlug}` },
            { label: currentSubject.name },
          ]}
        />

        <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-xs space-y-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            {currentClass.name} {currentSubject.name} Book & Guide PDF 2026
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            {currentClass.bnName}-এর {currentSubject.bnName} (
            {currentSubject.name}) বিষয়ের মূল পাঠ্যবই, গাইড বই এবং নোট PDF এখানে পাওয়া যাবে। প্রয়োজনীয় বইটি ক্লিক করে সম্পূর্ণ ফ্রিতে অনলাইন ভিউ অথবা সরাসরি ডাউনলোড করুন।
          </p>
        </div>

        <AdSlot slotId={`subject-${classSlug}-${secondSlug}-top`} />

        {/* Section 1: Guide Books & Solutions */}
        {guideBooks.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 border-b border-gray-200 pb-2">
              <FileText className="w-6 h-6 text-emerald-600" />
              <h2 className="text-xl font-bold text-gray-900">
                {currentClass.bnName} {currentSubject.bnName} গাইড বই ও সমাধান (Guide Books & Solutions)
              </h2>
            </div>
            <ExpandableBookGrid books={guideBooks} initialCount={5} step={5} />
          </div>
        )}

        {/* Section 2: Text Books */}
        {textbookBooks.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 border-b border-gray-200 pb-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">
                {currentClass.bnName} {currentSubject.bnName} পাঠ্যবই (Text Books)
              </h2>
            </div>
            <ExpandableBookGrid books={textbookBooks} initialCount={5} step={5} />
          </div>
        )}

        {/* Section 3: All Subject Books Fallback */}
        {guideBooks.length === 0 && textbookBooks.length === 0 && subjectBooks.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 border-b border-gray-200 pb-2">
              <BookOpen className="w-6 h-6 text-emerald-600" />
              <h2 className="text-xl font-bold text-gray-900">
                {currentClass.bnName} {currentSubject.bnName} বই ও গাইড সংকলন
              </h2>
            </div>
            <ExpandableBookGrid books={subjectBooks} initialCount={6} step={6} />
          </div>
        )}
      </div>
    );
  }

  // CASE 2: Book Detail Page
  const book = await getBookBySlug(secondSlug);
  if (!book) {
    notFound();
  }

  const relatedBooks = await getRelatedBooks(book, 4);
  const bookPageUrl = getAdmissionBookHref(book);

  // Book JSON-LD Structured Data Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: book.title,
    author: {
      '@type': 'Person',
      name: book.author || 'NCTB / Education Board',
    },
    publisher: {
      '@type': 'Organization',
      name: book.publisher || 'BD Edu PDF Library',
    },
    inLanguage: 'bn',
    description: book.description,
    genre: book.book_type,
    image: book.cover_image,
    url: `${getBaseUrl()}${bookPageUrl}`,
  };

  return (
    <div className="space-y-8">
      {/* Schema Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumb
        items={[
          { label: book.class_name, href: `/class/${book.class_slug}` },
          {
            label: book.subject,
            href: `/${book.class_slug}/${book.subject_slug}`,
          },
          { label: `${book.title} ${currentPage > 1 ? `(পৃষ্ঠা ${currentPage})` : ''}` },
        ]}
      />

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Book Cover */}
          <div className="w-full lg:w-72 shrink-0 flex flex-col items-center">
            <div className="w-52 lg:w-full max-w-[240px]">
              <BookCover title={book.title} className={book.class_name} coverImage={book.cover_image} />
            </div>
            <div className="mt-4 w-full text-center">
              <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200">
                {book.year} Academic Edition
              </span>
            </div>
          </div>

          {/* Book Details */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-extrabold rounded-full">
                {book.class_name} • {book.subject}
              </span>
              <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                পৃষ্ঠা নাম্বার: <strong className="text-emerald-700">{currentPage} / ২</strong>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
              {book.title} {currentPage > 1 && <span className="text-emerald-600 text-lg sm:text-xl block mt-1">(পৃষ্ঠা ২ - বিস্তারিত গাইড ও সমাধান)</span>}
            </h1>

            {/* Quick Metadata */}
            <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-gray-600 pt-1">
              <div className="flex items-center space-x-1.5">
                <Layers className="w-4 h-4 text-gray-400" />
                <span>Class: <strong className="text-gray-900">{book.class_name}</strong></span>
              </div>
              <div className="flex items-center space-x-1.5">
                <BookOpen className="w-4 h-4 text-gray-400" />
                <span>Subject: <strong className="text-gray-900">{book.subject}</strong></span>
              </div>
              <div className="flex items-center space-x-1.5">
                <FileText className="w-4 h-4 text-gray-400" />
                <span>Type: <strong className="text-gray-900 capitalize">{book.book_type}</strong></span>
              </div>
            </div>

            {/* Action Buttons */}
            {currentPage === 1 && (
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={book.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base rounded-xl transition-all shadow-sm hover:shadow flex items-center justify-center space-x-2"
                >
                  <ExternalLink className="w-5 h-5" />
                  <span>Read Online (অনলাইনে পড়ুন)</span>
                </a>

                <a
                  href={book.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3.5 px-6 bg-gray-900 hover:bg-gray-800 text-white font-bold text-sm sm:text-base rounded-xl transition-all shadow-sm hover:shadow flex items-center justify-center space-x-2"
                >
                  <Download className="w-5 h-5" />
                  <span>Download PDF (ডাউনলোড করুন)</span>
                </a>
              </div>
            )}

            {/* Blog Article & Book Overview Section */}
            {currentPage === 1 && (
              <div className="pt-5 border-t border-gray-200 space-y-3">
                <h2 className="text-base sm:text-lg font-extrabold text-gray-900 flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-emerald-600" />
                  <span>বইয়ের বিস্তারিত তথ্য ও রিভিউ (Blog & Review Article):</span>
                </h2>
                <div className="text-sm sm:text-base text-gray-800 leading-relaxed whitespace-pre-line bg-gray-50/70 p-4 sm:p-5 rounded-xl border border-gray-200/80">
                  {book.description}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <AdSlot slotId={`book-detail-top-page-${currentPage}`} />

      {/* Embedded Google Drive PDF Viewer (Page 1 Only) */}
      {currentPage === 1 && book.pdf_url && (
        <section className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 space-y-4 shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center space-x-2 border-b border-gray-100 pb-3">
            <FileText className="w-5 h-5 text-emerald-600" />
            <span>অনলাইন পিডিএফ ভিউয়ার (Google Drive Reader):</span>
          </h2>
          <div className="relative w-full h-[480px] sm:h-[620px] bg-slate-100 rounded-xl overflow-hidden border border-gray-300 shadow-inner">
            <iframe
              src={getGoogleDriveEmbedUrl(book.pdf_url)}
              className="w-full h-full border-0"
              allow="autoplay"
              title={`${book.title} PDF Reader`}
            />
          </div>
        </section>
      )}

      {/* PAGE 1: NEXT PAGE PAGINATION CTA CARD FOR ADS & REVENUE */}
      {currentPage === 1 && (
        <div className="bg-gradient-to-r from-emerald-900 via-teal-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-emerald-700/50 space-y-4 text-center">
          <div className="space-y-2">
            <span className="bg-emerald-500/30 text-emerald-200 text-xs font-bold px-3 py-1 rounded-full border border-emerald-400/30 inline-block">
              পড়ুন পরবর্তী অংশে... (Next Page)
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              পরবর্তী পৃষ্ঠায় আরও বিস্তারিত সমাধান ও অধ্যায়ভিত্তিক গুরুত্বপূর্ণ কুইজ দেখুন
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl mx-auto">
              পরীক্ষার প্রস্তুতি সহজ করতে এবং পরবর্তী অধ্যায়ের সমাধান পেতে নিচের বোতামে ক্লিক করুন।
            </p>
          </div>

          <div className="pt-2 flex justify-center">
            <Link
              href={`${bookPageUrl}?page=2`}
              className="py-4 px-8 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-base sm:text-lg rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-0.5 flex items-center space-x-3 border border-emerald-400/40 group"
            >
              <span>পরবর্তী পৃষ্ঠা (Next Page) পড়ুন →</span>
            </Link>
          </div>
        </div>
      )}

      {/* PAGE 2 CONTENT */}
      {currentPage === 2 && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-emerald-950 flex items-center space-x-2">
              <FileText className="w-5 h-5 text-emerald-600" />
              <span>পৃষ্ঠা ২: {book.title} (অধ্যায়ভিত্তিক দিকনির্দেশনা ও নমুনা প্রশ্ন)</span>
            </h2>
            <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed">
              স্বাগতম পৃষ্ঠা ২-এ! নিচে এই গাইড বা মূল পাঠ্যবই সম্পর্কিত অতিরিক্ত রিভিশন নোট ও প্রশ্নোত্তর প্রস্তুত করা হয়েছে।
            </p>
          </div>

          <AdSlot slotId="book-detail-page-2-mid" />

          <div className="bg-gray-50/80 p-5 sm:p-7 rounded-2xl border border-gray-200 space-y-4 text-sm sm:text-base leading-relaxed text-gray-800">
            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2">
              📌 পরীক্ষার জন্য বিশেষ পরামর্শ ও প্রশ্নোত্তর:
            </h3>
            <p>
              ১. <strong>প্রশ্ন:</strong> {book.subject} বিষয়ে ভালো মার্কস পাওয়ার উপায় কী?<br />
              <strong>উত্তর:</strong> মূল এনসিটিবি বইয়ের অধ্যায়গুলো মনোযোগ দিয়ে রিভিশন দিন এবং প্রতিটি চ্যাপ্টারের অনুশীলনী কুইজ নিজে চর্চা করুন।
            </p>
            <p>
              ২. <strong>প্রশ্ন:</strong> পিডিএফ গাইডটি ড্রাইভে সংরক্ষণ করবেন কীভাবে?<br />
              <strong>উত্তর:</strong> পৃষ্ঠা ১-এর &quot;অনলাইনে পড়ুন (Google Drive)&quot; অপশন ব্যবহার করে বইটি সরাসরি আপনার জি-মেইলে সেভ রাখতে পারবেন।
            </p>
          </div>

          <AdSlot slotId="book-detail-page-2-bottom" />

          {/* PREVIOUS PAGE BUTTON */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-200">
            <Link
              href={bookPageUrl}
              className="py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-xl transition-all flex items-center space-x-2 border border-slate-300"
            >
              <span>← পূর্ববর্তী পৃষ্ঠা (Page 1)</span>
            </Link>

            <div className="flex items-center space-x-2 text-xs font-bold">
              <Link
                href={bookPageUrl}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 text-gray-700 hover:bg-emerald-100 hover:text-emerald-700"
              >
                ১
              </Link>
              <span className="w-9 h-9 flex items-center justify-center rounded-lg bg-emerald-600 text-white shadow-xs">
                ২
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Book Information Section */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 space-y-4 shadow-xs">
        <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center space-x-2">
          <FileText className="w-5 h-5 text-emerald-600" />
          <span>Book Information (বই সম্পর্কিত তথ্য)</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div className="p-3 bg-gray-50 rounded-lg flex items-center space-x-3">
            <Layers className="w-5 h-5 text-gray-400" />
            <div>
              <span className="text-xs text-gray-500 block">Class (শ্রেণি)</span>
              <span className="font-semibold text-gray-900">{book.class_name}</span>
            </div>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg flex items-center space-x-3">
            <BookOpen className="w-5 h-5 text-gray-400" />
            <div>
              <span className="text-xs text-gray-500 block">Subject (বিষয়)</span>
              <span className="font-semibold text-gray-900">{book.subject}</span>
            </div>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg flex items-center space-x-3">
            <FileText className="w-5 h-5 text-gray-400" />
            <div>
              <span className="text-xs text-gray-500 block">Book Type (বইয়ের ধরন)</span>
              <span className="font-semibold text-gray-900 capitalize">{book.book_type}</span>
            </div>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div>
              <span className="text-xs text-gray-500 block">Academic Year (শিক্ষাবর্ষ)</span>
              <span className="font-semibold text-gray-900">{book.year}</span>
            </div>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg flex items-center space-x-3">
            <User className="w-5 h-5 text-gray-400" />
            <div>
              <span className="text-xs text-gray-500 block">Author / Writer (লেখক)</span>
              <span className="font-semibold text-gray-900">{book.author || 'Education Board'}</span>
            </div>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg flex items-center space-x-3">
            <Building className="w-5 h-5 text-gray-400" />
            <div>
              <span className="text-xs text-gray-500 block">Publisher (প্রকাশনী)</span>
              <span className="font-semibold text-gray-900">{book.publisher || 'NCTB / Library'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Related Books Section */}
      {relatedBooks.length > 0 && (
        <section className="space-y-4 pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-2 border-b border-gray-200 pb-2">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-bold text-gray-900">
              Similar & Related Books ({book.class_name}-এর অন্যান্য প্রয়োজনীয় বই ও গাইড)
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4.5">
            {relatedBooks.map((relBook) => (
              <BookCard key={relBook.id} book={relBook} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
