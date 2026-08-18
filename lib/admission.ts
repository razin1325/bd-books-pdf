import { Book } from '@/lib/types';

export interface AdmissionUnit {
  unitSlug: string;
  name: string;
  bnName: string;
  description: string;
}

export interface AdmissionBank {
  bankSlug: string;
  subjectSlug: string;
  name: string;
  bnName: string;
  description: string;
  units: AdmissionUnit[];
}

export const ADMISSION_BANKS: AdmissionBank[] = [
  {
    bankSlug: 'du',
    subjectSlug: 'du',
    name: 'Dhaka University (DU)',
    bnName: 'ঢাকা বিশ্ববিদ্যালয় (DU)',
    description: 'ঢাকা বিশ্ববিদ্যালয় ভর্তি পরীক্ষার ক, খ, গ ও ঘ ইউনিটের বিগত বছরের প্রশ্ন ও সমাধান PDF।',
    units: [
      {
        unitSlug: 'du-a-unit',
        name: 'DU A Unit',
        bnName: 'ঢাবি ক ইউনিট (বিজ্ঞান)',
        description: 'ঢাকা বিশ্ববিদ্যালয় ক ইউনিট (বিজ্ঞান) ভর্তি পরীক্ষার বিগত বছরের প্রশ্ন ও সমাধান PDF।',
      },
      {
        unitSlug: 'du-b-unit',
        name: 'DU B Unit',
        bnName: 'ঢাবি খ ইউনিট (মানবিক)',
        description: 'ঢাকা বিশ্ববিদ্যালয় খ ইউনিট (মানবিক) ভর্তি পরীক্ষার বিগত বছরের প্রশ্ন ও সমাধান PDF।',
      },
      {
        unitSlug: 'du-c-unit',
        name: 'DU C Unit',
        bnName: 'ঢাবি গ ইউনিট (বাণিজ্য)',
        description: 'ঢাকা বিশ্ববিদ্যালয় গ ইউনিট (বাণিজ্য) ভর্তি পরীক্ষার বিগত বছরের প্রশ্ন ও সমাধান PDF।',
      },
      {
        unitSlug: 'du-d-unit',
        name: 'DU D Unit',
        bnName: 'ঢাবি ঘ ইউনিট (সমন্বিত)',
        description: 'ঢাকা বিশ্ববিদ্যালয় ঘ ইউনিট (সমন্বিত) ভর্তি পরীক্ষার বিগত বছরের প্রশ্ন ও সমাধান PDF।',
      },
    ],
  },
  {
    bankSlug: 'gst',
    subjectSlug: 'gst',
    name: 'GST (Guccho)',
    bnName: 'গুচ্ছ বিশ্ববিদ্যালয় (GST)',
    description:
      'গুচ্ছ (GST) ভর্তি পরীক্ষার A, B ও C ইউনিট এবং সংশ্লিষ্ট বিশ্ববিদ্যালয়গুলোর বিগত বছরের প্রশ্ন ও সমাধান PDF।',
    units: [
      {
        unitSlug: 'gst-a-unit',
        name: 'GST A Unit',
        bnName: 'GST ক ইউনিট (বিজ্ঞান)',
        description: 'GST A ইউনিট (বিজ্ঞান) ভর্তি পরীক্ষার বিগত বছরের প্রশ্ন ও সমাধান PDF।',
      },
      {
        unitSlug: 'gst-b-unit',
        name: 'GST B Unit',
        bnName: 'GST খ ইউনিট (মানবিক)',
        description: 'GST B ইউনিট (মানবিক) ভর্তি পরীক্ষার বিগত বছরের প্রশ্ন ও সমাধান PDF।',
      },
      {
        unitSlug: 'gst-c-unit',
        name: 'GST C Unit',
        bnName: 'GST গ ইউনিট (বাণিজ্য)',
        description: 'GST C ইউনিট (বাণিজ্য) ভর্তি পরীক্ষার বিগত বছরের প্রশ্ন ও সমাধান PDF।',
      },
      {
        unitSlug: 'gst-bsmrstu',
        name: 'BSMRSTU',
        bnName: 'বঙ্গবন্ধু শেখ মুজিবুর রহমান বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় (BSMRSTU)',
        description: 'BSMRSTU ভর্তি পরীক্ষার বিগত বছরের প্রশ্ন ও সমাধান (বিজ্ঞান) PDF।',
      },
      {
        unitSlug: 'gst-hstu',
        name: 'HSTU',
        bnName: 'হাজী মোহাম্মদ দানেশ বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় (HSTU)',
        description: 'HSTU ভর্তি পরীক্ষার বিগত বছরের প্রশ্ন ও সমাধান (বিজ্ঞান) PDF।',
      },
      {
        unitSlug: 'gst-iu',
        name: 'Islamic University (IU)',
        bnName: 'ইসলামী বিশ্ববিদ্যালয় (IU)',
        description: 'ইসলামী বিশ্ববিদ্যালয় (IU) ভর্তি পরীক্ষার বিগত বছরের প্রশ্ন ও সমাধান (বিজ্ঞান) PDF।',
      },
      {
        unitSlug: 'gst-jnu',
        name: 'Jagannath University (JNU)',
        bnName: 'জগন্নাথ বিশ্ববিদ্যালয় (JNU)',
        description: 'জগন্নাথ বিশ্ববিদ্যালয় (JNU) ভর্তি পরীক্ষার বিগত বছরের প্রশ্ন ও সমাধান (বিজ্ঞান) PDF।',
      },
      {
        unitSlug: 'gst-just',
        name: 'JUST',
        bnName: 'যশোর বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় (JUST)',
        description: 'যশোর বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় (JUST) ভর্তি পরীক্ষার বিগত বছরের প্রশ্ন ও সমাধান (বিজ্ঞান) PDF।',
      },
      {
        unitSlug: 'gst-ku',
        name: 'Khulna University (KU)',
        bnName: 'খুলনা বিশ্ববিদ্যালয় (KU)',
        description: 'খুলনা বিশ্ববিদ্যালয় (KU) ভর্তি পরীক্ষার বিগত বছরের প্রশ্ন ও সমাধান (বিজ্ঞান) PDF।',
      },
      {
        unitSlug: 'gst-mbstu',
        name: 'MBSTU',
        bnName: 'মাওলানা ভাসানী বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় (MBSTU)',
        description: 'মাওলানা ভাসানী বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় (MBSTU) ভর্তি পরীক্ষার বিগত বছরের প্রশ্ন ও সমাধান (বিজ্ঞান) PDF।',
      },
      {
        unitSlug: 'gst-nstu',
        name: 'NSTU',
        bnName: 'নোয়াখালী বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় (NSTU)',
        description: 'নোয়াখালী বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় (NSTU) ভর্তি পরীক্ষার বিগত বছরের প্রশ্ন ও সমাধান (বিজ্ঞান) PDF।',
      },
      {
        unitSlug: 'gst-pust',
        name: 'PUST',
        bnName: 'পাবনা বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় (PUST)',
        description: 'পাবনা বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় (PUST) ভর্তি পরীক্ষার বিগত বছরের প্রশ্ন ও সমাধান (বিজ্ঞান) PDF।',
      },
      {
        unitSlug: 'gst-sust',
        name: 'SUST',
        bnName: 'শাহজালাল বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় (SUST)',
        description: 'শাহজালাল বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় (SUST) ভর্তি পরীক্ষার বিগত বছরের প্রশ্ন ও সমাধান (বিজ্ঞান) PDF।',
      },
    ],
  },
  {
    bankSlug: 'cu',
    subjectSlug: 'cu',
    name: 'Chittagong University (CU)',
    bnName: 'চট্টগ্রাম বিশ্ববিদ্যালয় (CU)',
    description: 'চট্টগ্রাম বিশ্ববিদ্যালয় ভর্তি পরীক্ষার ক ইউনিটের বিগত বছরের প্রশ্ন ও সমাধান PDF।',
    units: [
      {
        unitSlug: 'cu-a-unit',
        name: 'CU A Unit',
        bnName: 'চবি ক ইউনিট (বিজ্ঞান)',
        description: 'চট্টগ্রাম বিশ্ববিদ্যালয় ক ইউনিট (বিজ্ঞান) ভর্তি পরীক্ষার বিগত বছরের প্রশ্ন ও সমাধান PDF।',
      },
    ],
  },
  {
    bankSlug: 'ru',
    subjectSlug: 'ru',
    name: 'Rajshahi University (RU)',
    bnName: 'রাজশাহী বিশ্ববিদ্যালয় (RU)',
    description: 'রাজশাহী বিশ্ববিদ্যালয় ভর্তি পরীক্ষার ক, খ ও গ ইউনিটের বিগত বছরের প্রশ্ন ও সমাধান PDF।',
    units: [
      {
        unitSlug: 'ru-a-unit',
        name: 'RU A Unit',
        bnName: 'রাবি ক ইউনিট (মানবিক)',
        description: 'রাজশাহী বিশ্ববিদ্যালয় ক ইউনিট (মানবিক) ভর্তি পরীক্ষার বিগত বছরের প্রশ্ন ও সমাধান PDF।',
      },
      {
        unitSlug: 'ru-b-unit',
        name: 'RU B Unit',
        bnName: 'রাবি খ ইউনিট (বাণিজ্য)',
        description: 'রাজশাহী বিশ্ববিদ্যালয় খ ইউনিট (বাণিজ্য) ভর্তি পরীক্ষার বিগত বছরের প্রশ্ন ও সমাধান PDF।',
      },
      {
        unitSlug: 'ru-c-unit',
        name: 'RU C Unit',
        bnName: 'রাবি গ ইউনিট (বিজ্ঞান)',
        description: 'রাজশাহী বিশ্ববিদ্যালয় গ ইউনিট (বিজ্ঞান) ভর্তি পরীক্ষার বিগত বছরের প্রশ্ন ও সমাধান PDF।',
      },
    ],
  },
  {
    bankSlug: 'medical',
    subjectSlug: 'medical',
    name: 'Medical & Dental',
    bnName: 'মেডিকেল ও ডেন্টাল ভর্তি',
    description:
      'মেডিকেল ও ডেন্টাল ভর্তি পরীক্ষার প্রস্তুতির জন্য প্রশ্নব্যাংক, গাইড ও লেকচার বই PDF।',
    units: [
      {
        unitSlug: 'medical-books',
        name: 'Medical Admission Books',
        bnName: 'মেডিকেল ভর্তি বই',
        description: 'মেডিকেল ভর্তি পরীক্ষার প্রস্তুতির জন্য প্রশ্নব্যাংক, গাইড ও নোট PDF।',
      },
    ],
  },
];

