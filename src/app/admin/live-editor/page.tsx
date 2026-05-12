'use client';
import { useState, useEffect } from 'react';
import { updateMatchScore } from './actions';
import matchesData from '../../../../data/matches.json';

export default function LiveScoreEditor() {
  const [matches, setMatches] = useState(matchesData);
  const [selectedId, setSelectedId] = useState('');
  const [score, setScore] = useState('');
  const [overs, setOvers] = useState('');
  const [summary, setSummary] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const selectedMatch = matches.find(m => m.id === selectedId);

  useEffect(() => {
    if (selectedMatch) {
      const battingTeam = selectedMatch.teams.find((t: any) => t.isBatting) as any;
      setScore(battingTeam?.score || '');
      setOvers(battingTeam?.overs || '');
      setSummary(selectedMatch.summary || '');
    }
  }, [selectedId, selectedMatch]);

  const handleUpdate = async () => {
    setStatus('loading');
    const result = await updateMatchScore(selectedId, { score, overs, summary });
    if (result.success) {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-2 text-accent">Live Score Editor</h1>
        <p className="text-muted-foreground font-medium">Update real-time match data directly from the control panel</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Match Selection */}
        <div className="space-y-6">
          <h2 className="text-xl font-black italic uppercase tracking-tighter">Active Matches</h2>
          <div className="space-y-4">
            {matches.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedId(m.id)}
                className={`w-full p-6 rounded-[2rem] glass border text-left transition-all ${
                  selectedId === m.id ? 'border-accent bg-accent/5' : 'border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-accent">{m.status}</span>
                  <span className="text-[10px] text-muted-foreground font-bold">{m.format}</span>
                </div>
                <p className="font-black italic uppercase text-sm leading-tight">{m.title}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Editor Form */}
        <div className="lg:col-span-2">
          {selectedId ? (
            <div className="glass p-10 rounded-[3rem] border border-white/5 space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center font-black italic text-background">E</div>
                <div>
                  <h3 className="text-2xl font-black italic uppercase">Editing: {selectedMatch?.title}</h3>
                  <p className="text-xs text-muted-foreground font-bold uppercase">Control Panel v2.1</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">Current Score</label>
                  <input 
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                    placeholder="e.g. 152/4"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 font-black italic text-xl focus:border-accent outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">Overs Completed</label>
                  <input 
                    value={overs}
                    onChange={(e) => setOvers(e.target.value)}
                    placeholder="e.g. 15.2"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 font-black italic text-xl focus:border-accent outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">Match Summary / Status Line</label>
                <textarea 
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  rows={3}
                  placeholder="e.g. Pakistan need 263 runs to win. Day 5, Sessions 2."
                  className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-4 font-bold text-sm focus:border-accent outline-none transition-all resize-none"
                />
              </div>

              <div className="pt-8 flex items-center justify-between">
                <div>
                  {status === 'success' && <p className="text-accent text-xs font-black italic animate-bounce">✓ Matches.json updated successfully!</p>}
                  {status === 'error' && <p className="text-red-500 text-xs font-black italic">✗ Failed to update match data.</p>}
                </div>
                <button 
                  onClick={handleUpdate}
                  disabled={status === 'loading'}
                  className="bg-accent text-background font-black italic uppercase tracking-widest px-10 py-4 rounded-2xl text-xs hover:shadow-[0_0_40px_rgba(0,255,136,0.5)] transition-all disabled:opacity-50"
                >
                  {status === 'loading' ? 'Publishing...' : 'Update Live Score'}
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full glass rounded-[3rem] border border-white/5 flex flex-col items-center justify-center p-12 text-center opacity-40">
              <div className="w-20 h-20 border-4 border-dashed border-white/20 rounded-full mb-6"></div>
              <p className="font-black italic uppercase tracking-tighter text-xl">Select a match to start editing</p>
              <p className="text-xs text-muted-foreground mt-2">Real-time updates will be reflected across all users immediately.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
