import puppeteer from 'puppeteer';

async function testScraping() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36');
  await page.setViewport({ width: 1280, height: 800 });

  console.log("Scraping Rankings...");
  await page.goto('https://www.espncricinfo.com/rankings/icc-team-ranking', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await new Promise(r => setTimeout(r, 5000));
  
  const rankingsHtml = await page.evaluate(() => {
    // ICC team rankings usually have tables with format
    return document.querySelector('table') ? document.querySelector('table').outerHTML : 'No table found';
  });
  console.log(rankingsHtml.substring(0, 500));

  console.log("Scraping Scorecard...");
  await page.goto('https://www.espncricinfo.com/series/pakistan-women-in-england-2024-1398263/england-women-vs-pakistan-women-1st-odi-1398285/full-scorecard', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await new Promise(r => setTimeout(r, 5000));

  const scorecardHtml = await page.evaluate(() => {
    return document.querySelector('.ci-scorecard-table') ? document.querySelector('.ci-scorecard-table').outerHTML : 'No scorecard found';
  });
  console.log(scorecardHtml.substring(0, 500));

  await browser.close();
}

testScraping().catch(console.error);
