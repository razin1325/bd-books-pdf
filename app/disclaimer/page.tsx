import React from 'react';
import { Metadata } from 'next';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'দায়মুক্তি | Disclaimer - BD Edu PDF',
  description: 'আমাদের ওয়েবসাইট ও পিডিএফ লিংক সংক্রান্ত কপিরাইট দায়মুক্তি ও নির্দেশিকা।',
};

export default function DisclaimerPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Breadcrumb items={[{ label: 'Disclaimer' }]} />

      <div className="bg-white p-6 sm:p-10 rounded-2xl border border-gray-200 shadow-xs space-y-6 text-sm sm:text-base text-gray-700 leading-relaxed">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 border-b border-gray-100 pb-3">
          Disclaimer (দায়মুক্তি ও কপিরাইট পলিসি)
        </h1>

        <p>
          <strong>BD Edu PDF (শিক্ষা বইমেলা)</strong> ওয়েবসাইটটি সম্পূর্ণ শিক্ষামূলক উদ্দেশ্যে তৈরি করা হয়েছে।
        </p>

        <h2 className="text-lg font-bold text-gray-900 pt-2">External PDF Links Policy</h2>
        <p>
          আমরা আমাদের নিজস্ব সার্ভারে কোনো বড় সাইজের কপিরাইটযুক্ত PDF ফাইল সরাসরি হোস্ট করি না। সকল ফাইল গুগল ড্রাইভ (Google Drive) বা ইন্টারনেট থেকে প্রাপ্ত মুক্ত শিক্ষামূলক সোর্স থেকে লিংক করা হয়েছে।
        </p>

        <h2 className="text-lg font-bold text-gray-900 pt-2">DMCA & Content Removal</h2>
        <p>
          আপনি যদি কোনো বইয়ের প্রকৃত কপিরাইট স্বত্বাধিকারী হন এবং মনে করেন যে আপনার কনটেন্ট অনুমতি ছাড়া যুক্ত করা হয়েছে, তবে অনুগ্রহ করে আমাদের Contact পেজের মাধ্যমে ইমেইল করুন। অভিযোগ পাওয়ার ২৪-৪৮ ঘণ্টার মধ্যে আমরা সংশ্লিষ্ট লিংক অপসারন করবো।
        </p>
      </div>
    </div>
  );
}
