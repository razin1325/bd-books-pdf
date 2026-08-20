'use client';

import React, { useState } from 'react';
import { Book } from '@/lib/types';
import BookCard from '@/components/BookCard';
import { ChevronDown } from 'lucide-react';

interface ExpandableBookGridProps {
  books: Book[];
  initialCount?: number;
  step?: number;
}

export default function ExpandableBookGrid({
  books,
  initialCount = 5,
  step = 5,
}: ExpandableBookGridProps) {
  const [visibleCount, setVisibleCount] = useState(initialCount);

  if (!books || books.length === 0) return null;

  const visibleBooks = books.slice(0, visibleCount);
  const hasMore = visibleCount < books.length;
  const remaining = books.length - visibleCount;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {visibleBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {hasMore && (
        <div className="text-center pt-2">
          <button
            onClick={() => setVisibleCount((prev) => prev + step)}
            className="inline-flex items-center space-x-2 bg-white hover:bg-emerald-50 border border-gray-300 hover:border-emerald-500 text-gray-700 hover:text-emerald-700 font-semibold px-6 py-2.5 rounded-full shadow-xs hover:shadow-md transition-all text-sm group"
          >
            <span>আরও {Math.min(step, remaining)}টি দেখুন</span>
            <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-emerald-600 transition-transform group-hover:translate-y-0.5" />
          </button>
        </div>
      )}
    </div>
  );
}
