import React from 'react';
import { Metadata } from 'next';
import Breadcrumb from '@/components/Breadcrumb';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const metadata: Metadata = {
  title: 'যোগাযোগ | Contact Us - BD Edu PDF',
  description: 'আমাদের সাথে যোগাযোগ করুন। যেকোনো প্রয়োজনে বা বই সংক্রান্ত তথ্যের জন্য ইমেইল করুন।',
};

export default function ContactPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Breadcrumb items={[{ label: 'Contact Us' }]} />

      <div className="bg-white p-6 sm:p-10 rounded-2xl border border-gray-200 shadow-xs space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
            যোগাযোগ করুন (Contact Us)
          </h1>
          <p className="text-sm text-gray-600">
            যেকোনো নতুন বইয়ের অনুলিপি যুক্ত করার অনুরোধ বা পরামর্শের জন্য আমাদের সাথে সরাসরি মেসেজ পাঠান।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-emerald-50 rounded-xl flex items-center space-x-3 text-emerald-900">
            <Mail className="w-6 h-6 text-emerald-600" />
            <div>
              <span className="text-2xs text-gray-500 uppercase font-bold block">Email Us</span>
              <span className="text-xs font-semibold">contact@bdedupdf.org</span>
            </div>
          </div>

          <div className="p-4 bg-emerald-50 rounded-xl flex items-center space-x-3 text-emerald-900">
            <Phone className="w-6 h-6 text-emerald-600" />
            <div>
              <span className="text-2xs text-gray-500 uppercase font-bold block">Helpline</span>
              <span className="text-xs font-semibold">+880 1700-000000</span>
            </div>
          </div>

          <div className="p-4 bg-emerald-50 rounded-xl flex items-center space-x-3 text-emerald-900">
            <MapPin className="w-6 h-6 text-emerald-600" />
            <div>
              <span className="text-2xs text-gray-500 uppercase font-bold block">Location</span>
              <span className="text-xs font-semibold">Dhaka, Bangladesh</span>
            </div>
          </div>
        </div>

        <form className="space-y-4 pt-4 border-t border-gray-100">
          <h2 className="text-base font-bold text-gray-900">
            সরাসরি মেসেজ পাঠান (Send Message):
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">আপনার নাম *</label>
              <input
                type="text"
                placeholder="Name"
                className="w-full p-2.5 text-sm bg-gray-50 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">ইমেইল এড্রেস *</label>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2.5 text-sm bg-gray-50 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">বার্তার বিষয়</label>
            <input
              type="text"
              placeholder="Subject"
              className="w-full p-2.5 text-sm bg-gray-50 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">মেসেজ বা পরামর্শ *</label>
            <textarea
              rows={4}
              placeholder="Message..."
              className="w-full p-2.5 text-sm bg-gray-50 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <button
            type="submit"
            className="py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>Send Message</span>
          </button>
        </form>
      </div>
    </div>
  );
}
