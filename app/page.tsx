import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SearchBox from '@/components/SearchBox';
import BookCard from '@/components/BookCard';
import AdSlot from '@/components/AdSlot';
import HscSection from '@/components/HscSection';
import HonoursSection from '@/components/HonoursSection';
import { CLASSES_LIST } from '@/lib/types';
import { getLatestBooks, getBooksByType } from '@/lib/data';
import { BookOpen, GraduationCap, FileText, Sparkles, ArrowRight, Award, ChevronRight, BookMarked } from 'lucide-react';
import LatestPostsSection from '@/components/LatestPostsSection';

const ADMISSION_VARSITIES = [
  { name: 'ঢাকা বিশ্ববিদ্যালয় (DU)', slug: 'du', color: 'from-blue-700 to-indigo-900' },
  { name: 'বুয়েট ও প্রকৌশল (BUET)', slug: 'buet', color: 'from-amber-700 to-orange-900' },
  { name: 'চট্টগ্রাম বিশ্ববিদ্যালয় (CU)', slug: 'cu', color: 'from-emerald-700 to-teal-900' },
  { name: 'রাজশাহী বিশ্ববিদ্যালয় (RU)', slug: 'ru', color: 'from-rose-700 to-red-900' },
  { name: 'মেডিকেল ও ডেন্টাল (Medical)', slug: 'medical', color: 'from-cyan-700 to-blue-900' },
  { name: 'গুচ্ছ বিশ্ববিদ্যালয় (GST)', slug: 'gst', color: 'from-purple-700 to-violet-900' },
  { name: 'কৃষি গুচ্ছ (Agri GST)', slug: 'agri', color: 'from-lime-700 to-green-900' },
];

