import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Analytics } from '@vercel/analytics/react';
import AnalyticsTracker from '@/components/AnalyticsTracker';
import { getBaseUrl } from '@/lib/site';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: 'বাংলাদেশের সকল শ্রেণির বই ও গাইড PDF | BD Edu PDF',
    template: '%s | BD Edu PDF',
  },
  description: 'শ্রেণি ও বিষয় অনুযায়ী পাঠ্যবই, গাইড বই এবং প্রয়োজনীয় শিক্ষামূলক PDF বিনামূল্যে পড়ুন ও ডাউনলোড করুন। NCTB Class 1 to HSC Books & Solutions.',
  keywords: [
    'Class 8 Math Guide PDF',
    'Class 8 Science Guide PDF',
    'NCTB Textbook PDF',
    'BD School Books PDF 2026',
    'বাংলাদেশের বোর্ড বই PDF',
    'গাইড বই PDF',
  ],
  authors: [{ name: 'BD Edu PDF Team' }],
  creator: 'BD Edu PDF',
  publisher: 'BD Edu PDF',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'bn_BD',
    url: getBaseUrl(),
    siteName: 'শিক্ষা বইমেলা - BD Edu PDF',
    title: 'বাংলাদেশের সকল শ্রেণির বই ও গাইড PDF',
    description: 'শ্রেণি ও বিষয় অনুযায়ী পাঠ্যবই, গাইড বই এবং প্রয়োজনীয় শিক্ষামূলক PDF খুঁজে নিন।',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'বাংলাদেশের সকল শ্রেণির বই ও গাইড PDF',
    description: 'শ্রেণি ও বিষয় অনুযায়ী পাঠ্যবই, গাইড বই এবং প্রয়োজনীয় শিক্ষামূলক PDF খুঁজে নিন।',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className="scroll-smooth" style={{ colorScheme: 'light' }} suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-50 text-gray-900 min-h-screen flex flex-col antialiased`} suppressHydrationWarning>
        {/* Google Analytics 4 (GA4) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-84HSH4S0WP"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-84HSH4S0WP');
          `}
        </Script>

        <AnalyticsTracker />
        <Header />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
