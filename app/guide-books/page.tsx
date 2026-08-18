import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import AdSlot from '@/components/AdSlot';
import ClassBookSection from '@/components/ClassBookSection';
import { getBooksByType } from '@/lib/data';
import { CLASSES_LIST } from '@/lib/types';
import { Sparkles, Layers } from 'lucide-react';

export const metadata: Metadata = {
  title: 'সকল শ্রেণির গাইড বই ও সমাধান PDF 2026 | Guide Books',
  description: 'অষ্টম, নবম-দশম ও এইচএসসি সহ সকল শ্রেণির সেরা গাইড বই ও অনুশীলনী সমাধান PDF সম্পূর্ণ বিনামূল্যে ডাউনলোড।',
};

export default async function GuideBooksPage() {
  const guideBooks = await getBooksByType('guide');
  const solutionBooks = await getBooksByType('solution');
  const allGuides = [...guideBooks, ...solutionBooks];

  return (
    <div className="space-y-8 pb-12">
      <Breadcrumb items={[{ label: 'গাইড বই (Guide Books)' }]} />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white p-6 sm:p-10 rounded-2xl shadow-md space-y-4">
        <div className="inline-flex items-center space-x-2 bg-emerald-700/50 backdrop-blur-xs px-3.5 py-1 rounded-full text-xs font-semibold text-emerald-100 border border-emerald-400/30">
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          <span>Guide Books & Solutions PDF 2026</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold leading-snug">
          গাইড বই ও সমাধান PDF (Guide Books & Solutions 2026)
        </h1>

        <p className="text-emerald-100 text-sm sm:text-base leading-relaxed max-w-4xl">
          সকল বিষয়ের লেকচার, অনুপম ও পাঞ্জেরী স্টাইলের প্রশ্ন উত্তর সমাধান সহ গাইড বই PDF পড়ুন অনলাইন বা ডাউনলোড করুন।
        </p>
      </div>

      <AdSlot slotId="guidebooks-top" format="horizontal" />

      {/* Quick Class Shortcut Grid */}
      <section className="space-y-3">
        <div className="flex items-center space-x-2 border-b border-gray-200 pb-2">
          <Layers className="w-5 h-5 text-emerald-700" />
          <h2 className="text-lg font-bold text-gray-900">
            শ্রেণি অনুযায়ী গাইড বই নির্বাচন করুন (Browse Guides by Class)
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          {CLASSES_LIST.map((cls) => (
            <Link
              key={cls.slug}
              href={`/class/${cls.slug}`}
              className="bg-white p-3 rounded-xl border border-gray-200 hover:border-emerald-600 hover:shadow-sm transition-all flex flex-col items-center justify-center space-y-1 group"
            >
              <span className="text-xs font-extrabold text-gray-900 group-hover:text-emerald-700">
                {cls.bnName}
              </span>
              <span className="text-3xs text-gray-400 font-medium">গাইড দেখুন</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Grouped by Class Sections with 5-by-5 Incremental Loading */}
      <div className="space-y-10">
        {CLASSES_LIST.map((cls, idx) => {
          const classGuides = allGuides.filter((b) => b.class_slug === cls.slug);
          if (classGuides.length === 0) return null;

          return (
            <React.Fragment key={cls.slug}>
              <ClassBookSection
                classSlug={cls.slug}
                className={cls.name}
                bnName={cls.bnName}
                books={classGuides}
                themeColor="emerald"
              />

              {/* Insert Ad Slot every 3 class sections for monetization */}
              {(idx + 1) % 3 === 0 && (
                <AdSlot slotId={`guidebooks-mid-${idx}`} format="horizontal" />
              )}
            </React.Fragment>
          );
        })}
      </div>

      <AdSlot slotId="guidebooks-bottom" format="horizontal" />
    </div>
  );
}
