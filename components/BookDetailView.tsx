import React from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import BookCover from '@/components/BookCover';
import BookCard from '@/components/BookCard';
import AdSlot from '@/components/AdSlot';
import { Book } from '@/lib/types';
import { getAdmissionBookHref } from '@/lib/admission';
import { getBaseUrl, getGoogleDriveEmbedUrl } from '@/lib/site';
import { ExternalLink, Download, FileText, Calendar, Layers, User, Building, BookOpen } from 'lucide-react';

interface BookDetailViewProps {
  book: Book;
  relatedBooks?: Book[];
}

export default function BookDetailView({ book, relatedBooks = [] }: BookDetailViewProps) {
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
          {/* Cover Thumbnail */}
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

      {/* Embedded Google Drive PDF Viewer (Mobile-Friendly & Responsive) */}
      {book.pdf_url && (
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

      {/* Next Page Multi-Page Article Pagination Card */}
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
          <a
            href={`${getAdmissionBookHref(book)}?page=2`}
            className="py-4 px-8 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-base sm:text-lg rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-0.5 flex items-center space-x-3 border border-emerald-400/40 group"
          >
            <span>পরবর্তী পৃষ্ঠা (Next Page) পড়ুন</span>
            <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      <AdSlot slotId="book-detail-bottom-page" />

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
