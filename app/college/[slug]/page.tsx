import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumb from '@/components/Breadcrumb';
import BookCard from '@/components/BookCard';
import AdSlot from '@/components/AdSlot';
import { getBooksByClass } from '@/lib/data';
import { DETAILED_COLLEGES_LIST } from '@/lib/types';
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
  Globe,
  Users,
  Clock,
  ShieldCheck,
  UserCheck,
  Quote,
} from 'lucide-react';

interface RouteProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return DETAILED_COLLEGES_LIST.map((col) => ({ slug: col.slug }));
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const col = DETAILED_COLLEGES_LIST.find((c) => c.slug === slug);

  if (!col) return { title: 'College Info' };

  return {
    title: `${col.bnName} (${col.name}) একাদশ শ্রেণি ভর্তি ২০২৬ | EIIN ${col.eiin || ''}, জিপিএ ও সিট সংখ্যা`,
    description: `${col.bnName}-এর ২০২৬ शिक्षাবর্ষে একাদশ শ্রেণিতে বিজ্ঞান, মানবিক ও ব্যবসায় শিক্ষা শাখায় আবেদনের ন্যূনতম জিপিএ, EIIN ${col.eiin || ''}, মোট আসন সংখ্যা ${col.totalSeats}, শিফট ও ভর্তি নির্দেশিকা।`,
    openGraph: {
      title: `${col.bnName} একাদশ শ্রেণি ভর্তি ২০২৬ | EIIN ${col.eiin || ''}, জিপিএ ও সিট`,
      description: `${col.bnName}-এর বিজ্ঞান, মানবিক ও ব্যবসায় শিক্ষা শাখার ন্যূনতম GPA, আসন সংখ্যা ও নির্দেশিকা।`,
      images: col.image ? [{ url: col.image }] : undefined,
    },
  };
}

