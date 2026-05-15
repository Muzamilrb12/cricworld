import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';

let browserInstance = null;

async function getBrowser() {
  if (!browserInstance) {
    browserInstance = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  }
  return browserInstance;
}

export async function scrapeLiveScores() {
  console.log('🌐 Navigating to Live Scores...');
  const browser = await getBrowser();
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
  
  try {
    await page.goto('https://www.espncricinfo.com/live-cricket-score', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForSelector('.ds-flex.ds-flex-col', { timeout: 10000 }).catch(() => console.log('Timeout waiting for cards'));
    await new Promise(r => setTimeout(r, 5000));

    const liveMatches = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('.ds-p-0'));
      return cards.map((card, index) => {
        const teamNames = Array.from(card.querySelectorAll('.ds-text-tight-l, .ds-text-tight-m'))
          .map(el => el.textContent.trim())
          .filter(name => name.length > 2 && !name.includes('RESULT') && !name.includes('LIVE'));
        
        const scores = Array.from(card.querySelectorAll('.ds-text-compact-m, .ds-text-compact-s'))
          .map(el => el.textContent.trim());

        const status = card.querySelector('.ds-text-tight-s.ds-font-regular.ds-line-clamp-2')?.textContent?.trim() || 'Live';
        const title = card.querySelector('.ds-text-tight-s.ds-font-regular')?.textContent?.trim() || 'Match';

        if (teamNames.length < 2) return null;

        const processedTeams = teamNames.slice(0, 2).map((name, i) => {
          return { 
            name, 
            shortName: name.substring(0, 3).toUpperCase(), 
            score: scores[i] || 'Yet to bat', 
            overs: '0',
            isBatting: false 
          };
        });

        return {
          id: `live-${index}`,
          title,
          format: title.includes('T20') ? 'T20' : title.includes('ODI') ? 'ODI' : 'Test',
          venue: 'Live Match',
          status: 'Live',
          teams: processedTeams,
          summary: status
        };
      }).filter(m => m !== null);
    });

    console.log(`✅ Scraped ${liveMatches.length} live matches.`);
    
    const dataDir = path.join(process.cwd(), 'data');
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(path.join(dataDir, 'matches.json'), JSON.stringify(liveMatches, null, 2));
    
    return liveMatches;
  } catch (error) {
    console.error('❌ Live Scraper Error:', error);
  } finally {
    await page.close();
  }
}

export async function scrapeSchedule() {
  console.log('🌐 Navigating to Schedule...');
  const browser = await getBrowser();
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
  
  try {
    await page.goto('https://www.espncricinfo.com/live-cricket-match-schedule-fixtures', { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(e => {
        console.log('Navigation timeout, but proceeding with loaded DOM...');
    });
    await new Promise(r => setTimeout(r, 5000));


    const schedule = await page.evaluate(() => {
      const matchGroups = Array.from(document.querySelectorAll('.debug-fixture-date-item'));
      let allMatches = [];
      
      matchGroups.forEach(group => {
        const dateEl = group.querySelector('span[id]');
        const date = dateEl ? dateEl.textContent.trim() : 'Upcoming';
        
        const matchCards = Array.from(group.querySelectorAll('a'));
        matchCards.forEach((card, index) => {
          const timeEl = card.querySelector('.ds-text-compact-xs.ds-font-medium');
          const titleEl = card.querySelector('.ds-text-compact-s.ds-font-medium');
          const detailsEl = card.querySelector('.ds-text-tight-xs.ds-text-typo-mid3');

          if (!titleEl) return;

          const titleText = titleEl.textContent.trim(); // E.g., "The Blaze Women vs Hampshire Women"
          let teams = titleText.split('vs').map(t => t.trim());
          if (teams.length < 2) teams = [titleText, 'TBA'];

          let venue = 'TBD';
          let match = 'Match';
          let series = 'International Match';

          if (detailsEl) {
            const detailsText = detailsEl.textContent.trim(); // "33rd Match, Nottingham, May 15, 2026"
            const parts = detailsText.split(',').map(p => p.trim());
            if (parts.length > 0) match = parts[0];
            if (parts.length > 1) venue = parts[1];
            
            // Extract series name from URL if possible, or just use general name
            const href = card.getAttribute('href');
            if (href && href.includes('/series/')) {
               const sname = href.split('/series/')[1].split('/')[0];
               series = sname.replace(/-/g, ' ').toUpperCase();
            }
          }

          allMatches.push({
            id: `sched-${date.replace(/\s/g,'')}-${index}`,
            date: date,
            series: series,
            teams: teams,
            venue: venue,
            match: match,
            time: timeEl ? timeEl.textContent.trim() : 'TBD',
            description: titleText
          });
        });
      });
      
      return allMatches.slice(0, 30); // Return top 30 matches to keep JSON reasonable
    });

    console.log(`✅ Scraped ${schedule.length} schedule items.`);
    
    const dataDir = path.join(process.cwd(), 'data');
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(path.join(dataDir, 'schedule.json'), JSON.stringify(schedule, null, 2));

    return schedule;
  } catch (error) {
    console.error('❌ Schedule Scraper Error:', error);
  } finally {
    await page.close();
  }
}

export async function scrapeAllOnce() {
    await scrapeLiveScores();
    await scrapeSchedule();
    // You can add scrapeRankings and scrapeIplPointsTable here if needed
    if (browserInstance) {
        await browserInstance.close();
        browserInstance = null;
    }
}

// If run directly, run once and exit
if (process.argv[1] === new URL(import.meta.url).pathname) {
    scrapeAllOnce().then(() => process.exit(0));
}
