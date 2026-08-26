'use client';

import React from 'react';
import Link from 'next/link';
import {
  Calendar,
  CheckCircle2,
  Users,
  Award,
  BookOpen,
  Check,
  MapPin,
  Phone,
  AlertCircle,
  ExternalLink,
  Sparkles,
  FileText,
  ClipboardList,
} from 'lucide-react';
import BookCard from '@/components/BookCard';
import AdSlot from '@/components/AdSlot';
import Breadcrumb from '@/components/Breadcrumb';
import type { Book } from '@/lib/types';

/* ---------- shared bits ---------- */

function InfoRow({ label, value, accent }: { label: string; value: React.ReactNode; accent?: string }) {
  return (
    <div className={`p-4 rounded-xl border space-y-1 ${accent || 'bg-gray-50 border-gray-200'}`}>
      <span className="text-xs font-bold uppercase block opacity-80">{label}</span>
      <span className="font-extrabold text-base block leading-snug">{value}</span>
    </div>
  );
}

function GpaCell({ v }: { v: string }) {
  return <span className="font-black">{v}</span>;
}

function SubjectList({ title, color, subjects }: { title: string; color: string; subjects: string[] }) {
  return (
    <div className={`p-4 rounded-xl border space-y-2 ${color}`}>
      <h4 className="font-extrabold text-sm sm:text-base border-b border-current/20 pb-2">{title}</h4>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1 text-xs sm:text-sm font-medium list-disc list-inside">
        {subjects.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </div>
  );
}

function GuideBooks({ books, title }: { books: Book[]; title: string }) {
  if (!books.length) return null;
  return (
    <section className="space-y-4">
      <div className="flex items-center space-x-2 border-b border-gray-200 pb-2">
        <BookOpen className="w-5 h-5 text-emerald-600" />
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}

function BackToList() {
  return (
    <div className="text-center">
      <Link
        href="/college-admission"
        className="inline-flex items-center space-x-1 text-sm font-extrabold text-emerald-700 hover:underline"
      >
        <span>সকল কলেজের তালিকা ও ভর্তি নির্দেশিকা</span>
        <ExternalLink className="w-4 h-4" />
      </Link>
    </div>
  );
}

/* =============================================================
   4) ADMISSION PROCESS 2026 — ধাপে ধাপে সম্পূর্ণ গাইড
   ============================================================= */
export const CIRCULAR_PDF_URL =
  'https://files.bangladeshgov.org/pdf/HSC%20(XI%20Class)%20Admission%20Circular%202026.pdf';

export function AdmissionProcessGuide() {
  const dates: [string, string][] = [
    ['অনলাইনে আবেদন শুরু', '২ সেপ্টেম্বর ২০২৬'],
    ['অনলাইনে আবেদন শেষ', '১০ সেপ্টেম্বর ২০২৬'],
    ['পুনঃনিরীক্ষণে ফল পরিবর্তন হলে আবেদন', '১২ ও ১৩ সেপ্টেম্বর ২০২৬'],
    ['ভর্তি ফলাফল প্রকাশ', '১৭ সেপ্টেম্বর ২০২৬'],
    ['প্রাথমিক ভর্তি / নিশ্চায়ন', 'ফল প্রকাশের পর থেকে ১৯ সেপ্টেম্বর রাত ৮টা পর্যন্ত'],
    ['চূড়ান্ত ভর্তি', '২০–২২ সেপ্টেম্বর ২০২৬'],
    ['ক্লাস শুরু', '২৩ সেপ্টেম্বর ২০২৬'],
  ];

  const steps = [
    {
      n: '১',
      color: 'bg-emerald-600',
      title: 'অনলাইনে আবেদন করুন',
      time: '২–১০ সেপ্টেম্বর ২০২৬',
      body: (
        <>
          <p className="text-sm text-gray-700">SSC/সমমান ফলাফল, রোল ও রেজিস্ট্রেশন নম্বর হাতের কাছে রেখে আবেদন সম্পন্ন করুন।</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 list-disc list-inside text-xs sm:text-sm font-medium text-gray-800 pt-1">
            <li>সঠিক বোর্ড নির্বাচন করুন</li>
            <li>রোল ও রেজিস্ট্রেশন নম্বর সঠিকভাবে দিন</li>
            <li>নিজের GPA ও যোগ্যতা অনুযায়ী কলেজ-গ্রুপ বাছুন</li>
            <li>জমা দেওয়ার আগে সব তথ্য যাচাই করুন</li>
            <li>আবেদন সম্পন্ন হলে তথ্য সংরক্ষণ করুন</li>
          </ul>
          <div className="bg-blue-50/60 border border-blue-200 p-4 rounded-xl space-y-1.5">
            <h4 className="font-extrabold text-sm text-blue-950">🎯 কলেজ পছন্দ (Choice) কীভাবে দেবেন?</h4>
            <p className="text-xs text-gray-700 font-medium">একটি কলেজের ওপর নির্ভর না করে একাধিক কলেজ পছন্দ করুন। বিবেচনা করুন: ১) কলেজের অবস্থা ও যাতায়াত ২) আপনার GPA ও ভর্তির সম্ভাবনা ৩) পছন্দের গ্রুপ ৪) শিক্ষা পরিবেশ ৫) ভবিষ্যৎ পড়াশোনার পরিকল্পনা।</p>
          </div>
        </>
      ),
    },
    {
      n: '২',
      color: 'bg-teal-600',
      title: 'ফলাফলের জন্য অপেক্ষা করুন',
      time: '১৭ সেপ্টেম্বর ফলাফল প্রকাশ',
      body: <p className="text-sm text-gray-700">আবেদন শেষে ভর্তি কর্তৃপক্ষ যাচাই ও নির্বাচন প্রক্রিয়া সম্পন্ন করবে। ফলাফলে জানতে পারবেন কোন কলেজ ও গ্রুপে প্রাথমিক নির্বাচন হয়েছে।</p>,
    },
    {
      n: '৩',
      color: 'bg-cyan-600',
      title: 'পুনঃনিরীক্ষণের ফল পরিবর্তন হলে',
      time: '১২ ও ১৩ সেপ্টেম্বর ২০২৬',
      body: <p className="text-sm text-gray-700">যাদের SSC/সমমান ফল পুনঃনিরীক্ষণে পরিবর্তিত হয়েছে, তারা শুধু এই দুই দিনেই প্রয়োজনীয় আবেদন প্রক্রিয়া সম্পন্ন করতে পারবেন।</p>,
    },
    {
      n: '৪',
      color: 'bg-blue-600',
      title: '১৭ সেপ্টেম্বর ভর্তি ফলাফল দেখুন',
      time: '১৭ সেপ্টেম্বর ২০২৬',
      body: (
        <ul className="list-disc list-inside text-xs sm:text-sm font-medium text-gray-800 space-y-1">
          <li>কোন কলেজে নির্বাচন হয়েছে</li>
          <li>কোন গ্রুপ/বিভাগে নির্বাচন হয়েছে</li>
          <li>নির্বাচনের অন্যান্য তথ্য ও পরবর্তী ধাপ</li>
        </ul>
      ),
    },
    {
      n: '৫',
      color: 'bg-indigo-600',
      title: 'প্রাথমিক ভর্তি / নিশ্চায়ন নিশ্চিত করুন',
      time: 'ফল প্রকাশের পর – ১৯ সেপ্টেম্বর রাত ৮টা',
      body: (
        <p className="text-sm text-red-700 font-semibold bg-red-50 border border-red-200 p-3 rounded-xl">
          ⚠️ নির্ধারিত সময়ে নিশ্চায়ন না করলে নির্বাচন বাতিল হওয়ার ঝুঁকি রয়েছে। ফল প্রকাশের পর দেরি না করে নির্দেশনা অনুসরণ করুন।
        </p>
      ),
    },
    {
      n: '৬',
      color: 'bg-purple-600',
      title: 'চূড়ান্ত ভর্তি সম্পন্ন করুন',
      time: '২০–২২ সেপ্টেম্বর ২০২৬',
      body: (
        <>
          <p className="text-sm text-gray-700 pb-1">নির্বাচিত কলেজের নির্দেশনা অনুযায়ী কাগজপত্র ও ফি জমা দিয়ে ভর্তি সম্পন্ন করুন। সাধারণত যা লাগে:</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 list-disc list-inside text-xs sm:text-sm font-medium text-gray-800">
            <li>SSC/সমমান মার্কশিট ও সনদ</li>
            <li>রেজিস্ট্রেশন সংক্রান্ত তথ্য</li>
            <li>জন্মনিবন্ধন/NID তথ্য</li>
            <li>পাসপোর্ট সাইজ ছবি</li>
            <li>অভিভাবকের প্রয়োজনীয় তথ্য</li>
            <li>কলেজ কর্তৃক চাওয়া অন্যান্য কাগজপত্র</li>
          </ul>
          <p className="text-2xs text-gray-500 pt-1">📌 কাগজপত্র প্রতিষ্ঠানভেদে ভিন্ন হতে পারে — চূড়ান্ত ভর্তির আগে কলেজের নির্দেশনা দেখে নিন।</p>
        </>
      ),
    },
    {
      n: '৭',
      color: 'bg-rose-600',
      title: 'ক্লাস শুরু',
      time: '২৩ সেপ্টেম্বর ২০২৬',
      body: <p className="text-sm text-gray-700">ভর্তি শেষে কলেজের নোটিশ, ক্লাস রুটিন ও নির্দেশনা নিয়মিত অনুসরণ করুন।</p>,
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      <Breadcrumb items={[{ label: 'একাদশ শ্রেণি ভর্তি', href: '/college-admission' }, { label: 'কলেজ ভর্তি ২০২৬ ধাপে ধাপে গাইড' }]} />

      {/* Hero */}
      <div className="bg-gradient-to-r from-slate-950 via-emerald-900 to-teal-900 text-white p-6 sm:p-10 rounded-2xl shadow-md space-y-4">
        <div className="inline-flex items-center space-x-2 bg-emerald-700/50 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold text-emerald-100 border border-emerald-400/30">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>XI Class College Admission Process Guide ২০২৬-২৭</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold leading-snug">
          একাদশ শ্রেণির কলেজ ভর্তি ২০২৬: অনলাইন আবেদন থেকে চূড়ান্ত ভর্তি — সম্পূর্ণ ধাপে ধাপে গাইড
        </h1>
        <p className="text-emerald-100 text-sm sm:text-base leading-relaxed max-w-4xl">
          অনলাইনে আবেদন, ফলাফল, নির্বাচিত কলেজে নিশ্চায়ন ও চূড়ান্ত ভর্তি — প্রতিটি ধাপ নির্দিষ্ট সময়ের মধ্যে সম্পন্ন করতে হবে। এখানে ২০২৬-২৭ শিক্ষাবর্ষের পুরো প্রক্রিয়াটি সহজ বাংলায় ধাপে ধাপে তুলে ধরা হলো।
        </p>
        <a
          href={CIRCULAR_PDF_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-500 text-white text-xs sm:text-sm font-extrabold px-4 py-2.5 rounded-xl shadow transition-colors"
        >
          <FileText className="w-4 h-4" />
          <span>HSC (XI Class) Admission Circular 2026 PDF ডাউনলোড</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      <AdSlot slotId="admission-process-top" format="horizontal" />

      {/* Date table */}
      <section className="bg-white border-2 border-emerald-100 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 flex items-center space-x-2 border-b border-gray-200 pb-3">
          <Calendar className="w-6 h-6 text-emerald-700" />
          <span>📅 কলেজ ভর্তি ২০২৬-এর গুরুত্বপূর্ণ তারিখ</span>
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[520px]">
            <thead>
              <tr className="bg-emerald-800 text-white uppercase text-2xs font-bold">
                <th className="p-3 rounded-tl-lg">কার্যক্রম</th>
                <th className="p-3 rounded-tr-lg">তারিখ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-semibold text-gray-800">
              {dates.map(([k, v]) => (
                <tr key={k} className="hover:bg-emerald-50/40">
                  <td className="p-3 font-bold">{k}</td>
                  <td className="p-3 text-emerald-800">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 p-3 rounded-xl font-semibold">
          গুরুত্বপূর্ণ: প্রতিটি ধাপের নির্ধারিত সময়সীমা মেনে চলুন — সময়সীমা পার হলে পরবর্তী ধাপে যাওয়ার সুযোগ নাও থাকতে পারে।
        </p>
      </section>

      {/* Steps */}
      <section className="space-y-4">
        {steps.map((s) => (
          <div key={s.n} className="bg-white border-2 border-gray-100 hover:border-emerald-200 rounded-2xl p-5 sm:p-7 shadow-xs space-y-3 transition-colors">
            <div className="flex items-center justify-between flex-wrap gap-2 border-b border-gray-100 pb-3">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 ${s.color} text-white rounded-xl flex items-center justify-center font-black text-lg flex-shrink-0`}>
                  {s.n}
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold text-gray-900">{s.title}</h2>
              </div>
              <span className="text-2xs sm:text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full whitespace-nowrap">
                {s.time}
              </span>
            </div>
            {s.body}
          </div>
        ))}
      </section>

      {/* One-glance flow */}
      <section className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold flex items-center space-x-2 border-b border-white/15 pb-3">
          <ClipboardList className="w-6 h-6 text-amber-300" />
          <span>📌 এক নজরে পুরো ভর্তি প্রক্রিয়া</span>
        </h2>
        <ol className="space-y-2 text-sm font-semibold">
          {[
            ['২ সেপ্টেম্বর', 'অনলাইন আবেদন শুরু'],
            ['১০ সেপ্টেম্বর', 'অনলাইন আবেদন শেষ'],
            ['১২–১৩ সেপ্টেম্বর', 'পুনঃনিরীক্ষণে ফল পরিবর্তন হলে আবেদন'],
            ['১৭ সেপ্টেম্বর', 'ভর্তি ফলাফল প্রকাশ'],
            ['১৯ সেপ্টেম্বর রাত ৮টা', 'প্রাথমিক ভর্তি/নিশ্চায়নের শেষ সময়'],
            ['২০–২২ সেপ্টেম্বর', 'চূড়ান্ত ভর্তি'],
            ['২৩ সেপ্টেম্বর', 'ক্লাস শুরু'],
          ].map(([d, t], i) => (
            <li key={d} className="flex items-start space-x-3 bg-white/5 border border-white/10 rounded-xl p-3">
              <span className="w-6 h-6 rounded-full bg-amber-400 text-emerald-950 font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span className="font-black text-amber-300 whitespace-nowrap w-40 sm:w-48">{d} →</span>
              <span>{t}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Tips */}
      <section className="bg-white border-2 border-emerald-100 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 flex items-center space-x-2 border-b border-gray-200 pb-3">
          <AlertCircle className="w-6 h-6 text-amber-600" />
          <span>⚠️ শিক্ষার্থীদের জন্য গুরুত্বপূর্ণ পরামর্শ</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            ['শেষ দিনের জন্য ফেলে রাখবেন না', 'ওয়েবসাইটে চাপ বা কারিগরি সমস্যা হতে পারে — আগেই আবেদন সম্পন্ন করুন।'],
            ['পছন্দ দেওয়ার আগে চিন্তা করুন', 'শুধু নামী কলেজ নয়; ফলাফল, অবস্থান ও ভবিষ্যৎ পরিকল্পনা মিলিয়ে তালিকা করুন।'],
            ['আবেদন তথ্য সংরক্ষণ করুন', 'আবেদন নম্বর ও কনফার্মেশন তথ্য নিরাপদে রাখুন।'],
            ['ফলাফলের তারিখ মনে রাখুন', '১৭ সেপ্টেম্বর — ফল প্রকাশের দিন দ্রুত যাচাই করুন।'],
            ['১৯ সেপ্টেম্বরের সময়সীমা', 'রাত ৮টার মধ্যে প্রাথমিক ভর্তি/নিশ্চায়ন শেষ করুন।'],
            ['চূড়ান্ত ভর্তির জন্য প্রস্তুত থাকুন', '২০–২২ সেপ্টেম্বরের জন্য কাগজপত্র আগেই গুছিয়ে রাখুন।'],
          ].map(([t, d]) => (
            <div key={t} className="bg-amber-50/50 border border-amber-100 p-4 rounded-xl space-y-1">
              <h4 className="font-extrabold text-sm text-amber-950">✓ {t}</h4>
              <p className="text-xs text-gray-700 font-medium leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final words */}
      <section className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-100 rounded-2xl p-6 sm:p-8 space-y-3">
        <h2 className="text-xl sm:text-2xl font-extrabold text-emerald-950 flex items-center space-x-2 border-b border-emerald-200 pb-3">
          <Award className="w-6 h-6 text-emerald-700" />
          <span>🎓 শেষ কথা</span>
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          ২০২৬-২৭ শিক্ষাবর্ষের কলেজ ভর্তিতে সফল হতে শুধু আবেদন করাই যথেষ্ট নয় — <strong>ফলাফল, নির্বাচন নিশ্চিতকরণ ও চূড়ান্ত ভর্তি পর্যন্ত প্রতিটি ধাপ সময়মতো</strong> সম্পন্ন করতে হবে। মূল তারিখগুলো: <strong>২ সেপ্টেম্বর আবেদন শুরু • ১০ সেপ্টেম্বর আবেদন শেষ • ১৭ সেপ্টেম্বর ফলাফল • ১৯ সেপ্টেম্বর রাত ৮টা নিশ্চায়নের শেষ সময় • ২০–২২ সেপ্টেম্বর চূড়ান্ত ভর্তি • ২৩ সেপ্টেম্বর ক্লাস শুরু</strong>।
        </p>
      </section>

      <BackToList />
    </div>
  );
}
export function NdcGuide({ books }: { books: Book[] }) {
  const gpaRows: [string, string, string][] = [
    ['বিজ্ঞান', 'বাংলা', '5.00'],
    ['বিজ্ঞান', 'ইংরেজি', '5.00'],
    ['ব্যবসায় শিক্ষা', 'বাংলা', '4.00'],
    ['মানবিক', 'বাংলা', '3.00'],
  ];
  const changeRows: [string, string][] = [
    ['বিজ্ঞান → ব্যবসায় শিক্ষা', '4.25'],
    ['বিজ্ঞান → মানবিক', '3.50'],
    ['ব্যবসায় শিক্ষা → মানবিক', '3.50'],
  ];

  return (
    <div className="space-y-8 pb-12">
      <Breadcrumb items={[{ label: 'একাদশ শ্রেণি ভর্তি', href: '/college-admission' }, { label: 'নটর ডেম কলেজ (NDC)' }]} />

      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-950 via-indigo-900 to-slate-900 text-white p-6 sm:p-10 rounded-2xl shadow-md space-y-4">
        <div className="inline-flex items-center space-x-2 bg-blue-700/50 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold text-blue-100 border border-blue-400/30">
          <Award className="w-4 h-4 text-amber-300" />
          <span>Notre Dame College Admission (২০২৬-২০২৭ শিক্ষাবর্ষ)</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold leading-snug">
          নটর ডেম কলেজ ঢাকা ভর্তি ২০২৬-২০২৭: আবেদন, যোগ্যতা, ভর্তি পরীক্ষা ও সম্পূর্ণ নির্দেশিকা
        </h1>
        <p className="text-blue-100 text-sm sm:text-base leading-relaxed max-w-4xl">
          <strong>নটর ডেম কলেজ, ঢাকা</strong> ২০২৬-২০২৭ শিক্ষাবর্ষে একাদশ শ্রেণিতে শিক্ষার্থী ভর্তির বিজ্ঞপ্তি প্রকাশ করেছে। ঢাকা শিক্ষা বোর্ডের অনুমোদন অনুযায়ী কলেজটি নিজস্ব ভর্তি প্রক্রিয়ায় লিখিত পরীক্ষা, SSC GPA ও মৌখিক পরীক্ষার ফলাফলের ভিত্তিতে চূড়ান্তভাবে শিক্ষার্থী নির্বাচন করবে।
        </p>
      </div>

      <AdSlot slotId="ndc-top" format="horizontal" />

      {/* Key Info */}
      <section className="bg-white border-2 border-blue-100 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-extrabold text-blue-950 flex items-center space-x-2 border-b border-gray-200 pb-3">
          <Calendar className="w-6 h-6 text-blue-700" />
          <span>📌 গুরুত্বপূর্ণ তথ্য এক নজরে</span>
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[480px]">
            <tbody className="divide-y divide-gray-100 font-medium text-gray-800">
              <tr><td className="p-3 font-bold bg-blue-50/50 w-40">শিক্ষাবর্ষ</td><td className="p-3">২০২৬-২০২৭</td></tr>
              <tr><td className="p-3 font-bold bg-blue-50/50">আবেদন শুরু</td><td className="p-3"><GpaCell v="১ সেপ্টেম্বর ২০২৬, রাত ১২:০১ মিনিট" /></td></tr>
              <tr><td className="p-3 font-bold bg-blue-50/50">আবেদন শেষ</td><td className="p-3"><GpaCell v="১০ সেপ্টেম্বর ২০২৬, দুপুর ১২:০০টা" /></td></tr>
              <tr><td className="p-3 font-bold bg-blue-50/50">আবেদন ফি</td><td className="p-3"><GpaCell v="৫০০ টাকা (bKash)" /></td></tr>
              <tr><td className="p-3 font-bold bg-blue-50/50">ভর্তি প্রক্রিয়া</td><td className="p-3">লিখিত পরীক্ষা + মৌখিক পরীক্ষা</td></tr>
              <tr><td className="p-3 font-bold bg-blue-50/50">ওয়েবসাইট</td><td className="p-3 font-mono">ndc.edu.bd</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Application & Fee & Admit */}
      <section className="bg-white border-2 border-blue-100 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-extrabold text-blue-950 flex items-center space-x-2 border-b border-gray-200 pb-3">
          <CheckCircle2 className="w-6 h-6 text-blue-700" />
          <span>📝 অনলাইন আবেদন, ফি ও প্রবেশপত্র</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoRow label="আবেদন শুরু" value="১ সেপ্টেম্বর ২০২৬ দিবাগত রাত ১২:০১ মিনিট" accent="bg-blue-50/60 border-blue-200" />
          <InfoRow label="আবেদন শেষ" value="১০ সেপ্টেম্বর ২০২৬ দুপুর ১২:০০টা" accent="bg-red-50/60 border-red-200" />
        </div>
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-800 space-y-2">
          <p>🌐 আবেদন করতে হবে কলেজের অফিসিয়াল ওয়েবসাইট <strong className="font-mono bg-white px-2 py-0.5 rounded border">ndc.edu.bd</strong> এর মাধ্যমে। আবেদনের আগে ওয়েবসাইটে দেওয়া ভর্তি নির্দেশনা ভালোভাবে পড়ে নিন।</p>
          <p>💳 আবেদন ফি <strong>৫০০ টাকা</strong> — <strong>অফেরতযোগ্য</strong>, শুধুমাত্র <strong>bKash</strong>-এর মাধ্যমে পরিশোধযোগ্য।</p>
          <p>🎫 আবেদন শেষে <strong>ভর্তি পরীক্ষার প্রবেশপত্রের প্রিন্টআউট সংগ্রহ করে সংরক্ষণ করুন</strong> — পরীক্ষার তারিখ, সময় ও কেন্দ্র প্রবেশপত্রেই উল্লেখ থাকবে।</p>
        </div>
      </section>

      {/* GPA Criteria */}
      <section className="bg-white border-2 border-blue-100 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-extrabold text-blue-950 flex items-center space-x-2 border-b border-gray-200 pb-3">
          <CheckCircle2 className="w-6 h-6 text-blue-700" />
          <span>🎓 আবেদনের ন্যূনতম যোগ্যতা (Minimum GPA)</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[420px]">
            <thead>
              <tr className="bg-blue-800 text-white uppercase text-2xs font-bold">
                <th className="p-3 rounded-tl-lg">বিভাগ</th>
                <th className="p-3">মাধ্যম</th>
                <th className="p-3 rounded-tr-lg text-right">ন্যূনতম GPA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-semibold text-gray-800">
              {gpaRows.map(([d, m, g]) => (
                <tr key={`${d}${m}`} className="hover:bg-blue-50/40">
                  <td className="p-3 font-bold">{d}</td>
                  <td className="p-3">{m}</td>
                  <td className="p-3 text-right text-blue-900"><GpaCell v={g} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="font-extrabold text-sm sm:text-base text-gray-900 pt-1">বিভাগ পরিবর্তনের ক্ষেত্রে:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {changeRows.map(([label, g]) => (
            <InfoRow key={label} label={label} value={`GPA ${g}`} accent="bg-amber-50/60 border-amber-200" />
          ))}
        </div>

        <div className="bg-red-50 border border-red-200 p-4 rounded-xl text-xs sm:text-sm text-red-800 space-y-1.5">
          <p className="font-extrabold flex items-center space-x-1.5"><AlertCircle className="w-4 h-4" /><span>বিজ্ঞান বিভাগের জন্য বিশেষ শর্ত:</span></p>
          <ul className="list-disc list-inside space-y-1 font-medium">
            <li>SSC-তে <strong>উচ্চতর গণিত</strong> অবশ্যই থাকতে হবে।</li>
            <li>বাংলা মাধ্যমের শিক্ষার্থীরা ইংরেজি ভার্সনে আবেদন করতে পারবে না।</li>
            <li><strong>&apos;O&apos; Level শিক্ষার্থীদের আবেদন গ্রহণ করা হবে না।</strong></li>
          </ul>
        </div>
      </section>

      {/* Seats */}
      <section className="bg-white border-2 border-blue-100 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-extrabold text-blue-950 flex items-center space-x-2 border-b border-gray-200 pb-3">
          <Users className="w-6 h-6 text-blue-700" />
          <span>🪑 আসন সংখ্যা (মোট ৩,২৯০টি আসন)</span>
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm font-semibold">
          <InfoRow label="বিজ্ঞান (বাংলা)" value="১,৮১০ সিট" accent="bg-blue-50 border-blue-200" />
          <InfoRow label="বিজ্ঞান (ইংরেজি)" value="৩২০ সিট" accent="bg-teal-50 border-teal-200" />
          <InfoRow label="ব্যবসায় শিক্ষা" value="৭৫০ সিট" accent="bg-emerald-50 border-emerald-200" />
          <InfoRow label="মানবিক" value="৪১০ সিট" accent="bg-purple-50 border-purple-200" />
        </div>
      </section>

      {/* Written exam subjects */}
      <section className="bg-white border-2 border-blue-100 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-extrabold text-blue-950 flex items-center space-x-2 border-b border-gray-200 pb-3">
          <BookOpen className="w-6 h-6 text-blue-700" />
          <span>📚 ভর্তি পরীক্ষার বিষয় (SSC ২০২৬ সিলেবাস অনুযায়ী)</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600">সকল যোগ্য প্রার্থীকে লিখিত ভর্তি পরীক্ষায় অংশ নিতে হবে; পরীক্ষার তারিখ ও সময় প্রবেশপত্রে জানানো হবে।</p>
        <div className="space-y-3">
          <SubjectList title="🔬 বিজ্ঞান বিভাগ" color="bg-blue-50/60 border-blue-200 text-blue-950" subjects={['বাংলা', 'ইংরেজি', 'উচ্চতর গণিত', 'পদার্থবিজ্ঞান', 'রসায়ন', 'জীববিজ্ঞান']} />
          <SubjectList title="📖 মানবিক বিভাগ" color="bg-purple-50/60 border-purple-200 text-purple-950" subjects={['বাংলা', 'ইংরেজি', 'ICT', 'সাধারণ জ্ঞান']} />
          <SubjectList title="💼 ব্যবসায় শিক্ষা বিভাগ" color="bg-emerald-50/60 border-emerald-200 text-emerald-950" subjects={['বাংলা', 'ইংরেজি', 'হিসাববিজ্ঞান', 'ICT', 'সাধারণ জ্ঞান']} />
        </div>
        <p className="text-xs sm:text-sm text-amber-800 bg-amber-50 border border-amber-200 p-3 rounded-xl font-semibold">
          ⭐ বিজ্ঞান শাখা থেকে মানবিক বা ব্যবসায় শিক্ষায় আবেদন করলেও <strong>বিজ্ঞান শাখার প্রশ্নেই</strong> পরীক্ষা দিতে হবে। একইভাবে ব্যবসায় শিক্ষা থেকে মানবিকে আবেদন করলে ব্যবসায় শিক্ষা শাখার প্রশ্নে পরীক্ষা হবে।
        </p>
      </section>

      {/* Viva + selection */}
      <section className="bg-white border-2 border-blue-100 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-extrabold text-blue-950 flex items-center space-x-2 border-b border-gray-200 pb-3">
          <Users className="w-6 h-6 text-blue-700" />
          <span>🗣️ মৌখিক পরীক্ষার প্রাথমিক তালিকা ও চূড়ান্ত নির্বাচন</span>
        </h2>
        <p className="text-sm text-gray-700">লিখিত পরীক্ষার পর SSC GPA ও লিখিত ফলাফলের ভিত্তিতে মৌখিক পরীক্ষার জন্য প্রাথমিকভাবে নির্বাচন করা হবে:</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <InfoRow label="বিজ্ঞান — বাংলা মাধ্যম" value="১,৯০০ জন" accent="bg-blue-50 border-blue-200" />
          <InfoRow label="বিজ্ঞান — ইংরেজি মাধ্যম" value="৪০০ জন" accent="bg-teal-50 border-teal-200" />
          <InfoRow label="মানবিক" value="৬০০ জন" accent="bg-purple-50 border-purple-200" />
          <InfoRow label="ব্যবসায় শিক্ষা" value="৮৫০ জন" accent="bg-emerald-50 border-emerald-200" />
        </div>
        <p className="text-xs sm:text-sm text-gray-700 bg-gray-50 border border-gray-200 p-3 rounded-xl">
          এরপর <strong>SSC GPA + লিখিত + মৌখিক</strong> — তিনটির সমন্বয়ে মেধাক্রম অনুযায়ী চূড়ান্ত নির্বাচন করা হবে। আসন খালি থাকলে লিখিত মেধাক্রমে <strong>দ্বিতীয় তালিকা</strong> প্রকাশের সম্ভাবনা রয়েছে (বিস্তারিত ndc.edu.bd ও <strong>NDC Learning</strong> Facebook Page-এ)।
        </p>
      </section>

      {/* Warnings + helpline */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border-2 border-amber-200 rounded-2xl p-6 space-y-2.5 text-xs sm:text-sm">
          <h3 className="font-extrabold text-amber-950 flex items-center space-x-2 text-base"><AlertCircle className="w-5 h-5" /><span>⚠️ বিশেষ সতর্কতা</span></h3>
          <ul className="list-disc list-inside space-y-1.5 text-gray-700 font-medium">
            <li>পুনঃনিরীক্ষণে ফল পরিবর্তন হলে <strong>ফল প্রকাশের ১ দিনের মধ্যে</strong> কলেজ অফিসে সরাসরি যোগাযোগ করতে হবে।</li>
            <li>ভুল/অসত্য তথ্যে ভর্তি হলে ভর্তি <strong>বাতিল</strong> গণ্য হবে; প্রদত্ত অর্থও ফেরতযোগ্য নয়।</li>
            <li>নাম, রোল, রেজিস্ট্রেশন, GPA, বিভাগ ও মাধ্যম সতর্কতার সঙ্গে পূরণ করুন।</li>
            <li>ইউনিফর্ম, ID card ও নিয়মিত ক্লাসে অংশগ্রহণে অনিচ্ছুক এবং <strong>ধূমপায়ী শিক্ষার্থীদের</strong> আবেদন না করার জন্য অনুরোধ।</li>
          </ul>
        </div>
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 space-y-2.5 text-xs sm:text-sm">
          <h3 className="font-extrabold text-blue-950 flex items-center space-x-2 text-base"><Phone className="w-5 h-5" /><span>📞 হেল্পলাইন (সকাল ৮টা – বিকাল ৪টা)</span></h3>
          <div className="flex flex-wrap gap-2 font-mono font-bold text-blue-900">
            <span className="bg-blue-50 border border-blue-200 px-3 py-1 rounded-lg">০১৯৩৩৩৩২২৩০</span>
            <span className="bg-blue-50 border border-blue-200 px-3 py-1 rounded-lg">০১৯৩৩৩৩২২৩১</span>
            <span className="bg-blue-50 border border-blue-200 px-3 py-1 rounded-lg">০১৯৩৩৩৩২২৩২</span>
          </div>
          <p className="text-gray-700 font-medium pt-1">🌐 অফিসিয়াল ওয়েবসাইট: <strong className="font-mono">ndc.edu.bd</strong> • Facebook: <strong>NDC Learning</strong></p>
        </div>
      </section>

      {/* Checklist */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-100 rounded-2xl p-6 sm:p-8 space-y-3">
        <h2 className="text-xl sm:text-2xl font-extrabold text-blue-950 flex items-center space-x-2 border-b border-blue-200 pb-3">
          <Check className="w-6 h-6 text-blue-700" />
          <span>✅ শিক্ষার্থীদের করণীয় (Checklist)</span>
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1.5 text-xs sm:text-sm font-medium text-gray-800">
          {[
            '১ সেপ্টেম্বর থেকে অনলাইনে আবেদন',
            '১০ সেপ্টেম্বর দুপুর ১২টার আগে আবেদন সম্পন্ন',
            '৫০০ টাকা ফি bKash-এ পরিশোধ',
            'প্রবেশপত্র সংগ্রহ ও তারিখ-সময় যাচাই',
            'SSC ২০২৬ সিলেবাস অনুযায়ী প্রস্তুতি',
            'লিখিত পরীক্ষায় অংশগ্রহণ',
            'মৌখিক তালিকা দেখে ভাইভায় অংশগ্রহণ',
            'চূড়ান্ত ও দ্বিতীয় তালিকা অনুসরণ',
          ].map((t) => (
            <li key={t} className="flex items-start space-x-2">
              <Check className="w-4 h-4 text-blue-700 flex-shrink-0 mt-0.5" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </section>

      <GuideBooks books={books} title="নটর ডেম কলেজ ভর্তি প্রস্তুতি গাইড ও বোর্ড বই PDF" />
      <BackToList />
    </div>
  );
}

/* =============================================================
   2) HOLY CROSS COLLEGE — ২০২৬-২০২৭
   ============================================================= */
export function HolyCrossGuide({ books }: { books: Book[] }) {
  return (
    <div className="space-y-8 pb-12">
      <Breadcrumb items={[{ label: 'একাদশ শ্রেণি ভর্তি', href: '/college-admission' }, { label: 'হলিক্রস কলেজ (Holy Cross)' }]} />

      {/* Hero */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-6 sm:p-10 rounded-2xl shadow-md space-y-4">
        <div className="inline-flex items-center space-x-2 bg-emerald-700/50 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold text-emerald-100 border border-emerald-400/30">
          <Award className="w-4 h-4 text-amber-300" />
          <span>Holy Cross College Admission Notice (২০২৬-২০২৭ শিক্ষাবর্ষ)</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold leading-snug">
          হলি ক্রস কলেজ ভর্তি ২০২৬: আবেদন, যোগ্যতা, ভর্তি পরীক্ষা ও সম্পূর্ণ নির্দেশিকা
        </h1>
        <p className="text-emerald-100 text-sm sm:text-base leading-relaxed max-w-4xl">
          ঢাকার তেজগাঁওয়ে অবস্থিত ক্যাথলিক উচ্চমাধ্যমিক প্রতিষ্ঠান <strong>হলি ক্রস কলেজ</strong> (প্রতিষ্ঠা ১৯৫০, Sisters of the Holy Cross) ২০২৬-২০২৭ শিক্ষাবর্ষে <strong>বিজ্ঞান, মানবিক ও ব্যবসায় শিক্ষা</strong> — তিন বিভাগে ছাত্রী ভর্তি করবে। নির্বাচন হবে <strong>SSC GPA ও লিখিত ভর্তি পরীক্ষার ফলাফলের</strong> ভিত্তিতে।
        </p>
      </div>

      <AdSlot slotId="holycross-top" format="horizontal" />

      {/* Summary table */}
      <section className="bg-white border-2 border-emerald-100 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-extrabold text-emerald-950 flex items-center space-x-2 border-b border-gray-200 pb-3">
          <Calendar className="w-6 h-6 text-emerald-600" />
          <span>📋 ভর্তি ২০২৬-এর সংক্ষিপ্ত তথ্য</span>
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[480px]">
            <tbody className="divide-y divide-gray-100 font-medium text-gray-800">
              <tr><td className="p-3 font-bold bg-emerald-50/60 w-44">EIIN</td><td className="p-3 font-mono font-bold">131962</td></tr>
              <tr><td className="p-3 font-bold bg-emerald-50/60">আবেদন শুরু</td><td className="p-3"><GpaCell v="৫ সেপ্টেম্বর ২০২৬" /></td></tr>
              <tr><td className="p-3 font-bold bg-emerald-50/60">আবেদন শেষ</td><td className="p-3"><GpaCell v="১০ সেপ্টেম্বর ২০২৬" /></td></tr>
              <tr><td className="p-3 font-bold bg-emerald-50/60">ভর্তি পরীক্ষা</td><td className="p-3">সেপ্টেম্বর ২০২৬</td></tr>
              <tr><td className="p-3 font-bold bg-emerald-50/60">ফলাফল প্রকাশ</td><td className="p-3"><GpaCell v="২৫ সেপ্টেম্বর ২০২৬" /></td></tr>
              <tr><td className="p-3 font-bold bg-emerald-50/60">মোট আসন</td><td className="p-3"><GpaCell v="১,৩১০টি" /></td></tr>
              <tr><td className="p-3 font-bold bg-emerald-50/60">আবেদন ফি</td><td className="p-3"><GpaCell v="৪০০ টাকা" /></td></tr>
              <tr><td className="p-3 font-bold bg-emerald-50/60">ওয়েবসাইট</td><td className="p-3 font-mono">www.hcc.edu.bd</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Application + fee */}
      <section className="bg-white border-2 border-emerald-100 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-extrabold text-emerald-950 flex items-center space-x-2 border-b border-gray-200 pb-3">
          <CheckCircle2 className="w-6 h-6 text-emerald-600" />
          <span>📝 অনলাইন আবেদন ও আবেদন ফি</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoRow label="আবেদন শুরু" value="৫ সেপ্টেম্বর ২০২৬" accent="bg-emerald-50/60 border-emerald-200" />
          <InfoRow label="আবেদন শেষ" value="১০ সেপ্টেম্বর ২০২৬" accent="bg-red-50/60 border-red-200" />
        </div>
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-800 space-y-2">
          <p>🌐 আবেদন করতে হবে <strong className="font-mono bg-white px-2 py-0.5 rounded border">www.hcc.edu.bd</strong> এর <em>Admissions &gt; Admission Application</em> অপশন থেকে।</p>
          <p>💰 আবেদন ফি <strong>৪০০ টাকা</strong> — নির্ধারিত পদ্ধতিতে পরিশোধ করে আবেদন সফলভাবে সম্পন্ন হয়েছে কি না নিশ্চিত করুন।</p>
        </div>
      </section>

      {/* Groups + seats */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border-2 border-emerald-100 rounded-2xl p-6 space-y-3 shadow-xs">
          <h3 className="text-lg font-extrabold text-emerald-950 border-b border-gray-200 pb-2">🎓 ভর্তিযোগ্য বিভাগ</h3>
          <ul className="space-y-2 text-sm font-semibold text-gray-800">
            <li className="flex items-start space-x-2"><Check className="w-4 h-4 text-blue-700 mt-0.5 flex-shrink-0" /><span>বিজ্ঞান (Science)</span></li>
            <li className="flex items-start space-x-2"><Check className="w-4 h-4 text-purple-700 mt-0.5 flex-shrink-0" /><span>মানবিক (Humanities)</span></li>
            <li className="flex items-start space-x-2"><Check className="w-4 h-4 text-emerald-700 mt-0.5 flex-shrink-0" /><span>ব্যবসায় শিক্ষা (Business Studies)</span></li>
          </ul>
        </div>
        <div className="bg-white border-2 border-emerald-100 rounded-2xl p-6 space-y-3 shadow-xs">
          <h3 className="text-lg font-extrabold text-emerald-950 border-b border-gray-200 pb-2 flex items-center space-x-2"><Users className="w-5 h-5 text-emerald-600" />🪑 মোট আসন</h3>
          <InfoRow label="২০২৬-২০২৭ শিক্ষাবর্ষ" value="১,৩১০টি আসন" accent="bg-emerald-50/60 border-emerald-200" />
          <p className="text-2xs text-gray-500">বিভাগভিত্তিক আসন বিন্যাসের জন্য কলেজের চূড়ান্ত নির্দেশনা অনুসরণ করুন।</p>
        </div>
      </section>

      {/* Selection + reminders */}
      <section className="bg-white border-2 border-emerald-100 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-extrabold text-emerald-950 flex items-center space-x-2 border-b border-gray-200 pb-3">
          <Award className="w-6 h-6 text-emerald-600" />
          <span>📊 নির্বাচন প্রক্রিয়া ও গুরুত্বপূর্ণ মন্তব্য</span>
        </h2>
        <p className="text-sm text-gray-700">
          শিক্ষার্থী নির্বাচন করা হবে <strong>SSC-তে প্রাপ্ত GPA এবং লিখিত ভর্তি পরীক্ষার ফলাফলের</strong> ভিত্তিতে — অর্থাৎ শুধু ভালো GPA যথেষ্ট নয়, ভর্তি পরীক্ষায় ভালো ফলও জরুরি।
        </p>
        <ul className="space-y-2 text-xs sm:text-sm font-medium text-gray-800">
          {[
            'শেষ মুহূর্তের বদলে আগেই আবেদন সম্পন্ন করুন (শেষ তারিখ ১০ সেপ্টেম্বর)।',
            'SSC ও ব্যক্তিগত তথ্য সঠিকভাবে পূরণ করুন।',
            '৪০০ টাকা ফি পরিশোধ ও আবেদন সম্পন্ন হওয়া নিশ্চিত করুন।',
            'SSC সিলেবাসের গুরুত্বপূর্ণ অধ্যায়গুলোর নিয়মিত প্রস্তুতি নিন।',
            'তারিখ/সময়/কেন্দ্র পরিবর্তনের খবরের জন্য অফিসিয়াল নোটিশ অনুসরণ করুন।',
          ].map((t) => (
            <li key={t} className="flex items-start space-x-2 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
              <Check className="w-4 h-4 text-emerald-700 mt-0.5 flex-shrink-0" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-100 rounded-2xl p-6 sm:p-8 text-xs sm:text-sm text-emerald-950 font-medium">
        <strong className="block text-base mb-1">🌐 অফিসিয়াল ভর্তি ওয়েবসাইট: www.hcc.edu.bd</strong>
        ভর্তি সংক্রান্ত যেকোনো পরিবর্তন বা সংশোধনের ক্ষেত্রে কলেজ কর্তৃপক্ষের সর্বশেষ বিজ্ঞপ্তিই চূড়ান্ত।
      </div>

      <GuideBooks books={books} title="হলিক্রস কলেজ ভর্তি প্রস্তুতি বই ও সমাধান PDF" />
      <BackToList />
    </div>
  );
}

/* =============================================================
   3) ST. JOSEPH HIGHER SECONDARY SCHOOL — ২০২৬-২০২৭
   ============================================================= */
export function StJosephGuide({ books }: { books: Book[] }) {
  const gpaRows: [string, string, string][] = [
    ['বিজ্ঞান', 'বাংলা', '5.00'],
    ['বিজ্ঞান', 'ইংরেজি', '5.00'],
    ['ব্যবসায় শিক্ষা', 'বাংলা', '3.50'],
    ['মানবিক', 'বাংলা', '3.00'],
  ];
  const changeRows: [string, string][] = [
    ['বিজ্ঞান → ব্যবসায় শিক্ষা', '4.00'],
    ['বিজ্ঞান → মানবিক', '4.00'],
    ['ব্যবসায় শিক্ষা → মানবিক', '3.50'],
  ];

  return (
    <div className="space-y-8 pb-12">
      <Breadcrumb items={[{ label: 'একাদশ শ্রেণি ভর্তি', href: '/college-admission' }, { label: 'সেন্ট যোসেফ হায়ার সেকেন্ডারি স্কুল' }]} />

      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white p-6 sm:p-10 rounded-2xl shadow-md space-y-4">
        <div className="inline-flex items-center space-x-2 bg-blue-700/50 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold text-blue-100 border border-blue-400/30">
          <Award className="w-4 h-4 text-amber-300" />
          <span>St. Joseph Higher Secondary School Admission ২০২৬-২০২৭</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold leading-snug">
          সেন্ট যোসেফ হায়ার সেকেন্ডারি স্কুল ভর্তি ২০২৬: আবেদন, যোগ্যতা, আসন ও ভর্তি পরীক্ষা
        </h1>
        <p className="text-blue-100 text-sm sm:text-base leading-relaxed max-w-4xl flex items-start space-x-2">
          <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <span>
            ৯৭ আসাদ অ্যাভিনিউ, মোহাম্মদপুর, ঢাকা-১২০৭-এ অবস্থিত প্রতিষ্ঠানটি ঢাকা শিক্ষা বোর্ডের অনুমোদনে <strong>শুধু ছাত্রদের</strong> বিজ্ঞান, ব্যবসায় শিক্ষা ও মানবিক বিভাগে ভর্তি করবে — লিখিত পরীক্ষা, মৌখিক পরীক্ষা ও SSC ফলাফলের ভিত্তিতে।
          </span>
        </p>
      </div>

      <AdSlot slotId="stjoseph-top" format="horizontal" />

      {/* Key info */}
      <section className="bg-white border-2 border-blue-100 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-extrabold text-blue-950 flex items-center space-x-2 border-b border-gray-200 pb-3">
          <Calendar className="w-6 h-6 text-blue-700" />
          <span>📅 গুরুত্বপূর্ণ তারিখ ও তথ্য</span>
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[520px]">
            <tbody className="divide-y divide-gray-100 font-medium text-gray-800">
              <tr><td className="p-3 font-bold bg-blue-50/50 w-52">EIIN / Codes</td><td className="p-3 font-mono font-bold">108259 • S-1204 • C-1899</td></tr>
              <tr><td className="p-3 font-bold bg-blue-50/50">অনলাইন আবেদন শুরু</td><td className="p-3"><GpaCell v="২ সেপ্টেম্বর ২০২৬" /></td></tr>
              <tr><td className="p-3 font-bold bg-blue-50/50">অনলাইন আবেদন শেষ</td><td className="p-3"><GpaCell v="৭ সেপ্টেম্বর ২০২৬" /></td></tr>
              <tr><td className="p-3 font-bold bg-blue-50/50">সময়সূচি ও আসনবিন্যাস</td><td className="p-3">১০ সেপ্টেম্বর ২০২৬, দুপুর ১২টা</td></tr>
              <tr><td className="p-3 font-bold bg-blue-50/50">লিখিত ও মৌখিক পরীক্ষা</td><td className="p-3"><GpaCell v="১১ ও ১২ সেপ্টেম্বর ২০২৬" /></td></tr>
              <tr><td className="p-3 font-bold bg-blue-50/50">আবেদন ফি</td><td className="p-3"><GpaCell v="৫০০ টাকা (অফেরতযোগ্য)" /></td></tr>
              <tr><td className="p-3 font-bold bg-blue-50/50">আবেদন ওয়েবসাইট</td><td className="p-3 font-mono">www.sjsadmission.com / www.sjs.edu.bd</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 p-3 rounded-xl font-semibold">⚠️ জরুরি প্রয়োজনে পরীক্ষার তারিখ পরিবর্তিত হতে পারে — অফিসিয়াল ওয়েবসাইট, Facebook ও নোটিশ বোর্ড অনুসরণ করুন।</p>
      </section>

      {/* Apply + fee + admit */}
      <section className="bg-white border-2 border-blue-100 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-extrabold text-blue-950 flex items-center space-x-2 border-b border-gray-200 pb-3">
          <CheckCircle2 className="w-6 h-6 text-blue-700" />
          <span>📝 আবেদন, ফি ও প্রবেশপত্র</span>
        </h2>
        <p className="text-sm text-gray-700">আবেদন করতে হবে <strong className="font-mono">sjsadmission.com</strong> অথবা <strong className="font-mono">sjs.edu.bd</strong> থেকে; তথ্য পূরণে ব্যবহার করুন <strong>SSC প্রবেশপত্র ও একাডেমিক ট্রান্সক্রিপ্ট</strong>।</p>
        <div className="flex flex-wrap gap-2 text-xs font-bold">
          {['bKash', 'Nagad', 'Rocket', 'Nexus', 'MTBL', 'Visa Card', 'Master Card'].map((m) => (
            <span key={m} className="bg-blue-50 border border-blue-200 text-blue-900 px-3 py-1 rounded-lg">{m}</span>
          ))}
        </div>
        <p className="text-xs sm:text-sm text-gray-700 bg-gray-50 border border-gray-200 p-3 rounded-xl">
          🎫 আবেদন শেষে <strong>প্রবেশপত্র ডাউনলোড করে প্রিন্ট কপি রাখুন</strong>; সমস্যা হলে ই-মেইল করুন: <a href="mailto:helpline@sjs.edu.bd" className="font-bold text-blue-800 underline">helpline@sjs.edu.bd</a>
        </p>
      </section>

      {/* GPA */}
      <section className="bg-white border-2 border-blue-100 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-extrabold text-blue-950 flex items-center space-x-2 border-b border-gray-200 pb-3">
          <CheckCircle2 className="w-6 h-6 text-blue-700" />
          <span>🎓 ন্যূনতম যোগ্যতা (Minimum GPA)</span>
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[420px]">
            <thead>
              <tr className="bg-blue-800 text-white uppercase text-2xs font-bold">
                <th className="p-3 rounded-tl-lg">বিভাগ</th>
                <th className="p-3">মাধ্যম/ভার্সন</th>
                <th className="p-3 rounded-tr-lg text-right">ন্যূনতম GPA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-semibold text-gray-800">
              {gpaRows.map(([d, m, g]) => (
                <tr key={`${d}${m}`} className="hover:bg-blue-50/40">
                  <td className="p-3 font-bold">{d}</td>
                  <td className="p-3">{m}</td>
                  <td className="p-3 text-right text-blue-900"><GpaCell v={g} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {changeRows.map(([label, g]) => (
            <InfoRow key={label} label={label} value={`GPA ${g}`} accent="bg-amber-50/60 border-amber-200" />
          ))}
        </div>
        <div className="bg-red-50 border border-red-200 p-4 rounded-xl text-xs sm:text-sm text-red-800 font-medium">
          ⚠️ বিজ্ঞান বিভাগে আবেদনে SSC-তে <strong>উচ্চতর গণিত এবং জীববিজ্ঞান</strong> — দুটিই থাকতে হবে।
        </div>
      </section>

      {/* Seats */}
      <section className="bg-white border-2 border-blue-100 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-extrabold text-blue-950 flex items-center space-x-2 border-b border-gray-200 pb-3">
          <Users className="w-6 h-6 text-blue-700" />
          <span>🪑 আসন সংখ্যা (মোট ৬৮০টি আসন)</span>
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <InfoRow label="বিজ্ঞান (বাংলা)" value="৪৪০ সিট" accent="bg-blue-50 border-blue-200" />
          <InfoRow label="বিজ্ঞান (ইংরেজি)" value="৯০ সিট" accent="bg-teal-50 border-teal-200" />
          <InfoRow label="ব্যবসায় শিক্ষা" value="৮০ সিট" accent="bg-emerald-50 border-emerald-200" />
          <InfoRow label="মানবিক" value="৭০ সিট" accent="bg-purple-50 border-purple-200" />
        </div>
      </section>

      {/* Exam subjects */}
      <section className="bg-white border-2 border-blue-100 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-extrabold text-blue-950 flex items-center space-x-2 border-b border-gray-200 pb-3">
          <BookOpen className="w-6 h-6 text-blue-700" />
          <span>📚 ভর্তি পরীক্ষার বিষয় (SSC ২০২৬ সিলেবাস)</span>
        </h2>
        <div className="space-y-3">
          <SubjectList title="🔬 বিজ্ঞান বিভাগ" color="bg-blue-50/60 border-blue-200 text-blue-950" subjects={['বাংলা', 'ইংরেজি', 'পদার্থবিজ্ঞান', 'রসায়ন', 'উচ্চতর গণিত', 'জীববিজ্ঞান']} />
          <SubjectList title="💼 ব্যবসায় শিক্ষা বিভাগ" color="bg-emerald-50/60 border-emerald-200 text-emerald-950" subjects={['বাংলা', 'ইংরেজি', 'গণিত', 'হিসাববিজ্ঞান', 'ব্যবসায় উদ্যোগ', 'ICT']} />
          <SubjectList title="📖 মানবিক বিভাগ" color="bg-purple-50/60 border-purple-200 text-purple-950" subjects={['বাংলা', 'ইংরেজি', 'গণিত', 'সাধারণ বিজ্ঞান', 'ICT', 'বাংলাদেশ ও বিশ্বপরিচয়']} />
        </div>
        <p className="text-xs sm:text-sm text-amber-800 bg-amber-50 border border-amber-200 p-3 rounded-xl font-semibold">
          ⭐ বিভাগ পরিবর্তনে: বিজ্ঞান → ব্যবসায়/মানবিক হলে <strong>বিজ্ঞানের প্রশ্নে</strong>; ব্যবসায় শিক্ষা → মানবিক হলে <strong>ব্যবসায় শিক্ষার প্রশ্নে</strong> পরীক্ষা দিতে হবে।
        </p>
      </section>

      {/* Exam day */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border-2 border-emerald-100 rounded-2xl p-6 space-y-2.5 text-xs sm:text-sm">
          <h3 className="font-extrabold text-emerald-950 text-base border-b border-gray-200 pb-2">🧾 পরীক্ষার দিন যা সঙ্গে রাখবেন</h3>
          <ul className="list-disc list-inside space-y-1 font-medium text-gray-800">
            <li>ভর্তি পরীক্ষার মূল প্রবেশপত্র</li>
            <li>SSC পরীক্ষার মূল প্রবেশপত্র</li>
            <li>একাডেমিক ট্রান্সক্রিপ্ট/মার্কশিট</li>
            <li>কলম, পেন্সিল, রাবার, স্কেল</li>
            <li>নন-প্রোগ্রামেবল সায়েন্টিফিক ক্যালকুলেটর</li>
          </ul>
          <p className="text-amber-800 font-semibold pt-1">⏰ পরীক্ষা শুরুর <strong>অন্তত ৩০ মিনিট আগে</strong> ক্যাম্পাসে উপস্থিত থাকতে হবে।</p>
        </div>
        <div className="bg-white border-2 border-blue-100 rounded-2xl p-6 space-y-2.5 text-xs sm:text-sm">
          <h3 className="font-extrabold text-blue-950 text-base border-b border-gray-200 pb-2">⚠️ আবেদন বাতিল হওয়ার কারণ</h3>
          <ul className="list-disc list-inside space-y-1 font-medium text-gray-800">
            <li>ভুল তথ্য প্রদান</li>
            <li>অসম্পূর্ণ আবেদনপত্র</li>
            <li>একই শিক্ষার্থীর একাধিক আবেদন</li>
          </ul>
          <h4 className="font-extrabold text-blue-950 text-base pt-1">🏫 কলেজের গুরুত্বপূর্ণ নিয়ম</h4>
          <ul className="list-disc list-inside space-y-1 font-medium text-gray-800">
            <li>নির্ধারিত ইউনিফর্ম ও ID card বাধ্যতামূলক</li>
            <li>ক্যাম্পাসে <strong>মোবাইল ফোন সম্পূর্ণ নিষিদ্ধ</strong></li>
            <li>ক্লাস, ব্যবহারিক ও শ্রেণি পরীক্ষায় নিয়মিত অংশগ্রহণ</li>
            <li>ধূমপায়ীদের আবেদন করার প্রয়োজন নেই</li>
          </ul>
        </div>
      </section>

      {/* Helpline */}
      <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 space-y-2 text-xs sm:text-sm">
        <h3 className="font-extrabold text-blue-950 flex items-center space-x-2 text-base"><Phone className="w-5 h-5" /><span>📞 হেল্পলাইন (সকাল ৯টা – সন্ধ্যা ৬টা)</span></h3>
        <div className="flex flex-wrap gap-2 font-mono font-bold text-blue-900">
          <span className="bg-blue-50 border border-blue-200 px-3 py-1 rounded-lg">০১৮০৭৯৫৮৯৯৯</span>
          <span className="bg-blue-50 border border-blue-200 px-3 py-1 rounded-lg">০১৩৬৯০১১৮৩৭৯</span>
        </div>
        <p className="text-gray-700 font-medium">✉️ helpline@sjs.edu.bd • ফলাফল প্রকাশিত হবে অফিসিয়াল Website, Facebook ও Notice Board-এ।</p>
      </div>

      <GuideBooks books={books} title="সেন্ট যোসেফ ভর্তি প্রস্তুতি ও এইচএসসি বই PDF" />
      <BackToList />
    </div>
  );
}
