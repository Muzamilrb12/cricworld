import * as cheerio from 'cheerio';

/**
 * Scorecard Scraper (Cheerio Version)
 * Fetches detailed batting, bowling, and innings data from ESPN Cricinfo.
 */
export async function scrapeDetailedScorecard(matchUrl: string) {
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'Referer': 'https://www.espncricinfo.com/'
  };

  try {
    console.log(`[Scorecard] Scraping detailed card from ${matchUrl}...`);
    const res = await fetch(matchUrl, { headers });
    const html = await res.text();
    const $ = cheerio.load(html);

    const scorecard: any = {
      matchTitle: $('h1.ds-text-title-xs').text().trim(),
      innings: []
    };

    // Scrape each innings table
    $('.ds-p-0 > .ds-bg-fill-content-prime').each((i: any, inningsEl: any) => {
      const teamName = $(inningsEl).find('.ds-text-title-xs.ds-font-bold').text().trim();
      const batters: any[] = [];
      const bowlers: any[] = [];

      // Batting Table
      $(inningsEl).find('table.ds-table.ds-table-md.ds-table-auto.ci-scorecard-table tbody tr').each((_: any, row: any) => {
        const name = $(row).find('td.ds-flex.ds-items-center > a').text().trim();
        const runs = $(row).find('td.ds-font-bold.ds-text-right.ds-text-tight-m').text().trim();
        const balls = $(row).find('td:nth-child(4)').text().trim();
        const status = $(row).find('td.ds-text-tight-s.ds-text-ui-typo-mid').text().trim();

        if (name) {
          batters.push({ name, runs, balls, status });
        }
      });

      // Bowling Table
      $(inningsEl).find('table.ds-table.ds-table-md.ds-table-auto:not(.ci-scorecard-table) tbody tr').each((_: any, row: any) => {
        const name = $(row).find('td.ds-flex.ds-items-center > a').text().trim();
        const overs = $(row).find('td:nth-child(2)').text().trim();
        const runs = $(row).find('td:nth-child(4)').text().trim();
        const wickets = $(row).find('td:nth-child(5)').text().trim();

        if (name) {
          bowlers.push({ name, overs, runs, wickets });
        }
      });

      scorecard.innings.push({
        team: teamName,
        batting: batters,
        bowling: bowlers
      });
    });

    return scorecard;
  } catch (err) {
    console.error(`[Scorecard Error] ${err}`);
    return null;
  }
}
