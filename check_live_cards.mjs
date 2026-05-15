import puppeteer from 'puppeteer';

async function checkLiveScores() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36');
  
  await page.goto('https://www.espncricinfo.com/live-cricket-score', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await new Promise(r => setTimeout(r, 5000));
  
  const cards = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.ds-p-0')).slice(0, 3).map(card => card.outerHTML);
  });
  
  console.log("Card 1:", cards[0].substring(0, 2000));
  await browser.close();
}

checkLiveScores().catch(console.error);
