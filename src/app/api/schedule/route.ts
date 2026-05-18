// src/app/api/schedule/route.ts

import { NextResponse } from 'next/server';
import { fetchSchedule } from '@/lib/cricket-api';

export const dynamic = 'force-dynamic';

let cached: any = null;
let lastFetch = 0;

export async function GET() {
  const now = Date.now();
  // cache for 10 minutes
  if (cached && now - lastFetch < 10 * 60 * 1000) {
    return NextResponse.json({
      ...cached,
      cache_status: 'hit',
      expires_in: `${Math.max(0, 600 - Math.floor((now - lastFetch) / 1000))}s`
    });
  }

  const result = await fetchSchedule();
  cached = result;
  lastFetch = Date.now();
  return NextResponse.json({ ...result, cache_status: 'miss' });
}
