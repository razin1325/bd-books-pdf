import React from 'react';
import { Metadata } from 'next';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'প্রাইভেসি পলিসি | Privacy Policy - BD Edu PDF',
  description: 'আমাদের ওয়েবসাইটের প্রাইভেসি পলিসি ও কুকি ব্যবহার সংক্রান্ত নিয়মাবলী।',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Breadcrumb items={[{ label: 'Privacy Policy' }]} />

      <div className="bg-white p-6 sm:p-10 rounded-2xl border border-gray-200 shadow-xs space-y-6 text-sm sm:text-base text-gray-700 leading-relaxed">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 border-b border-gray-100 pb-3">
          Privacy Policy (প্রাইভেসি পলিসি)
        </h1>

        <p>
          At <strong>BD Edu PDF (শিক্ষা বইমেলা)</strong>, available from our website, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by BD Edu PDF and how we use it.
        </p>

        <h2 className="text-lg font-bold text-gray-900 pt-2">Log Files & Analytics</h2>
        <p>
          BD Edu PDF follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.
        </p>

        <h2 className="text-lg font-bold text-gray-900 pt-2">Google DoubleClick DART Cookie & Google AdSense</h2>
        <p>
          Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet.
        </p>

        <h2 className="text-lg font-bold text-gray-900 pt-2">Consent</h2>
        <p>
          By using our website, you hereby consent to our Privacy Policy and agree to its terms.
        </p>
      </div>
    </div>
  );
}
