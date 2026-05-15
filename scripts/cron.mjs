import { scrapeLiveScores, scrapeSchedule } from './scraper.mjs';

const LIVE_SCORE_INTERVAL_MS = 60 * 1000; // 60 seconds
const SCHEDULE_INTERVAL_MS = 24 * 60 * 60 * 1000; // 24 hours

console.log('🕒 Starting CricWorld Data Cron Jobs...');
console.log(`⏱️ Live Scores Update Interval: Every ${LIVE_SCORE_INTERVAL_MS / 1000} seconds`);
console.log(`📅 Schedule Update Interval: Every ${SCHEDULE_INTERVAL_MS / 1000 / 60 / 60} hours`);

// Initial run
async function init() {
    console.log('🚀 Running initial scrapes...');
    await scrapeSchedule();
    await scrapeLiveScores();
    
    // Start Cron Jobs (Timers)
    setInterval(async () => {
        console.log(`[${new Date().toISOString()}] 🔄 Running Live Scores Cron Job...`);
        try {
            await scrapeLiveScores();
        } catch (err) {
            console.error('❌ Live Scores Cron Failed:', err);
        }
    }, LIVE_SCORE_INTERVAL_MS);

    setInterval(async () => {
        console.log(`[${new Date().toISOString()}] 🔄 Running Schedule Cron Job...`);
        try {
            await scrapeSchedule();
        } catch (err) {
            console.error('❌ Schedule Cron Failed:', err);
        }
    }, SCHEDULE_INTERVAL_MS);

    console.log('✅ Cron jobs successfully established and running in the background.');
}

init();

// Keep the process alive
process.stdin.resume();
