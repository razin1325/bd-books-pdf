import fs from 'fs';

const items = JSON.parse(fs.readFileSync('valid_panjeree_books.json', 'utf-8'));
const existingData = fs.readFileSync('./lib/data.ts', 'utf-8');

const newBooks = [
  {
    id: "b-class8-ict-lecture-guide-2026",
    title: "Class 8 ICT Guide Book PDF 2026 | Lecture Guide for Class 8 ICT | ৮ম শ্রেণির তথ্য ও যোগাযোগ প্রযুক্তি গাইড PDF",
    slug: "class-8-ict-lecture-guide-pdf",
    class_name: "Class 8",
    class_slug: "class-8",
    subject: "তথ্য ও যোগাযোগ প্রযুক্তি (ICT)",
    subject_slug: "ict",
    book_type: "guide",
    year: 2026,
    description: "📘 Class 8 ICT Guide Book PDF 2026 | Lecture Guide for Class 8 ICT | ৮ম শ্রেণির তথ্য ও যোগাযোগ প্রযুক্তি গাইড PDF\n\nঅষ্টম শ্রেণির তথ্য ও যোগাযোগ প্রযুক্তি (ICT) বিষয়ের লেকচার ও পাঞ্জেরী গাইড সম্পূর্ণ অধ্যায়ভিত্তিক প্রশ্ন, কুইজ ও সংক্ষিপ্ত উত্তরসহ সমাধান পিডিএফ।\n\nসরাসরি অনলাইনে পড়তে বা ড্রাইভে দেখতে নিচের লিংক ব্যবহার করুন।",
    cover_image: "",
    pdf_url: "https://drive.google.com/file/d/1y4CBZTAtpguAoW827HNsMVYO5jm7Oyxq/view?usp=drivesdk",
    file_size: "45 MB (PDF)",
    author: "লেকচার / পাঞ্জেরী Publications",
    publisher: "BD Edu PDF Library",
    is_published: true,
    is_latest: true,
    created_at: "2026-08-25T00:00:00Z",
    updated_at: "2026-08-25T00:00:00Z"
  },
  {
    id: "b-class8-math-solution-ch3",
    title: "Class 8 Math Solution Chapter 3 PDF 2026 | অষ্টম শ্রেণির গণিত ৩য় অধ্যায় সমাধান PDF",
    slug: "class-8-math-solution-chapter-3-pdf",
    class_name: "Class 8",
    class_slug: "class-8",
    subject: "গণিত (Mathematics)",
    subject_slug: "math",
    book_type: "solution",
    year: 2026,
    description: "📘 Class 8 Math Solution Chapter 3 PDF 2026 | অষ্টম শ্রেণির গণিত ৩য় অধ্যায় সমাধান PDF\n\nঅষ্টম শ্রেণি গণিত বিষয়ের ৩য় অধ্যায়ের পরিমাপ ও বীজগাণিতিক সূত্রাবলীর নির্ভুল সৃজনশীল সমাধানমালা।\n\nসরাসরি ড্রাইভে দেখতে ও ডাউনলোড করতে নিচে দেখুন।",
    cover_image: "",
    pdf_url: "https://drive.google.com/file/d/1q3RoAd4mCPq4IF-5YLaiw7K20WOJKWE-/view?usp=drivesdk",
    file_size: "35 MB (PDF)",
    author: "পাঞ্জেরী / অনুপম Solution",
    publisher: "BD Edu PDF Library",
    is_published: true,
    is_latest: true,
    created_at: "2026-08-25T00:00:00Z",
    updated_at: "2026-08-25T00:00:00Z"
  },
  {
    id: "b-class8-ict-textbook-2026",
    title: "Class 8 ICT Textbook PDF 2026 | অষ্টম শ্রেণির তথ্য ও যোগাযোগ প্রযুক্তি পাঠ্যবই ২০২৬ PDF",
    slug: "class-8-ict-textbook-pdf",
    class_name: "Class 8",
    class_slug: "class-8",
    subject: "তথ্য ও যোগাযোগ প্রযুক্তি (ICT)",
    subject_slug: "ict",
    book_type: "textbook",
    year: 2026,
    description: "📘 Class 8 ICT Textbook PDF 2026 | অষ্টম শ্রেণির তথ্য ও যোগাযোগ প্রযুক্তি পাঠ্যবই ২০২৬ PDF\n\nজাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) অনুমোদিত অষ্টম শ্রেণির তথ্য ও যোগাযোগ প্রযুক্তি মূল পাঠ্যবই।",
    cover_image: "",
    pdf_url: "https://drive.google.com/file/d/152cFSzvuZOrWo_BuYhgMav91g8pRpv9I/view?usp=drive_link",
    file_size: "40 MB (PDF)",
    author: "NCTB Board",
    publisher: "BD Edu PDF Library",
    is_published: true,
    is_latest: true,
    created_at: "2026-08-25T00:00:00Z",
    updated_at: "2026-08-25T00:00:00Z"
  },
  {
    id: "b-class910-bgs-textbook-2027",
    title: "Class 9-10 Bangladesh & Global Studies Textbook PDF 2027 | নবম-দশম শ্রেণির বাংলাদেশ ও বিশ্বপরিচয় পাঠ্যবই PDF",
    slug: "class-9-10-bgs-textbook-pdf",
    class_name: "Class 9-10",
    class_slug: "class-9-10",
    subject: "বাংলাদেশ ও বিশ্বপরিচয়",
    subject_slug: "bgs",
    book_type: "textbook",
    year: 2027,
    description: "📘 Class 9-10 Bangladesh & Global Studies Textbook PDF 2027 | নবম-দশম শ্রেণির বাংলাদেশ ও বিশ্বপরিচয় পাঠ্যবই PDF\n\nনবম-দশম শ্রেণির শিক্ষার্থীদের জন্য বাংলাদেশ ও বিশ্বপরিচয় মূল পাঠ্যবই ও অধ্যায়ভিত্তিক আলোচনা।",
    cover_image: "",
    pdf_url: "https://drive.google.com/file/d/1C7K6iGBpGEdr-p_vQfvEgMlDXh5ss8RI/view?usp=drive_link",
    file_size: "60 MB (PDF)",
    author: "NCTB Board",
    publisher: "BD Edu PDF Library",
    is_published: true,
    is_latest: true,
    created_at: "2026-08-25T00:00:00Z",
    updated_at: "2026-08-25T00:00:00Z"
  },
  {
    id: "b-hsc-higher-math-2nd-note",
    title: "HSC Higher Math 2nd Paper Note PDF | এইচএসসি উচ্চতর গণিত ২য় পত্র হ্যান্ড নোট ও সমাধান",
    slug: "hsc-higher-math-2nd-paper-hand-note-pdf",
    class_name: "HSC",
    class_slug: "hsc",
    subject: "উচ্চতর গণিত (Higher Math)",
    subject_slug: "higher-math",
    book_type: "guide",
    year: 2026,
    description: "📘 HSC Higher Math 2nd Paper Note PDF | এইচএসসি উচ্চতর গণিত ২য় পত্র হ্যান্ড নোট ও সমাধান\n\nএইচএসসি উচ্চতর গণিত ২য় পত্রের সকল অধ্যায়ের গাণিতিক সূত্রাবলী, সিকিউ সমাধান ও শর্টকাট লেকচার শিট।",
    cover_image: "",
    pdf_url: "https://drive.google.com/file/d/1OyCj_RhYetiqfh_Ms3iyHin8e5cEZqel/view?usp=drivesdk",
    file_size: "50 MB (PDF)",
    author: "রয়েল / পাঞ্জেরী Publications",
    publisher: "BD Edu PDF Library",
    is_published: true,
    is_latest: true,
    created_at: "2026-08-25T00:00:00Z",
    updated_at: "2026-08-25T00:00:00Z"
  },
  {
    id: "b-hsc-organic-chemistry-note",
    title: "HSC Organic Chemistry Hand Note PDF | এইচএসসি জৈব রসায়ন হ্যান্ড নোট ও সমাধান PDF",
    slug: "hsc-organic-chemistry-hand-note-pdf",
    class_name: "HSC",
    class_slug: "hsc",
    subject: "রসায়ন (Chemistry)",
    subject_slug: "chemistry",
    book_type: "guide",
    year: 2026,
    description: "📘 HSC Organic Chemistry Hand Note PDF | এইচএসসি জৈব রসায়ন হ্যান্ড নোট ও সমাধান PDF\n\nএইচএসসি রসায়ন ২য় পত্রের অত্যন্ত গুরুত্বপূর্ণ ‘জৈব রসায়ন’ (Organic Chemistry) অধ্যায়ের সম্পূর্ণ বিক্রিয়া, মেকানিজম ও লেকচার নোট।",
    cover_image: "",
    pdf_url: "https://drive.google.com/file/d/1JUKloJbp5aZZVetr-HGNDm1Yy5rk72Ec/view?usp=drivesdk",
    file_size: "55 MB (PDF)",
    author: "লেকচার / রয়েল Publications",
    publisher: "BD Edu PDF Library",
    is_published: true,
    is_latest: true,
    created_at: "2026-08-25T00:00:00Z",
    updated_at: "2026-08-25T00:00:00Z"
  },
  {
    id: "b-admission-physics-books-suggestions",
    title: "University Admission Physics Books & Suggestions PDF | পদার্থবিজ্ঞান ভর্তি পরীক্ষা প্রশ্নব্যাংক ও সাজেশন্স",
    slug: "admission-physics-books-suggestions-pdf",
    class_name: "Admission",
    class_slug: "admission",
    subject: "পদার্থবিজ্ঞান (Physics)",
    subject_slug: "physics",
    book_type: "guide",
    year: 2026,
    description: "📘 University Admission Physics Books & Suggestions PDF | পদার্থবিজ্ঞান ভর্তি পরীক্ষা প্রশ্নব্যাংক ও সাজেশন্স\n\nবিশ্ববিদ্যালয় ভর্তি পরীক্ষার জন্য পদার্থবিজ্ঞান ১ম ও ২য় পত্রের অধ্যায়ভিত্তিক প্রশ্নব্যাংক, কনসেপ্ট বুক ও স্পেশাল সাজেশন্স।",
    cover_image: "",
    pdf_url: "https://drive.google.com/drive/folders/1idVUoQX-9MTVF-9LpuFZUUdLmKrkKSxx",
    file_size: "Google Drive Folder",
    author: "উদ্ভাস / জয়কোলি / রেটিনা",
    publisher: "BD Edu PDF Library",
    is_published: true,
    is_latest: true,
    created_at: "2026-08-25T00:00:00Z",
    updated_at: "2026-08-25T00:00:00Z"
  }
];

const headerStr = 'export let MOCK_BOOKS: Book[] = [';
const insertIndex = existingData.indexOf(headerStr);

if (insertIndex !== -1) {
  const afterHeader = insertIndex + headerStr.length;
  const formattedNew = newBooks.map(b => JSON.stringify(b, null, 4)).join(',\n') + ',\n';
  const updatedData = existingData.slice(0, afterHeader) + '\n' + formattedNew + existingData.slice(afterHeader);
  fs.writeFileSync('./lib/data.ts', updatedData);
  console.log('Successfully added Panjeree books into lib/data.ts!');
} else {
  console.error('Header not found!');
}
