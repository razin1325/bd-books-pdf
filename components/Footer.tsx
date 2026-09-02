import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen } from 'lucide-react';
import { CLASSES_LIST } from '@/lib/types';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="relative w-9 h-9 rounded-lg overflow-hidden shadow-sm flex-shrink-0 border border-emerald-500/40">
                <Image
                  src="/images/logo.jpg"
                  alt="Dying Field Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Dying Field
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              বাংলাদেশের সকল শ্রেণির এনসিটিবি (NCTB) পাঠ্যবই, গাইড বই এবং সমাধান PDF বিনামূল্যে পড়ার ও ডাউনলোড করার দ্রুততম ডিজিটাল প্ল্যাটফর্ম।
            </p>
            <div className="text-xs text-gray-500">
              শিক্ষা সমৃদ্ধ বাংলাদেশ গড়ে তুলতে আমরা প্রতিশ্রুতিবদ্ধ।
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">
                  Home (হোম)
                </Link>
              </li>
              <li>
                <Link href="/books" className="hover:text-emerald-400 transition-colors">
                  All Books
                </Link>
              </li>
              <li>
                <Link href="/textbooks" className="hover:text-emerald-400 transition-colors">
                  Text Books (পাঠ্যবই)
                </Link>
              </li>
              <li>
                <Link href="/guide-books" className="hover:text-emerald-400 transition-colors">
                  Guide Books (গাইড বই)
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-emerald-400 transition-colors">
                  Search Books
                </Link>
              </li>
              <li>
                <Link href="/college-admission" className="hover:text-emerald-400 font-bold text-amber-300 transition-colors">
                  College Admission 2026 (কলেজ ভর্তি)
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="hover:text-emerald-400 transition-colors">
                  HTML Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Classes */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Classes (শ্রেণি)
            </h3>
            <ul className="grid grid-cols-2 gap-x-2 gap-y-2 text-sm">
              {CLASSES_LIST.map(cls => (
                <li key={cls.slug}>
                  <Link
                    href={`/class/${cls.slug}`}
                    className="hover:text-emerald-400 transition-colors"
                  >
                    {cls.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Info */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Information & Legal
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-emerald-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-emerald-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-emerald-400 transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-gray-800 text-center text-xs text-gray-500 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div>
            &copy; 2026 শিক্ষা বইমেলা (BD Edu PDF). All rights reserved.
          </div>
          <div className="text-gray-400">
            Fast, Lightweight & SEO Optimized Educational Portal for Bangladesh.
          </div>
        </div>
      </div>
    </footer>
  );
}
