import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import AdSlot from '@/components/AdSlot';
import ExpandableBookGrid from '@/components/ExpandableBookGrid';
import BookDetailView from '@/components/BookDetailView';
import SearchBox from '@/components/SearchBox';
import { CLASSES_LIST, SUBJECTS_LIST } from '@/lib/types';
import { getBooksByType, getBookBySlug, getRelatedBooks } from '@/lib/data';
import { Sparkles, Layers, Search, FileText } from 'lucide-react';

interface RouteProps {
  params: Promise<{
    classSlug: string;
    subjectSlug: string;
  }>;
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { classSlug, subjectSlug } = await params;

  // Check if subjectSlug is a direct book slug first
  const singleBook = await getBookBySlug(subjectSlug);
  if (singleBook) {
    return {
      title: `${singleBook.title} PDF 2026 | গাইড বই ও সমাধান`,
      description: singleBook.description.slice(0, 160),
    };
  }

  const currentClass = CLASSES_LIST.find((c) => c.slug === classSlug);
  if (!currentClass) return { title: 'Page Not Found' };

  const currentSubject = SUBJECTS_LIST.find((s) => s.slug === subjectSlug);
  const subjName = currentSubject ? currentSubject.bnName : subjectSlug;

  const title = `${currentClass.bnName} ${subjName} গাইড বই ও সমাধান PDF 2026 | ${currentClass.name} ${subjName} Guide`;
  const description = `${currentClass.bnName}-এর ${subjName} বিষয়ের লেকচার, অনুপম ও পাঞ্জেরী গাইড বই এবং প্রশ্ন উত্তর সমাধান PDF সম্পূর্ণ ফ্রিতে অনলাইন পড়ুন ও ডাউনলোড করুন।`;

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function ClassSubjectGuidePage({ params }: RouteProps) {
  const { classSlug, subjectSlug } = await params;

  // 1. Check if second slug is actually a standalone book
  const singleBook = await getBookBySlug(subjectSlug);
  if (singleBook) {
    const relatedBooks = await getRelatedBooks(singleBook);
    return <BookDetailView book={singleBook} relatedBooks={relatedBooks} />;
  }

  const currentClass = CLASSES_LIST.find((c) => c.slug === classSlug);
  if (!currentClass) {
    notFound();
  }

  const currentSubject = SUBJECTS_LIST.find((s) => s.slug === subjectSlug);

  const guideBooks = await getBooksByType('guide');
  const solutionBooks = await getBooksByType('solution');
  const allGuides = [...guideBooks, ...solutionBooks];

  // Filter guides for this class and subject
  const subjectGuides = allGuides.filter(
    (b) => b.class_slug === currentClass.slug && (b.subject_slug === subjectSlug || (currentSubject && b.subject.includes(currentSubject.name)))
  );

  const subjTitle = currentSubject ? currentSubject.bnName : subjectSlug;

  return (
    <div className="space-y-8 pb-12">
      <Breadcrumb
        items={[
          { label: 'গাইড বই (Guide Books)', href: '/guide-books' },
          { label: `${currentClass.bnName} গাইড`, href: `/guide-books/${currentClass.slug}` },
          { label: `${subjTitle} গাইড` },
        ]}
      />

      {/* Hero Banner Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white p-6 sm:p-10 rounded-2xl shadow-md space-y-4">
        <div className="inline-flex items-center space-x-2 bg-emerald-700/50 backdrop-blur-xs px-3.5 py-1 rounded-full text-xs font-semibold text-emerald-100 border border-emerald-400/30">
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          <span>{currentClass.name} {subjTitle} Guide Books PDF 2026</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold leading-snug">
          {currentClass.bnName} {subjTitle} গাইড বই ও সমাধান PDF
        </h1>

        <p className="text-emerald-100 text-sm sm:text-base leading-relaxed max-w-4xl">
          {currentClass.bnName}-এর {subjTitle} বিষয়ের অনুপম, পাঞ্জেরী, লেকচার ও অন্যান্য স্বনামধন্য প্রকাশনীর গাইড বই এবং প্রশ্ন উত্তর সমাধান PDF এখান থেকে বিনামূল্যে অনলাইন পড়ুন বা সরাসরি ডাউনলোড করুন।
        </p>
      </div>

      <AdSlot slotId={`guide-${classSlug}-${subjectSlug}-top`} format="horizontal" />

      {/* Subject Shortcuts Bar */}
      <section className="space-y-3">
        <div className="flex items-center space-x-2 border-b border-gray-200 pb-2">
          <Layers className="w-5 h-5 text-emerald-700" />
          <h2 className="text-base sm:text-lg font-bold text-gray-900">
            {currentClass.bnName}-এর অন্যান্য বিষয় গাইড:
          </h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {SUBJECTS_LIST.map((subj) => (
            <Link
              key={subj.slug}
              href={`/guide-books/${currentClass.slug}/${subj.slug}`}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all border ${
                subj.slug === subjectSlug
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-white text-gray-700 hover:bg-emerald-50 border-gray-200 hover:border-emerald-400'
              }`}
            >
              {subj.bnName} গাইড
            </Link>
          ))}
        </div>
      </section>

      {/* Guides Grid for this Subject */}
      {subjectGuides.length > 0 ? (
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-emerald-600" />
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                {currentClass.bnName} {subjTitle} গাইড তালিকা
              </h2>
            </div>
          </div>

          <ExpandableBookGrid books={subjectGuides} initialCount={5} step={5} />
        </section>
      ) : (
        /* Empty State */
        <div className="bg-amber-50/80 border-2 border-amber-200 p-6 sm:p-8 rounded-2xl space-y-4 text-center">
          <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900">
            বর্তমানে {currentClass.bnName}-এর {subjTitle} বিষয়ের কোনো গাইড বই আপলোড করা হয়নি।
          </h3>
          <p className="text-sm text-gray-600 max-w-xl mx-auto">
            অন্যান্য বিষয়ের গাইড দেখতে উপরের বাটনে ক্লিক করুন অথবা সার্চ বক্স থেকে সার্চ করুন।
          </p>
          <div className="pt-2 max-w-md mx-auto">
            <SearchBox placeholder={`${currentClass.bnName} ${subjTitle} গাইড খুঁজুন...`} />
          </div>
        </div>
      )}

      <AdSlot slotId={`guide-${classSlug}-${subjectSlug}-bottom`} format="horizontal" />
    </div>
  );
}
