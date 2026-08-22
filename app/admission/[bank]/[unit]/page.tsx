import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import ExpandableBookGrid from '@/components/ExpandableBookGrid';
import BookDetailView from '@/components/BookDetailView';
import AdSlot from '@/components/AdSlot';
import SearchBox from '@/components/SearchBox';
import { getBooksBySubject, getBooksByClass, getBookBySlug, getRelatedBooks } from '@/lib/data';
import { ADMISSION_BANKS } from '@/lib/admission';
import { Search, ArrowRight, Award } from 'lucide-react';

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
    if (b.slug.startsWith(`${unit.unitSlug}-`)) return true;
    return bank.units.length === 1;
  });
  return { bank, unit, unitBooks };
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { bank, unit } = await params;
  const directBook = (await getBookBySlug(unit)) || (await getBookBySlug(bank));
  if (directBook) {
    return {
      title: `${directBook.title} | PDF Download & Review`,
      description: directBook.description.slice(0, 160),
    };
  }

  const resolved = await resolveUnit(bank, unit);
  if (!resolved) {
    const term = `${bank} ${unit}`.replace(/-/g, ' ');
    return {
      title: `${term} ভর্তি প্রশ্নব্যাংক PDF 2026`,
      description: `${term} বিশ্ববিদ্যালয় ভর্তি পরীক্ষার প্রশ্ন ও সমাধান PDF।`,
    };
  }
  const title = `${resolved.unit.name} প্রশ্নব্যাংক PDF | ${resolved.unit.bnName} Question Bank`;
  return {
    title,
    description: `${resolved.unit.bnName} ভর্তি পরীক্ষার বিগত বছরের প্রশ্ন ও সমাধান PDF ডাউনলোড করুন। ${resolved.unit.description}`,
  };
}

export default async function AdmissionUnitPage({ params }: RouteProps) {
  const { bank, unit } = await params;

  // Check if unit or bank parameter is actually a direct book slug
  const directBook = (await getBookBySlug(unit)) || (await getBookBySlug(bank));
  if (directBook) {
    const relatedBooks = await getRelatedBooks(directBook, 4);
    return <BookDetailView book={directBook} relatedBooks={relatedBooks} />;
  }

  const resolved = await resolveUnit(bank, unit);

  if (!resolved) {
    const searchTerm = `${bank} ${unit}`.replace(/-/g, ' ');
    const allAdmissionBooks = await getBooksByClass('admission');
    const matchedBooks = allAdmissionBooks.filter((b) => {
      const q = bank.toLowerCase().trim();
      const u = unit.toLowerCase().trim();
      return (
        b.subject_slug.toLowerCase() === q ||
        b.subject.toLowerCase().includes(q) ||
        b.title.toLowerCase().includes(q) ||
        b.title.toLowerCase().includes(u)
      );
    });

    return (
      <div className="space-y-8 pb-8">
        <Breadcrumb
          items={[
            { label: 'Admission', href: '/class/admission' },
            { label: bank.toUpperCase(), href: `/admission/${bank}` },
            { label: unit },
          ]}
        />

        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-6 sm:p-8 rounded-2xl shadow-md space-y-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold capitalize">
            {searchTerm} ভর্তি প্রস্তুতি ও প্রশ্নব্যাংক PDF
          </h1>
          <p className="text-sm text-emerald-100 max-w-2xl">
            {searchTerm} সংক্রান্ত সকল ভর্তি পরীক্ষার প্রশ্নব্যাংক, নোট ও সমাধান খুঁজুন।
          </p>
          <div className="pt-2 max-w-xl">
            <SearchBox defaultQuery={searchTerm} placeholder={`${searchTerm} লিখে সার্চ করুন...`} />
          </div>
        </div>

        {matchedBooks.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2">
              সম্পর্কিত PDF বইসমূহ:
            </h2>
            <ExpandableBookGrid books={matchedBooks} initialCount={5} step={5} />
          </div>
        ) : (
          <div className="bg-amber-50/80 border-2 border-amber-200 p-6 sm:p-8 rounded-2xl space-y-3 text-center">
            <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">
              &quot;{searchTerm}&quot; পেজটি শীঘ্রই আপলোড করা হবে
            </h3>
            <p className="text-sm text-gray-600 max-w-xl mx-auto">
              আপনি উপরের সার্চ বক্স থেকে সরাসরি অনুসন্ধান করতে পারেন অথবা নিচের এডমিশন ব্যাংকগুলো থেকে প্রয়োজনীয় বইটি বেছে নিন।
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
            Available PDF Downloads:
          </h2>
          <ExpandableBookGrid books={unitBooks} initialCount={5} step={5} />
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
