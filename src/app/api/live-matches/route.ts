import { NextResponse } from 'next/server';
import { fetchLiveMatches } from '@/lib/cricket-api';
import { discoverLiveMatches } from '@/lib/collectors/matchDiscovery';

export async function GET() {
  const result = await fetchLiveMatches();
  
  // Rule: If official API returns no live matches, trigger discovery scraper
  if (result.status === 'ok' && (!result.data || result.data.length === 0)) {
    console.log('[API] Primary API empty, triggering discovery fallback...');
    const discovered = await discoverLiveMatches();
    if (discovered.length > 0) {
      result.data = discovered as any;
    }
  }
  
  return NextResponse.json(result, {
    headers: {
      'Cache-Control': 'no-store, max-age=0', // Disable cache for live debugging
    },
  });
}
