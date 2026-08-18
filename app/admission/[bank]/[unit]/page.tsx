import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumb from '@/components/Breadcrumb';
import AdSlot from '@/components/AdSlot';
import { getBooksBySubject } from '@/lib/data';
import { ADMISSION_BANKS, getAdmissionUnitRelativeSlug } from '@/lib/admission';
import { BookOpen, Download, ExternalLink } from 'lucide-react';

interface RouteProps {
  params: Promise<{
    bank: string;
    unit: string;
  }>;
}

async function resolveUnit(bankSlug: string, unitSlug: string) {
  const bank = ADMISSION_BANKS.find((b) => b.bankSlug === bankSlug);
  const unit = bank?.units.find((u) => u.unitSlug === unitSlug);
  if (!bank || !unit) return null;
  const books = await getBooksBySubject('admission', bank.subjectSlug);
  const unitBooks = books.filter((b) => {
    if (getAdmissionUnitRelativeSlug(b.slug) !== null && b.slug.startsWith(`${unit.unitSlug}-`)) return true;
    // Single-unit banks (e.g. medical) list all their books directly
    return bank.units.length === 1;
  });
  return { bank, unit, unitBooks };
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { bank, unit } = await params;
  const resolved = await resolveUnit(bank, unit);
  if (!resolved) return { title: 'Page Not Found' };
  const title = `${resolved.unit.name} প্রশ্নব্যাংক PDF | ${resolved.unit.bnName} Question Bank`;
  return {
    title,
    description: `${resolved.unit.bnName} ভর্তি পরীক্ষার বিগত বছরের প্রশ্ন ও সমাধান PDF ডাউনলোড করুন। ${resolved.unit.description}`,
  };
}

export default async function AdmissionUnitPage({ params }: RouteProps) {
  const { bank, unit } = await params;
  const resolved = await resolveUnit(bank, unit);
  if (!resolved) {
    notFound();
  }
  const { bank: bankInfo, unit: unitInfo, unitBooks } = resolved;

  return (
    <div className="space-y-8">
      <Breadcrumb
        items={[
          { label: 'Admission', href: '/class/admission' },
          { label: bankInfo.bnName, href: `/admission/${bankInfo.bankSlug}` },
          { label: unitInfo.name },
        ]}
      />

      <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-xs space-y-3">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
          {unitInfo.name} প্রশ্নব্যাংক PDF ({unitInfo.bnName})
        </h1>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{unitInfo.description}</p>
      </div>

      <AdSlot slotId={`${unitInfo.unitSlug}-top`} />

      {unitBooks.length > 0 ? (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2">
            Available PDF Downloads ({unitBooks.length}):
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {unitBooks.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-xl border border-gray-200 shadow-2xs hover:shadow-md transition-all overflow-hidden flex flex-col group h-full hover:border-emerald-500"
              >
                <div className="relative aspect-3/4 bg-gray-100 overflow-hidden">
                  {book.cover_image ? (
                    <Image
                      src={book.cover_image}
                      alt={book.title}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 p-3 text-center bg-gradient-to-br from-emerald-50 to-teal-100">
                      <BookOpen className="w-8 h-8 sm:w-12 sm:h-12 text-emerald-600 mb-1" />
                      <span className="text-3xs sm:text-xs font-semibold text-gray-600 line-clamp-2">
                        {book.title}
                      </span>
                    </div>
                  )}
                  <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 flex flex-wrap gap-1">
                    <span className="text-3xs sm:text-2xs font-extrabold px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded uppercase tracking-wider text-white shadow-xs bg-purple-600">
                      {book.book_type}
                    </span>
                    <span className="text-3xs sm:text-2xs font-bold bg-black/70 backdrop-blur-xs text-white px-1.5 py-0.5 rounded">
                      {book.year}
                    </span>
                  </div>
                </div>
                <div className="p-2.5 sm:p-4 flex-1 flex flex-col justify-between space-y-2 sm:space-y-3">
                  <h3 className="font-bold text-gray-900 text-xs sm:text-sm line-clamp-2 group-hover:text-emerald-600 transition-colors leading-snug">
                    <Link href={`/admission/${bankInfo.bankSlug}/${unitInfo.unitSlug}/${getAdmissionUnitRelativeSlug(book.slug) ?? book.slug}`}>
                      {book.title}
                    </Link>
                  </h3>
                  <div className="pt-2 border-t border-gray-100 flex items-center gap-1.5">
                    <Link
                      href={`/admission/${bankInfo.bankSlug}/${unitInfo.unitSlug}/${getAdmissionUnitRelativeSlug(book.slug) ?? book.slug}`}
                      className="flex-1 text-center py-2 px-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold text-3xs sm:text-xs rounded-lg transition-colors flex items-center justify-center space-x-1 shadow-2xs"
                    >
                      <span>View PDF</span>
                      <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                    </Link>
                    <a
                      href={book.pdf_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 active:bg-emerald-100 rounded-lg transition-colors flex-shrink-0"
                      title="Download PDF directly"
                    >
                      <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-amber-50 border border-amber-200 p-6 rounded-xl text-center space-y-2">
          <p className="text-sm text-amber-800 font-medium">
            {unitInfo.name} প্রশ্নব্যাংক শীঘ্রই যোগ করা হবে।
          </p>
        </div>
      )}
    </div>
  );
}
