'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import AdSlot from '@/components/AdSlot';
import {
  Calendar,
  Download,
  ExternalLink,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Building2,
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
    date: '০৬ জুন ২০২৭ (রবিবার)',
    timeMorning: 'সকাল ১০:০০ - বেলা ১:০০',
    subMorning: 'বাংলা (আবশ্যিক) ১ম পত্র',
    codeMorning: '১০১',
    timeAfternoon: 'বিকাল ২:০০ - ৫:০০',
    subAfternoon: '-',
    codeAfternoon: '-',
    group: 'all',
  },
  {
    date: '০৮ জুন ২০২৭ (মঙ্গলবার)',
    timeMorning: 'সকাল ১০:০০ - বেলা ১:০০',
    subMorning: 'বাংলা (আবশ্যিক) ২য় পত্র',
    codeMorning: '১০২',
    timeAfternoon: 'বিকাল ২:০০ - ৫:০০',
    subAfternoon: '-',
    codeAfternoon: '-',
    group: 'all',
  },
  {
    date: '১০ জুন ২০২৭ (বৃহস্পতিবার)',
    timeMorning: 'সকাল ১০:০০ - বেলা ১:০০',
    subMorning: 'ইংরেজি (আবশ্যিক) ১ম পত্র',
    codeMorning: '১০৭',
    timeAfternoon: 'বিকাল ২:০০ - ৫:০০',
    subAfternoon: '-',
    codeAfternoon: '-',
    group: 'all',
  },
  {
    date: '১৩ জুন ২০২৭ (রবিবার)',
    timeMorning: 'সকাল ১০:০০ - বেলা ১:০০',
    subMorning: 'ইংরেজি (আবশ্যিক) ২য় পত্র',
    codeMorning: '১০৮',
    timeAfternoon: 'বিকাল ২:০০ - ৫:০০',
    subAfternoon: '-',
    codeAfternoon: '-',
    group: 'all',
  },
  {
    date: '১৫ জুন ২০২৭ (মঙ্গলবার)',
    timeMorning: 'সকাল ১০:০০ - বেলা ১:০০',
    subMorning: 'তথ্য ও যোগাযোগ প্রযুক্তি (ICT)',
    codeMorning: '২৭৫',
    timeAfternoon: 'বিকাল ২:০০ - ৫:০০',
    subAfternoon: '-',
    codeAfternoon: '-',
    group: 'all',
  },

  // Science Group
  {
    date: '১৭ জুন ২০২৭ (বৃহস্পতিবার)',
    timeMorning: 'সকাল ১০:০০ - বেলা ১:০০',
    subMorning: 'পদার্থবিজ্ঞান ১ম পত্র / হিসাববিজ্ঞান ১ম পত্র / যুক্তিবিদ্যা ১ম পত্র',
    codeMorning: '১৭৪ / ২৫৩ / ১২১',
    timeAfternoon: 'বিকাল ২:০০ - ৫:০০',
    subAfternoon: 'শিল্পকলা ও বস্ত্র বিজ্ঞান ১ম পত্র',
    codeAfternoon: '২৮২',
    group: 'science',
  },
  {
    date: '২০ জুন ২০২৭ (রবিবার)',
    timeMorning: 'সকাল ১০:০০ - বেলা ১:০০',
    subMorning: 'পদার্থবিজ্ঞান ২য় পত্র / হিসাববিজ্ঞান ২য় পত্র / যুক্তিবিদ্যা ২য় পত্র',
    codeMorning: '১৭৫ / ২৫৪ / ১২২',
    timeAfternoon: 'বিকাল ২:০০ - ৫:০০',
    subAfternoon: 'শিল্পকলা ও বস্ত্র বিজ্ঞান ২য় পত্র',
    codeAfternoon: '২৮৩',
    group: 'science',
  },
  {
    date: '২২ জুন ২০২৭ (মঙ্গলবার)',
    timeMorning: 'সকাল ১০:০০ - বেলা ১:০০',
    subMorning: 'রসায়ন ১ম পত্র / ব্যবসায় সংগঠন ও ব্যবস্থাপনা ১ম পত্র / ইতিহাস ১ম পত্র',
    codeMorning: '১৭৬ / ২৭৭ / ৩০৪',
    timeAfternoon: 'বিকাল ২:০০ - ৫:০০',
    subAfternoon: 'ইসলামের ইতিহাস ও সংস্কৃতি ১ম পত্র',
    codeAfternoon: '২৬৭',
    group: 'science',
  },
  {
    date: '২৪ জুন ২০২৭ (বৃহস্পতিবার)',
    timeMorning: 'সকাল ১০:০০ - বেলা ১:০০',
    subMorning: 'রসায়ন ২য় পত্র / ব্যবসায় সংগঠন ও ব্যবস্থাপনা ২য় পত্র / ইতিহাস ২য় পত্র',
    codeMorning: '১৭৭ / ২৭৮ / ৩০৫',
    timeAfternoon: 'বিকাল ২:০০ - ৫:০০',
    subAfternoon: 'ইসলামের ইতিহাস ও সংস্কৃতি ২য় পত্র',
    codeAfternoon: '২৬৮',
    group: 'science',
  },
  {
    date: '২৭ জুন ২০২৭ (রবিবার)',
    timeMorning: 'সকাল ১০:০০ - বেলা ১:০০',
    subMorning: 'উচ্চতর গণিত ১ম পত্র / অর্থনীতি ১ম পত্র / পৌরনীতি ও সুশাসন ১ম পত্র',
    codeMorning: '২৬৫ / ১০৯ / ২৬৯',
    timeAfternoon: 'বিকাল ২:০০ - ৫:০০',
    subAfternoon: 'গার্হস্থ্য বিজ্ঞান ১ম পত্র',
    codeAfternoon: '২৭৩',
    group: 'science',
  },
  {
    date: '২৯ জুন ২০২৭ (মঙ্গলবার)',
    timeMorning: 'সকাল ১০:০০ - বেলা ১:০০',
    subMorning: 'উচ্চতর গণিত ২য় পত্র / অর্থনীতি ২য় পত্র / পৌরনীতি ও সুশাসন ২য় পত্র',
    codeMorning: '২৬৬ / ১১০ / ২৭০',
    timeAfternoon: 'বিকাল ২:০০ - ৫:০০',
    subAfternoon: 'গার্হস্থ্য বিজ্ঞান ২য় পত্র',
    codeAfternoon: '২৭৪',
    group: 'science',
  },
  {
    date: '০১ জুলাই ২০২৭ (বৃহস্পতিবার)',
    timeMorning: 'সকাল ১০:০০ - বেলা ১:০০',
    subMorning: 'জীববিজ্ঞান ১ম পত্র / ফিন্যান্স, ব্যাংকিং ও বীমা ১ম পত্র / সমাজবিজ্ঞান ১ম পত্র',
    codeMorning: '১৭৮ / ২৯২ / ২২৫',
    timeAfternoon: 'বিকাল ২:০০ - ৫:০০',
    subAfternoon: 'কৃষি শিক্ষা ১ম পত্র / ভূগোল ১ম পত্র',
    codeAfternoon: '২৩৯ / ১২৫',
    group: 'science',
  },
  {
    date: '০৪ জুলাই ২০২৭ (রবিবার)',
    timeMorning: 'সকাল ১০:০০ - বেলা ১:০০',
    subMorning: 'জীববিজ্ঞান ২য় পত্র / ফিন্যান্স, ব্যাংকিং ও বীমা ২য় পত্র / সমাজবিজ্ঞান ২য় পত্র',
    codeMorning: '১৭৯ / ২৯৩ / ২২৬',
    timeAfternoon: 'বিকাল ২:০০ - ৫:০০',
    subAfternoon: 'কৃষি শিক্ষা ২য় পত্র / ভূগোল ২য় পত্র',
    codeAfternoon: '২৪০ / ১২৬',
    group: 'science',
  },

  // Commerce & Arts Group Extra
  {
    date: '০৬ জুলাই ২০২৭ (মঙ্গলবার)',
    timeMorning: 'সকাল ১০:০০ - বেলা ১:০০',
    subMorning: 'উৎপাদন ব্যবস্থাপনা ও বিপণন ১ম পত্র / সমাজকর্ম ১ম পত্র / পরিসংখ্যান ১ম পত্র',
    codeMorning: '২৮৬ / ২৭১ / ১২৯',
    timeAfternoon: 'বিকাল ২:০০ - ৫:০০',
    subAfternoon: 'ইসলাম শিক্ষা ১ম পত্র / নাট্যকলা ১ম পত্র',
    codeAfternoon: '২৪৯ / ২৯৮',
    group: 'commerce',
  },
  {
    date: '০৮ জুলাই ২০২৭ (বৃহস্পতিবার)',
    timeMorning: 'সকাল ১০:০০ - বেলা ১:০০',
    subMorning: 'উৎপাদন ব্যবস্থাপনা ও বিপণন ২য় পত্র / সমাজকর্ম ২য় পত্র / পরিসংখ্যান ২য় পত্র',
    codeMorning: '২৮৭ / ২৭২ / ১৩০',
    timeAfternoon: 'বিকাল ২:০০ - ৫:০০',
    subAfternoon: 'ইসলাম শিক্ষা ২য় পত্র / নাট্যকলা ২য় পত্র',
    codeAfternoon: '২৫০ / ২৯৯',
    group: 'commerce',
  },
  {
    date: '১১ জুলাই ২০২৭ (রবিবার)',
    timeMorning: 'সকাল ১০:০০ - বেলা ১:০০',
    subMorning: 'মনস্তত্ত্ব ১ম পত্র / মৃত্তিকাবিজ্ঞান ১ম পত্র / প্রকৌশল অঙ্কন ১ম পত্র',
    codeMorning: '১২৩ / ১৪৩ / ১৭০',
    timeAfternoon: 'বিকাল ২:০০ - ৫:০০',
    subAfternoon: 'সংগীত ১ম পত্র / লঘু সংগীত ১ম পত্র',
    codeAfternoon: '২১৬ / ২৭৯',
    group: 'arts',
  },
  {
    date: '১৩ জুলাই ২০২৭ (মঙ্গলবার)',
    timeMorning: 'সকাল ১০:০০ - বেলা ১:০০',
    subMorning: 'মনস্তত্ত্ব ২য় পত্র / মৃত্তিকাবিজ্ঞান ২য় পত্র / প্রকৌশল অঙ্কন ২য় পত্র',
    codeMorning: '১২৪ / ১৪৪ / ১৭১',
    timeAfternoon: 'বিকাল ২:০০ - ৫:০০',
    subAfternoon: 'সংগীত ২য় পত্র / লঘু সংগীত ২য় পত্র',
    codeAfternoon: '২১৭ / ২৮০',
    group: 'arts',
  },
];

