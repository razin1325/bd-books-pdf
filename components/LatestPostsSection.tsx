'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BLOG_POSTS_DATA } from '@/lib/blogs';
import BookCover from '@/components/BookCover';
import { Sparkles, ChevronDown, ArrowRight, Clock, Tag } from 'lucide-react';

export default function LatestPostsSection() {
  const [visibleCount, setVisibleCount] = useState(6);

  const visiblePosts = BLOG_POSTS_DATA.slice(0, visibleCount);
  const hasMore = visibleCount < BLOG_POSTS_DATA.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, BLOG_POSTS_DATA.length));
  };

  return (
    <section className="space-y-5 bg-gradient-to-br from-slate-900 via-slate-950 to-teal-950 text-white p-5 sm:p-7 rounded-2xl shadow-xl border border-emerald-500/20 relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 flex items-center justify-center font-bold shadow-xs">
            <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Latest Posts (সর্বশেষ শিক্ষা সংবাদ ও ব্লগ পোস্ট)
              </h2>
              <span className="bg-emerald-500 text-white text-[10px] sm:text-xs font-extrabold px-2.5 py-0.5 rounded-full shadow-2xs">
                {BLOG_POSTS_DATA.length} Posts
              </span>
            </div>
            <p className="text-2xs sm:text-xs text-emerald-200/80 font-medium">
              এসএসসি রেজাল্ট, একাদশ শ্রেণি ভর্তি, ভাতা আবেদন ও এনআইডি সেবা সম্পর্কিত পূর্ণাঙ্গ পোস্ট
            </p>
          </div>
        </div>

        <Link
          href="/blogs"
          className="text-xs sm:text-sm font-bold text-amber-300 hover:text-amber-200 flex items-center space-x-1 transition-colors"
        >
          <span>সব ব্লগ দেখুন</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Grid displaying Blog Cards with Dynamic Auto Text Covers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 relative z-10">
        {visiblePosts.map((post) => (
          <Link
            key={post.id}
            href={`/blogs/${post.slug}`}
            className="group bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 hover:border-emerald-400/50 transition-all duration-300 flex flex-col justify-between overflow-hidden hover:shadow-2xl hover:-translate-y-1"
          >
            {/* Auto Generated Text Cover Top Image Banner */}
            <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-slate-950">
              <BookCover
                title={post.title}
                subject={post.category}
                bookType={post.tags[0] || 'শিক্ষা'}
                showBadges={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-2.5 left-2.5 z-10">
                <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-500/90 text-white shadow-xs backdrop-blur-md">
                  {post.category}
                </span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-1 text-[10px] text-emerald-400 font-bold">
                  <Tag className="w-3 h-3 text-emerald-400" />
                  <span>{post.tags[0] || 'শিক্ষা'}</span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-xs text-gray-300/80 leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
              </div>

              {/* Footer info */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400">
                <div className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-400/80" />
                  <span>{post.date}</span>
                </div>
                <span className="text-emerald-400 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center space-x-1">
                  <span>পড়ুন</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="pt-2 text-center relative z-10 border-t border-white/10">
          <button
            type="button"
            onClick={handleLoadMore}
            className="inline-flex items-center space-x-2 px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-extrabold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all hover:scale-102 cursor-pointer border border-emerald-400/30 group"
          >
            <span>আরও দেখুন</span>
            <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      )}
    </section>
  );
}
