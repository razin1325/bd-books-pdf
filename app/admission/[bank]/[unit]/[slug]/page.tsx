import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import BookCard from '@/components/BookCard';
import BookCover from '@/components/BookCover';
import AdSlot from '@/components/AdSlot';
import SearchBox from '@/components/SearchBox';
import { getBooksBySubject, getBooksByClass } from '@/lib/data';
import { ADMISSION_BANKS, getAdmissionUnitRelativeSlug } from '@/lib/admission';
import { getBaseUrl } from '@/lib/site';
import {
  BookOpen,
  Download,
  ExternalLink,
  FileText,
  Calendar,
  Layers,
  User,
  Building,
  Search,
  ArrowRight,
  Award,
} from 'lucide-react';

interface RouteProps {
  params: Promise<{
    bank: string;
    unit: string;
    slug: string;
  }>;
}

async function resolveBook(bankSlug: string, unitSlug: string, slug: string) {
  const bank = ADMISSION_BANKS.find((b) => b.bankSlug === bankSlug);
  const unit = bank?.units.find((u) => u.unitSlug === unitSlug);
  if (!bank || !unit) return null;
  const books = await getBooksBySubject('admission', bank.subjectSlug);
  // Prefixed books: unit-slug + relative slug. Single-unit banks (e.g. medical) also match by full slug.
  const book =
    books.find((b) => b.slug === `${unit.unitSlug}-${slug}`) ||
    (bank.units.length === 1 ? books.find((b) => b.slug === slug) : undefined);
  return book ? { bank, unit, book } : null;
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { bank, unit, slug } = await params;
  const resolved = await resolveBook(bank, unit, slug);
  if (!resolved) return { title: 'Page Not Found' };
  const { book } = resolved;
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

export default async function AdmissionBookDetailPage({ params }: RouteProps) {
  const { bank, unit, slug } = await params;
  const resolved = await resolveBook(bank, unit, slug);

  if (!resolved) {
    const term = `${bank} ${unit} ${slug}`.replace(/-/g, ' ');
    const allAdmissionBooks = await getBooksByClass('admission');
    const matchedBooks = allAdmissionBooks.filter((b) => {
      const s = slug.toLowerCase().trim();
      return b.slug.toLowerCase().includes(s) || b.title.toLowerCase().includes(s);
    });

    return (
      <div className="space-y-8 pb-8">
        <Breadcrumb
          items={[
            { label: 'Admission', href: '/class/admission' },
            { label: bank.toUpperCase(), href: `/admission/${bank}` },
            { label: unit, href: `/admission/${bank}/${unit}` },
            { label: slug },
          ]}
        />

        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-6 sm:p-8 rounded-2xl shadow-md space-y-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold capitalize">
            {term} ভর্তি প্রস্তুতি ও প্রশ্নব্যাংক PDF
          </h1>
          <p className="text-sm text-emerald-100 max-w-2xl">
            {term} সংক্রান্ত ভর্তি পরীক্ষার বই, প্রশ্নব্যাংক ও সমাধান অনলাইন ভিউ অথবা ডাউনলোড করুন।
          </p>
          <div className="pt-2 max-w-xl">
            <SearchBox defaultQuery={slug.replace(/-/g, ' ')} placeholder="বইয়ের নাম লিখে সার্চ করুন..." />
          </div>
        </div>

        {matchedBooks.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2">
              সম্পর্কিত PDF বইসমূহ ({matchedBooks.length}):
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4.5">
              {matchedBooks.map((b) => (
                <BookCard key={b.id} book={b} />
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-amber-50/80 border-2 border-amber-200 p-6 sm:p-8 rounded-2xl space-y-3 text-center">
            <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">
              নির্দিষ্ট বইটি শীঘ্রই সার্ভারে আপলোড করা হবে
            </h3>
            <p className="text-sm text-gray-600 max-w-xl mx-auto">
              আপনি উপরের সার্চ বার থেকে সার্চ করতে পারেন অথবা আমাদের এডমিশন গ্যালারির অন্যান্য প্রশ্নব্যাংক ঘুরে দেখতে পারেন।
            </p>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 shadow-xs">
          <div className="flex items-center space-x-2 border-b border-gray-100 pb-3">
            <Award className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-bold text-gray-900">
              এডমিশন প্রশ্নব্যাংক ডিরেক্টরি (All Admission Banks):
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ADMISSION_BANKS.map((b) => (
              <Link
                key={b.bankSlug}
                href={`/admission/${b.bankSlug}`}
                className="p-4 bg-gray-50 hover:bg-emerald-50 border border-gray-200 hover:border-emerald-500 rounded-xl transition-all flex items-center justify-between group"
              >
                <div>
                  <span className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors block">
                    {b.bnName}
                  </span>
                  <span className="text-xs text-gray-500 block truncate max-w-[220px]">
                    {b.description}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }
  const { bank: bankInfo, unit: unitInfo, book } = resolved;

  const allUnitBooks = (await getBooksBySubject('admission', bankInfo.subjectSlug)).filter((b) => {
    if (b.slug === book.slug) return false;
    if (bankInfo.units.length === 1) return true; // single-unit banks: all siblings related
    return b.slug.startsWith(`${unitInfo.unitSlug}-`) && getAdmissionUnitRelativeSlug(b.slug) !== null;
  });
  const relatedBooks = allUnitBooks.slice(0, 5);

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
    url: `${getBaseUrl()}/admission/${bankInfo.bankSlug}/${unitInfo.unitSlug}/${slug}`,
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
          { label: 'Admission', href: '/class/admission' },
          { label: bankInfo.bnName, href: `/admission/${bankInfo.bankSlug}` },
          { label: unitInfo.name, href: `/admission/${bankInfo.bankSlug}/${unitInfo.unitSlug}` },
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
                <span>Read Online (অনলাইনে পড়ুন)</span>
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

            {/* SEO Description Paragraph */}
            <div className="pt-4 border-t border-gray-100 space-y-2">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                বই সম্পর্কে বিস্তারিত (Description):
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                {book.description}
              </p>
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
              <span className="text-xs text-gray-500 block">Subject (বিষয়)</span>
              <span className="font-semibold text-gray-900">{book.subject}</span>
            </div>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg flex items-center space-x-3">
            <FileText className="w-5 h-5 text-gray-400" />
            <div>
              <span className="text-xs text-gray-500 block">Book Type (বইয়ের ধরন)</span>
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
              <span className="text-xs text-gray-500 block">Publisher (প্রকাশক)</span>
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
              Similar & Related Books (অন্যান্য বছরের প্রশ্নব্যাংক)
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {relatedBooks.map((relBook) => (
              <BookCard key={relBook.id} book={relBook} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
