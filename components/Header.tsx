'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Search, Menu, X, ChevronDown, GraduationCap, Sparkles, Building2, Calendar, Home, Zap } from 'lucide-react';
import { CLASSES_LIST } from '@/lib/types';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [classDropdownOpen, setClassDropdownOpen] = useState(false);

  const tickerItems = (
    <>
      <Link
        href="/hsc-exam-routine"
        className="px-3.5 py-1 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-full font-extrabold text-xs shadow-sm flex items-center space-x-1.5 border border-red-400/40"
      >
        <Calendar className="w-4 h-4 text-amber-300 animate-pulse" />
        <span>📅 এইচএসসি পরীক্ষা সময়সূচি ও রুটিন PDF</span>
      </Link>

      <Link
        href="/college-admission"
        className="px-3.5 py-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-full font-extrabold text-xs shadow-sm flex items-center space-x-1.5 border border-emerald-400/40"
      >
        <GraduationCap className="w-4 h-4 text-amber-300" />
        <span>একাদশ ভর্তি ২০২৬ নির্দেশিকা</span>
      </Link>

      <Link
        href="/colleges"
        className="px-3.5 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-full font-extrabold text-xs shadow-sm flex items-center space-x-1.5 border border-blue-400/40"
      >
        <Building2 className="w-4 h-4 text-amber-300" />
        <span>বাংলাদেশের সকল কলেজ ডিরেক্টরি</span>
      </Link>

      <Link
        href="/college-admission/ndc"
        className="px-3 py-1 bg-white/10 hover:bg-emerald-600 hover:text-white text-emerald-100 rounded-full border border-white/15 font-bold text-xs"
      >
        🎓 নটর ডেম কলেজ ভর্তি বিজ্ঞপ্তি
      </Link>

      <Link
        href="/college-admission/holy-cross"
        className="px-3 py-1 bg-white/10 hover:bg-emerald-600 hover:text-white text-emerald-100 rounded-full border border-white/15 font-bold text-xs"
      >
        👑 হলিক্রস কলেজ ভর্তি বিজ্ঞপ্তি
      </Link>

      <Link
        href="/class/admission"
        className="px-3 py-1 bg-gradient-to-r from-amber-600 to-rose-600 text-white rounded-full font-bold text-xs"
      >
        📚 বিশ্ববিদ্যালয় ভর্তি বই (DU/BUET)
      </Link>

      {CLASSES_LIST.map((cls) => (
        <Link
          key={cls.slug}
          href={`/class/${cls.slug}`}
          className="px-3 py-1 bg-white/10 hover:bg-emerald-600 hover:text-white text-emerald-100 rounded-full border border-white/15 font-semibold text-xs"
        >
          {cls.bnName}
        </Link>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-emerald-100 shadow-xs">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-news-marquee {
          display: inline-flex;
          animation: marquee 35s linear infinite;
        }
        .news-ticker-container:hover .animate-news-marquee,
        .animate-news-marquee:hover {
          animation-play-state: paused !important;
          -webkit-animation-play-state: paused !important;
        }
      `}</style>

      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white text-2xs sm:text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center space-x-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse flex-shrink-0" />
        <span>🇧🇩 এইচএসসি রুটিন ২০২৭, এনসিটিবি পাঠ্যবই, গাইড বই ও একাদশ শ্রেণি ভর্তি তথ্য</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-sm group-hover:scale-105 transition-transform flex-shrink-0 border border-emerald-300">
              <Image
                src="/images/logo.jpg"
                alt="Dying Field Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-extrabold text-gray-900 leading-none block tracking-tight group-hover:text-emerald-700 transition-colors">
                Dying Field
              </span>
              <span className="text-3xs sm:text-xs text-emerald-600 font-bold tracking-wide block">
                BD Edu Books & HSC Routine
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 font-medium text-xs xl:text-sm">
            <Link
              href="/"
              className="px-3 py-2 text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
            >
              হোম
            </Link>

            <Link
              href="/textbooks"
              className="px-3 py-2 text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
            >
              পাঠ্যবই
            </Link>

            <Link
              href="/guide-books"
              className="px-3 py-2 text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
            >
              গাইড বই
            </Link>

            <Link
              href="/blogs"
              className="px-3 py-2 text-emerald-800 font-bold hover:text-emerald-900 hover:bg-emerald-50 rounded-lg transition-colors"
            >
              ব্লগ ও শিক্ষা সংবাদ
            </Link>

            {/* HSC Routine Button */}
            <Link
              href="/hsc-exam-routine"
              className="px-3 py-1.5 font-bold text-red-900 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-200 flex items-center space-x-1.5 shadow-2xs"
            >
              <Calendar className="w-4 h-4 text-red-600" />
              <span>HSC রুটিন PDF</span>
            </Link>

            {/* College Admission Special Button */}
            <Link
              href="/college-admission"
              className="px-3 py-1.5 font-bold text-emerald-900 bg-emerald-100/80 hover:bg-emerald-200/80 rounded-lg transition-colors border border-emerald-300 flex items-center space-x-1.5"
            >
              <GraduationCap className="w-4 h-4 text-emerald-700" />
              <span>কলেজ ভর্তি</span>
            </Link>

            {/* All Colleges Directory Button */}
            <Link
              href="/colleges"
              className="px-3 py-1.5 font-bold text-blue-900 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200 flex items-center space-x-1.5"
            >
              <Building2 className="w-4 h-4 text-blue-700" />
              <span>সকল কলেজ</span>
            </Link>

            {/* Class Dropdown */}
            <div className="relative">
              <button
                onClick={() => setClassDropdownOpen(!classDropdownOpen)}
                onMouseEnter={() => setClassDropdownOpen(true)}
                className="px-3 py-2 text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg flex items-center space-x-1 transition-colors"
              >
                <span>শ্রেণি</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {classDropdownOpen && (
                <div
                  className="absolute right-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 grid grid-cols-1 gap-0.5"
                  onMouseLeave={() => setClassDropdownOpen(false)}
                >
                  {CLASSES_LIST.map((cls) => (
                    <Link
                      key={cls.slug}
                      href={`/class/${cls.slug}`}
                      className="px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-emerald-50 hover:text-emerald-800 flex justify-between items-center transition-colors"
                      onClick={() => setClassDropdownOpen(false)}
                    >
                      <span>{cls.bnName}</span>
                      <span className="text-3xs text-gray-400 font-mono">{cls.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Quick Search & Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            <Link
              href="/search"
              className="p-2 text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-full transition-colors flex items-center space-x-1.5 text-xs font-semibold"
              title="বই বা রুটিন খুঁজুন"
            >
              <Search className="w-5 h-5" />
              <span className="hidden sm:inline">খুঁজুন</span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-emerald-700 hover:bg-gray-100 rounded-lg focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-red-600" /> : <Menu className="w-6 h-6 text-emerald-800" />}
            </button>
          </div>
        </div>
      </div>

      {/* News Ticker Auto-Scrolling Marquee Quick Navigation Bar */}
      <div className="bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-900 border-y border-emerald-900/50 py-2.5 px-4 shadow-inner overflow-hidden relative">
        <div className="max-w-7xl mx-auto flex items-center space-x-3">
          <div className="inline-flex items-center space-x-1.5 bg-gradient-to-r from-red-600 to-rose-600 text-white font-extrabold text-2xs px-3 py-1 rounded-md tracking-wide uppercase flex-shrink-0 shadow-md z-10">
            <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300 animate-bounce" />
            <span>জরুরি আপডেট:</span>
          </div>

          <div className="news-ticker-container overflow-hidden whitespace-nowrap relative flex-1">
            <div className="animate-news-marquee space-x-4">
              {tickerItems}
              {tickerItems}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-6 space-y-4 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="space-y-2">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-2.5 px-3.5 py-2.5 text-sm font-bold text-gray-800 bg-gray-50 rounded-xl hover:bg-emerald-50"
            >
              <Home className="w-4 h-4 text-emerald-600" />
              <span>হোম পেজ</span>
            </Link>

            <Link
              href="/hsc-exam-routine"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-2.5 px-3.5 py-2.5 text-sm font-extrabold text-red-950 bg-red-100/90 rounded-xl border border-red-300 shadow-2xs"
            >
              <Calendar className="w-5 h-5 text-red-600" />
              <span>এইচএসসি পরীক্ষা সময়সূচি ও রুটিন PDF</span>
            </Link>

            <Link
              href="/college-admission"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-2.5 px-3.5 py-2.5 text-sm font-extrabold text-emerald-950 bg-emerald-100/90 rounded-xl border border-emerald-300"
            >
              <GraduationCap className="w-5 h-5 text-emerald-700" />
              <span>একাদশ শ্রেণি ভর্তি ২০২৬ নির্দেশিকা</span>
            </Link>

            <Link
              href="/colleges"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-2.5 px-3.5 py-2.5 text-sm font-extrabold text-blue-950 bg-blue-50 rounded-xl border border-blue-200"
            >
              <Building2 className="w-5 h-5 text-blue-700" />
              <span>বাংলাদেশের সকল কলেজ ডিরেক্টরি</span>
            </Link>
          </div>

          <div className="pt-2 border-t border-gray-100 space-y-2">
            <span className="block px-1 text-2xs font-extrabold text-gray-400 uppercase tracking-wider">
              বইয়ের ধরন (Book Types)
            </span>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/textbooks"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 text-xs font-bold text-gray-800 bg-gray-50 hover:bg-emerald-50 rounded-lg text-center border border-gray-200"
              >
                এনসিটিবি পাঠ্যবই
              </Link>
              <Link
                href="/guide-books"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 text-xs font-bold text-gray-800 bg-gray-50 hover:bg-emerald-50 rounded-lg text-center border border-gray-200"
              >
                গাইড ও সমাধান বই
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
