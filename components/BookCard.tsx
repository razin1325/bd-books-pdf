'use client';

import React from 'react';
import Link from 'next/link';
import { Book } from '@/lib/types';
import { getAdmissionBookHref } from '@/lib/admission';
import { Download, ExternalLink } from 'lucide-react';
import BookCover from '@/components/BookCover';

interface BookCardProps {
  book: Book;
  priority?: boolean;
}

export default function BookCard({ book, priority = false }: BookCardProps) {
  const bookHref = getAdmissionBookHref(book);
  const displayClass = book.class_name ? book.class_name.replace(/^class\s+/i, 'Class ') : '';

  return (
    <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group h-full hover:border-emerald-500 hover:-translate-y-1 relative cursor-pointer">
      {/* 100% Card Link Stretch Overlay (z-10) */}
      <Link
        href={bookHref}
        className="absolute inset-0 z-10"
        aria-label={book.title}
      />

      {/* Cover Image Container (300x300 aspect ratio) */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        <BookCover
          title={book.title}
          coverImage={book.cover_image}
          subject={book.subject}
          bookType={book.book_type}
          year={book.year}
          priority={priority}
          showBadges={true}
        />
      </div>

      {/* Content Container */}
      <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-2">
          {/* Subject & Class Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-1.5 text-xs font-bold">
            <span className="bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-md border border-emerald-200/80 shadow-2xs">
              {book.subject}
            </span>
            {displayClass && (
              <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md font-semibold text-2xs">
                {displayClass}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-extrabold text-gray-900 text-sm sm:text-base group-hover:text-emerald-600 transition-colors leading-relaxed">
            {book.title}
          </h3>
        </div>

        {/* Action Button Bar */}
        <div className="pt-3 border-t border-gray-100 flex items-center gap-2">
          <span className="flex-1 text-center py-2.5 px-3 bg-emerald-600 group-hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center space-x-1.5 shadow-sm group-hover:shadow">
            <span>অনলাইনে পড়ুন / PDF</span>
            <ExternalLink className="w-4 h-4 flex-shrink-0" />
          </span>

          {/* Direct Download Link (z-20 above overlay) */}
          <a
            href={book.pdf_url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 bg-gray-100 hover:bg-emerald-100 text-gray-700 hover:text-emerald-800 active:bg-emerald-200 rounded-xl transition-colors flex-shrink-0 relative z-20 pointer-events-auto"
            title="ডাউনলোড ডিরেক্ট PDF"
          >
            <Download className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
