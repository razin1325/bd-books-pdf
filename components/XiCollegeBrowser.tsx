'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import type { XiCollege } from '@/lib/xi-colleges-data';
import { Search, MapPin, ChevronDown, GraduationCap, Users, Award } from 'lucide-react';

const GROUPS = ['Science', 'Business Studies', 'Humanities'];
const PAGE_SIZE = 25;

export default function XiCollegeBrowser({ initial, total }: { initial: XiCollege[]; total: number }) {
  const [all, setAll] = useState<XiCollege[]>(initial);
  const [query, setQuery] = useState('');
  const [board, setBoard] = useState('');
  const [group, setGroup] = useState('');
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [loadingAll, setLoadingAll] = useState(false);
  const loadedRef = useRef(initial.length >= total);

  // Lazily fetch the complete dataset when the user searches/filters beyond the seed set
  useEffect(() => {
    if (loadedRef.current) return;
    if (!query && !board && !group) return;
    setLoadingAll(true);
    loadedRef.current = true;
    fetch('/data/xi-colleges.json')
      .then((r) => r.json())
      .then((data: XiCollege[]) => setAll(data))
      .catch(() => {})
      .finally(() => setLoadingAll(false));
  }, [query, board, group]);

  const boards = useMemo(() => {
    const m = new Map<string, number>();
    all.forEach((c) => m.set(c.board, (m.get(c.board) || 0) + 1));
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  }, [all]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return all.filter((c) => {
      if (board && c.board !== board) return false;
      if (group && !c.groups.includes(group)) return false;
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) ||
        String(c.eiin).includes(q) ||
        c.thana.toLowerCase().includes(q) ||
        c.district.toLowerCase().includes(q)
      );
    });
  }, [all, query, board, group]);

  const shown = filtered.slice(0, visible);

  const resetPaging = () => setVisible(PAGE_SIZE);

  return (
    <div className="space-y-4">
      {/* Search + Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] gap-2.5">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              resetPaging();
            }}
            placeholder="কলেজের নাম, EIIN বা থানা দিয়ে খুঁজুন..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none text-sm bg-white"
          />
        </div>
        <select
          value={board}
          onChange={(e) => {
            setBoard(e.target.value);
            resetPaging();
          }}
          className="px-3 py-2.5 rounded-xl border border-gray-300 focus:border-emerald-500 outline-none text-xs sm:text-sm bg-white font-semibold text-gray-700"
        >
          <option value="">সব বোর্ড</option>
          {boards.map(([b]) => (
            <option key={b} value={b}>
              {b} Board
            </option>
          ))}
        </select>
        <select
          value={group}
          onChange={(e) => {
            setGroup(e.target.value);
            resetPaging();
          }}
          className="px-3 py-2.5 rounded-xl border border-gray-300 focus:border-emerald-500 outline-none text-xs sm:text-sm bg-white font-semibold text-gray-700"
        >
          <option value="">সব গ্রুপ</option>
          {GROUPS.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      {/* Count */}
      <p className="text-xs font-bold text-gray-500">
        {loadingAll ? 'লোড হচ্ছে...' : `${filtered.length.toLocaleString()}টি কলেজ পাওয়া গেছে`}
      </p>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[720px]">
          <thead>
            <tr className="bg-emerald-800 text-white uppercase text-2xs sm:text-xs font-bold">
              <th className="p-3">কলেজ (College)</th>
              <th className="p-3">EIIN</th>
              <th className="p-3">থানা</th>
              <th className="p-3">বোর্ড</th>
              <th className="p-3">গ্রুপ</th>
              <th className="p-3 text-center">min GPA</th>
              <th className="p-3 text-center">আসন</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 font-medium text-gray-800">
            {shown.map((c) => (
              <tr key={c.eiin} className="hover:bg-emerald-50/50 transition-colors">
                <td className="p-3 font-bold">
                  <Link href={`/college-admission/${c.slug}`} className="text-gray-900 hover:text-emerald-700 hover:underline">
                    {c.name}
                  </Link>
                </td>
                <td className="p-3 font-mono text-gray-600">{c.eiin}</td>
                <td className="p-3 text-gray-600">{c.thana}</td>
                <td className="p-3 text-gray-600">{c.board}</td>
                <td className="p-3 text-2xs text-gray-600 max-w-[160px] truncate">{c.groups.join(', ')}</td>
                <td className="p-3 text-center font-extrabold text-blue-900 bg-blue-50/50 rounded-lg">{Number(c.gpa).toFixed(2)}</td>
                <td className="p-3 text-center font-bold">{c.seats.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* See More */}
      {visible < filtered.length && (
        <div className="text-center pt-1">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="inline-flex items-center space-x-2 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl font-extrabold text-sm shadow-md hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer border border-emerald-500/30 group"
          >
            <span>আরও দেখুন ({Math.min(PAGE_SIZE, filtered.length - visible)}টি)</span>
            <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
          <p className="text-xs text-gray-500 mt-2">
            {shown.length.toLocaleString()} / {filtered.length.toLocaleString()} দেখানো হচ্ছে
          </p>
        </div>
      )}
    </div>
  );
}
