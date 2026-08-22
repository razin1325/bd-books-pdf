import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import AdSlot from '@/components/AdSlot';
import SearchBox from '@/components/SearchBox';
import ExpandableBookGrid from '@/components/ExpandableBookGrid';
import BookDetailView from '@/components/BookDetailView';
import { getBooksBySubject, getBooksByClass, getBookBySlug, getRelatedBooks } from '@/lib/data';
import { ADMISSION_BANKS, getAdmissionUnitRelativeSlug } from '@/lib/admission';
import { BookOpen, ArrowRight, Search, Award, Sparkles } from 'lucide-react';

interface RouteProps {
  params: Promise<{
    bank: string;
  }>;
}

function findBank(bankSlug: string) {
  return ADMISSION_BANKS.find((b) => b.bankSlug === bankSlug);
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { bank } = await params;
  const directBook = await getBookBySlug(bank);
  if (directBook) {
    return {
      title: `${directBook.title} | PDF Download & Review`,
      description: directBook.description.slice(0, 160),
    };
  }

  const found = findBank(bank);
  if (found) {
    const title = `${found.bnName} প্রশ্নব্যাংক PDF | ${found.name} Question Bank`;
    return {
      title,
      description: `${found.bnName} ভর্তি পরীক্ষার ইউনিট অনুযায়ী বিগত বছরের প্রশ্ন ও সমাধান PDF ডাউনলোড করুন। ${found.description}`,
    };
  }
  const formattedBank = bank.replace(/-/g, ' ');
  return {
    title: `${formattedBank} ভর্তি প্রস্তুতি ও প্রশ্নব্যাংক PDF 2026`,
    description: `${formattedBank} বিশ্ববিদ্যালয় ভর্তি প্রস্তুতি, প্রশ্নব্যাংক ও সমাধান PDF ডাউনলোড করুন।`,
  };
}

export default async function AdmissionBankPage({ params }: RouteProps) {
  const { bank } = await params;

  // Check if bank parameter is actually a direct book slug (e.g. /admission/joykoly-bangla-bichitra-pdf)
  const directBook = await getBookBySlug(bank);
  if (directBook) {
    const relatedBooks = await getRelatedBooks(directBook, 4);
    return <BookDetailView book={directBook} relatedBooks={relatedBooks} />;
  }

  const found = findBank(bank);

  // CASE 1: Standard Official Admission Bank (e.g. DU, BUET, GST, Medical, CU, RU, Agri)
  if (found) {
    const books = await getBooksBySubject('admission', found.subjectSlug);
    const units = found.units.map((unit) => {
      const unitBooks = books.filter((b) => {
        if (getAdmissionUnitRelativeSlug(b.slug) !== null && b.slug.startsWith(`${unit.unitSlug}-`)) return true;
        return found.units.length === 1;
      });
      return { ...unit, count: unitBooks.length };
    });

    return (
      <div className="space-y-8">
        <Breadcrumb
          items={[
            { label: 'Admission', href: '/class/admission' },
            { label: found.bnName },
          ]}
        />

        <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-xs space-y-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            {found.bnName} প্রশ্নব্যাংক PDF
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{found.description}</p>
        </div>

        <AdSlot slotId={`subject-${found.subjectSlug}-top`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {units.map((unit) => (
            <Link
              key={unit.unitSlug}
              href={`/admission/${found.bankSlug}/${unit.unitSlug}`}
              className="bg-white rounded-xl border border-gray-200 hover:border-emerald-500 hover:shadow-md transition-all p-5 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                      {unit.name}
                    </h2>
                    <p className="text-xs text-gray-500">{unit.bnName}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="mt-3 text-xs text-gray-500 leading-relaxed">{unit.description}</p>
            </Link>
          ))}
        </div>

        {/* All Available Books for this admission bank */}
        {books.length > 0 && (
          <div className="space-y-4 pt-4">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2">
              {found.bnName} প্রস্তুতি ও গাইড বইসমূহ:
            </h2>
            <ExpandableBookGrid books={books} initialCount={5} step={5} />
          </div>
        )}
      </div>
    );
  }

  // CASE 2: Non-standard slug (e.g. /admission/bangla, /admission/english, /admission/math, etc.)
  // Search for matching admission books by subject or title keyword
  const allAdmissionBooks = await getBooksByClass('admission');
  const matchedBooks = allAdmissionBooks.filter((b) => {
    const q = bank.toLowerCase().trim();
    return (
      b.subject_slug.toLowerCase() === q ||
      b.subject.toLowerCase().includes(q) ||
      b.title.toLowerCase().includes(q) ||
      b.slug.toLowerCase().includes(q)
    );
  });

  const formattedBankTitle = bank
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <div className="space-y-8 pb-8">
      <Breadcrumb
        items={[
          { label: 'Admission', href: '/class/admission' },
          { label: formattedBankTitle },
        ]}
      />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-6 sm:p-8 rounded-2xl shadow-md space-y-4">
        <div className="flex items-center space-x-2 bg-emerald-700/50 backdrop-blur-sm border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold w-fit">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>ভর্তি প্রস্তুতি ডিরেক্টরি</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          {formattedBankTitle} ভর্তি প্রশ্নব্যাংক & সহায়িকা PDF
        </h1>
        <p className="text-sm sm:text-base text-emerald-100 leading-relaxed max-w-3xl">
          {formattedBankTitle} সংক্রান্ত সকল বিশ্ববিদ্যালয়ের প্রশ্নব্যাংক, মডেল টেস্ট ও সমাধান PDF অনলাইন ভিউ অথবা সরাসরি বিনামূল্যে ডাউনলোড করুন।
        </p>

        {/* Ready Search box inside banner */}
        <div className="pt-2 max-w-xl">
          <SearchBox defaultQuery={bank} placeholder={`${formattedBankTitle} সংক্রান্ত যেকোনো বই খুঁজতে টাইপ করুন...`} />
        </div>
      </div>

      {/* If matched books exist for this subject/slug */}
      {matchedBooks.length > 0 ? (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2">
            উপলব্ধ {formattedBankTitle} PDF বইসমূহ:
          </h2>
          <ExpandableBookGrid books={matchedBooks} initialCount={5} step={5} />
        </div>
      ) : (
        /* Friendly empty state notice */
        <div className="bg-amber-50/80 border-2 border-amber-200 p-6 sm:p-8 rounded-2xl space-y-3 text-center">
          <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900">
            বর্তমানে &quot;{formattedBankTitle}&quot; ক্যাটাগরির জন্য আলাদা পেজ শীঘ্রই যোগ করা হবে
          </h3>
          <p className="text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">
            চিন্তার কিছু নেই! আপনি উপরের সার্চ বক্স থেকে সহজেই যেকোনো বিষয় বা বিশ্ববিদ্যালয়ের নাম লিখে সার্চ করে আপনার কাঙ্ক্ষিত PDF পড়তে ও ডাউনলোড করতে পারবেন।
          </p>
        </div>
      )}

      {/* All Available University Admission Banks Directory */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 shadow-xs">
        <div className="flex items-center space-x-2 border-b border-gray-100 pb-3">
          <Award className="w-5 h-5 text-emerald-600" />
          <h2 className="text-xl font-bold text-gray-900">
            বিশ্ববিদ্যালয় ভিত্তিক প্রশ্নব্যাংক ডিরেক্টরি (All Varsities):
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
