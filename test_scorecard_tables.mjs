import puppeteer from 'puppeteer';
import fs from 'fs';

async function testScraping() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36');
  await page.setViewport({ width: 1280, height: 800 });

  console.log("Scraping Scorecard...");
  await page.goto('https://www.espncricinfo.com/series/pakistan-women-in-england-2024-1398263/england-women-vs-pakistan-women-1st-odi-1398285/full-scorecard', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await new Promise(r => setTimeout(r, 8000));

  const tables = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('table')).map(t => t.outerHTML);
  });
  
  fs.writeFileSync('scorecard_dump.html', tables.join('\n\n'));
  console.log(`Saved ${tables.length} tables to scorecard_dump.html`);

  await browser.close();
}

testScraping().catch(console.error);
