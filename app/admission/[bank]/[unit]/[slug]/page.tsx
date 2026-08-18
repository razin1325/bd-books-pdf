import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import AdSlot from '@/components/AdSlot';
import { getBooksBySubject } from '@/lib/data';
import { ADMISSION_BANKS, getAdmissionUnitRelativeSlug } from '@/lib/admission';
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
    notFound();
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
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bd-edu-books.vercel.app'}/admission/${bankInfo.bankSlug}/${unitInfo.unitSlug}/${slug}`,
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
              {book.cover_image ? (
                <Image
                  src={book.cover_image}
                  alt={book.title}
                  fill
                  sizes="260px"
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-emerald-50 text-emerald-800">
                  <BookOpen className="w-16 h-16 text-emerald-600 mb-2" />
                  <span className="font-bold text-sm">{book.title}</span>
                </div>
              )}
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {relatedBooks.map((relBook) => (
              <Link
                key={relBook.id}
                href={`/admission/${bankInfo.bankSlug}/${unitInfo.unitSlug}/${getAdmissionUnitRelativeSlug(relBook.slug) ?? relBook.slug}`}
                className="bg-white rounded-xl border border-gray-200 hover:border-emerald-500 hover:shadow-md transition-all overflow-hidden group"
              >
                <div className="relative aspect-3/4 bg-gray-100">
                  {relBook.cover_image ? (
                    <Image
                      src={relBook.cover_image}
                      alt={relBook.title}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 p-3 text-center bg-gradient-to-br from-emerald-50 to-teal-100">
                      <BookOpen className="w-8 h-8 sm:w-12 sm:h-12 text-emerald-600 mb-1" />
                      <span className="text-3xs sm:text-xs font-semibold text-gray-600 line-clamp-2">
                        {relBook.title}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-gray-900 text-xs sm:text-sm line-clamp-2 group-hover:text-emerald-600 transition-colors leading-snug">
                    {relBook.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
