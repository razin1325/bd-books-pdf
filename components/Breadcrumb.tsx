import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  // Generate JSON-LD BreadcrumbList Schema
  const schemaItems = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: process.env.NEXT_PUBLIC_SITE_URL || 'https://bd-edu-books.vercel.app',
    },
    ...items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 2,
      name: item.label,
      item: item.href
        ? `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bd-edu-books.vercel.app'}${item.href}`
        : undefined,
    })),
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: schemaItems,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="py-2 px-1 text-xs text-gray-500 overflow-x-auto whitespace-nowrap">
        <ol className="flex items-center space-x-1.5">
          <li>
            <Link
              href="/"
              className="hover:text-emerald-600 flex items-center space-x-1 transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
          </li>

          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={index} className="flex items-center space-x-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="hover:text-emerald-600 font-medium transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="font-semibold text-gray-800 line-clamp-1">
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
