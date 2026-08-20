import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import AdSlot from '@/components/AdSlot';
import BookCard from '@/components/BookCard';
import ExpandableBookGrid from '@/components/ExpandableBookGrid';
import SearchBox from '@/components/SearchBox';
import { CLASSES_LIST } from '@/lib/types';
import { getBooksByType } from '@/lib/data';
import { Sparkles, Layers, BookOpen, Search } from 'lucide-react';

interface RouteProps {
  params: Promise<{
    classSlug: string;
  }>;
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { classSlug } = await params;
  const currentClass = CLASSES_LIST.find((c) => c.slug === classSlug);

  if (!currentClass) return { title: 'Page Not Found' };

  const title = `${currentClass.bnName} গাইড বই ও সমাধান PDF 2026 | ${currentClass.name} Guide Books`;
  const description = `${currentClass.bnName}-এর সকল বিষয়ের লেকচার, অনুপম ও পাঞ্জেরী গাইড বই এবং প্রশ্ন উত্তর সমাধান PDF সম্পূর্ণ ফ্রিতে অনলাইন পড়ুন ও ডাউনলোড করুন।`;

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function ClassGuideBooksPage({ params }: RouteProps) {
  const { classSlug } = await params;
  const currentClass = CLASSES_LIST.find((c) => c.slug === classSlug);

  if (!currentClass) {
    notFound();
  }

  const guideBooks = await getBooksByType('guide');
  const solutionBooks = await getBooksByType('solution');
  const allGuides = [...guideBooks, ...solutionBooks];

  const classGuides = allGuides.filter((b) => b.class_slug === currentClass.slug);

  return (
    <div className="space-y-8 pb-12">
      <Breadcrumb
        items={[
          { label: 'গাইড বই (Guide Books)', href: '/guide-books' },
          { label: `${currentClass.bnName} গাইড` },
        ]}
      />

      {/* Hero Banner Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white p-6 sm:p-10 rounded-2xl shadow-md space-y-4">
        <div className="inline-flex items-center space-x-2 bg-emerald-700/50 backdrop-blur-xs px-3.5 py-1 rounded-full text-xs font-semibold text-emerald-100 border border-emerald-400/30">
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          <span>{currentClass.name} Guide Books & Solutions PDF 2026</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold leading-snug">
          {currentClass.bnName} গাইড বই ও সমাধান PDF ({currentClass.name} Guides)
        </h1>

        <p className="text-emerald-100 text-sm sm:text-base leading-relaxed max-w-4xl">
          {currentClass.bnName}-এর সকল বিষয়ের অনুপম, পাঞ্জেরী, লেকচার ও অন্যান্য স্বনামধন্য প্রকাশনীর গাইড বই এবং প্রশ্ন উত্তর সমাধান PDF এখান থেকে বিনামূল্যে অনলাইন পড়ুন বা সরাসরি ডাউনলোড করুন।
        </p>
      </div>

      <AdSlot slotId={`guide-${classSlug}-top`} format="horizontal" />

      {/* Quick Class Shortcuts Bar */}
      <section className="space-y-3">
        <div className="flex items-center space-x-2 border-b border-gray-200 pb-2">
          <Layers className="w-5 h-5 text-emerald-700" />
          <h2 className="text-base sm:text-lg font-bold text-gray-900">
            অন্যান্য শ্রেণির গাইড দেখুন (Other Classes):
          </h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {CLASSES_LIST.map((cls) => (
            <Link
              key={cls.slug}
              href={`/guide-books/${cls.slug}`}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all border ${
                cls.slug === currentClass.slug
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-white text-gray-700 hover:bg-emerald-50 border-gray-200 hover:border-emerald-400'
              }`}
            >
              {cls.bnName}
            </Link>
          ))}
        </div>
      </section>

      {/* Guides Grid for this Class */}
      {classGuides.length > 0 ? (
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                {currentClass.bnName}-এর গাইড বই ও সমাধান তালিকা
              </h2>
            </div>
          </div>

          <ExpandableBookGrid books={classGuides} initialCount={5} step={5} />
        </section>
      ) : (
        /* Empty State */
        <div className="bg-amber-50/80 border-2 border-amber-200 p-6 sm:p-8 rounded-2xl space-y-4 text-center">
          <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900">
            বর্তমানে {currentClass.bnName}-এর সরাসরি কোনো গাইড বই আপলোড করা হয়নি।
          </h3>
          <p className="text-sm text-gray-600 max-w-xl mx-auto">
            আপনি নিচের সার্চ বক্স থেকে অন্য যেকোনো বই বা গাইডের নাম লিখে সার্চ করতে পারেন।
          </p>
          <div className="pt-2 max-w-md mx-auto">
            <SearchBox placeholder={`${currentClass.bnName} বই লিখে খুঁজুন...`} />
          </div>
        </div>
      )}

      <AdSlot slotId={`guide-${classSlug}-bottom`} format="horizontal" />
    </div>
  );
}
