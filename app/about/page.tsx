import React from 'react';
import { Metadata } from 'next';
import Breadcrumb from '@/components/Breadcrumb';
import { BookOpen, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'আমাদের সম্পর্কে | About Us - BD Edu PDF',
  description: 'বাংলাদেশের শিক্ষার্থীদের বিনামূল্যে পাঠ্যবই ও গাইড বই PDF সরবরাহ করার জন্য শিক্ষা বইমেলা প্ল্যাটফর্ম সম্পর্কে জানুন।',
};

export default function AboutPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Breadcrumb items={[{ label: 'About Us' }]} />

      <div className="bg-white p-6 sm:p-10 rounded-2xl border border-gray-200 shadow-xs space-y-6">
        <div className="flex items-center space-x-3 text-emerald-700">
          <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
            <BookOpen className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              আমাদের সম্পর্কে (About Us)
            </h1>
            <p className="text-xs text-emerald-600 font-semibold">
              শিক্ষা বইমেলা • BD Edu PDF Library
            </p>
          </div>
        </div>

        <div className="prose prose-emerald max-w-none text-gray-700 text-sm sm:text-base leading-relaxed space-y-4">
          <p>
            <strong>শিক্ষা বইমেলা (BD Edu PDF)</strong> বাংলাদেশের সকল শ্রেণির শিক্ষার্থীদের জন্য নির্মিত একটি সম্পূর্ণ ফ্রি ও দ্রুততম শিক্ষামূলক অনলাইন ডিজিটাল ই-বুক পোর্টাল।
          </p>

          <p>
            আমাদের প্রধান লক্ষ্য হলো ১ম শ্রেণি থেকে শুরু করে এসএসসি (Class 9-10) এবং এইচএসসি (HSC) স্তরের সকল সরকারি পাঠ্যবই (NCTB Textbooks), অনুশীলনী গাইড বই এবং প্রস্তুতি মূলক হ্যান্ড নোট এক ক্লিকে শিক্ষার্থীদের হাতের নাগালে পৌঁছে দেওয়া।
          </p>

          <h2 className="text-lg font-bold text-gray-900 pt-2 border-b border-gray-100 pb-2">
            আমাদের লক্ষ্য ও উদ্দেশ্য:
          </h2>

          <ul className="space-y-2">
            <li className="flex items-start space-x-2">
              <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>সহজ ও দ্রুত মোবাইল ফ্রেন্ডলি ইন্টারফেসের মাধ্যমে PDF বই ডাউনলোডের সুবিধা।</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>শ্রেণি ও বিষয়ভিত্তিক সাজানো ক্যাটাগরি সিস্টেম।</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>সরাসরি অনলাইনে ব্রাউজার থেকেই PDF পড়ার (Read Online) সুবিধা।</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>গুগল ড্রাইভ ও হাই-স্পিড সার্ভার লিংকের মাধ্যমে সুরক্ষিত লিংক ব্যবস্থাপনা।</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
