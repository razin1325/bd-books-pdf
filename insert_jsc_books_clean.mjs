import fs from 'fs';

const jscBooksData = [
  {
    "id": "b-jsc-2026-1",
    "title": "অষ্টম শ্রেণির বাংলা ব্যাকরণ ও নির্মিতি বই ২০২৬ PDF | ৮ম শ্রেণির বাংলা ব্যাকরণ ও নির্মিতি বই ২০২৬ pdf",
    "slug": "class-8-bangla-grammar-book-2026-pdf",
    "driveUrl": "https://drive.google.com/file/d/117pXoJyf_LnJgxOy7R9-HcYMOGHeh2cq/view?usp=drive_link",
    "subject": "বাংলা (Bangla)",
    "subjectSlug": "bangla",
    "bookType": "guide"
  },
  {
    "id": "b-jsc-2026-2",
    "title": "অষ্টম শ্রেণির আনন্দপাঠ ২০২৬ (বাংলা দ্রুতপঠন) pdf Download |৮ম শ্রেণির আনন্দপাঠ বই ২০২৬ pdf",
    "slug": "class-8-bangla-anandapath-book-2026-pdf",
    "driveUrl": "https://drive.google.com/file/d/1fm9ocm4MA3n3SFRpX8KM8sNN0-8Wl_ap/view?usp=drive_link",
    "subject": "বাংলা (Bangla)",
    "subjectSlug": "bangla",
    "bookType": "textbook"
  },
  {
    "id": "b-jsc-2026-3",
    "title": "অষ্টম শ্রেণির ইসলাম শিক্ষা বই ২০২৬ pdf download |Class 8 Islam Book 2026 Pdf Download | ৮ম শ্রেণির ইসলাম ও নৈতিক শিক্ষা বই পিডিএফ",
    "slug": "class-8-islam-and-moral-education-book-2026-pdf",
    "driveUrl": "https://drive.google.com/file/d/1108SRYaCP3Po5M3DU1lWe8ZtIhLFTloJ/view?usp=drive_link",
    "subject": "ইসলাম ও নৈতিক শিক্ষা",
    "subjectSlug": "islamic-studies",
    "bookType": "textbook"
  },
  {
    "id": "b-jsc-2026-4",
    "title": "অষ্টম/৮ম শ্রেণির গাহস্থ বিজ্ঞান ২০২৬ pdf |গাহস্থ বিজ্ঞান ৮ম শ্রেণি pdf Download",
    "slug": "class-8-home-science-book-2026-pdf",
    "driveUrl": "https://drive.google.com/file/d/1vODdjg4T1KhM1G9bGgCMPOuGO8Bz8Wp_/view?usp=drive_link",
    "subject": "গার্হস্থ্যবিজ্ঞান",
    "subjectSlug": "home-science",
    "bookType": "textbook"
  },
  {
    "id": "b-jsc-2026-5",
    "title": "অষ্টম শ্রেনীর কৃষিশিক্ষা বই ২০২৬ Pdf | Class 8 Agriculture Book 2026 Pdf |৮ম শ্রেণির কৃষিশিক্ষা বই pdf Download",
    "slug": "class-8-agriculture-education-book-2026-pdf",
    "driveUrl": "https://drive.google.com/file/d/1hpNzkGvJ6Q5efgSB7-Dtt1FnSYrh3zZu/view?usp=drive_link",
    "subject": "কৃষি শিক্ষা",
    "subjectSlug": "agriculture",
    "bookType": "textbook"
  },
  {
    "id": "b-jsc-2026-6",
    "title": "অষ্টম /৮ম শ্রেণির কর্ম ও জীবনমুখী শিক্ষা বই ২০২৬ pdf |কর্ম ও জীবনমুখী শিক্ষা ৮ম শ্রেণি pdf Download",
    "slug": "class-8-life-and-livelihood-education-book-2026-pdf",
    "driveUrl": "https://drive.google.com/file/d/1QULadFx0awbKWKzbUm068CvP5MGr4SAT/view?usp=drive_link",
    "subject": "জীবন ও জীবিকা",
    "subjectSlug": "jibon-o-jibika",
    "bookType": "textbook"
  },
  {
    "id": "b-jsc-2026-7",
    "title": "অষ্টম/৮ম শ্রেণির শারীরিক শিক্ষা ও স্বাস্থ্য ২০২৬ pdf |শারীরিক শিক্ষা ও স্বাস্থ্য ৮ম শ্রেণি ২০২৬ pdf Download",
    "slug": "class-8-physical-education-and-health-book-2026-pdf",
    "driveUrl": "https://drive.google.com/file/d/1uHVBwpr6kIxxHnd1eAAn5HOExlvX3UPb/view?usp=drive_link",
    "subject": "শারীরিক শিক্ষা ও স্বাস্থ্য",
    "subjectSlug": "physical-education",
    "bookType": "textbook"
  },
  {
    "id": "b-jsc-2026-8",
    "title": "অষ্টম/৮ম শ্রেণির বাংলাদেশ ও বিশ্বপরিচয় বই ২০২৬ pdf download | ৮ম শ্রেণির বাংলাদেশ ও বিশ্বপরিচয় বই PDF",
    "slug": "class-8-bangladesh-and-global-studies-bgs-book-2026-pdf",
    "driveUrl": "https://drive.google.com/file/d/1HIxFLkgo4ZLG-qUz2achu5K_v40T0cfn/view?usp=drive_link",
    "subject": "বাংলাদেশ ও বিশ্বপরিচয়",
    "subjectSlug": "bgs",
    "bookType": "textbook"
  },
  {
    "id": "b-jsc-2026-9",
    "title": "অষ্টম শ্রেণির গণিত বই ২০২৬ pdf download |Class 8 Math Book 2026 Pdf Download  |৮ম শ্রেণির গণিত বই ২০২৬ PDF",
    "slug": "class-8-math-textbook-2026-pdf",
    "driveUrl": "https://drive.google.com/file/d/1UTGLGuQxMMaK_YgErIivbMI_3PcvkRbc/view?usp=drive_link",
    "subject": "গণিত (Mathematics)",
    "subjectSlug": "math",
    "bookType": "textbook"
  },
  {
    "id": "b-jsc-2026-10",
    "title": "অষ্টম শ্রেনীর ইংরেজি ২য় পত্র গাইড/নোট PDF – Class 8 English 2nd guide Book PDF 2026 |Jsc English 2nd Paper note pdf",
    "slug": "class-8-english-2nd-paper-guide-book-2026-pdf",
    "driveUrl": "https://drive.google.com/file/d/1f0ag2dWiGTGAAhU2AMqbvorY7fb6yLhg/view?usp=drivesdk",
    "subject": "English (ইংরেজি)",
    "subjectSlug": "english",
    "bookType": "guide"
  },
  {
    "id": "b-jsc-2026-11",
    "title": "অষ্টম শ্রেণির ইংরেজি গ্রামার বই ২০২৬ PDF |Class 8 English Grammer And Composition Pdf |ইংরেজি গ্রামার ৮ম শ্রেণি বই",
    "slug": "class-8-english-grammar-and-composition-book-2026-pdf",
    "driveUrl": "https://drive.google.com/file/d/1MG0Kr84imLCw4gfAPKheQfxZo9JuQ611/view?usp=drive_link",
    "subject": "English (ইংরেজি)",
    "subjectSlug": "english",
    "bookType": "textbook"
  },
  {
    "id": "b-jsc-2026-12",
    "title": "অষ্টম/৮ম শ্রেণীর/শ্রেণির ইংরেজি বই ২০২৬ pdf | Class 8 English For Today Book 2026 PDF",
    "slug": "class-8-english-for-today-book-2026-pdf",
    "driveUrl": "https://drive.google.com/file/d/1N7E-_Dgd1xX5VC4GmJamf4Yo4VEzvTvu/view?usp=drive_link",
    "subject": "English (ইংরেজি)",
    "subjectSlug": "english",
    "bookType": "textbook"
  },
  {
    "id": "b-jsc-2026-13",
    "title": "অষ্টম শ্রেণীর গণিত সমাধান অধ্যায় ৩য় | Class 8 Math Solution Chapter 3 | অষ্টম শ্রেণীর গণিত ৩য় অধ্যায় সমাধান",
    "slug": "class-8-math-solution-chapter-3-pdf",
    "driveUrl": "https://drive.google.com/file/d/1q3RoAd4mCPq4IF-5YLaiw7K20WOJKWE-/view?usp=drivesdk",
    "subject": "গণিত (Mathematics)",
    "subjectSlug": "math",
    "bookType": "solution"
  },
  {
    "id": "b-jsc-2026-14",
    "title": "অষ্টম শ্রেণীর গণিত সমাধান অধ্যায় ২য় | Class 8 Math Solution Chapter 2 | অষ্টম শ্রেণীর গণিত ২য় অধ্যায় সমাধান",
    "slug": "class-8-math-solution-chapter-2-pdf",
    "driveUrl": "https://drive.google.com/file/d/1pyJRk71yNMiwLRDGHNoGOp-WGbELQ2Fh/view?usp=drivesdk",
    "subject": "গণিত (Mathematics)",
    "subjectSlug": "math",
    "bookType": "solution"
  },
  {
    "id": "b-jsc-2026-15",
    "title": "অষ্টম শ্রেণীর গণিত সমাধান অধ্যায় ১ম | Class 8 Math Solution Chapter 1 | অষ্টম শ্রেণীর গণিত ১ম অধ্যায় সমাধান",
    "slug": "class-8-math-solution-chapter-1-pdf",
    "driveUrl": "https://drive.google.com/file/d/1pkEMW0UHAtbNRQL84rhLFk2bJmuq7pNk/view?usp=drivesdk",
    "subject": "গণিত (Mathematics)",
    "subjectSlug": "math",
    "bookType": "solution"
  },
  {
    "id": "b-jsc-2026-16",
    "title": "অষ্টম শ্রেণীর গণিত সমাধান অধ্যায় ১০ম | Class 8 Math Solution Chapter 10 | অষ্টম শ্রেণীর গণিত ১০ম অধ্যায় সমাধান",
    "slug": "class-8-math-solution-chapter-10-pdf",
    "driveUrl": "https://drive.google.com/file/d/1qVe9cFRvIkVh5SLrTXblShlQMkpM873b/view?usp=drivesdk",
    "subject": "গণিত (Mathematics)",
    "subjectSlug": "math",
    "bookType": "solution"
  },
  {
    "id": "b-jsc-2026-17",
    "title": "অষ্টম শ্রেণীর গণিত সমাধান অধ্যায় ৯ম | Class 8 Math Solution Chapter 9 | অষ্টম শ্রেণীর গণিত ৯ম অধ্যায় সমাধান",
    "slug": "class-8-math-solution-chapter-9-pdf",
    "driveUrl": "https://drive.google.com/file/d/1qOmTynXyPtZhfB9LQIEfOcrfQE09iEen/view?usp=drivesdk",
    "subject": "গণিত (Mathematics)",
    "subjectSlug": "math",
    "bookType": "solution"
  },
  {
    "id": "b-jsc-2026-18",
    "title": "অষ্টম শ্রেণীর গণিত সমাধান অধ্যায় ৮ম | Class 8 Math Solution Chapter 8 | অষ্টম শ্রেণীর গণিত ৮ম অধ্যায় সমাধান",
    "slug": "class-8-math-solution-chapter-8-pdf",
    "driveUrl": "https://drive.google.com/file/d/1qFRvQ0Xn2ISKCM8JJ6J4pl9EyATNqVU9/view?usp=drivesdk",
    "subject": "গণিত (Mathematics)",
    "subjectSlug": "math",
    "bookType": "solution"
  },
  {
    "id": "b-jsc-2026-19",
    "title": "অষ্টম শ্রেণীর গণিত সমাধান অধ্যায় ৭ম | Class 8 Math Solution Chapter 7 | অষ্টম শ্রেণীর গণিত ৭ম অধ্যায় সমাধান",
    "slug": "class-8-math-solution-chapter-7-pdf",
    "driveUrl": "https://drive.google.com/file/d/1qE60aV6zOIj3EEqu5tJjXXIgXChgIERO/view?usp=drivesdk",
    "subject": "গণিত (Mathematics)",
    "subjectSlug": "math",
    "bookType": "solution"
  },
  {
    "id": "b-jsc-2026-20",
    "title": "অষ্টম শ্রেণীর গণিত সমাধান অধ্যায় ৬ষ্ঠ | Class 8 Math Solution Chapter 6 | অষ্টম শ্রেণীর গণিত ৬ষ্ঠ অধ্যায় সমাধান",
    "slug": "class-8-math-solution-chapter-6-pdf",
    "driveUrl": "https://drive.google.com/file/d/1q8VkrzgZAeXcaBOWiiGxTwHNFVDqbHGO/view?usp=drivesdk",
    "subject": "গণিত (Mathematics)",
    "subjectSlug": "math",
    "bookType": "solution"
  },
  {
    "id": "b-jsc-2026-21",
    "title": "অষ্টম শ্রেণীর গণিত সমাধান অধ্যায় ৫ম | Class 8 Math Solution Chapter 5 | অষ্টম শ্রেণীর গণিত ৫ম অধ্যায় সমাধান",
    "slug": "class-8-math-solution-chapter-5-pdf",
    "driveUrl": "https://drive.google.com/file/d/1q5rAMRFH3xn1p8AnoSeQf37wF7KmH0yl/view?usp=drivesdk",
    "subject": "গণিত (Mathematics)",
    "subjectSlug": "math",
    "bookType": "solution"
  },
  {
    "id": "b-jsc-2026-22",
    "title": "অষ্টম শ্রেণীর গণিত সমাধান অধ্যায় ৪র্থ | Class 8 Math Solution Chapter 4 | অষ্টম শ্রেণীর গণিত ৪র্থ অধ্যায় সমাধান",
    "slug": "class-8-math-solution-chapter-4-pdf",
    "driveUrl": "https://drive.google.com/file/d/1q4SMWWiTTxD5PWP7RI-InEWK0w491SdZ/view?usp=drivesdk",
    "subject": "গণিত (Mathematics)",
    "subjectSlug": "math",
    "bookType": "solution"
  },
  {
    "id": "b-jsc-2026-23",
    "title": "অষ্টম শ্রেণির ইংরেজি বই pdf download | English For Today Class Eight | ৮ম শ্রেণির ইংরেজি বই পিডিএফ",
    "slug": "class-8-english-textbook-eight-pdf",
    "driveUrl": "https://drive.google.com/file/d/1bj89echN4zV4s-TkLgLYHtYTMpCni5jt/view?usp=drivesdk",
    "subject": "English (ইংরেজি)",
    "subjectSlug": "english",
    "bookType": "textbook"
  }
];

