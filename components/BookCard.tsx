import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Book } from '@/lib/types';
import { BookOpen, Download, ExternalLink } from 'lucide-react';

interface BookCardProps {
  book: Book;
  priority?: boolean;
}

export default function BookCard({ book, priority = false }: BookCardProps) {
  const isGuide = book.book_type === 'guide';
  const isTextbook = book.book_type === 'textbook';

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-2xs hover:shadow-md transition-all overflow-hidden flex flex-col group h-full hover:border-emerald-500">
      {/* Cover Image Container */}
      <div className="relative aspect-3/4 bg-gray-100 overflow-hidden">
        {book.cover_image ? (
          <Image
            src={book.cover_image}
            alt={book.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            priority={priority}
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 p-3 text-center bg-gradient-to-br from-emerald-50 to-teal-100">
            <BookOpen className="w-8 h-8 sm:w-12 sm:h-12 text-emerald-600 mb-1" />
            <span className="text-3xs sm:text-xs font-semibold text-gray-600 line-clamp-2">{book.title}</span>
          </div>
        )}

        {/* Badges Overlay */}
        <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 flex flex-wrap gap-1">
          <span
            className={`text-3xs sm:text-2xs font-extrabold px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded uppercase tracking-wider text-white shadow-xs ${
              isTextbook
                ? 'bg-blue-600'
                : isGuide
                ? 'bg-emerald-600'
                : 'bg-purple-600'
            }`}
          >
            {book.book_type}
          </span>
          <span className="text-3xs sm:text-2xs font-bold bg-black/70 backdrop-blur-xs text-white px-1.5 py-0.5 rounded">
            {book.year}
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-2.5 sm:p-4 flex-1 flex flex-col justify-between space-y-2 sm:space-y-3">
        <div>
          {/* Class & Subject Badges */}
          <div className="flex items-center space-x-1.5 text-3xs sm:text-xs font-semibold text-emerald-700 mb-1 truncate">
            <span className="truncate">{book.class_name}</span>
            <span>•</span>
            <span className="text-gray-600 truncate">{book.subject}</span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-gray-900 text-xs sm:text-sm line-clamp-2 group-hover:text-emerald-600 transition-colors leading-snug">
            <Link href={`/${book.class_slug}/${book.slug}`}>
              {book.title}
            </Link>
          </h3>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-t border-gray-100 flex items-center gap-1.5">
          <Link
            href={`/${book.class_slug}/${book.slug}`}
            className="flex-1 text-center py-2 px-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold text-3xs sm:text-xs rounded-lg transition-colors flex items-center justify-center space-x-1 shadow-2xs"
          >
            <span>View PDF</span>
            <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
          </Link>
          <a
            href={book.pdf_url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-gray-100 hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 active:bg-emerald-100 rounded-lg transition-colors flex-shrink-0"
            title="Download PDF directly"
          >
            <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