export default async function IndividualCollegePage({ params }: RouteProps) {
  const { slug } = await params;
  const col = DETAILED_COLLEGES_LIST.find((c) => c.slug === slug);

  if (!col) {
    notFound();
  }

  const sscBooks = await getBooksByClass('ssc');
  const hscBooks = await getBooksByClass('hsc');
  const relatedBooks = [...sscBooks, ...hscBooks].slice(0, 6);

  return (
    <div className="space-y-8 pb-12">
      <Breadcrumb
        items={[
          { label: 'সকল কলেজ তালিকা', href: '/colleges' },
          { label: col.bnName },
        ]}
      />

      {/* College Image Banner & Hero Header */}
      <div className="bg-white border-2 border-emerald-100 rounded-2xl overflow-hidden shadow-md">
        {col.image && (
          <div className="relative w-full h-52 sm:h-72 bg-gray-900">
            {/* eslint-disable-next-html-element-suppression */}
            <img
              src={col.image}
              alt={col.bnName}
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 text-white space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-emerald-600 px-3 py-1 rounded-full text-2xs font-bold text-white uppercase tracking-wider">
                  {col.type} • {col.gender}
                </span>

                {col.eiin && (
                  <span className="bg-white/20 backdrop-blur-xs px-2.5 py-0.5 rounded text-2xs font-mono font-bold text-emerald-200">
                    EIIN: {col.eiin}
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight text-white drop-shadow-md">
                {col.bnName} ({col.name})
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-emerald-200">
                <span className="flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{col.location}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{col.shift}</span>
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="p-6 sm:p-8 space-y-4">
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            {col.description}
          </p>
        </div>
      </div>

      {/* Top Ad Slot */}
      <AdSlot slotId={`college-${col.slug}-top`} format="horizontal" />

      {/* Principal's Message Section */}
      {col.principalMessage && (
        <section className="bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100 border border-emerald-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs relative overflow-hidden">
          <div className="flex items-center space-x-3 border-b border-emerald-200/80 pb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-xs">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-emerald-950">
                অধ্যক্ষের বাণী (Principal & Authority Guidance)
              </h2>
              <p className="text-xs text-emerald-800 font-medium">
                {col.bnName}-এর প্রশাসন ও একাডেমিক বার্তা
              </p>
            </div>
          </div>

          <div className="relative pl-6 sm:pl-8 text-sm sm:text-base text-emerald-950 italic leading-relaxed font-medium">
            <Quote className="w-6 h-6 text-emerald-600/40 absolute top-0 left-0 -translate-y-1" />
            <p>&quot;{col.principalMessage}&quot;</p>
          </div>
        </section>
      )}

      {/* Section 1: Minimum GPA Requirements */}
      <section className="bg-white border-2 border-emerald-100 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-extrabold text-emerald-950 flex items-center space-x-2 border-b border-gray-200 pb-3">
          <Award className="w-6 h-6 text-emerald-600" />
          <span>আবেদনের ন্যূনতম জিপিএ রিকোয়ারমেন্ট (Minimum GPA Requirements)</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-semibold">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-1">
            <span className="text-xs text-blue-800 font-bold block">বিজ্ঞান বিভাগ (Science)</span>
            <span className="text-xl font-extrabold text-blue-950">{col.scienceGPA}</span>
            <span className="text-2xs text-gray-500 block">বিজ্ঞান শাখায় প্রয়োজনীয় GPA</span>
          </div>

          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
            <span className="text-xs text-emerald-800 font-bold block">ব্যবসায় শিক্ষা (Commerce)</span>
            <span className="text-xl font-extrabold text-emerald-950">{col.commerceGPA}</span>
            <span className="text-2xs text-gray-500 block">ব্যবসায় শাখায় প্রয়োজনীয় GPA</span>
          </div>

          <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl space-y-1">
            <span className="text-xs text-purple-800 font-bold block">মানবিক বিভাগ (Arts)</span>
            <span className="text-xl font-extrabold text-purple-950">{col.artsGPA}</span>
            <span className="text-2xs text-gray-500 block">মানবিক শাখায় প্রয়োজনীয় GPA</span>
          </div>
        </div>
      </section>

      {/* Section 2: Seat Capacity Breakdown Table */}
      <section className="bg-white border-2 border-emerald-100 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-extrabold text-emerald-950 flex items-center space-x-2 border-b border-gray-200 pb-3">
          <Users className="w-6 h-6 text-emerald-600" />
          <span>বিষয়ভিত্তিক আসন সংখ্যা (Seat Breakdown - মোট {col.totalSeats}টি আসন)</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-gray-900 text-white uppercase text-xs font-bold">
                <th className="p-3.5 rounded-tl-xl">বিভাগ (Group)</th>
                <th className="p-3.5 text-center">আসন সংখ্যা (Seats)</th>
                <th className="p-3.5 text-center rounded-tr-xl">ন্যূনতম জিপিএ (Min GPA)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 font-medium text-gray-800 text-xs sm:text-sm">
              <tr className="hover:bg-blue-50/40">
                <td className="p-3.5 font-bold text-blue-950">বিজ্ঞান বিভাগ (Science)</td>
                <td className="p-3.5 text-center font-bold text-blue-900">{col.seatsScience}টি</td>
                <td className="p-3.5 text-center font-bold text-blue-900 bg-blue-50/50 rounded">{col.scienceGPA}</td>
              </tr>
              <tr className="hover:bg-emerald-50/40">
                <td className="p-3.5 font-bold text-emerald-950">ব্যবসায় শিক্ষা (Commerce)</td>
                <td className="p-3.5 text-center font-bold text-emerald-900">{col.seatsCommerce}টি</td>
                <td className="p-3.5 text-center font-bold text-emerald-900 bg-emerald-50/50 rounded">{col.commerceGPA}</td>
              </tr>
              <tr className="hover:bg-purple-50/40">
                <td className="p-3.5 font-bold text-purple-950">মানবিক বিভাগ (Humanities / Arts)</td>
                <td className="p-3.5 text-center font-bold text-purple-900">{col.seatsArts}টি</td>
                <td className="p-3.5 text-center font-bold text-purple-900 bg-purple-50/50 rounded">{col.artsGPA}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Middle Ad Slot */}
      <AdSlot slotId={`college-${col.slug}-middle`} format="horizontal" />

      {/* Section 3: Contact & Address Information */}
      <section className="bg-white border-2 border-emerald-100 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-extrabold text-emerald-950 flex items-center space-x-2 border-b border-gray-200 pb-3">
          <Building2 className="w-6 h-6 text-emerald-600" />
          <span>ঠিকানা ও অফিশিয়াল তথ্য (Contact Details)</span>
        </h2>

        <div className="space-y-2 text-sm text-gray-800">
          <p className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span><strong>ঠিকানা:</strong> {col.address}</span>
          </p>

          {col.website && (
            <p className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>
                <strong>অফিশিয়াল ওয়েবসাইট:</strong>{' '}
                <a
                  href={col.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 font-bold hover:underline font-mono"
                >
                  {col.website}
                </a>
              </span>
            </p>
          )}
        </div>
      </section>

      {/* Section 4: Related SSC/HSC Admission Books */}
      {relatedBooks.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center space-x-2 border-b border-gray-200 pb-2">
            <BookOpen className="w-5 h-5 text-emerald-700" />
            <h2 className="text-xl font-bold text-gray-900">
              {col.bnName}-এর জন্য প্রয়োজনীয় SSC & HSC গাইড বই PDF
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