/** Returns the bank (du, gst) for an admission book, or null if not an admission-bank book. */
export function getAdmissionBank(bookSlug: string): AdmissionBank | null {
  return ADMISSION_BANKS.find((b) => bookSlug.startsWith(`${b.bankSlug}-`)) ?? null;
}

/** Returns the unit slug (du-a-unit) for a question-bank book slug (du-a-unit-2009-2010). */
export function getAdmissionUnitSlug(bookSlug: string): string | null {
  const bank = getAdmissionBank(bookSlug);
  if (!bank) return null;
  return bank.units.find((u) => bookSlug.startsWith(`${u.unitSlug}-`))?.unitSlug ?? null;
}

/** Returns the unit-relative slug (2009-2010) for a question-bank book slug. */
export function getAdmissionUnitRelativeSlug(bookSlug: string): string | null {
  const unit = getAdmissionUnitSlug(bookSlug);
  return unit ? bookSlug.slice(unit.length + 1) : null;
}

/** URL for an admission question-bank book: /admission/{bank}/{unit}/{relativeSlug}. */
export function getAdmissionBookHref(book: Book): string {
  if (book.class_slug !== 'admission') return `/${book.class_slug}/${book.slug}`;
  const unit = getAdmissionUnitSlug(book.slug);
  const relative = getAdmissionUnitRelativeSlug(book.slug);
  if (unit && relative) return `/admission/${getAdmissionBank(book.slug)?.bankSlug}/${unit}/${relative}`;
  // Books not grouped by a unit prefix (e.g. medical) map to their bank's single unit
  const bank = ADMISSION_BANKS.find((b) => b.subjectSlug === book.subject_slug);
  if (bank && bank.units.length === 1) return `/admission/${bank.bankSlug}/${bank.units[0].unitSlug}/${book.slug}`;
  return `/admission/${book.subject_slug}/${book.slug}`;
}
