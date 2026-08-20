import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import { CLASSES_LIST, SUBJECTS_LIST, DIVISION_COLLEGES_REQ, DETAILED_COLLEGES_LIST } from '@/lib/types';
import { getBooks } from '@/lib/data';
import { BLOG_POSTS_DATA } from '@/lib/blogs';
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
  BookMarked,
  ExternalLink,
  Newspaper,
  ShieldCheck,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'HTML Sitemap | সম্পূর্ণ সূচিপত্র ও নেভিগেশন ম্যাপ',
  description:
    'শিক্ষা বইমেলা ওয়েবসাইটের সকল শ্রেণি, বিষয়, ব্লগ নির্দেশিকা, এইচএসসি রুটিন, একাদশ ভর্তি নির্দেশিকা, বাংলাদেশের সেরা কলেজ ডিরেক্টরি এবং সকল পাঠ্যবই ও গাইডের সম্পূর্ণ সূচিপত্র।',
};

const ADMISSION_BANKS = [
  { name: 'ঢাকা বিশ্ববিদ্যালয় (DU)', slug: 'du', bnName: 'ডিইউ প্রশ্নব্যাংক' },
  { name: 'বুয়েট ও প্রকৌশল (BUET)', slug: 'buet', bnName: 'ইঞ্জিনিয়ারিং কনসেপ্ট বুক' },
  { name: 'মেডিকেল ও ডেন্টাল (Medical)', slug: 'medical', bnName: 'রেটিনা ডাইজেস্ট ও প্রশ্নব্যাংক' },
  { name: 'চট্টগ্রাম বিশ্ববিদ্যালয় (CU)', slug: 'cu', bnName: 'সিইউ প্রশ্নব্যাংক' },
  { name: 'রাজশাহী বিশ্ববিদ্যালয় (RU)', slug: 'ru', bnName: 'আরইউ প্রশ্নব্যাংক' },
  { name: 'গুচ্ছ বিশ্ববিদ্যালয় (GST)', slug: 'gst', bnName: 'জিএসটি প্রশ্নব্যাংক' },
  { name: 'কৃষি গুচ্ছ (Agri GST)', slug: 'agri', bnName: 'কৃষি গুচ্ছ প্রশ্নব্যাংক' },
];

