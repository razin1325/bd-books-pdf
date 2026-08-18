import React from 'react';
import Link from 'next/link';
import SearchBox from '@/components/SearchBox';
import BookCard from '@/components/BookCard';
import AdSlot from '@/components/AdSlot';
import HscSection from '@/components/HscSection';
import { CLASSES_LIST } from '@/lib/types';
import { getLatestBooks, getBooksByType, getBooksByClass } from '@/lib/data';
import { BookOpen, GraduationCap, FileText, Sparkles, ArrowRight, Award, ChevronRight, BookMarked } from 'lucide-react';

const ADMISSION_VARSITIES = [
  { name: 'ঢাকা বিশ্ববিদ্যালয় (DU)', slug: 'du', color: 'from-blue-700 to-indigo-900' },
  { name: 'বুয়েট ও প্রকৌশল (BUET)', slug: 'buet', color: 'from-amber-700 to-orange-900' },
  { name: 'চট্টগ্রাম বিশ্ববিদ্যালয় (CU)', slug: 'cu', color: 'from-emerald-700 to-teal-900' },
  { name: 'রাজশাহী বিশ্ববিদ্যালয় (RU)', slug: 'ru', color: 'from-rose-700 to-red-900' },
  { name: 'মেডিকেল ও ডেন্টাল (Medical)', slug: 'medical', color: 'from-cyan-700 to-blue-900' },
  { name: 'গুচ্ছ বিশ্ববিদ্যালয় (GST)', slug: 'gst', color: 'from-purple-700 to-violet-900' },
  { name: 'কৃষি গুচ্ছ (Agri GST)', slug: 'agri', color: 'from-lime-700 to-green-900' },
];

