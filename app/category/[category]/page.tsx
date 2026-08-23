import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import AdSlot from '@/components/AdSlot';
import CategoryCard from '@/components/CategoryCard';
import { getCategoryPosts, CATEGORY_LIST, type CategoryMeta } from '@/lib/categories-data';
import { Tags } from 'lucide-react';

interface RouteProps {
  params: Promise<{
    category: string;
  }>;
}

interface CategoryTheme {
  grad: string;
  chip: string;
  chipText: string;
  border: string;
}

const CATEGORY_THEMES: Record<string, CategoryTheme> = {
  'baby-boy-girl-name': {
    grad: 'from-rose-900 via-pink-900 to-purple-900',
    chip: 'bg-pink-600/30 border-pink-500/30',
    chipText: 'text-pink-200',
    border: 'border-pink-500/20',
  },
  'job-circular-news': {
    grad: 'from-blue-900 via-indigo-900 to-slate-900',
    chip: 'bg-blue-600/30 border-blue-500/30',
    chipText: 'text-blue-200',
    border: 'border-blue-500/20',
  },
};

const DEFAULT_THEME: CategoryTheme = {
  grad: 'from-emerald-900 via-teal-900 to-slate-900',
  chip: 'bg-emerald-600/30 border-emerald-500/30',
  chipText: 'text-emerald-200',
  border: 'border-emerald-500/20',
};

function getCategoryMeta(slug: string): CategoryMeta | undefined {
  return CATEGORY_LIST.find((c) => c.slug === slug);
}

export function generateStaticParams() {
  return CATEGORY_LIST.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { category } = await params;
  const meta = getCategoryMeta(category);

  if (!meta) {
    return { title: 'Category Not Found | BD Edu PDF' };
  }

  return {
    title: `${meta.name} (${meta.bnName}) | BD Edu PDF`,
    description: meta.description,
    openGraph: {
      title: `${meta.name} (${meta.bnName}) | BD Edu PDF`,
      description: meta.description,
    },
  };
}

export default async function CategoryListingPage({ params }: RouteProps) {
  const { category } = await params;
  const meta = getCategoryMeta(category);

  if (!meta) {
    notFound();
  }

  const posts = getCategoryPosts(category);
  const theme = CATEGORY_THEMES[category] ?? DEFAULT_THEME;

  return (
    <div className="space-y-8 pb-8">
      <Breadcrumb items={[{ label: 'Category' }, { label: meta.name }]} />

      {/* Hero */}
      <div
        className={`bg-gradient-to-br ${theme.grad} text-white p-6 sm:p-10 rounded-2xl shadow-xl space-y-4 border relative overflow-hidden`}
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div
          className={`flex items-center space-x-2 ${theme.chip} backdrop-blur-sm border px-3.5 py-1 rounded-full text-xs font-semibold ${theme.chipText} w-fit`}
        >
          <Tags className="w-4 h-4 animate-pulse" />
          <span>Category</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
          {meta.name} ({meta.bnName})
        </h1>
        <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-3xl">
          {meta.description}। নিচে সর্বমোট {posts.length}টি পোস্ট দেওয়া হলো।
        </p>
      </div>

      <AdSlot slotId={`category-${meta.slug}-top`} format="horizontal" />

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {posts.map((post) => (
            <CategoryCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="bg-amber-50 border border-amber-200 p-8 rounded-2xl text-center">
          <p className="text-base font-bold text-amber-900">এই ক্যাটাগরিতে বর্তমানে কোনো পোস্ট নেই।</p>
        </div>
      )}
    </div>
  );
}