import { scrapeLiveScores, scrapeSchedule, scrapeRankings } from './scraper.mjs';

const LIVE_SCORE_INTERVAL_MS = 30 * 1000; // 30 seconds for real-time updates
const SCHEDULE_INTERVAL_MS = 12 * 60 * 60 * 1000; // 12 hours for schedule

console.log('🕒 Starting CricWorld Data Cron Jobs...');
console.log(`⏱️ Live Scores Update Interval: Every ${LIVE_SCORE_INTERVAL_MS / 1000} seconds`);
console.log(`📅 Schedule Update Interval: Every ${SCHEDULE_INTERVAL_MS / 1000 / 60 / 60} hours`);

// Initial run
async function init() {
    console.log('🚀 Running initial scrapes to sync data...');
    try {
        await scrapeLiveScores();
        await scrapeSchedule();
        await scrapeRankings();
        console.log('✅ Initial sync complete.');
    } catch (err) {
        console.error('❌ Initial Scrape Failed:', err);
    }
    
    // Start Cron Jobs (Timers)
    setInterval(async () => {
        const now = new Date().toLocaleTimeString();
        console.log(`[${now}] 🔄 Updating Live Scores...`);
        try {
            await scrapeLiveScores();
            console.log(`[${now}] ✨ Live Scores updated.`);
        } catch (err) {
            console.error(`[${now}] ❌ Live Scores Cron Failed:`, err);
        }
    }, LIVE_SCORE_INTERVAL_MS);

    setInterval(async () => {
        const now = new Date().toLocaleTimeString();
        console.log(`[${now}] 🔄 Updating Schedule & Rankings...`);
        try {
            await scrapeSchedule();
            await scrapeRankings();
            console.log(`[${now}] ✨ Schedule & Rankings updated.`);
        } catch (err) {
            console.error(`[${now}] ❌ Schedule Cron Failed:`, err);
        }
    }, SCHEDULE_INTERVAL_MS);

    // Heartbeat to show the process is alive
    setInterval(() => {
        console.log(`💓 Cron Heartbeat: Service is running at ${new Date().toLocaleTimeString()}`);
    }, 5 * 60 * 1000); // Every 5 minutes

    console.log('🚀 Cron jobs are now active and running in the background.');
}

init();

// Keep the process alive and handle errors
process.on('uncaughtException', (err) => {
    console.error('🔥 Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('🔥 Unhandled Rejection at:', promise, 'reason:', reason);
});
