import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import BookCard from '@/components/BookCard';
import AdSlot from '@/components/AdSlot';
import { getBooksByClass } from '@/lib/data';
import { DIVISION_COLLEGES_REQ } from '@/lib/types';
import { getXiCollegeBySlug, getRelatedXiColleges } from '@/lib/xi-colleges-data';
import { NdcGuide, HolyCrossGuide, StJosephGuide, AdmissionProcessGuide } from '@/components/xi-college-guides';
import {
  GraduationCap,
  Award,
  BookOpen,
  ChevronRight,
  FileText,
  CheckCircle2,
  MapPin,
  HelpCircle,
  Building2,
  Calendar,
  Layers,
  Sparkles,
  ArrowRight,
  Check,
  CreditCard,
  ClipboardList,
  Clock,
  AlertCircle,
  Users,
  Smartphone,
  ExternalLink,
  Laptop,
  CheckCircle,
} from 'lucide-react';

interface RouteProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const divisionSlugs = DIVISION_COLLEGES_REQ.map((d) => ({ slug: d.slug }));
  return [
    { slug: 'ndc' },
    { slug: 'holy-cross' },
    { slug: 'st-joseph' },
    { slug: 'admission-process-2026' },
    { slug: 'how-to-apply' },
    { slug: 'requirements-gpa-cut-marks' },
    ...divisionSlugs,
  ];
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { slug } = await params;

  // XI College List (All Boards) detail pages
  const xi = getXiCollegeBySlug(slug);
  if (xi) {
    const title = `${xi.name} HSC ভর্তি তথ্য ২০২৬ | EIIN ${xi.eiin} - ${xi.board} Board`;
    const description = `${xi.name} (${xi.thana}, ${xi.district}) — ${xi.board} বোর্ড। একাদশ শ্রেণি ভর্তি ২০২৬: নূন্যতম GPA ${Number(xi.gpa).toFixed(2)}, মোট আসন ${xi.seats.toLocaleString()}, গ্রুপ: ${xi.groups.join(', ')}। শিফট ও ভার্সন সহ সম্পূর্ণ তথ্য।`;
    return {
      title,
      description,
      openGraph: { title, description },
    };
  }

  if (slug === 'ndc') {
    return {
      title: 'নটর ডেম কলেজ ঢাকা ভর্তি ২০২৬-২০২৭ | আবেদন, যোগ্যতা, ভর্তি পরীক্ষা ও সম্পূর্ণ নির্দেশিকা (NDC)',
      description: 'নটর ডেম কলেজ (NDC) একাদশ শ্রেণি ভর্তি ২০২৬-২০২৭। আবেদন ১-১০ সেপ্টেম্বর, আবেদন ফি ৫০০ টাকা (bKash), GPA শর্ত, আসন ৩,২৯০টি, লিখিত ও মৌখিক পরীক্ষার সম্পূর্ণ নির্দেশিকা।',
    };
  }

  if (slug === 'holy-cross') {
    return {
      title: 'হলি ক্রস কলেজ ঢাকা ভর্তি ২০২৬-২০২৭ | আবেদন ৫-১০ সেপ্টেম্বর, আসন ১,৩১০ ও ভর্তি পরীক্ষা (Holy Cross Admission)',
      description: 'হলি ক্রস কলেজ (EIIN 131962) একাদশ শ্রেণি ভর্তি ২০২৬-২০২৭। অনলাইন আবেদন ৫-১০ সেপ্টেম্বর, আবেদন ফি ৪০০ টাকা, মোট আসন ১,৩১০টি, ফলাফল ২৫ সেপ্টেম্বর — সম্পূর্ণ গাইড।',
    };
  }

  if (slug === 'st-joseph') {
    return {
      title: 'সেন্ট যোসেফ হায়ার সেকেন্ডারি স্কুল ভর্তি ২০২৬-২০২৭ | আবেদন, যোগ্যতা, আসন ৬৮০ ও পরীক্ষা',
      description: 'সেন্ট যোসেফ হায়ার সেকেন্ডারি স্কুল (EIIN 108259) ভর্তি ২০২৬-২০২৭। আবেদন ২-৭ সেপ্টেম্বর, ফি ৫০০ টাকা, GPA শর্ত, মোট আসন ৬৮০টি ও ১১-১২ সেপ্টেম্বর লিখিত/মৌখিক পরীক্ষার নির্দেশিকা।',
    };
  }

  if (slug === 'admission-process-2026') {
    return {
      title: 'একাদশ শ্রেণির কলেজ ভর্তি ২০২৬: অনলাইন আবেদন থেকে চূড়ান্ত ভর্তি — ধাপে ধাপে গাইড',
      description: 'কলেজ ভর্তি ২০২৬-এর সম্পূর্ণ প্রক্রিয়া: আবেদন ২–১০ সেপ্টেম্বর, ফলাফল ১৭ সেপ্টেম্বর, নিশ্চায়ন ১৯ সেপ্টেম্বর রাত ৮টা, চূড়ান্ত ভর্তি ২০–২২ ও ক্লাস শুরু ২৩ সেপ্টেম্বর — ৭ ধাপের পূর্ণাঙ্গ নির্দেশিকা ও অফিসিয়াল সার্কুলার PDF।',
    };
  }

  if (slug === 'how-to-apply') {
    return {
      title: 'একাদশ শ্রেণি ভর্তি অনলাইন আবেদন নিয়ম ২০২৬ | xiclassadmission.gov.bd পছন্দক্রম ও ফি',
      description: 'কীভাবে একাদশ শ্রেণিতে অনলাইনে আবেদন করবেন (xiclassadmission.gov.bd)। বিকাশ/নগদ-এ ফি প্রদান, ১০টি কলেজ পছন্দক্রম এবং নিশ্চায়ন প্রক্রিয়ার সম্পূর্ণ গাইড।',
    };
  }

  if (slug === 'requirements-gpa-cut-marks') {
    return {
      title: '৮টি বিভাগের সেরা কলেজের জিপিএ ও কাট মার্কস নির্দেশিকা ২০২৬ | XI Admission Portal',
      description: 'বাংলাদেশের ৮টি বিভাগের (ঢাকা, চট্টগ্রাম, রাজশাহী, খুলনা, বরিশাল, সিলেট, রংপুর, ময়মনসিংহ) সেরা সেরা কলেজের ন্যূনতম জিপিএ রিকোয়ারমেন্ট ও কাট মার্কস দেখার ডিরেক্টরি।',
    };
  }

  const foundDiv = DIVISION_COLLEGES_REQ.find((d) => d.slug === slug);
  if (foundDiv) {
    return {
      title: `${foundDiv.bnName}-এর সেরা কলেজগুলোর ন্যূনতম জিপিএ ও কাট মার্কস ২০২৬ | XI Admission`,
      description: `${foundDiv.bnName}-এর সেরা সেরা কলেজের বিজ্ঞান, মানবিক ও ব্যবসায় শিক্ষা বিভাগের ন্যূনতম GPA, শিফট, আসন সংখ্যা এবং বিগত বছরের আনুমানিক কাট মার্কস সারণী।`,
    };
  }

  return { title: 'College Admission Info' };
}

