import { NextResponse } from 'next/server';
import { fetchLiveMatches } from '@/lib/cricket-api';

/**
 * GET /api/live-matches
 * Returns live/current cricket matches from verified sources.
 * Rule 1: Never returns fake data — returns {status: "data unavailable"} on failure.
 * Rule 2: Every response includes source attribution.
 */
export async function GET() {
  const result = await fetchLiveMatches();
  
  return NextResponse.json(result, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
    },
  });
}
