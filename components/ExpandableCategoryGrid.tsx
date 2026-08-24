'use client';

import React, { useState } from 'react';
import type { CategoryPost } from '@/lib/categories-data';
import CategoryCard from '@/components/CategoryCard';
import { ChevronDown } from 'lucide-react';

interface Props {
  posts: CategoryPost[];
  initialCount?: number;
  step?: number;
}

export default function ExpandableCategoryGrid({ posts, initialCount = 12, step = 12 }: Props) {
  const [visibleCount, setVisibleCount] = useState(initialCount);

  if (!posts || posts.length === 0) return null;

  const visible = posts.slice(0, visibleCount);
  const hasMore = visibleCount < posts.length;
  const remaining = posts.length - visibleCount;
  const nextLoad = Math.min(step, remaining);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {visible.map((post) => (
          <CategoryCard key={post.id} post={post} />
        ))}
      </div>

      {hasMore && (
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => setVisibleCount((c) => Math.min(c + step, posts.length))}
            className="inline-flex items-center space-x-2 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl font-extrabold text-sm shadow-md hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer border border-emerald-500/30 group"
          >
            <span>আরও দেখুন ({nextLoad}টি)</span>
            <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
          <p className="text-xs text-gray-500 mt-2">
            {visibleCount} / {posts.length} দেখানো হচ্ছে
          </p>
        </div>
      )}
    </div>
  );
}
