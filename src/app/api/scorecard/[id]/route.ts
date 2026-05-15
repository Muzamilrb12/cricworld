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
import fs from 'fs';
import path from 'path';

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

  // If it's a locally scraped live match from ESPN
  if (id.startsWith('live-') || id.startsWith('espn-')) {
    try {
      const dataDir = path.join(process.cwd(), 'data');
      const matchesPath = path.join(dataDir, 'matches.json');
      if (fs.existsSync(matchesPath)) {
        const matches = JSON.parse(fs.readFileSync(matchesPath, 'utf8'));
        const localMatch = matches.find((m: any) => m.id === id);
        
        if (localMatch) {
          // Format local match into Scorecard API format
          const formattedScorecard = {
            id: localMatch.id,
            name: `${localMatch.teams[0]?.name || 'Team A'} vs ${localMatch.teams[1]?.name || 'Team B'}`,
            status: localMatch.summary || localMatch.status,
            venue: localMatch.venue || 'TBD',
            matchType: localMatch.format || 'LIVE MATCH',
            teamInfo: localMatch.teams.map((t: any) => ({ name: t.name, shortname: t.shortName })),
            score: localMatch.teams.map((t: any) => {
              // Parse "170/4" or "205"
              const scoreStr = t.score?.replace(/.*\) /, '') || '0/0';
              const parts = scoreStr.split('/');
              return {
                inning: t.shortName,
                r: parseInt(parts[0]) || 0,
                w: parseInt(parts[1]) || 0,
                o: parseFloat(t.overs || '0')
              };
            }),
            scorecard: [], // We don't have deep batting tables from the summary scraper
            source: 'ESPN (Local Scraper)',
            sourceUrl: 'https://www.espncricinfo.com/live-cricket-score'
          };

          return NextResponse.json({
            status: 'ok',
            data: formattedScorecard,
            source: { name: 'ESPN Cricinfo', url: 'https://www.espncricinfo.com/live-cricket-score' },
            fetched_at: new Date().toISOString()
          });
        }
      }
    } catch (e) {
      console.error('Failed to read local fallback scorecard', e);
    }
  }

  const result = await fetchMatchScorecard(id);

  return NextResponse.json(result, {
    headers: {
      'Cache-Control': 'no-store', // Disable cache for live debugging
    },
  });
}
