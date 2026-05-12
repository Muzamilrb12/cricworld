'use client';
import { useState, useEffect, useCallback } from 'react';

export default function LiveScoreTicker() {
  const [liveMatch, setLiveMatch] = useState<any>(null);
  const [source, setSource] = useState<{ name: string; url: string } | null>(null);

  const fetchLive = useCallback(async () => {
    try {
      const res = await fetch('/api/live-matches', { cache: 'no-store' });
      const json = await res.json();
      if (json.status === 'ok' && json.data && json.data.length > 0) {
        // Find first live (started, not ended) match
        const live = json.data.find((m: any) => m.matchStarted && !m.matchEnded);
        setLiveMatch(live || null);
        setSource(json.source);
      } else {
        setLiveMatch(null);
      }
    } catch {
      setLiveMatch(null);
    }
  }, []);

  useEffect(() => {
    fetchLive();
    const interval = setInterval(fetchLive, 60000);
    return () => clearInterval(interval);
  }, [fetchLive]);

  if (!liveMatch) return null;

  const latestScore = liveMatch.score?.[liveMatch.score.length - 1];

  return (
    <div className="w-full bg-accent/90 backdrop-blur-md text-background py-1.5 px-4 sticky top-[64px] z-40 border-b border-accent/20 overflow-hidden">
      <div className="container mx-auto flex items-center justify-between overflow-x-auto no-scrollbar gap-8">
        <div className="flex items-center gap-3 shrink-0">
          <span className="bg-red-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded animate-pulse">LIVE</span>
          <p className="text-[10px] font-black italic uppercase tracking-tighter truncate max-w-[200px]">
            {liveMatch.name?.split(',')[0]}
          </p>
        </div>

        <div className="flex items-center gap-4 flex-1 justify-center">
          {latestScore && (
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-bold truncate max-w-[120px]">{latestScore.inning?.split(' Inning')[0]}</span>
              <span className="text-sm font-black italic">{latestScore.r}/{latestScore.w}</span>
              <span className="text-[10px] font-bold text-background/60">({latestScore.o} Ov)</span>
            </div>
          )}
          <div className="w-px h-3 bg-background/20 shrink-0"></div>
          <p className="text-[10px] font-bold italic truncate text-background/80">
            {liveMatch.status}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {source && (
            <span className="text-[8px] font-bold text-background/50 hidden sm:block">
              via {source.name}
            </span>
          )}
          <a
            href={`/match/${liveMatch.id}`}
            className="text-[9px] font-black uppercase tracking-widest bg-background text-accent px-3 py-1 rounded-full hover:scale-105 transition-transform"
          >
            Full Scorecard →
          </a>
        </div>
      </div>
    </div>
  );
}
