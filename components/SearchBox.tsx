'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, BookOpen, ArrowRight, X, Newspaper, Sparkles } from 'lucide-react';
import { MOCK_BOOKS } from '@/lib/data';
import { Book } from '@/lib/types';
import { BLOG_POSTS_DATA } from '@/lib/blogs';
import { getAdmissionBookHref } from '@/lib/admission';
import BookCover from '@/components/BookCover';

interface SearchBoxProps {
  initialQuery?: string;
  defaultQuery?: string;
  placeholder?: string;
  className?: string;
}

function normalize(text: string): string {
  if (!text) return '';
  let str = text.toLowerCase().trim();
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  const enDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  for (let i = 0; i < 10; i++) {
    str = str.replaceAll(bnDigits[i], enDigits[i]);
  }
  str = str.replace(/অষ্টম/g, 'class 8 8th 8');
  str = str.replace(/সপ্তম/g, 'class 7 7th 7');
  str = str.replace(/ষষ্ঠ/g, 'class 6 6th 6');
  str = str.replace(/পঞ্চম/g, 'class 5 5th 5');
  str = str.replace(/চতুর্থ/g, 'class 4 4th 4');
  str = str.replace(/তৃতীয়/g, 'class 3 3rd 3');
  str = str.replace(/দ্বিতীয়/g, 'class 2 2nd 2');
  str = str.replace(/প্রথম/g, 'class 1 1st 1');
  str = str.replace(/নবম|দশম/g, 'class 9 10 9-10 ssc');
  str = str.replace(/একাদশ|দ্বাদশ/g, 'class 11 12 11-12 hsc');
  return str;
}

export default function SearchBox({
  initialQuery = '',
  defaultQuery,
  placeholder = 'বই, গাইড, রুটিন বা বিষয় লিখে সার্চ করুন...',
  className = '',
}: SearchBoxProps) {
  const [query, setQuery] = useState(defaultQuery || initialQuery);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
  };

  // Filter matching books & blog posts in real-time
  const q = query.trim();
  const normQ = normalize(q);
  const words = normQ.split(/\s+/).filter((w) => w.length > 0);

  const matchedBooks =
    q.length >= 2
      ? MOCK_BOOKS.filter((b: Book) => {
          if (!b.is_published) return false;
          const target = normalize(`${b.title} ${b.subject} ${b.class_name} ${b.description}`);
          return words.every((w) => target.includes(w));
        }).slice(0, 5)
      : [];

  const matchedBlogs =
    q.length >= 2
      ? BLOG_POSTS_DATA.filter((p) => {
          const target = normalize(`${p.title} ${p.category} ${p.excerpt}`);
          return words.every((w) => target.includes(w));
        }).slice(0, 3)
      : [];

  const hasSuggestions = matchedBooks.length > 0 || matchedBlogs.length > 0;

  return (
    <div ref={containerRef} className={`w-full relative z-40 ${className}`}>
      <form onSubmit={handleSearchSubmit} className="w-full relative">
        <div className="relative flex items-center">
          <input
            type="text"
            value={query}
            onFocus={() => setIsOpen(true)}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            placeholder={placeholder}
            className="w-full py-3.5 pl-4 pr-20 text-sm sm:text-base text-gray-900 bg-white border-2 border-gray-300 rounded-xl shadow-xs focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder:text-gray-400 font-bold"
          />

          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-12 p-1.5 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
              title="Clear text"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            type="submit"
            className="absolute right-2 p-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-lg transition-colors flex items-center justify-center cursor-pointer shadow-2xs"
            title="সার্চ করুন"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </form>

      {/* Live Auto-Suggest Instant Dropdown */}
      {isOpen && q.length >= 2 && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-in fade-in-50 slide-in-from-top-2 duration-150">
          {hasSuggestions ? (
            <div className="divide-y divide-gray-100">
              {/* Books Suggestions */}
              {matchedBooks.length > 0 && (
                <div className="p-3 space-y-2">
                  <div className="flex items-center space-x-1 text-2xs font-extrabold uppercase text-emerald-800 tracking-wider">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                    <span>উপলব্ধ পাঠ্যবই ও গাইড বইসমূহ ({matchedBooks.length})</span>
                  </div>

                  <div className="space-y-1">
                    {matchedBooks.map((book: Book) => (
                      <Link
                        key={book.id}
                        href={getAdmissionBookHref(book)}
                        onClick={() => setIsOpen(false)}
                        className="p-2 hover:bg-emerald-50 rounded-xl transition-colors flex items-center space-x-3 group"
                      >
                        <div className="w-8 h-11 bg-gray-100 rounded overflow-hidden flex-shrink-0 relative shadow-2xs border border-gray-200">
                          <BookCover
                            title={book.title}
                            coverImage={book.cover_image}
                            subject={book.subject}
                            bookType={book.book_type}
                            showBadges={false}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-emerald-700 truncate leading-tight">
                            {book.title}
                          </h4>
                          <span className="text-[10px] text-gray-500 font-semibold block truncate">
                            {book.class_name} • {book.subject}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Blogs Suggestions */}
              {matchedBlogs.length > 0 && (
                <div className="p-3 space-y-2 bg-purple-50/30">
                  <div className="flex items-center space-x-1 text-2xs font-extrabold uppercase text-purple-900 tracking-wider">
                    <Newspaper className="w-3.5 h-3.5 text-purple-700" />
                    <span>শিক্ষা ব্লগ ও ফলাফল আপডেট ({matchedBlogs.length})</span>
                  </div>

                  <div className="space-y-1">
                    {matchedBlogs.map((blog) => (
                      <Link
                        key={blog.id}
                        href={`/blogs/${blog.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="p-2 hover:bg-purple-100/60 rounded-xl transition-colors flex items-center justify-between group"
                      >
                        <div className="flex-1 min-w-0 pr-2">
                          <h4 className="text-xs font-bold text-gray-900 group-hover:text-purple-800 truncate">
                            {blog.title}
                          </h4>
                          <span className="text-[10px] text-purple-700 font-semibold">
                            {blog.category}
                          </span>
                        </div>
                        <Sparkles className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* View All Button */}
              <button
                type="button"
                onClick={handleSearchSubmit}
                className="w-full p-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm text-center flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
              >
                <span>&ldquo;{query}&rdquo; এর সকল ফলাফল দেখুন</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="p-5 text-center space-y-1">
              <p className="text-xs font-bold text-gray-700">
                &ldquo;{query}&rdquo; নাম দিয়ে সরাসরি কোনো ফলাফল পাওয়া যায়নি।
              </p>
              <p className="text-[11px] text-gray-400">
                অন্যভাবে অথবা বিষয়ের নাম লিখে সার্চ বাটনে চাপুন।
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
