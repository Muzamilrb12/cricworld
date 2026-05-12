import * as cheerio from 'cheerio';

/**
 * Match Discovery Scraper (Cheerio Version)
 * Fast, lightweight, and 100% Vercel compatible.
 */
export async function discoverLiveMatches() {
  try {
    console.log('[Discovery] Searching for missing live matches on ESPN via Cheerio...');
    const url = 'https://www.espncricinfo.com/live-cricket-score';
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const html = await res.text();
    const $ = cheerio.load(html);

    const liveMatches: any[] = [];

    $('.ds-flex.ds-flex-col.ds-mt-2.ds-mb-2').each((_, el) => {
      const titleEl = $(el).find('.ds-text-tight-s.ds-font-bold');
      const title = titleEl.text().trim();
      const relativeUrl = $(el).closest('a').attr('href') || '';
      const status = $(el).find('.ds-text-tight-s.ds-font-regular.ds-text-ui-typo-mid').text().trim();
      
      if (status.toLowerCase().includes('live') || status.toLowerCase().includes('day')) {
        liveMatches.push({
          id: `espn-${Math.random().toString(36).substr(2, 9)}`,
          name: title,
          status: status,
          matchStarted: true,
          matchEnded: false,
          source: 'ESPN (Scraped)',
          sourceUrl: relativeUrl ? `https://www.espncricinfo.com${relativeUrl}` : 'https://www.espncricinfo.com/live-cricket-score'
        });
      }
    });

    return liveMatches;
  } catch (err) {
    console.error(`[Discovery Error] ${err}`);
    return [];
  }
}
