# Complete AI Cricket Website Plan

## Vision
Build a world-class AI-powered cricket platform similar to ESPNcricinfo, Cricbuzz, and ICC Official with:

- Live matches
- Ball-by-ball commentary
- Upcoming series
- Points tables
- Player stats
- Records
- Rankings
- AI data validation
- Real-time refresh system
- Verified data only

---

# Core Objective

The system must:

- Never generate fake cricket data
- Use only verified sources
- Show source links
- Refresh live data automatically
- Retry if data unavailable
- Cross-check scores before publishing

---

# Official Data Sources

## Primary Sources

- ICC Official
- ESPNcricinfo
- Cricbuzz

## Backup Sources

- CricAPI
- SportMonks API

---

# System Architecture

```text
User Website
   ↓
Frontend (Next.js)
   ↓
Backend API Gateway
   ↓
AI Data Validation Agent
   ↓
Data Collectors
 ├── ESPN Scraper
 ├── Cricbuzz Scraper
 ├── ICC Official Scraper
 ├── Backup Cricket API
   ↓
Database
   ↓
Live Cache Refresh Engine
```

---

# AI Agent Rules

## Rule 1 — No Fake Data

If no verified source is available:

```json
{
 "status":"data unavailable",
 "retry_after":"30 seconds"
}
```

Show:

Live data temporarily unavailable. Retrying in 30 sec.

---

## Rule 2 — Show Source Links

Example:

- ICC Match Centre
- ESPN Live Scores
- Cricbuzz Live Scores

---

## Rule 3 — Cross Verification

```python
if espn_score == icc_score:
   publish()
elif cricbuzz_score == icc_score:
   publish()
else:
   retry_30_sec()
```

---

# Refresh Logic

## Live Match
Refresh every 60 seconds

## Super Over / Final Overs
Refresh every 15 seconds

## No Data
Retry after 30 seconds

---

# Ball-by-Ball System

Exactly ICC style:

| Ball | Result | Commentary |
|------|--------|------------|
| 18.1 | 4 | Cover drive |
| 18.2 | 1 | Single |
| 18.3 | W | Bowled |
| 18.4 | 2 | Midwicket |
| 18.5 | 6 | Huge six |
| 18.6 | dot | defended |

Features:

- Wagon wheel
- Run-rate graph
- Pitch map
- Partnership tracker
- Fall of wickets
- Over summaries

---

# Database Design

## Matches Table

```sql
matches
- id
- source_url
- team1
- team2
- status
- score
- overs
- updated_at
```

## Ball-by-Ball Table

```sql
balls
- match_id
- over_no
- ball_no
- batsman
- bowler
- runs
- wicket
- commentary
- source
```

## Players Table

```sql
players
- player_id
- source_profile
- name
- batting_stats
- bowling_stats
- rankings
```

---

# AI Monitoring Agent

The AI monitoring system should:

- Check if data is fresh
- Detect missing balls
- Detect score mismatches
- Detect scraper blocking
- Detect API failures
- Auto-switch to backup source

---

# Best Scraping Stack

## Primary Scraper

- Playwright

## Backup Scraper

- BeautifulSoup

## Parsing

- lxml

## Queue System

- Redis

## Scheduler

- Celery

---

# Backend Stack

- Python FastAPI
- PostgreSQL
- Redis
- Celery Workers
- Docker
- Nginx

---

# Frontend Stack

- Next.js
- TailwindCSS
- WebSockets
- Chart.js

---

# Website Pages

## Home
- Live matches
- Upcoming matches
- Trending players
- Latest news

## Match Center
- Live score
- Ball-by-ball commentary
- Graphs
- Full scorecard

## Series
- Fixtures
- Results
- Points table

## Teams
- Squad
- Stats
- Rankings

## Players
- Career stats
- Rankings
- Records

## Records
- Batting records
- Bowling records
- Team records

## News
- Verified cricket news only

---

# Auto Validation Sources

The AI agent should periodically validate:

- ICC Live Centre
- ESPNcricinfo Live
- Cricbuzz Live

---

# Deployment

## Frontend Hosting
- Vercel

## Backend Hosting
- DigitalOcean

## Database
- Supabase

---

# Estimated Cost

## MVP
$500–1500

## Production Scale
$5000–15000

---

# Domain Ideas

- CricAI.live
- CricPulse.ai
- WorldCricData.com
- SmartCricketLive.com
- CricVision.ai

---

# Final AI Prompt

```text
You are a strict cricket data AI.

Rules:
1. Never generate fake cricket data
2. Use only verified sources:
   - ICC official
   - ESPNcricinfo
   - Cricbuzz
   - trusted APIs
3. Refresh live data every 60 sec
4. Retry after 30 sec if unavailable
5. Show source URL
6. Cross verify before publish
7. Never guess missing scores
8. Publish exact ball-by-ball events only
9. Log all failures
10. Switch backup source automatically
```

---

# Final Goal

Create a professional AI cricket platform with:

- Real-time live scores
- Verified cricket data
- ICC-style live commentary
- Ball-by-ball updates
- AI validation system
- Zero fake data
- Fast refresh system
- Source transparency