export default async function HomePage() {
  const latestBooks = await getLatestBooks(24);
  const guideBooks = (await getBooksByType('guide')).slice(0, 8);
  const textbookBooks = (await getBooksByType('textbook')).slice(0, 8);

  return (
    <div className="space-y-8 sm:space-y-10 pb-8">
      {/* Hero Section — Split-Screen: Text Left, Full-Bleed Image Right */}
      <section className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-2xl shadow-lg relative overflow-hidden border border-emerald-800/40 min-h-[240px] sm:min-h-[280px] md:min-h-[320px]">

        {/* DYINGFIELD Artwork — wider overlap so gradient blend has room to fade */}
        <div className="absolute inset-y-0 right-0 w-full md:w-[62%] pointer-events-none">
          <Image
            src="/images/logo.jpg"
            alt="Dying Field Artwork"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Wide multi-stop gradient — must match hero bg colors exactly for seamless blend */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900 from-[15%] via-emerald-900/75 via-[40%] to-transparent to-[75%]" />
          {/* Mobile: fade from bottom of text area downward */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-slate-900/50 to-transparent md:hidden" />
        </div>

        {/* Ambient glow */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Left Column — Text & Search (padding inside section) */}
        <div className="relative z-10 p-5 sm:p-8 md:w-[58%] flex flex-col justify-center space-y-4 min-h-[240px] sm:min-h-[280px] md:min-h-[320px]">
          <div className="inline-flex items-center space-x-2 bg-emerald-600/30 border border-emerald-400/30 px-3.5 py-1 rounded-full text-xs font-semibold text-emerald-200 w-fit">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>NCTB বোর্ড বই, গাইড ও এডমিশন PDF ২০২৬</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white">
            বাংলাদেশের সকল শ্রেণির বই, গাইড ও বিশ্ববিদ্যালয় এডমিশন PDF
          </h1>

          <p className="text-emerald-100 text-xs sm:text-base leading-relaxed font-medium">
            শ্রেণি, বিষয় ও বিশ্ববিদ্যালয় ভর্তি প্রস্তুতি অনুযায়ী পাঠ্যবই, গাইড বই এবং প্রয়োজনীয় শিক্ষামূলক PDF খুঁজে নিন। একদম সহজ ও দ্রুত ডাউনলোডের ব্যবস্থা।
          </p>

          <div className="pt-1 max-w-xl">
            <SearchBox placeholder="বই, গাইড বা ভার্সিটির নাম লিখে সার্চ করুন... (যেমন: DU Question Bank, BUET Math)" />
          </div>
        </div>
      </section>

      {/* Top Ad Slot */}
<AdSlot slotId="homepage-top" format="horizontal" />

      {/* 🚀 Latest Posts Section (College Admission & Blog Notices) */}
      <LatestPostsSection />

      {/* Section: Dedicated University Admission Preparation */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 pb-2.5">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shadow-xs flex-shrink-0">
              <Award className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-extrabold text-gray-900 leading-snug">
                University Admission Preparation (ভর্তি প্রস্তুতি)
              </h2>
              <p className="text-2xs sm:text-xs text-gray-500 font-medium">
                DU, BUET, CU, RU, Medical ও গুচ্ছ বিশ্ববিদ্যালয়ের প্রশ্ন ব্যাংক ও গাইড PDF
              </p>
            </div>
          </div>
          <Link
            href="/class/admission"
            className="text-xs sm:text-sm font-semibold text-amber-700 hover:text-amber-800 flex items-center space-x-1 flex-shrink-0"
          >
            <span>সব দেখুন</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3">
          {ADMISSION_VARSITIES.map((v) => (
            <Link
              key={v.slug}
              href={`/admission/${v.slug}`}
              className={`bg-gradient-to-br ${v.color} text-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md hover:scale-[1.02] transition-all flex flex-col justify-between space-y-3 relative overflow-hidden group border border-white/10`}
            >
              <div>
                <span className="text-xs sm:text-base font-extrabold leading-snug block group-hover:underline">
                  {v.name}
                </span>
              </div>
              <div className="flex items-center justify-between text-3xs sm:text-xs font-semibold text-white/90 pt-1.5 border-t border-white/20">
                <span>প্রশ্ন ব্যাংক PDF</span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 🎓 Section: HSC (Class 11-12) Articles & Routine */}
      <HscSection />

      {/* 🏛️ Section: Honours, Degree & National University Notice */}
      <HonoursSection />

      {/* Section: Browse By Class (Mobile: 4 per row, Desktop: 6 per row) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 pb-2.5">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-xs flex-shrink-0">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-extrabold text-gray-900 leading-snug">
                Browse By Class (শ্রেণি নির্বাচন করুন)
              </h2>
              <p className="text-2xs sm:text-xs text-gray-500 font-medium">
                আপনার কাঙ্ক্ষিত শ্রেণির পাঠ্যবই ও গাইড পেতে অপশনে ক্লিক করুন
              </p>
            </div>
          </div>
        </div>

        {/* Mobile: 4 cols (grid-cols-4), Desktop: 6 cols (lg:grid-cols-6) */}
        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-2 sm:gap-3.5">
          {CLASSES_LIST.map((cls) => (
            <Link
              key={cls.slug}
              href={`/class/${cls.slug}`}
              className="bg-white p-2 sm:p-4 rounded-xl sm:rounded-2xl border-2 border-gray-200 hover:border-emerald-600 hover:shadow-md transition-all text-center group flex flex-col items-center justify-between space-y-1.5 sm:space-y-2 relative overflow-hidden"
            >
              <div className="w-full h-1 bg-emerald-500 absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity" />

              <span className="text-xs sm:text-lg font-extrabold text-gray-900 group-hover:text-emerald-700 transition-colors leading-tight">
                {cls.name}
              </span>

              <span className="text-[10px] sm:text-xs font-bold text-emerald-800 bg-emerald-50 px-1 py-0.5 sm:px-2.5 sm:py-0.5 rounded-md sm:rounded-full border border-emerald-200 group-hover:bg-emerald-600 group-hover:text-white transition-all whitespace-nowrap">
                {cls.bnName}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 📘 Section: Guide Books & Solutions (8 Cards total) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Guide Books & Solutions (গাইড বই ও সমাধান)
            </h2>
          </div>
          <Link
            href="/guide-books"
            className="text-xs sm:text-sm font-semibold text-emerald-700 hover:text-emerald-800 flex items-center space-x-1"
          >
            <span>সব গাইড বই</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4.5">
          {guideBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* Middle Ad Slot */}
      <AdSlot slotId="homepage-middle" format="horizontal" />

      {/* 📚 Single Combined Section: NCTB Board Textbooks (8 Cards total) */}
      <section className="space-y-4 bg-emerald-50/30 p-4 sm:p-6 rounded-2xl border border-emerald-200/80">
        <div className="flex items-center justify-between border-b border-emerald-200 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-sm flex-shrink-0 shadow-2xs">
              <BookMarked className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-extrabold text-gray-900 leading-snug">
                NCTB Board Textbooks (১ম থেকে ১০ম শ্রেণি বোর্ড পাঠ্যবই)
              </h2>
              <p className="text-2xs sm:text-xs text-gray-500 font-medium">
                জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ডের সকল অফিশিয়াল পাঠ্যবই PDF ডাউনলোডের তালিকা
              </p>
            </div>
          </div>
          <Link
            href="/textbooks"
            className="text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-900 flex items-center space-x-1 flex-shrink-0"
          >
            <span>সব পাঠ্যবই</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid showing exactly 8 textbook cards (2 rows of 4) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4.5">
          {textbookBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* ⭐️ Section: Popular Books (8 Cards total) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Popular Books (জনপ্রিয় বইসমূহ)
            </h2>
          </div>
          <Link
            href="/books"
            className="text-xs sm:text-sm font-semibold text-emerald-700 hover:text-emerald-800 flex items-center space-x-1"
          >
            <span>সবগুলো দেখুন</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4.5">
          {latestBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* Bottom Ad Slot */}
      <AdSlot slotId="homepage-bottom" format="horizontal" />
    </div>
  );
}
