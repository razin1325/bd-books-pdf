import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import type { CategoryPost } from '@/lib/categories-data';
import { generateBabyNameSvgImage, generateBookSvgImage } from '@/lib/svg-generator';

export default function CategoryCard({ post }: { post: CategoryPost }) {
  const isExternalImage = Boolean(
    post.image &&
    (post.image.includes('blogger') ||
     post.image.includes('educationblog24') ||
     post.image.includes('blogspot'))
  );

  const displayImage =
    (!isExternalImage && post.image) ||
    (post.categorySlug === 'baby-boy-girl-name'
      ? generateBabyNameSvgImage(post.title, post.category)
      : generateBookSvgImage(post.title, post.category));

  const targetHref = post.link || `/category/${post.categorySlug}/${encodeURIComponent(post.slug)}`;

  return (
    <Link
      href={targetHref}
      className="group bg-white rounded-2xl border border-gray-200 hover:border-pink-500 hover:shadow-md transition-all overflow-hidden flex flex-col"
    >
      <div className="relative w-full h-44 bg-slate-900 overflow-hidden">
        {displayImage ? (
          <Image
            src={displayImage}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            unoptimized
          />
        ) : null}
      </div>

      <div className="p-4 flex flex-col flex-1 space-y-2">
        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-pink-50 text-pink-700 border border-pink-200 w-fit">
          {post.category}
        </span>
        <h3 className="font-bold text-gray-900 group-hover:text-pink-700 text-sm leading-snug line-clamp-2 min-h-[2.5rem]">
          {post.title}
        </h3>
        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{post.excerpt}</p>
        <div className="flex items-center justify-between pt-1 mt-auto text-xs text-pink-700 font-semibold">
          <span>বিস্তারিত দেখুন</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
