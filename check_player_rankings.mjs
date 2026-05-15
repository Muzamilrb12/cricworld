import puppeteer from 'puppeteer';

async function checkPlayerRankings() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36');
  
  await page.goto('https://www.espncricinfo.com/rankings/icc-player-ranking', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await new Promise(r => setTimeout(r, 5000));
  
  const headers = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('h3, h2, h4')).map(h => h.textContent).filter(t => t.includes('Rankings') || t.includes('Bat') || t.includes('Bowl'));
  });
  
  const tables = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('table')).map(t => {
      const rows = Array.from(t.querySelectorAll('tbody tr')).slice(0, 2).map(tr => Array.from(tr.querySelectorAll('td')).map(td => td.textContent.trim()));
      return rows;
    });
  });
  
  console.log("Headers on page:", headers);
  console.log("Tables snapshot:", JSON.stringify(tables, null, 2));
  await browser.close();
}

checkPlayerRankings().catch(console.error);
