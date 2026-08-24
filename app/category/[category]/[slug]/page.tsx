import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumb from '@/components/Breadcrumb';
import AdSlot from '@/components/AdSlot';
import CategoryCard from '@/components/CategoryCard';
import { getCategoryPostBySlug, getRelatedCategoryPosts, CATEGORY_POSTS } from '@/lib/categories-data';
import { generateBabyNameSvgImage } from '@/lib/svg-generator';
import { Calendar, ArrowRight, Sparkles, BookOpen } from 'lucide-react';

// Turbopack dev can deliver the raw percent-encoded segment; decode when needed.
function normalizeSlug(raw: string): string {
  if (!raw.includes('%')) return raw;
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

interface RouteProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return CATEGORY_POSTS.map((post) => ({
    category: post.categorySlug,
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getCategoryPostBySlug(normalizeSlug(slug));

  if (!post) {
    return { title: 'Post Not Found | BD Edu PDF' };
  }

  return {
    title: `${post.title} | BD Edu PDF`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function CategoryDetailPage({ params }: RouteProps) {
  const { slug } = await params;
  const post = getCategoryPostBySlug(normalizeSlug(slug));

  if (!post) {
    notFound();
  }

  const related = getRelatedCategoryPosts(post.slug, 3);
  const displayImage =
    post.image ||
    (post.categorySlug === 'baby-boy-girl-name'
      ? generateBabyNameSvgImage(post.title, post.category)
      : null);

  const jsonLdSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: displayImage,
    datePublished: post.date,
    publisher: {
      '@type': 'Organization',
      name: 'BD Edu PDF',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://bd-books-pdf.vercel.app/category/${post.categorySlug}/${encodeURIComponent(post.slug)}`,
    },
  };

  return (
    <div className="space-y-8 pb-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      <Breadcrumb
        items={[
          { label: 'Category', href: '/category/baby-boy-girl-name' },
          { label: post.category, href: '/category/baby-boy-girl-name' },
          { label: post.title },
        ]}
      />

      <article className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-10 space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-pink-100 text-pink-800 text-xs font-extrabold px-3 py-1 rounded-full border border-pink-200">
            {post.category}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-gray-100 text-xs sm:text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>{post.date}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Sparkles className="w-4 h-4 text-pink-500" />
              <span>BD Edu PDF</span>
            </span>
          </div>
          <div className="flex items-center space-x-2 text-xs font-bold text-pink-700 bg-pink-50 px-3 py-1 rounded-lg border border-pink-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>নামের তালিকা</span>
          </div>
        </div>

        {displayImage && (
          <div className="relative w-full h-56 sm:h-80 rounded-2xl overflow-hidden border border-gray-200 shadow-md">
            <Image
              src={displayImage}
              alt={post.title}
              fill
              className="object-cover"
              unoptimized
              priority
            />
          </div>
        )}

        <AdSlot slotId={`category-${post.id}-top`} format="horizontal" />

        {/* Main Article Body HTML rendered with prose CSS */}
        <div
          className={`prose prose-pink max-w-none text-gray-800 space-y-5 leading-relaxed text-sm sm:text-base prose-headings:font-bold prose-headings:text-gray-900 prose-h2:text-xl prose-h2:sm:text-2xl prose-h2:border-b prose-h2:pb-2 prose-h2:mt-6 prose-h3:text-lg prose-h3:text-pink-950 prose-a:text-pink-700 prose-a:font-semibold prose-strong:text-gray-900 prose-table:w-full prose-table:border-collapse ${
            post.categorySlug === 'baby-boy-girl-name' ? 'prose-img:hidden' : 'prose-img:rounded-xl prose-img:border prose-img:border-gray-200'
          }`}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <AdSlot slotId={`category-${post.id}-bottom`} format="horizontal" />
      </article>

      {related.length > 0 && (
        <section className="space-y-4 pt-4">
          <div className="flex items-center space-x-2 border-b border-gray-200 pb-3">
            <BookOpen className="w-5 h-5 text-pink-600" />
            <h3 className="text-xl font-bold text-gray-900">
              {post.categorySlug === 'baby-boy-girl-name'
                ? 'আরও অন্যান্য নামের তালিকাসমূহ:'
                : post.categorySlug === 'job-circular-news'
                ? 'আরও অন্যান্য চাকরির সার্কুলারসমূহ:'
                : 'আরও অন্যান্য পোস্টসমূহ:'}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map((rel) => (
              <CategoryCard key={rel.id} post={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
