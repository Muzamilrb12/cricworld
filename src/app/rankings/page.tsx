'use client';
import { useState } from 'react';
import rankingsData from "../../../data/rankings.json";
import Link from "next/link";

export default function RankingsPage() {
  const [activeFormat, setActiveFormat] = useState<'test' | 'odi' | 't20i'>('odi');
  const rankings = rankingsData as any;

  const formats = [
    { id: 'test', label: 'Test Rankings' },
    { id: 'odi', label: 'ODI Rankings' },
    { id: 't20i', label: 'T20I Rankings' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-2 text-accent">Official ICC Rankings</h1>
        <p className="text-muted-foreground font-medium uppercase tracking-widest text-[10px]">Latest real-time rankings • Updated May 2026</p>
      </div>

      {/* Format Switcher */}
      <div className="flex gap-2 mb-12 p-1 glass rounded-2xl w-fit">
        {formats.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFormat(f.id as any)}
            className={`px-8 py-3 rounded-xl text-xs font-black italic uppercase tracking-widest transition-all ${
              activeFormat === f.id ? 'bg-accent text-background shadow-[0_0_20px_rgba(0,255,136,0.3)]' : 'hover:bg-white/5 text-muted-foreground'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Team Rankings */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black italic uppercase tracking-tighter border-l-4 border-accent pl-4">
              {activeFormat} Team Standings
            </h2>
          </div>
          <div className="glass rounded-[2.5rem] overflow-hidden border border-white/5">
            <table className="w-full text-left">
              <thead className="bg-white/5 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                <tr>
                  <th className="px-8 py-5">Rank</th>
                  <th className="px-8 py-5">Team</th>
                  <th className="px-8 py-5 text-right">Points</th>
                  <th className="px-8 py-5 text-right">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {rankings.teams[activeFormat].map((item: any) => (
                  <tr key={item.rank} className="hover:bg-white/5 transition-colors group">
                    <td className="px-8 py-5">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black italic ${
                        item.rank === 1 ? 'bg-accent text-background' : 'glass text-muted-foreground'
                      }`}>
                        {item.rank}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <Link href={`/teams/${item.team.toLowerCase()}`} className="flex items-center gap-4 group/team">
                        <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center font-black text-xs text-muted-foreground group-hover/team:text-accent transition-colors">
                          {item.team.substring(0, 3).toUpperCase()}
                        </div>
                        <span className="font-black italic uppercase tracking-tighter group-hover/team:text-accent transition-colors">{item.team}</span>
                      </Link>
                    </td>
                    <td className="px-8 py-5 text-right font-bold text-muted-foreground">{item.points.toLocaleString()}</td>
                    <td className="px-8 py-5 text-right font-black text-xl italic text-accent">{item.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Player Rankings Sidebar */}
        <div className="space-y-12">
          {/* Batting Rankings */}
          <section>
            <h2 className="text-xl font-black italic uppercase tracking-tighter mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-accent rounded-full"></span> Top Batters
            </h2>
            <div className="space-y-4">
              {rankings.players[activeFormat].batting.map((player: any, idx: number) => (
                <Link 
                  href={`/players/${player.name.toLowerCase().replace(/ /g, "-")}`} 
                  key={idx} 
                  className="glass p-5 rounded-2xl flex items-center justify-between border border-white/5 hover:border-accent/30 transition-all group relative overflow-hidden"
                >
                  {player.rank === 1 && <div className="absolute top-0 right-0 w-12 h-12 bg-accent/5 rounded-full -mr-6 -mt-6"></div>}
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="text-2xl font-black italic text-muted-foreground/20 w-8">{player.rank}</div>
                    <div>
                      <h3 className="font-black italic uppercase tracking-tighter text-sm group-hover:text-accent transition-colors">{player.name}</h3>
                      <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">{player.team} • {activeFormat.toUpperCase()}</p>
                    </div>
                  </div>
                  <div className="text-right relative z-10">
                    <div className="font-black italic text-accent">{player.rating}</div>
                    <div className="text-[8px] text-muted-foreground uppercase font-black">Rating</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Bowling Rankings */}
          <section>
            <h2 className="text-xl font-black italic uppercase tracking-tighter mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span> Top Bowlers
            </h2>
            <div className="space-y-4">
              {rankings.players[activeFormat].bowling.map((player: any, idx: number) => (
                <div key={idx} className="glass p-5 rounded-2xl flex items-center justify-between border border-white/5 hover:bg-white/5 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl font-black italic text-muted-foreground/20 w-8">{player.rank}</div>
                    <div>
                      <h3 className="font-black italic uppercase tracking-tighter text-sm">{player.name}</h3>
                      <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">{player.team} • {activeFormat.toUpperCase()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-black italic text-purple-500">{player.rating}</div>
                    <div className="text-[8px] text-muted-foreground uppercase font-black">Rating</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
