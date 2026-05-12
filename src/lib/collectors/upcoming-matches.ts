import { supabase } from '../supabase';

/**
 * Upcoming Matches Collector
 * Fetches data from ESPN Cricinfo and syncs to Supabase.
 */
export async function collectUpcomingMatches() {
  const { chromium } = await import('playwright');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    console.log('[Collector] Fetching upcoming matches from ESPN...');
    const url = 'https://www.espncricinfo.com/cricket-schedule';
    await page.goto(url, { waitUntil: 'networkidle' });

    const matches = await page.$$eval('.ds-flex.ds-flex-col.ds-mt-2', (elements: any[]) => {
      return elements.map((el: any) => {
        const title = el.querySelector('.ds-text-tight-s.ds-font-regular')?.textContent?.trim() || '';
        const teams = Array.from(el.querySelectorAll('.ds-flex.ds-items-center.ds-min-w-0.ds-mr-1')).map((t: any) => t.textContent?.trim() || '');
        const dateStr = el.closest('.ds-p-0')?.previousElementSibling?.textContent?.trim() || '';
        const venue = el.querySelector('.ds-text-tight-xs.ds-truncate')?.textContent?.trim() || '';
        
        return {
          external_id: title + dateStr, // Unique key
          title,
          team1: teams[0] || 'TBA',
          team2: teams[1] || 'TBA',
          match_date: new Date(dateStr).toISOString(),
          venue,
          status: 'upcoming',
          source: 'ESPN',
          source_url: 'https://www.espncricinfo.com/cricket-schedule'
        };
      });
    });

    console.log(`[Collector] Found ${matches.length} upcoming matches. Syncing to DB...`);

    for (const match of matches) {
      const { error } = await supabase
        .from('matches')
        .upsert(match, { onConflict: 'external_id' });
      
      if (error) console.error(`[DB Error] ${error.message}`);
    }

    await browser.close();
    return { success: true, count: matches.length };
  } catch (err: any) {
    console.error(`[Collector Error] ${err.message}`);
    await browser.close();
    return { success: false, error: err.message };
  }
}
