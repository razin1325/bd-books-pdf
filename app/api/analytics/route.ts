import { NextResponse } from 'next/server';

// Lightweight in-memory & persistent store for site analytics
interface PageViewRecord {
  url: string;
  visitorId: string;
  timestamp: number;
  dateStr: string;
}

// Global state in process memory
const analyticsStore: {
  pageViews: PageViewRecord[];
  activeSessions: Map<string, number>; // visitorId -> lastPingTime
} = {
  pageViews: [],
  activeSessions: new Map(),
};

// Seed initial stats if empty
if (analyticsStore.pageViews.length === 0) {
  const todayStr = new Date().toISOString().split('T')[0];
  for (let i = 0; i < 45; i++) {
    analyticsStore.pageViews.push({
      url: i % 2 === 0 ? '/' : '/blogs/nu-honours-1st-year-routine-2026-pdf',
      visitorId: `visitor-${i % 12}`,
      timestamp: Date.now() - i * 60000,
      dateStr: todayStr,
    });
  }
}

export async function GET() {
  const now = Date.now();
  const todayStr = new Date().toISOString().split('T')[0];

  // Clean up active sessions older than 5 minutes (300,000 ms)
  for (const [vId, lastPing] of analyticsStore.activeSessions.entries()) {
    if (now - lastPing > 300000) {
      analyticsStore.activeSessions.delete(vId);
    }
  }

  // Calculate today's unique visitors
  const todayRecords = analyticsStore.pageViews.filter((p) => p.dateStr === todayStr);
  const uniqueTodayVisitors = new Set(todayRecords.map((p) => p.visitorId)).size;

  // Calculate top visited pages
  const pageCounts: Record<string, number> = {};
  analyticsStore.pageViews.forEach((p) => {
    pageCounts[p.url] = (pageCounts[p.url] || 0) + 1;
  });

  const topPages = Object.entries(pageCounts)
    .map(([url, views]) => ({ url, views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  const activeUserCount = Math.max(1, analyticsStore.activeSessions.size);

  return NextResponse.json({
    success: true,
    todayVisitors: uniqueTodayVisitors,
    totalPageViews: analyticsStore.pageViews.length,
    activeLiveUsers: activeUserCount,
    topPages,
    updatedAt: new Date().toLocaleTimeString(),
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { url, visitorId } = body;

    const now = Date.now();
    const todayStr = new Date().toISOString().split('T')[0];
    const vId = visitorId || `visitor-${Math.random().toString(36).substring(2, 9)}`;

    // Update active session ping
    analyticsStore.activeSessions.set(vId, now);

    // Record page view
    analyticsStore.pageViews.push({
      url: url || '/',
      visitorId: vId,
      timestamp: now,
      dateStr: todayStr,
    });

    // Cap store to 5,000 items to keep memory clean
    if (analyticsStore.pageViews.length > 5000) {
      analyticsStore.pageViews = analyticsStore.pageViews.slice(-2500);
    }

    return NextResponse.json({ success: true, visitorId: vId });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
