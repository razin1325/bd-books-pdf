'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

interface SearchBoxProps {
  initialQuery?: string;
  placeholder?: string;
  className?: string;
}

export default function SearchBox({
  initialQuery = '',
  placeholder = 'বই বা গাইডের নাম লিখে সার্চ করুন...',
  className = '',
}: SearchBoxProps) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className={`w-full relative ${className}`}>
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full py-3.5 pl-4 pr-12 text-sm sm:text-base text-gray-900 bg-white border border-gray-300 rounded-xl shadow-xs focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder:text-gray-400"
        />
        <button
          type="submit"
          className="absolute right-2 p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center justify-center"
          title="Search"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}
