import puppeteer from 'puppeteer';

async function checkRankings() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36');
  
  await page.goto('https://www.espncricinfo.com/rankings/icc-team-ranking', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await new Promise(r => setTimeout(r, 5000));
  
  const headers = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('h3, h2, h4')).map(h => h.textContent).filter(t => t.includes('Rankings') || t.includes('Team'));
  });
  
  console.log("Headers on page:", headers);
  await browser.close();
}

checkRankings().catch(console.error);
