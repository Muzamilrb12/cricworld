import * as cheerio from 'cheerio';

export async function scrapeUpcomingSeries() {
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  };

  try {
    const url = 'https://www.cricbuzz.com/cricket-schedule/series';
    const res = await fetch(url, { headers });
    const html = await res.text();
    const $ = cheerio.load(html);
    const series: any[] = [];

    $('.cb-col-100.cb-col.cb-series-brdr').each((i, el) => {
      if (i >= 10) return false; // Limit to top 10 series
      const name = $(el).find('a').text().trim();
      const link = $(el).find('a').attr('href');
      const dateRange = $(el).find('.text-muted').text().trim();

      if (name && name !== 'More »') {
        series.push({
          id: `series-${i}`,
          name,
          dateRange,
          link: link ? `https://www.cricbuzz.com${link}` : '#'
        });
      }
    });

    return series;
  } catch (err) {
    console.error('[Series Scraper Error]', err);
    return [];
  }
}
