import { scrapeDetailedScorecard } from './src/lib/collectors/scorecardScraper.js';

async function test() {
  const data = await scrapeDetailedScorecard('https://www.espncricinfo.com/series/pakistan-women-in-england-2024-1398263/england-women-vs-pakistan-women-1st-odi-1398285/full-scorecard');
  console.log(JSON.stringify(data, null, 2));
}

test();
