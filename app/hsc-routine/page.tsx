import { Metadata } from 'next';
import HscRoutinePage from '../hsc-exam-routine/page';

export const metadata: Metadata = {
    title: "HSC Exam Routine 2026 PDF Download - All Board | bd-books-pdf",
    description: "Download HSC Exam Routine 2026 for all education boards in Bangladesh (Dhaka, Chittagong, Rajshahi, Barisal, Sylhet, Comilla, Dinajpur, Mymensingh) in PDF format.",
    keywords: "HSC Routine 2026, HSC Exam Schedule, Bangladesh Education Board, Dhaka Board HSC Routine, Chittagong Board HSC Routine, H2345SC Practical Exam Date, Alim Routine 2026",
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/hsc-routine`,
    },
    openGraph: {
        title: "HSC Exam Routine 2026 PDF Download - All Board",
        description: "Download HSC Exam Routine 2026 for all boards in Bangladesh (PDF format).",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/hsc-routine`,
        siteName: "bd-books-pdf",
        images: [
            {
                url: `${process.env.NEXT_PUBLIC_BASE_URL}/images/hsc-routine-preview.png`,
                width: 1200,
                height: 630,
                alt: "HSC Exam Routine 2026 PDF Download",
            },
        ],
        locale: "bn_BD",
        type: "article",
    },
    twitter: {
        card: "summary_large_image",
        title: "HSC Exam Routine 2026 PDF Download - All Board",
        description: "Download HSC Exam Routine 2026 for all boards in Bangladesh.",
        images: [`${process.env.NEXT_PUBLIC_BASE_URL}/images/hsc-routine-preview.png`],
    },
};

export default function HscRoutineWrapper() {
    return <HscRoutinePage />;
}
