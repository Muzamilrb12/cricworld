import { NextResponse } from 'next/server';
import { fetchLiveMatches } from '@/lib/cricket-api';
import { discoverLiveMatches } from '@/lib/collectors/matchDiscovery';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

let cachedData: any = null;
let lastFetchTime = 0;

export async function GET() {
  const now = Date.now();
  
  // If we have cached data less than 60s old, return it immediately
  if (cachedData && (now - lastFetchTime < 60000)) {
    return NextResponse.json({
      ...cachedData,
      cache_status: 'hit',
      expires_in: Math.max(0, 60 - Math.floor((now - lastFetchTime) / 1000)) + 's'
    });
  }

  const result = await fetchLiveMatches();
  
  // Rule: If official API fails OR returns no live matches, trigger discovery fallback
  if (result.status !== 'ok' || !result.data || result.data.length === 0) {
    console.log('[API] Primary API unavailable or empty, triggering discovery fallback...');
    const discovered = await discoverLiveMatches();
    if (discovered && discovered.length > 0) {
      cachedData = {
        status: 'ok',
        data: discovered,
        source: { name: 'Multi-Source (Google/ESPN/CB)', url: 'https://www.google.com/search?q=cricket+live+score' },
        fetched_at: new Date().toISOString()
      };
      lastFetchTime = Date.now();
      return NextResponse.json({ ...cachedData, cache_status: 'miss' });
    }

    // FINAL FALLBACK: Local Scraped Data
    console.log('[API] Discovery failed, falling back to local matches.json...');
    try {
      const matchesPath = path.join(process.cwd(), 'data', 'matches.json');
      const fileContent = await fs.readFile(matchesPath, 'utf8');
      const localMatches = JSON.parse(fileContent);
      if (localMatches && localMatches.length > 0) {
        cachedData = {
          status: 'ok',
          data: localMatches,
          source: { name: 'Local Scraper (ESPN)', url: 'https://www.espncricinfo.com/live-cricket-score' },
          fetched_at: new Date().toISOString()
        };
        lastFetchTime = Date.now();
        return NextResponse.json({ ...cachedData, cache_status: 'miss' });
      }
    } catch (e) {
      console.error('[API] Local fallback failed:', e);
    }
  }
  
  cachedData = result;
  lastFetchTime = Date.now();
  return NextResponse.json({ ...result, cache_status: 'miss' });
}



