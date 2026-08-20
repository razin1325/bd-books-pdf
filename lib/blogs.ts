export interface BlogPostItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  categorySlug: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  author: string;
  tags: string[];
  coverImage?: string;
  metaTitle: string;
  metaDescription: string;
  faq?: { question: string; answer: string }[];
}

export const BLOG_CATEGORIES = [
  { name: 'সব পোস্ট', slug: 'all' },
  { name: 'শিক্ষা ও ফলপ্রকাশ', slug: 'education-result' },
  { name: 'সরকারি ভাতা ও সেবা', slug: 'social-allowance' },
  { name: 'NID ও সরকারি সেবা', slug: 'nid-services' },
  { name: 'উপবৃত্তি ও শিক্ষা বৃত্তি', slug: 'stipend' },
  { name: 'অন্যান্য ও ড্র রেজাল্ট', slug: 'others' },
];

export const BLOG_POSTS_DATA: BlogPostItem[] = [
  {
    id: 'b-post-1',
    title: 'SSC Vocational Result 2026 BTEB (কারিগরি বোর্ড এসএসসি রেজাল্ট ও মার্কশিট দেখার নিয়ম)',
    slug: 'ssc-vocational-result-2026-bteb',
    category: 'শিক্ষা ও ফলপ্রকাশ',
    categorySlug: 'education-result',
    excerpt: 'বাংলাদেশ কারিগরি শিক্ষা বোর্ড (BTEB) এসএসসি ভোকেশনাল ও দাখিল ভোকেশনাল রেজাল্ট ২০২৬ মার্কশিট সহ দেখার অফিশিয়াল নিয়মাবলি ও SMS ফর্ম্যাট।',
    metaTitle: 'SSC Vocational Result 2026 BTEB | কারিগরি বোর্ড মার্কশিট রেজাল্ট',
    metaDescription: 'SSC Vocational Result 2026 BTEB কারিগরি বোর্ডের এসএসসি ভোকেশনাল পরীক্ষার ফলাফল ও নম্বরপত্র দেখার অনলাইন ওয়েবসাইটের লিংক ও SMS পদ্ধতি।',
    date: 'আগস্ট ২০, ২০২৬',
    readTime: '৪ মিনিট পড়া',
    author: 'Edu News Team',
    tags: ['SSC Result', 'BTEB', 'Vocational Result', 'কারিগরি বোর্ড'],
    coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    content: `
      <h2>এসএসসি ভোকেশনাল রেজাল্ট ২০২৬ (BTEB Vocational Result 2026)</h2>
      <p>বাংলাদেশ কারিগরি শিক্ষা বোর্ড (BTEB)-এর অধীনে অনুষ্ঠিত এসএসসি ভোকেশনাল (SSC Vocational) ও দাখিল ভোকেশনাল পরীক্ষা ২০২৬ এর ফলাফল সংক্রান্ত অফিশিয়াল নির্দেশিকা। শিক্ষার্থীরা ঘরে বসেই তাদের সম্পূর্ণ মার্কশিট সহ পয়েন্ট ও নম্বর দেখতে পারবেন।</p>

      <h3>অনলাইনে মার্কশিট সহ SSC Vocational রেজাল্ট দেখার উপায়:</h3>
      <p>কারিগরি বোর্ডের এসএসসি ভোকেশনাল রেজাল্ট দুটি অফিশিয়াল পোর্টাল থেকে দেখা যায়:</p>
      <ol>
        <li><strong>১ম পোর্টাল:</strong> বাংলাদেশ কারিগরি শিক্ষা বোর্ডের ওয়েবসাইট <a href="https://bteb.gov.bd" target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-bold underline">bteb.gov.bd</a> অথবা <a href="http://result.btebadmission.gov.bd" target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-bold underline">btebadmission.gov.bd</a> এ প্রবেশ করুন।</li>
        <li><strong>২য় পোর্টাল:</strong> শিক্ষা বোর্ডের রেজাল্ট ওয়েবসাইট <a href="https://eboardresults.com" target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-bold underline">eboardresults.com</a> এ ভিজিট করুন।</li>
        <li>Examination অপশন থেকে <strong>SSC/Dakhil/Equivalent</strong> অথবা <strong>SSC Vocational</strong> নির্বাচন করুন।</li>
        <li>Year অপশনে <strong>2026</strong> সিলেক্ট করুন।</li>
        <li>Board অপশনে <strong>Technical</strong> সিলেক্ট করুন।</li>
        <li>আপনার <strong>Roll Number</strong> এবং <strong>Registration Number</strong> সঠিকভাবে লিখুন।</li>
        <li>নিরাপত্তা ক্যাপচা কোডটি পূরণ করে <strong>Get Result</strong> বাটনে চাপ দিলেই বিস্তারিত গ্রেড ও মার্কশিট চলে আসবে।</li>
      </ol>

      <h3>এসএমএস (SMS)-এর মাধ্যমে ফল জানার নিয়ম:</h3>
      <p>যেকোনো মোবাইল অপারেটরের মেসেজ অপশনে গিয়ে লিখুন:</p>
      <div className="bg-slate-900 text-emerald-400 p-4 rounded-xl font-mono my-4 text-center">
        SSC &lt;space&gt; TEC &lt;space&gt; Roll &lt;space&gt; 2026 ➔ পাঠাতে হবে 16222 নম্বরে
      </div>
      <p>উদাহরণ: <code>SSC TEC 123456 2026</code> লিখে পাঠাতে হবে <strong>16222</strong> নম্বরে। কিছুক্ষণের মধ্যেই ফিরতি এসএমএসে আপনার জিপিএ জানিয়ে দেওয়া হবে।</p>

      <h3>খাতা পুনঃনিরীক্ষণ (Re-scrutiny/Board Challenge):</h3>
      <p>ফলাফল প্রকাশের পরবর্তী ৭ দিনের মধ্যে টেলিটক প্রিপেইড সিমের মাধ্যমে পুনঃনিরীক্ষণের আবেদন করা যাবে। প্রতি পত্রের জন্য আবেদনের নির্দিষ্ট ফি প্রযোজ্য হবে।</p>
    `,
    faq: [
      {
        question: 'কারিগরি বোর্ডের শর্ট কোড কী?',
        answer: 'SMS এর মাধ্যমে রেজাল্ট দেখতে বোর্ডের নামের প্রথম ৩ অক্ষর TEC ব্যবহার করতে হয়।',
      },
      {
        question: 'মার্কশিট ছাড়া শুধু GPA দেখা যাবে?',
        answer: 'হ্যাঁ, SMS এর মাধ্যমে বা বোর্ডের ওয়েবসাইটে শুধু রোল নাম্বার দিয়ে জিপিএ দেখা সম্ভব।',
      },
    ],
  },
  {
    id: 'b-post-2',
    title: 'SSC Result 2026 Marksheet Check Online (সকল বোর্ডের মার্কশিট সহ রেজাল্ট দেখার উপায়)',
    slug: 'ssc-result-2026-marksheet-check-online',
    category: 'শিক্ষা ও ফলপ্রকাশ',
    categorySlug: 'education-result',
    excerpt: 'ঢাকা, চট্টগ্রাম, রাজশাহী সহ সকল শিক্ষা বোর্ডের এসএসসি ও সমমান পরীক্ষা ২০২৬ এর নম্বরপত্র সহ রেজাল্ট দেখার অনলাইন ও SMS পদ্ধতি।',
    metaTitle: 'SSC Result 2026 Marksheet Check Online | সকল বোর্ডের এসএসসি রেজাল্ট',
    metaDescription: 'SSC Result 2026 Marksheet Check Online ইবোর্ড রেজাল্ট ও অফিশিয়াল সার্ভার থেকে নম্বরপত্র সহ এসএসসি রেজাল্ট দেখার অনলাইন ওয়েবসাইট ও SMS নির্দেশনা।',
    date: 'আগস্ট ২০, ২০২৬',
    readTime: '৫ মিনিট পড়া',
    author: 'Edu News Team',
    tags: ['SSC Result', 'Marksheet', 'Education Board', 'SSC 2026'],
    coverImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    content: `
      <h2>এসএসসি রেজাল্ট ২০২৬ মার্কশিট সহ (SSC Marksheet Result 2026)</h2>
      <p>বাংলাদেশের মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষা বোর্ডসমূহের অধীনে অনুষ্ঠিত এসএসসি ও সমমান পরীক্ষা ২০২৬-এর ফলাফল প্রকাশিত হয়েছে। এই গাইডে খুব সহজে মোবাইল বা কম্পিউটার দিয়ে বিষয়ের প্রাপ্ত নম্বর সহ মার্কশিট ডাউনলোডের অফিশিয়াল নিয়ম তুলে ধরা হলো।</p>

      <h3>১. EBoardResults ওয়েবসাইটের মাধ্যমে দেখার নিয়ম:</h3>
      <p><a href="https://eboardresults.com" target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-bold underline">eboardresults.com</a> পোর্টালে রেজাল্ট খুব দ্রুত পাওয়া যায়। নিয়মটি হলো:</p>
      <ul>
        <li>ওয়েবসাইটে প্রবেশ করে <strong>SSC/Dakhil/Equivalent</strong> সিলেক্ট করুন।</li>
        <li>পরীক্ষার বছর <strong>2026</strong> নির্বাচন করুন।</li>
        <li>নিজের শিক্ষা বোর্ড সিলেক্ট করুন।</li>
        <li>Result Type অপশনে <strong>Individual Result</strong> সিলেক্ট করুন।</li>
        <li>আপনার রোল ও রেজিস্ট্রেশন নম্বর ইনপুট দিয়ে Security Key টাইপ করে <strong>Get Result</strong> এ চাপুন।</li>
      </ul>

      <h3>২. Education Board Results অফিশিয়াল সার্ভার:</h3>
      <p>সরকারি অফিশিয়াল সার্ভার <a href="http://www.educationboardresults.gov.bd" target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-bold underline">educationboardresults.gov.bd</a> এ গিয়ে সাধারণ তথ্যাবলি ও যোগফল ক্যাপচা মিলালেই মার্কশিট দেখা যাবে।</p>

      <h3>সকল শিক্ষা বোর্ডের SMS কোডের তালিকা:</h3>
      <table className="w-full border-collapse border border-gray-300 my-4 text-sm">
        <thead>
          <tr className="bg-emerald-600 text-white">
            <th className="border border-gray-300 p-2">শিক্ষা বোর্ডের নাম</th>
            <th className="border border-gray-300 p-2">SMS ৩ অক্ষরের কোড</th>
            <th className="border border-gray-300 p-2">নমুনা SMS ফর্ম্যাট (16222)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="border border-gray-300 p-2">ঢাকা বোর্ড (Dhaka)</td><td className="border border-gray-300 p-2">DHA</td><td className="border border-gray-300 p-2">SSC DHA 123456 2026</td></tr>
          <tr><td className="border border-gray-300 p-2">চট্টগ্রাম বোর্ড (Chattogram)</td><td className="border border-gray-300 p-2">CHI</td><td className="border border-gray-300 p-2">SSC CHI 123456 2026</td></tr>
          <tr><td className="border border-gray-300 p-2">রাজশাহী বোর্ড (Rajshahi)</td><td className="border border-gray-300 p-2">RAJ</td><td className="border border-gray-300 p-2">SSC RAJ 123456 2026</td></tr>
          <tr><td className="border border-gray-300 p-2">কুমিল্লা বোর্ড (Cumilla)</td><td className="border border-gray-300 p-2">COM</td><td className="border border-gray-300 p-2">SSC COM 123456 2026</td></tr>
          <tr><td className="border border-gray-300 p-2">মাদরাসা বোর্ড (Madrasah)</td><td className="border border-gray-300 p-2">MAD</td><td className="border border-gray-300 p-2">SSC MAD 123456 2026</td></tr>
        </tbody>
      </table>
    `,
    faq: [
      {
        question: 'মার্কশিটে বিষয়ভিত্তিক কত নম্বর পেলাম কীভাবে দেখব?',
        answer: 'পরীক্ষার রেজাল্ট প্রকাশের দিন সন্ধ্যার পর eboardresults.com পোর্টালে বিস্তারিত বিষয়ভিত্তিক নম্বর প্রদর্শন করা হয়।',
      },
    ],
  },
  {
    id: 'b-post-3',
    title: 'প্রতিবন্ধী ভাতা অনলাইন আবেদন ২০২৬ নিয়মাবলি (Disability Allowance Online Application)',
    slug: 'disability-allowance-online-application-2026',
    category: 'সরকারি ভাতা ও সেবা',
    categorySlug: 'social-allowance',
    excerpt: 'সমাজসেবা অধিদপ্তরের সুবর্ণ নাগরিক কার্ড ও প্রতিবন্ধী ভাতা ২০২৬ অনলাইন আবেদন করার যোগ্যতার শর্তাবলি ও মোবাইল ব্যাংক পেমেন্ট নিয়ম।',
    metaTitle: 'প্রতিবন্ধী ভাতা অনলাইন আবেদন ২০২৬ | Disability Allowance Apply',
    metaDescription: 'প্রতিবন্ধী ভাতা অনলাইন আবেদন ২০২৬ নিয়মাবলি সমাজসেবা অধিদপ্তর সুবর্ণ নাগরিক আইডি কার্ড তৈরি ও মাসিক ভাতা পাওয়ার অনলাইন ফরম পূরণ গাইড।',
    date: 'আগস্ট ১৯, ২০২৬',
    readTime: '৫ মিনিট পড়া',
    author: 'Service Care Team',
    tags: ['প্রতিবন্ধী ভাতা', 'সমাজসেবা', 'সুবর্ণ নাগরিক', 'সরকারি সুবিধা'],
    coverImage: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80',
    content: `
      <h2>প্রতিবন্ধী ভাতা ২০২৬ (Disability Allowance Application 2026)</h2>
      <p>গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের সমাজকল্যাণ মন্ত্রণালয়ের সমাজসেবা অধিদপ্তর (DSS) কর্তৃক অসচ্ছল প্রতিবন্ধী ব্যক্তিদের জন্য মাসিক ভাতা প্রদান করা হয়ে থাকে। বর্তমানে ভাতা প্রাপ্তির সম্পূর্ণ আবেদন প্রক্রিয়া অনলাইনে সম্পন্ন হয়।</p>

      <h3>আবেদনের পূর্বশর্ত (সুবিধাভোগীর জন্য):</h3>
      <ol>
        <li>আবেদনকারীর কাছে অবশ্যই সমাজসেবা অধিদপ্তর কর্তৃক ইস্যুকৃত <strong>সুবর্ণ নাগরিক পরিচয়পত্র (Disability Smart ID Card)</strong> থাকতে হবে।</li>
        <li>বাংলাদেশি নাগরিক হতে হবে এবং জাতীয় পরিচয়পত্র (NID) অথবা অনলাইন জন্ম নিবন্ধন সনদ থাকতে হবে।</li>
        <li>আবেদনকারীর বার্ষিক গড় আয় সমাজসেবা অধিদপ্তর নির্ধারিত নির্ধারিত সীমার নিচে হতে হবে।</li>
        <li>নিজের বা অভিভাবকের নামে সচল বিকাশ/নগদ রকেট মোবাইল ব্যাংকিং একাউন্ট থাকতে হবে।</li>
      </ol>

      <h3>অনলাইনে আবেদন করার সঠিক ধাপসমূহ:</h3>
      <p>আবেদন করতে অফিশিয়াল পেমেন্ট পোর্টালে প্রবেশ করুন:</p>
      <ul>
        <li>সমাজসেবা অধিদপ্তরের অনলাইন সার্ভিস পোর্টালে প্রবেশ করুন (<a href="https://mis.bhata.gov.bd" target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-bold underline">mis.bhata.gov.bd</a>)।</li>
        <li><strong>প্রতিবন্ধী ভাতা আবেদন</strong> লিংকে ক্লিক করুন।</li>
        <li>আবেদনকারীর <strong>সুবর্ণ নাগরিক নম্বর (Disability ID)</strong> ও জাতীয় পরিচয়পত্র নম্বর লিখুন।</li>
        <li>ব্যক্তিগত তথ্য, স্থায়ী ঠিকানা, প্রতিবন্ধিতার ধরন নির্বাচন করুন।</li>
        <li>আবেদনকারীর ১ কপি পাসপোর্ট সাইজ ছবি ও এনআইডির স্ক্যান কপি আপলোড করুন।</li>
        <li>সর্বশেষে মোবাইল নম্বর দিন এবং <strong>আবেদন জমা দিন</strong> বাটনে চাপ দিয়ে রসিদটি প্রিন্ট করে সংরক্ষণ করুন।</li>
      </ul>
    `,
    faq: [
      {
        question: 'প্রতিবন্ধী ভাতার মাসিক পরিমাণ কত?',
        answer: 'বর্তমানে সরকার অসচ্ছল প্রতিবন্ধী ব্যক্তিদের মাসে ৮৫০ টাকা হারে সরাসরি মোবাইল ব্যাংকিং একাউন্টে প্রদান করে।',
      },
    ],
  },
  {
    id: 'b-post-4',
    title: 'প্রাইজবন্ড ড্র ১২৪তম রেজাল্ট ২০২৬ PDF (Prize Bond Draw 124 Result)',
    slug: 'prize-bond-draw-124-result-2026',
    category: 'অন্যান্য ও ড্র রেজাল্ট',
    categorySlug: 'others',
    excerpt: 'বাংলাদেশ ব্যাংক ১০০ টাকা মূল্যমানের ১২৪তম প্রাইজবন্ড ড্র ফলাফল ২০২৬। প্রথম পুরস্কার ৬ লাখ টাকা সহ বিজয়ী নম্বরের তালিকা PDF ডাউনলোড।',
    metaTitle: 'প্রাইজবন্ড ড্র ১২৪তম রেজাল্ট ২০২৬ PDF | Prize Bond 124 Draw Result',
    metaDescription: 'প্রাইজবন্ড ড্র ১২৪তম রেজাল্ট ২০২৬ বাংলাদেশ ব্যাংক প্রাইজবন্ড ড্র ফলাফল পিডিএফ ও ১ম, ২য় ও ৩য় পুরস্কার বিজয়ী বন্ড নম্বরের তালিকা।',
    date: 'আগস্ট ১৮, ২০২৬',
    readTime: '৩ মিনিট পড়া',
    author: 'Finance Update Team',
    tags: ['প্রাইজবন্ড', 'Prize Bond Draw', 'বাংলাদেশ ব্যাংক', 'ড্র ফল'],
    coverImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
    content: `
      <h2>বাংলাদেশ ব্যাংক ১০০ টাকা প্রাইজবন্ড ১২৪তম ড্র ফলাফল ২০২৬</h2>
      <p>জাতীয় সঞ্চয় অধিদপ্তর ও বাংলাদেশ ব্যাংকের তত্ত্বাবধানে পরিচালিত ১০০ টাকা মূল্যমানের ১২৪তম প্রাইজবন্ড ড্র-এর অফিশিয়াল ফলাফল প্রকাশিত হয়েছে। মোট ৪৬টি সিরিজে এই ড্র অনুষ্ঠিত হয়।</p>

      <h3>পুরস্কারের বিবরণ ও টাকার পরিমাণ:</h3>
      <ul>
        <li><strong>১ম পুরস্কার (১টি):</strong> ৬,০০,০০০ (ছয় লাখ) টাকা।</li>
        <li><strong>২য় পুরস্কার (১টি):</strong> ৩,২৫,০০০ (তিন লাখ পঁচিশ হাজার) টাকা।</li>
        <li><strong>৩য় পুরস্কার (২টি):</strong> ১,০০,০০০ (এক লাখ) টাকা করে।</li>
        <li><strong>৪র্থ পুরস্কার (২টি):</strong> ৫০,০০০ (পঞ্চাশ হাজার) টাকা করে।</li>
        <li><strong>৫ম পুরস্কার (৪০টি):</strong> ১০,০০০ (দশ হাজার) টাকা করে।</li>
      </ul>

      <h3>পুরস্কারের টাকা দাবির নিয়মাবলী:</h3>
      <p>ড্র-এর তারিখ হতে পরবর্তী ২ (দুই) বছরের মধ্যে বিজয়ী টিকিট প্রদর্শন করে বাংলাদেশ ব্যাংকের যেকোনো কার্যালয়, সরকারি ট্রেজারি বা তফসিলি ব্যাংকের মাধ্যমে পুরস্কারের টাকা দাবি করতে হবে। দাবির ক্ষেত্রে নির্ধারিত ক্লেইম ফর্ম পূরণ করতে হবে।</p>
    `,
  },
  {
    id: 'b-post-5',
    title: 'বয়স্ক ভাতা অনলাইন আবেদন ২০২৬ (Boyosko Bhata Online Application Guide)',
    slug: 'boyosko-bhata-online-application-2026',
    category: 'সরকারি ভাতা ও সেবা',
    categorySlug: 'social-allowance',
    excerpt: 'বয়স্ক ভাতা পাওয়ার বয়সের শর্তাবলি (পুরুষ ৬৫+ ও নারী ৬২+ বছর) এবং সমাজসেবা অধিদপ্তর পোর্টাল হতে অনলাইন আবেদন ফর্ম পূরণের নিয়ম।',
    metaTitle: 'বয়স্ক ভাতা অনলাইন আবেদন ২০২৬ | Boyosko Bhata Online Application',
    metaDescription: 'বয়স্ক ভাতা অনলাইন আবেদন ২০২৬ সমাজসেবা অধিদপ্তর পোর্টাল হতে বয়স্ক ভাতার আবেদন করার নিয়ম, প্রয়োজনীয় কাগজপত্র ও আবেদনের বয়সসীমা।',
    date: 'আগস্ট ১৭, ২০২৬',
    readTime: '৪ মিনিট পড়া',
    author: 'Service Care Team',
    tags: ['বয়স্ক ভাতা', 'সমাজসেবা অধিদপ্তর', 'সরকারি বয়স্ক সুবিধা'],
    content: `
      <h2>বয়স্ক ভাতা অনলাইন আবেদন ২০২৬ (Boyosko Bhata Online Apply)</h2>
      <p>গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের সমাজসেবা অধিদপ্তরের আওতায় দেশের বয়োবৃদ্ধ দুস্থ ও অসচ্ছল নাগরিকদের সামাজিক নিরাপত্তা বলয়ের অধীনে বয়স্ক ভাতা প্রদান করা হয়।</p>

      <h3>বয়সের শর্ত ও যোগ্যতা:</h3>
      <ol>
        <li>পুরুষ আবেদনকারীর ক্ষেত্রে সর্বনিম্ন বয়স <strong>৬৫ (পঁয়ষট্টি) বছর</strong> হতে হবে।</li>
        <li>নারী আবেদনকারীর ক্ষেত্রে সর্বনিম্ন বয়স <strong>৬২ (বাষট্টি) বছর</strong> হতে হবে।</li>
        <li>আবেদনকারীর নাম ভোটার তালিকায় অন্তর্ভুক্ত থাকতে হবে এবং এনআইডি কার্ড থাকতে হবে।</li>
        <li>আবেদনকারীর বার্ষিক গড় আয় ১০,০০০ টাকার নিচে হতে হবে।</li>
      </ol>

      <h3>আবেদন করার সময় প্রয়োজনীয় কাগজপত্র:</h3>
      <ul>
        <li>আবেদনকারীর এনআইডি (NID) কার্ডের স্পষ্ট কপি।</li>
        <li>সচল বিকাশ বা নগদ মোবাইল ব্যাংকিং একাউন্ট (নিজের এনআইডি দিয়ে নিবন্ধিত)।</li>
        <li>সদ্য তোলা পাসপোর্ট সাইজ রঙিন ছবি।</li>
      </ul>
    `,
  },
  {
    id: 'b-post-6',
    title: 'My Banglalink App Refer Code 2026 (মাই বাংলালিংক রেফার কোড ও ফ্রি ১ জিবি এমবি)',
    slug: 'banglalink-refer-code-free-internet',
    category: 'অন্যান্য ও ড্র রেজাল্ট',
    categorySlug: 'others',
    excerpt: 'MyBL অ্যাপ ইনস্টল করে রেফার কোড ইনপুট করে বিনামূল্যে ১ জিবি ইন্টারনেট বোনাস ও রেফারেন্স বোনাস পাওয়ার নিয়ম।',
    metaTitle: 'My Banglalink App Refer Code 2026 | মাই বাংলালিংক রেফার কোড',
    metaDescription: 'My Banglalink App Refer Code 2026 মাই বাংলালিংক অ্যাপে রেফার কোড ব্যবহার করে ফ্রী ইন্টারনেট ও এমবি বোনাস নেওয়ার উপায়।',
    date: 'আগস্ট ১৬, ২০২৬',
    readTime: '৩ মিনিট পড়া',
    author: 'Tech Reviewer',
    tags: ['Banglalink', 'MyBL App', 'Refer Code', 'Free Internet'],
    content: `
      <h2>মাই বাংলালিংক অ্যাপ রেফার কোড ও ১ জিবি ফ্রি ডাটা অফার ২০২৬</h2>
      <p>বাংলালিংক গ্রাহকদের জন্য MyBL (My Banglalink App)-এ অফিশিয়াল রেফারেল বোনাস চালু রয়েছে। নতুন ইউজার অ্যাপে রেফার কোড ব্যবহার করলে পাবেন ১ জিবি পর্যন্ত ফ্রি ডাটা।</p>

      <h3>ফ্রি এমবি নেওয়ার নিয়মসমূহ:</h3>
      <ol>
        <li>গুগল প্লে-স্টোর বা অ্যাপ স্টোর থেকে <strong>MyBL App</strong> ডাউনলোড করুন।</li>
        <li>আপনার বাংলালিংক নম্বর দিয়ে লগইন ও ওটিপি (OTP) ভেরিফাই করুন।</li>
        <li>অ্যাপের মেনু অপশনে গিয়ে <strong>Refer Code / Refer App</strong> সেকশনে প্রবেশ করুন।</li>
        <li>রেফার বক্সে অফিশিয়াল কোড লিখুন ও ওকে দিন।</li>
        <li>সাথে সাথেই ১ জিবি বোনাস ইন্টারনেট আপনার মূল ইন্টারনেট ব্যালেন্সে যুক্ত হবে।</li>
      </ol>
    `,
  },
  {
    id: 'b-post-7',
    title: 'Sylhet Board SSC Result 2026 Marksheet (সিলেট বোর্ড এসএসসি রেজাল্ট ও মার্কশিট ডাউনলোড)',
    slug: 'sylhet-board-ssc-result-marksheet-2026',
    category: 'শিক্ষা ও ফলপ্রকাশ',
    categorySlug: 'education-result',
    excerpt: 'সিলেট মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষা বোর্ডের এসএসসি রেজাল্ট ২০২৬ অফিশিয়াল ওয়েবসাইট (sylhetboard.gov.bd) হতে দেখার নির্দেশিকা।',
    metaTitle: 'Sylhet Board SSC Result 2026 Marksheet | সিলেট বোর্ড এসএসসি রেজাল্ট',
    metaDescription: 'Sylhet Board SSC Result 2026 Marksheet সিলেট বোর্ডের এসএসসি রেজাল্ট ও মার্কশিট ডাউনলোডের অফিশিয়াল পোর্টাল লিংক ও SMS পদ্ধতি।',
    date: 'আগস্ট ১৫, ২০২৬',
    readTime: '৪ মিনিট পড়া',
    author: 'Edu News Team',
    tags: ['Sylhet Board', 'SSC Result', 'সিলেট বোর্ড'],
    content: `
      <h2>সিলেট শিক্ষা বোর্ড এসএসসি রেজাল্ট ২০২৬ (Sylhet Board SSC Result)</h2>
      <p>মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষা বোর্ড, সিলেট-এর অধীনস্থ সকল কেন্দ্র ও বিদ্যালয়ের এসএসসি ও সমমান পরীক্ষা ২০২৬-এর ফলাফল সম্পর্কিত অফিশিয়াল নির্দেশিকা।</p>

      <h3>অনলাইনে ফল জানার নিয়ম:</h3>
      <ul>
        <li>সিলেট বোর্ডের অফিসিয়াল ওয়েবসাইট <a href="https://sylhetboard.gov.bd" target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-bold underline">sylhetboard.gov.bd</a> এ ভিজিট করুন।</li>
        <li>Result অপশন সিলেক্ট করে আপনার রোল ও রেজিস্ট্রেশন নম্বর দিন।</li>
        <li>এছাড়া <a href="https://eboardresults.com" target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-bold underline">eboardresults.com</a> থেকে সিলেট বোর্ড সিলেক্ট করে মার্কশিট দেখা যাবে।</li>
      </ul>

      <h3>SMS কোড (সিলেট বোর্ড):</h3>
      <div className="bg-slate-900 text-emerald-400 p-4 rounded-xl font-mono text-center my-3">
        SSC &lt;space&gt; SYL &lt;space&gt; Roll &lt;space&gt; 2026 ➔ Send to 16222
      </div>
    `,
  },
  {
    id: 'b-post-8',
    title: 'হারানো এসএসসি বা এইচএসসি মূল সার্টিফিকেট তোলার অফিশিয়াল নিয়ম ২০২৬',
    slug: 'how-to-recover-lost-academic-certificate',
    category: 'NID ও সরকারি সেবা',
    categorySlug: 'nid-services',
    excerpt: 'বোর্ড পরীক্ষা (SSC/HSC)-এর সার্টিফিকেট বা নম্বরপত্র হারিয়ে গেলে থানায় জিডি (GD), পত্রিকায় বিজ্ঞপ্তি ও বোর্ডে আবেদনের ধাপসমূহ।',
    metaTitle: 'হারানো এসএসসি/এইচএসসি মূল সার্টিফিকেট তোলার নিয়ম ২০২৬ | Lost Certificate Apply',
    metaDescription: 'হারানো এসএসসি বা এইচএসসি মূল সার্টিফিকেট তোলার নিয়ম থানায় জিডি, পেপারে বিজ্ঞাপন ও শিক্ষাবোর্ডে চালানের টাকা জমা দিয়ে ডুপ্লিকেট সার্টিফিকেট নেওয়ার অফিশিয়াল প্রক্রিয়া।',
    date: 'আগস্ট ১৪, ২০২৬',
    readTime: '৬ মিনিট পড়া',
    author: 'Legal & Citizen Help',
    tags: ['Lost Certificate', 'Board Certificate', 'জিডি নিয়ম', 'ডুপ্লিকেট সার্টিফিকেট'],
    content: `
      <h2>হারানো এসএসসি ও এইচএসসি মূল সার্টিফিকেট উত্তোলনের নিয়মাবলি</h2>
      <p>শিক্ষা বোর্ডের মূল সার্টিফিকেট (Original Academic Certificate), নম্বরপত্র (Marksheet) বা প্রবেশপত্র হারিয়ে গেলে কীভাবে ডুপ্লিকেট কপির জন্য অফিশিয়াল আবেদন করবেন তার পুরো গাইড নিচে দেওয়া হলো:</p>

      <h3>১ম ধাপ: থানায় জিডি (General Diary) করা</h3>
      <p>নিকটস্থ থানায় গিয়ে সার্টিফিকেট হারানোর বিষয়টি বিস্তারিত উল্লেখ করে জিডি করুন। জিডিতে পরীক্ষার নাম, রোল, রেজিস্ট্রেশন নম্বর, শিক্ষা বোর্ড ও পাসের বছর স্পষ্টভাবে লিখতে হবে। জিডির মূল কপি ও নম্বর সংগ্রহে রাখুন।</p>

      <h3>২য় ধাপ: দৈনিক পত্রিকায় বিজ্ঞপ্তি দেওয়া</h3>
      <p>যেকোনো বহুল প্রচারিত জাতীয় দৈনিক পত্রিকায় একটি ছোট হারানো বিজ্ঞপ্তি দিন। বিজ্ঞাপনে জিডি নম্বর ও সার্টিফিকেটের বিস্তারিত তথ্য উল্লেখ করতে হবে।</p>

      <h3>৩য় ধাপ: শিক্ষা বোর্ডে চালান জমা ও আবেদন ফরম পূরণ</h3>
      <ul>
        <li>সংস্লিষ্ট শিক্ষা বোর্ডের সার্ভিস পোর্টাল হতে <strong>ডুপ্লিকেট সার্টিফিকেট আবেদন ফরম</strong> ডাউনলোড করুন।</li>
        <li>সোনারী ব্যাংকের পে-স্লিপ বা নির্ধারিত চালানের মাধ্যমে শিক্ষা বোর্ড নির্ধারিত ফি জমা দিন।</li>
        <li>ফরমের সাথে থানায় জিডির সত্যায়িত কপি ও পত্রিকার কাটিং সংযুক্ত করে বোর্ডে জমা দিন।</li>
        <li>আবেদনের ৭-১৫ কার্যদিবসের মধ্যে শিক্ষা বোর্ড ডুপ্লিকেট মূল সার্টিফিকেট ইস্যু করে দেবে।</li>
      </ul>
    `,
  },
  {
    id: 'b-post-9',
    title: 'নতুন ভোটার আইডি কার্ড এনআইডি অনলাইন ডাউনলোড ২০২৬ (New NID Card Download)',
    slug: 'new-voter-id-card-download-online-2026',
    category: 'NID ও সরকারি সেবা',
    categorySlug: 'nid-services',
    excerpt: 'বাংলাদেশ নির্বাচন কমিশনের এনআইডি সার্ভিস পোর্টাল (services.nidw.gov.bd) থেকে ফেস ভেরিফিকেশন করে অরিজিনাল জাতীয় পরিচয়পত্র PDF ডাউনলোডের নিয়ম।',
    metaTitle: 'নতুন ভোটার আইডি কার্ড এনআইডি অনলাইন ডাউনলোড ২০২৬ | New NID Download',
    metaDescription: 'নতুন ভোটার আইডি কার্ড এনআইডি অনলাইন ডাউনলোড ২০২৬ ফর্ম নম্বর দিয়ে জাতীয় পরিচয়পত্র ডাউনলোড ও NID Wallet ফেস ভেরিফিকেশন অফিশিয়াল গাইড।',
    date: 'আগস্ট ১৩, ২০২৬',
    readTime: '৫ মিনিট পড়া',
    author: 'NID Service Helper',
    tags: ['NID Card', 'Smart NID', 'নতুন ভোটার আইডি', 'NID Download'],
    coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    content: `
      <h2>নতুন ভোটার আইডি কার্ড (Smart NID Card) ডাউনলোড ২০২৬</h2>
      <p>নতুন ভোটার তালিকায় নাম তোলার পর স্লিপ নম্বর বা ফরম নম্বর দিয়ে খুব সহজেই মোবাইল বা কম্পিউটার থেকে নির্বাচন কমিশনের অফিশিয়াল ওয়েবসাইট হতে স্মার্ট এনআইডি কার্ড ডাউনলোড করা সম্ভব।</p>

      <h3>স্মার্ট এনআইডি ডাউনলোডের স্টেপ-বাই-স্টেপ প্রসেস:</h3>
      <ol>
        <li>বাংলাদেশ নির্বাচন কমিশনের অফিশিয়াল এনআইডি পোর্টাল <a href="https://services.nidw.gov.bd" target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-bold underline">services.nidw.gov.bd</a>-এ যান।</li>
        <li><strong>রেজিস্ট্রেশন করুন</strong> বাটনে ক্লিক করুন।</li>
        <li>আপনার <strong>Form Number (NIDFN)</strong> অথবা এনআইডি নম্বর এবং সঠিক <strong>জন্ম তারিখ (Date of Birth)</strong> প্রদান করুন।</li>
        <li>বর্তমান ঠিকানা ও স্থায়ী ঠিকানা (বিভাগ, জেলা, উপজেলা) সঠিকভাবে নির্বাচন করুন।</li>
        <li>আপনার সচল মোবাইল নম্বর দিয়ে ওটিপি ভেরিফাই করুন।</li>
        <li>স্মার্টফোনে <strong>NID Wallet App</strong> ডাউনলোড করে কিউআর কোড স্ক্যান করুন এবং নিজের ফেস ভেরিফিকেশন সম্পন্ন করুন।</li>
        <li>পাসওয়ার্ড সেট করে ড্যাশবোর্ডে প্রবেশ করে <strong>ডাউনলোড (Download)</strong> অপশনে চাপলেই রঙিন অফিশিয়াল জাতীয় পরিচয়পত্র PDF কপি পেয়ে যাবেন।</li>
      </ol>
    `,
  },
  {
    id: 'b-post-10',
    title: 'বিধবা ও স্বামী নিগৃহীতা ভাতা অনলাইন আবেদন ২০২৬ (Widow Allowance Application)',
    slug: 'widow-allowance-online-application-2026',
    category: 'সরকারি ভাতা ও সেবা',
    categorySlug: 'social-allowance',
    excerpt: 'সমাজকল্যাণ মন্ত্রণালয়ের অধীন বিধবা ও স্বামী নিগৃহীতা মহিলা ভাতা পাওয়ার যোগ্যতার শর্ত এবং বিকাশ/নগদ পেমেন্ট একাউন্ট সহ আবেদন পদ্ধতি।',
    metaTitle: 'বিধবা ও স্বামী নিগৃহীতা ভাতা অনলাইন আবেদন ২০২৬ | Widow Allowance Apply',
    metaDescription: 'বিধবা ও স্বামী নিগৃহীতা ভাতা অনলাইন আবেদন ২০২৬ সমাজসেবা পোর্টালে অনলাইন আবেদন করার নিয়মাবলী ও কাগজপত্রের তালিকা।',
    date: 'আগস্ট ১২, ২০২৬',
    readTime: '৪ মিনিট পড়া',
    author: 'Service Care Team',
    tags: ['বিধবা ভাতা', 'সমাজসেবা', 'মহিলা ভাতা', 'সরকারি সুযোগ'],
    content: `
      <h2>বিধবা ও স্বামী পরিত্যক্তা ভাতা অনলাইন আবেদন ২০২৬</h2>
      <p>অসচ্ছল, স্বামীহারা ও স্বামী নিগৃহীতা মহিলাদের আর্থিক স্বাবলম্বিতা ও সুরক্ষা নিশ্চিত করতে সরকারের সমাজসেবা অধিদপ্তর মাসিক ভাতা প্রদান করে থাকে।</p>

      <h3>ভাতা পাওয়ার প্রাথমিক যোগ্যতা:</h3>
      <ul>
        <li>আবেদনকারীকে অবশ্যই বিধবা অথবা স্বামী পরিত্যক্তা/নিগৃহীতা নারী হতে হবে।</li>
        <li>আবেদনকারীর বয়স ১৮ বছরের উপরে হতে হবে।</li>
        <li>আবেদনকারীর জাতীয় পরিচয়পত্র থাকতে হবে।</li>
        <li>আবেদনকারীর বার্ষিক গড় আয় ১২,০০০ টাকার নিচে হতে হবে।</li>
      </ul>
    `,
  },
  {
    id: 'b-post-11',
    title: 'শিক্ষা উপবৃত্তি আবেদন নিয়ম ও জিপিএ যোগ্যতা ২০২৬ (Stipend Scholarship Rules)',
    slug: 'shikhsha-upobitti-application-rules-eligibility-2026',
    category: 'উপবৃত্তি ও শিক্ষা বৃত্তি',
    categorySlug: 'stipend',
    excerpt: 'প্রাথমিক, মাধ্যমিক, উচ্চমাধ্যমিক ও ডিগ্রি পর্যায়ের সরকারি শিক্ষা উপবৃত্তি আবেদন করার অফিশিয়াল নিয়মাবলী ও প্রয়োজনীয় শর্ত।',
    metaTitle: 'শিক্ষা উপবৃত্তি আবেদন নিয়ম ও জিপিএ যোগ্যতা ২০২৬ | Education Stipend Rules',
    metaDescription: 'শিক্ষা উপবৃত্তি আবেদন নিয়ম ও জিপিএ যোগ্যতা ২০২৬ স্কুলের প্রাথমিক ও মাধ্যমিক এবং একাদশ শ্রেণির শিক্ষার্থীদের সরকারি উপবৃত্তি আবেদনের পোর্টাল নির্দেশিকা।',
    date: 'আগস্ট ১১, ২০২৬',
    readTime: '৫ মিনিট পড়া',
    author: 'Stipend Cell',
    tags: ['শিক্ষা উপবৃত্তি', 'উপবৃত্তি আবেদন', 'Scholarship', 'HSP Portal'],
    content: `
      <h2>সরকারি শিক্ষা উপবৃত্তি আবেদন ২০২৬ (HSP Education Stipend 2026)</h2>
      <p>শিক্ষা মন্ত্রণালয়ের মাধ্যমিক ও উচ্চ শিক্ষা বিভাগ কর্তৃক সমন্বিত উপবৃত্তি কর্মসূচির (HSP) আওতায় ষষ্ঠ থেকে দ্বাদশ শ্রেণি এবং স্নাতক পর্যায়ের অসচ্ছল ও মেধাবী শিক্ষার্থীদের উপবৃত্তি প্রদান করা হয়।</p>

      <h3>উপবৃত্তির আবেদনের জন্য প্রয়োজনীয় কাগজপত্র:</h3>
      <ol>
        <li>শিক্ষার্থীর ডিজিটাল জন্ম নিবন্ধন সনদ অথবা এনআইডি।</li>
        <li>পিতা-মাতার এনআইডি কার্ডের ফটোকপি।</li>
        <li>অভিভাবকের নামে নিবন্ধিত সচল বিকাশ/নগদ/রকেট মোবাইল ব্যাংকিং নম্বর।</li>
        <li>বিগত পরীক্ষার নম্বরপত্র বা ট্রান্সক্রিপ্ট।</li>
      </ol>
    `,
  },
  {
    id: 'b-post-12',
    title: 'নতুন ভোটার তালিকা ২০২৫-২৬ মোবাইল দিয়ে চেক করার উপায় (New Voter List Check Online)',
    slug: 'new-voter-list-check-online',
    category: 'NID ও সরকারি সেবা',
    categorySlug: 'nid-services',
    excerpt: 'বাংলাদেশ নির্বাচন কমিশন কর্তৃক প্রকাশিত নতুন চূড়ান্ত ভোটার তালিকা ও ভোটার এলাকা অনুযায়ী সিরিয়াল নম্বর মোবাইল থেকে খোজার নিয়ম।',
    metaTitle: 'নতুন ভোটার তালিকা ২০২৫-২৬ মোবাইল দিয়ে চেক করার উপায় | Voter List Check',
    metaDescription: 'নতুন ভোটার তালিকা ২০২৫-২৬ চেক করার উপায় অনলাইন চূড়ান্ত ভোটার তালিকা PDF ও নিজের এনআইডি এনরোলমেন্ট নম্বর চেক নির্দেশিকা।',
    date: 'আগস্ট ১০, ২০২৬',
    readTime: '৪ মিনিট পড়া',
    author: 'NID Service Helper',
    tags: ['ভোটার তালিকা', 'Voter List 2026', 'NID Services', 'নির্বাচন কমিশন'],
    content: `
      <h2>নতুন ভোটার তালিকা ২০২৫-২৬ খোজার অনলাইন পদ্ধতি</h2>
      <p>বাংলাদেশ নির্বাচন কমিশন প্রতিবছর নতুন ভোটারদের অন্তর্ভুক্ত করে হালনাগাদ চূড়ান্ত ভোটার তালিকা প্রকাশ করে থাকে। আপনি খুব সহজেই আপনার ভোটার নম্বর ও কেন্দ্র সিরিয়াল চেক করতে পারবেন।</p>

      <h3>অনলাইনে ভোটার এলাকা ও তালিকা চেক করার নিয়ম:</h3>
      <ul>
        <li>নির্বাচন কমিশনের রেজাল্ট ও ভোটার পোর্টাল <a href="https://services.nidw.gov.bd" target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-bold underline">services.nidw.gov.bd</a>-এ যান।</li>
        <li><strong>ভোটার তথ্য অনুসন্ধান</strong> লিংকে ক্লিক করুন।</li>
        <li>নিজের জাতীয় পরিচয়পত্র নম্বর বা ফর্ম নম্বর এবং জন্ম তারিখ দিন।</li>
        <li>ক্যাপচা পূরণ করে <strong>ভোটার তথ্য দেখুন</strong> বাটনে চাপ দিলে আপনার ভোটকেন্দ্রের নাম, ভোটার নম্বর ও ওয়ার্ড বিস্তারিত দেখা যাবে।</li>
      </ul>
    `,
  },
  {
    id: 'b-post-13',
    title: 'জাতীয় বিশ্ববিদ্যালয় অনার্স ১ম বর্ষ পরীক্ষা রুটিন ২০২৬ PDF (NU Honours 1st Year Routine 2026)',
    slug: 'nu-honours-1st-year-routine-2026-pdf',
    category: 'শিক্ষা ও ফলপ্রকাশ',
    categorySlug: 'education-result',
    excerpt: 'জাতীয় বিশ্ববিদ্যালয় (National University) অনার্স ১ম বর্ষ ২০২৩-২৪ ও ২০২৪-২৫ সেশনের বিষয়ভিত্তিক পূর্ণাঙ্গ পরীক্ষার সময়সূচি ও PDF ডাউনলোড লিংক।',
    metaTitle: 'জাতীয় বিশ্ববিদ্যালয় অনার্স ১ম বর্ষ পরীক্ষা রুটিন ২০২৬ PDF | NU Honours Routine',
    metaDescription: 'জাতীয় বিশ্ববিদ্যালয় অনার্স ১ম বর্ষ পরীক্ষা রুটিন ২০২৬ PDF ডাউনলোড নিয়মাবলি, পরীক্ষার কেন্দ্র তালিকা, এডমিট কার্ড সংগ্রহ ও পরীক্ষা শুরু সময়।',
    date: 'আগস্ট ২১, ২০২৬',
    readTime: '৫ মিনিট পড়া',
    author: 'NU Exam Cell',
    tags: ['NU Routine', 'Honours 1st Year', 'জাতীয় বিশ্ববিদ্যালয়', 'অনার্স রুটিন'],
    coverImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
    content: `
      <h2>জাতীয় বিশ্ববিদ্যালয় অনার্স ১ম বর্ষ পরীক্ষা রুটিন ২০২৬ (NU Honours 1st Year Routine PDF)</h2>
      <p>জাতীয় বিশ্ববিদ্যালয় (National University, Bangladesh)-এর অধীনে অনুষ্ঠিতব্য ২০২৬ সালের অনার্স ১ম বর্ষ (২০২৩-২৪ ও ২০২৪-২৫ শিক্ষাবর্ষের নিয়মিত, অনিয়মিত ও গ্রেড উন্নয়ন) পরীক্ষার অফিশিয়াল রুটিন ও নির্দেশিকা প্রকাশিত হয়েছে। শিক্ষার্থীরা খুব সহজেই আমাদের সাইট থেকে সরাসরি পিডিএফ ডাউনলোড ও সময়সূচি চেক করতে পারবেন।</p>

      <h3>পরীক্ষার গুরুত্বপূর্ণ তথ্য ও সময়সূচি:</h3>
      <table className="w-full border-collapse border border-gray-300 my-4 text-sm">
        <thead>
          <tr className="bg-emerald-700 text-white font-bold">
            <th className="border border-gray-300 p-2.5">বিবরণ</th>
            <th className="border border-gray-300 p-2.5">তথ্য / সময়</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="border border-gray-300 p-2.5 font-bold">পরীক্ষা শুরুর সময়</td><td className="border border-gray-300 p-2.5">প্রতিদিন দুপুর ০১:৩০ মি. (বেলা দেড়টা)</td></tr>
          <tr><td className="border border-gray-300 p-2.5 font-bold">পরীক্ষার সময়কাল</td><td className="border border-gray-300 p-2.5">প্রশ্নপত্রে উল্লেখিত সময় অনুযায়ী (৩/৪ ঘণ্টা)</td></tr>
          <tr><td className="border border-gray-300 p-2.5 font-bold">অফিশিয়াল ওয়েবসাইট</td><td className="border border-gray-300 p-2.5">nu.ac.bd / nu.edu.bd</td></tr>
          <tr><td className="border border-gray-300 p-2.5 font-bold">প্রবেশপত্র সংগ্রহ</td><td className="border border-gray-300 p-2.5">পরীক্ষা শুরুর ৩ দিন পূর্বে নিজ নিজ কলেজ হতে</td></tr>
        </tbody>
      </table>

      <h3>অন অনার্স ১ম বর্ষ রুটিন PDF ডাউনলোড করার অফিশিয়াল নিয়ম:</h3>
      <ol>
        <li>জাতীয় বিশ্ববিদ্যালয়ের অফিশিয়াল পোর্টাল <a href="https://www.nu.ac.bd" target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-bold underline">nu.ac.bd</a> এ প্রবেশ করুন।</li>
        <li>মেনু বার থেকে <strong>Recent Notices / Examination Routine</strong> ট্যাবে ক্লিক করুন।</li>
        <li><strong>"Honours 1st Year Exam Routine 2026 PDF"</strong> অপশনে প্রেস করলেই মূল অফিশিয়াল নোটিশটি ডাউনলোড হয়ে যাবে।</li>
      </ol>

      <h3>পরীক্ষার্থীদের জন্য জরুরি অফিশিয়াল নির্দেশাবলী:</h3>
      <ul>
        <li>পরীক্ষার্থীদের অবশ্যই নিজ নিজ কলেজের অধ্যক্ষের স্বাক্ষর ও সিলযুক্ত অফিশিয়াল <strong>প্রবেশপত্র (Admit Card)</strong> সঙ্গে আনতে হবে।</li>
        <li>পরীক্ষার হলে ডিজিটাল ঘড়ি, মোবাইল বা কোনো ধরনের ইলেকট্রনিক ডিভাইস সম্পূর্ণ নিষিদ্ধ।</li>
        <li>ব্যবহারিক পরীক্ষার সময়সূচি তত্ত্বীয় পরীক্ষা শেষ হওয়ার পর জাতীয় বিশ্ববিদ্যালয়ের পোর্টালে আলাদাভাবে জানিয়ে দেওয়া হবে।</li>
      </ul>
    `,
    faq: [
      {
        question: 'অনার্স ১ম বর্ষ পরীক্ষার এডমিট কার্ড কোথায় পাব?',
        answer: 'পরীক্ষার্থীকে তার নিজ নিজ কলেজ ডিজিটাল পোর্টাল বা প্রশাসনিক ভবন থেকে কলেজ অধ্যক্ষের সিল স্বাক্ষর সহ প্রবেশপত্র সংগ্রহ করতে হবে।',
      },
      {
        question: 'পরীক্ষার কেন্দ্র তালিকা কীভাবে দেখব?',
        answer: 'জাতীয় বিশ্ববিদ্যালয়ের nu.ac.bd পোর্টালে রুটিনের পাশাপাশি কেন্দ্র তালিকা (Center List) আলাদা নোটিশে প্রকাশ করা হয়।',
      },
    ],
  },
  {
    id: 'b-post-14',
    title: 'প্রাথমিক বৃত্তি পরীক্ষা রুটিন ২০২৬ PDF ডাউনলোড (Primary Scholarship Exam Routine)',
    slug: 'primary-scholarship-routine-2026-pdf',
    category: 'উপবৃত্তি ও শিক্ষা বৃত্তি',
    categorySlug: 'stipend',
    excerpt: 'প্রাথমিক শিক্ষা অধিদপ্তর (DPE) ৫ম শ্রেণি প্রাথমিক বৃত্তি পরীক্ষা ২০২৬ এর বিষয়ভিত্তিক সময়সূচি, মানবণ্টন ও PDF রুটিন ডাউনলোড।',
    metaTitle: 'প্রাথমিক বৃত্তি পরীক্ষা রুটিন ২০২৬ PDF | Primary Scholarship Routine',
    metaDescription: 'প্রাথমিক বৃত্তি পরীক্ষা রুটিন ২০২৬ PDF প্রাথমিক শিক্ষা অধিদপ্তর ৫ম শ্রেণির বৃত্তি পরীক্ষার রুটিন, বিষয়ভিত্তিক ১০০ নম্বরের মানবণ্টন ও পরীক্ষার নিয়মাবলী।',
    date: 'আগস্ট ২১, ২০২৬',
    readTime: '৪ মিনিট পড়া',
    author: 'Primary Edu Team',
    tags: ['প্রাথমিক বৃত্তি', 'DPE Routine', 'Primary Scholarship', '৫ম শ্রেণি'],
    coverImage: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1200&q=80',
    content: `
      <h2>প্রাথমিক বৃত্তি পরীক্ষা ২০২৬ পূর্ণাঙ্গ রুটিন ও মানবণ্টন (Primary Scholarship Routine)</h2>
      <p>প্রাথমিক শিক্ষা অধিদপ্তর (DPE) কর্তৃক ৫ম শ্রেণির প্রাথমিক বিদ্যালয়ের শিক্ষার্থীদের জন্য প্রাথমিক বৃত্তি পরীক্ষা ২০২৬-এর অফিশিয়াল সময়সূচি ও প্রশ্ন কাঠামোর মানবণ্টন ঘোষণা করা হয়েছে।</p>

      <h3>প্রাথমিক বৃত্তি পরীক্ষার বিষয়ভিত্তিক নম্বর বিভাজন:</h3>
      <p>বৃত্তি পরীক্ষা মোট <strong>১০০ নম্বরের</strong> বিষয়ভিত্তিক প্রশ্নের ওপর অনুষ্ঠিত হবে। সময় থাকবে ২ ঘণ্টা (সকাল ১০:০০ মি. হতে দুপুর ১২:০০ মি. পর্যন্ত)।</p>
      <table className="w-full border-collapse border border-gray-300 my-4 text-sm">
        <thead>
          <tr className="bg-emerald-700 text-white font-bold">
            <th className="border border-gray-300 p-2">বিষয়ের নাম</th>
            <th className="border border-gray-300 p-2">নম্বর</th>
            <th className="border border-gray-300 p-2">প্রশ্ন ধরন</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="border border-gray-300 p-2 font-bold">বাংলা (Bangla)</td><td className="border border-gray-300 p-2">২৫ নম্বর</td><td className="border border-gray-300 p-2">বহুনির্বাচনী ও সংক্ষিপ্ত উত্তর</td></tr>
          <tr><td className="border border-gray-300 p-2 font-bold">ইংরেজি (English)</td><td className="border border-gray-300 p-2">২৫ নম্বর</td><td className="border border-gray-300 p-2">Short Questions & Composition</td></tr>
          <tr><td className="border border-gray-300 p-2 font-bold">প্রাথমিক গণিত (Mathematics)</td><td className="border border-gray-300 p-2">২৫ নম্বর</td><td className="border border-gray-300 p-2">গাণিতিক সমস্যা ও সমাধান</td></tr>
          <tr><td className="border border-gray-300 p-2 font-bold">প্রাথমিক বিজ্ঞান (Science)</td><td className="border border-gray-300 p-2">২৫ নম্বর</td><td className="border border-gray-300 p-2">সংক্ষিপ্ত ও যোগ্যতাভিত্তিক প্রশ্ন</td></tr>
        </tbody>
      </table>

      <h3>বৃত্তি পোর্টালে ফলাফল ও রুটিন দেখার নিয়ম:</h3>
      <p>প্রাথমিক শিক্ষা অধিদপ্তরের মূল ওয়েবসাইট <a href="https://dpe.gov.bd" target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-bold underline">dpe.gov.bd</a> অথবা ডিপিইও (DPEO) নোটিশ বোর্ড থেকে সরাসরি রুটিন পিডিএফ ফাইল পেয়ে যাবেন।</p>
    `,
    faq: [
      {
        question: 'প্রাথমিক বৃত্তি পরীক্ষায় কোন শ্রেণির শিক্ষার্থীরা অংশ নিতে পারবে?',
        answer: 'সরকারি ও নিবন্ধিত প্রাথমিক বিদ্যালয়ের ৫ম শ্রেণির বার্ষিক পরীক্ষায় উত্তীর্ণ নির্ধারিত শতাংশ মেধাবী শিক্ষার্থীরা এ পরীক্ষায় অংশ নিতে পারবে।',
      },
    ],
  },
  {
    id: 'b-post-15',
    title: 'জাতীয় বিশ্ববিদ্যালয় ডিগ্রি পাস ভর্তি বিজ্ঞপ্তি ২০২৬ (NU Degree Admission Circular)',
    slug: 'degree-admission-circular-2026-nu',
    category: 'শিক্ষা ও ফলপ্রকাশ',
    categorySlug: 'education-result',
    excerpt: 'জাতীয় বিশ্ববিদ্যালয় (National University) ডিগ্রি ১ম বর্ষ পাস ও সার্টিফিকেট কোর্স ভর্তি বিজ্ঞপ্তি ২০২৬। ন্যূনতম জিপিএ ও অনলাইন আবেদন নির্দেশিকা।',
    metaTitle: 'ডিগ্রি পাস ভর্তি বিজ্ঞপ্তি ২০২৬ ও আবেদন নিয়ম | NU Degree Admission',
    metaDescription: 'জাতীয় বিশ্ববিদ্যালয় ডিগ্রি পাস ভর্তি বিজ্ঞপ্তি ২০২৬ অনলাইনে প্রাথমিক আবেদন করার পয়েন্ট যোগ্যতা, সাবজেক্ট চয়েস ও প্রয়োজনীয় কাগজপত্রের তালিকা।',
    date: 'আগস্ট ২১, ২০২৬',
    readTime: '৫ মিনিট পড়া',
    author: 'NU Admission Team',
    tags: ['Degree Admission', 'জাতীয় বিশ্ববিদ্যালয়', 'ডিগ্রি ভর্তি', 'NU Admission'],
    coverImage: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=1200&q=80',
    content: `
      <h2>জাতীয় বিশ্ববিদ্যালয় ডিগ্রি পাস ও সার্টিফিকেট কোর্স ভর্তি বিজ্ঞপ্তি ২০২৬ (Degree Admission Circular)</h2>
      <p>জাতীয় বিশ্ববিদ্যালয় (National University)-এর অধীনস্থ সরকারি ও বেসরকারি কলেজসমূহে ২০২৬ সালের ডিগ্রি (পাস) ও সার্টিফিকেট কোর্স ১ম বর্ষের অফিশিয়াল ভর্তি বিজ্ঞপ্তি প্রকাশিত হয়েছে।</p>

      <h3>ডিগ্রি ভর্তির ন্যূনতম জিপিএ যোগ্যতা (Educational Qualifications):</h3>
      <table className="w-full border-collapse border border-gray-300 my-4 text-sm">
        <thead>
          <tr className="bg-emerald-700 text-white font-bold">
            <th className="border border-gray-300 p-2">পরীক্ষার নাম</th>
            <th className="border border-gray-300 p-2">ন্যূনতম জিপিএ (GPA)</th>
            <th className="border border-gray-300 p-2">পাসের সাল</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="border border-gray-300 p-2 font-bold">এসএসসি (SSC / সমমান)</td><td className="border border-gray-300 p-2">ন্যূনতম জিপিএ <strong>২.০ (2.00)</strong></td><td className="border border-gray-300 p-2">২০২১, ২০২২, ২০২৩</td></tr>
          <tr><td className="border border-gray-300 p-2 font-bold">এইচএসসি (HSC / সমমান)</td><td className="border border-gray-300 p-2">ন্যূনতম জিপিএ <strong>২.০ (2.00)</strong></td><td className="border border-gray-300 p-2">২০২৩, ২০২৪, ২০২৫</td></tr>
        </tbody>
      </table>

      <h3>অনলাইনে ডিগ্রি প্রাথমিক আবেদন করার অফিশিয়াল প্রসেস:</h3>
      <ol>
        <li>জাতীয় বিশ্ববিদ্যালয়ের ভর্তি ওয়েবসাইট <a href="http://app1.nu.edu.bd" target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-bold underline">app1.nu.edu.bd</a> অথবা <a href="https://www.nu.ac.bd/admissions" target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-bold underline">nu.ac.bd/admissions</a> পোর্টালে যান।</li>
        <li><strong>Degree Pass</strong> ট্যাবে গিয়ে <strong>Apply Now (Degree Pass)</strong> বোতামে ক্লিক করুন।</li>
        <li>আপনার এসএসসি ও এইচএসসি পরীক্ষার রোল ও রেজিস্ট্রেশন নম্বর লিখুন।</li>
        <li>নিজের পছন্দের কলেজ সিলেক্ট করে কোর্সের পছন্দক্রম (BA / BSS / BBS / BSc) প্রদান করুন।</li>
        <li>আবেদনকারীর সাম্প্রতিক তোলা পাসপোর্ট সাইজ রঙিন ছবি (১৫০x১২০ পিক্সেল) আপলোড করুন।</li>
        <li>আবেদন ফরম পূরণ শেষে প্রিন্ট কপি ও আবেদন ফি (৩৫০ টাকা) মোবাইল ব্যাংকিং (বিকাশ/রকেট/নগদ) এর মাধ্যমে কলেজে জমা দিন।</li>
      </ol>

      <h3>ভর্তির জন্য প্রয়োজনীয় কাগজপত্রের তালিকা:</h3>
      <ul>
        <li>অনলাইন থেকে ডাউনলোডের প্রাথমিক আবেদন ফর্মের মূল কপি।</li>
        <li>এসএসসি ও এইচএসসি পরীক্ষার মূল মার্কশিট/সনদের সত্যাহিত ফটোকপি।</li>
        <li>রেজিস্ট্রেশন কার্ড ও এডমিট কার্ডের ফটোকপি।</li>
        <li>আবেদনকারীর পাসপোর্ট সাইজ রঙিন ছবি ৪ কপি।</li>
      </ul>
    `,
    faq: [
      {
        question: 'ডিগ্রি প্রাথমিক আবেদনের ফি কত টাকা?',
        answer: 'জাতীয় বিশ্ববিদ্যালয়ের ডিগ্রি ১ম বর্ষ প্রাথমিক আবেদন ফি ৩৫০ (তিনশত পঞ্চাশ) টাকা।',
      },
      {
        question: 'এসএসসি বা এইচএসসিতে ২.০০ থাকলে কি ডিগ্রি ভর্তি হওয়া যাবে?',
        answer: 'হ্যাঁ, উভয় পরীক্ষায় ন্যূনতম ২.০০ জিপিএ থাকলে ডিগ্রি পাস কোর্সে আবেদনের সুযোগ রয়েছে।',
      },
    ],
  },
  {
    id: 'b-post-16',
    title: 'জাতীয় বিশ্ববিদ্যালয় অনার্স ১ম বর্ষ তথ্য ও যোগাযোগ প্রযুক্তি (ICT) সাজেশন ২০২৬ PDF',
    slug: 'honours-1st-year-ict-suggestion-2026-pdf',
    category: 'শিক্ষা ও ফলপ্রকাশ',
    categorySlug: 'education-result',
    excerpt: 'অনার্স ১ম বর্ষ ফাইনাল পরীক্ষার জন্য কম্পিউটার ও তথ্য প্রযুক্তি (ICT) ১০০% কমন প্রশ্ন উত্তর সহ সাজেশন ও বিগত বছরের প্রশ্ন সমাধান PDF।',
    metaTitle: 'অনার্স ১ম বর্ষ আইসিটি সাজেশন ২০২৬ PDF | NU Honours 1st Year ICT Suggestion',
    metaDescription: 'জাতীয় বিশ্ববিদ্যালয় অনার্স ১ম বর্ষ তথ্য ও যোগাযোগ প্রযুক্তি (ICT) সাজেশন ২০২৬ PDF ফাইল ও কম্পিউটার সায়েন্স সংক্ষিপ্ত প্রশ্ন সমাধান।',
    date: 'আগস্ট ২১, ২০২৬',
    readTime: '৫ মিনিট পড়া',
    author: 'NU Suggestion Team',
    tags: ['ICT Suggestion', 'Honours 1st Year', 'জাতীয় বিশ্ববিদ্যালয়', 'আইসিটি সাজেশন'],
    content: `
      <h2>অনার্স ১ম বর্ষ কম্পিউটার ও তথ্য প্রযুক্তি (ICT) সাজেশন ২০২৬</h2>
      <p>জাতীয় বিশ্ববিদ্যালয় (National University)-এর অনার্স ১ম বর্ষের পরীক্ষার জন্য কম্পিউটার ও তথ্য প্রযুক্তি (Computer & Information Technology - ICT) বিষয়ের পূর্ণাঙ্গ ১০০% কমন ফাইনাল সাজেশন ও বিগত পরীক্ষার সমাধান নিচে তুলে ধরা হলো।</p>

      <h3>ক-বিভাগ (সংক্ষিপ্ত উত্তর প্রশ্নাবলী - নম্বর ১০):</h3>
      <ul>
        <li>১. কম্পিউটার বাস (Computer Bus) কাকে বলে? বিভিন্ন প্রকার বাসের সংজ্ঞার্থ লিখ।</li>
        <li>২. র‍্যাম (RAM) এবং রোম (ROM)-এর মধ্যে প্রধান ৩টি পার্থক্য নির্দেশ কর।</li>
        <li>৩. অপারেটিং সিস্টেম (Operating System)-এর প্রধান কাজসমূহ কী কী?</li>
        <li>৪. আইপি এড্রেস (IP Address) এবং ডোমেইন নেম (Domain Name)-এর পার্থক্য বুঝিয়ে বল।</li>
        <li>৫. ডাটাবেজ ম্যানেজমেন্ট সিস্টেম (DBMS)-এর সুবিধা কী কী?</li>
      </ul>

      <h3>খ ও গ-বিভাগ (রচনামূলক প্রশ্নাবলী - নম্বর ৭০):</h3>
      <ol>
        <li>১. ক্লাউড কম্পিউটিং (Cloud Computing) কী? এর বিভিন্ন প্রকার সার্ভিস মডেল (IaaS, PaaS, SaaS) চিত্রসহ আলোচনা কর।</li>
        <li>২. কম্পিউটার নেটওয়ার্কের টপোলজি (Star, Mesh, Ring, Bus) সমূহের তুলনামূলক সুবিধা ও অসুবিধা ব্যাখ্যা কর।</li>
        <li>৩. সাইবার নিরাপত্তা (Cyber Security) এবং ফায়ারওয়াল (Firewall)-এর গুরুত্ব সংক্ষেপে উপস্থাপন কর।</li>
      </ol>
    `,
  },
  {
    id: 'b-post-17',
    title: 'অনার্স ১ম বর্ষ ইতিহাস বিভাগ পূর্ণাঙ্গ ফাইনাল সাজেশন ২০২৬ PDF (NU History Suggestion)',
    slug: 'honours-1st-year-history-suggestion-pdf',
    category: 'শিক্ষা ও ফলপ্রকাশ',
    categorySlug: 'education-result',
    excerpt: 'জাতীয় বিশ্ববিদ্যালয় অনার্স ১ম বর্ষ ইতিহাস বিভাগের ক, খ এবং গ বিভাগের রচনামূলক ও সংক্ষিপ্ত প্রশ্ন উত্তর সহ প্রিমিয়াম সাজেশন।',
    metaTitle: 'অনার্স ১ম বর্ষ ইতিহাস বিভাগ সাজেশন ২০২৬ PDF | NU History Suggestion',
    metaDescription: 'জাতীয় বিশ্ববিদ্যালয় অনার্স ১ম বর্ষ ইতিহাস বিভাগের ফাইনাল পরীক্ষার সুপার সাজেশন ২০২৬ পিডিএফ ফাইল ও সংক্ষিপ্ত প্রশ্ন উত্তর।',
    date: 'আগস্ট ২১, ২০২৬',
    readTime: '৫ মিনিট পড়া',
    author: 'NU History Faculty',
    tags: ['History Suggestion', 'অনার্স ১ম বর্ষ', 'ইতিহাস বিভাগ', 'NU Suggestion'],
    content: `
      <h2>জাতীয় বিশ্ববিদ্যালয় অনার্স ১ম বর্ষ ইতিহাস সাজেশন ২০২৬ (NU History Department)</h2>
      <p>জাতীয় বিশ্ববিদ্যালয় অনার্স ১ম বর্ষ ইতিহাস বিভাগের শিক্ষার্থীদের জন্য পরীক্ষা ২০২৬-এর বিষভিত্তিক ক, খ এবং গ বিভাগের প্রশ্ন উত্তর ও গাইডলাইন নিচে তুলে ধরা হলো।</p>

      <h3>ক-বিভাগ (সংক্ষিপ্ত প্রশ্নাবলী):</h3>
      <ul>
        <li>১. ইতিহাস শব্দের উৎপত্তি কোন শব্দ থেকে হয়েছে?</li>
        <li>২. মেহেরগড় সভ্যতা কোন নদীর তীরে আবিষ্কৃত হয়?</li>
        <li>৩. হরপ্পা ও মহেঞ্জোদারো সভ্যতার অন্যতম প্রধান বৈশিষ্ট্য কী ছিল?</li>
        <li>৪. কৌটিল্য কে ছিলেন এবং তাঁর রচিত বিখ্যাত গ্রন্থের নাম কী?</li>
      </ul>

      <h3>খ ও গ-বিভাগ (রচনামূলক ও বিশ্লেষণাত্মক প্রশ্ন):</h3>
      <ol>
        <li>১. প্রাচীন ভারতের ইতিহাস পুনর্গঠনে প্রত্নতাত্ত্বিক উপাদানের গুরুত্ব মূল্যায়ন কর।</li>
        <li>২. সিন্ধু সভ্যতার নগর পরিকল্পনা ও সামাজিক-অর্থনৈতিক জীবনের একটি সংক্ষিপ্ত বিবরণ দাও।</li>
        <li>৩. মৌর্য সম্রাট অশোকের ‘ধর্ম’ নীতি এবং বৌদ্ধধর্ম প্রচারে তাঁর অবদান আলোচনা কর।</li>
      </ol>
    `,
  },
  {
    id: 'b-post-18',
    title: 'স্বাধীন বাংলাদেশের অভ্যুদয়ের ইতিহাস অনার্স ১ম বর্ষ সিলেবাস, বই ও সাজেশন PDF',
    slug: 'honours-1st-year-history-of-emergence-syllabus-suggestion',
    category: 'শিক্ষা ও ফলপ্রকাশ',
    categorySlug: 'education-result',
    excerpt: 'অনার্স ১ম বর্ষ আবশ্যিক বিষয় স্বাধীন বাংলাদেশের অভ্যুদয়ের ইতিহাস (History of the Emergence of Independent Bangladesh) বিষয় কোড ২১১৫০১।',
    metaTitle: 'স্বাধীন বাংলাদেশের অভ্যুদয়ের ইতিহাস সাজেশন ২০২৬ PDF | History of Emergence',
    metaDescription: 'স্বাধীন বাংলাদেশের অভ্যুদয়ের ইতিহাস অনার্স ১ম বর্ষ আবশ্যিক বিষয় বিষয় কোড ২১১৫০১ সিলেবাস ও ১০০% কমন সাজেশন ২০২৬ PDF।',
    date: 'আগস্ট ২১, ২০২৬',
    readTime: '৬ মিনিট পড়া',
    author: 'NU Exam Cell',
    tags: ['স্বাধীন বাংলাদেশের অভ্যুদয়ের ইতিহাস', '২০১৫০১', 'অনার্স ১ম বর্ষ', 'NU Mandatory'],
    content: `
      <h2>স্বাধীন বাংলাদেশের অভ্যুদয়ের ইতিহাস (History of the Emergence of Independent Bangladesh - 211501)</h2>
      <p>জাতীয় বিশ্ববিদ্যালয় অনার্স ১ম বর্ষের সকল বিভাগের জন্য বাধ্যতামূলক বা আবশ্যিক বিষয় ‘স্বাধীন বাংলাদেশের অভ্যুদয়ের ইতিহাস’ (বিষয় কোড: ২১১৫০১)-এর পূর্ণাঙ্গ ১০০ নম্বর ফাইনাল সাজেশন ও গাইডলাইন।</p>

      <h3>গুরুত্বপূর্ণ রচনামূলক প্রশ্নাবলী (গ-বিভাগ):</h3>
      <ol>
        <li>১. ১৯৫২ সালের ভাষা আন্দোলনের পটভূমি ও তাৎপর্য সংক্ষেপে আলোচনা কর। এটি কীভাবে বাঙালি জাতীয়তাবাদের উন্মেষ ঘটায়?</li>
        <li>২. ১৯৬৬ সালের ঐতিহাসিক ৬-দফা কর্মসূচির দফাগুলো উল্লেখ কর। একে কেন ‘বাঙালির ম্যাগনা কার্টা’ বলা হয়?</li>
        <li>৩. ১৯৬৯ সালের গণঅভ্যুত্থানের কারণ ও ঐতিহাসিক গুরুত্ব মূল্যায়ন কর।</li>
        <li>৪. ১৯৭১ সালের ৭ই মার্চের বঙ্গবন্ধুর ঐতিহাসিক ভাষণের মূল বক্তব্য এবং মুক্তিযুদ্ধে এর গুরুত্ব নিরূপণ কর।</li>
        <li>৫. ১৯৭১ সালের ২৫শে মার্চের কালরাতে সংঘটিত ‘অপারেশন সার্চলাইট’ এবং গণহত্যা সম্পর্কিত ঐতিহাসিক বিবরণ উপস্থাপন কর।</li>
      </ol>
    `,
  },
  {
    id: 'b-post-19',
    title: 'অনার্স ১ম বর্ষ কম্পিউটার ও তথ্য প্রযুক্তি (ICT) মূল বই PDF ডাউনলোড (NU ICT Book)',
    slug: 'honours-1st-year-ict-book-pdf-download',
    category: 'শিক্ষা ও ফলপ্রকাশ',
    categorySlug: 'education-result',
    excerpt: 'জাতীয় বিশ্ববিদ্যালয় অনার্স ১ম বর্ষের কম্পিউটার ও তথ্য প্রযুক্তি (Computer & Information Technology) মূল বই ও ই-বুক PDF।',
    metaTitle: 'অনার্স ১ম বর্ষ ICT মূল বই PDF ডাউনলোড | NU Honours ICT Book PDF',
    metaDescription: 'অনার্স ১ম বর্ষ কম্পিউটার ও তথ্য প্রযুক্তি (ICT) মূল পাঠ্যবই PDF ডাউনলোডের লিংক ও অধ্যায়ভিত্তিক তথ্য সংকলন।',
    date: 'আগস্ট ২১, ২০২৬',
    readTime: '৪ মিনিট পড়া',
    author: 'Edu Library Team',
    tags: ['ICT Book', 'Honours ICT', 'জাতীয় বিশ্ববিদ্যালয় বই', 'PDF Download'],
    content: `
      <h2>জাতীয় বিশ্ববিদ্যালয় অনার্স ১ম বর্ষ ICT মূল বই PDF (Computer & Info Tech)</h2>
      <p>অনার্স ১ম বর্ষের কম্পিউটার ও তথ্য প্রযুক্তি বিষয়ের মূল রেফারেন্স বইয়ের পিডিএফ সংস্করণ সংক্রান্ত অফিশিয়াল তথ্য নিচে প্রদান করা হলো।</p>

      <h3>বইয়ের প্রধান অধ্যায়সূচি:</h3>
      <ul>
        <li>অধ্যায় ১: কম্পিউটার পরিচিতি ও হার্ডওয়্যার সংগঠন (Hardware Organization)</li>
        <li>অধ্যায় ২: সফটওয়্যার, সিস্টেম সফটওয়্যার ও এপ্লিকেশন সফটওয়্যার</li>
        <li>অধ্যায় ৩: অপারেটিং সিস্টেম ও মেমোরি ম্যানেজমেন্ট</li>
        <li>অধ্যায় ৪: ডাটা কম্যুনিকেশন ও কম্পিউটার নেটওয়ার্কিং (Computer Networks)</li>
        <li>অধ্যায় ৫: ইন্টারনেট, ই-কমার্স ও তথ্য নিরাপত্তা (Cyber Security)</li>
      </ul>
    `,
  },
  {
    id: 'b-post-20',
    title: 'জাতীয় বিশ্ববিদ্যালয় মাস্টার্স ফাইনাল বর্ষ রেজাল্ট ২০২৬ ও মার্কশিট দেখার নিয়ম (NU Masters Result)',
    slug: 'nu-masters-final-year-result-2026',
    category: 'শিক্ষা ও ফলপ্রকাশ',
    categorySlug: 'education-result',
    excerpt: 'জাতীয় বিশ্ববিদ্যালয় মাস্টার্স শেষ পর্ব (Masters Final Year Result 2026) পরীক্ষার সিজিপিএ (CGPA) সহ ফলাফল দেখার অফিশিয়াল পোর্টাল ও SMS পদ্ধতি।',
    metaTitle: 'জাতীয় বিশ্ববিদ্যালয় মাস্টার্স ফাইনাল বর্ষ রেজাল্ট ২০২৬ | NU Masters Result',
    metaDescription: 'জাতীয় বিশ্ববিদ্যালয় মাস্টার্স ফাইনাল বর্ষ রেজাল্ট ২০২৬ দেখার নিয়ম অনলাইনে মার্কশিট সহ পয়েন্ট দেখার লিংক nu.ac.bd/results ও SMS কোড।',
    date: 'আগস্ট ২১, ২০২৬',
    readTime: '৫ মিনিট পড়া',
    author: 'NU Result Cell',
    tags: ['Masters Result', 'জাতীয় বিশ্ববিদ্যালয়', 'মাস্টার্স রেজাল্ট', 'nu.ac.bd'],
    content: `
      <h2>জাতীয় বিশ্ববিদ্যালয় মাস্টার্স ফাইনাল বর্ষ রেজাল্ট ২০২৬ (NU Masters Final Result)</h2>
      <p>জাতীয় বিশ্ববিদ্যালয়ের মাস্টার্স শেষ পর্ব (নিয়মিত, অনিয়মিত ও মানোন্নয়ন) পরীক্ষা ২০২৬-এর ফলাফল সম্পর্কিত অফিশিয়াল নির্দেশিকা। শিক্ষার্থীরা খুব সহজেই সিজিপিএ সহ তাদের রেজাল্ট চেক করতে পারবেন।</p>

      <h3>অনলাইনে মার্কশিট সহ রেজাল্ট দেখার নিয়ম:</h3>
      <ol>
        <li>জাতীয় বিশ্ববিদ্যালয়ের অফিসিয়াল ফলাফল ওয়েবসাইট <a href="http://www.nu.ac.bd/results" target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-bold underline">nu.ac.bd/results</a> এ প্রবেশ করুন।</li>
        <li>বামে থাকা অপশন থেকে <strong>Masters</strong> এ ক্লিক করে <strong>Masters Final</strong> সিলেক্ট করুন।</li>
        <li>আপনার <strong>Exam Roll Number</strong> এবং <strong>Registration Number</strong> ইনপুট দিন।</li>
        <li>পরীক্ষার বছর <strong>2026</strong> টাইপ করুন।</li>
        <li>সিকিউরিটি ক্যাপচা কোডটি দিয়ে <strong>Search Result</strong> বাটনে চাপলেই আপনার ফলাফল স্ক্রিনে প্রদর্শিত হবে।</li>
      </ol>

      <h3>SMS দিয়ে রেজাল্ট দেখার উপায়:</h3>
      <div className="bg-slate-900 text-emerald-400 p-4 rounded-xl font-mono text-center my-3">
        NU &lt;space&gt; MF &lt;space&gt; Roll_No ➔ পাঠাতে হবে 16222 নম্বরে
      </div>
    `,
  },
  {
    id: 'b-post-21',
    title: 'ফাজিল ১ম, ২য় ও ৩য় বর্ষ পরীক্ষা রুটিন ২০২৬ PDF (Fazil Honours Exam Routine IAU)',
    slug: 'fazil-honours-routine-2026-pdf',
    category: 'শিক্ষা ও ফলপ্রকাশ',
    categorySlug: 'education-result',
    excerpt: 'ইসলামিক আরবি বিশ্ববিদ্যালয় (IAU) ফাজিল অনার্স ও কামিল পরীক্ষা ২০২৬ বিষয়ভিত্তিক অফিশিয়াল সময়সূচি ও PDF ডাউনলোড।',
    metaTitle: 'ফাজিল পরীক্ষা রুটিন ২০২৬ PDF | Fazil Honours Routine IAU',
    metaDescription: 'ইসলামিক আরবি বিশ্ববিদ্যালয় ফাজিল অনার্স ১ম, ২য় ও ৩য় বর্ষ পরীক্ষা রুটিন ২০২৬ PDF ডাউনলোডের অফিশিয়াল পোর্টাল iau.edu.bd লিংক।',
    date: 'আগস্ট ২১, ২০২৬',
    readTime: '৪ মিনিট পড়া',
    author: 'IAU Exam Cell',
    tags: ['Fazil Routine', 'ইসলামিক আরবি বিশ্ববিদ্যালয়', 'ফাজিল রুটিন', 'IAU Exam'],
    content: `
      <h2>ইসলামিক আরবি বিশ্ববিদ্যালয় ফাজিল অনার্স পরীক্ষা রুটিন ২০২৬ (Fazil Routine PDF)</h2>
      <p>ইসলামিক আরবি বিশ্ববিদ্যালয় (Islamic Arabic University - IAU)-এর অধীনস্থ ফাজিল (অনার্স) ১ম, ২য়, ৩য় ও ৪র্থ বর্ষ পরীক্ষা ২০২৬-এর অফিশিয়াল বিষয়ভিত্তিক সময়সূচি প্রকাশ করা হয়েছে।</p>

      <h3>পরীক্ষা সংক্রান্ত গুরুত্বপূর্ণ তথ্য:</h3>
      <ul>
        <li>পরীক্ষা শুরুর সময়: প্রতিদিন দুপুর ১:৩০ মিনিট।</li>
        <li>অফিশিয়াল পোর্টাল: <a href="https://iau.edu.bd" target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-bold underline">iau.edu.bd</a>।</li>
        <li>পরীক্ষার্থীদের নিজ নিজ মাদরাসা হতে কেন্দ্র ফি জমা দিয়ে প্রবেশপত্র সংগ্রহ করতে হবে।</li>
      </ul>
    `,
  },
  {
    id: 'b-post-22',
    title: 'জাতীয় বিশ্ববিদ্যালয় ডিগ্রি ১ম বর্ষ ফরম পূরণ নোটিশ ২০২৬ (NU Degree 1st Year Form Fillup)',
    slug: 'nu-degree-1st-year-form-fillup-2026',
    category: 'শিক্ষা ও ফলপ্রকাশ',
    categorySlug: 'education-result',
    excerpt: 'জাতীয় বিশ্ববিদ্যালয় ডিগ্রি ১ম বর্ষ পরীক্ষার অন-লাইন ফরম পূরণের তারিখ, ফি জমা দেওয়ার ইনকোর্স ফি ও সোনালী সেবার চালান নির্দেশিকা।',
    metaTitle: 'ডিগ্রি ১ম বর্ষ ফরম পূরণ নোটিশ ২০২৬ | NU Degree 1st Year Form Fillup',
    metaDescription: 'জাতীয় বিশ্ববিদ্যালয় ডিগ্রি ১ম বর্ষ অন-লাইন ফরম পূরণের সময়সূচি, ফি প্রদানের ইনকোর্স চালানের নিয়ম ও অফিশিয়াল লিংক emsb.nu.ac.bd।',
    date: 'আগস্ট ২১, ২০২৬',
    readTime: '৫ মিনিট পড়া',
    author: 'NU Notice Board',
    tags: ['Degree Form Fillup', 'জাতীয় বিশ্ববিদ্যালয়', 'ডিগ্রি ফরম পূরণ', 'NU Form Fillup'],
    content: `
      <h2>জাতীয় বিশ্ববিদ্যালয় ডিগ্রি ১ম বর্ষ পরীক্ষার অন-লাইন ফরম পূরণ ২০২৬</h2>
      <p>জাতীয় বিশ্ববিদ্যালয় (National University) ডিগ্রি ১ম বর্ষ (নিয়মিত, অনিয়মিত ও গ্রেড উন্নয়ন) পরীক্ষার অফিশিয়াল অন-লাইন ফরম পূরণ সংক্রান্ত নোটিশ প্রকাশিত হয়েছে।</p>

      <h3>ফরম পূরণের অনলাইন ধাপসমূহ:</h3>
      <ol>
        <li>অনলাইন ফরম পূরণ পোর্টাল <a href="http://emsb.nu.ac.bd" target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-bold underline">emsb.nu.ac.bd</a> অথবা <a href="http://www.nubd.info" target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-bold underline">nubd.info</a> এ যান।</li>
        <li><strong>Student Login / Form Fillup</strong> অপশন নির্বাচন করে আপনার রেজিস্ট্রেশন নম্বর লিখুন।</li>
        <li>সাবজেক্ট কোড নির্বাচন করে ফরম ডাউনলোড ও প্রিন্ট করুন।</li>
        <li>প্রিন্টকৃত ফরম ও নির্ধারিত ফি (সোনালী সেবা বা কলেজের ব্যাংক একাউন্টে) বিজ্ঞপ্তির শেষ তারিখের মধ্যে জমা দিন।</li>
      </ol>
    `,
  },
  {
    id: 'b-post-23',
    title: 'অনার্স ১ম বর্ষ বাংলাদেশের ইতিহাস (১৯৪৭-১৯৭১) সংক্ষিপ্ত সাজেশন ও উত্তর PDF',
    slug: 'honours-1st-year-history-of-bangladesh-short-suggestion',
    category: 'শিক্ষা ও ফলপ্রকাশ',
    categorySlug: 'education-result',
    excerpt: 'জাতীয় বিশ্ববিদ্যালয় অনার্স ১ম বর্ষ ইতিহাস বিষয় কোড ২১২১০১ (ইতিহাস ও সমাজ) পরীক্ষা ২০২৬ সংক্ষিপ্ত প্রশ্ন উত্তর সহ সমাধান।',
    metaTitle: 'অনার্স ১ম বর্ষ বাংলাদেশের ইতিহাস সাজেশন ২০২৬ PDF | History of Bangladesh',
    metaDescription: 'অনার্স ১ম বর্ষ বাংলাদেশের ইতিহাস ১৯৪৭-১৯৭১ বিষয় কোড ২১২১০১ সংক্ষিপ্ত প্রশ্ন উত্তর সহ ১০০% কমন সাজেশন ২০২৬ PDF।',
    date: 'আগস্ট ২১, ২০২৬',
    readTime: '৫ মিনিট পড়া',
    author: 'NU History Team',
    tags: ['History of Bangladesh', 'অনার্স ইতিহাস', '২১২১০১', 'NU History'],
    content: `
      <h2>অনার্স ১ম বর্ষ বাংলাদেশের ইতিহাস (১৯৪৭-১৯৭১) চূড়ান্ত সাজেশন ২০২৬</h2>
      <p>জাতীয় বিশ্ববিদ্যালয় অনার্স ১ম বর্ষ ইতিহাস বিভাগের অন্যতম মূল বিষয় ‘বাংলাদেশের ইতিহাস (১৯৪৭-১৯৭১)’-এর অফিশিয়াল সাজেশন ও উত্তরমালা নিচে দেওয়া হলো।</p>

      <h3>ক-বিভাগ (সংক্ষিপ্ত সংজ্ঞার্থ প্রশ্ন):</h3>
      <ul>
        <li>১. দ্বি-জাতি তত্ত্বের প্রবক্তা কে ছিলেন? (উত্তর: মোহাম্মদ আলী জিন্নাহ, ১৯৩৯)।</li>
        <li>২. কত সালে পূর্ব পাকিস্তান আওয়ামী মুসলিম লীগ গঠিত হয়? (উত্তর: ২৩ জুন ১৯৪৯)।</li>
        <li>৩. যুক্তফ্রন্ট কবে গঠিত হয় এবং এর ২১ দফার প্রথম দফা কী ছিল? (উত্তর: ৪ ডিসেম্বর ১৯৫৩, প্রথম দফা: বাংলাকে অন্যতম রাষ্ট্রভাষা করা)।</li>
      </ul>
    `,
  },
  {
    id: 'b-post-24',
    title: 'অনার্স ১ম বর্ষ আইসিটি গাইড বই ও বিগত বছরের প্রশ্ন সমাধান PDF (NU ICT Guide Book)',
    slug: 'honours-1st-year-ict-guide-book-pdf',
    category: 'শিক্ষা ও ফলপ্রকাশ',
    categorySlug: 'education-result',
    excerpt: 'জাতীয় বিশ্ববিদ্যালয় অনার্স ১ম বর্ষ কম্পিউটার সাইন্স ও তথ্য প্রযুক্তি পূর্ণাঙ্গ গাইড বই ও হ্যান্ডনোট PDF ফাইল।',
    metaTitle: 'অনার্স ১ম বর্ষ আইসিটি গাইড বই PDF | NU Honours ICT Guide Book',
    metaDescription: 'অনার্স ১ম বর্ষ কম্পিউটার ও তথ্য প্রযুক্তি (ICT) গাইড বই ও হ্যান্ডনোট PDF ডাউনলোডের তথ্য নির্দেশিকা।',
    date: 'আগস্ট ২১, ২০২৬',
    readTime: '৪ মিনিট পড়া',
    author: 'Edu Library Team',
    tags: ['ICT Guide', 'Honours ICT', 'আইসিটি গাইড', 'NU Handnotes'],
    content: `
      <h2>অনার্স ১ম বর্ষ কম্পিউটার ও তথ্য প্রযুক্তি (ICT) পূর্ণাঙ্গ গাইড বই PDF</h2>
      <p>অনার্স ১ম বর্ষের তথ্য ও যোগাযোগ প্রযুক্তি (Computer & Information Technology) বিষয়ের সমাধান ও গাইড নোটের অফিশিয়াল সূচিপত্র ও ব্যবহার নির্দেশিকা।</p>

      <h3>গাইডের বিষয়বস্তু:</h3>
      <ul>
        <li>১. বিগত ১০ বছরের বোর্ড প্রশ্ন ও উত্তর সমাধান।</li>
        <li>২. ক-বিভাগ, খ-বিভাগ ও গ-বিভাগের মোস্ট ইম্পর্ট্যান্ট সাজেসন্স।</li>
        <li>৩. প্র্যাকটিক্যাল ল্যাব ও কম্পিউটার প্রোগ্রামিং প্রারম্ভিক নোট।</li>
      </ul>
    `,
  },
];

export function getBlogPostBySlug(slug: string): BlogPostItem | undefined {
  return BLOG_POSTS_DATA.find((p) => p.slug === slug);
}

export function getRelatedBlogPosts(currentSlug: string, limit = 3): BlogPostItem[] {
  return BLOG_POSTS_DATA.filter((p) => p.slug !== currentSlug).slice(0, limit);
}
