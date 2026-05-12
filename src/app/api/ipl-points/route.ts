import { NextResponse } from 'next/server';
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
    // The exact shape may vary; we attempt to normalise to a simple array.
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
      source: { name: 'ESPN Cricinfo', url: espnUrl },
      fetched_at: now,
    }, { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30' } });
  } catch (err: any) {
    console.error('[IPL Points] fetch error:', err.message);
    return NextResponse.json({
      status: 'data unavailable',
      data: null,
      retry_after: '30 seconds',
      source: { name: 'ESPN Cricinfo', url: espnUrl },
      fetched_at: now,
      error: err.message,
    }, { headers: { 'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=15' } });
  }
}
