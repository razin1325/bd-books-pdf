import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import AdSlot from '@/components/AdSlot';
import ClassBookSection from '@/components/ClassBookSection';
import { getBooks } from '@/lib/data';
import { CLASSES_LIST } from '@/lib/types';
import SearchBox from '@/components/SearchBox';
import { Layers } from 'lucide-react';

export const metadata: Metadata = {
  title: 'সকল শ্রেণির বই ও গাইড PDF তালিকা 2026 | All Books Directory',
  description: 'বাংলাদেশের ১ম শ্রেণি থেকে এইচএসসি (HSC) পর্যন্ত সকল বিষয়ের পাঠ্যবই ও গাইড PDF খুঁজুন ও বিনামূল্যে ডাউনলোড করুন।',
};

export default async function AllBooksPage() {
  const allBooks = await getBooks();

  return (
    <div className="space-y-8 pb-12">
      <Breadcrumb items={[{ label: 'সকল বই (All Books)' }]} />

      {/* Hero Header */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xs space-y-4">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            All Educational Books & Guides PDF 2026
          </h1>
          <p className="text-sm text-gray-600">
            এখানে ১ম শ্রেণি থেকে দ্বাদশ শ্রেণির সকল পাঠ্যবই, গাইড ও মডেল টেস্ট সলিউশন বই শ্রেণি অনুযায়ী সাজানো রয়েছে।
          </p>
        </div>
        <SearchBox />
      </div>

      <AdSlot slotId="all-books-top" format="horizontal" />

      {/* Quick Class Shortcut Grid */}
      <section className="space-y-3">
        <div className="flex items-center space-x-2 border-b border-gray-200 pb-2">
          <Layers className="w-5 h-5 text-emerald-700" />
          <h2 className="text-lg font-bold text-gray-900">
            শ্রেণি নির্বাচন করুন (Browse All Books by Class)
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
              <span className="text-3xs text-gray-400 font-medium">সকল বই দেখুন</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Grouped by Class Sections with 5-by-5 Incremental Loading */}
      <div className="space-y-10">
        {CLASSES_LIST.map((cls, idx) => {
          const classBooks = allBooks.filter((b) => b.class_slug === cls.slug);
          if (classBooks.length === 0) return null;

          return (
            <React.Fragment key={cls.slug}>
              <ClassBookSection
                classSlug={cls.slug}
                className={cls.name}
                bnName={cls.bnName}
                books={classBooks}
                themeColor="emerald"
              />

              {/* Insert Ad Slot every 3 class sections for monetization */}
              {(idx + 1) % 3 === 0 && (
                <AdSlot slotId={`all-books-mid-${idx}`} format="horizontal" />
              )}
            </React.Fragment>
          );
        })}
      </div>

      <AdSlot slotId="all-books-bottom" format="horizontal" />
    </div>
  );
}
