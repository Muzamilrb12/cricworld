// import { chromium } from 'playwright';
import { supabase } from '../supabase';

/**
 * Ball-by-Ball Commentary Collector
 * Fetches real-time ball events and syncs to Supabase.
 */
export async function collectCommentary(matchId: string, externalMatchUrl: string) {
  const { chromium } = await import('playwright');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log(`[Commentary] Fetching live events for match ${matchId}...`);
    await page.goto(`${externalMatchUrl}/live-cricket-score`, { waitUntil: 'networkidle' });

    // Scrape latest over/balls (Example for ESPN structure)
    const events = await page.$$eval('.ds-flex.ds-flex-col.ds-mt-2.ds-mb-2', (elements: Element[]) => {
      return elements.map((el: Element) => {
        const overBall = el.querySelector('.ds-text-tight-s.ds-font-bold')?.textContent?.trim() || '';
        const outcome = el.querySelector('.ds-flex.ds-items-center.ds-justify-center.ds-rounded-full')?.textContent?.trim() || '';
        const commentaryText = el.querySelector('.ds-text-tight-s.ds-font-regular')?.textContent?.trim() || '';
        
        return {
          over_no: parseFloat(overBall),
          ball_no: Math.round((parseFloat(overBall) % 1) * 10),
          event: outcome,
          text: commentaryText,
          is_wicket: outcome.toLowerCase().includes('w')
        };
      });
    });

    console.log(`[Commentary] Found ${events.length} events. Syncing...`);

    for (const event of events) {
      if (isNaN(event.over_no)) continue;

      const { error } = await supabase
        .from('commentary')
        .upsert({
          match_id: matchId,
          ...event,
          source: 'ESPN'
        }, { onConflict: 'match_id, over_no' } as any);

      if (error) console.error(`[DB Error] Commentary sync failed: ${error.message}`);
    }

    await browser.close();
    return { success: true, count: events.length };
  } catch (err: any) {
    console.error(`[Commentary Error] ${err.message}`);
    await browser.close();
    return { success: false, error: err.message };
  }
}
