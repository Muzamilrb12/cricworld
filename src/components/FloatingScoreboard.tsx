'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

/**
 * FloatingScoreboard Component
 * Stays on every page, shows live match score in a sleek sidebar/pill.
 */
export default function FloatingScoreboard() {
  const [liveMatch, setLiveMatch] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(true);

  const fetchLive = useCallback(async () => {
    try {
      const res = await fetch('/api/live-matches', { cache: 'no-store' });
      if (!res.ok) return;
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) return;
      
      const json = await res.json();
      if (json.status === 'ok' && json.data && json.data.length > 0) {
        const live = json.data.find((m: any) => m.matchStarted && !m.matchEnded);
        setLiveMatch(live || null);
      }
    } catch {
      setLiveMatch(null);
    }
  }, []);

  useEffect(() => {
    fetchLive();
    const interval = setInterval(fetchLive, 60000); // 60s update

    return () => clearInterval(interval);
  }, [fetchLive]);

  if (!liveMatch || !isVisible) return null;

  const latestScore = liveMatch.score?.[liveMatch.score.length - 1];

  return (
    <div className="fixed bottom-8 right-8 z-50 group">
      {/* Floating Pill */}
      <div className="glass p-1 pr-6 rounded-full border border-accent/30 shadow-[0_0_40px_rgba(0,255,136,0.2)] flex items-center gap-4 animate-in slide-in-from-right-12 duration-500">
        {/* Live Indicator */}
        <div className="relative">
          <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center font-black italic text-background text-lg shadow-[0_0_20px_rgba(0,255,136,0.4)]">
            L
          </div>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-background animate-pulse"></span>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase text-accent tracking-widest">Live Now</span>
            <span className="text-[8px] text-muted-foreground font-bold uppercase">{liveMatch.matchType}</span>
          </div>
          <div className="flex items-center gap-3">
            <p className="font-black italic text-sm uppercase truncate max-w-[120px]">{liveMatch.name?.split(',')[0]}</p>
            {latestScore && (
              <p className="font-black italic text-accent text-lg">
                {latestScore.r}/{latestScore.w}
                <span className="text-[10px] text-muted-foreground ml-1 not-italic">({latestScore.o} ov)</span>
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 ml-4">
          <Link 
            href={`/match/${liveMatch.id}`}
            className="bg-white/10 hover:bg-accent text-white hover:text-background p-2 rounded-full transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-muted-foreground hover:text-red-500 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
