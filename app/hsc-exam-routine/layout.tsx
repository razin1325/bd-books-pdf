import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'এইচএসসি পরীক্ষা ২০২৭ পূর্ণাঙ্গ বিষয়ভিত্তিক রুটিন - HSC 2027 Exam Routine PDF Download',
  description:
    '২০২৭ সালের এইচএসসি (HSC) পরীক্ষার সময়সূচি ও রুটিন প্রকাশ করেছে বাংলাদেশ মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষা বোর্ড। সম্পূর্ণ মূল অফিশিয়াল PDF রুটিন ড্রাইভে ডাউনলোড করুন ও অনলাইনে বিষয়ভিত্তিক সময়সূচি দেখুন।',
  openGraph: {
    title: 'এইচএসসি পরীক্ষা ২০২৭ পূর্ণাঙ্গ বিষয়ভিত্তিক রুটিন - HSC 2027 Exam Routine PDF Download',
    description:
      'বাংলাদেশ মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষা বোর্ড কর্তৃক প্রকাশিত এইচএসসি পরীক্ষার অফিশিয়াল রুটিন PDF ডাউনলোড করুন।',
  },
};

export default function HscRoutineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
