import leaguesData from "../../../../data/leagues.json";
import leagueMatchesData from "../../../../data/league_matches.json";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function LeagueDetailPage({ params }: PageProps) {
  const { id } = await params;
  const league = (leaguesData as any[]).find((l: any) => l.id === id);
  const matches = (leagueMatchesData as any)[id] || [];

  if (!league) return notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="glass p-8 rounded-3xl mb-8 flex flex-col md:flex-row items-center gap-8 border-accent/20 border">
        <div className="w-24 h-24 glass rounded-2xl flex items-center justify-center font-bold text-4xl text-accent shadow-[0_0_30px_rgba(0,255,136,0.2)]">
          {league.logo}
        </div>
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <h1 className="text-4xl font-bold">{league.fullName}</h1>
            {league.status === "LIVE" && (
              <span className="px-2 py-0.5 rounded bg-accent/20 border border-accent/30 text-xs font-bold text-accent animate-pulse">
                LIVE
              </span>
            )}
          </div>
          <p className="text-muted-foreground mb-4">{league.country} • {league.teams} Teams • Official Website: <a href={league.officialUrl} target="_blank" className="text-accent hover:underline">{league.officialUrl}</a></p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <div className="glass px-4 py-2 rounded-xl text-center">
              <p className="text-[10px] text-muted-foreground uppercase font-bold">Matches</p>
              <p className="font-bold">74</p>
            </div>
            <div className="glass px-4 py-2 rounded-xl text-center">
              <p className="text-[10px] text-muted-foreground uppercase font-bold">Venue</p>
              <p className="font-bold">Various</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Match Schedule & Results</h2>
            <div className="text-xs text-muted-foreground italic">Powered by Official League Data</div>
          </div>
          {matches.length > 0 ? (
            matches.map((match: any) => (
              <div key={match.id} className="glass p-6 rounded-2xl flex items-center justify-between hover:bg-white/5 transition-colors">
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground mb-2">{match.date} • {match.time}</div>
                  <div className="flex items-center gap-4 text-xl font-bold">
                    <span>{match.teams[0]}</span>
                    <span className="text-xs text-muted-foreground font-normal italic">vs</span>
                    <span>{match.teams[1]}</span>
                  </div>
                </div>
                <div className="text-right">
                  {match.status === "Finished" ? (
                    <div className="bg-white/5 px-4 py-2 rounded-xl">
                      <p className="text-[10px] text-muted-foreground uppercase font-bold">Result</p>
                      <p className="text-xs font-bold text-accent">{match.result}</p>
                    </div>
                  ) : (
                    <div className="bg-accent/10 px-4 py-2 rounded-xl">
                      <p className="text-[10px] text-accent uppercase font-bold">Upcoming</p>
                      <p className="text-xs font-bold">Not Started</p>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center glass rounded-2xl">
              <p className="text-muted-foreground">No matches found for this league.</p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-4">Points Table</h2>
          <div className="glass rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-white/5 text-xs text-muted-foreground font-bold uppercase">
                <tr>
                  <th className="px-4 py-3 text-left">Team</th>
                  <th className="px-4 py-3">P</th>
                  <th className="px-4 py-3">W</th>
                  <th className="px-4 py-3">Pts</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr className="hover:bg-white/5 transition-colors text-center">
                  <td className="px-4 py-3 font-bold text-left">Team A</td>
                  <td className="px-4 py-3">2</td>
                  <td className="px-4 py-3">2</td>
                  <td className="px-4 py-3 text-accent font-bold">4</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors text-center">
                  <td className="px-4 py-3 font-bold text-left">Team B</td>
                  <td className="px-4 py-3">2</td>
                  <td className="px-4 py-3">1</td>
                  <td className="px-4 py-3 text-accent font-bold">2</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

