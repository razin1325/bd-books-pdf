'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import AdSlot from '@/components/AdSlot';
import {
  Calendar,
  Download,
  Clock,
  CheckCircle2,
  AlertTriangle,
  GraduationCap,
  Sparkles,
  BookOpen,
  ArrowRight,
  Filter,
  FileCheck2,
  Bookmark,
  Share2,
} from 'lucide-react';

const ROUTINE_DATA = [
  {
    date: '১১ সেপ্টেম্বর ২০২৬ (শুক্রবার)',
    time: 'দুপুর ১:৩০ - বিকেল ৫:০০',
    subject: 'স্বাধীন বাংলাদেশের অভ্যুদয়ের ইতিহাস (আবশ্যিক - সকল বিভাগ)',
    code: '২০১৫০১',
    dept: 'all',
  },
  {
    date: '১৪ সেপ্টেম্বর ২০২৬ (সোমবার)',
    time: 'দুপুর ১:৩০ - বিকেল ৫:০০',
    subject: 'বাংলা (আবশ্যিক) / ইংরেজি (নন-মেজর)',
    code: '২১১০০১ / ২১১০১১',
    dept: 'arts',
  },
  {
    date: '১৭ সেপ্টেম্বর ২০২৬ (বৃহস্পতিবার)',
    time: 'দুপুর ১:৩০ - বিকেল ৫:০০',
    subject: 'রাষ্ট্রবিজ্ঞান ১ম পত্র / ইতিহাস ১ম পত্র / সমাজবিজ্ঞান ১ম পত্র',
    code: '২১২০০১ / ২১২১০১',
    dept: 'arts',
  },
  {
    date: '২০ সেপ্টেম্বর ২০২৬ (রবিবার)',
    time: 'দুপুর ১:৩০ - বিকেল ৫:০০',
    subject: 'রাষ্ট্রবিজ্ঞান ২য় পত্র / ইতিহাস ২য় পত্র / সমাজবিজ্ঞান ২য় পত্র',
    code: '২১২০০৩ / ২১২১০৩',
    dept: 'arts',
  },
  {
    date: '২৩ সেপ্টেম্বর ২০২৬ (বুধবার)',
    time: 'দুপুর ১:৩০ - বিকেল ৫:০০',
    subject: 'অর্থনীতি ১ম পত্র / সমাজকর্ম ১ম পত্র',
    code: '২১২২০১ / ২১২৫০১',
    dept: 'arts',
  },
  {
    date: '২৭ সেপ্টেম্বর ২০২৬ (রবিবার)',
    time: 'দুপুর ১:৩০ - বিকেল ৫:০০',
    subject: 'অর্থনীতি ২য় পত্র / সমাজকর্ম ২য় পত্র',
    code: '২১২২০৩ / ২১২৫০৩',
    dept: 'arts',
  },
  {
    date: '৩০ সেপ্টেম্বর ২০২৬ (বুধবার)',
    time: 'দুপুর ১:৩০ - বিকেল ৫:০০',
    subject: 'হিসাববিজ্ঞান ১ম পত্র / ব্যবস্থাপনা ১ম পত্র / ফিন্যান্স ১ম পত্র',
    code: '২১২৫০১ / ২১২৭০১',
    dept: 'commerce',
  },
  {
    date: '০৪ অক্টোবর ২০২৬ (রবিবার)',
    time: 'দুপুর ১:৩০ - বিকেল ৫:০০',
    subject: 'হিসাববিজ্ঞান ২য় পত্র / ব্যবস্থাপনা ২য় পত্র / ফিন্যান্স ২য় পত্র',
    code: '২১২৫০৩ / ২১২৭০৩',
    dept: 'commerce',
  },
  {
    date: '০৭ অক্টোবর ২০২৬ (বুধবার)',
    time: 'দুপুর ১:৩০ - বিকেল ৫:০০',
    subject: 'কম্পিউটার ও তথ্য প্রযুক্তি (ICT) / রসায়ন ১ম পত্র',
    code: '২১৩৭০১ / ২১৩৭০৩',
    dept: 'science',
  },
  {
    date: '১০ অক্টোবর ২০২৬ (শনিবার)',
    time: 'দুপুর ১:৩০ - বিকেল ৫:০০',
    subject: 'পদার্থবিজ্ঞান ১ম পত্র / উদ্ভিদবিজ্ঞান ১ম পত্র / মাটি বিজ্ঞান ১ম পত্র',
    code: '২১৩৭০৫ / ২১৩৭০৭',
    dept: 'science',
  },
  {
    date: '১৩ অক্টোবর ২০২৬ (মঙ্গলবার)',
    time: 'দুপুর ১:৩০ - বিকেল ৫:০০',
    subject: 'পদার্থবিজ্ঞান ২য় পত্র / প্রাণীবিজ্ঞান ১ম পত্র / ভূগোল ১ম পত্র',
    code: '২১৩৭০৯ / ২১৩৭১১',
    dept: 'science',
  },
  {
    date: '১৭ অক্টোবর ২০২৬ (শনিবার)',
    time: 'দুপুর ১:৩০ - বিকেল ৫:০০',
    subject: 'গণিত ১ম পত্র / পরিসংখ্যান ১ম পত্র / মনোবিজ্ঞান ১ম পত্র',
    code: '২১৩৭১৩ / ২১৩৭১৫',
    dept: 'science',
  },
];

