import React from 'react';
import { Metadata } from 'next';
import Breadcrumb from '@/components/Breadcrumb';
import SitemapClient from '@/components/SitemapClient';
import { CLASSES_LIST, SUBJECTS_LIST, DIVISION_COLLEGES_REQ, DETAILED_COLLEGES_LIST } from '@/lib/types';
import { getBooks } from '@/lib/data';
import { BLOG_POSTS_DATA } from '@/lib/blogs';
import { CATEGORY_LIST, CATEGORY_POSTS } from '@/lib/categories-data';

export const metadata: Metadata = {
  title: 'HTML Sitemap | সম্পূর্ণ সূচিপত্র ও নেভিগেশন ম্যাপ',
  description:
    'শিক্ষা বইমেলা ওয়েবসাইটের সকল শ্রেণি, বিষয়, ব্লগ নির্দেশিকা, এইচএসসি রুটিন, একাদশ ভর্তি নির্দেশিকা, শিশুর নাম, চাকরির সার্কুলার, বাংলাদেশের সেরা কলেজ ডিরেক্টরি এবং সকল পাঠ্যবই ও গাইডের সম্পূর্ণ সূচিপত্র।',
};

export default async function HtmlSitemapPage() {
  const allBooks = await getBooks();

  return (
    <div className="space-y-6 pb-12">
      <Breadcrumb items={[{ label: 'HTML Sitemap' }]} />

      <SitemapClient
        books={allBooks}
        blogPosts={BLOG_POSTS_DATA}
        categoryPosts={CATEGORY_POSTS}
        categoryList={CATEGORY_LIST}
        classes={CLASSES_LIST}
        subjects={SUBJECTS_LIST}
        colleges={DETAILED_COLLEGES_LIST}
        divisions={DIVISION_COLLEGES_REQ}
      />
    </div>
  );
}
