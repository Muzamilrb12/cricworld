
/**
 * Scrapes the live IPL points table from ESPN Cricinfo.
 * Returns an array of team objects with fields:
 *   - teamId, teamName, shortName, logoUrl, matchesPlayed, points, netRunRate
 */
export async function fetchIplPointsTable() {
  const { chromium } = await import('playwright');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  try {
    // ESPN Cricinfo IPL points page (public URL)
    const url = 'https://www.espncricinfo.com/series/indian-premier-league-2026-1380757/points-table';
    await page.goto(url, { waitUntil: 'networkidle' });
    // Wait for the points table to be rendered
    await page.waitForSelector('table.ds-table');
    const rows = await page.$$eval('table.ds-table tbody tr', (rows: any[]) =>
      rows.map((row: any) => {
        const cells = Array.from(row.querySelectorAll('td')).map((td: any) => td.textContent?.trim() ?? '');
        // Expected column order (as of ESPN design):
        // 0: Position, 1: Team, 2: Played, 3: Wins, 4: Losses, 5: Tied, 6: No Result, 7: Points, 8: Net RR, 9: Bonus (if any)
        const [ , teamCell, played, , , , , points, nrr ] = cells;
        const teamName = teamCell.replace(/\n/g, ' ').trim();
        const logoImg = (row.querySelector('td img') as HTMLImageElement | null)?.src || '';
        return {
          teamName,
          logoUrl: logoImg,
          matchesPlayed: Number(played) || 0,
          points: Number(points) || 0,
          netRunRate: parseFloat(nrr) || 0,
        };
      })
    );
    await browser.close();
    return rows;
  } catch (err) {
    await browser.close();
    throw err;
  }
}