export default function HscRoutinePage() {
  const [activeGroup, setActiveGroup] = useState<'all' | 'science' | 'commerce' | 'arts'>('all');
  const drivePdfUrl = 'https://drive.google.com/file/d/1pjqvB95x5_hHVtyPK8r853aJZsK4jKMg/view';

  const filteredRoutine = ROUTINE_DATA.filter((row) => {
    if (activeGroup === 'all') return true;
    if (row.group === 'all') return true;
    return row.group === activeGroup;
  });

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <Breadcrumb
        items={[
          { label: 'হোম পেজ', href: '/' },
          { label: 'এইচএসসি রুটিন', href: '/hsc-exam-routine' },
          { label: 'HSC 2027 Routine PDF' },
        ]}
      />

      {/* Main Banner Hero Header */}
      <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-950 text-white p-6 sm:p-10 rounded-2xl shadow-lg relative overflow-hidden space-y-4">
        <div className="inline-flex items-center space-x-2 bg-emerald-700/60 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold text-emerald-100 border border-emerald-500/30">
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          <span>অফিশিয়াল রুটিন প্রকাশ ২০২৭ (ঢাকা ও সকল শিক্ষা বোর্ড)</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
          এইচএসসি পরীক্ষা ২০২৭ পূর্ণাঙ্গ বিষয়ভিত্তিক রুটিন - HSC Exam Routine PDF Download
        </h1>

        <p className="text-emerald-100 text-sm sm:text-base leading-relaxed max-w-3xl">
          মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষা বোর্ড (ঢাকা, চট্টগ্রাম, রাজশাহী, কুমিল্লা, যশোর, বরিশাল, সিলেট, দিনাজপুর, ময়মনসিংহ ও মাদ্রাসা বোর্ড) কর্তৃক প্রকাশিত ২০২৭ সালের এইচএসসি পরীক্ষার অফিশিয়াল বিষয়ভিত্তিক সময়সূচি ও রুটিন।
        </p>

        {/* Action Download Buttons */}
        <div className="pt-3 flex flex-col sm:flex-row gap-3">
          <a
            href={drivePdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-sm sm:text-base rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2.5"
          >
            <Download className="w-5 h-5 text-slate-950 flex-shrink-0" />
            <span>📥 ডাউনলোড করুন PDF রুটিন (Direct Drive Link)</span>
          </a>

          <a
            href={drivePdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base rounded-xl transition-colors border border-white/20 flex items-center justify-center space-x-2"
          >
            <ExternalLink className="w-4 h-4 text-emerald-300 flex-shrink-0" />
            <span>অনলাইনে সরাসরি ভিউ করুন</span>
          </a>
        </div>
      </div>

<AdSlot slotId="hsc-routine-top" format="horizontal" />

      {/* Quick Summary Highlights */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-emerald-50 border-2 border-emerald-200 p-4 rounded-xl space-y-1">
          <span className="text-2xs font-extrabold text-emerald-700 uppercase block">পরীক্ষা শুরু</span>
          <span className="text-base sm:text-lg font-black text-emerald-950 block">০৬ জুন ২০২৭</span>
        </div>

        <div className="bg-blue-50 border-2 border-blue-200 p-4 rounded-xl space-y-1">
          <span className="text-2xs font-extrabold text-blue-700 uppercase block">১ম শিফট (সকাল)</span>
          <span className="text-base sm:text-lg font-black text-blue-950 block">১০:০০ - ১:০০</span>
        </div>

        <div className="bg-purple-50 border-2 border-purple-200 p-4 rounded-xl space-y-1">
          <span className="text-2xs font-extrabold text-purple-700 uppercase block">২য় শিফট (বিকাল)</span>
          <span className="text-base sm:text-lg font-black text-purple-950 block">২:০০ - ৫:০০</span>
        </div>

        <div className="bg-amber-50 border-2 border-amber-200 p-4 rounded-xl space-y-1">
          <span className="text-2xs font-extrabold text-amber-700 uppercase block">মোট বিষয়/পত্র</span>
          <span className="text-base sm:text-lg font-black text-amber-950 block">৭৭টি বিষয়</span>
        </div>
      </section>

      {/* Routine Section with Group Filter Tabs */}
      <section className="bg-white border-2 border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 flex items-center space-x-2">
              <Calendar className="w-6 h-6 text-emerald-600" />
              <span>এইচএসসি পরীক্ষা ২০২৭ পূর্ণাঙ্গ বিষয়ভিত্তিক রুটিন</span>
            </h2>
            <p className="text-xs text-gray-500 font-medium mt-1">
              বিজ্ঞান, ব্যবসায় শিক্ষা ও মানবিক বিভাগের রুটিন ফিল্টার করে পছন্দমতো দেখুন
            </p>
          </div>

          <a
            href={drivePdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center space-x-1.5 self-start sm:self-auto"
          >
            <Download className="w-4 h-4" />
            <span>PDF ডাউনলোড</span>
          </a>
        </div>

        {/* Group Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 bg-emerald-50/60 p-2 rounded-xl border border-emerald-200">
          <button
            onClick={() => setActiveGroup('all')}
            className={`px-4 py-2 rounded-lg text-xs font-extrabold transition-all ${
              activeGroup === 'all'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-white text-gray-700 hover:bg-emerald-100'
            }`}
          >
            📚 সকল বিষয় (All Routine)
          </button>

          <button
            onClick={() => setActiveGroup('science')}
            className={`px-4 py-2 rounded-lg text-xs font-extrabold transition-all ${
              activeGroup === 'science'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'bg-white text-gray-700 hover:bg-blue-100'
            }`}
          >
            🧪 বিজ্ঞান বিভাগ (Science Group)
          </button>

          <button
            onClick={() => setActiveGroup('commerce')}
            className={`px-4 py-2 rounded-lg text-xs font-extrabold transition-all ${
              activeGroup === 'commerce'
                ? 'bg-purple-700 text-white shadow-xs'
                : 'bg-white text-gray-700 hover:bg-purple-100'
            }`}
          >
            💼 ব্যবসায় শিক্ষা (Commerce Group)
          </button>

          <button
            onClick={() => setActiveGroup('arts')}
            className={`px-4 py-2 rounded-lg text-xs font-extrabold transition-all ${
              activeGroup === 'arts'
                ? 'bg-amber-700 text-white shadow-xs'
                : 'bg-white text-gray-700 hover:bg-amber-100'
            }`}
          >
            📖 মানবিক বিভাগ (Humanities / Arts)
          </button>
        </div>

        {/* Table List */}
        <div className="overflow-x-auto rounded-xl border border-gray-300">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white font-bold uppercase text-2xs tracking-wider">
                <th className="p-3.5 w-40">তারিখ ও বার</th>
                <th className="p-3.5">১ম শিফট (সকাল ১০:০০ - ১:০০)</th>
                <th className="p-3.5 w-24 text-center">কোড</th>
                <th className="p-3.5">২য় শিফট (বিকাল ২:০০ - ৫:০০)</th>
                <th className="p-3.5 w-24 text-center">কোড</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 font-medium">
              {filteredRoutine.map((row, idx) => (
                <tr
                  key={idx}
                  className={idx % 2 === 0 ? 'bg-white hover:bg-emerald-50/50' : 'bg-gray-50/60 hover:bg-emerald-50/50'}
                >
                  <td className="p-3.5 font-bold text-emerald-950 whitespace-nowrap bg-emerald-50/40 border-r border-gray-200">
                    {row.date}
                  </td>

                  <td className="p-3.5 text-gray-900 font-bold">
                    {row.subMorning}
                  </td>
                  <td className="p-3.5 text-center font-mono font-bold text-emerald-800 bg-emerald-50/20 border-r border-gray-200">
                    {row.codeMorning}
                  </td>

                  <td className="p-3.5 text-gray-700 font-medium">
                    {row.subAfternoon}
                  </td>
                  <td className="p-3.5 text-center font-mono text-gray-500">
                    {row.codeAfternoon}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PDF Download Direct Banner Inside Table Section */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-100 p-5 rounded-xl border border-emerald-300 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="font-extrabold text-emerald-950 text-base block">
              📄 অফিশিয়াল পিডিএফ (PDF) ডাউনলোড করতে চান?
            </span>
            <p className="text-xs text-emerald-800">
              শিক্ষা বোর্ডের মূল স্বাক্ষরযুক্ত আসল পিডিএফ রুটিনটি ড্রাইভে ডাউনলোড করুন।
            </p>
          </div>
          <a
            href={drivePdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center space-x-2 flex-shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>📥 ডাউনলোড করুন PDF রুটিন</span>
          </a>
        </div>
      </section>

      <AdSlot slotId="hsc-routine-middle" format="horizontal" />

      {/* Practical Exam Guidelines & Rules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-xs space-y-3">
          <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2 border-b border-gray-200 pb-2.5">
            <Clock className="w-5 h-5 text-emerald-600" />
            <span>ব্যবহারিক পরীক্ষার সময়সূচি ও দিকনির্দেশনা</span>
          </h3>

          <div className="space-y-2 text-xs sm:text-sm text-gray-700 leading-relaxed">
            <p className="font-bold text-emerald-900 bg-emerald-50 p-3 rounded-xl border border-emerald-200">
              📌 ব্যবহারিক পরীক্ষা শেষ করার শেষ সময়: ১৮/০৭/২০২৭
            </p>
            <p>
              সকল বিষয়ের ব্যবহারিক পরীক্ষা তত্ত্বীয় পরীক্ষা শেষে অনুষ্ঠিত হবে। পরীক্ষার্থীদের নিজ নিজ কেন্দ্রের ভারপ্রাপ্ত কর্মকর্তা বা অধ্যক্ষের কাছ থেকে সময় ও তারিখ জেনে নিতে হবে।
            </p>
          </div>
        </section>

        <section className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-xs space-y-3">
          <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2 border-b border-gray-200 pb-2.5">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <span>পরীক্ষার্থীদের জন্য অতি জরুরি নিয়মাবলী</span>
          </h3>

          <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
            <li className="flex items-start space-x-2">
              <span className="text-emerald-600 font-bold">•</span>
              <span>পরীক্ষা শুরুর নির্দিষ্ট সময় থেকে অন্তত <strong>৩০ মিনিট পূর্বে</strong> কেন্দ্রে আসনে বসতে হবে।</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-emerald-600 font-bold">•</span>
              <span>প্রবেশপত্রে থাকা কেন্দ্র কোড ও রোল নম্বর ওএমআর (OMR) শিটে নির্ভুলভাবে ভরাট করতে হবে।</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-emerald-600 font-bold">•</span>
              <span>পরীক্ষার হলে সাধারণ সাইন্টিফিক ক্যালকুলেটর ব্যবহার করা যাবে (প্রোগ্রামেবল ক্যালকুলেটর নিষিদ্ধ)।</span>
            </li>
          </ul>
        </section>
      </div>

      <AdSlot slotId="hsc-routine-bottom" format="horizontal" />
    </div>
  );
}
