import fs from 'fs';

const items = JSON.parse(fs.readFileSync('new_scraped_items.json', 'utf-8'));
const existingData = fs.readFileSync('./lib/data.ts', 'utf-8');

const newBookObjects = [];

items.forEach((item, index) => {
  let title = item.title;
  let catUrl = item.catUrl;
  let driveUrl = item.driveUrl || 'https://drive.google.com/file/d/1KxkCURG9cuwUHh7PEJ9-AlTMtOpy9W0m/view';

  let className = 'Class 7';
  let classSlug = 'class-7';
  let subject = 'সাধারণ জ্ঞান (General)';
  let subjectSlug = 'general';
  let bookType = 'guide';

  if (catUrl.includes('class-six-seven')) {
    if (title.includes('ষষ্ঠ') || title.includes('Class 6') || title.includes('6th')) {
      className = 'Class 6';
      classSlug = 'class-6';
    } else {
      className = 'Class 7';
      classSlug = 'class-7';
    }
  } else if (catUrl.includes('ssc-all-books')) {
    className = 'Class 9-10';
    classSlug = 'class-9-10';
  } else if (catUrl.includes('all-test-paper')) {
    if (title.includes('এইচএসসি') || title.includes('HSC') || title.includes('Hsc')) {
      className = 'HSC';
      classSlug = 'hsc';
    } else {
      className = 'Class 9-10';
      classSlug = 'class-9-10';
    }
  }

  // Subject detection
  if (title.includes('ইংরেজি') || title.includes('English')) {
    subject = 'English';
    subjectSlug = 'english';
  } else if (title.includes('বাংলা') || title.includes('Bangla')) {
    subject = 'বাংলা (Bangla)';
    subjectSlug = 'bangla';
  } else if (title.includes('গণিত') || title.includes('Math')) {
    subject = 'গণিত (Mathematics)';
    subjectSlug = 'math';
  } else if (title.includes('পদার্থবিজ্ঞান') || title.includes('Physics')) {
    subject = 'পদার্থবিজ্ঞান (Physics)';
    subjectSlug = 'physics';
  } else if (title.includes('রসায়ন') || title.includes('Chemistry')) {
    subject = 'রসায়ন (Chemistry)';
    subjectSlug = 'chemistry';
  } else if (title.includes('জীববিজ্ঞান') || title.includes('Biology')) {
    subject = 'জীববিজ্ঞান (Biology)';
    subjectSlug = 'biology';
  } else if (title.includes('স্বাস্থ্য সুরক্ষা') || title.includes('Health')) {
    subject = 'স্বাস্থ্য সুরক্ষা';
    subjectSlug = 'health-protection';
  } else if (title.includes('শিল্প ও সংস্কৃতি') || title.includes('Art')) {
    subject = 'শিল্প ও সংস্কৃতি';
    subjectSlug = 'art-and-culture';
  } else if (title.includes('ডিজিটাল প্রযুক্তি') || title.includes('Digital')) {
    subject = 'ডিজিটাল প্রযুক্তি';
    subjectSlug = 'digital-technology';
  } else if (title.includes('জীবন ও জীবিকা') || title.includes('Life')) {
    subject = 'জীবন ও জীবিকা';
    subjectSlug = 'jibon-o-jibika';
  } else if (title.includes('গার্হস্থ্য') || title.includes('Home Science')) {
    subject = 'গার্হস্থ্য বিজ্ঞান';
    subjectSlug = 'home-science';
  }

  // Unique Slug
  let customSlug = item.slug.replace(/%/g, '');
  if (!customSlug || customSlug.length < 5) {
    customSlug = `${classSlug}-${subjectSlug}-guide-post-${index + 1}`;
  } else {
    customSlug = `${classSlug}-${subjectSlug}-${customSlug}`.slice(0, 70);
  }

  const bookObj = {
    id: `b-auto-scraped-${Date.now()}-${index}`,
    title: title,
    slug: customSlug,
    class_name: className,
    class_slug: classSlug,
    subject: subject,
    subject_slug: subjectSlug,
    book_type: bookType,
    year: 2026,
    description: `📘 ${title}\n\nপ্রিয় শিক্ষার্থী বন্ধুরা, নতুন কারিকুলাম ও পাঠ্যপুস্তক বোর্ড (NCTB) ২০২৬ এর নির্দেশনা অনুযায়ী এই বইটির বিস্তারিত সমাধান ও আলোচনা নিচে তুলে ধরা হলো।\n\n📌 বইয়ের মূল বিষয়বস্তু:\n- অধ্যায়ভিত্তিক প্রশ্ন ও নির্ভুল উত্তর সমাধান\n- বহুনির্বাচনী (MCQ) ও সংক্ষেপিত কুইজ উত্তর\n- সামষ্টিক ও অর্ধবার্ষিক পরীক্ষার জন্য প্রস্তুতকৃত মডেল টেস্ট\n\nসরাসরি অনলাইনে পড়তে বা PDF ডাউনলোড করতে নিচের ড্রাইভ বোতাম ও ভিউয়ারটি ব্যবহার করুন।`,
    cover_image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgeeB9Lv4y8WcLO-iafy4S_9Q821t1G5CQz3mvcxvthXViJLywiWcUmJg2yqImehQLECKmpvMT-HqjqW2iJcCd7-w8K6q0Yot7PKpc7WtsbAwKjxYULO2ZCQhHn0NO7gbT1moSsOHQvHyHapGNH2s50ahOyClWc_mwTegJO89lG2zsrmoiPXpARcHnEK7oa/s16000/IMG_20260505_225600.webp",
    pdf_url: driveUrl,
    file_size: "65 MB (PDF)",
    author: "পাঞ্জেরী / লেকচার / অনুপম",
    publisher: "BD Edu PDF Library",
    is_published: true,
    is_latest: true,
    created_at: "2026-08-25T00:00:00Z",
    updated_at: "2026-08-25T00:00:00Z"
  };

  newBookObjects.push(bookObj);
});

console.log(`Generated ${newBookObjects.length} structured book objects!`);

// Insert into lib/data.ts
const headerStr = 'export let MOCK_BOOKS: Book[] = [';
const insertIndex = existingData.indexOf(headerStr);

if (insertIndex !== -1) {
  const afterHeader = insertIndex + headerStr.length;
  const formattedNew = newBookObjects.map(b => JSON.stringify(b, null, 4)).join(',\n') + ',\n';
  const updatedData = existingData.slice(0, afterHeader) + '\n' + formattedNew + existingData.slice(afterHeader);
  fs.writeFileSync('./lib/data.ts', updatedData);
  console.log('Successfully inserted all 28 new books into lib/data.ts!');
} else {
  console.error('Could not find MOCK_BOOKS array header in lib/data.ts!');
}
