import { chromium } from 'playwright';

/**
 * Match Discovery Scraper
 * If the official API misses a match, we scrape ESPN Live page to find it.
 */
export async function discoverLiveMatches() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    console.log('[Discovery] Searching for missing live matches on ESPN...');
    const url = 'https://www.espncricinfo.com/live-cricket-score';
    await page.goto(url, { waitUntil: 'networkidle' });

    const liveMatches = await page.$$eval('.ds-flex.ds-flex-col.ds-mt-2.ds-mb-2', (elements: Element[]) => {
      return elements.map((el: Element) => {
        const title = el.querySelector('.ds-text-tight-s.ds-font-bold')?.textContent?.trim() || '';
        const status = el.querySelector('.ds-text-tight-s.ds-font-regular.ds-text-ui-typo-mid')?.textContent?.trim() || '';
        
        // Only return matches that are actually live
        if (status.toLowerCase().includes('live') || status.toLowerCase().includes('day')) {
          return {
            id: `espn-${Math.random().toString(36).substr(2, 9)}`,
            name: title,
            status: status,
            matchStarted: true,
            matchEnded: false,
            source: 'ESPN (Scraped)',
            sourceUrl: 'https://www.espncricinfo.com/live-cricket-score'
          };
        }
        return null;
      }).filter(Boolean);
    });

    await browser.close();
    return liveMatches;
  } catch (err) {
    console.error(`[Discovery Error] ${err}`);
    await browser.close();
    return [];
  }
}
