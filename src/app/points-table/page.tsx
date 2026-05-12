'use client';
import { useState } from 'react';
import pointsTableData from "../../../data/points-table.json";

export default function PointsTablePage() {
  const leagues = Object.keys(pointsTableData);
  const [activeLeague, setActiveLeague] = useState(leagues[0] || "ipl-2026");
  
  const currentPoints = (pointsTableData as any)[activeLeague] || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2 italic uppercase tracking-tighter">Points Table</h1>
        <p className="text-muted-foreground">Live standings from Cricbuzz — IPL 2026</p>
      </div>

      <div className="flex gap-4 mb-8 overflow-x-auto pb-4 scrollbar-hide">
        {leagues.map((league) => (
          <button 
            key={league} 
            onClick={() => setActiveLeague(league)}
            className={`px-6 py-2 rounded-xl glass text-xs font-bold whitespace-nowrap transition-all border ${
              activeLeague === league 
                ? "border-accent text-accent shadow-[0_0_15px_rgba(0,255,136,0.2)]" 
                : "border-white/5 text-muted-foreground hover:text-white"
            }`}
          >
            {league.toUpperCase().replace("-", " ")}
          </button>
        ))}
      </div>

      <div className="glass rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-xs font-bold text-muted-foreground uppercase tracking-widest">
            <tr>
              <th className="px-6 py-6">#</th>
              <th className="px-6 py-6">Team</th>
              <th className="px-6 py-6 text-center">P</th>
              <th className="px-6 py-6 text-center">W</th>
              <th className="px-6 py-6 text-center">L</th>
              <th className="px-6 py-6 text-center">NRR</th>
              <th className="px-6 py-6 text-right">Pts</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {currentPoints.map((item: any) => {
              const isEliminated = item.status === "Eliminated";
              const isTopFour = item.rank <= 4;
              return (
                <tr key={item.rank} className={`hover:bg-white/5 transition-colors group ${isEliminated ? "opacity-50" : ""}`}>
                  <td className="px-6 py-4 font-black italic text-muted-foreground/30">{item.rank}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 glass rounded-lg flex items-center justify-center font-bold text-[10px] transition-colors ${isTopFour ? "group-hover:text-accent" : "group-hover:text-red-400"}`}>{item.team}</div>
                      <div>
                        <span className={`font-bold transition-colors ${isTopFour ? "group-hover:text-accent" : ""}`}>{item.fullName}</span>
                        {isEliminated && <span className="ml-2 text-[9px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded font-bold uppercase">Eliminated</span>}
                        {isTopFour && <span className="ml-2 text-[9px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded font-bold uppercase">Qualified</span>}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center font-medium">{item.p}</td>
                  <td className="px-6 py-4 text-center font-medium text-green-400">{item.w}</td>
                  <td className="px-6 py-4 text-center font-medium text-red-400">{item.l}</td>
                  <td className="px-6 py-4 text-center text-xs font-mono">{item.nrr}</td>
                  <td className="px-6 py-4 text-right">
                    <span className={`px-4 py-1.5 rounded-lg font-black italic ${isEliminated ? "bg-red-500/10 text-red-400" : "bg-accent/10 text-accent"}`}>
                      {item.pts}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Qualification Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        <div className="glass p-8 rounded-3xl border border-white/5 bg-gradient-to-br from-accent/5 to-transparent">
          <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-6">Playoff Picture</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                <span className="text-xs font-bold text-green-400 uppercase">Qualified</span>
              </div>
              <p className="font-bold">Royal Challengers Bengaluru (RCB)</p>
              <p className="text-xs text-muted-foreground mt-1">RCB are sitting at the top of the table. RCB won their last match against MI.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                <span className="text-xs font-bold text-red-400 uppercase">Eliminated</span>
              </div>
              <p className="font-bold">Mumbai Indians (MI) & Lucknow Super Giants (LSG)</p>
              <p className="text-xs text-muted-foreground mt-1">Both MI and LSG have been eliminated from the playoff race.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 border-l-4 border-l-accent">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></span>
                <span className="text-xs font-bold text-accent uppercase">Battle for Top 4</span>
              </div>
              <p className="font-bold">DC won vs PBKS — keeps playoff hopes alive</p>
              <p className="text-xs text-muted-foreground mt-1">Miller, Axar & Ashutosh kept DC alive with a stunning chase. Four losses for PBKS — alarm bells for Shreyas & Ponting.</p>
            </div>
          </div>
        </div>

        <div className="glass p-8 rounded-3xl border border-white/5">
          <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-6 text-accent">Latest IPL News</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
              <p className="font-bold text-sm">Miller&apos;s garbage truck and Ponting&apos;s restraint</p>
              <p className="text-[10px] text-muted-foreground mt-1 uppercase">IPL Pulse • Cricbuzz</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
              <p className="font-bold text-sm">PBKS&apos; batting blaze masks a bowling freefall</p>
              <p className="text-[10px] text-muted-foreground mt-1 uppercase">Analysis • Cricbuzz</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
              <p className="font-bold text-sm">Can Delhi still qualify for the IPL 2026 playoffs?</p>
              <p className="text-[10px] text-muted-foreground mt-1 uppercase">Video Analysis • Cricbuzz</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
              <p className="font-bold text-sm">Rahul Dravid announced as owner of Dublin Guardians</p>
              <p className="text-[10px] text-muted-foreground mt-1 uppercase">Breaking News • Cricbuzz</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
