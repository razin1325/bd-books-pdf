import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import { CLASSES_LIST, SUBJECTS_LIST, DIVISION_COLLEGES_REQ, DETAILED_COLLEGES_LIST } from '@/lib/types';
import { getBooks } from '@/lib/data';
import { getAdmissionBookHref } from '@/lib/admission';
import {
  BookOpen,
  GraduationCap,
  FileText,
  List,
  Calendar,
  Building2,
  MapPin,
  Sparkles,
  Award,
  HelpCircle,
  BookMarked,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'HTML Sitemap | সম্পূর্ণ সূচিপত্র ও নেভিগেশন ম্যাপ',
  description:
    'শিক্ষা বইমেলা ওয়েবসাইটের সকল শ্রেণি, বিষয়, এইচএসসি রুটিন, একাদশ ভর্তি নির্দেশিকা, বাংলাদেশের সেরা কলেজ ডিরেক্টরি এবং সকল পাঠ্যবই ও গাইডের সম্পূর্ণ সূচিপত্র।',
};

export default async function HtmlSitemapPage() {
  const allBooks = await getBooks();

  return (
    <div className="space-y-8 pb-12">
      <Breadcrumb items={[{ label: 'HTML Sitemap' }]} />

      {/* Page Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-md space-y-3">
        <div className="inline-flex items-center space-x-2 bg-emerald-700/50 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-bold text-emerald-100 border border-emerald-400/30">
          <List className="w-4 h-4 text-amber-300" />
          <span>Complete Website Directory Index</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          HTML Sitemap (ওয়েবসাইট সম্পূর্ণ সূচিপত্র)
        </h1>

        <p className="text-emerald-100 text-sm leading-relaxed max-w-3xl">
          আমাদের ওয়েবসাইটের সকল এনসিটিবি পাঠ্যবই, গাইড বই, এইচএসসি রুটিন, একাদশ শ্রেণি ভর্তি নির্দেশিকা, ৮টি বিভাগের কাট মার্কস ডিরেক্টরি এবং কলেজ প্রোফাইলের নেভিগেশন ম্যাপ।
        </p>
      </div>

      {/* Special Highlights Section */}
      <section className="bg-white p-6 rounded-2xl border-2 border-emerald-100 space-y-4 shadow-xs">
        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2 flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span>বিশেষ নোটিশ ওজরুরি আপডেট (Special Notices & Routines)</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <Link
            href="/hsc-exam-routine"
            className="p-3.5 bg-red-50 hover:bg-red-100 border-2 border-red-200 rounded-xl text-xs font-bold text-red-950 flex items-center justify-between transition-all"
          >
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-red-600 flex-shrink-0" />
              <span>এইচএসসি পরীক্ষা ২০২৭ রুটিন PDF</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-red-500" />
          </Link>

          <Link
            href="/college-admission"
            className="p-3.5 bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-200 rounded-xl text-xs font-bold text-emerald-950 flex items-center justify-between transition-all"
          >
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-4 h-4 text-emerald-700 flex-shrink-0" />
              <span>একাদশ শ্রেণি ভর্তি নির্দেশিকা ২০২৬</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
          </Link>

          <Link
            href="/colleges"
            className="p-3.5 bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 rounded-xl text-xs font-bold text-blue-950 flex items-center justify-between transition-all"
          >
            <div className="flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-blue-700 flex-shrink-0" />
              <span>বাংলাদেশের সেরা কলেজ ডিরেক্টরি</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
          </Link>
        </div>
      </section>

      {/* College Admission Special Pages */}
      <section className="bg-white p-6 rounded-2xl border border-gray-200 space-y-4 shadow-xs">
        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2 flex items-center space-x-2">
          <GraduationCap className="w-5 h-5 text-emerald-600" />
          <span>একাদশ শ্রেণি ভর্তি গাইড ও নিয়মাবলী (XI Class Admission Guides)</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs font-semibold">
          <Link
            href="/college-admission/ndc"
            className="p-3 bg-gray-50 hover:bg-emerald-50 border border-gray-200 hover:border-emerald-300 rounded-xl text-gray-900 flex justify-between items-center transition-colors"
          >
            <span>নটর ডেম কলেজ (NDC) ভর্তি বিজ্ঞপ্তি</span>
            <span className="text-emerald-700 text-2xs font-mono">/ndc</span>
          </Link>

          <Link
            href="/college-admission/holy-cross"
            className="p-3 bg-gray-50 hover:bg-emerald-50 border border-gray-200 hover:border-emerald-300 rounded-xl text-gray-900 flex justify-between items-center transition-colors"
          >
            <span>হলিক্রস কলেজ (Holy Cross) ভর্তি তথ্য</span>
            <span className="text-emerald-700 text-2xs font-mono">/holy-cross</span>
          </Link>

          <Link
            href="/college-admission/st-joseph"
            className="p-3 bg-gray-50 hover:bg-emerald-50 border border-gray-200 hover:border-emerald-300 rounded-xl text-gray-900 flex justify-between items-center transition-colors"
          >
            <span>সেন্ট জোসেফ কলেজ (St. Joseph) ভর্তি তথ্য</span>
            <span className="text-emerald-700 text-2xs font-mono">/st-joseph</span>
          </Link>

          <Link
            href="/college-admission/how-to-apply"
            className="p-3 bg-emerald-50/80 hover:bg-emerald-100 border border-emerald-300 rounded-xl text-emerald-950 flex justify-between items-center transition-colors font-bold"
          >
            <span>অনলাইন আবেদন করার নিয়ম (xiclassadmission)</span>
            <span className="text-emerald-700 text-2xs font-mono">/how-to-apply</span>
          </Link>

          <Link
            href="/college-admission/requirements-gpa-cut-marks"
            className="p-3 bg-rose-50/80 hover:bg-rose-100 border border-rose-300 rounded-xl text-rose-950 flex justify-between items-center transition-colors font-bold"
          >
            <span>৮টি বিভাগের কাট মার্কস ডিরেক্টরি</span>
            <span className="text-rose-700 text-2xs font-mono">/requirements-gpa-cut-marks</span>
          </Link>
        </div>
      </section>

      {/* 8 Divisions College Cut Marks Hub */}
      <section className="bg-white p-6 rounded-2xl border border-gray-200 space-y-4 shadow-xs">
        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2 flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-rose-600" />
          <span>৮টি বিভাগের সেরা কলেজের জিপিএ ও কাট মার্কস (Divisions Directory)</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-semibold">
          {DIVISION_COLLEGES_REQ.map((div) => (
            <Link
              key={div.slug}
              href={`/college-admission/${div.slug}`}
              className="p-3 bg-rose-50/40 hover:bg-rose-100/60 border border-rose-200 rounded-xl text-rose-950 flex flex-col space-y-1 transition-colors"
            >
              <span className="font-bold">{div.bnName}</span>
              <span className="text-3xs text-rose-700">{div.colleges.length}টি শীর্ষ কলেজ</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Classes Section */}
      <section className="bg-white p-6 rounded-2xl border border-gray-200 space-y-4 shadow-xs">
        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2 flex items-center space-x-2">
          <GraduationCap className="w-5 h-5 text-emerald-600" />
          <span>Classes (শ্রেণিসমূহ)</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {CLASSES_LIST.map((cls) => (
            <Link
              key={cls.slug}
              href={`/class/${cls.slug}`}
              className="p-3 bg-gray-50 hover:bg-emerald-50 border border-gray-200 hover:border-emerald-300 rounded-xl text-xs font-bold text-gray-900 flex justify-between items-center transition-colors"
            >
              <span>{cls.name}</span>
              <span className="text-emerald-700 text-2xs">{cls.bnName}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Text Books Section */}
      <section className="bg-white p-6 rounded-2xl border border-gray-200 space-y-4 shadow-xs">
        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2 flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <span>Text Books Categories (বোর্ড পাঠ্যবই বিষয়সমূহ)</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {SUBJECTS_LIST.map((subj) => (
            <Link
              key={subj.slug}
              href="/textbooks"
              className="p-3 bg-blue-50/50 hover:bg-blue-100/60 border border-blue-200 rounded-xl text-xs font-semibold text-blue-900 flex justify-between items-center transition-colors"
            >
              <span>{subj.name}</span>
              <span className="text-blue-700 text-2xs">{subj.bnName}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Guide Books Section */}
      <section className="bg-white p-6 rounded-2xl border border-gray-200 space-y-4 shadow-xs">
        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2 flex items-center space-x-2">
          <FileText className="w-5 h-5 text-emerald-600" />
          <span>Guide Books Categories (গাইড ও সমাধান বিষয়সমূহ)</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {SUBJECTS_LIST.map((subj) => (
            <Link
              key={subj.slug}
              href="/guide-books"
              className="p-3 bg-emerald-50/50 hover:bg-emerald-100/60 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-900 flex justify-between items-center transition-colors"
            >
              <span>{subj.name} Guides</span>
              <span className="text-emerald-700 text-2xs">{subj.bnName}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Individual Top Colleges List (Sample Directory) */}
      <section className="bg-white p-6 rounded-2xl border border-gray-200 space-y-4 shadow-xs">
        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2 flex items-center space-x-2">
          <Building2 className="w-5 h-5 text-blue-600" />
          <span>বাংলাদেশের শীর্ষ কলেজ প্রোফাইল (Top College Directory Index)</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 text-xs font-semibold">
          {DETAILED_COLLEGES_LIST.map((col) => (
            <Link
              key={col.slug}
              href={`/college/${col.slug}`}
              className="p-2.5 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-xl text-gray-800 truncate transition-colors"
              title={col.name}
            >
              <span className="truncate block">{col.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* All Complete Books Library (All 115 PDF Books) */}
      <section className="bg-white p-6 rounded-2xl border border-gray-200 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
          <h2 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
            <BookMarked className="w-5 h-5 text-emerald-600" />
            <span>লাইব্রেরির সকল পাঠ্যবই ও গাইড ({allBooks.length}টি বই উপলব্ধ)</span>
          </h2>
          <span className="text-xs text-gray-500 font-mono">Total {allBooks.length} Books</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
          {allBooks.map((book) => (
            <Link
              key={book.id}
              href={getAdmissionBookHref(book)}
              className="p-2.5 hover:bg-emerald-50/50 rounded-xl border border-gray-200 hover:border-emerald-300 flex items-center justify-between transition-colors group"
            >
              <span className="font-bold text-gray-900 group-hover:text-emerald-700 truncate pr-2">
                {book.title}
              </span>
              <span className="text-gray-500 whitespace-nowrap text-2xs font-semibold bg-gray-100 px-2 py-0.5 rounded">
                {book.class_name} • {book.year}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Static Legal & Policy Links */}
      <section className="bg-gray-900 text-white p-6 rounded-2xl space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400">
          তথ্য ও শর্তাবলী (Information & Policies)
        </h2>
        <div className="flex flex-wrap gap-4 text-xs font-medium text-gray-300">
          <Link href="/about" className="hover:text-emerald-400 transition-colors">
            আমাদের সম্পর্কে (About Us)
          </Link>
          <Link href="/contact" className="hover:text-emerald-400 transition-colors">
            যোগাযোগ করুন (Contact Us)
          </Link>
          <Link href="/privacy-policy" className="hover:text-emerald-400 transition-colors">
            প্রাইভেসি পলিসি (Privacy Policy)
          </Link>
          <Link href="/terms" className="hover:text-emerald-400 transition-colors">
            শর্তাবলী (Terms of Service)
          </Link>
          <Link href="/disclaimer" className="hover:text-emerald-400 transition-colors">
            দাবিত্যাগ (Disclaimer)
          </Link>
        </div>
      </section>
    </div>
  );
}
