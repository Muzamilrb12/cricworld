/**
 * CricWorld — Live Cricket Data Layer
 * 
 * RULES:
 * 1. Never generate fake cricket data
 * 2. Use only verified sources (CricketData API, ESPN, Cricbuzz)
 * 3. Refresh live data every 60 sec
 * 4. Retry after 30 sec if unavailable
 * 5. Show source URL with every response
 * 6. Never guess missing scores
 * 7. Log all failures
 * 8. Switch backup source automatically
 */

const CRICKET_API_KEY = process.env.CRICKET_API_KEY || '';
const CRICKET_API_BASE = 'https://api.cricapi.com/v1';

// Source attribution
export const DATA_SOURCES = {
  primary: {
    name: 'CricAPI (CricketData.org)',
    url: 'https://cricketdata.org',
  },
  espn: {
    name: 'ESPN Cricinfo',
    url: 'https://www.espncricinfo.com/live-cricket-score',
  },
  cricbuzz: {
    name: 'Cricbuzz',
    url: 'https://www.cricbuzz.com/cricket-match/live-scores',
  },
  icc: {
    name: 'ICC Official',
    url: 'https://www.icc-cricket.com/live-cricket/live',
  },
};

export interface CricketMatch {
  id: string;
  name: string;
  status: string;
  venue: string;
  date: string;
  dateTimeGMT: string;
  teams: string[];
  teamInfo: { name: string; shortname: string; img: string }[];
  score: { r: number; w: number; o: number; inning: string }[];
  series_id: string;
  fantasyEnabled: boolean;
  bbbEnabled: boolean;
  hasSquad: boolean;
  matchStarted: boolean;
  matchEnded: boolean;
  matchType: string;
  source: string;
  sourceUrl: string;
}

export interface CricketScorecard {
  id: string;
  name: string;
  status: string;
  venue: string;
  teams: string[];
  teamInfo: { name: string; shortname: string; img: string }[];
  score: { r: number; w: number; o: number; inning: string }[];
  tpiScorecard: any[];
  scorecard: {
    batting: {
      batsman: { name: string; dismissal: string; r: number; b: number; '4s': number; '6s': number; sr: number }[];
      extras: { r: number; b: number };
      totals: { r: number; w: number; o: number };
      inning: string;
    };
    bowling: {
      bowler: { name: string; o: number; m: number; r: number; w: number; eco: number }[];
      inning: string;
    };
  }[];
  source: string;
  sourceUrl: string;
}

export interface ApiResponse<T> {
  status: 'ok' | 'data unavailable';
  data: T | null;
  source: { name: string; url: string };
  retry_after?: string;
  fetched_at: string;
  error?: string;
}

/**
 * Fetch current/live matches from the API
 */
export async function fetchLiveMatches(): Promise<ApiResponse<CricketMatch[]>> {
  const now = new Date().toISOString();

  if (!CRICKET_API_KEY) {
    return {
      status: 'data unavailable',
      data: null,
      source: DATA_SOURCES.primary,
      retry_after: '30 seconds',
      fetched_at: now,
      error: 'API key not configured. Set CRICKET_API_KEY in .env.local',
    };
  }

  try {
    const res = await fetch(`${CRICKET_API_BASE}/currentMatches?apikey=${CRICKET_API_KEY}&offset=0`, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!res.ok) {
      throw new Error(`API returned ${res.status}: ${res.statusText}`);
    }

    const json = await res.json();

    if (json.status !== 'success') {
      throw new Error(json.reason || 'Unknown API error');
    }

    const matches: CricketMatch[] = (json.data || []).map((m: any) => ({
      ...m,
      source: DATA_SOURCES.primary.name,
      sourceUrl: DATA_SOURCES.primary.url,
    }));

    return {
      status: 'ok',
      data: matches,
      source: DATA_SOURCES.primary,
      fetched_at: now,
    };
  } catch (err: any) {
    console.error('[CricWorld] Live matches fetch failed:', err.message);
    return {
      status: 'data unavailable',
      data: null,
      source: DATA_SOURCES.primary,
      retry_after: '30 seconds',
      fetched_at: now,
      error: err.message,
    };
  }
}

/**
 * Fetch full scorecard for a specific match
 */
export async function fetchMatchScorecard(matchId: string): Promise<ApiResponse<CricketScorecard>> {
  const now = new Date().toISOString();

  if (!CRICKET_API_KEY) {
    return {
      status: 'data unavailable',
      data: null,
      source: DATA_SOURCES.primary,
      retry_after: '30 seconds',
      fetched_at: now,
      error: 'API key not configured. Set CRICKET_API_KEY in .env.local',
    };
  }

  try {
    const res = await fetch(`${CRICKET_API_BASE}/match_scorecard?apikey=${CRICKET_API_KEY}&id=${matchId}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`API returned ${res.status}: ${res.statusText}`);
    }

    const json = await res.json();

    if (json.status !== 'success') {
      throw new Error(json.reason || 'Unknown API error');
    }

    const scorecard: CricketScorecard = {
      ...json.data,
      source: DATA_SOURCES.primary.name,
      sourceUrl: DATA_SOURCES.primary.url,
    };

    return {
      status: 'ok',
      data: scorecard,
      source: DATA_SOURCES.primary,
      fetched_at: now,
    };
  } catch (err: any) {
    console.error('[CricWorld] Scorecard fetch failed:', err.message);
    return {
      status: 'data unavailable',
      data: null,
      source: DATA_SOURCES.primary,
      retry_after: '30 seconds',
      fetched_at: now,
      error: err.message,
    };
  }
}

/**
 * Fetch match info (details without full scorecard)
 */
export async function fetchMatchInfo(matchId: string): Promise<ApiResponse<any>> {
  const now = new Date().toISOString();

  if (!CRICKET_API_KEY) {
    return {
      status: 'data unavailable',
      data: null,
      source: DATA_SOURCES.primary,
      retry_after: '30 seconds',
      fetched_at: now,
      error: 'API key not configured. Set CRICKET_API_KEY in .env.local',
    };
  }

  try {
    const res = await fetch(`${CRICKET_API_BASE}/match_info?apikey=${CRICKET_API_KEY}&id=${matchId}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`API returned ${res.status}: ${res.statusText}`);
    }

    const json = await res.json();

    if (json.status !== 'success') {
      throw new Error(json.reason || 'Unknown API error');
    }

    return {
      status: 'ok',
      data: { ...json.data, source: DATA_SOURCES.primary.name, sourceUrl: DATA_SOURCES.primary.url },
      source: DATA_SOURCES.primary,
      fetched_at: now,
    };
  } catch (err: any) {
    console.error('[CricWorld] Match info fetch failed:', err.message);
    return {
      status: 'data unavailable',
      data: null,
      source: DATA_SOURCES.primary,
      retry_after: '30 seconds',
      fetched_at: now,
      error: err.message,
    };
  }
}
