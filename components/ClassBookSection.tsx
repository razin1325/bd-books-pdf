'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Book } from '@/lib/types';
import BookCard from '@/components/BookCard';
import { BookOpen, ChevronRight, ChevronDown } from 'lucide-react';

interface ClassBookSectionProps {
  classSlug: string;
  className: string;
  bnName: string;
  books: Book[];
  themeColor?: 'blue' | 'emerald' | 'purple' | 'amber';
}

export default function ClassBookSection({
  classSlug,
  className,
  bnName,
  books,
  themeColor = 'blue',
}: ClassBookSectionProps) {
  const [visibleCount, setVisibleCount] = useState(5);

  if (books.length === 0) return null;

  const visibleBooks = books.slice(0, visibleCount);
  const hasMore = visibleCount < books.length;
  const remainingCount = books.length - visibleCount;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  const themeClasses = {
    blue: {
      border: 'border-2 border-blue-100',
      iconBg: 'bg-blue-100 text-blue-800',
      btnBg: 'bg-blue-600 hover:bg-blue-700 text-white',
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100',
    },
    emerald: {
      border: 'border-2 border-emerald-100',
      iconBg: 'bg-emerald-100 text-emerald-800',
      btnBg: 'bg-emerald-600 hover:bg-emerald-700 text-white',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100',
    },
    purple: {
      border: 'border-2 border-purple-100',
      iconBg: 'bg-purple-100 text-purple-800',
      btnBg: 'bg-purple-600 hover:bg-purple-700 text-white',
      badgeBg: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100',
    },
    amber: {
      border: 'border-2 border-amber-100',
      iconBg: 'bg-amber-100 text-amber-800',
      btnBg: 'bg-amber-600 hover:bg-amber-700 text-white',
      badgeBg: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100',
    },
  }[themeColor];

  return (
    <section className={`bg-white rounded-2xl p-5 sm:p-7 shadow-xs space-y-5 ${themeClasses.border}`}>
      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
        <div className="flex items-center space-x-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${themeClasses.iconBg}`}>
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-gray-900">
              {bnName} পাঠ্যবই ({className})
            </h2>
            <p className="text-xs text-gray-500 font-medium">
              মোট {books.length}টি বোর্ড পাঠ্যবই উপলব্ধ
            </p>
          </div>
        </div>

        <Link
          href={`/class/${classSlug}`}
          className={`inline-flex items-center space-x-1 text-xs font-extrabold px-3 py-1.5 rounded-lg border transition-colors ${themeClasses.badgeBg}`}
        >
          <span>সকল {bnName} বই</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Grid showing visible books */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {visibleBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {/* Incremental "Load More 5 Books" Button */}
      {hasMore ? (
        <div className="pt-3 text-center border-t border-gray-100">
          <button
            type="button"
            onClick={handleLoadMore}
            className={`inline-flex items-center space-x-2 px-7 py-3 rounded-xl font-extrabold text-sm shadow-md hover:shadow-lg transition-all hover:scale-102 cursor-pointer group ${themeClasses.btnBg}`}
          >
            <span>আরও বই দেখুন</span>
            <ChevronDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      ) : (
        books.length > 5 && (
          <div className="pt-3 text-center border-t border-gray-100">
            <Link
              href={`/class/${classSlug}`}
              className="inline-flex items-center space-x-2 text-xs font-extrabold text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl transition-colors"
            >
              <span>সকল {bnName} বইয়ের জন্য ডেডিকেটেড পেজে যান</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        )
      )}
    </section>
  );
}
