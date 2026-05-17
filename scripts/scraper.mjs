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

        const processedTeams = [];
        const teamRows = Array.from(card.querySelectorAll('.ci-team-score'));
        
        if (teamRows.length >= 2) {
            teamRows.forEach(row => {
                const nameEl = row.querySelector('.ds-text-tight-m, .ds-text-tight-l');
                let name = nameEl ? nameEl.textContent.trim() : 'Unknown';
                
                const scoreBlock = row.querySelector('.ds-text-compact-m, .ds-text-compact-s');
                let scoreText = scoreBlock ? scoreBlock.textContent.trim() : '';

                // Sometimes the overs are in a separate span within the row, let's just grab all text
                // from the right side of the row if possible
                if (!scoreText) {
                    const allText = row.textContent.trim();
                    scoreText = allText.replace(name, '').trim() || 'Yet to bat';
                }

                processedTeams.push({
                    name,
                    shortName: name.length > 3 ? name.substring(0, 3).toUpperCase() : name.toUpperCase(),
                    score: scoreText,
                    overs: '0', // Overs will be parsed by the API route from the scoreText
                    isBatting: false
                });
            });
        } else {
            // Fallback to old method if .ci-team-score is missing
            teamNames.slice(0, 2).forEach((name, i) => {
                processedTeams.push({ 
                    name, 
                    shortName: name.substring(0, 3).toUpperCase(), 
                    score: scores[i] || 'Yet to bat', 
                    overs: '0',
                    isBatting: false 
                });
            });
        }

        const format = (title.toLowerCase().includes('t20') || title.toLowerCase().includes('ipl')) ? 'T20' : 
                       title.toLowerCase().includes('odi') ? 'ODI' : 
                       (title.toLowerCase().includes('test') || title.toLowerCase().includes('county')) ? 'Test' : 'T20';

        return {
          id: `live-${index}`,
          title,
          format,
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

export async function scrapeRankings() {
  const browser = await getBrowser();
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36');
  try {
    console.log('🌐 Navigating to ICC Rankings...');
    await page.goto('https://www.espncricinfo.com/rankings/icc-team-ranking', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await new Promise(r => setTimeout(r, 5000));

    const rankings = await page.evaluate(() => {
      const tables = Array.from(document.querySelectorAll('table'));
      let allRankings = [];
      
      tables.forEach((table, index) => {
        const rows = Array.from(table.querySelectorAll('tbody tr'));
        const format = index === 0 ? 'Test' : index === 1 ? 'ODI' : index === 2 ? 'T20I' : 'Women';
        
        const teamRankings = rows.map(row => {
          const cells = Array.from(row.querySelectorAll('td'));
          if (cells.length < 5) return null;
          return {
            position: cells[0].textContent.trim(),
            team: cells[1].textContent.trim(),
            matches: cells[2].textContent.trim(),
            points: cells[3].textContent.trim(),
            rating: cells[4].textContent.trim()
          };
        }).filter(Boolean);

        if (teamRankings.length > 0) {
          allRankings.push({ format, rankings: teamRankings });
        }
      });
      return allRankings;
    });

    console.log(`✅ Scraped ${rankings.length} ranking tables.`);
    const dataDir = path.join(process.cwd(), 'data');
    const dbPath = path.join(dataDir, 'rankings.json');
    
    // Read existing to preserve players data
    let existingData = { teams: { test: [], odi: [], t20i: [] }, players: {} };
    try {
       const fileContent = await fs.readFile(dbPath, 'utf8');
       existingData = JSON.parse(fileContent);
    } catch (e) {
       // File doesn't exist or is invalid, use default structure
    }

    // Map scraped data to correct format
    rankings.forEach(r => {
        const key = r.format.toLowerCase();
        if (existingData.teams[key]) {
            existingData.teams[key] = r.rankings.map(t => ({
                rank: parseInt(t.position) || 0,
                team: t.team,
                rating: parseInt(t.rating) || 0,
                points: parseInt(t.points.replace(/,/g, '')) || 0
            }));
        }
    });

    console.log('🌐 Navigating to ICC Player Rankings...');
    await page.goto('https://www.espncricinfo.com/rankings/icc-player-ranking', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await new Promise(r => setTimeout(r, 5000));

    const playerRankingsData = await page.evaluate(() => {
      const tables = Array.from(document.querySelectorAll('table'));
      return tables.map(t => {
        const rows = Array.from(t.querySelectorAll('tbody tr')).slice(0, 10).map(tr => {
          const cells = Array.from(tr.querySelectorAll('td')).map(td => td.textContent.trim());
          return cells;
        });
        return rows;
      });
    });

    console.log(`✅ Scraped ${playerRankingsData.length} player ranking tables.`);

    if (playerRankingsData.length >= 9) {
      const mapPlayers = (tableData) => {
        if (!tableData) return [];
        return tableData.map(row => ({
          rank: parseInt(row[0]) || 0,
          name: row[1],
          team: row[2],
          rating: parseInt(row[3]) || 0
        })).filter(p => p.name);
      };

      existingData.players = {
        test: {
          batting: mapPlayers(playerRankingsData[0]),
          bowling: mapPlayers(playerRankingsData[1])
        },
        odi: {
          batting: mapPlayers(playerRankingsData[3]),
          bowling: mapPlayers(playerRankingsData[4])
        },
        t20i: {
          batting: mapPlayers(playerRankingsData[6]),
          bowling: mapPlayers(playerRankingsData[7])
        }
      };
    }

    await fs.writeFile(dbPath, JSON.stringify(existingData, null, 2));

  } catch (error) {
    console.error('❌ Rankings Scraper Error:', error);
  } finally {
    await page.close();
  }
}

export async function scrapeAllOnce() {
    await scrapeLiveScores();
    await scrapeSchedule();
    await scrapeRankings();
    if (browserInstance) {
        await browserInstance.close();
        browserInstance = null;
    }
}

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const isDirectRun = process.argv[1] === __filename || process.argv[1]?.endsWith('scraper.mjs');

if (isDirectRun) {
    console.log('🚀 Starting manual scrape of all data...');
    scrapeAllOnce().then(() => {
        console.log('✨ All scraping tasks completed successfully.');
        process.exit(0);
    }).catch(err => {
        console.error('💥 Fatal Scraper Error:', err);
        process.exit(1);
    });
}
