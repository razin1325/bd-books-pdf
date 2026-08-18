import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import AdSlot from '@/components/AdSlot';
import { DETAILED_COLLEGES_LIST, DIVISION_COLLEGES_REQ } from '@/lib/types';
import { GraduationCap, Award, MapPin, Search, ChevronRight, Building2, Users, CheckCircle2, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'বাংলাদেশের সকল সেরা কলেজের তালিকা ও একাদশ শ্রেণি ভর্তি তথ্য ২০২৬ | All Colleges Directory',
  description: 'ঢাকা, চট্টগ্রাম, রাজশাহী, খুলনা, বরিশাল, সিলেট, রংপুর ও ময়মনসিংহের সকল সরকারি ও বেসরকারি কলেজের EIIN, ন্যূনতম জিপিএ, শিফট, আসন সংখ্যা এবং ভর্তি তথ্য ডিরেক্টরি।',
  openGraph: {
    title: 'বাংলাদেশের সকল সেরা কলেজের তালিকা ও ভর্তি তথ্য ২০২৬ | All Colleges Directory',
    description: 'বাংলাদেশের শীর্ষ সকল সরকারি ও বেসরকারি কলেজের ন্যূনতম জিপিএ, আসন সংখ্যা ও ভর্তি তথ্য।',
  },
};

export default function CollegesMasterPage() {
  return (
    <div className="space-y-8 pb-12">
      <Breadcrumb items={[{ label: 'বাংলাদেশের সকল সেরা কলেজের তালিকা ২০২৬' }]} />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white p-6 sm:p-10 rounded-2xl shadow-md space-y-4">
        <div className="inline-flex items-center space-x-2 bg-emerald-700/50 backdrop-blur-xs px-3.5 py-1 rounded-full text-xs font-semibold text-emerald-100 border border-emerald-400/30">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Bangladesh XI Class All Colleges Directory 2026</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold leading-snug">
          বাংলাদেশের সকল সেরা কলেজের তালিকা, EIIN ও জিপিএ রিকোয়ারমেন্ট ২০২৬
        </h1>

        <p className="text-emerald-100 text-sm sm:text-base leading-relaxed max-w-4xl">
          ঢাকা, চট্টগ্রাম, রাজশাহী, খুলনা, বরিশাল, সিলেট, রংপুর ও ময়মনসিংহের সকল শীর্ষ সরকারি ও বেসরকারি কলেজের EIIN নম্বর, আবেদনের ন্যূনতম জিপিএ, শিফট, বিষয়ভিত্তিক আসন সংখ্যা এবং অফিশিয়াল তথ্যাবলী।
        </p>
      </div>

      <AdSlot slotId="colleges-top" format="horizontal" />

      {/* Division Navigation Shortcuts */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 border-b border-gray-200 pb-2.5">
          <Building2 className="w-5 h-5 text-emerald-700" />
          <h2 className="text-xl font-bold text-gray-900">
            বিভাগ অনুযায়ী কলেজের তালিকা দেখুন (Browse by Division)
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {DIVISION_COLLEGES_REQ.map((div) => (
            <Link
              key={div.slug}
              href={`/college-admission/${div.slug}`}
              className="bg-white p-3 rounded-xl border border-gray-200 hover:border-emerald-600 hover:shadow-sm text-center transition-all group flex flex-col items-center justify-center space-y-1"
            >
              <span className="text-xs font-extrabold text-gray-900 group-hover:text-emerald-700">
                {div.bnName}
              </span>
              <span className="text-3xs text-gray-500 font-semibold">কাট মার্কস দেখুন</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Colleges List */}
      <section className="space-y-5">
        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shadow-xs">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                বাংলাদেশের শীর্ষ সরকারি ও স্বনামধন্য কলেজের তালিকা ({DETAILED_COLLEGES_LIST.length}+ Colleges)
              </h2>
              <p className="text-xs text-gray-500 font-medium">
                নির্দিষ্ট কলেজের বিস্তারিত ভর্তি তথ্য, সিট সংখ্যা ও ফি দেখতে কলেজের নামের ওপর ক্লিক করুন
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {DETAILED_COLLEGES_LIST.map((col) => (
            <div
              key={col.slug}
              className="bg-white border-2 border-gray-200 hover:border-emerald-600 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-2xs font-extrabold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {col.type} • {col.gender}
                    </span>
                    <h3 className="text-lg font-extrabold text-gray-900 pt-1.5 group-hover:text-emerald-700 group-hover:underline">
                      <Link href={`/college/${col.slug}`}>{col.bnName}</Link>
                    </h3>
                    <p className="text-2xs text-gray-500 font-medium">{col.name}</p>
                  </div>
                  {col.eiin && (
                    <span className="text-2xs font-mono font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded">
                      EIIN: {col.eiin}
                    </span>
                  )}
                </div>

                <div className="space-y-1.5 text-xs text-gray-700">
                  <div className="flex items-center space-x-1 text-gray-600">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    <span>{col.location}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-1 pt-2 text-center text-2xs font-semibold">
                    <div className="bg-blue-50 p-1.5 rounded border border-blue-100">
                      <span className="block text-gray-500">বিজ্ঞান</span>
                      <strong className="text-blue-900">{col.scienceGPA}</strong>
                    </div>

                    <div className="bg-emerald-50 p-1.5 rounded border border-emerald-100">
                      <span className="block text-gray-500">ব্যবসায়</span>
                      <strong className="text-emerald-900">{col.commerceGPA}</strong>
                    </div>

                    <div className="bg-purple-50 p-1.5 rounded border border-purple-100">
                      <span className="block text-gray-500">মানবিক</span>
                      <strong className="text-purple-900">{col.artsGPA}</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-bold text-emerald-800 pt-3 border-t border-gray-100">
                <span>মোট আসন: {col.totalSeats}টি</span>
                <Link
                  href={`/college/${col.slug}`}
                  className="inline-flex items-center space-x-1 hover:underline"
                >
                  <span>সম্পূর্ণ ভর্তি গাইড</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <AdSlot slotId="colleges-bottom" format="horizontal" />
    </div>
  );
}
