import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import type { CategoryPost } from '@/lib/categories-data';

export default function CategoryCard({ post }: { post: CategoryPost }) {
  return (
    <Link
      href={`/category/${post.categorySlug}/${encodeURIComponent(post.slug)}`}
      className="group bg-white rounded-2xl border border-gray-200 hover:border-emerald-500 hover:shadow-md transition-all overflow-hidden flex flex-col"
    >
      <div className="relative w-full h-40 bg-emerald-50 overflow-hidden">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            unoptimized
          />
        ) : null}
      </div>

      <div className="p-4 flex flex-col flex-1 space-y-2">
        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 w-fit">
          {post.category}
        </span>
        <h3 className="font-bold text-gray-900 group-hover:text-emerald-700 text-sm leading-snug line-clamp-2 min-h-[2.5rem]">
          {post.title}
        </h3>
        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{post.excerpt}</p>
        <div className="flex items-center justify-between pt-1 mt-auto text-xs text-emerald-700 font-semibold">
          <span>বিস্তারিত দেখুন</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
