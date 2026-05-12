'use client';
import { useState, useEffect } from 'react';
import matchesData from '../../data/matches.json';

export default function LiveScoreTicker() {
  const [liveMatch, setLiveMatch] = useState<any>(null);

  useEffect(() => {
    // Find the first live match
    const match = matchesData.find((m: any) => m.status === 'Live');
    setLiveMatch(match);
  }, []);

  if (!liveMatch) return null;

  const battingTeam = liveMatch.teams.find((t: any) => t.isBatting);
  const bowlingTeam = liveMatch.teams.find((t: any) => !t.isBatting);

  return (
    <div className="w-full bg-accent/90 backdrop-blur-md text-background py-1.5 px-4 sticky top-[64px] z-40 border-b border-accent/20 overflow-hidden">
      <div className="container mx-auto flex items-center justify-between overflow-x-auto no-scrollbar gap-8">
        <div className="flex items-center gap-3 shrink-0">
          <span className="bg-red-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded animate-pulse">LIVE</span>
          <p className="text-[10px] font-black italic uppercase tracking-tighter truncate max-w-[200px]">
            {liveMatch.title.split(',')[0]}
          </p>
        </div>
        
        <div className="flex items-center gap-4 flex-1 justify-center">
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] font-bold uppercase">{battingTeam.shortName}</span>
            <span className="text-sm font-black italic">{battingTeam.score}</span>
            <span className="text-[10px] font-bold text-background/60">({battingTeam.overs})</span>
          </div>
          <div className="w-px h-3 bg-background/20 shrink-0"></div>
          <p className="text-[10px] font-bold italic truncate text-background/80">
            {liveMatch.summary}
          </p>
        </div>

        <a 
          href={`/match/${liveMatch.id}`}
          className="shrink-0 text-[9px] font-black uppercase tracking-widest bg-background text-accent px-3 py-1 rounded-full hover:scale-105 transition-transform"
        >
          View Full Scorecard →
        </a>
      </div>
    </div>
  );
}
