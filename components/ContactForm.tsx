'use client';

import React, { useState } from 'react';
import { MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-gray-50 p-6 sm:p-8 rounded-2xl border border-gray-200 space-y-6">
      <div className="flex items-center space-x-2 border-b border-gray-200 pb-3">
        <MessageSquare className="w-5 h-5 text-emerald-600" />
        <h2 className="text-lg font-bold text-gray-900">সরাসরি বার্তা পাঠান (Send a Message)</h2>
      </div>

      {submitted ? (
        <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl text-center space-y-2">
          <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
          <h3 className="text-base font-bold text-emerald-900">ধন্যবাদ! আপনার মেসেজটি আমরা পেয়েছি।</h3>
          <p className="text-xs text-emerald-700">আমাদের সাপোর্ট টিম দ্রুত আপনার সাথে ইমেইলে যোগাযোগ করবে।</p>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider">
                আপনার নাম (Your Name) *
              </label>
              <input
                type="text"
                required
                placeholder="যেমন: আব্দুর রহমান"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm bg-white"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider">
                ইমেইল এড্রেস (Your Email) *
              </label>
              <input
                type="email"
                required
                placeholder="yourname@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm bg-white"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider">
              বিষয় (Subject) *
            </label>
            <input
              type="text"
              required
              placeholder="যেমন: বই সংক্রান্ত প্রশ্ন বা সংশোধন"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm bg-white"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider">
              বার্তা / মেসেজ (Message) *
            </label>
            <textarea
              rows={5}
              required
              placeholder="আপনার বিস্তারিত বার্তা এখানে লিখুন..."
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm bg-white resize-y"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl transition-all shadow-sm hover:shadow flex items-center justify-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>মেসেজ পাঠান (Send Message)</span>
          </button>
        </form>
      )}
    </div>
  );
}
