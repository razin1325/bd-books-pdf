import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import AdSlot from '@/components/AdSlot';
import { BLOG_POSTS_DATA, BLOG_CATEGORIES } from '@/lib/blogs';
import ExpandableBlogGrid from '@/components/ExpandableBlogGrid';
import { Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'শিক্ষা সংবাদ, রেজাল্ট ও সরকারি ভাতা ব্লগ ২০২৬ | BD Edu PDF Blog',
  description:
    'এসএসসি রেজাল্ট, একাদশ শ্রেণি ভর্তি, কলেজ কাট মার্কস, প্রতিবন্ধী ও বয়স্ক ভাতা অনলাইন আবেদন, প্রাইজবন্ড ড্র রেজাল্ট ও এনআইডি কার্ড ডাউনলোডের সকল অফিশিয়াল ব্লগ নির্দেশিকা।',
  openGraph: {
    title: 'শিক্ষা সংবাদ, রেজাল্ট ও সরকারি ভাতা ব্লগ ২০২৬ | BD Edu PDF Blog',
    description:
      'এসএসসি রেজাল্ট, একাদশ শ্রেণি ভর্তি, কলেজ কাট মার্কস, প্রতিবন্ধী ও বয়স্ক ভাতা অনলাইন আবেদন ও এনআইডি সেবা সম্পর্কিত পূর্ণাঙ্গ ব্লগ।',
  },
};

interface BlogsPageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const { category = 'all' } = await searchParams;

  const filteredPosts =
    category === 'all'
      ? BLOG_POSTS_DATA
      : BLOG_POSTS_DATA.filter((p) => p.categorySlug === category);

  return (
    <div className="space-y-8 pb-8">
      <Breadcrumb items={[{ label: 'শিক্ষা ও সরকারি সেবা ব্লগ' }]} />

      {/* Header Hero */}
      <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-teal-950 text-white p-6 sm:p-10 rounded-2xl shadow-xl space-y-4 border border-emerald-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center space-x-2 bg-emerald-600/30 backdrop-blur-sm border border-emerald-500/30 px-3.5 py-1 rounded-full text-xs font-semibold text-emerald-200 w-fit">
          <Sparkles className="w-4 h-4 text-emerald-300 animate-pulse" />
          <span>শিক্ষা সংবাদ, ভর্তি ও নাগরিক সেবা ব্লগ</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
          শিক্ষা সংবাদ, বোর্ড রেজাল্ট ও সরকারি সেবা নির্দেশিকা ব্লগ ২০২৬
        </h1>
        <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-3xl">
          এসএসসি ও এইচএসসি রেজাল্ট, একাদশ শ্রেণি ভর্তি সার্কুলার, সরকারি বয়স্ক ও প্রতিবন্ধী ভাতা অনলাইন আবেদন, প্রাইজবন্ড ড্র রেজাল্ট এবং স্মার্ট এনআইডি ডাউনলোডের সকল অফিশিয়াল টিউটোরিয়াল।
        </p>
      </div>

      <AdSlot slotId="blogs-page-top" format="horizontal" />

      {/* Category Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {BLOG_CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={cat.slug === 'all' ? '/blogs' : `/blogs?category=${cat.slug}`}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border ${
              category === cat.slug
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                : 'bg-white text-gray-700 hover:bg-emerald-50 border-gray-200 hover:border-emerald-300'
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* Blog Cards Grid with 5-at-a-time Expand Button */}
      {filteredPosts.length > 0 ? (
        <ExpandableBlogGrid posts={filteredPosts} initialCount={5} step={5} />
      ) : (
        <div className="bg-amber-50 border border-amber-200 p-8 rounded-2xl text-center space-y-3">
          <p className="text-base font-bold text-amber-900">
            এই ক্যাটাগরিতে বর্তমানে কোনো পোস্ট নেই।
          </p>
        </div>
      )}
    </div>
  );
}
