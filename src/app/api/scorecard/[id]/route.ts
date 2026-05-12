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
import { scrapeDetailedScorecard } from '@/lib/collectors/scorecardScraper';

export async function GET(req: Request, { params }: RouteParams) {
  const { id } = await params;
  const { searchParams } = new URL(req.url);
  const espnUrl = searchParams.get('url');

  // If it's an ESPN scraped match and we have the URL, scrape the scorecard
  if (id.startsWith('espn-') && espnUrl) {
    const scrapedData = await scrapeDetailedScorecard(espnUrl);
    if (scrapedData) {
      return NextResponse.json({
        status: 'ok',
        data: scrapedData,
        source: { name: 'ESPN (Scraped)', url: espnUrl },
        fetched_at: new Date().toISOString()
      });
    }
  }

  const result = await fetchMatchScorecard(id);

  return NextResponse.json(result, {
    headers: {
      'Cache-Control': 'no-store', // Disable cache for live debugging
    },
  });
}
