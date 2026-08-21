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
import { getBaseUrl } from '@/lib/site';
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
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { classSlug, secondSlug } = await params;
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

export default async function DynamicRoutePage({ params }: RouteProps) {
  const { classSlug, secondSlug } = await params;
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

        {/* Fallback Empty State if 0 books in both */}
        {textbookBooks.length === 0 && guideBooks.length === 0 && (
          <div className="bg-amber-50 border border-amber-200 p-6 rounded-xl text-center space-y-2">
            <p className="text-sm text-amber-800 font-medium">
              বর্তমানে {currentClass.name} {currentSubject.name} বিষয়ের সরাসরি কোনো আলাদা বই আপলোড করা হয়নি।
            </p>
            <p className="text-xs text-amber-700">
              আপনি {currentClass.name}-এর অন্যান্য বিষয় বা লাইব্রেরির সকল বই ঘুরে দেখতে পারেন।
            </p>
          </div>
        )}
      </div>
    );
  }

  // CASE 2: Book Detail Page (e.g. /class-8/math-guide-pdf-2026)
  const book = await getBookBySlug(secondSlug);
  if (!book) {
    notFound();
  }

  const relatedBooks = await getRelatedBooks(book, 5);

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
    url: `${getBaseUrl()}${getAdmissionBookHref(book)}`,
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
          { label: book.subject, href: `/${book.class_slug}/${book.subject_slug}` },
          { label: book.title },
        ]}
      />

      {/* Main Book Detail Section */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Thumbnail */}
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-[260px] aspect-3/4 bg-gray-100 rounded-xl overflow-hidden shadow-sm border border-gray-200">
              <BookCover
                title={book.title}
                coverImage={book.cover_image}
                subject={book.subject}
                bookType={book.book_type}
                year={book.year}
                showBadges={false}
              />
            </div>
          </div>

          {/* Details & CTA Buttons */}
          <div className="md:col-span-2 space-y-6 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-md uppercase">
                  {book.book_type}
                </span>
                <span className="px-2.5 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-md">
                  {book.class_name}
                </span>
                <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-md">
                  {book.year} Academic Year
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
                {book.title}
              </h1>

              <div className="text-sm text-gray-500 flex items-center space-x-2">
                <span>Subject: <strong className="text-gray-800">{book.subject}</strong></span>
                {book.file_size && book.file_size.trim() !== '' && (
                  <>
                    <span>•</span>
                    <span>Size: <strong className="text-gray-800">{book.file_size}</strong></span>
                  </>
                )}
              </div>
            </div>

            {/* Action Buttons */}
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

            {/* Blog Article & Book Overview Section */}
            <div className="pt-5 border-t border-gray-200 space-y-3">
              <h2 className="text-base sm:text-lg font-extrabold text-gray-900 flex items-center space-x-2">
                <FileText className="w-5 h-5 text-emerald-600" />
                <span>বইয়ের বিস্তারিত তথ্য ও রিভিউ (Blog & Review Article):</span>
              </h2>
              <div className="text-sm sm:text-base text-gray-800 leading-relaxed whitespace-pre-line bg-gray-50/70 p-4 sm:p-5 rounded-xl border border-gray-200/80">
                {book.description}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AdSlot slotId="book-detail-middle" />

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
