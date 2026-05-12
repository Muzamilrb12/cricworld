import { NextResponse } from 'next/server';
import { fetchLiveMatches } from '@/lib/cricket-api';
import { discoverLiveMatches } from '@/lib/collectors/matchDiscovery';

export async function GET() {
  const result = await fetchLiveMatches();
  
  // Rule: If official API fails OR returns no live matches, trigger discovery fallback
  if (result.status !== 'ok' || !result.data || result.data.length === 0) {
    console.log('[API] Primary API unavailable or empty, triggering discovery fallback...');
    const discovered = await discoverLiveMatches();
    if (discovered && discovered.length > 0) {
      // If we find discovered matches, we can return 'ok' status
      return NextResponse.json({
        status: 'ok',
        data: discovered,
        source: { name: 'ESPN (Scraped Fallback)', url: 'https://www.espncricinfo.com/live-cricket-score' },
        fetched_at: new Date().toISOString()
      }, { headers: { 'Cache-Control': 'no-store' } });
    }
  }
  
  return NextResponse.json(result, {
    headers: {
      'Cache-Control': 'no-store, max-age=0', // Disable cache for live debugging
    },
  });
}