export default async function HtmlSitemapPage() {
  const allBooks = await getBooks();

  return (
    <div className="space-y-8 pb-12">
      <Breadcrumb items={[{ label: 'HTML Sitemap' }]} />

      {/* Page Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-md space-y-3">
        <div className="inline-flex items-center space-x-2 bg-emerald-700/50 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-bold text-emerald-100 border border-emerald-400/30">
          <List className="w-4 h-4 text-amber-300" />
          <span>Complete Website Directory Index (৩৩২টি বই + ব্লগ ও নোটিশ)</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          HTML Sitemap (ওয়েবসাইট সম্পূর্ণ সূচিপত্র ও সাইটম্যাপ)
        </h1>

        <p className="text-emerald-100 text-sm leading-relaxed max-w-3xl">
          আমাদের ওয়েবসাইটের সকল পাঠ্যবই, গাইড বই, এডমিশন প্রশ্নব্যাংক, অফিশিয়াল ব্লগ সংবাদ, এইচএসসি রুটিন, একাদশ শ্রেণি ভর্তি নির্দেশিকা এবং কলেজ প্রোফাইলের সম্পূর্ণ নেভিগেশন ম্যাপ।
        </p>
      </div>

      {/* 🚀 Section 1: Special Emergency Notices & Routines */}
      <section className="bg-white p-6 rounded-2xl border-2 border-emerald-100 space-y-4 shadow-xs">
        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2 flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span>জরুরি আপডেট ও অফিশিয়াল লিংক (Emergency Links & Routines)</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <Link
            href="/hsc-exam-routine"
            className="p-3.5 bg-red-50 hover:bg-red-100 border-2 border-red-200 rounded-xl text-xs font-bold text-red-950 flex items-center justify-between transition-all"
          >
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-red-600 flex-shrink-0" />
              <span>HSC পরীক্ষা রুটিন PDF</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-red-500" />
          </Link>

          <Link
            href="/college-admission"
            className="p-3.5 bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-200 rounded-xl text-xs font-bold text-emerald-950 flex items-center justify-between transition-all"
          >
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-4 h-4 text-emerald-700 flex-shrink-0" />
              <span>একাদশ ভর্তি ২০২৬</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
          </Link>

          <Link
            href="/blogs"
            className="p-3.5 bg-purple-50 hover:bg-purple-100 border-2 border-purple-200 rounded-xl text-xs font-bold text-purple-950 flex items-center justify-between transition-all"
          >
            <div className="flex items-center space-x-2">
              <Newspaper className="w-4 h-4 text-purple-700 flex-shrink-0" />
              <span>শিক্ষা ও নাগরিক সেবা ব্লগ</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-purple-600" />
          </Link>

          <Link
            href="/colleges"
            className="p-3.5 bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 rounded-xl text-xs font-bold text-blue-950 flex items-center justify-between transition-all"
          >
            <div className="flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-blue-700 flex-shrink-0" />
              <span>বাংলাদেশের সকল কলেজ</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
          </Link>
        </div>
      </section>

      {/* 📰 Section 2: High-SEO Official Blog Posts */}
      <section className="bg-white p-6 rounded-2xl border border-gray-200 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
          <h2 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
            <Newspaper className="w-5 h-5 text-purple-600" />
            <span>অফিশিয়াল শিক্ষা ও সরকারি সেবা ব্লগসমূহ ({BLOG_POSTS_DATA.length}টি পোস্ট)</span>
          </h2>
          <Link href="/blogs" className="text-xs font-bold text-purple-700 hover:underline">
            সকল ব্লগ ➔
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs font-semibold">
          {BLOG_POSTS_DATA.map((post) => (
            <Link
              key={post.id}
              href={`/blogs/${post.slug}`}
              className="p-3 bg-purple-50/40 hover:bg-purple-100/60 border border-purple-200 rounded-xl text-purple-950 flex justify-between items-center transition-colors group"
            >
              <span className="truncate group-hover:underline">{post.title}</span>
              <span className="text-purple-700 text-2xs font-mono flex-shrink-0 ml-2">
                {post.category}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 🏛️ Section 3: University Admission Banks */}
      <section className="bg-white p-6 rounded-2xl border border-gray-200 space-y-4 shadow-xs">
        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2 flex items-center space-x-2">
          <Award className="w-5 h-5 text-amber-600" />
          <span>বিশ্ববিদ্যালয় ও মেডিকেল এডমিশন ব্যাংক (University Admission Index)</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs font-semibold">
          {ADMISSION_BANKS.map((b) => (
            <Link
              key={b.slug}
              href={`/admission/${b.slug}`}
              className="p-3 bg-amber-50/50 hover:bg-amber-100/60 border border-amber-200 rounded-xl text-amber-950 flex justify-between items-center transition-colors"
            >
              <span className="font-bold">{b.name}</span>
              <span className="text-amber-800 text-2xs">{b.bnName}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 🎓 Section 4: College Admission Guides */}
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

      {/* 🗺️ Section 5: 8 Divisions College Cut Marks Hub */}
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

      {/* 🏫 Section 6: Classes Section */}
      <section className="bg-white p-6 rounded-2xl border border-gray-200 space-y-4 shadow-xs">
        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2 flex items-center space-x-2">
          <GraduationCap className="w-5 h-5 text-emerald-600" />
          <span>Classes Directory (শ্রেণিসমূহ)</span>
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

      {/* 📚 Section 7: Text Books & Guide Books Subject Categories */}
      <section className="bg-white p-6 rounded-2xl border border-gray-200 space-y-4 shadow-xs">
        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2 flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <span>Text Books & Guide Categories (পাঠ্যবই ও গাইড বিষয়সমূহ)</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {SUBJECTS_LIST.map((subj) => (
            <Link
              key={subj.slug}
              href="/guide-books"
              className="p-3 bg-blue-50/50 hover:bg-blue-100/60 border border-blue-200 rounded-xl text-xs font-semibold text-blue-900 flex justify-between items-center transition-colors"
            >
              <span>{subj.name}</span>
              <span className="text-blue-700 text-2xs">{subj.bnName}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 🏫 Section 8: Top College Profiles Directory */}
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

      {/* 📖 Section 9: Complete Books Directory (All 332+ PDF Books) */}
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
              <span className="text-gray-500 whitespace-nowrap text-2xs font-semibold bg-gray-100 px-2 py-0.5 rounded flex-shrink-0">
                {book.class_name} • {book.year}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 🛡️ Section 10: Policies & Legal Links */}
      <section className="bg-gray-900 text-white p-6 rounded-2xl space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400 flex items-center space-x-1.5">
          <ShieldCheck className="w-4 h-4" />
          <span>তথ্য ও শর্তাবলী (Information & Policies)</span>
        </h2>
        <div className="flex flex-wrap gap-4 text-xs font-medium text-gray-300">
          <Link href="/about" className="hover:text-emerald-400 transition-colors">
            আমাদের সম্পর্কে (About Us)
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
