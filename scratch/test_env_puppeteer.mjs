import puppeteer from 'puppeteer';

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto('https://www.google.com');
    console.log('Title:', await page.title());
    await browser.close();
    console.log('Puppeteer works!');
  } catch (err) {
    console.error('Puppeteer failed:', err);
  }
})();
