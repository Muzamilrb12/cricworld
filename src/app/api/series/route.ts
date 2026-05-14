import { NextResponse } from 'next/server';
import { scrapeUpcomingSeries } from '@/lib/collectors/seriesScraper';

export const dynamic = 'force-dynamic';

export async function GET() {
  const series = await scrapeUpcomingSeries();
  
  return NextResponse.json({
    status: 'ok',
    data: series,
    fetched_at: new Date().toISOString()
  }, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=600'
    }
  });
}
