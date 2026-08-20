'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BlogPostItem } from '@/lib/blogs';
import BookCover from '@/components/BookCover';
import { Clock, Calendar, ArrowRight, ChevronDown } from 'lucide-react';

interface ExpandableBlogGridProps {
  posts: BlogPostItem[];
  initialCount?: number;
  step?: number;
}

export default function ExpandableBlogGrid({
  posts,
  initialCount = 5,
  step = 5,
}: ExpandableBlogGridProps) {
  const [visibleCount, setVisibleCount] = useState(initialCount);

  if (!posts || posts.length === 0) return null;

  const visiblePosts = posts.slice(0, visibleCount);
  const hasMore = visibleCount < posts.length;
  const remainingCount = posts.length - visibleCount;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + step, posts.length));
  };

  return (
    <div className="space-y-6">
      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {visiblePosts.map((post) => (
          <Link
            key={post.id}
            href={`/blogs/${post.slug}`}
            className="group bg-white rounded-2xl border border-gray-200 hover:border-emerald-500 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1 cursor-pointer"
          >
            {/* Auto Generated Text Cover Top Banner */}
            <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-slate-950">
              <BookCover
                title={post.title}
                subject={post.category}
                bookType={post.tags[0] || 'শিক্ষা'}
                showBadges={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-2.5 left-2.5 z-10">
                <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-600 text-white shadow-xs backdrop-blur-md">
                  {post.category}
                </span>
              </div>
            </div>

            {/* Post Content */}
            <div className="p-5 space-y-3.5 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-700">
                    #{post.tags[0] || 'শিক্ষা'}
                  </span>
                  <span className="text-[11px] text-gray-400 font-medium flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{post.readTime}</span>
                  </span>
                </div>

                <h2 className="text-base sm:text-lg font-extrabold text-gray-900 group-hover:text-emerald-700 transition-colors leading-snug line-clamp-2">
                  {post.title}
                </h2>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              {/* Footer */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  <span>{post.date}</span>
                </div>
                <span className="font-bold text-emerald-700 group-hover:translate-x-1 transition-transform inline-flex items-center space-x-1">
                  <span>বিস্তারিত পড়ুন</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Expand / View More Button (5 at a time) */}
      {hasMore && (
        <div className="pt-4 text-center">
          <button
            type="button"
            onClick={handleLoadMore}
            className="inline-flex items-center space-x-2 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl font-extrabold text-sm shadow-md hover:shadow-lg transition-all hover:scale-102 cursor-pointer border border-emerald-500/30 group"
          >
            <span>আরও ৫টি ব্লগ দেখুন ({remainingCount}টি নোটিশ বাকি)</span>
            <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
}
