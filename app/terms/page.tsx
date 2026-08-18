import React from 'react';
import { Metadata } from 'next';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'ব্যবহারের শর্তাবলী | Terms of Service - BD Edu PDF',
  description: 'শিক্ষা বইমেলা ওয়েবসাইট ব্যবহারের শর্তাবলী ও নিয়মকানুন।',
};

export default function TermsPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Breadcrumb items={[{ label: 'Terms of Service' }]} />

      <div className="bg-white p-6 sm:p-10 rounded-2xl border border-gray-200 shadow-xs space-y-6 text-sm sm:text-base text-gray-700 leading-relaxed">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 border-b border-gray-100 pb-3">
          Terms of Service (ব্যবহারের শর্তাবলী)
        </h1>

        <p>
          Welcome to <strong>BD Edu PDF</strong>! These terms and conditions outline the rules and regulations for the use of BD Edu PDF&apos;s Website.
        </p>

        <h2 className="text-lg font-bold text-gray-900 pt-2">License & Intellectual Property</h2>
        <p>
          Unless otherwise stated, all educational material links provided on this site are gathered from open educational sources and public Google Drive shared folders for academic purposes.
        </p>

        <h2 className="text-lg font-bold text-gray-900 pt-2">User Obligations</h2>
        <p>
          Users must use this platform solely for personal, non-commercial educational reading and learning purposes.
        </p>
      </div>
    </div>
  );
}
