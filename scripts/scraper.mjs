import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';

async function scrapeCricketData() {
  console.log('🚀 Starting Comprehensive Scraper...');
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    // 1. Scrape Live Scores
    console.log('🌐 Navigating to Live Scores...');
    await page.goto('https://www.espncricinfo.com/live-cricket-score', { waitUntil: 'networkidle2', timeout: 60000 });

    const liveMatches = await page.evaluate(() => {
      // Find match cards - ESPN's layout often uses ds-p-0 for the outer container of a card
      const cards = Array.from(document.querySelectorAll('.ds-p-0'));
      
      return cards.map((card, index) => {
        const titleEl = card.querySelector('.ds-text-tight-s.ds-font-regular');
        const teams = Array.from(card.querySelectorAll('.ds-flex.ds-items-center.ds-justify-between.ds-truncate'));
        const statusEl = card.querySelector('.ds-text-tight-s.ds-font-regular.ds-line-clamp-2.ds-text-typo-mid3');

        if (teams.length < 2) return null;

        const processedTeams = teams.map(t => {
          const name = t.querySelector('.ds-text-tight-l')?.textContent?.trim() || 'Team';
          const score = t.querySelector('.ds-text-compact-m')?.textContent?.trim() || 'Yet to bat';
          const isBatting = !!t.querySelector('.ds-bg-ui-fill-primary'); // Simple batting indicator check
          return { 
            name, 
            shortName: name.substring(0, 3).toUpperCase(), 
            score, 
            overs: '0', // Overs extraction is complex, defaulting for now
            isBatting 
          };
        });

        return {
          id: `live-${index}`,
          title: titleEl?.textContent?.trim() || 'International Match',
          format: titleEl?.textContent?.includes('T20') ? 'T20I' : titleEl?.textContent?.includes('ODI') ? 'ODI' : 'Test',
          venue: 'International Stadium',
          status: 'Live',
          teams: processedTeams,
          summary: statusEl?.textContent?.trim() || ''
        };
      }).filter(m => m !== null);
    });

    console.log(`✅ Scraped ${liveMatches.length} live matches.`);

    // 2. Scrape Schedule
    console.log('🌐 Navigating to Schedule...');
    await page.goto('https://www.espncricinfo.com/cricket-schedule', { waitUntil: 'networkidle2', timeout: 60000 });

    const schedule = await page.evaluate(() => {
      const scheduleItems = Array.from(document.querySelectorAll('.ds-p-4.ds-border-y.ds-border-line'));
      
      return scheduleItems.map((item, index) => {
        const dateEl = item.closest('.ds-mb-4')?.querySelector('.ds-text-title-s');
        const teams = Array.from(item.querySelectorAll('.ds-text-tight-l'));
        const descEl = item.querySelector('.ds-text-tight-s');

        if (teams.length < 2) return null;

        return {
          id: `sched-${index}`,
          date: dateEl?.textContent?.trim() || 'Upcoming',
          teams: teams.map(t => t.textContent?.trim() || 'TBD'),
          description: descEl?.textContent?.trim() || 'Match Details',
          time: 'TBD'
        };
      }).filter(s => s !== null);
    });

    console.log(`✅ Scraped ${schedule.length} schedule items.`);

    // 3. Scrape ICC Team Rankings (Test)
    console.log('🌐 Navigating to ICC Team Rankings...');
    await page.goto('https://www.icc-cricket.com/rankings/mens/team-rankings/test', { waitUntil: 'networkidle2', timeout: 60000 });

    const rankings = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('.table-body, .rankings-block__banner'));
      
      return rows.map((row, index) => {
        const team = row.querySelector('.u-hide-phablet, .rankings-block__banner-team-name')?.textContent?.trim();
        const rating = row.querySelector('.table-body__cell--rating, .rankings-block__banner-rating')?.textContent?.trim();
        
        if (!team) return null;
        
        return {
          rank: index + 1,
          team,
          rating: rating || '0'
        };
      }).filter(r => r !== null);
    });

    console.log(`✅ Scraped ${rankings.length} team rankings.`);

    // Save Data
    const dataDir = path.join(process.cwd(), 'data');
    await fs.mkdir(dataDir, { recursive: true });

    await fs.writeFile(path.join(dataDir, 'matches.json'), JSON.stringify(liveMatches, null, 2));
    await fs.writeFile(path.join(dataDir, 'schedule.json'), JSON.stringify(schedule, null, 2));
    await fs.writeFile(path.join(dataDir, 'rankings.json'), JSON.stringify(rankings, null, 2));
    
    console.log('💾 Data saved to data/matches.json, data/schedule.json, and data/rankings.json');

  } catch (error) {
    console.error('❌ Scraper Error:', error);
  } finally {
    await browser.close();
  }
}

scrapeCricketData();


