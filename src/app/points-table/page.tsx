'use client';
import { useState } from 'react';
import ptData from "../../../data/points-table.json";

type MainTab = "icc-rankings" | "leagues";
type ICCFormat = "test" | "odi" | "t20i";

export default function PointsTablePage() {
  const [mainTab, setMainTab] = useState<MainTab>("icc-rankings");
  const [iccFormat, setIccFormat] = useState<ICCFormat>("test");
  const [activeLeague, setActiveLeague] = useState("ipl-2026");

  const data = ptData as any;
  const iccRankings = data["icc-rankings"] || {};
  const leagues = data["leagues"] || {};
  const leagueKeys = Object.keys(leagues);

  const currentICC = iccRankings[iccFormat] || [];
  const currentLeague = leagues[activeLeague] || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2 italic uppercase tracking-tighter">Rankings & Points Table</h1>
        <p className="text-muted-foreground">ICC Team Rankings and League Standings — sourced from Cricbuzz</p>
      </div>

      {/* Main Tabs: ICC Rankings vs Leagues */}
      <div className="flex gap-4 mb-10">
        <button
          onClick={() => setMainTab("icc-rankings")}
          className={`px-8 py-3 rounded-2xl font-black italic uppercase tracking-widest text-xs transition-all border ${
            mainTab === "icc-rankings"
              ? "bg-accent text-background border-accent shadow-[0_0_30px_rgba(0,255,136,0.3)]"
              : "glass border-white/5 text-muted-foreground hover:text-white hover:border-white/20"
          }`}
        >
          ICC Rankings
        </button>
        <button
          onClick={() => setMainTab("leagues")}
          className={`px-8 py-3 rounded-2xl font-black italic uppercase tracking-widest text-xs transition-all border ${
            mainTab === "leagues"
              ? "bg-accent text-background border-accent shadow-[0_0_30px_rgba(0,255,136,0.3)]"
              : "glass border-white/5 text-muted-foreground hover:text-white hover:border-white/20"
          }`}
        >
          League Tables
        </button>
      </div>

      {/* ========== ICC RANKINGS SECTION ========== */}
      {mainTab === "icc-rankings" && (
        <div>
          {/* Format Sub-Tabs */}
          <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            {(["test", "odi", "t20i"] as ICCFormat[]).map((fmt) => (
              <button
                key={fmt}
                onClick={() => setIccFormat(fmt)}
                className={`px-6 py-2 rounded-xl glass text-xs font-bold whitespace-nowrap transition-all border ${
                  iccFormat === fmt
                    ? "border-accent text-accent shadow-[0_0_15px_rgba(0,255,136,0.2)]"
                    : "border-white/5 text-muted-foreground hover:text-white"
                }`}
              >
                {fmt === "test" ? "Test" : fmt === "odi" ? "ODI" : "T20I"} Rankings
              </button>
            ))}
          </div>

          <div className="glass rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
            <table className="w-full text-left">
              <thead className="bg-white/5 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                <tr>
                  <th className="px-6 py-6">#</th>
                  <th className="px-6 py-6">Team</th>
                  <th className="px-6 py-6 text-center">Rating</th>
                  <th className="px-6 py-6 text-right">Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {currentICC.map((item: any) => (
                  <tr key={item.rank} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4 font-black italic text-muted-foreground/30">{item.rank}</td>
                    <td className="px-6 py-4">
                      <span className="font-bold group-hover:text-accent transition-colors">{item.team}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-accent/10 text-accent px-3 py-1 rounded-lg font-black italic text-sm">
                        {item.rating}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-muted-foreground font-mono text-sm">{item.pts.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ICC Test Batting Top Players */}
          <div className="mt-12">
            <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-6">
              ICC Test Batting Rankings <span className="text-accent">(Top Players)</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { rank: 1, name: "Joe Root", team: "England" },
                { rank: 2, name: "Harry Brook", team: "England" },
                { rank: 3, name: "Travis Head", team: "Australia" },
                { rank: 4, name: "Steven Smith", team: "Australia" },
                { rank: 5, name: "Kane Williamson", team: "New Zealand" },
                { rank: 6, name: "Kamindu Mendis", team: "Sri Lanka" },
                { rank: 7, name: "Temba Bavuma", team: "South Africa" },
                { rank: 8, name: "Yashasvi Jaiswal", team: "India" },
                { rank: 9, name: "Saud Shakeel", team: "Pakistan" },
                { rank: 10, name: "Shubman Gill", team: "India" },
              ].map((p) => (
                <div key={p.rank} className="glass p-4 rounded-2xl border border-white/5 hover:border-accent/30 transition-all group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-black italic text-muted-foreground/20">{p.rank}</span>
                    <div>
                      <p className="font-bold text-sm group-hover:text-accent transition-colors">{p.name}</p>
                      <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest">{p.team}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========== LEAGUES SECTION ========== */}
      {mainTab === "leagues" && (
        <div>
          {/* League Sub-Tabs */}
          <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            {leagueKeys.map((league) => (
              <button
                key={league}
                onClick={() => setActiveLeague(league)}
                className={`px-6 py-2 rounded-xl glass text-xs font-bold whitespace-nowrap transition-all border ${
                  activeLeague === league
                    ? "border-accent text-accent shadow-[0_0_15px_rgba(0,255,136,0.2)]"
                    : "border-white/5 text-muted-foreground hover:text-white"
                }`}
              >
                {league.toUpperCase().replace(/-/g, " ")}
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
                {currentLeague.map((item: any) => {
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
                            {isTopFour && <span className="ml-2 text-[9px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded font-bold uppercase">Q</span>}
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
        </div>
      )}
    </div>
  );
}