export default function NuHonoursRoutinePage() {
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredRoutine = ROUTINE_DATA.filter((item) => {
    const matchesDept =
      selectedDept === 'all' || item.dept === 'all' || item.dept === selectedDept;
    const matchesSearch =
      item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.includes(searchQuery) ||
      item.date.includes(searchQuery);

    return matchesDept && matchesSearch;
  });

  return (
    <div className="space-y-6 sm:space-y-8 pb-12">
      <Breadcrumb
        items={[
          { label: 'অনার্স রুটিন', href: '/nu-honours-routine' },
          { label: 'জাতীয় বিশ্ববিদ্যালয় অনার্স ১ম বর্ষ পরীক্ষা রুটিন ২০২৬' },
        ]}
      />

      {/* Hero Banner Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-950 p-6 sm:p-10 text-white shadow-xl border border-purple-500/30">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 bg-purple-500/20 backdrop-blur-md px-3.5 py-1 rounded-full text-purple-300 border border-purple-400/30 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>জাতীয় বিশ্ববিদ্যালয় (National University)</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black leading-tight tracking-tight text-white">
            জাতীয় বিশ্ববিদ্যালয় অনার্স ১ম বর্ষ পরীক্ষা রুটিন ২০২৬ PDF (NU Honours 1st Year)
          </h1>

          <p className="text-xs sm:text-base text-purple-100/90 leading-relaxed font-medium">
            ২০২৬ সালের অনার্স ১ম বর্ষ পরীক্ষা (২০২৩-২৪ ও ২০২৪-২৫ শিক্ষাবর্ষের নিয়মিত, অনিয়মিত ও মানোন্নয়ন) এর বিষয়ভিত্তিক অফিশিয়াল সময়সূচি ও কেন্দ্র তালিকা।
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="https://drive.google.com/file/d/1pjqvB95x5_hHVtyPK8r853aJZsK4jKMg/view"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>ডাউনলোড করুন অফিশিয়াল PDF (Google Drive)</span>
            </a>
          </div>
        </div>
      </section>

      <AdSlot slotId="nu-honours-routine-top" format="horizontal" />

      {/* Filter and Search Bar */}
      <section className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Department Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setSelectedDept('all')}
              className={`px-4 py-2 text-xs font-extrabold rounded-xl transition-all ${
                selectedDept === 'all'
                  ? 'bg-purple-700 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              সব বিষয় ({ROUTINE_DATA.length})
            </button>
            <button
              onClick={() => setSelectedDept('arts')}
              className={`px-4 py-2 text-xs font-extrabold rounded-xl transition-all ${
                selectedDept === 'arts'
                  ? 'bg-purple-700 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              মানবিক শাখা (Arts)
            </button>
            <button
              onClick={() => setSelectedDept('commerce')}
              className={`px-4 py-2 text-xs font-extrabold rounded-xl transition-all ${
                selectedDept === 'commerce'
                  ? 'bg-purple-700 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ব্যবসায় শিক্ষা (Commerce)
            </button>
            <button
              onClick={() => setSelectedDept('science')}
              className={`px-4 py-2 text-xs font-extrabold rounded-xl transition-all ${
                selectedDept === 'science'
                  ? 'bg-purple-700 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              বিজ্ঞান শাখা (Science)
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="বিষয় বা বিষয় কোড লিখুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 text-xs rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
            />
          </div>
        </div>
      </section>

      {/* Routine Data Table */}
      <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden space-y-4">
        <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-purple-700" />
            <h2 className="text-lg font-extrabold text-gray-900">
              বিষয়ভিত্তিক পূর্ণাঙ্গ রুটিন সময়সূচি তালিকা
            </h2>
          </div>
          <span className="text-xs font-bold text-gray-500">
            মোট বিষয়: {filteredRoutine.length}টি
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-800 border-collapse">
            <thead className="bg-purple-50 text-purple-950 text-xs font-black uppercase">
              <tr>
                <th className="py-3.5 px-4 border-b border-purple-200">তারিখ ও বার</th>
                <th className="py-3.5 px-4 border-b border-purple-200">সময়</th>
                <th className="py-3.5 px-4 border-b border-purple-200">বিষয় কোড</th>
                <th className="py-3.5 px-4 border-b border-purple-200">বিষয়ের নাম ও বিভাগ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredRoutine.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-purple-50/50 transition-colors"
                >
                  <td className="py-3.5 px-4 font-bold text-purple-950">{row.date}</td>
                  <td className="py-3.5 px-4 text-xs font-semibold text-gray-600">{row.time}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-700">{row.code}</td>
                  <td className="py-3.5 px-4 font-bold text-gray-900">{row.subject}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Rules & Instructions */}
      <section className="bg-purple-50/60 p-6 sm:p-8 rounded-2xl border border-purple-200 space-y-4">
        <div className="flex items-center space-x-2 text-purple-950">
          <FileCheck2 className="w-5 h-5 text-purple-700" />
          <h3 className="text-lg font-extrabold">পরীক্ষার্থীদের জন্য জরুরি অফিশিয়াল নির্দেশাবলী:</h3>
        </div>
        <ul className="space-y-2 text-xs sm:text-sm text-gray-700 list-disc list-inside font-medium leading-relaxed">
          <li>পরীক্ষার্থীদের অবশ্যই নিজ নিজ কলেজের অধ্যক্ষের স্বাক্ষর ও সিলযুক্ত অফিশিয়াল प्रवेशপত্র (Admit Card) সঙ্গে আনতে হবে।</li>
          <li>পরীক্ষা শুরু হওয়ার অন্তত ৩০ মিনিট পূর্বে নিজ নিজ নির্ধারিত আসনে অবস্থান করতে হবে।</li>
          <li>পরীক্ষার হলে মোবাইল ফোন বা কোনো ধরনের ইলেকট্রনিক ডিভাইস আনা সম্পূর্ণ নিষিদ্ধ।</li>
        </ul>
      </section>

      <AdSlot slotId="nu-honours-routine-bottom" format="horizontal" />
    </div>
  );
}
