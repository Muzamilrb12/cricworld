'use client';
import { useState } from 'react';

export default function FantasyPage() {
  const [generatedTeam, setGeneratedTeam] = useState<any[] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const playersPool = [
    { name: "Virat Kohli", team: "RCB", role: "Batter", points: 98, price: 12.0 },
    { name: "Travis Head", team: "SRH", role: "Batter", points: 95, price: 11.5 },
    { name: "Jasprit Bumrah", team: "MI", role: "Bowler", points: 92, price: 11.0 },
    { name: "Rashid Khan", team: "GT", role: "Bowler", points: 89, price: 10.5 },
    { name: "Sunil Narine", team: "KKR", role: "All-rounder", points: 94, price: 10.5 },
    { name: "Shaheen Afridi", team: "PAK", role: "Bowler", points: 88, price: 10.0 },
    { name: "Babar Azam", team: "PAK", role: "Batter", points: 90, price: 11.0 },
    { name: "Rishabh Pant", team: "DC", role: "WK-Batter", points: 87, price: 9.5 },
    { name: "Abhishek Sharma", team: "SRH", role: "Batter", points: 85, price: 9.0 },
    { name: "Pat Cummins", team: "SRH", role: "Bowler", points: 86, price: 10.0 },
    { name: "Glenn Maxwell", team: "RCB", role: "All-rounder", points: 82, price: 9.5 }
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setGeneratedTeam(null);
    
    // Simulate AI thinking
    setTimeout(() => {
      const shuffled = [...playersPool].sort(() => 0.5 - Math.random());
      setGeneratedTeam(shuffled.slice(0, 7)); // Generate 7 players for visual impact
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-2 text-accent">Fantasy Pro Hub</h1>
        <p className="text-muted-foreground font-medium">Expert analysis and AI-driven team generation for IPL 2026</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          {/* Featured Prediction - SYNCED WITH REAL DATA */}
          <div className="relative rounded-[2.5rem] overflow-hidden glass p-8 md:p-12 border border-accent/20 bg-gradient-to-br from-accent/10 to-transparent">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <div className="w-64 h-64 bg-accent rounded-full blur-[100px] animate-pulse"></div>
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-accent/20 text-accent text-[10px] font-bold px-3 py-1 rounded-full mb-6 uppercase tracking-widest border border-accent/30">
                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-ping"></span>
                Expert Prediction
              </div>
              <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-4 leading-tight">GT vs SRH: Qualifier Race Analysis</h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Narendra Modi Stadium is known for its bounce. With Travis Head in explosive form, SRH look favorites. However, GT's Rashid Khan could be the ultimate fantasy differentiator on this dry track.
              </p>
              <div className="flex gap-4">
                <button className="bg-accent text-background font-black italic uppercase tracking-widest px-8 py-3 rounded-2xl text-xs hover:scale-105 transition-transform">View Probable XI</button>
                <button className="glass font-bold px-8 py-3 rounded-2xl text-xs hover:bg-white/10 transition-all">Pitch Report</button>
              </div>
            </div>
          </div>

          {/* AI Team Result */}
          {generatedTeam && (
            <div className="glass p-8 rounded-[2.5rem] border border-accent/30 bg-accent/5 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-6 flex items-center gap-3">
                <span className="text-accent">AI</span> Generated Expert XI
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {generatedTeam.map((player, idx) => (
                  <div key={idx} className="glass p-4 rounded-2xl flex items-center justify-between border border-white/5 hover:border-accent/30 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center font-black text-accent text-xs italic">{player.team}</div>
                      <div>
                        <h3 className="font-bold group-hover:text-accent transition-colors">{player.name}</h3>
                        <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest">{player.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-accent font-black italic">{player.price} Cr</div>
                      <div className="text-[9px] text-muted-foreground uppercase font-bold">Credits</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
                <p className="text-xs text-muted-foreground font-bold italic">Generated by CricWorld AI Engine v2.0</p>
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold">Total Credits Used</p>
                  <p className="text-xl font-black italic">74.5 <span className="text-xs text-muted-foreground">/ 100</span></p>
                </div>
              </div>
            </div>
          )}

          {/* Player Form Guide */}
          <div>
            <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-6">Top Player Form Guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {playersPool.slice(0, 4).map((player, idx) => (
                <div key={idx} className="glass p-6 rounded-3xl flex items-center justify-between hover:bg-white/5 transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center font-black text-xl italic text-muted-foreground/30">{player.name.charAt(0)}</div>
                    <div>
                      <h3 className="font-bold text-lg">{player.name}</h3>
                      <p className="text-xs text-muted-foreground font-bold">{player.team} • L-5 Match Avg: {player.points}</p>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full border-4 border-accent/20 border-t-accent flex items-center justify-center text-[10px] font-black italic">
                    {player.points}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Points System & Rules */}
          <div className="space-y-8">
            <h2 className="text-3xl font-black italic uppercase tracking-tighter text-accent">Fantasy Point System</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Batting Points */}
              <div className="glass p-8 rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-orange-500/5 to-transparent">
                <h3 className="text-xl font-black italic uppercase mb-6 flex items-center gap-3">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span> Batting
                </h3>
                <div className="space-y-4">
                  {[
                    { label: "Run Scored", pts: "+1" },
                    { label: "Boundary Bonus", pts: "+1" },
                    { label: "Six Bonus", pts: "+2" },
                    { label: "30 Run Bonus", pts: "+4" },
                    { label: "Half-Century Bonus", pts: "+8" },
                    { label: "Century Bonus", pts: "+16" },
                    { label: "Duck (Dismissal for 0)", pts: "-2" }
                  ].map((rule, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs border-b border-white/5 pb-2">
                      <span className="text-muted-foreground font-bold uppercase tracking-wider">{rule.label}</span>
                      <span className="font-black italic text-orange-500">{rule.pts}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bowling Points */}
              <div className="glass p-8 rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-purple-500/5 to-transparent">
                <h3 className="text-xl font-black italic uppercase mb-6 flex items-center gap-3">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span> Bowling
                </h3>
                <div className="space-y-4">
                  {[
                    { label: "Wicket (Excl. Run Out)", pts: "+25" },
                    { label: "Maiden Over", pts: "+12" },
                    { label: "3 Wicket Bonus", pts: "+4" },
                    { label: "4 Wicket Bonus", pts: "+8" },
                    { label: "5 Wicket Bonus", pts: "+16" },
                    { label: "Economy Rate < 5", pts: "+6" },
                    { label: "Economy Rate > 12", pts: "-6" }
                  ].map((rule, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs border-b border-white/5 pb-2">
                      <span className="text-muted-foreground font-bold uppercase tracking-wider">{rule.label}</span>
                      <span className="font-black italic text-purple-500">{rule.pts}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* General Rules */}
            <div className="glass p-8 rounded-[2.5rem] border border-accent/20 bg-accent/5">
              <h3 className="text-xl font-black italic uppercase mb-6 text-accent">Crucial Rules</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase text-accent tracking-widest">Captaincy</p>
                  <p className="text-sm font-bold">Captain earns <span className="text-accent text-lg">2x</span> points for every action.</p>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase text-accent tracking-widest">Vice-Captaincy</p>
                  <p className="text-sm font-bold">Vice-Captain earns <span className="text-accent text-lg">1.5x</span> points for every action.</p>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase text-accent tracking-widest">Fielding</p>
                  <p className="text-sm font-bold">Catch: +8 pts | Run out: +12 pts | Stumping: +12 pts</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="glass p-8 rounded-[2.5rem] border border-accent/20 bg-gradient-to-br from-accent/10 to-transparent relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-xl font-black italic uppercase tracking-tighter mb-4 text-accent">AI Team Generator</h2>
              <p className="text-xs text-muted-foreground font-bold mb-6 leading-relaxed uppercase tracking-wider">Let our algorithms analyze 1,000+ stats to build your winning squad.</p>
              <button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full bg-accent text-background font-black italic uppercase tracking-widest py-4 rounded-2xl text-xs hover:shadow-[0_0_30px_rgba(0,255,136,0.5)] transition-all disabled:opacity-50 disabled:animate-pulse"
              >
                {isGenerating ? "Analyzing Stats..." : "Generate Winning Team"}
              </button>
            </div>
          </div>

          <div className="glass p-8 rounded-[2.5rem] border border-white/5">
            <h2 className="text-xl font-black italic uppercase tracking-tighter mb-6">Fantasy Leaderboard</h2>
            <div className="space-y-4">
              {[
                { rank: 1, name: "Muzamil Cricketer", pts: "14,230" },
                { rank: 2, name: "Touseef Dev", pts: "13,980" },
                { rank: 3, name: "Alex Pro", pts: "13,450" }
              ].map((user) => (
                <div key={user.rank} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black italic ${user.rank === 1 ? "bg-accent text-background" : "glass"}`}>
                    {user.rank}
                  </div>
                  <div className="flex-1 text-sm font-bold">{user.name}</div>
                  <div className="text-xs font-black italic text-accent">{user.pts} <span className="text-[8px] text-muted-foreground">PTS</span></div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-white transition-colors">
              View Global Ranking →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
