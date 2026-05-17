@echo off
echo Starting CricWorld Auto-Update Service...
title CricWorld Cron Job
:loop
node scripts/cron.mjs
echo Cron job crashed or stopped. Restarting in 10 seconds...
timeout /t 10
goto loop
