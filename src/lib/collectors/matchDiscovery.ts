export async function discoverLiveMatches() {
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
    'Referer': 'https://www.google.com/'
  };

  try {
    console.log('[Discovery] Trying ESPN fallback...');
    const url = 'https://www.espncricinfo.com/live-cricket-score';
    const res = await fetch(url, { headers });
    
    if (res.status === 403) {
      console.log('[Discovery] ESPN blocked us (403), trying Cricbuzz backup...');
      return await discoverCricbuzzMatches();
    }

    const html = await res.text();
    const $ = cheerio.load(html);
    const liveMatches: any[] = [];

    // Selectors for ESPN Live Card
    $('.ds-p-0 .ds-flex.ds-flex-col').each((_, el) => {
      const title = $(el).find('.ds-text-tight-s.ds-font-bold').first().text().trim();
      const status = $(el).find('.ds-text-tight-s.ds-font-regular.ds-text-ui-typo-mid').text().trim();
      const relativeUrl = $(el).closest('a').attr('href') || '';
      
      if (title && (status.toLowerCase().includes('live') || status.toLowerCase().includes('day') || status.toLowerCase().includes('innings'))) {
        liveMatches.push({
          id: `espn-${Math.random().toString(36).substr(2, 9)}`,
          name: title,
          status: status,
          matchStarted: true,
          matchEnded: false,
          source: 'ESPN',
          sourceUrl: relativeUrl ? `https://www.espncricinfo.com${relativeUrl}` : url
        });
      }
    });

    if (liveMatches.length === 0) {
      return await discoverCricbuzzMatches();
    }

    return liveMatches;
  } catch (err) {
    console.error(`[Discovery Error] ${err}`);
    return await discoverCricbuzzMatches();
  }
}

async function discoverCricbuzzMatches() {
  const headers = { 'User-Agent': 'Mozilla/5.0' };
  try {
    const url = 'https://www.cricbuzz.com/cricket-match/live-scores';
    const res = await fetch(url, { headers });
    const html = await res.text();
    const $ = cheerio.load(html);
    const matches: any[] = [];

    $('.cb-mtch-lst.cb-col.cb-col-100.cb-tms-itm').each((_, el) => {
      const title = $(el).find('.text-hvr-underline').text().trim();
      const status = $(el).find('.cb-text-live').text().trim() || $(el).find('.cb-text-complete').text().trim();
      const relativeUrl = $(el).find('a').attr('href') || '';
      
      if (title) {
        matches.push({
          id: `cb-${Math.random().toString(36).substr(2, 9)}`,
          name: title,
          status: status || 'Live',
          matchStarted: true,
          matchEnded: false,
          source: 'Cricbuzz',
          sourceUrl: relativeUrl ? `https://www.cricbuzz.com${relativeUrl}` : url
        });
      }
    });
    return matches;
  } catch (err) {
    return [];
  }
}
