import * as cheerio from 'cheerio';
import { supabase } from '../supabase';

/**
 * Ball-by-Ball Commentary Collector (Cheerio Version)
 */
export async function collectCommentary(matchId: string, externalMatchUrl: string) {
  try {
    console.log(`[Commentary] Fetching live events for match ${matchId} via Cheerio...`);
    const url = `${externalMatchUrl}/live-cricket-score`;
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const html = await res.text();
    const $ = cheerio.load(html);

    const events: any[] = [];

    $('.ds-flex.ds-flex-col.ds-mt-2.ds-mb-2').each((_, el) => {
      const overBall = $(el).find('.ds-text-tight-s.ds-font-bold').text().trim();
      const outcome = $(el).find('.ds-flex.ds-items-center.ds-justify-center.ds-rounded-full').text().trim();
      const commentaryText = $(el).find('.ds-text-tight-s.ds-font-regular').text().trim();
      
      if (overBall) {
        events.push({
          over_no: parseFloat(overBall),
          ball_no: Math.round((parseFloat(overBall) % 1) * 10),
          event: outcome,
          text: commentaryText,
          is_wicket: outcome.toLowerCase().includes('w')
        });
      }
    });

    for (const event of events) {
      if (isNaN(event.over_no)) continue;
      await supabase.from('commentary').upsert({
        match_id: matchId,
        ...event,
        source: 'ESPN'
      }, { onConflict: 'match_id, over_no' } as any);
    }

    return { success: true, count: events.length };
  } catch (err: any) {
    console.error(`[Commentary Error] ${err.message}`);
    return { success: false, error: err.message };
  }
}
