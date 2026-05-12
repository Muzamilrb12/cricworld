'use client';
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import DataUnavailable from '@/components/DataUnavailable';
import Link from 'next/link';

export default function MatchDetailPage() {
  const { id } = useParams();
  const [match, setMatch] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<{ name: string; url: string } | null>(null);
  const [activeInnings, setActiveInnings] = useState(0);
  const [lastUpdated, setLastUpdated] = useState('');

  const fetchScorecard = useCallback(async () => {
    try {
      const res = await fetch(`/api/scorecard/${id}`, { cache: 'no-store' });
      const json = await res.json();

      if (json.status === 'ok' && json.data) {
        setMatch(json.data);
        setError(null);
        // Default to latest innings
        if (json.data.scorecard && json.data.scorecard.length > 0) {
          setActiveInnings(json.data.scorecard.length - 1);
        }
      } else {
        setError(json.error || 'Scorecard data unavailable');
      }
      setSource(json.source);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchScorecard();
    // Auto-refresh every 60s for live matches
    const interval = setInterval(fetchScorecard, 60000);
    return () => clearInterval(interval);
  }, [fetchScorecard]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="glass p-16 rounded-[3rem] border border-white/5 text-center animate-pulse">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="font-black italic uppercase text-xl text-muted-foreground">Loading real-time scorecard...</p>
        </div>
      </div>
    );
  }

  if (error || !match) {
    return (
      <div className="container mx-auto px-4 py-12">
        <DataUnavailable
          retryAfter={30}
          onRetry={fetchScorecard}
          sourceName={source?.name}
          sourceUrl={source?.url}
        />
      </div>
    );
  }

  const currentScorecard = match.scorecard?.[activeInnings];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Premium Score Hub */}
      <div className="glass p-10 rounded-[3rem] border border-accent/20 mb-12 bg-gradient-to-br from-zinc-950 via-zinc-950 to-accent/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>

        {/* Team Info */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
          {match.teamInfo?.map((team: any, idx: number) => (
            <div key={idx} className={`flex flex-col items-center ${idx === 1 ? 'md:items-end' : 'md:items-start'} gap-4`}>
              {team.img && (
                <img src={team.img} alt={team.name} className="w-16 h-16 rounded-2xl object-contain bg-white/5 p-2" />
              )}
              <div className={`text-center ${idx === 1 ? 'md:text-right' : 'md:text-left'}`}>
                <h2 className="text-3xl font-black italic uppercase tracking-tighter">{team.name}</h2>
                <p className="text-xs text-muted-foreground font-bold uppercase">{team.shortname}</p>
              </div>
            </div>
          ))}

          {/* Center VS */}
          {match.teamInfo?.length >= 2 && (
            <div className="flex flex-col items-center gap-4 order-first md:order-none">
              <span className="text-6xl font-black italic text-accent tracking-tighter">VS</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{match.matchType}</span>
            </div>
          )}
        </div>

        {/* Scores Summary */}
        {match.score && match.score.length > 0 && (
          <div className="mt-10 pt-8 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-4">
            {match.score.map((s: any, idx: number) => (
              <div key={idx} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                <span className="text-xs font-bold text-muted-foreground truncate max-w-[60%]">{s.inning}</span>
                <span className="font-black italic text-xl text-accent">
                  {s.r}/{s.w} <span className="text-xs text-muted-foreground">({s.o} Ov)</span>
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Status */}
        <div className="mt-8 text-center">
          <p className="text-lg font-black italic uppercase text-white/80 tracking-tight">{match.status}</p>
        </div>

        {/* Source & Last Updated */}
        <div className="mt-4 flex justify-between items-center text-[9px] text-muted-foreground">
          <span>Last updated: <span className="text-accent">{lastUpdated}</span></span>
          {source && (
            <span>
              Source: <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-4">{source.name}</a>
            </span>
          )}
        </div>
      </div>

      {/* Scorecard Section */}
      {match.scorecard && match.scorecard.length > 0 && (
        <div className="space-y-8 mb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <h2 className="text-4xl font-black italic uppercase tracking-tighter">Full Scorecard</h2>
            
            {/* Innings Switcher */}
            <div className="flex gap-2 p-1 glass rounded-2xl w-fit">
              {match.scorecard.map((_: any, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setActiveInnings(idx)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black italic uppercase tracking-widest transition-all ${
                    activeInnings === idx ? 'bg-accent text-background' : 'hover:bg-white/5 text-muted-foreground'
                  }`}
                >
                  Innings {idx + 1}
                </button>
              ))}
            </div>
          </div>

          {currentScorecard && (
            <div className="space-y-8">
              {/* Innings Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-xl font-black italic uppercase text-accent flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                  {currentScorecard.batting?.inning || `Innings ${activeInnings + 1}`}
                </h3>
                {currentScorecard.batting?.totals && (
                  <span className="text-xl font-black italic">
                    {currentScorecard.batting.totals.r}/{currentScorecard.batting.totals.w} ({currentScorecard.batting.totals.o} Ov)
                  </span>
                )}
              </div>

              {/* Batting Table */}
              {currentScorecard.batting?.batsman && currentScorecard.batting.batsman.length > 0 && (
                <div className="glass rounded-3xl overflow-hidden border border-white/5">
                  <div className="px-6 py-3 bg-white/5 border-b border-white/5">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-accent">Batting</h4>
                  </div>
                  <table className="w-full text-left">
                    <thead className="bg-white/5 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                      <tr>
                        <th className="px-6 py-4">Batter</th>
                        <th className="px-6 py-4">Dismissal</th>
                        <th className="px-6 py-4 text-right">R</th>
                        <th className="px-6 py-4 text-right">B</th>
                        <th className="px-6 py-4 text-right">4s</th>
                        <th className="px-6 py-4 text-right">6s</th>
                        <th className="px-6 py-4 text-right">SR</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {currentScorecard.batting.batsman.map((b: any, bIdx: number) => (
                        <tr key={bIdx} className="hover:bg-white/5 transition-colors group">
                          <td className="px-6 py-4 font-black text-sm italic group-hover:text-accent transition-colors">{b.name}</td>
                          <td className="px-6 py-4 text-xs text-muted-foreground font-medium">{b.dismissal || 'not out'}</td>
                          <td className="px-6 py-4 text-right font-black text-accent">{b.r}</td>
                          <td className="px-6 py-4 text-right text-xs font-bold">{b.b}</td>
                          <td className="px-6 py-4 text-right text-xs">{b['4s']}</td>
                          <td className="px-6 py-4 text-right text-xs">{b['6s']}</td>
                          <td className="px-6 py-4 text-right text-xs text-muted-foreground">{b.sr}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/* Extras & Total */}
                  {currentScorecard.batting.extras && (
                    <div className="px-6 py-3 bg-white/5 border-t border-white/5 flex justify-between text-xs">
                      <span className="text-muted-foreground font-bold">Extras: {currentScorecard.batting.extras.r}</span>
                      <span className="font-black italic text-accent">
                        Total: {currentScorecard.batting.totals?.r}/{currentScorecard.batting.totals?.w} ({currentScorecard.batting.totals?.o} Ov)
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Bowling Table */}
              {currentScorecard.bowling?.bowler && currentScorecard.bowling.bowler.length > 0 && (
                <div className="glass rounded-3xl overflow-hidden border border-white/5">
                  <div className="px-6 py-3 bg-white/5 border-b border-white/5">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-accent">Bowling</h4>
                  </div>
                  <table className="w-full text-left">
                    <thead className="bg-white/5 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                      <tr>
                        <th className="px-6 py-4">Bowler</th>
                        <th className="px-6 py-4 text-right">O</th>
                        <th className="px-6 py-4 text-right">M</th>
                        <th className="px-6 py-4 text-right">R</th>
                        <th className="px-6 py-4 text-right">W</th>
                        <th className="px-6 py-4 text-right">Eco</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {currentScorecard.bowling.bowler.map((bo: any, boIdx: number) => (
                        <tr key={boIdx} className="hover:bg-white/5 transition-colors group">
                          <td className="px-6 py-4 font-black text-sm italic group-hover:text-accent transition-colors">{bo.name}</td>
                          <td className="px-6 py-4 text-right text-xs font-bold">{bo.o}</td>
                          <td className="px-6 py-4 text-right text-xs">{bo.m}</td>
                          <td className="px-6 py-4 text-right text-xs">{bo.r}</td>
                          <td className="px-6 py-4 text-right font-black text-lg italic text-red-500">{bo.w}</td>
                          <td className="px-6 py-4 text-right text-xs text-muted-foreground">{bo.eco}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Match Info Sidebar */}
      <div className="glass p-8 rounded-[3rem] border border-white/5 mb-8">
        <h3 className="text-xl font-black italic uppercase tracking-tighter text-accent mb-6">Match Info</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Match', val: match.name },
            { label: 'Venue', val: match.venue },
            { label: 'Date', val: match.date || match.dateTimeGMT },
          ].map((info, idx) => (
            <div key={idx}>
              <p className="text-[9px] font-black uppercase text-muted-foreground tracking-widest mb-1">{info.label}</p>
              <p className="text-sm font-bold leading-tight">{info.val}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
