import React from 'react';
import Link from 'next/link';
import { Eye, Bookmark, ChevronRight, Sparkles, GraduationCap, ArrowRight, Clock } from 'lucide-react';
import BookCover from '@/components/BookCover';

export interface HonoursArticle {
  id: string;
  title: string;
  category: string;
  slug: string;
  views: number;
  publishDate: string;
  isFeatured?: boolean;
  badgeText?: string;
}

const HONOURS_ARTICLES: HonoursArticle[] = [
  {
    id: 'nu-honours-routine-2026',
    title: 'জাতীয় বিশ্ববিদ্যালয় অনার্স ১ম বর্ষ পরীক্ষা রুটিন ২০২৬ PDF (NU Honours 1st Year Routine 2026)',
    category: 'NU Honours / Exam Routine',
    slug: '/blogs/nu-honours-1st-year-routine-2026-pdf',
    views: 1580,
    publishDate: 'Aug 21, 2026',
    isFeatured: true,
    badgeText: 'অনার্স ১ম বর্ষ রুটিন',
  },
  {
    id: 'nu-degree-admission-2026',
    title: 'জাতীয় বিশ্ববিদ্যালয় ডিগ্রি পাস ভর্তি বিজ্ঞপ্তি ২০২৬ ও আবেদন করার নিয়ম (Degree Pass Admission)',
    category: 'NU Degree / Admission Circular',
    slug: '/blogs/degree-admission-circular-2026-nu',
    views: 1390,
    publishDate: 'Aug 21, 2026',
    badgeText: 'ডিগ্রি ভর্তি নির্দেশিকা',
  },
  {
    id: 'ict-suggestion-2026',
    title: 'জাতীয় বিশ্ববিদ্যালয় অনার্স ১ম বর্ষ তথ্য ও যোগাযোগ প্রযুক্তি (ICT) সাজেশন ২০২৬ PDF',
    category: 'NU Honours / ICT Suggestion',
    slug: '/blogs/honours-1st-year-ict-suggestion-2026-pdf',
    views: 1420,
    publishDate: 'Aug 21, 2026',
    badgeText: 'আইসিটি ১০০% সাজেশন',
  },
  {
    id: 'history-suggestion-2026',
    title: 'অনার্স ১ম বর্ষ ইতিহাস বিভাগ পূর্ণাঙ্গ ফাইনাল সাজেশন ২০২৬ PDF (NU History Suggestion)',
    category: 'NU Honours / History',
    slug: '/blogs/honours-1st-year-history-suggestion-pdf',
    views: 1280,
    publishDate: 'Aug 21, 2026',
    badgeText: 'ইতিহাস প্রিমিয়াম সাজেশন',
  },
  {
    id: 'nu-masters-result-2026',
    title: 'জাতীয় বিশ্ববিদ্যালয় মাস্টার্স ফাইনাল বর্ষ রেজাল্ট ২০২৬ ও মার্কশিট দেখার নিয়ম (NU Masters Result)',
    category: 'NU Masters / Result Check',
    slug: '/blogs/nu-masters-final-year-result-2026',
    views: 1650,
    publishDate: 'Aug 21, 2026',
    badgeText: 'মাস্টার্স সিজিপিএ ফল',
  },
  {
    id: 'degree-form-fillup-2026',
    title: 'জাতীয় বিশ্ববিদ্যালয় ডিগ্রি ১ম বর্ষ ফরম পূরণ নোটিশ ২০২৬ (NU Degree 1st Year Form Fillup)',
    category: 'NU Degree / Form Fillup',
    slug: '/blogs/nu-degree-1st-year-form-fillup-2026',
    views: 1190,
    publishDate: 'Aug 21, 2026',
    badgeText: 'ডিগ্রি ফরম পূরণ তারিখ',
  },
];

export default function HonoursSection() {
  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-2.5 h-6 bg-purple-600 rounded-full" />
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 flex items-center space-x-2">
            <GraduationCap className="w-6 h-6 text-purple-700" />
            <span>Honours, Degree & National University Notice (অনার্স ও ডিগ্রী জাতীয় বিশ্ববিদ্যালয় নোটিশ)</span>
          </h2>
        </div>

        <Link
          href="/blogs"
          className="px-3.5 py-1.5 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-lg transition-colors flex items-center space-x-1 shadow-2xs cursor-pointer"
        >
          <span>View all</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Grid of Honours / National University Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {HONOURS_ARTICLES.map((article) => (
          <div
            key={article.id}
            className={`bg-white rounded-xl border ${
              article.isFeatured
                ? 'border-purple-500 ring-2 ring-purple-500/20 shadow-md'
                : 'border-gray-200 shadow-2xs hover:border-purple-400'
            } hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col group`}
          >
            {/* Auto Generated 3D Text Cover Banner (No external image needed) */}
            <div className="relative aspect-16/9 bg-slate-950 overflow-hidden">
              <BookCover
                title={article.title}
                subject={article.category}
                bookType={article.badgeText || 'নোটিশ'}
                showBadges={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Overlays: Views badge and Bookmark button */}
              <div className="absolute top-2.5 right-2.5 flex items-center space-x-1.5 z-10">
                <div className="bg-black/70 backdrop-blur-md text-white text-3xs font-extrabold px-2 py-1 rounded-md flex items-center space-x-1 border border-white/10 shadow-xs">
                  <Eye className="w-3 h-3 text-purple-400" />
                  <span>{article.views}</span>
                </div>

                <button
                  type="button"
                  aria-label="Bookmark"
                  className="bg-black/70 backdrop-blur-md hover:bg-purple-600 text-white p-1 rounded-md border border-white/10 transition-colors shadow-xs"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                </button>
              </div>

              {article.badgeText && (
                <div className="absolute bottom-2.5 left-2.5 z-10">
                  <span className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white text-3xs font-black px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm flex items-center space-x-1 border border-white/20">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>{article.badgeText}</span>
                  </span>
                </div>
              )}
            </div>

            {/* Content Container */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                {/* Category metadata */}
                <span className="text-3xs font-bold text-purple-700 uppercase tracking-wider block">
                  #{article.category}
                </span>

                {/* Title */}
                <h3 className="font-extrabold text-gray-900 text-sm sm:text-base line-clamp-2 group-hover:text-purple-700 transition-colors leading-snug">
                  <Link href={article.slug}>{article.title}</Link>
                </h3>
              </div>

              {/* Footer Details */}
              <div className="pt-2.5 border-t border-gray-100 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className="bg-purple-700 text-white font-extrabold text-3xs px-2 py-0.5 rounded uppercase">
                    OFFICIAL
                  </span>
                  <span className="text-gray-500 font-medium text-2xs">
                    {article.publishDate}
                  </span>
                </div>

                <Link
                  href={article.slug}
                  className="text-purple-700 hover:text-purple-900 font-extrabold text-xs hover:underline flex items-center space-x-0.5"
                >
                  <span>Read more</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
