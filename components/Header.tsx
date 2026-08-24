

'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Search, Menu, X, ChevronDown, GraduationCap, Sparkles, Building2, Calendar, Home, Zap } from 'lucide-react';
import { CLASSES_LIST } from '@/lib/types';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [classDropdownOpen, setClassDropdownOpen] = useState(false);
  const [scrolledPast, setScrolledPast] = useState(false);

  const scrolledRef = useRef(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > 50 && !scrolledRef.current) {
        scrolledRef.current = true;
        setScrolledPast(true);
      } else if (currentY <= 20 && scrolledRef.current) {
        scrolledRef.current = false;
        setScrolledPast(false);
      }
    };

    const throttled = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttled, { passive: true });
    return () => window.removeEventListener('scroll', throttled);
  }, []);

  const tickerItems = (
    <>
      <Link
        href="/hsc-exam-routine"
        className="px-3 py-0.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-full font-extrabold text-2xs shadow-sm flex items-center space-x-1 border border-red-400/40"
      >
        <Calendar className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
        <span>📅 এইচএসসি পরীক্ষা রুটিন PDF</span>
      </Link>

      <Link
        href="/college-admission"
        className="px-3 py-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-full font-extrabold text-2xs shadow-sm flex items-center space-x-1 border border-emerald-400/40"
      >
        <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
        <span>একাদশ ভর্তি ২০২৬</span>
      </Link>

      <Link
        href="/colleges"
        className="px-3 py-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-full font-extrabold text-2xs shadow-sm flex items-center space-x-1 border border-blue-400/40"
      >
        <Building2 className="w-3.5 h-3.5 text-amber-300" />
        <span>সকল কলেজ ডিরেক্টরি</span>
      </Link>

      <Link
        href="/college-admission/ndc"
        className="px-2.5 py-0.5 bg-white/10 hover:bg-emerald-600 hover:text-white text-emerald-100 rounded-full border border-white/15 font-bold text-2xs"
      >
        🎓 নটর ডেম কলেজ ভর্তি
      </Link>

      <Link
        href="/college-admission/holy-cross"
        className="px-2.5 py-0.5 bg-white/10 hover:bg-emerald-600 hover:text-white text-emerald-100 rounded-full border border-white/15 font-bold text-2xs"
      >
        👑 হলিক্রস কলেজ ভর্তি
      </Link>

      <Link
        href="/class/admission"
        className="px-2.5 py-0.5 bg-gradient-to-r from-amber-600 to-rose-600 text-white rounded-full font-bold text-2xs"
      >
        📚 বিশ্ববিদ্যালয় ভর্তি বই
      </Link>

      {CLASSES_LIST.map((cls) => (
        <Link
          key={cls.slug}
          href={`/class/${cls.slug}`}
          className="px-2.5 py-0.5 bg-white/10 hover:bg-emerald-600 hover:text-white text-emerald-100 rounded-full border border-white/15 font-semibold text-2xs"
        >
          {cls.bnName}
        </Link>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50">
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
        .header-collapsible {
          transform: translateY(0);
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
          opacity: 1;
          max-height: 200px;
        }
        .header-collapsible.collapsed {
          transform: translateY(-100%);
          opacity: 0;
          max-height: 0;
          pointer-events: none;
          overflow: hidden;
        }
      `}</style>

      {/* Collapsible section: Banner + Ticker — slides up on scroll */}
      <div className={`header-collapsible ${scrolledPast ? 'collapsed' : ''}`}>
        {/* Top Banner Notice */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white py-0.5 sm:py-1 px-2 sm:px-3 text-center font-medium flex items-center justify-center space-x-1 text-3xs sm:text-xs leading-tight">
          <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-300 animate-pulse flex-shrink-0" />
          <span className="truncate">🇧🇩 HSC রুটিন, পাঠ্যবই, গাইড বই ও ভর্তি তথ্য</span>
          <span className="hidden sm:inline">— এইচএসসি রুটিন ২০২৭, একাদশ শ্রেণি ভর্তি</span>
        </div>

        {/* News Ticker */}
        <div className="bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-900 border-y border-emerald-900/50 py-1.5 px-3 shadow-inner overflow-hidden relative">
          <div className="max-w-7xl mx-auto flex items-center space-x-2.5">
            <div className="inline-flex items-center space-x-1 bg-gradient-to-r from-red-600 to-rose-600 text-white font-extrabold text-3xs px-2 py-0.5 rounded tracking-wide uppercase flex-shrink-0 shadow-md z-10">
              <Zap className="w-3 h-3 text-amber-300 fill-amber-300 animate-bounce" />
              <span>আপডেট</span>
            </div>

            <div className="news-ticker-container overflow-hidden whitespace-nowrap relative flex-1">
              <div className="animate-news-marquee space-x-3">
                {tickerItems}
                {tickerItems}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation — always visible, compact */}
      <div className="bg-white border-b border-emerald-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-8">
          <div className="flex items-center justify-between h-11 sm:h-14">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative w-7 h-7 sm:w-9 sm:h-9 rounded-lg overflow-hidden shadow-sm group-hover:scale-105 transition-transform flex-shrink-0 border border-emerald-300">
                <Image
                  src="/images/logo.jpg"
                  alt="Dying Field Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div>
                <span className="text-sm sm:text-lg font-extrabold text-gray-900 leading-none block tracking-tight group-hover:text-emerald-700 transition-colors">
                  Dying Field
                </span>
                <span className="text-3xs sm:text-2xs text-emerald-600 font-bold tracking-wide block leading-tight">
                  BD Edu Books & HSC Routine
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-0.5 font-medium text-xs xl:text-sm">
              <Link
                href="/"
                className="px-2.5 py-1.5 text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
              >
                হোম
              </Link>

              <Link
                href="/textbooks"
                className="px-2.5 py-1.5 text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
              >
                পাঠ্যবই
              </Link>

              <Link
                href="/guide-books"
                className="px-2.5 py-1.5 text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
              >
                গাইড বই
              </Link>

              <Link
                href="/category/hsc-hand-note"
                className="px-2.5 py-1.5 text-emerald-800 font-bold hover:text-emerald-900 hover:bg-emerald-50 rounded-lg transition-colors"
              >
                HSC হ্যান্ড নোট
              </Link>

              <Link
                href="/blogs"
                className="px-2.5 py-1.5 text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
              >
                ব্লগ
              </Link>

              {/* HSC Routine Button */}
              <Link
                href="/hsc-exam-routine"
                className="px-2.5 py-1 font-bold text-red-900 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-200 flex items-center space-x-1 shadow-2xs text-xs"
              >
                <Calendar className="w-3.5 h-3.5 text-red-600" />
                <span>HSC রুটিন</span>
              </Link>

              {/* College Admission */}
              <Link
                href="/college-admission"
                className="px-2.5 py-1 font-bold text-emerald-900 bg-emerald-100/80 hover:bg-emerald-200/80 rounded-lg transition-colors border border-emerald-300 flex items-center space-x-1 text-xs"
              >
                <GraduationCap className="w-3.5 h-3.5 text-emerald-700" />
                <span>কলেজ ভর্তি</span>
              </Link>

              {/* All Colleges */}
              <Link
                href="/colleges"
                className="px-2.5 py-1 font-bold text-blue-900 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200 flex items-center space-x-1 text-xs"
              >
                <Building2 className="w-3.5 h-3.5 text-blue-700" />
                <span>সকল কলেজ</span>
              </Link>

              {/* Class Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setClassDropdownOpen(!classDropdownOpen)}
                  onMouseEnter={() => setClassDropdownOpen(true)}
                  className="px-2.5 py-1.5 text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg flex items-center space-x-1 transition-colors"
                >
                  <span>শ্রেণি</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {classDropdownOpen && (
                  <div
                    className="absolute right-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-50 grid grid-cols-1 gap-0.5"
                    onMouseLeave={() => setClassDropdownOpen(false)}
                  >
                    {CLASSES_LIST.map((cls) => (
                      <Link
                        key={cls.slug}
                        href={`/class/${cls.slug}`}
                        className="px-3.5 py-1.5 text-xs font-semibold text-gray-700 hover:bg-emerald-50 hover:text-emerald-800 flex justify-between items-center transition-colors"
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

            {/* Search & Mobile Menu Button */}
            <div className="flex items-center space-x-1">
              <Link
                href="/search"
                className="p-1.5 sm:p-2 text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-full transition-colors flex items-center space-x-1 text-xs font-semibold"
                title="বই বা রুটিন খুঁজুন"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">খুঁজুন</span>
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1.5 text-gray-700 hover:text-emerald-700 hover:bg-gray-100 rounded-lg focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-red-600" /> : <Menu className="w-5 h-5 text-emerald-800" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-3 pt-2 pb-4 space-y-2.5 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-1.5">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-1.5 px-2.5 py-2 text-xs font-bold text-gray-800 bg-gray-50 rounded-lg hover:bg-emerald-50"
            >
              <Home className="w-3.5 h-3.5 text-emerald-600" />
              <span>হোম পেজ</span>
            </Link>

            <Link
              href="/textbooks"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-1.5 px-2.5 py-2 text-xs font-bold text-gray-800 bg-gray-50 rounded-lg hover:bg-emerald-50"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
              <span>পাঠ্যবই</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-1.5">
            <Link
              href="/hsc-exam-routine"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-2 px-2.5 py-2 text-xs font-extrabold text-red-950 bg-red-50 rounded-lg border border-red-200"
            >
              <Calendar className="w-4 h-4 text-red-600" />
              <span>এইচএসসি পরীক্ষার রুটিন PDF</span>
            </Link>

            <Link
              href="/college-admission"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-2 px-2.5 py-2 text-xs font-extrabold text-emerald-950 bg-emerald-50 rounded-lg border border-emerald-200"
            >
              <GraduationCap className="w-4 h-4 text-emerald-700" />
              <span>একাদশ শ্রেণি ভর্তি ২০২৬</span>
            </Link>

            <Link
              href="/colleges"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-2 px-2.5 py-2 text-xs font-extrabold text-blue-950 bg-blue-50 rounded-lg border border-blue-200"
            >
              <Building2 className="w-4 h-4 text-blue-700" />
              <span>বাংলাদেশের সকল কলেজ</span>
            </Link>

            <Link
              href="/category/hsc-hand-note"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-2 px-2.5 py-2 text-xs font-extrabold text-emerald-950 bg-emerald-50 rounded-lg border border-emerald-200"
            >
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>HSC হ্যান্ড নোট</span>
            </Link>
          </div>

          <div className="pt-1.5 border-t border-gray-100">
            <span className="block px-1 text-3xs font-extrabold text-gray-400 uppercase tracking-wider mb-1.5">
              বইয়ের ধরন
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              <Link
                href="/guide-books"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-2xs font-bold text-gray-800 bg-gray-50 hover:bg-emerald-50 rounded-lg text-center border border-gray-200"
              >
                গাইড ও সমাধান বই
              </Link>
              <Link
                href="/blogs"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-2xs font-bold text-gray-800 bg-gray-50 hover:bg-emerald-50 rounded-lg text-center border border-gray-200"
              >
                ব্লগ ও শিক্ষা সংবাদ
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
