'use client';

import React from 'react';

interface AdSlotProps {
  slotId?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal';
  className?: string;
  showPlaceholder?: boolean;
}

export default function AdSlot({
  slotId = 'default-ad-slot',
  format = 'auto',
  className = '',
  showPlaceholder = false,
}: AdSlotProps) {
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-5879637503098000';
  const isDevPlaceholder = process.env.NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS === 'true' || showPlaceholder;

  // If real AdSense client ID exists, render actual Google AdSense slot
  if (adClient) {
    return (
      <div className={`my-6 w-full flex justify-center items-center overflow-hidden ${className}`}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%' }}
          data-ad-client={adClient}
          data-ad-slot={slotId}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  // If placeholders are explicitly enabled for dev preview
  if (isDevPlaceholder) {
    return (
      <div
        className={`my-6 w-full flex justify-center items-center overflow-hidden ${className}`}
        data-ad-slot-id={slotId}
      >
        <div className="w-full max-w-4xl bg-gray-50 border border-dashed border-gray-300 rounded-lg p-3 text-center">
          <div className="text-2xs uppercase tracking-wider text-gray-400 font-semibold">
            Advertisement ({format})
          </div>
        </div>
      </div>
    );
  }

  // Otherwise, return null (Hidden completely for clean professional site)
  return null;
}
