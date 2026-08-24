'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
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
  Search,
  ChevronDown,
  ChevronUp,
  Baby,
  Briefcase,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { Book, DivisionRequirement } from '@/lib/types';
import { CategoryPost, CategoryMeta } from '@/lib/categories-data';
import { BlogPostItem } from '@/lib/blogs';

interface SitemapClientProps {
  books: Book[];
  blogPosts: BlogPostItem[];
  categoryPosts: CategoryPost[];
  categoryList: CategoryMeta[];
  classes: { name: string; slug: string; bnName: string }[];
  subjects: { name: string; slug: string; bnName: string }[];
  colleges: { name: string; slug: string; district?: string }[];
  divisions: DivisionRequirement[];
}

const ADMISSION_BANKS = [
  { name: 'ঢাকা বিশ্ববিদ্যালয় (DU)', slug: 'du', bnName: 'ডিইউ প্রশ্নব্যাংক' },
  { name: 'বুয়েট ও প্রকৌশল (BUET)', slug: 'buet', bnName: 'ইঞ্জিনিয়ারিং কনসেপ্ট বুক' },
  { name: 'মেডিকেল ও ডেন্টাল (Medical)', slug: 'medical', bnName: 'রেটিনা ডাইজেস্ট ও প্রশ্নব্যাংক' },
  { name: 'চট্টগ্রাম বিশ্ববিদ্যালয় (CU)', slug: 'cu', bnName: 'সিইউ প্রশ্নব্যাংক' },
  { name: 'রাজশাহী বিশ্ববিদ্যালয় (RU)', slug: 'ru', bnName: 'আরইউ প্রশ্নব্যাংক' },
  { name: 'গুচ্ছ বিশ্ববিদ্যালয় (GST)', slug: 'gst', bnName: 'জিএসটি প্রশ্নব্যাংক' },
  { name: 'কৃষি গুচ্ছ (Agri GST)', slug: 'agri', bnName: 'কৃষি গুচ্ছ প্রশ্নব্যাংক' },
];

