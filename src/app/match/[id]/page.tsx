import matchesData from "../../../../data/matches.json";
import commentaryData from "../../../../data/commentary.json";
import PredictionGame from "@/components/PredictionGame";
import LiveChat from "@/components/LiveChat";
import AdBanner from "@/components/AdBanner";
import LiveCommentary from "@/components/LiveCommentary";
import { notFound } from "next/navigation";

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
      {/* Live Stream Area */}
      <div className="relative aspect-video w-full rounded-3xl overflow-hidden glass border border-accent/20 mb-8 bg-zinc-900 group">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center">
            <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_50px_rgba(0,255,136,0.4)] group-hover:scale-110 transition-transform cursor-pointer">
              <svg className="w-10 h-10 text-background ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <p className="text-white font-black italic uppercase tracking-widest text-sm">Direct Broadcast Stream</p>
            <p className="text-accent text-[10px] font-bold mt-1 uppercase">Powered by Global Media Rights</p>
          </div>
        </div>
        
        <div className="absolute bottom-6 left-6 z-20 flex items-center gap-4">
          <div className="px-3 py-1 bg-red-600 text-white text-[10px] font-bold rounded flex items-center gap-1.5 animate-pulse">
            <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
            LIVE
          </div>
          <span className="text-white/60 text-xs font-medium">1080p | 60FPS</span>
        </div>
      </div>

      {/* Match Meta Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="glass p-6 rounded-2xl border border-white/5">
          <h2 className="text-xl font-black italic uppercase mb-4 text-accent">Match Details</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-xs border-b border-white/5 pb-2">
              <span className="text-muted-foreground uppercase font-bold tracking-widest">Toss</span>
              <span className="font-bold text-right ml-4">{match.toss}</span>
            </div>
            <div className="flex justify-between text-xs border-b border-white/5 pb-2">
              <span className="text-muted-foreground uppercase font-bold tracking-widest">Umpires</span>
              <span className="font-bold text-right ml-4">{match.umpires?.join(", ")}</span>
            </div>
            <div className="flex justify-between text-xs border-b border-white/5 pb-2">
              <span className="text-muted-foreground uppercase font-bold tracking-widest">3rd Umpire</span>
              <span className="font-bold text-right ml-4">{match.thirdUmpire}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground uppercase font-bold tracking-widest">Match Date</span>
              <span className="font-bold">{match.date}</span>
            </div>
          </div>
        </div>
        <div className="glass p-6 rounded-2xl border border-white/5">
          <h2 className="text-xl font-black italic uppercase mb-4 text-accent">Match Summary</h2>
          <p className="text-sm font-bold leading-relaxed mb-6">{match.summary}</p>
          <div className="pt-4 border-t border-white/5">
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest block mb-1">Man of the Match</span>
            <p className="font-black italic uppercase text-2xl text-accent">{match.manOfTheMatch}</p>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-12">
          
          {/* Full Scorecard */}
          <div className="space-y-8">
            <h2 className="text-3xl font-black italic uppercase tracking-tighter">Innings Scorecard</h2>
            
            {match.teams.map((team: any, tIdx: number) => (
              <div key={tIdx} className="space-y-6">
                <div className="flex items-center justify-between border-b-2 border-accent/20 pb-2">
                  <h3 className="text-xl font-black italic uppercase text-accent">{team.name} Scorecard</h3>
                  <div className="text-right">
                    <span className="text-2xl font-black">{team.score}</span>
                    {team.overs && <span className="text-xs text-muted-foreground ml-2">({team.overs} Ov)</span>}
                  </div>
                </div>

                {/* Batting Card (Only if data exists) */}
                {team.battingScorecard && team.battingScorecard.length > 0 && (
                  <div className="glass rounded-2xl overflow-hidden border border-white/5">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-white/5 text-muted-foreground font-bold uppercase">
                        <tr>
                          <th className="px-4 py-3">Batter</th>
                          <th className="px-4 py-3">Status</th>
                          <th className="px-4 py-3 text-right">R</th>
                          <th className="px-4 py-3 text-right">B</th>
                          <th className="px-4 py-3 text-right">4s</th>
                          <th className="px-4 py-3 text-right">6s</th>
                          <th className="px-4 py-3 text-right">SR</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {team.battingScorecard?.map((b: any, bIdx: number) => (
                          <tr key={bIdx} className="hover:bg-white/5 transition-colors group">
                            <td className="px-4 py-3 font-bold text-white group-hover:text-accent">{b.player}</td>
                            <td className="px-4 py-3 text-muted-foreground italic">{b.status}</td>
                            <td className="px-4 py-3 text-right font-black text-accent">{b.runs}</td>
                            <td className="px-4 py-3 text-right">{b.balls}</td>
                            <td className="px-4 py-3 text-right">{b.fours}</td>
                            <td className="px-4 py-3 text-right">{b.sixes}</td>
                            <td className="px-4 py-3 text-right text-muted-foreground">{b.sr}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Bowling Card (Only if data exists) */}
                {team.bowlingScorecard && team.bowlingScorecard.length > 0 && (
                  <div className="glass rounded-2xl overflow-hidden border border-white/5">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-white/5 text-muted-foreground font-bold uppercase">
                        <tr>
                          <th className="px-4 py-3">Bowler</th>
                          <th className="px-4 py-3 text-right">O</th>
                          <th className="px-4 py-3 text-right">M</th>
                          <th className="px-4 py-3 text-right">R</th>
                          <th className="px-4 py-3 text-right">W</th>
                          <th className="px-4 py-3 text-right">Eco</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {team.bowlingScorecard?.map((bo: any, boIdx: number) => (
                          <tr key={boIdx} className="hover:bg-white/5 transition-colors group">
                            <td className="px-4 py-3 font-bold text-white group-hover:text-accent">{bo.bowler}</td>
                            <td className="px-4 py-3 text-right">{bo.overs}</td>
                            <td className="px-4 py-3 text-right">{bo.maidens}</td>
                            <td className="px-4 py-3 text-right">{bo.runs}</td>
                            <td className="px-4 py-3 text-right font-black text-red-500">{bo.wickets}</td>
                            <td className="px-4 py-3 text-right text-muted-foreground">{bo.eco}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Playing XI Section */}
          <div className="space-y-8">
            <h2 className="text-3xl font-black italic uppercase tracking-tighter">Playing XI Lineups</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {match.teams.map((team: any, tIdx: number) => (
                <div key={tIdx} className="glass p-8 rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-accent/5 to-transparent">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center font-black text-accent italic">{team.shortName}</div>
                    <h3 className="text-xl font-black italic uppercase">{team.name} XI</h3>
                  </div>
                  <div className="space-y-3">
                    {team.playing11?.map((player: string, pIdx: number) => {
                      const playerId = player.toLowerCase().replace(/ \(c\)| \(wk\)/g, "").replace(/ /g, "-");
                      const hasProfile = ["babar-azam", "virat-kohli", "travis-head"].includes(playerId);
                      
                      return (
                        <div key={pIdx} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-accent/30 transition-all group">
                          <span className="text-[10px] font-black italic text-muted-foreground/30 group-hover:text-accent transition-colors">{String(pIdx + 1).padStart(2, '0')}</span>
                          {hasProfile ? (
                            <a href={`/players/${playerId}`} className="text-sm font-bold group-hover:text-accent transition-colors underline decoration-accent/30 underline-offset-4">
                              {player}
                            </a>
                          ) : (
                            <span className="text-sm font-bold group-hover:text-white transition-colors">{player}</span>
                          )}
                          {player.includes("(c)") && <span className="ml-auto text-[8px] bg-accent text-background font-black px-1.5 py-0.5 rounded uppercase">Captain</span>}
                          {player.includes("(wk)") && <span className="ml-auto text-[8px] bg-blue-500 text-white font-black px-1.5 py-0.5 rounded uppercase">Keeper</span>}
                        </div>
                      );
                    }) || (
                      <p className="text-xs text-muted-foreground italic">Lineups not announced yet.</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Commentary Panel */}
          <LiveCommentary initialCommentary={commentary} isLive={match.status === "Live"} />
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <PredictionGame />
          <LiveChat />
          <AdBanner type="vertical" label="Featured Offer" />
        </div>
      </div>
    </div>
  );
}
