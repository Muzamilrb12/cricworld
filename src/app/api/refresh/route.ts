import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * GET /api/refresh
 *
 * A lightweight endpoint that the client can ping every 60 seconds to
 * revalidate live data (live matches + news). Returns a manifest of
 * what was refreshed and when, so the frontend knows data is fresh.
 *
 * Usage: fetch('/api/refresh') from any client component's setInterval.
 */
export async function GET(request: Request) {
  const now = new Date().toISOString();
  const base = new URL(request.url).origin;

  // Fire both fetches in parallel — we don't await the scraping results here,
  // we just hit the routes so Next.js revalidates any cached responses.
  const [newsRes, matchRes] = await Promise.allSettled([
    fetch(`${base}/api/google-news`, { cache: 'no-store' }),
    fetch(`${base}/api/live-matches`, { cache: 'no-store' }),
  ]);

  const newsOk = newsRes.status === 'fulfilled' && newsRes.value.ok;
  const matchOk = matchRes.status === 'fulfilled' && matchRes.value.ok;

  return NextResponse.json({
    refreshed_at: now,
    sources: {
      google_news: newsOk ? 'ok' : 'error',
      live_matches: matchOk ? 'ok' : 'error',
    },
    next_refresh_in: '60s',
  });
}
