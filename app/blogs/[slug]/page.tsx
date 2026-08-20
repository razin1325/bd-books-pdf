import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import AdSlot from '@/components/AdSlot';
import { getBlogPostBySlug, getRelatedBlogPosts, BLOG_POSTS_DATA } from '@/lib/blogs';
import {
  Calendar,
  Clock,
  User,
  Tag,
  ArrowRight,
  Share2,
  HelpCircle,
  BookOpen,
  Sparkles,
} from 'lucide-react';

interface RouteProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS_DATA.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found | BD Edu PDF',
    };
  }

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.tags,
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

export default async function SingleBlogPage({ params }: RouteProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedBlogPosts(slug, 3);

  // Structured Data Schema for Google Ranking (Article / BlogPosting)
  const jsonLdSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    datePublished: '2026-08-20',
    dateModified: '2026-08-21',
    publisher: {
      '@type': 'Organization',
      name: 'BD Edu PDF',
      logo: {
        '@type': 'ImageObject',
        url: 'https://bd-books-pdf.vercel.app/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://bd-books-pdf.vercel.app/blogs/${post.slug}`,
    },
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Inject Google Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      <Breadcrumb
        items={[
          { label: 'ব্লগ', href: '/blogs' },
          { label: post.category, href: `/blogs?category=${post.categorySlug}` },
          { label: post.title },
        ]}
      />

      {/* Article Container */}
      <article className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-10 space-y-6">
        {/* Category & Tags */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full border border-emerald-200">
            {post.category}
          </span>
          {post.tags.map((t) => (
            <span
              key={t}
              className="bg-gray-100 text-gray-600 text-xs font-semibold px-2.5 py-0.5 rounded-md"
            >
              #{t}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight">
          {post.title}
        </h1>

        {/* Post Meta info bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-gray-100 text-xs sm:text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1 font-medium text-gray-700">
              <User className="w-4 h-4 text-emerald-600" />
              <span>{post.author}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>{post.date}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Clock className="w-4 h-4 text-gray-400" />
              <span>{post.readTime}</span>
            </span>
          </div>

          <div className="flex items-center space-x-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>অফিশিয়াল গাইড</span>
          </div>
        </div>

        <AdSlot slotId={`blog-${slug}-top`} format="horizontal" />

        {/* Main Article Body HTML */}
        <div
          className="prose prose-emerald max-w-none text-gray-800 space-y-5 leading-relaxed text-sm sm:text-base prose-headings:font-bold prose-headings:text-gray-900 prose-h2:text-xl prose-h2:sm:text-2xl prose-h2:border-b prose-h2:pb-2 prose-h2:mt-6 prose-h3:text-lg prose-h3:text-emerald-950 prose-a:text-emerald-700 prose-a:font-semibold prose-strong:text-gray-900"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <AdSlot slotId={`blog-${slug}-bottom`} format="horizontal" />

        {/* FAQ Accordion Section if available */}
        {post.faq && post.faq.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-200 space-y-4 bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100">
            <div className="flex items-center space-x-2 text-emerald-900">
              <HelpCircle className="w-5 h-5 text-emerald-600" />
              <h3 className="text-lg font-extrabold">সাধারণ প্রশ্ন ও উত্তর (FAQ):</h3>
            </div>

            <div className="space-y-3">
              {post.faq.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-xl border border-emerald-200/80 space-y-1.5 shadow-2xs"
                >
                  <h4 className="font-bold text-gray-900 text-sm sm:text-base">
                    প্রশ্ন: {item.question}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    উত্তর: {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <section className="space-y-4 pt-4">
          <div className="flex items-center space-x-2 border-b border-gray-200 pb-3">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            <h3 className="text-xl font-bold text-gray-900">আরও অন্যান্য প্রয়োজনীয় পোস্টসমূহ:</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedPosts.map((rel) => (
              <Link
                key={rel.id}
                href={`/blogs/${rel.slug}`}
                className="bg-white p-5 rounded-xl border border-gray-200 hover:border-emerald-500 hover:shadow-md transition-all space-y-2.5 flex flex-col justify-between group"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {rel.category}
                  </span>
                  <h4 className="font-bold text-gray-900 group-hover:text-emerald-700 text-sm line-clamp-2 leading-snug">
                    {rel.title}
                  </h4>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                  <span>{rel.date}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
