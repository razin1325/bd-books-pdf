'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Generate or retrieve persistent anonymous Visitor ID in localStorage
    let visitorId = localStorage.getItem('bd_visitor_id');
    if (!visitorId) {
      visitorId = `u_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      localStorage.setItem('bd_visitor_id', visitorId);
    }

    // Function to record pageview & ping active status
    const trackView = () => {
      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: pathname,
          visitorId,
        }),
      }).catch(() => {});
    };

    trackView();

    // Heartbeat every 2 minutes to keep live active status
    const interval = setInterval(trackView, 120000);
    return () => clearInterval(interval);
  }, [pathname]);

  return null;
}
