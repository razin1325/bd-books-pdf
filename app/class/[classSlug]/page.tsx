import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import AdSlot from '@/components/AdSlot';
import ExpandableBookGrid from '@/components/ExpandableBookGrid';
import { CLASSES_LIST, SUBJECTS_LIST, Book } from '@/lib/types';
import { getBooksByClass } from '@/lib/data';
import { BookOpen, FileText, ChevronRight, Stethoscope, GraduationCap } from 'lucide-react';

interface ClassPageProps {
  params: Promise<{
    classSlug: string;
  }>;
}

export async function generateStaticParams() {
  return CLASSES_LIST.map((cls) => ({
    classSlug: cls.slug,
  }));
}

export async function generateMetadata({ params }: ClassPageProps): Promise<Metadata> {
  const { classSlug } = await params;
  const currentClass = CLASSES_LIST.find((c) => c.slug === classSlug);

  if (!currentClass) {
    return {
      title: 'Class Not Found',
    };
  }

  const title = `${currentClass.name} Books PDF 2026 | ${currentClass.bnName} বই ও গাইড`;
  const description = `${currentClass.name} Books PDF 2026. ${currentClass.bnName}-এর সকল বিষয়ের বোর্ড পাঠ্যবই, গাইড বই এবং নোট PDF ডাউনলোড ও অনলাইনে পড়ার সুযোগ।`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default async function ClassPage({ params }: ClassPageProps) {
  const { classSlug } = await params;
  const currentClass = CLASSES_LIST.find((c) => c.slug === classSlug);

  if (!currentClass) {
    notFound();
  }

  const classBooks = await getBooksByClass(classSlug);
  const textBooks = classBooks.filter((b) => b.book_type === 'textbook');
  const guideBooks = classBooks.filter((b) => b.book_type === 'guide' || b.book_type === 'solution');

  // Medical Books helper
  const isMedicalBook = (b: Book) => {
    const text = (b.title + ' ' + (b.description || '') + ' ' + (b.author || '') + ' ' + (b.publisher || '')).toLowerCase();
    return (
      text.includes('retina') ||
      text.includes('মেডিকেল') ||
      text.includes('রেটিনা') ||
      text.includes('medical') ||
      text.includes('প্রাণিবিজ্ঞান') ||
      text.includes('উদ্ভিদবিজ্ঞান') ||
      text.includes('zoology') ||
      text.includes('botany')
    );
  };

  const isAdmission = classSlug === 'admission';
  const medicalGuideBooks = isAdmission ? guideBooks.filter(isMedicalBook) : [];
  const otherAdmissionGuideBooks = isAdmission ? guideBooks.filter((b) => !isMedicalBook(b)) : [];

  // Extract all dynamic subjects (standard + custom subjects added via admin)
  const dynamicSubjectsMap = new Map<string, { name: string; slug: string }>();

  // Add standard subjects
  SUBJECTS_LIST.forEach((s) => {
    dynamicSubjectsMap.set(s.slug, { name: s.name, slug: s.slug });
  });

  // Add any custom subjects present in books for this class
  classBooks.forEach((b) => {
    if (!dynamicSubjectsMap.has(b.subject_slug)) {
      dynamicSubjectsMap.set(b.subject_slug, { name: b.subject, slug: b.subject_slug });
    }
  });

  const availableSubjects = Array.from(dynamicSubjectsMap.values());

  return (
    <div className="space-y-8">
      <Breadcrumb items={[{ label: `${currentClass.name} Books PDF` }]} />

      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-xs space-y-3">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
          {currentClass.name} Books PDF ({currentClass.bnName})
        </h1>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-4xl">
          এখানে {currentClass.bnName}-এর সকল বিষয়ের বোর্ড পাঠ্যবই এবং গাইড বইয়ের PDF ডাউনলোড লিংক দেওয়া হয়েছে। শিক্ষার্থী ও শিক্ষকদের সুবিধার্থে সকল বিষয়ভিত্তিক ক্যাটাগরি সাজানো হয়েছে।
        </p>
      </div>

      <AdSlot slotId={`class-${classSlug}-top`} format="horizontal" />

      {/* If Admission Page: Render Dedicated Medical Books Section first */}
      {isAdmission && medicalGuideBooks.length > 0 && (
        <section className="space-y-4 bg-emerald-50/50 p-5 rounded-2xl border border-emerald-200">
          <div className="flex items-center space-x-2 border-b border-emerald-200 pb-2">
            <Stethoscope className="w-6 h-6 text-emerald-600" />
            <h2 className="text-xl font-bold text-emerald-950">
              মেডিকেল ভর্তি পরীক্ষা গাইড ও ডাইজেস্ট (Medical Admission Books)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-emerald-700">
            মেডিকেল ও ডেন্টাল ভর্তি পরীক্ষার্থীদের জন্য রেটিনা ডাইজেস্ট ও মেডিকেল প্রশ্নব্যাংক কালেকশন।
          </p>

          <ExpandableBookGrid books={medicalGuideBooks} initialCount={5} step={5} />
        </section>
      )}

      {/* Section: Guide Books by Subject */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 border-b border-gray-200 pb-2">
          {isAdmission ? (
            <GraduationCap className="w-6 h-6 text-indigo-600" />
          ) : (
            <FileText className="w-6 h-6 text-emerald-600" />
          )}
          <h2 className="text-xl font-bold text-gray-900">
            {isAdmission ? 'ভার্সিটি ও ইঞ্জিনিয়ারিং এডমিশন গাইড (University & Engineering)' : 'Guide Books (গাইড ও নোটসমূহ)'}
          </h2>
        </div>

        {/* Subject Quick Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {availableSubjects.map((subj) => (
            <Link
              key={subj.slug}
              href={`/guide-books/${classSlug}/${subj.slug}`}
              className="bg-white p-3 rounded-lg border border-gray-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all flex items-center justify-between text-xs sm:text-sm font-medium text-gray-800"
            >
              <span className="truncate pr-1">{subj.name} Guide</span>
              <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
            </Link>
          ))}
        </div>

        {/* Available Guide Books Cards (or Other Admission Books) */}
        {isAdmission ? (
          otherAdmissionGuideBooks.length > 0 && (
            <div className="pt-4">
              <h3 className="text-sm font-semibold text-gray-500 mb-3">
                ভার্সিটি ও ইঞ্জিনিয়ারিং ভর্তি প্রস্তুতি গাইডসমূহ:
              </h3>
              <ExpandableBookGrid books={otherAdmissionGuideBooks} initialCount={5} step={5} />
            </div>
          )
        ) : (
          guideBooks.length > 0 && (
            <div className="pt-4">
              <h3 className="text-sm font-semibold text-gray-500 mb-3">
                {currentClass.name} Available Guide Books & Solutions:
              </h3>
              <ExpandableBookGrid books={guideBooks} initialCount={5} step={5} />
            </div>
          )
        )}
      </section>

      {/* Section: Text Books by Subject */}
      {textBooks.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center space-x-2 border-b border-gray-200 pb-2">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Text Books (পাঠ্যবই বিষয়সমূহ)</h2>
          </div>

          {/* Subject Quick Badges Link to /[classSlug]/[subjectSlug] */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {availableSubjects.map((subj) => (
              <Link
                key={subj.slug}
                href={`/${classSlug}/${subj.slug}`}
                className="bg-white p-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all flex items-center justify-between text-xs sm:text-sm font-medium text-gray-800"
              >
                <span className="truncate pr-1">{subj.name}</span>
                <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
              </Link>
            ))}
          </div>

          {/* Available Text Books Cards */}
          <div className="pt-4">
            <h3 className="text-sm font-semibold text-gray-500 mb-3">
              {currentClass.name} Available Textbooks:
            </h3>
            <ExpandableBookGrid books={textBooks} initialCount={5} step={5} />
          </div>
        </section>
      )}
    </div>
  );
}
