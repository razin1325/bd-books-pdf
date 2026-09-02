import React from 'react';
import type { Metadata } from 'next';
import Breadcrumb from '@/components/Breadcrumb';
import ContactForm from '@/components/ContactForm';
import { Mail, MapPin, Clock, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'যোগাযোগ | Contact Us - Dying Field (BD Edu PDF)',
  description: 'Dying Field (BD Edu PDF) টিমের সাথে যোগাযোগ করুন। আপনার যেকোনো মতামত, পরামর্শ, বই যুক্ত করার দাবি বা অভিযোগ আমাদের জানান।',
  openGraph: {
    title: 'যোগাযোগ | Contact Us - Dying Field',
    description: 'Dying Field শিক্ষামূলক পোর্টালে যোগাযোগ করুন।',
  },
};

export default function ContactPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-8">
      <Breadcrumb items={[{ label: 'Contact Us (যোগাযোগ)' }]} />

      <div className="bg-white p-6 sm:p-10 rounded-2xl border border-gray-200 shadow-xs space-y-8">
        {/* Header */}
        <div className="flex items-center space-x-4 text-emerald-700 border-b border-gray-100 pb-6">
          <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Mail className="w-6 h-6 text-emerald-700" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              যোগাযোগ করুন (Contact Us)
            </h1>
            <p className="text-xs sm:text-sm text-emerald-600 font-semibold mt-1">
              Dying Field • BD Edu Digital Library Platform
            </p>
          </div>
        </div>

        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
          আমাদের ওয়েবসাইট সম্পর্কে আপনার কোনো প্রশ্ন, পরামর্শ, অভিযোগ কিংবা নতুন বই বা গাইড যুক্ত করার অনুরোধ থাকলে নিচের মাধ্যমগুলোর সাহায্যে আমাদের সাথে সরাসরি যোগাযোগ করতে পারেন।
        </p>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-emerald-50/60 p-5 rounded-xl border border-emerald-200/80 space-y-2">
            <div className="w-8 h-8 bg-emerald-600 text-white rounded-lg flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold text-gray-900">ইমেইল করুন</h2>
            <p className="text-xs text-gray-600 font-mono font-medium truncate">
              contact@dyingfield.com
            </p>
            <p className="text-3xs text-emerald-700 font-semibold">২৪/৭ ইমেইল সাপোর্ট</p>
          </div>

          <div className="bg-emerald-50/60 p-5 rounded-xl border border-emerald-200/80 space-y-2">
            <div className="w-8 h-8 bg-emerald-600 text-white rounded-lg flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold text-gray-900">ঠিকানা / লোকেশন</h2>
            <p className="text-xs text-gray-600 font-medium">
              ঢাকা, বাংলাদেশ
            </p>
            <p className="text-3xs text-emerald-700 font-semibold">Dhaka 1205, Bangladesh</p>
          </div>

          <div className="bg-emerald-50/60 p-5 rounded-xl border border-emerald-200/80 space-y-2">
            <div className="w-8 h-8 bg-emerald-600 text-white rounded-lg flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold text-gray-900">রেসপন্স টাইম</h2>
            <p className="text-xs text-gray-600 font-medium">
              ২৪ ঘন্টার মধ্যে উত্তর দেওয়া হয়
            </p>
            <p className="text-3xs text-emerald-700 font-semibold">Fast Support Guaranteed</p>
          </div>
        </div>

        {/* Client Form Component */}
        <ContactForm />

        {/* Copyright notice */}
        <div className="flex items-center space-x-2 text-xs text-gray-500 pt-2 border-t border-gray-100">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>
            Dying Field (dyingfield.com) কপিরাইট নীতি ও ডিজিটাল অধিকার সুরক্ষায় প্রতিশ্রুতিবদ্ধ।
          </span>
        </div>
      </div>
    </div>
  );
}
