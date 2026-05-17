import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

/**
 * API route: GET /api/ipl-points
 * Retrieves the current IPL points table from ESPN Cricinfo.
 * If the external request fails, returns the standard "data unavailable" payload
 * with a 30‑second retry suggestion (Rule 1).
 */
export async function GET() {
  const now = new Date().toISOString();
  // ESPN Cricinfo provides a JSON endpoint for IPL tables – this is a stable public URL.
  const espnUrl = 'https://site.web.api.espncricinfo.com/v2/leagues/table?league=ipl&season=2026';

  try {
    const res = await fetch(espnUrl);
    if (!res.ok) throw new Error(`ESPN responded ${res.status}`);
    const json = await res.json();
    const points = (json?.standings?.entries || []).map((e: any) => ({
      team_id: e.team?.id,
      team_name: e.team?.displayName,
      team_image_url: e.team?.logo,
      played: e.stats?.matchesPlayed,
      points: e.stats?.points,
      nrr: e.stats?.netRunRate,
    }));

    return NextResponse.json({
      status: 'ok',
      data: points,
      source: { name: 'ESPN API', url: espnUrl },
      fetched_at: now,
    }, { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30' } });
  } catch (err: any) {
    console.warn('[IPL Points] API error, falling back to local data:', err.message);
    
    // Fallback to local scraped data
    try {
      const ptPath = path.join(process.cwd(), 'data', 'points-table.json');
      const fileContent = await fs.readFile(ptPath, 'utf8');
      const localData = JSON.parse(fileContent);
      const iplPoints = localData.leagues['ipl-2026'] || [];
      
      return NextResponse.json({
        status: 'ok',
        data: iplPoints.map((p: any) => ({
            team_id: p.team,
            team_name: p.fullName,
            team_image_url: '', // Scraper doesn't get logos yet
            played: p.p,
            points: p.pts,
            nrr: p.nrr,
        })),
        source: { name: 'Local Scraper (ESPN Fallback)', url: 'https://www.espncricinfo.com/series/ipl-2026-1510719/points-table-standings' },
        fetched_at: now,
      });
    } catch (localErr: any) {
      return NextResponse.json({
        status: 'data unavailable',
        data: null,
        retry_after: '30 seconds',
        fetched_at: now,
        error: localErr.message,
      }, { headers: { 'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=15' } });
    }
  }
}


