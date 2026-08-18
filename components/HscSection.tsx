import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, Bookmark, ChevronRight, Calendar, Sparkles, MapPin, Laptop } from 'lucide-react';

export interface HscArticle {
  id: string;
  title: string;
  category: string;
  categorySlug: string;
  slug: string;
  image: string;
  views: number;
  publishDate: string;
  isFeatured?: boolean;
  badgeText?: string;
}

const HSC_ARTICLES: HscArticle[] = [
  {
    id: 'hsc-routine-2027',
    title: 'এইচএসসি পরীক্ষা ২০২৭ সময়সূচি ও রুটিন - HSC 2027 Exam Routine PDF Download',
    category: 'in Download / HSC Routine',
    categorySlug: '/hsc-exam-routine',
    slug: '/hsc-exam-routine',
    image: '/images/hsc_routine_banner.png',
    views: 1420,
    publishDate: 'Aug 18, 2026',
    isFeatured: true,
    badgeText: 'অফিশিয়াল রুটিন PDF',
  },
  {
    id: 'hsc-how-to-apply',
    title: 'একাদশ শ্রেণি ভর্তি অনলাইন আবেদন করার নিয়ম ২০২৬ (xiclassadmission.gov.bd Step-by-Step Guide)',
    category: 'in XI Admission / Online Application',
    categorySlug: '/college-admission/how-to-apply',
    slug: '/college-admission/how-to-apply',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    views: 1180,
    publishDate: 'Aug 18, 2026',
    badgeText: 'আবেদন গাইড',
  },
  {
    id: 'hsc-gpa-cut-marks',
    title: 'বাংলাদেশের ৮টি বিভাগের সেরা কলেজের ন্যূনতম জিপিএ ও কাট মার্কস নির্দেশিকা ২০২৬ (All Divisions)',
    category: 'in XI Admission / Cut Marks Directory',
    categorySlug: '/college-admission/requirements-gpa-cut-marks',
    slug: '/college-admission/requirements-gpa-cut-marks',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    views: 950,
    publishDate: 'Aug 18, 2026',
    badgeText: '৮টি বিভাগ ডিরেক্টরি',
  },
];

export default function HscSection() {
  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-2.5 h-6 bg-emerald-600 rounded-full" />
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 flex items-center space-x-2">
            <span>HSC & XI Admission (Class 11-12)</span>
          </h2>
        </div>

        <Link
          href="/hsc-exam-routine"
          className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center space-x-1 shadow-2xs"
        >
          <span>View all</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Grid of HSC Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {HSC_ARTICLES.map((article) => (
          <div
            key={article.id}
            className={`bg-white rounded-xl border ${
              article.isFeatured
                ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
                : 'border-gray-200 shadow-2xs hover:border-emerald-400'
            } hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col group`}
          >
            {/* Image Container */}
            <div className="relative aspect-16/9 bg-gradient-to-br from-slate-900 to-emerald-950 overflow-hidden">
              <Image
                src={article.image}
                alt={article.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                unoptimized
              />

              {/* Overlays: Views badge and Bookmark button */}
              <div className="absolute top-2.5 right-2.5 flex items-center space-x-1.5">
                <div className="bg-black/70 backdrop-blur-md text-white text-3xs font-extrabold px-2 py-1 rounded-md flex items-center space-x-1 border border-white/10 shadow-xs">
                  <Eye className="w-3 h-3 text-emerald-400" />
                  <span>{article.views}</span>
                </div>

                <button
                  type="button"
                  aria-label="Bookmark"
                  className="bg-black/70 backdrop-blur-md hover:bg-emerald-600 text-white p-1 rounded-md border border-white/10 transition-colors shadow-xs"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                </button>
              </div>

              {article.badgeText && (
                <div className="absolute bottom-2.5 left-2.5">
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-3xs font-black px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm flex items-center space-x-1 border border-white/20">
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
                <span className="text-3xs font-bold text-gray-500 uppercase tracking-wider block">
                  {article.category}
                </span>

                {/* Title */}
                <h3 className="font-extrabold text-gray-900 text-sm sm:text-base line-clamp-2 group-hover:text-emerald-600 transition-colors leading-snug">
                  <Link href={article.slug}>{article.title}</Link>
                </h3>
              </div>

              {/* Footer Details */}
              <div className="pt-2.5 border-t border-gray-100 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className="bg-emerald-600 text-white font-extrabold text-3xs px-2 py-0.5 rounded uppercase">
                    Published
                  </span>
                  <span className="text-gray-500 font-medium text-2xs">
                    {article.publishDate}
                  </span>
                </div>

                <Link
                  href={article.slug}
                  className="text-emerald-700 hover:text-emerald-900 font-extrabold text-xs hover:underline flex items-center space-x-0.5"
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
