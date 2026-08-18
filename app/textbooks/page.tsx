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
  title: 'NCTB বোর্ড পাঠ্যবই PDF 2026 | সকল শ্রেণির টেক্সটবুক ডিরেক্টরি',
  description: 'এনসিটিবি (NCTB) কর্তৃক প্রকাশিত ১ম শ্রেণি থেকে দ্বাদশ শ্রেণির সকল পাঠ্যবই বোর্ড সিলেবাস অনুযায়ী পড়ার ও ডাউনলোড করার শ্রেণিভিত্তিক গাইড।',
};

export default async function TextbooksPage() {
  const allTextbooks = await getBooksByType('textbook');

  return (
    <div className="space-y-8 pb-12">
      <Breadcrumb items={[{ label: 'পাঠ্যবই (Textbooks)' }]} />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-950 via-indigo-900 to-slate-900 text-white p-6 sm:p-10 rounded-2xl shadow-md space-y-4">
        <div className="inline-flex items-center space-x-2 bg-blue-700/50 backdrop-blur-xs px-3.5 py-1 rounded-full text-xs font-semibold text-blue-100 border border-blue-400/30">
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          <span>NCTB Board Textbooks 2026 Syllabus</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold leading-snug">
          NCTB বোর্ড পাঠ্যবই PDF ২০২৬ | সকল শ্রেণির মূল টেক্সটবুক
        </h1>

        <p className="text-blue-100 text-sm sm:text-base leading-relaxed max-w-4xl">
          জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) অনুমোদিত প্রথম শ্রেণি থেকে দ্বাদশ শ্রেণির সকল বিষয়ের নতুন কারিকুলাম পাঠ্যবই PDF সম্পূর্ণ বিনামূল্যে পড়ুন এবং ডাউনলোড করুন।
        </p>
      </div>

      <AdSlot slotId="textbooks-top" format="horizontal" />

      {/* Quick Class Shortcut Grid */}
      <section className="space-y-3">
        <div className="flex items-center space-x-2 border-b border-gray-200 pb-2">
          <Layers className="w-5 h-5 text-blue-700" />
          <h2 className="text-lg font-bold text-gray-900">
            শ্রেণি অনুযায়ী পাঠ্যবই নির্বাচন করুন (Browse Textbooks by Class)
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          {CLASSES_LIST.map((cls) => (
            <Link
              key={cls.slug}
              href={`/class/${cls.slug}`}
              className="bg-white p-3 rounded-xl border border-gray-200 hover:border-blue-600 hover:shadow-sm transition-all flex flex-col items-center justify-center space-y-1 group"
            >
              <span className="text-xs font-extrabold text-gray-900 group-hover:text-blue-700">
                {cls.bnName}
              </span>
              <span className="text-3xs text-gray-400 font-medium">পাঠ্যবই দেখুন</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Grouped by Class Sections with 5-by-5 Incremental Loading */}
      <div className="space-y-10">
        {CLASSES_LIST.map((cls, idx) => {
          const classBooks = allTextbooks.filter((b) => b.class_slug === cls.slug);
          if (classBooks.length === 0) return null;

          return (
            <React.Fragment key={cls.slug}>
              <ClassBookSection
                classSlug={cls.slug}
                className={cls.name}
                bnName={cls.bnName}
                books={classBooks}
                themeColor="blue"
              />

              {/* Insert Ad Slot every 3 class sections for monetization */}
              {(idx + 1) % 3 === 0 && (
                <AdSlot slotId={`textbooks-mid-${idx}`} format="horizontal" />
              )}
            </React.Fragment>
          );
        })}
      </div>

      <AdSlot slotId="textbooks-bottom" format="horizontal" />
    </div>
  );
}