export default function SitemapClient({
  books,
  blogPosts,
  categoryPosts,
  categoryList,
  classes,
  subjects,
  colleges,
  divisions,
}: SitemapClientProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'books' | 'baby' | 'jobs' | 'admission' | 'colleges' | 'blogs'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllBooks, setShowAllBooks] = useState(false);
  const [showAllJobs, setShowAllJobs] = useState(false);

  // Separate category posts by categorySlug
  const babyPosts = useMemo(
    () => categoryPosts.filter((p) => p.categorySlug === 'baby-boy-girl-name'),
    [categoryPosts]
  );

  const jobPosts = useMemo(
    () => categoryPosts.filter((p) => p.categorySlug === 'job-circular-news'),
    [categoryPosts]
  );

  const hscNotePosts = useMemo(
    () => categoryPosts.filter((p) => p.categorySlug === 'hsc-hand-note'),
    [categoryPosts]
  );

  // Search Filtering
  const query = searchQuery.trim().toLowerCase();

  const filteredBooks = useMemo(() => {
    if (!query) return books;
    return books.filter(
      (b) =>
        b.title.toLowerCase().includes(query) ||
        b.subject.toLowerCase().includes(query) ||
        b.class_name.toLowerCase().includes(query)
    );
  }, [books, query]);

  const filteredBabyPosts = useMemo(() => {
    if (!query) return babyPosts;
    return babyPosts.filter((p) => p.title.toLowerCase().includes(query));
  }, [babyPosts, query]);

  const filteredJobPosts = useMemo(() => {
    if (!query) return jobPosts;
    return jobPosts.filter((p) => p.title.toLowerCase().includes(query));
  }, [jobPosts, query]);

  const filteredBlogPosts = useMemo(() => {
    if (!query) return blogPosts;
    return blogPosts.filter(
      (p) => p.title.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)
    );
  }, [blogPosts, query]);

  const filteredColleges = useMemo(() => {
    if (!query) return colleges;
    return colleges.filter((c) => c.name.toLowerCase().includes(query));
  }, [colleges, query]);

  const displayedBooks = showAllBooks || query ? filteredBooks : filteredBooks.slice(0, 36);
  const displayedJobs = showAllJobs || query ? filteredJobPosts : filteredJobPosts.slice(0, 24);

  return (
    <div className="space-y-6">
      {/* 🚀 Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-5 sm:p-8 rounded-2xl shadow-xl space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center space-x-1.5 bg-emerald-700/50 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-extrabold text-emerald-100 border border-emerald-400/30">
            <List className="w-4 h-4 text-amber-300" />
            <span>স্মার্ট সূচিপত্র ও নেভিগেশন ম্যাপ</span>
          </span>
          <span className="bg-white/10 px-2.5 py-1 rounded-full text-3xs sm:text-xs font-bold text-white/90">
            {books.length}টি বই + {categoryPosts.length}টি ক্যাটাগরি পোস্ট + {blogPosts.length}টি ব্লগ
          </span>
        </div>

        <h1 className="text-xl sm:text-3xl font-black text-white leading-tight tracking-tight">
          HTML Sitemap — সম্পূর্ণ ওয়েবসাইট নির্দেশিকা
        </h1>

        <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed max-w-3xl">
          আমাদের ওয়েবসাইটের পাঠ্যবই, গাইড বই, শিশু নেম লিস্ট, চাকরির সার্কুলার, এডমিশন প্রশ্নব্যাংক, অফিশিয়াল ব্লগ সংবাদ, এইচএসসি রুটিন ও একাদশ শ্রেণি ভর্তি নির্দেশিকা সহজে খুঁজে নিতে নিচের সার্চ বা ফিল্টার ব্যবহার করুন।
        </p>

        {/* 🔍 Interactive Search Input */}
        <div className="relative max-w-2xl pt-1">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-gray-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="যেকোনো বই, বিষয়, শিশুর নাম, চাকরির সার্কুলার বা কলেজের নাম লিখে খুঁজুন..."
              className="w-full pl-10 pr-4 py-3 bg-white text-gray-900 text-xs sm:text-sm font-semibold rounded-xl border border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-md placeholder-gray-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-xs font-bold text-gray-400 hover:text-red-600 bg-gray-100 rounded-full w-5 h-5 flex items-center justify-center"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 🏷️ Quick Category Filter Tabs */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-bold">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all border ${
            activeTab === 'all'
              ? 'bg-emerald-700 text-white border-emerald-800 shadow-sm'
              : 'bg-white text-gray-700 hover:bg-emerald-50 border-gray-200'
          }`}
        >
          📌 সকল সূচিপত্র (All)
        </button>

        <button
          onClick={() => setActiveTab('books')}
          className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all border flex items-center space-x-1 ${
            activeTab === 'books'
              ? 'bg-emerald-700 text-white border-emerald-800 shadow-sm'
              : 'bg-white text-gray-700 hover:bg-emerald-50 border-gray-200'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>পাঠ্যবই ও গাইড ({books.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('baby')}
          className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all border flex items-center space-x-1 ${
            activeTab === 'baby'
              ? 'bg-pink-700 text-white border-pink-800 shadow-sm'
              : 'bg-white text-gray-700 hover:bg-pink-50 border-gray-200'
          }`}
        >
          <Baby className="w-3.5 h-3.5 text-pink-500" />
          <span>শিশু নেম লিস্ট ({babyPosts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('jobs')}
          className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all border flex items-center space-x-1 ${
            activeTab === 'jobs'
              ? 'bg-blue-700 text-white border-blue-800 shadow-sm'
              : 'bg-white text-gray-700 hover:bg-blue-50 border-gray-200'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5 text-blue-500" />
          <span>চাকরির সার্কুলার ({jobPosts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('admission')}
          className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all border flex items-center space-x-1 ${
            activeTab === 'admission'
              ? 'bg-purple-700 text-white border-purple-800 shadow-sm'
              : 'bg-white text-gray-700 hover:bg-purple-50 border-gray-200'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5 text-purple-500" />
          <span>একাদশ ভর্তি ও এডমিশন</span>
        </button>

        <button
          onClick={() => setActiveTab('colleges')}
          className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all border flex items-center space-x-1 ${
            activeTab === 'colleges'
              ? 'bg-indigo-700 text-white border-indigo-800 shadow-sm'
              : 'bg-white text-gray-700 hover:bg-indigo-50 border-gray-200'
          }`}
        >
          <Building2 className="w-3.5 h-3.5 text-indigo-500" />
          <span>কলেজ ডিরেক্টরি ({colleges.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('blogs')}
          className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all border flex items-center space-x-1 ${
            activeTab === 'blogs'
              ? 'bg-amber-700 text-white border-amber-800 shadow-sm'
              : 'bg-white text-gray-700 hover:bg-amber-50 border-gray-200'
          }`}
        >
          <Newspaper className="w-3.5 h-3.5 text-amber-500" />
          <span>শিক্ষা ব্লগ ({blogPosts.length})</span>
        </button>
      </div>

      {/* 🚨 Section 1: Emergency & Quick Routines */}
      {(activeTab === 'all' || activeTab === 'admission') && (
        <section className="bg-white p-5 rounded-2xl border border-emerald-200 space-y-3 shadow-2xs">
          <h2 className="text-base font-extrabold text-gray-900 border-b border-gray-100 pb-2 flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>জরুরি আপডেট ও অফিশিয়াল লিংকসমূহ (Emergency Notices & Routines)</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
            <Link
              href="/hsc-exam-routine"
              className="p-3 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl text-xs font-bold text-red-950 flex items-center justify-between transition-all"
            >
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span>HSC পরীক্ষা রুটিন PDF</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-red-500" />
            </Link>

            <Link
              href="/college-admission"
              className="p-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-950 flex items-center justify-between transition-all"
            >
              <div className="flex items-center space-x-2">
                <GraduationCap className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <span>একাদশ ভর্তি ২০২৬</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
            </Link>

            <Link
              href="/category/baby-boy-girl-name"
              className="p-3 bg-pink-50 hover:bg-pink-100 border border-pink-200 rounded-xl text-xs font-bold text-pink-950 flex items-center justify-between transition-all"
            >
              <div className="flex items-center space-x-2">
                <Baby className="w-4 h-4 text-pink-600 flex-shrink-0" />
                <span>ছেলে ও মেয়ে শিশুর নাম</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-pink-500" />
            </Link>

            <Link
              href="/category/job-circular-news"
              className="p-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl text-xs font-bold text-blue-950 flex items-center justify-between transition-all"
            >
              <div className="flex items-center space-x-2">
                <Briefcase className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>চাকরির সার্কুলার ও খবর</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-blue-500" />
            </Link>
          </div>
        </section>
      )}

      {/* 👶 Section 2: Baby Boy & Girl Names Directory */}
      {(activeTab === 'all' || activeTab === 'baby') && filteredBabyPosts.length > 0 && (
        <section className="bg-white p-5 rounded-2xl border border-pink-200 space-y-3 shadow-2xs">
          <div className="flex items-center justify-between border-b border-pink-100 pb-2">
            <h2 className="text-base font-extrabold text-gray-900 flex items-center space-x-2">
              <Baby className="w-4 h-4 text-pink-600" />
              <span>ছেলে ও মেয়ে শিশুর নাম ({filteredBabyPosts.length}টি পোস্ট)</span>
            </h2>
            <Link href="/category/baby-boy-girl-name" className="text-xs font-bold text-pink-700 hover:underline">
              সকল নাম সারণী ➔
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs font-semibold">
            {filteredBabyPosts.map((post) => (
              <Link
                key={post.id}
                href={`/category/baby-boy-girl-name/${post.slug}`}
                className="p-2.5 bg-pink-50/50 hover:bg-pink-100/70 border border-pink-200 rounded-xl text-gray-900 flex justify-between items-center transition-colors group"
              >
                <span className="truncate group-hover:text-pink-700 font-bold">{post.title}</span>
                <span className="text-pink-600 text-3xs font-mono flex-shrink-0 ml-1.5">View</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 💼 Section 3: Job Circulars & News Directory */}
      {(activeTab === 'all' || activeTab === 'jobs') && filteredJobPosts.length > 0 && (
        <section className="bg-white p-5 rounded-2xl border border-blue-200 space-y-3 shadow-2xs">
          <div className="flex items-center justify-between border-b border-blue-100 pb-2">
            <h2 className="text-base font-extrabold text-gray-900 flex items-center space-x-2">
              <Briefcase className="w-4 h-4 text-blue-600" />
              <span>চাকরির সার্কুলার ও নিয়োগ বিজ্ঞপ্তি ({filteredJobPosts.length}টি পোস্ট)</span>
            </h2>
            <Link href="/category/job-circular-news" className="text-xs font-bold text-blue-700 hover:underline">
              সকল সার্কুলার ➔
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs font-semibold">
            {displayedJobs.map((post) => (
              <Link
                key={post.id}
                href={`/category/job-circular-news/${post.slug}`}
                className="p-2.5 bg-blue-50/40 hover:bg-blue-100/60 border border-blue-200 rounded-xl text-gray-900 flex justify-between items-center transition-colors group"
              >
                <span className="truncate group-hover:text-blue-700">{post.title}</span>
                <span className="text-blue-600 text-3xs font-mono flex-shrink-0 ml-1.5">{post.date}</span>
              </Link>
            ))}
          </div>

          {!showAllJobs && !query && jobPosts.length > 24 && (
            <div className="pt-2 text-center">
              <button
                onClick={() => setShowAllJobs(true)}
                className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-bold rounded-xl border border-blue-200 transition-colors inline-flex items-center space-x-1"
              >
                <span>আরও {jobPosts.length - 24}টি চাকরির সার্কুলার দেখুন</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          )}
        </section>
      )}

      {/* 📚 Section 4: Text Books & Guides Directory */}
      {(activeTab === 'all' || activeTab === 'books') && filteredBooks.length > 0 && (
        <section className="bg-white p-5 rounded-2xl border border-gray-200 space-y-3 shadow-2xs">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
            <h2 className="text-base font-extrabold text-gray-900 flex items-center space-x-2">
              <BookMarked className="w-4 h-4 text-emerald-600" />
              <span>অনলাইন বই ও গাইড লাইব্রেরি ({filteredBooks.length}টি বই)</span>
            </h2>
            <span className="text-xs text-gray-500 font-mono">
              {displayedBooks.length} of {filteredBooks.length} Books
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
            {displayedBooks.map((book) => (
              <Link
                key={book.id}
                href={`/${book.class_slug}/${book.slug}`}
                className="p-2.5 bg-gray-50/80 hover:bg-emerald-50 border border-gray-200 hover:border-emerald-300 rounded-xl flex items-center justify-between transition-colors group"
              >
                <span className="font-bold text-gray-900 group-hover:text-emerald-700 truncate pr-2">
                  {book.title}
                </span>
                <span className="text-gray-500 text-3xs font-semibold bg-white px-2 py-0.5 rounded border border-gray-200 flex-shrink-0">
                  {book.class_name}
                </span>
              </Link>
            ))}
          </div>

          {!showAllBooks && !query && books.length > 36 && (
            <div className="pt-2 text-center">
              <button
                onClick={() => setShowAllBooks(true)}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors inline-flex items-center space-x-1.5"
              >
                <span>লাইব্রেরির সকল {books.length}টি বই দেখুন</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          )}
        </section>
      )}

      {/* 🏛️ Section 5: Admission & College Cut Marks */}
      {(activeTab === 'all' || activeTab === 'admission') && (
        <section className="bg-white p-5 rounded-2xl border border-gray-200 space-y-4 shadow-2xs">
          <h2 className="text-base font-extrabold text-gray-900 border-b border-gray-100 pb-2 flex items-center space-x-2">
            <Award className="w-4 h-4 text-amber-600" />
            <span>বিশ্ববিদ্যালয় ও এডমিশন প্রশ্নব্যাংক (University Admission Banks)</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs font-semibold">
            {ADMISSION_BANKS.map((b) => (
              <Link
                key={b.slug}
                href={`/admission/${b.slug}`}
                className="p-3 bg-amber-50/50 hover:bg-amber-100/60 border border-amber-200 rounded-xl text-amber-950 flex justify-between items-center transition-colors"
              >
                <span className="font-bold">{b.name}</span>
                <span className="text-amber-800 text-3xs font-mono">{b.bnName}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 🗺️ Section 6: Division College Cut Marks Directory */}
      {(activeTab === 'all' || activeTab === 'colleges' || activeTab === 'admission') && (
        <section className="bg-white p-5 rounded-2xl border border-gray-200 space-y-3 shadow-2xs">
          <h2 className="text-base font-extrabold text-gray-900 border-b border-gray-100 pb-2 flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-rose-600" />
            <span>৮টি বিভাগের সেরা কলেজ জিপিএ ও কাট মার্কস (Divisions Directory)</span>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-semibold">
            {divisions.map((div) => (
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
      )}

      {/* 🏫 Section 7: Top College Profiles Directory */}
      {(activeTab === 'all' || activeTab === 'colleges') && filteredColleges.length > 0 && (
        <section className="bg-white p-5 rounded-2xl border border-gray-200 space-y-3 shadow-2xs">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
            <h2 className="text-base font-extrabold text-gray-900 flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-indigo-600" />
              <span>বাংলাদেশের শীর্ষ কলেজ প্রোফাইল ({filteredColleges.length}টি কলেজ)</span>
            </h2>
            <Link href="/colleges" className="text-xs font-bold text-indigo-700 hover:underline">
              সকল কলেজ ডিরেক্টরি ➔
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-xs font-semibold">
            {filteredColleges.map((col) => (
              <Link
                key={col.slug}
                href={`/college/${col.slug}`}
                className="p-2.5 bg-gray-50 hover:bg-indigo-50 border border-gray-200 hover:border-indigo-300 rounded-xl text-gray-800 truncate transition-colors"
                title={col.name}
              >
                <span className="truncate block">{col.name}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 📰 Section 8: Official Blog Posts */}
      {(activeTab === 'all' || activeTab === 'blogs') && filteredBlogPosts.length > 0 && (
        <section className="bg-white p-5 rounded-2xl border border-gray-200 space-y-3 shadow-2xs">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
            <h2 className="text-base font-extrabold text-gray-900 flex items-center space-x-2">
              <Newspaper className="w-4 h-4 text-amber-600" />
              <span>শিক্ষা ও তথ্য সেবা ব্লগসমূহ ({filteredBlogPosts.length}টি ব্লগ)</span>
            </h2>
            <Link href="/blogs" className="text-xs font-bold text-amber-700 hover:underline">
              সকল ব্লগ ➔
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs font-semibold">
            {filteredBlogPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blogs/${post.slug}`}
                className="p-2.5 bg-amber-50/30 hover:bg-amber-100/50 border border-amber-200 rounded-xl text-gray-900 flex justify-between items-center transition-colors group"
              >
                <span className="truncate group-hover:text-amber-800 font-bold">{post.title}</span>
                <span className="text-amber-700 text-3xs font-mono flex-shrink-0 ml-1.5">Read</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 🛡️ Section 9: Legal & Policy Pages */}
      <section className="bg-gray-900 text-white p-5 rounded-2xl space-y-2.5">
        <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center space-x-1.5">
          <ShieldCheck className="w-4 h-4" />
          <span>তথ্য ও পলিসি পেজসমূহ (Policies & Legal Links)</span>
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
