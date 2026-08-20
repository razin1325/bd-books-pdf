'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { BookOpen, Sparkles, Award } from 'lucide-react';

export interface BookCoverProps {
  title: string;
  coverImage?: string | null;
  subject?: string;
  className?: string;
  bookType?: string;
  year?: number | string;
  priority?: boolean;
  showBadges?: boolean;
}

function getCoverTheme(title: string, subject?: string, bookType?: string) {
  const str = `${title}-${subject || ''}-${bookType || ''}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % 7;

  const themes = [
    {
      id: 'emerald',
      gradient: 'from-emerald-950 via-teal-900 to-emerald-900',
      accent: 'text-amber-300',
      headerText: 'BANGLADESH EDU PDF',
      sealText: '১০০% ডিজিটাল PDF',
      patternColor: '#ffffff',
    },
    {
      id: 'indigo',
      gradient: 'from-indigo-950 via-blue-900 to-slate-950',
      accent: 'text-cyan-300',
      headerText: 'পাঠ্যবই & গাইড সহায়িকা',
      sealText: 'সম্পূর্ণ সমাধান সহ',
      patternColor: '#60a5fa',
    },
    {
      id: 'crimson',
      gradient: 'from-rose-950 via-red-900 to-slate-950',
      accent: 'text-amber-300',
      headerText: 'ভর্তি & প্রশ্নব্যাংক সংকলন',
      sealText: 'বিগত বছরের প্রশ্ন',
      patternColor: '#f43f5e',
    },
    {
      id: 'violet',
      gradient: 'from-purple-950 via-violet-900 to-indigo-950',
      accent: 'text-pink-300',
      headerText: 'ডিজিটাল ই-বুক লাইব্রেরি',
      sealText: 'বিশেষ ডিজিটাল কপি',
      patternColor: '#c084fc',
    },
    {
      id: 'amber',
      gradient: 'from-amber-950 via-yellow-950 to-slate-950',
      accent: 'text-yellow-300',
      headerText: 'বাংলাদেশ শিক্ষা প্রকাশনী',
      sealText: 'প্রিমিয়াম ই-বুক',
      patternColor: '#fbbf24',
    },
    {
      id: 'cyan',
      gradient: 'from-cyan-950 via-teal-950 to-slate-950',
      accent: 'text-teal-300',
      headerText: 'বিজ্ঞান & তথ্য সহায়িকা',
      sealText: 'সর্বশেষ নতুন সংস্করণ',
      patternColor: '#2dd4bf',
    },
    {
      id: 'slate',
      gradient: 'from-slate-950 via-zinc-900 to-emerald-950',
      accent: 'text-emerald-300',
      headerText: 'জাতীয় শিক্ষাক্রম বোর্ড',
      sealText: 'অফিশিয়াল ফ্রি PDF',
      patternColor: '#34d399',
    },
  ];

  return themes[index];
}

export default function BookCover({
  title,
  coverImage,
  subject,
  className = '',
  bookType,
  year,
  priority = false,
  showBadges = true,
}: BookCoverProps) {
  const [imageError, setImageError] = useState(false);

  const hasValidImage = Boolean(coverImage && coverImage.trim() !== '' && !imageError);
  const theme = getCoverTheme(title, subject, bookType);

  const isTextbook = bookType === 'textbook';
  const isGuide = bookType === 'guide';

  return (
    <div className={`relative w-full h-full overflow-hidden select-none ${className}`}>
      {hasValidImage ? (
        <>
          <Image
            src={coverImage!}
            alt={title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            priority={priority}
            unoptimized
            onError={() => setImageError(true)}
          />
          {showBadges && (bookType || year) && (
            <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 flex flex-wrap gap-1 z-20 pointer-events-none">
              {bookType && (
                <span
                  className={`text-[9px] sm:text-[10px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider text-white shadow-xs backdrop-blur-md border ${
                    isTextbook
                      ? 'bg-blue-600/90 border-blue-400/30'
                      : isGuide
                      ? 'bg-emerald-600/90 border-emerald-400/30'
                      : 'bg-purple-600/90 border-purple-400/30'
                  }`}
                >
                  {bookType}
                </span>
              )}
              {year && (
                <span className="text-[9px] sm:text-[10px] font-bold bg-black/75 backdrop-blur-md border border-white/20 text-white px-1.5 py-0.5 rounded">
                  {year}
                </span>
              )}
            </div>
          )}
        </>
      ) : (
        /* Realistic Styled Fallback Book Cover */
        <div
          className={`relative w-full h-full bg-gradient-to-br ${theme.gradient} text-white flex flex-col justify-between p-2.5 sm:p-3.5 shadow-inner border border-white/10`}
        >
          {/* 3D Book Spine Effect (Left Side Shadow & Crease Line) */}
          <div className="absolute left-0 top-0 bottom-0 w-3 sm:w-4 bg-gradient-to-r from-black/60 via-black/25 to-transparent z-20 pointer-events-none" />
          <div className="absolute left-3 sm:left-4 top-0 bottom-0 w-px bg-white/20 z-20 pointer-events-none" />

          {/* Top Glossy Light Sheen */}
          <div className="absolute top-0 right-0 left-0 h-1/2 bg-gradient-to-b from-white/15 via-white/5 to-transparent pointer-events-none z-10" />

          {/* Background SVG Dot Matrix Pattern */}
          <svg
            className="absolute inset-0 w-full h-full opacity-15 pointer-events-none z-0"
            width="100%"
            height="100%"
          >
            <pattern
              id={`cover-pattern-${theme.id}`}
              x="0"
              y="0"
              width="16"
              height="16"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1.2" fill={theme.patternColor} />
            </pattern>
            <rect width="100%" height="100%" fill={`url(#cover-pattern-${theme.id})`} />
          </svg>

          {/* Large Center Watermark Icon */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10 z-0">
            <BookOpen className="w-24 h-24 sm:w-32 sm:h-32 text-white" />
          </div>

          {/* Inner Golden/White Frame Container */}
          <div className="relative z-10 h-full border border-white/25 rounded-sm p-2 sm:p-2.5 flex flex-col justify-between backdrop-blur-[1px] bg-black/15">
            {/* TOP HEADER */}
            <div className="space-y-1 text-center">
              <div className="flex items-center justify-center space-x-1">
                <Sparkles className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${theme.accent}`} />
                <span className="text-[8px] sm:text-[9.5px] font-extrabold uppercase tracking-wider text-white/90 truncate max-w-[90%]">
                  {theme.headerText}
                </span>
                <Sparkles className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${theme.accent}`} />
              </div>
              <div className="w-10 sm:w-16 h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto" />
            </div>

            {/* CENTER TITLE BLOCK */}
            <div className="my-auto text-center space-y-1 py-1">
              {bookType && (
                <span className="inline-block text-[7.5px] sm:text-[8.5px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded bg-white/20 text-white backdrop-blur-xs shadow-2xs border border-white/20">
                  {isTextbook ? 'মূল পাঠ্যবই' : isGuide ? 'গাইড বই' : 'প্রশ্নব্যাংক & সমাধান'}
                </span>
              )}

              <h4 className="font-black text-white text-xs sm:text-sm md:text-base leading-snug drop-shadow-md line-clamp-3 font-serif px-0.5">
                {title}
              </h4>

              {subject && (
                <p className={`text-[9.5px] sm:text-xs font-extrabold ${theme.accent} drop-shadow-xs truncate`}>
                  {subject}
                </p>
              )}
            </div>

            {/* BOTTOM FOOTER / SEAL & YEAR */}
            <div className="pt-1 border-t border-white/20 flex items-center justify-between text-[8px] sm:text-[9px] font-bold text-white/90">
              <span className="bg-black/50 backdrop-blur-xs px-1.5 py-0.5 rounded border border-white/10 text-white">
                {year ? `${year}` : '২০২৬'}
              </span>

              <div className="flex items-center space-x-0.5 text-amber-300">
                <Award className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
                <span className="text-[7.5px] sm:text-[8.5px] font-black tracking-tight">
                  {theme.sealText}
                </span>
              </div>
            </div>
          </div>

          {/* Badges Overlay on Top-Left if requested */}
          {showBadges && (bookType || year) && (
            <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 flex flex-wrap gap-1 z-30 pointer-events-none">
              {bookType && (
                <span
                  className={`text-3xs sm:text-2xs font-extrabold px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded uppercase tracking-wider text-white shadow-xs ${
                    isTextbook
                      ? 'bg-blue-600'
                      : isGuide
                      ? 'bg-emerald-600'
                      : 'bg-purple-600'
                  }`}
                >
                  {bookType}
                </span>
              )}
              {year && (
                <span className="text-3xs sm:text-2xs font-bold bg-black/70 backdrop-blur-xs text-white px-1.5 py-0.5 rounded">
                  {year}
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