export default async function HomePage() {
  const latestBooks = await getLatestBooks(6);
  const guideBooks = await getBooksByType('guide');

  // Fetch 5 distinct rows of NCTB Textbooks
  const primaryBooks1_5 = (await getBooksByType('textbook'))
    .filter((b) => ['class-1', 'class-2', 'class-3', 'class-4', 'class-5'].includes(b.class_slug))
    .slice(0, 6);

  const class6Textbooks = (await getBooksByClass('class-6'))
    .filter((b) => b.book_type === 'textbook')
    .slice(0, 6);

  const class7Textbooks = (await getBooksByClass('class-7'))
    .filter((b) => b.book_type === 'textbook')
    .slice(0, 6);

  const class8Textbooks = (await getBooksByClass('class-8'))
    .filter((b) => b.book_type === 'textbook')
    .slice(0, 6);

  const class910Textbooks = (await getBooksByClass('class-9-10'))
    .filter((b) => b.book_type === 'textbook')
    .slice(0, 6);

  return (
    <div className="space-y-8 sm:space-y-10 pb-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-900 text-white rounded-2xl p-5 sm:p-10 shadow-md relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center space-x-2 bg-emerald-600/50 backdrop-blur-sm border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-medium text-emerald-100">
            <Sparkles className="w-3.5 h-3.5" />
            <span>NCTB বোর্ড বই, গাইড ও এডমিশন PDF ২০২৬</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            বাংলাদেশের সকল শ্রেণির বই, গাইড ও বিশ্ববিদ্যালয় এডমিশন PDF
          </h1>

          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            শ্রেণি, বিষয় ও বিশ্ববিদ্যালয় ভর্তি প্রস্তুতি অনুযায়ী পাঠ্যবই, গাইড বই এবং প্রয়োজনীয় শিক্ষামূলক PDF খুঁজে নিন। একদম সহজ ও দ্রুত ডাউনলোডের ব্যবস্থা।
          </p>

          <div className="pt-2 max-w-2xl">
            <SearchBox placeholder="বই, গাইড বা ভার্সিটির নাম লিখে সার্চ করুন... (যেমন: DU Question Bank, BUET Math)" />
          </div>
        </div>
      </section>

      {/* Top Ad Slot */}
      <AdSlot slotId="homepage-top" format="horizontal" showPlaceholder={true} />

      {/* Section: Dedicated University Admission Preparation */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 pb-2.5">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shadow-xs flex-shrink-0">
              <Award className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-extrabold text-gray-900 leading-snug">
                University Admission Preparation (ভর্তি প্রস্তুতি)
              </h2>
              <p className="text-2xs sm:text-xs text-gray-500 font-medium">
                DU, BUET, CU, RU, Medical ও গুচ্ছ বিশ্ববিদ্যালয়ের প্রশ্ন ব্যাংক ও গাইড PDF
              </p>
            </div>
          </div>
          <Link
            href="/class/admission"
            className="text-xs sm:text-sm font-semibold text-amber-700 hover:text-amber-800 flex items-center space-x-1 flex-shrink-0"
          >
            <span>সব দেখুন</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3">
          {ADMISSION_VARSITIES.map((v) => (
            <Link
              key={v.slug}
              href={`/admission/${v.slug}`}
              className={`bg-gradient-to-br ${v.color} text-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md hover:scale-[1.02] transition-all flex flex-col justify-between space-y-3 relative overflow-hidden group border border-white/10`}
            >
              <div>
                <span className="text-xs sm:text-base font-extrabold leading-snug block group-hover:underline">
                  {v.name}
                </span>
              </div>
              <div className="flex items-center justify-between text-3xs sm:text-xs font-semibold text-white/90 pt-1.5 border-t border-white/20">
                <span>প্রশ্ন ব্যাংক PDF</span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 🎓 Section: HSC (Class 11-12) Articles & Routine */}
      <HscSection />

      {/* Section: Browse By Class (Mobile: 4 per row, Desktop: 6 per row) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 pb-2.5">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-xs flex-shrink-0">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-extrabold text-gray-900 leading-snug">
                Browse By Class (শ্রেণি নির্বাচন করুন)
              </h2>
              <p className="text-2xs sm:text-xs text-gray-500 font-medium">
                আপনার কাঙ্ক্ষিত শ্রেণির পাঠ্যবই ও গাইড পেতে অপশনে ক্লিক করুন
              </p>
            </div>
          </div>
        </div>

        {/* Mobile: 4 cols (grid-cols-4), Desktop: 6 cols (lg:grid-cols-6) */}
        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-2 sm:gap-3.5">
          {CLASSES_LIST.map((cls) => (
            <Link
              key={cls.slug}
              href={`/class/${cls.slug}`}
              className="bg-white p-2 sm:p-4 rounded-xl sm:rounded-2xl border-2 border-gray-200 hover:border-emerald-600 hover:shadow-md transition-all text-center group flex flex-col items-center justify-between space-y-1.5 sm:space-y-2 relative overflow-hidden"
            >
              <div className="w-full h-1 bg-emerald-500 absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity" />

              <span className="text-xs sm:text-lg font-extrabold text-gray-900 group-hover:text-emerald-700 transition-colors leading-tight">
                {cls.name}
              </span>

              <span className="text-[10px] sm:text-xs font-bold text-emerald-800 bg-emerald-50 px-1 py-0.5 sm:px-2.5 sm:py-0.5 rounded-md sm:rounded-full border border-emerald-200 group-hover:bg-emerald-600 group-hover:text-white transition-all whitespace-nowrap">
                {cls.bnName}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 📘 Section: Guide Books & Solutions (Moved right under Browse By Class!) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Guide Books & Solutions (গাইড বই ও সমাধান)
            </h2>
          </div>
          <Link
            href="/guide-books"
            className="text-xs sm:text-sm font-semibold text-emerald-700 hover:text-emerald-800 flex items-center space-x-1"
          >
            <span>সব গাইড বই</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {guideBooks.slice(0, 6).map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* Section: Popular Books */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Popular Books (জনপ্রিয় বইসমূহ)
            </h2>
          </div>
          <Link
            href="/books"
            className="text-xs sm:text-sm font-semibold text-emerald-700 hover:text-emerald-800 flex items-center space-x-1"
          >
            <span>সবগুলো দেখুন</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {latestBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* Middle Ad Slot */}
      <AdSlot slotId="homepage-middle" format="horizontal" showPlaceholder={true} />

      {/* ======================================================== */}
      {/* 📚 5 DISTINCT ROWS OF NCTB TEXTBOOKS WITH AD SLOTS BETWEEN EACH ROW */}
      {/* ======================================================== */}

      {/* ROW 1: Class 1 to 5 Primary Textbooks */}
      <section className="space-y-4 bg-emerald-50/40 p-4 sm:p-6 rounded-2xl border border-emerald-200">
        <div className="flex items-center justify-between border-b border-emerald-200 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-xs">
              ১-৫
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-gray-900">
                ১ম থেকে ৫ম শ্রেণি বোর্ড পাঠ্যবই (Primary NCTB Textbooks)
              </h2>
              <p className="text-3xs sm:text-2xs text-gray-500 font-medium">
                প্রথম, দ্বিতীয়, তৃতীয়, চতুর্থ ও পঞ্চম শ্রেণির অফিশিয়াল পাঠ্যবই PDF
              </p>
            </div>
          </div>
          <Link
            href="/textbooks"
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center space-x-1"
          >
            <span>সব দেখুন</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {primaryBooks1_5.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* 📢 AD SLOT BETWEEN ROW 1 & ROW 2 */}
      <AdSlot slotId="nctb-textbook-row-1-ad" format="horizontal" showPlaceholder={true} />

      {/* ROW 2: Class 6 Textbooks */}
      <section className="space-y-4 bg-blue-50/40 p-4 sm:p-6 rounded-2xl border border-blue-200">
        <div className="flex items-center justify-between border-b border-blue-200 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-xs">
              ৬ষ্ঠ
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-gray-900">
                ষষ্ঠ শ্রেণি বোর্ড পাঠ্যবই (Class 6 NCTB Textbooks)
              </h2>
              <p className="text-3xs sm:text-2xs text-gray-500 font-medium">
                ষষ্ঠ শ্রেণির বাংলা, গণিত, ইংরেজি, বিজ্ঞান ও সকল বিষয়ের পাঠ্যবই
              </p>
            </div>
          </div>
          <Link
            href="/class/class-6"
            className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center space-x-1"
          >
            <span>Class 6 সব বই</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {class6Textbooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* 📢 AD SLOT BETWEEN ROW 2 & ROW 3 */}
      <AdSlot slotId="nctb-textbook-row-2-ad" format="horizontal" showPlaceholder={true} />

      {/* ROW 3: Class 7 Textbooks */}
      <section className="space-y-4 bg-purple-50/40 p-4 sm:p-6 rounded-2xl border border-purple-200">
        <div className="flex items-center justify-between border-b border-purple-200 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center font-black text-xs">
              ৭ম
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-gray-900">
                সপ্তম শ্রেণি বোর্ড পাঠ্যবই (Class 7 NCTB Textbooks)
              </h2>
              <p className="text-3xs sm:text-2xs text-gray-500 font-medium">
                সপ্তম শ্রেণির বাংলা, গণিত, বিজ্ঞান, ইতিহাস ও সকল বিষয়ের পাঠ্যবই
              </p>
            </div>
          </div>
          <Link
            href="/class/class-7"
            className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center space-x-1"
          >
            <span>Class 7 সব বই</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {class7Textbooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* 📢 AD SLOT BETWEEN ROW 3 & ROW 4 */}
      <AdSlot slotId="nctb-textbook-row-3-ad" format="horizontal" showPlaceholder={true} />

      {/* ROW 4: Class 8 Textbooks */}
      <section className="space-y-4 bg-amber-50/40 p-4 sm:p-6 rounded-2xl border border-amber-200">
        <div className="flex items-center justify-between border-b border-amber-200 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center font-black text-xs">
              ৮ম
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-gray-900">
                অষ্টম শ্রেণি বোর্ড পাঠ্যবই (Class 8 NCTB Textbooks)
              </h2>
              <p className="text-3xs sm:text-2xs text-gray-500 font-medium">
                অষ্টম শ্রেণির গণিত, বিজ্ঞান, বাংলা, ইংরেজি ও সকল ধর্মীয় বিষয়
              </p>
            </div>
          </div>
          <Link
            href="/class/class-8"
            className="text-xs font-bold text-amber-700 hover:text-amber-900 flex items-center space-x-1"
          >
            <span>Class 8 সব বই</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {class8Textbooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* 📢 AD SLOT BETWEEN ROW 4 & ROW 5 */}
      <AdSlot slotId="nctb-textbook-row-4-ad" format="horizontal" showPlaceholder={true} />

      {/* ROW 5: Class 9 & 10 Textbooks */}
      <section className="space-y-4 bg-teal-50/40 p-4 sm:p-6 rounded-2xl border border-teal-200">
        <div className="flex items-center justify-between border-b border-teal-200 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-700 text-white flex items-center justify-center font-black text-xs">
              ৯-১০
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-gray-900">
                নবম ও দশম শ্রেণি বোর্ড পাঠ্যবই (Class 9-10 SSC Textbooks)
              </h2>
              <p className="text-3xs sm:text-2xs text-gray-500 font-medium">
                বিজ্ঞান, মানবিক ও ব্যবসায় শিক্ষা বিভাগের সকল এসএসসি বিষয়
              </p>
            </div>
          </div>
          <Link
            href="/class/class-9-10"
            className="text-xs font-bold text-teal-800 hover:text-teal-950 flex items-center space-x-1"
          >
            <span>Class 9-10 সব বই</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {class910Textbooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* 📢 AD SLOT BELOW ROW 5 */}
      <AdSlot slotId="nctb-textbook-row-5-ad" format="horizontal" showPlaceholder={true} />

      {/* Bottom Ad Slot */}
      <AdSlot slotId="homepage-bottom" format="horizontal" showPlaceholder={true} />
    </div>
  );
}
