import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import BookCard from '@/components/BookCard';
import AdSlot from '@/components/AdSlot';
import { getBooksByClass } from '@/lib/data';
import { TOP_DHAKA_COLLEGES_REQ } from '@/lib/types';
import { GraduationCap, Award, BookOpen, ChevronRight, FileText, CheckCircle2, MapPin, Sparkles, Building2, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'ঢাকার সেরা ৩০টি কলেজ ভর্তি ও জিপিএ রিকোয়ারমেন্ট ২০২৬ | NDC, Holy Cross & Cut Marks',
  description: 'ঢাকার সেরা ৩০টি সরকারি ও বেসরকারি কলেজের বিজ্ঞান, মানবিক ও ব্যবসায় শিক্ষা বিভাগের ন্যূনতম জিপিএ, শিফট, আসন সংখ্যা ও কাট মার্কস টেবিল ২০২৬। নটর ডেম, হলিক্রস, সেন্ট জোসেফ ভর্তি নির্দেশিকা।',
  openGraph: {
    title: 'ঢাকার সেরা ৩০টি কলেজ ভর্তি ও জিপিএ রিকোয়ারমেন্ট ২০২৬ | NDC, Holy Cross & Cut Marks',
    description: 'ঢাকার সেরা ৩০টি কলেজের বিজ্ঞান, মানবিক ও ব্যবসায় শিক্ষা বিভাগের ন্যূনতম জিপিএ, শিফট ও আসন সংখ্যা টেবিল ২০২৬।',
  },
};

const FEATURED_COLLEGES = [
  {
    name: 'নটর ডেম কলেজ (NDC)',
    slug: 'ndc',
    bnDesc: 'ভর্তি পরীক্ষার প্রশ্নের মানবণ্টন, সিলেবাস, বিষয়ভিত্তিক আসন সংখ্যা এবং অতীতের কাট মার্কস।',
    badge: 'লিখিত ও ভাইভা পরীক্ষা',
    color: 'from-blue-800 to-indigo-950',
    borderColor: 'border-blue-300',
  },
  {
    name: 'হলিক্রস কলেজ (Holy Cross)',
    slug: 'holy-cross',
    bnDesc: 'মেয়েদের সেরা কলেজ হলিক্রস ভর্তি পরীক্ষার নিয়মাবলী, আসন সংখ্যা এবং গাইড লাইন।',
    badge: 'শুধুমাত্র মেয়েদের জন্য',
    color: 'from-emerald-800 to-teal-950',
    borderColor: 'border-emerald-300',
  },
  {
    name: 'সেন্ট জোসেফ কলেজ (St. Joseph)',
    slug: 'st-joseph',
    bnDesc: 'সেন্ট জোসেফ হায়ার সেকন্ডারি স্কুলের লিখিত পরীক্ষা, জিপিএ শর্ত ও ভর্তি নির্দেশিকা।',
    badge: 'লিখিত ও মেধা তালিকা',
    color: 'from-amber-800 to-orange-950',
    borderColor: 'border-amber-300',
  },
  {
    name: 'অনলাইনে কলেজ আবেদন নিয়ম',
    slug: 'how-to-apply',
    bnDesc: 'xiclassadmission.gov.bd ওয়েবসাইটে কীভাবে ১০টি কলেজ পছন্দক্রম অনুযায়ী আবেদন করবেন।',
    badge: 'আবেদন গাইডলাইন',
    color: 'from-purple-800 to-indigo-900',
    borderColor: 'border-purple-300',
  },
  {
    name: '৮ বিভাগের কলেজের কাট মার্কস',
    slug: 'requirements-gpa-cut-marks',
    bnDesc: 'ঢাকা, চট্টগ্রাম, রাজশাহী সহ ৮ বিভাগের সেরা কলেজগুলোর সর্বনিম্ন জিপিএ ও কাট মার্কস টেবিল।',
    badge: 'GPA & Cut Marks 2026',
    color: 'from-rose-800 to-red-950',
    borderColor: 'border-rose-300',
  },
];