const existingData = fs.readFileSync('./lib/data.ts', 'utf-8');

const newBookObjects = jscBooksData.map((item) => {
  return {
    id: item.id,
    title: item.title,
    slug: item.slug,
    class_name: "Class 8",
    class_slug: "class-8",
    subject: item.subject,
    subject_slug: item.subjectSlug,
    book_type: item.bookType,
    year: 2026,
    description: `📘 ${item.title}\n\nপ্রিয় শিক্ষার্থী বন্ধুরা, জেএসসি (JSC / অষ্টম শ্রেণি) ২০২৬ এর নির্দেশনা অনুযায়ী এই বইটির বিস্তারিত সমাধান ও আলোচনা নিচে তুলে ধরা হলো।\n\n📌 বইয়ের মূল বিষয়বস্তু:\n- অধ্যায়ভিত্তিক প্রশ্ন ও নির্ভুল উত্তর সমাধান\n- বহুনির্বাচনী (MCQ) ও সংক্ষেপিত কুইজ উত্তর\n- জেএসসি ও বার্ষিক পরীক্ষার জন্য প্রস্তুতকৃত মডেল টেস্ট\n\nসরাসরি অনলাইনে পড়তে বা PDF ডাউনলোড করতে নিচের ড্রাইভ বোতাম ও ভিউয়ারটি ব্যবহার করুন।`,
    cover_image: "",
    pdf_url: item.driveUrl,
    file_size: "50 MB (PDF)",
    author: "NCTB / পাঞ্জেরী / লেকচার",
    publisher: "BD Edu PDF Library",
    is_published: true,
    is_latest: true,
    created_at: "2026-08-25T00:00:00Z",
    updated_at: "2026-08-25T00:00:00Z"
  };
});

const headerStr = 'export let MOCK_BOOKS: Book[] = [';
const insertIndex = existingData.indexOf(headerStr);

if (insertIndex !== -1) {
  const afterHeader = insertIndex + headerStr.length;
  const formattedNew = newBookObjects.map(b => JSON.stringify(b, null, 4)).join(',\n') + ',\n';
  const updatedData = existingData.slice(0, afterHeader) + '\n' + formattedNew + existingData.slice(afterHeader);
  fs.writeFileSync('./lib/data.ts', updatedData);
  console.log('Successfully inserted all 23 JSC books into lib/data.ts with clean slugs!');
} else {
  console.error('Header not found!');
}
