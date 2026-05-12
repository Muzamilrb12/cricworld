import { NextResponse } from 'next/server';
import { fetchMatchScorecard } from '@/lib/cricket-api';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/scorecard/[id]
 * Returns the full scorecard for a specific match from verified sources.
 * Rule 1: Never returns fake data.
 * Rule 2: Source attribution included.
 */
export async function GET(_req: Request, { params }: RouteParams) {
  const { id } = await params;
  const result = await fetchMatchScorecard(id);

  return NextResponse.json(result, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
    },
  });
}