export default async function CollegeAdmissionHubPage() {
  const sscBooks = await getBooksByClass('ssc');
  const hscBooks = await getBooksByClass('hsc');
  const admissionBooks = [...sscBooks, ...hscBooks].slice(0, 6);

  return (
    <div className="space-y-10 pb-12">
      <Breadcrumb items={[{ label: 'একাদশ শ্রেণি ও সেরা ৩০টি কলেজ ভর্তি ২০২৬' }]} />

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-emerald-900 via-teal-800 to-blue-900 text-white rounded-2xl p-6 sm:p-10 shadow-md relative overflow-hidden space-y-4">
        <div className="inline-flex items-center space-x-2 bg-emerald-700/60 backdrop-blur-xs px-3.5 py-1 rounded-full text-xs font-semibold text-emerald-100 border border-emerald-500/30">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>XI Class College Admission Portal 2026</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-snug max-w-4xl">
          একাদশ শ্রেণি ও সেরা ৩০টি কলেজ ভর্তি পরীক্ষা তথ্য ২০২৬
        </h1>

        <p className="text-emerald-100 text-sm sm:text-base leading-relaxed max-w-3xl">
          নটর ডেম কলেজ (NDC), হলিক্রস কলেজ (HCC), সেন্ট জোসেফ কলেজ এবং ঢাকার সেরা ৩০টি সরকারি ও বেসরকারি কলেজের ন্যূনতম জিপিএ (GPA Requirements), শিফট, আসন সংখ্যা এবং বিগত বছরের কাট মার্কস বিস্তারিত সারণী।
        </p>
      </section>

      {/* Top Ad Slot */}
      <AdSlot slotId="college-admission-top" format="horizontal" />

      {/* Section 1: Featured College Exam & Guide Cards */}
      <section className="space-y-5">
        <div className="flex items-center space-x-3 border-b border-gray-200 pb-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shadow-xs">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">
              শীর্ষ কলেজ ভর্তি পরীক্ষা ও আবেদন গাইড (Admission Guides)
            </h2>
            <p className="text-xs text-gray-500 font-medium">
              আপনার কাঙ্ক্ষিত কলেজের তথ্য দেখতে নিচে ক্লিক করুন
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURED_COLLEGES.map((c) => (
            <Link
              key={c.slug}
              href={`/college-admission/${c.slug}`}
              className={`bg-gradient-to-br ${c.color} text-white p-6 rounded-2xl shadow-sm hover:shadow-md hover:scale-[1.01] transition-all flex flex-col justify-between space-y-4 border ${c.borderColor} group`}
            >
              <div className="space-y-2">
                <span className="inline-block text-2xs font-bold uppercase tracking-wider text-emerald-200 bg-white/10 px-2.5 py-1 rounded-md">
                  {c.badge}
                </span>
                <h3 className="text-xl font-extrabold leading-snug group-hover:underline">
                  {c.name}
                </h3>
                <p className="text-xs text-gray-200 leading-relaxed">
                  {c.bnDesc}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-bold text-emerald-300 pt-3 border-t border-white/15">
                <span>বিস্তারিত পড়ুন ও গাইড দেখুন</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Section 2: Top 30 Dhaka Colleges Minimum GPA Requirement Table */}
      <section className="bg-white border-2 border-emerald-100 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shadow-xs">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                ঢাকার সেরা ৩০টি কলেজের ন্যূনতম জিপিএ, শিফট ও আসন সংখ্যা (GPA Requirements 2026)
              </h2>
              <p className="text-xs text-gray-500 font-medium">
                বিজ্ঞান, মানবিক ও ব্যবসায় শিক্ষা বিভাগের ন্যূনতম GPA, শিফট এবং আগের বছরের আনুমানিক কাট মার্কস
              </p>
            </div>
          </div>
          <Link
            href="/college-admission/requirements-gpa-cut-marks"
            className="text-xs sm:text-sm font-bold text-emerald-700 hover:underline flex items-center space-x-1"
          >
            <span>৮টি বিভাগের তালিকা দেখুন</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-emerald-800 text-white uppercase text-2xs sm:text-xs font-bold">
                <th className="p-3 rounded-tl-xl">#</th>
                <th className="p-3">কলেজের নাম (College Name)</th>
                <th className="p-3">অবস্থান (Location)</th>
                <th className="p-3">শিফট (Shift)</th>
                <th className="p-3 text-center">বিজ্ঞান (Science GPA)</th>
                <th className="p-3 text-center">ব্যবসায় শিক্ষা</th>
                <th className="p-3 text-center">মানবিক (Arts)</th>
                <th className="p-3 rounded-tr-xl text-center">আসন সংখ্যা</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 font-medium text-gray-800">
              {TOP_DHAKA_COLLEGES_REQ.map((col, idx) => (
                <tr key={idx} className="hover:bg-emerald-50/50 transition-colors">
                  <td className="p-3 font-bold text-emerald-800 font-mono">
                    #{idx + 1}
                  </td>
                  <td className="p-3 font-bold text-gray-900">
                    {col.collegeName}
                  </td>
                  <td className="p-3 text-2xs sm:text-xs text-gray-600">
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                      <span>{col.location}</span>
                    </span>
                  </td>
                  <td className="p-3 text-2xs sm:text-xs font-semibold text-gray-700">
                    {col.shift || 'প্রভাতী/দিবা'}
                  </td>
                  <td className="p-3 text-center font-bold text-blue-900 bg-blue-50/40 rounded-lg">
                    {col.scienceGPA}
                  </td>
                  <td className="p-3 text-center font-semibold text-emerald-900">
                    {col.commerceGPA}
                  </td>
                  <td className="p-3 text-center font-semibold text-purple-900">
                    {col.artsGPA}
                  </td>
                  <td className="p-3 text-center font-bold text-gray-900">
                    {col.seats}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 3: XI Class Admission Guide Step by Step */}
      <section className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center space-x-3">
          <Building2 className="w-6 h-6 text-emerald-700" />
          <h2 className="text-xl font-bold text-emerald-950">
            একাদশ শ্রেণি অনলাইন ভর্তির প্রয়োজনীয় নিয়মাবলী (xiclassadmission.gov.bd)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
          <div className="bg-white p-4 rounded-xl border border-emerald-100 space-y-2 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
              ১
            </div>
            <h3 className="font-bold text-gray-900">আবেদন ফি প্রদান (Fee Payment)</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              বিকাশ, নগদ বা রকেটের মাধ্যমে ১৫০ টাকা ফি প্রদান করে ট্রানজেকশন আইডি সংরক্ষণ করতে হবে।
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-emerald-100 space-y-2 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
              ২
            </div>
            <h3 className="font-bold text-gray-900">১০টি কলেজ পছন্দক্রম (College Choice)</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              কমপক্ষে ৫টি এবং সর্বোচ্চ ১০টি কলেজ পছন্দক্রম সাজাতে হবে। প্রথম পছন্দে সেরা কলেজ রাখুন।
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-emerald-100 space-y-2 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
              ৩
            </div>
            <h3 className="font-bold text-gray-900">নিশ্চায়ন ও নিশ্চায়ন ফি (Confirmation)</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              ফলাফল প্রকাশের পর ৩২৮ টাকা নিশ্চায়ন ফি দিয়ে কলেজের সিট নিশ্চিত করতে হবে।
            </p>
          </div>
        </div>

        <div className="pt-2 text-right">
          <Link
            href="/college-admission/how-to-apply"
            className="inline-flex items-center space-x-1 text-xs font-extrabold text-emerald-800 hover:underline"
          >
            <span>আবেদনের বিস্তারিত নিয়ম পড়তে এখানে ক্লিক করুন</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Section 4: Related SSC & HSC Admission Books */}
      {admissionBooks.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center space-x-2 border-b border-gray-200 pb-2">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-bold text-gray-900">
              কলেজ ভর্তি সহায়িকা ও SSC/HSC গাইড বই PDF
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {admissionBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
