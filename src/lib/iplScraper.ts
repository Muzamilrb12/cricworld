import * as cheerio from 'cheerio';

/**
 * IPL Points Table Scraper (Cheerio Version)
 */
export async function fetchIplPointsTable() {
  try {
    const url = 'https://www.espncricinfo.com/series/indian-premier-league-2026-1380757/points-table';
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const html = await res.text();
    const $ = cheerio.load(html);

    const rows: any[] = [];

    $('table.ds-table tbody tr').each((_, row) => {
      const cells: string[] = [];
      $(row).find('td').each((_, td) => {
        cells.push($(td).text().trim());
      });

      if (cells.length >= 8) {
        const [ , teamCell, played, , , , , points, nrr ] = cells;
        const teamName = teamCell.replace(/\n/g, ' ').trim();
        const logoImg = $(row).find('td img').attr('src') || '';
        
        rows.push({
          teamName,
          logoUrl: logoImg,
          matchesPlayed: Number(played) || 0,
          points: Number(points) || 0,
          netRunRate: parseFloat(nrr) || 0,
        });
      }
    });

    return rows;
  } catch (err) {
    console.error(`[IPL Scraper Error] ${err}`);
    throw err;
  }
}
