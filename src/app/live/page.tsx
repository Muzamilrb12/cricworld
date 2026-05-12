'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import DataUnavailable from '@/components/DataUnavailable';

export default function LivePage() {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<{ name: string; url: string } | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const fetchMatches = useCallback(async () => {
    try {
      const res = await fetch('/api/live-matches', { cache: 'no-store' });
      const json = await res.json();

      if (json.status === 'ok' && json.data) {
        setMatches(json.data);
        setError(null);
        
        // Store discovered matches metadata for detail page lookup
        const discovered = json.data.filter((m: any) => m.id.startsWith('espn-'));
        if (discovered.length > 0) {
          localStorage.setItem('discovered_matches', JSON.stringify(discovered));
        }
      } else {
        setError(json.error || 'Data unavailable');
        setMatches([]);
      }
      setSource(json.source);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMatches();
    // Auto-refresh every 60 seconds (Rule: Refresh Logic)
    const interval = setInterval(fetchMatches, 60000);
    return () => clearInterval(interval);
  }, [fetchMatches]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-2">Live Scores</h1>
          <p className="text-muted-foreground font-bold uppercase text-xs tracking-widest">Loading real-time data...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="glass p-8 rounded-[3rem] border border-white/5 animate-pulse">
              <div className="h-4 bg-white/10 rounded w-1/3 mb-4"></div>
              <div className="h-8 bg-white/10 rounded w-2/3 mb-3"></div>
              <div className="h-8 bg-white/10 rounded w-2/3 mb-6"></div>
              <div className="h-3 bg-white/10 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-2">Live Scores</h1>
          <p className="text-muted-foreground font-bold uppercase text-xs tracking-widest">
            Real-time cricket data • Auto-refreshes every 60s
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          {lastUpdated && (
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
              Last updated: <span className="text-accent">{lastUpdated}</span>
            </p>
          )}
          {source && (
            <p className="text-[9px] text-muted-foreground">
              Source: <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-4">{source.name}</a>
            </p>
          )}
        </div>
      </div>

      {error ? (
        <DataUnavailable
          retryAfter={30}
          onRetry={fetchMatches}
          sourceName={source?.name}
          sourceUrl={source?.url}
        />
      ) : matches.length === 0 ? (
        <div className="glass p-16 rounded-[3rem] border border-white/5 text-center">
          <p className="text-xl font-black italic uppercase text-muted-foreground">No live matches at the moment</p>
          <p className="text-xs text-muted-foreground mt-2">Check back when a match is scheduled</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {matches.map((match: any) => (
            <Link href={`/match/${match.id}`} key={match.id} className="block group">
              <div className="glass p-8 rounded-[3rem] border border-white/5 hover:border-accent/30 transition-all hover:scale-[1.02] bg-gradient-to-br from-white/5 to-transparent">
                {/* Status Badge */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] font-black uppercase tracking-widest text-accent">{match.matchType}</span>
                  <span className={`text-[10px] px-3 py-1 rounded-full font-black uppercase ${
                    match.matchStarted && !match.matchEnded 
                      ? 'bg-red-500/20 text-red-500 animate-pulse' 
                      : match.matchEnded 
                        ? 'bg-white/10 text-muted-foreground' 
                        : 'bg-accent/20 text-accent'
                  }`}>
                    {match.matchStarted && !match.matchEnded ? '● LIVE' : match.matchEnded ? 'FINISHED' : 'UPCOMING'}
                  </span>
                </div>

                {/* Teams */}
                <h3 className="font-black italic uppercase text-lg tracking-tight leading-tight mb-4 group-hover:text-accent transition-colors">
                  {match.name}
                </h3>

                {/* Scores */}
                {match.score && match.score.length > 0 && (
                  <div className="space-y-2 mb-6">
                    {match.score.map((s: any, idx: number) => (
                      <div key={idx} className="flex justify-between items-center p-3 bg-white/5 rounded-2xl">
                        <span className="text-xs font-bold text-muted-foreground truncate max-w-[60%]">{s.inning}</span>
                        <span className="font-black italic text-accent">
                          {s.r}/{s.w} <span className="text-xs text-muted-foreground font-bold">({s.o} Ov)</span>
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Status */}
                <div className="pt-4 border-t border-white/5">
                  <p className="text-xs font-bold text-muted-foreground leading-relaxed">{match.status}</p>
                </div>

                {/* Venue */}
                <p className="text-[9px] text-muted-foreground/50 mt-3 uppercase font-bold tracking-widest">{match.venue}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
