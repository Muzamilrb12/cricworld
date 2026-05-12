import matchesData from "../../../../data/matches.json";
import commentaryData from "../../../../data/commentary.json";
import PredictionGame from "@/components/PredictionGame";
import LiveChat from "@/components/LiveChat";
import AdBanner from "@/components/AdBanner";
import LiveCommentary from "@/components/LiveCommentary";
import { notFound } from "next/navigation";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function MatchDetailPage({ params }: PageProps) {
  const { id } = await params;
  const match = (matchesData as any[]).find((m: any) => m.id === id);
  const commentary = (commentaryData as any)[id] || [];

  if (!match) return notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Premium Score Hub (Replacing Streaming) */}
      <div className="glass p-10 rounded-[3rem] border border-accent/20 mb-12 bg-gradient-to-br from-zinc-950 via-zinc-950 to-accent/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="w-20 h-20 bg-zinc-900 rounded-[2rem] flex items-center justify-center font-black text-3xl italic border border-white/5 shadow-2xl">
              {match.teams[0].shortName}
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-black italic uppercase tracking-tighter">{match.teams[0].name}</h2>
              <p className="text-2xl font-black italic text-muted-foreground/50">{match.teams[0].score}</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="px-6 py-2 bg-accent/10 border border-accent/30 rounded-full text-accent font-black italic uppercase tracking-widest text-[10px] animate-pulse">
              Live Coverage • {match.format}
            </div>
            <div className="text-center">
              <span className="text-6xl font-black italic text-accent tracking-tighter">VS</span>
              <p className="text-xs text-muted-foreground font-bold mt-2 uppercase tracking-widest">{match.venue}</p>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="w-20 h-20 bg-zinc-900 rounded-[2rem] flex items-center justify-center font-black text-3xl italic border border-white/5 shadow-2xl">
              {match.teams[1].shortName}
            </div>
            <div className="text-center md:text-right">
              <h2 className="text-3xl font-black italic uppercase tracking-tighter">{match.teams[1].name}</h2>
              <p className="text-2xl font-black italic text-accent">{match.teams[1].score}</p>
              {match.teams[1].overs && <p className="text-[10px] text-muted-foreground font-bold uppercase mt-1">Overs: {match.teams[1].overs}</p>}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <p className="text-lg font-black italic uppercase text-white/80 tracking-tight">{match.summary}</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-16">
          
          {/* Detailed Scorecard */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <h2 className="text-4xl font-black italic uppercase tracking-tighter">Full Scorecard</h2>
              <div className="h-px bg-white/10 flex-1"></div>
            </div>

            {match.teams.map((team: any, tIdx: number) => (
              <div key={tIdx} className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h3 className="text-xl font-black italic uppercase text-accent flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                    {team.name} Innings
                  </h3>
                  <span className="text-xl font-black italic">{team.score} ({team.overs})</span>
                </div>

                {/* Batting Card */}
                <div className="glass rounded-3xl overflow-hidden border border-white/5">
                  <table className="w-full text-left">
                    <thead className="bg-white/5 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                      <tr>
                        <th className="px-6 py-4">Batter</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">R</th>
                        <th className="px-6 py-4 text-right">B</th>
                        <th className="px-6 py-4 text-right">4s</th>
                        <th className="px-6 py-4 text-right">6s</th>
                        <th className="px-6 py-4 text-right">SR</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {team.battingScorecard?.map((b: any, bIdx: number) => (
                        <tr key={bIdx} className="hover:bg-white/5 transition-colors group">
                          <td className="px-6 py-4 font-black text-sm italic group-hover:text-accent transition-colors">{b.name}</td>
                          <td className="px-6 py-4 text-xs text-muted-foreground font-medium">{b.status}</td>
                          <td className="px-6 py-4 text-right font-black text-accent">{b.runs}</td>
                          <td className="px-6 py-4 text-right text-xs font-bold">{b.balls}</td>
                          <td className="px-6 py-4 text-right text-xs">{b.fours}</td>
                          <td className="px-6 py-4 text-right text-xs">{b.sixes}</td>
                          <td className="px-6 py-4 text-right text-xs text-muted-foreground">{b.sr}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Bowling Card */}
                <div className="glass rounded-3xl overflow-hidden border border-white/5 opacity-80">
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
                      {team.bowlingScorecard?.map((bo: any, boIdx: number) => (
                        <tr key={boIdx} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 font-black text-sm italic">{bo.name}</td>
                          <td className="px-6 py-4 text-right text-xs font-bold">{bo.overs}</td>
                          <td className="px-6 py-4 text-right text-xs">{bo.maidens}</td>
                          <td className="px-6 py-4 text-right text-xs">{bo.runs}</td>
                          <td className="px-6 py-4 text-right font-black text-lg italic text-red-500">{bo.wickets}</td>
                          <td className="px-6 py-4 text-right text-xs text-muted-foreground">{bo.econ}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>

          {/* Key Moments Section */}
          {match.moments && (
            <div className="space-y-8">
              <h2 className="text-3xl font-black italic uppercase tracking-tighter border-l-4 border-accent pl-6">Key Moments</h2>
              <div className="space-y-4">
                {match.moments.map((m: any, idx: number) => (
                  <div key={idx} className="glass p-6 rounded-3xl border border-white/5 flex gap-6 items-start hover:bg-white/5 transition-all">
                    <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex flex-col items-center justify-center shrink-0 border border-white/5">
                      <span className="text-[10px] font-black uppercase text-muted-foreground">Over</span>
                      <span className="text-xl font-black italic text-accent">{m.over}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest bg-accent/10 text-accent px-2 py-0.5 rounded mb-2 inline-block">
                        {m.event}
                      </span>
                      <p className="font-bold text-sm text-white/90 leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Head to Head Stats */}
          {match.headToHead && (
            <div className="glass p-10 rounded-[3rem] border border-white/5 bg-gradient-to-br from-white/5 to-transparent">
              <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-8">Head to Head (Last 12 Months)</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 text-center">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Total Played</p>
                  <p className="text-4xl font-black italic">{match.headToHead.lastYearMatches}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-accent tracking-widest">{match.teams[1].shortName} Wins</p>
                  <p className="text-4xl font-black italic text-accent">{match.headToHead.pakWins}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{match.teams[0].shortName} Wins</p>
                  <p className="text-4xl font-black italic text-muted-foreground/30">{match.headToHead.banWins}</p>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4">Recent Encounters</p>
                {match.headToHead.recentScores.map((res: any, idx: number) => (
                  <div key={idx} className="p-4 bg-white/5 rounded-2xl border border-white/5 flex justify-between items-center text-xs">
                    <div>
                      <p className="font-black italic uppercase text-accent">{res.event}</p>
                      <p className="text-muted-foreground font-bold">{res.score}</p>
                    </div>
                    <span className="font-black italic uppercase tracking-tighter">{res.result}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <LiveCommentary initialCommentary={commentary} isLive={match.status === "Live"} />
        </div>

        {/* Sidebar */}
        <div className="space-y-12">
          <PredictionGame />
          <LiveChat />
          <AdBanner type="vertical" label="Elite Betting Partner" />
          
          {/* Match Info Sidebar */}
          <div className="glass p-8 rounded-[3rem] border border-white/5 space-y-6">
            <h3 className="text-xl font-black italic uppercase tracking-tighter text-accent">Match Info</h3>
            <div className="space-y-4">
              {[
                { label: "Toss", val: match.toss },
                { label: "Umpires", val: match.umpires?.join(", ") },
                { label: "Venue", val: match.venue },
                { label: "Date", val: match.date }
              ].map((info, idx) => (
                <div key={idx} className="pb-4 border-b border-white/5 last:border-0 last:pb-0">
                  <p className="text-[9px] font-black uppercase text-muted-foreground tracking-widest mb-1">{info.label}</p>
                  <p className="text-xs font-bold leading-tight">{info.val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
