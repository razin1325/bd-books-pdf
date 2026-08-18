import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import AdSlot from '@/components/AdSlot';
import { getBooksBySubject } from '@/lib/data';
import { ADMISSION_BANKS, getAdmissionUnitRelativeSlug } from '@/lib/admission';
import { BookOpen, ArrowRight } from 'lucide-react';

interface RouteProps {
  params: Promise<{
    bank: string;
  }>;
}

function findBank(bankSlug: string) {
  return ADMISSION_BANKS.find((b) => b.bankSlug === bankSlug);
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { bank } = await params;
  const found = findBank(bank);
  if (!found) return { title: 'Page Not Found' };
  const title = `${found.bnName} প্রশ্নব্যাংক PDF | ${found.name} Question Bank`;
  return {
    title,
    description: `${found.bnName} ভর্তি পরীক্ষার ইউনিট অনুযায়ী বিগত বছরের প্রশ্ন ও সমাধান PDF ডাউনলোড করুন। ${found.description}`,
  };
}

export default async function AdmissionBankPage({ params }: RouteProps) {
  const { bank } = await params;
  const found = findBank(bank);
  if (!found) {
    notFound();
  }

  const books = await getBooksBySubject('admission', found.subjectSlug);

  const units = found.units.map((unit) => {
    const unitBooks = books.filter((b) => {
      if (getAdmissionUnitRelativeSlug(b.slug) !== null && b.slug.startsWith(`${unit.unitSlug}-`)) return true;
      // Single-unit banks (e.g. medical) list all their books directly
      return found.units.length === 1;
    });
    return { ...unit, count: unitBooks.length };
  });

  return (
    <div className="space-y-8">
      <Breadcrumb
        items={[
          { label: 'Admission', href: '/class/admission' },
          { label: found.bnName },
        ]}
      />

      <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-xs space-y-3">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
          {found.bnName} প্রশ্নব্যাংক PDF
        </h1>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{found.description}</p>
      </div>

      <AdSlot slotId={`subject-${found.subjectSlug}-top`} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {units.map((unit) => (
          <Link
            key={unit.unitSlug}
            href={`/admission/${found.bankSlug}/${unit.unitSlug}`}
            className="bg-white rounded-xl border border-gray-200 hover:border-emerald-500 hover:shadow-md transition-all p-5 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                    {unit.name}
                  </h2>
                  <p className="text-xs text-gray-500">{unit.bnName}</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
            </div>
            <p className="mt-3 text-xs text-gray-500 leading-relaxed">{unit.description}</p>
            <p className="mt-3 text-xs font-bold text-emerald-700">
              {unit.count} টি বই ({unit.count > 0 ? 'বিগত বছরের প্রশ্ন ও সমাধান' : 'শীঘ্রই আসছে'})
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
