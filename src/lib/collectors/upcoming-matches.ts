import * as cheerio from 'cheerio';
import { supabase } from '../supabase';

/**
 * Upcoming Matches Collector (Cheerio Version)
 */
export async function collectUpcomingMatches() {
  try {
    console.log('[Collector] Fetching upcoming matches from ESPN via Cheerio...');
    const url = 'https://www.espncricinfo.com/cricket-schedule';
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const html = await res.text();
    const $ = cheerio.load(html);

    const matches: any[] = [];

    $('.ds-flex.ds-flex-col.ds-mt-2').each((_, el) => {
      const title = $(el).find('.ds-text-tight-s.ds-font-regular').first().text().trim();
      const teams: string[] = [];
      $(el).find('.ds-flex.ds-items-center.ds-min-w-0.ds-mr-1').each((_, t) => {
        teams.push($(t).text().trim());
      });
      const dateStr = $(el).closest('.ds-p-0').prev().text().trim();
      const venue = $(el).find('.ds-text-tight-xs.ds-truncate').text().trim();
      
      if (title) {
        matches.push({
          external_id: title + dateStr,
          title,
          team1: teams[0] || 'TBA',
          team2: teams[1] || 'TBA',
          match_date: new Date(dateStr).toISOString() || new Date().toISOString(),
          venue,
          status: 'upcoming',
          source: 'ESPN',
          source_url: url
        });
      }
    });

    for (const match of matches) {
      await supabase.from('matches').upsert(match, { onConflict: 'external_id' });
    }

    return { success: true, count: matches.length };
  } catch (err: any) {
    console.error(`[Collector Error] ${err.message}`);
    return { success: false, error: err.message };
  }
}
