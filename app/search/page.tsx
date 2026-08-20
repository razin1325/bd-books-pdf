import React from 'react';
import { Metadata } from 'next';
import Breadcrumb from '@/components/Breadcrumb';
import SearchBox from '@/components/SearchBox';
import BookCard from '@/components/BookCard';
import ExpandableBookGrid from '@/components/ExpandableBookGrid';
import AdSlot from '@/components/AdSlot';
import { searchBooks } from '@/lib/data';
import { Search } from 'lucide-react';

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  const query = q ? q.trim() : '';
  return {
    title: query ? `"${query}" Search Results | BD Edu PDF` : 'Search Books & Guides PDF',
    description: `Search results for "${query}" on BD Edu PDF library. Find NCTB textbooks, solutions, and guide books.`,
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q ? q.trim() : '';
  const results = query ? await searchBooks(query) : [];

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Search' }]} />

      <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-xs space-y-4 max-w-3xl mx-auto">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-2">
            <Search className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Search Educational Books & Guides
          </h1>
          <p className="text-sm text-gray-500">
            শ্রেণি, বিষয় বা বইয়ের নাম লিখে আপনার প্রয়োজনীয় বই খুঁজে নিন
          </p>
        </div>

        <SearchBox initialQuery={query} />
      </div>

      <AdSlot slotId="search-page-top" />

      {query ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 pb-2">
            <h2 className="text-lg font-bold text-gray-900">
              Search Results for &ldquo;{query}&rdquo;
            </h2>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Found {results.length} book{results.length === 1 ? '' : 's'}
            </span>
          </div>

          {results.length > 0 ? (
            <ExpandableBookGrid books={results} initialCount={5} step={5} />
          ) : (
            <div className="bg-gray-50 border border-gray-200 p-8 rounded-xl text-center space-y-2 my-8">
              <p className="text-base font-semibold text-gray-800">
                দুঃখিত, &ldquo;{query}&rdquo; নাম দিয়ে কোনো বই খুঁজে পাওয়া যায়নি।
              </p>
              <p className="text-xs text-gray-500">
                বানান সঠিক আছে কিনা অথবা শুধুমাত্র শ্রেণি ও বিষয়ের নাম লিখে আবার চেষ্টা করুন (যেমন: &ldquo;Class 8 Math&rdquo;)।
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-400 text-sm">
          উপরে সার্চ বক্সে আপনার কাঙ্ক্ষিত বই বা বিষয়ের নাম লিখুন।
        </div>
      )}
    </div>
  );
}