export default async function DynamicCollegePage({ params }: RouteProps) {
  const { slug } = await params;

  // -------------------------------------------------------------
  // PAGE 0: XI College List (All Boards) — College Detail Page
  // -------------------------------------------------------------
  const xiCollege = getXiCollegeBySlug(slug);
  if (xiCollege) {
    return <XiCollegeDetail college={xiCollege} related={getRelatedXiColleges(xiCollege)} />;
  }

  const sscBooks = await getBooksByClass('ssc');
  const hscBooks = await getBooksByClass('hsc');
  const relatedBooks = [...sscBooks, ...hscBooks].slice(0, 6);

  // -------------------------------------------------------------
  // PAGE 1: Notre Dame College (NDC) — ২০২৬-২০২৭ Guide
  // -------------------------------------------------------------
  if (slug === 'ndc') {
    return <NdcGuide books={relatedBooks} />;
  }

  // -------------------------------------------------------------
  // PAGE 2: Holy Cross College — ২০২৬-২০২৭ Guide
  // -------------------------------------------------------------
  if (slug === 'holy-cross') {
    return <HolyCrossGuide books={relatedBooks} />;
  }

  // -------------------------------------------------------------
  // PAGE 3: St. Joseph Higher Secondary School — ২০২৬-২০২৭ Guide
  // -------------------------------------------------------------
  if (slug === 'st-joseph') {
    return <StJosephGuide books={relatedBooks} />;
  }

  // -------------------------------------------------------------
  // PAGE 3.5: College Admission Process 2026 — Step-by-step Guide
  // -------------------------------------------------------------
  if (slug === 'admission-process-2026') {
    return <AdmissionProcessGuide />;
  }

  // -------------------------------------------------------------
  // PAGE 4: How To Apply Online Step-by-step Guide (how-to-apply)
  // -------------------------------------------------------------
  if (slug === 'how-to-apply') {
    return (
      <div className="space-y-8 pb-12">
        <Breadcrumb
          items={[
            { label: 'একাদশ শ্রেণি ভর্তি', href: '/college-admission' },
            { label: 'অনলাইন আবেদন করার নিয়ম (xiclassadmission.gov.bd)' },
          ]}
        />

        {/* Hero Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white p-6 sm:p-10 rounded-2xl shadow-md space-y-4">
          <div className="inline-flex items-center space-x-2 bg-emerald-700/50 backdrop-blur-xs px-3.5 py-1 rounded-full text-xs font-bold text-emerald-100 border border-emerald-400/30">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>XI Class Admission Online Application System 2026</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold leading-snug">
            একাদশ শ্রেণি ভর্তি অনলাইন আবেদন করার সঠিক নিয়ম ২০২৬ (xiclassadmission.gov.bd Step-by-Step Guide)
          </h1>

          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed max-w-4xl">
            বাংলাদেশের সকল সরকারি ও বেসরকারি কলেজে অনলাইনে একাদশ শ্রেণিতে ভর্তির পূর্ণাঙ্গ নির্দেশিকা। আবেদন ফি প্রদান (bKash/Nagad/Rocket), পছন্দক্রম অনুযায়ী ৫টি থেকে ১০টি কলেজ চয়েস তালিকা পূরণ এবং চূড়ান্ত ভর্তি নিশ্চায়ন প্রক্রিয়ার বিস্তারিত।
          </p>
        </div>

        <AdSlot slotId="how-to-apply-top" format="horizontal" />

        {/* Step-by-step Complete Process Grid */}
        <div className="space-y-6 text-gray-800">
          {/* Step 1: Fee Payment */}
          <section className="bg-white border-2 border-emerald-100 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="flex items-center space-x-3 border-b border-gray-200 pb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-lg">
                ১
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-emerald-950">
                ধাপ ১: ফি প্রদান পদ্ধতি (Application Fee Payment - ১৫০ টাকা)
              </h2>
            </div>

            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              অনলাইনে আবেদন করার আগে অবশ্যই যেকোনো মোবাইল ব্যাংকিং অ্যাপ (bKash, Nagad, Rocket, Upay) অথবা টেলিটক প্রিপেইড সিমের মাধ্যমে <strong>১৫০ টাকা (150 BDT)</strong> অনলাইন আবেদন ফি পরিশোধ করতে হবে।
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm font-medium">
              <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-2">
                <span className="font-extrabold text-emerald-950 text-sm block flex items-center space-x-1.5">
                  <Smartphone className="w-4 h-4 text-emerald-700" />
                  <span>bKash (বিকাশ) অ্যাপের মাধ্যমে ফি প্রদান:</span>
                </span>
                <ol className="list-decimal list-inside space-y-1 text-gray-700">
                  <li>bKash অ্যাপে লগইন করে <strong>Pay Bill</strong> অপশনে যান।</li>
                  <li><strong>Education</strong> সিলেক্ট করে <strong>XI Class Admission</strong> খুঁজুন।</li>
                  <li>আপনার বোর্ড, পাসের সন, এসএসসি রোল নম্বর ও মোবাইল নম্বর দিন।</li>
                  <li>পিন নম্বর দিয়ে ১৫ টাকা চার্জ সহ ১৫০ টাকা ফি পরিশোধ সম্পন্ন করুন।</li>
                </ol>
              </div>

              <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200 space-y-2">
                <span className="font-extrabold text-amber-950 text-sm block flex items-center space-x-1.5">
                  <Smartphone className="w-4 h-4 text-amber-700" />
                  <span>Nagad (নগদ) অ্যাপের মাধ্যমে ফি প্রদান:</span>
                </span>
                <ol className="list-decimal list-inside space-y-1 text-gray-700">
                  <li>নগদ অ্যাপ খুলুন এবং <strong>Pay Bill</strong> নির্বাচন করুন।</li>
                  <li>Bill Type এ <strong>XI Class Admission</strong> নির্বাচন করুন।</li>
                  <li>এসএসসি রোল, বোর্ড ও মোবাইল নম্বর ইনপুট করে পিন দিয়ে সাবমিট করুন।</li>
                  <li>পেমেন্ট সফল হলে ট্রানজেকশন আইডি সহ নিশ্চিতকরণ এসএমএস পাবেন।</li>
                </ol>
              </div>
            </div>
          </section>

          {/* Step 2: Filling Form on Website */}
          <section className="bg-white border-2 border-emerald-100 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="flex items-center space-x-3 border-b border-gray-200 pb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-lg">
                ২
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-blue-950">
                ধাপ ২: ওয়েবসাইটে আবেদন ফর্ম পূরণ (Filling Choice List)
              </h2>
            </div>

            <div className="space-y-3 text-sm sm:text-base text-gray-700 leading-relaxed">
              <div className="flex items-center space-x-2 font-bold text-emerald-700">
                <ExternalLink className="w-4 h-4" />
                <span>অফিশিয়াল ওয়েবসাইট: <a href="http://xiclassadmission.gov.bd" target="_blank" rel="noopener noreferrer" className="underline font-mono text-blue-700">xiclassadmission.gov.bd</a></span>
              </div>

              <ol className="list-decimal list-inside space-y-2.5 bg-gray-50 p-4 rounded-xl border border-gray-200">
                <li>
                  ওয়েবসাইটে গিয়ে <strong>Apply Online (অনলাইনে আবেদন)</strong> বাটনে ক্লিক করুন।
                </li>
                <li>
                  আপনার <strong>SSC Roll Number, Board, Passing Year, Registration Number</strong> এবং ছবিতে থাকা Captcha পূরণ করে পরবর্তী ধাপে যান।
                </li>
                <li>
                  আপনার ব্যক্তিগত তথ্য ও পিতা-মাতার নাম স্ক্রিনে প্রদর্শিত হবে। ফি পরিশোধের সময় দেওয়া <strong>Mobile Number</strong> টি দিন।
                </li>
                <li>
                  <strong>কলেজ পছন্দক্রম (Choice List):</strong> আপনি সর্বনিম্ন <strong>৫টি</strong> এবং সর্বোচ্চ <strong>১০টি</strong> কলেজ নির্বাচন করতে পারবেন।
                </li>
                <li>
                  প্রতিটি কলেজের জেলা, থানা, শিফট (প্রভাতী/দিবা), ভার্সন (বাংলা/ইংরেজি) ও বিভাগ নির্বাচন করে পছন্দ তালিকা ক্রমানুসারে (১, ২, ৩...) সাজান।
                </li>
                <li>
                  সব তথ্য সঠিকভাবে যাচাই করে <strong>Submit Application</strong> এ ক্লিক করুন। ফর্মটি প্রিন্ট বা সংরক্ষণ (PDF Safe Copy) করে রাখুন।
                </li>
              </ol>
            </div>
          </section>

          {/* Step 3: Result & Confirmation */}
          <section className="bg-white border-2 border-emerald-100 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="flex items-center space-x-3 border-b border-gray-200 pb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-black text-lg">
                ৩
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-purple-950">
                ধাপ ৩: ফলাফল প্রকাশ ও সিট নিশ্চায়ন (Selection Result & Confirmation Fee)
              </h2>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-gray-700">
              <li className="flex items-start space-x-3 bg-purple-50/60 p-3.5 rounded-xl border border-purple-200">
                <CheckCircle2 className="w-5 h-5 text-purple-700 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-purple-950 text-sm block">১ম পর্যায়ের ফলাফল:</strong>
                  <span>আবেদন যাচাই শেষে ১ম পর্যায়ে মনোনীত কলেজের নাম এসএমএস এবং ওয়েবসাইটে প্রকাশ করা হবে।</span>
                </div>
              </li>

              <li className="flex items-start space-x-3 bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-emerald-950 text-sm block">নিশ্চায়ন ফি প্রদান (৩৩৫ টাকা):</strong>
                  <span>মনোনীত কলেজে সিট নিশ্চিত করতে নির্ধারিত সময়ের মধ্যে mobile banking এর মাধ্যমে <strong>৩৩৫ টাকা নিশ্চায়ন ফি</strong> প্রদান করতে হবে। ফি না দিলে আবেদনটি বাতিল হয়ে যাবে।</span>
                </div>
              </li>
            </ul>
          </section>
        </div>

        {relatedBooks.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center space-x-2 border-b border-gray-200 pb-2">
              <BookOpen className="w-5 h-5 text-emerald-700" />
              <h2 className="text-xl font-bold text-gray-900">
                একাদশ শ্রেণির পাঠ্যবই ও গাইড সমাধান PDF
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {relatedBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }

  // -------------------------------------------------------------
  // PAGE 5: Master Directory Page: requirements-gpa-cut-marks
  // -------------------------------------------------------------
  if (slug === 'requirements-gpa-cut-marks') {
    return (
      <div className="space-y-8 pb-12">
        <Breadcrumb
          items={[
            { label: 'একাদশ শ্রেণি ভর্তি', href: '/college-admission' },
            { label: '৮টি বিভাগের কাট মার্কস ডিরেক্টরি' },
          ]}
        />

        <div className="bg-gradient-to-r from-rose-900 via-red-950 to-slate-900 text-white p-6 sm:p-10 rounded-2xl shadow-md space-y-4">
          <div className="inline-flex items-center space-x-2 bg-rose-700/50 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold text-rose-100 border border-rose-400/30">
            <MapPin className="w-4 h-4 text-amber-300" />
            <span>8 Divisions College Cut Marks Portal</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold leading-snug">
            বাংলাদেশের ৮টি বিভাগের সেরা কলেজের ন্যূনতম জিপিএ ও কাট মার্কস ২০২৬
          </h1>

          <p className="text-rose-100 text-sm sm:text-base leading-relaxed max-w-4xl">
            ঢাকা, চট্টগ্রাম, রাজশাহী, খুলনা, বরিশাল, সিলেট, রংপুর এবং ময়মনসিংহের সেরা সেরা কলেজগুলোর বিজ্ঞান, মানবিক ও ব্যবসায় শিক্ষা বিভাগের ন্যূনতম GPA এবং আগের বছরের কাট মার্কস দেখতে আপনার কাঙ্ক্ষিত বিভাগে ক্লিক করুন।
          </p>
        </div>

        <AdSlot slotId="cutmarks-hub-top" format="horizontal" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DIVISION_COLLEGES_REQ.map((div) => (
            <Link
              key={div.slug}
              href={`/college-admission/${div.slug}`}
              className="bg-white border-2 border-gray-200 hover:border-rose-600 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                  <MapPin className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-gray-900 group-hover:text-rose-700 transition-colors">
                  {div.division}
                </h2>
                <p className="text-xs text-gray-500 font-medium">
                  {div.colleges.length}টি শীর্ষ কলেজের জিপিএ, শিফট ও আসন সংখ্যা
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-bold text-rose-700 pt-3 border-t border-gray-100">
                <span>বিভাগের কলেজের তালিকা দেখুন</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // PAGE 6: Dynamic Individual Division Page
  // -------------------------------------------------------------
  const matchedDiv = DIVISION_COLLEGES_REQ.find((d) => d.slug === slug);
  if (matchedDiv) {
    return (
      <div className="space-y-8 pb-12">
        <Breadcrumb
          items={[
            { label: 'একাদশ শ্রেণি ভর্তি', href: '/college-admission' },
            { label: 'কাট মার্কস হাব', href: '/college-admission/requirements-gpa-cut-marks' },
            { label: matchedDiv.bnName },
          ]}
        />

        <div className="bg-gradient-to-r from-rose-950 via-red-900 to-slate-900 text-white p-6 sm:p-10 rounded-2xl shadow-md space-y-4">
          <div className="inline-flex items-center space-x-2 bg-rose-700/50 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold text-rose-100 border border-rose-400/30">
            <MapPin className="w-4 h-4 text-amber-300" />
            <span>{matchedDiv.bnName} XI Admission Cut Marks 2026</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold leading-snug">
            {matchedDiv.bnName}-এর সেরা কলেজগুলোর ন্যূনতম জিপিএ, শিফট ও আসন সংখ্যা ২০২৬
          </h1>

          <p className="text-rose-100 text-sm sm:text-base leading-relaxed max-w-4xl">
            {matchedDiv.bnName}-এর শীর্ষ নিবন্ধিত সরকারি ও স্বনামধন্য কলেজের বিজ্ঞান, ব্যবসায় শিক্ষা এবং মানবিক বিভাগের ন্যূনতম জিপিএ রিকোয়ারমেন্ট, শিফট তথ্য ও আসন সংখ্যা।
          </p>
        </div>

        <AdSlot slotId={`div-${matchedDiv.slug}-top`} format="horizontal" />

        {/* Division College Cards Grid with Hotlink Images & Direct Article Links */}
        <section className="space-y-6">
          <div className="flex items-center space-x-3 border-b border-gray-200 pb-4">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center shadow-xs">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                {matchedDiv.division} - ভর্তি যোগ্যতা, ছবি ও তথ্যাবলী
              </h2>
              <p className="text-xs text-gray-500 font-medium">
                নির্দিষ্ট কলেজের বিস্তারিত গাইড ও অধ্যক্ষের বাণী দেখতে নামের ওপর ক্লিক করুন
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchedDiv.colleges.map((col, idx) => (
              <div
                key={idx}
                className="bg-white border-2 border-gray-200 hover:border-rose-600 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {col.image ? (
                    <div className="relative w-full h-44 bg-gray-900 overflow-hidden">
                      {/* eslint-disable-next-html-element-suppression */}
                      <img
                        src={col.image}
                        alt={col.collegeName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-rose-700 text-white font-mono font-bold text-2xs px-2 py-0.5 rounded shadow">
                          #{idx + 1}
                        </span>
                      </div>
                      {col.type && (
                        <div className="absolute bottom-3 left-3">
                          <span className="bg-gray-900/80 backdrop-blur-xs text-rose-200 font-semibold text-2xs px-2 py-0.5 rounded border border-white/20">
                            {col.type}
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-full h-24 bg-gradient-to-r from-rose-900 to-slate-900 p-4 flex items-center justify-between text-white">
                      <span className="font-mono font-bold text-lg">#{idx + 1}</span>
                      <span className="text-xs font-semibold">{col.type}</span>
                    </div>
                  )}

                  <div className="p-5 space-y-3">
                    <h3 className="text-base font-extrabold text-gray-900 group-hover:text-rose-700 leading-snug">
                      {col.slug ? (
                        <Link href={col.slug.startsWith('/') ? col.slug : `/college/${col.slug}`}>
                          {col.collegeName}
                        </Link>
                      ) : (
                        col.collegeName
                      )}
                    </h3>

                    <div className="space-y-1.5 text-xs text-gray-600">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                        <span>{col.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                        <span>{col.shift || 'প্রভাতী/দিবা'}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5 pt-2 text-center text-2xs font-semibold">
                      <div className="bg-blue-50 p-2 rounded border border-blue-100">
                        <span className="block text-gray-500">বিজ্ঞান</span>
                        <strong className="text-blue-900">{col.scienceGPA}</strong>
                      </div>

                      <div className="bg-emerald-50 p-2 rounded border border-emerald-100">
                        <span className="block text-gray-500">ব্যবসায়</span>
                        <strong className="text-emerald-900">{col.commerceGPA}</strong>
                      </div>

                      <div className="bg-purple-50 p-2 rounded border border-purple-100">
                        <span className="block text-gray-500">মানবিক</span>
                        <strong className="text-purple-900">{col.artsGPA}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs font-bold">
                  <span className="text-gray-700">আসন: {col.seats}</span>
                  {col.slug ? (
                    <Link
                      href={col.slug.startsWith('/') ? col.slug : `/college/${col.slug}`}
                      className="text-rose-700 hover:underline inline-flex items-center space-x-1"
                    >
                      <span>সম্পূর্ণ ভর্তি গাইড</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ) : (
                    <span className="text-gray-400 text-2xs">তথ্য আপডেট হচ্ছে</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <AdSlot slotId={`div-${matchedDiv.slug}-middle`} format="horizontal" />

        {relatedBooks.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center space-x-2 border-b border-gray-200 pb-2">
              <BookOpen className="w-5 h-5 text-rose-700" />
              <h2 className="text-xl font-bold text-gray-900">
                {matchedDiv.bnName}-এর এসএসসি ও এইচএসসি গাইড বই PDF
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {relatedBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }

  notFound();
}

// =============================================================
// XI College Detail (All Boards College List — EIIN based)
// =============================================================
function XiCollegeDetail({
  college,
  related,
}: {
  college: ReturnType<typeof getXiCollegeBySlug> & NonNullable<ReturnType<typeof getXiCollegeBySlug>>;
  related: ReturnType<typeof getRelatedXiColleges>;
}) {
  const c = college;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollegeOrUniversity',
    name: c.name,
    identifier: String(c.eiin),
    address: {
      '@type': 'PostalAddress',
      addressLocality: c.thana,
      addressRegion: c.district,
      addressCountry: 'BD',
    },
  };

  const schedule = [
    ['অনলাইন আবেদন শুরু', '২ সেপ্টেম্বর ২০২৬'],
    ['আবেদনের শেষ সময়', '১০ সেপ্টেম্বর ২০২৬, রাত ৮:০০'],
    ['ফলাফল প্রকাশ', '১৭ সেপ্টেম্বর ২০২৬'],
    ['সিট নিশ্চায়নের শেষ সময়', '১৯ সেপ্টেম্বর ২০২৬'],
    ['ভৌত ভর্তি (কলেজে)', '২০–২২ সেপ্টেম্বর ২০২৬'],
    ['ক্লাস শুরু', '২৩ সেপ্টেম্বর ২০২৬'],
  ];

  return (
    <div className="space-y-8 pb-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Breadcrumb
        items={[
          { label: 'একাদশ শ্রেণি ভর্তি', href: '/college-admission' },
          { label: 'HSC কলেজ তালিকা', href: '/college-admission' },
          { label: c.name },
        ]}
      />

      {/* Hero */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white p-6 sm:p-10 rounded-2xl shadow-md space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center space-x-1.5 bg-emerald-600/40 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-bold text-emerald-100 border border-emerald-400/30">
            <GraduationCap className="w-4 h-4 text-amber-300" />
            <span>{c.board} Board</span>
          </span>
          {c.gender && (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/10 border border-white/20 text-white">
              {c.gender}
            </span>
          )}
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-white/10 border border-white/20 text-white">
            EIIN: {c.eiin}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold leading-snug">{c.name}</h1>

        <p className="text-emerald-100 text-sm sm:text-base leading-relaxed max-w-4xl flex items-center space-x-2">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span>
            {c.thana}, {c.district} — {c.board} শিক্ষা বোর্ডের অধীনে একাদশ শ্রেণি (XI Class) ভর্তি ২০২৬-এর জন্য অনুমোদিত কলেজ।
          </span>
        </p>
      </div>

      <AdSlot slotId={`xi-college-${c.eiin}-top`} format="horizontal" />

      {/* Key Facts */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl text-center space-y-1">
          <Award className="w-5 h-5 text-blue-700 mx-auto" />
          <p className="text-2xs font-bold text-blue-700 uppercase">নূন্যতম GPA</p>
          <p className="text-xl sm:text-2xl font-black text-blue-950">{Number(c.gpa).toFixed(2)}</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-center space-y-1">
          <Users className="w-5 h-5 text-emerald-700 mx-auto" />
          <p className="text-2xs font-bold text-emerald-700 uppercase">মোট আসন</p>
          <p className="text-xl sm:text-2xl font-black text-emerald-950">{c.seats.toLocaleString()}</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-center space-y-1">
          <Layers className="w-5 h-5 text-amber-700 mx-auto" />
          <p className="text-2xs font-bold text-amber-700 uppercase">শিফট</p>
          <p className="text-xs sm:text-sm font-extrabold text-amber-950 leading-snug pt-1">{c.shifts.join(', ') || 'N/A'}</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 p-4 rounded-xl text-center space-y-1">
          <FileText className="w-5 h-5 text-purple-700 mx-auto" />
          <p className="text-2xs font-bold text-purple-700 uppercase">ভার্সন</p>
          <p className="text-xs sm:text-sm font-extrabold text-purple-950 leading-snug pt-1">{c.versions.join(', ') || 'N/A'}</p>
        </div>
      </section>

      {/* Groups */}
      <section className="bg-white border-2 border-emerald-100 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 flex items-center space-x-2 border-b border-gray-200 pb-3">
          <CheckCircle2 className="w-6 h-6 text-emerald-700" />
          <span>এই কলেজে ভর্তিযোগ্য গ্রুপসমূহ (Available Groups)</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {c.groups.map((g) => (
            <div
              key={g}
              className={`p-4 rounded-xl border-2 font-extrabold text-center ${
                g === 'Science'
                  ? 'bg-blue-50/60 border-blue-300 text-blue-900'
                  : g === 'Business Studies'
                  ? 'bg-emerald-50/60 border-emerald-300 text-emerald-900'
                  : 'bg-purple-50/60 border-purple-300 text-purple-900'
              }`}
            >
              {g === 'Science' ? 'বিজ্ঞান (Science)' : g === 'Business Studies' ? 'ব্যবসায় শিক্ষা (Business Studies)' : g === 'Humanities' ? 'মানবিক (Humanities)' : g}
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-200">
          📌 বিজ্ঞান বিভাগের শিক্ষার্থীরা ইচ্ছা করলে বিজ্ঞান, মানবিক ও ব্যবসায় শিক্ষা — তিনটি গ্রুপের যেকোনোটিতে আবেদন করতে পারে। তবে ব্যবসায় শিক্ষা বা মানবিকের শিক্ষার্থীরা কেবল নিজ নিজ গ্রুপেই আবেদন করতে পারবে।
        </p>
      </section>

      {/* Admission Schedule */}
      <section className="bg-gradient-to-br from-sky-50 to-indigo-50 border-2 border-sky-100 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-sky-950 flex items-center space-x-2 border-b border-sky-200 pb-3">
          <Calendar className="w-6 h-6 text-sky-700" />
          <span>একাদশ শ্রেণি ভর্তি সময়সূচি ২০২৬ (XI Class Admission Schedule)</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {schedule.map(([label, date]) => (
            <div key={label} className="bg-white p-4 rounded-xl border border-sky-100 flex items-center justify-between gap-3">
              <span className="text-xs sm:text-sm font-bold text-gray-700">{label}</span>
              <span className="text-xs sm:text-sm font-black text-sky-800 whitespace-nowrap">{date}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-red-700 font-semibold bg-red-50 border border-red-200 p-3 rounded-lg">
          ⚠️ নির্ধারিত সময়ের মধ্যে সিট নিশ্চায়ন না করলে ভর্তি বাতিল হয়ে যাবে এবং আবেদনটি বাতিল গণ্য হবে।
        </p>
      </section>

      <AdSlot slotId={`xi-college-${c.eiin}-bottom`} format="horizontal" />

      {/* Related Colleges */}
      {related.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center space-x-2 border-b border-gray-200 pb-3">
            <Building2 className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-bold text-gray-900">আশেপাশে / একই বোর্ডের অন্যান্য কলেজ</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {related.map((r) => (
              <Link
                key={r.eiin}
                href={`/college-admission/${r.slug}`}
                className="group bg-white p-4 rounded-xl border border-gray-200 hover:border-emerald-500 hover:shadow-md transition-all flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <h3 className="font-bold text-sm text-gray-900 group-hover:text-emerald-700 truncate">{r.name}</h3>
                  <p className="text-2xs text-gray-500 mt-0.5 truncate">
                    {r.thana}, {r.district} • {r.board}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-black text-blue-900">GPA {Number(r.gpa).toFixed(2)}</p>
                  <p className="text-2xs text-gray-500">{r.seats.toLocaleString()} আসন</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/college-admission"
              className="inline-flex items-center space-x-1 text-sm font-extrabold text-emerald-700 hover:underline"
            >
              <span>সকল কলেজের তালিকা দেখুন</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
