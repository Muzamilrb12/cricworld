import rankingsData from "../../../data/rankings.json";
import Link from "next/link";

export default function RankingsPage() {
  const rankings = rankingsData || { teams: { test: [], odi: [], t20i: [] }, players: { odi_batting: [] } };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Official ICC Rankings</h1>
        <p className="text-muted-foreground">Latest real-time rankings sourced from ICC official data</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Team Rankings */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Men's Team Rankings (ODI)</h2>
          </div>
          <div className="glass rounded-2xl overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-white/5 text-xs font-bold text-muted-foreground uppercase">
                <tr>
                  <th className="px-6 py-4">Rank</th>
                  <th className="px-6 py-4">Team</th>
                  <th className="px-6 py-4 text-right">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {rankings.teams.odi.map((item: any) => (
                  <tr key={item.rank} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4 font-bold text-accent">{item.rank}</td>
                    <td className="px-6 py-4 font-bold">
                      <Link href={`/teams/${item.team.toLowerCase()}`} className="hover:text-accent transition-colors">
                        {item.team}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-right">{item.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Player Rankings */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">ODI Batting Rankings</h2>
          </div>
          <div className="space-y-4">
            {rankings.players.odi_batting.map((player: any, idx: number) => (
              <Link href={`/players/${player.name.toLowerCase().replace(" ", "-")}`} key={idx} className="glass p-4 rounded-2xl flex items-center justify-between hover:scale-[1.01] transition-transform group">
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-bold text-muted-foreground/30 w-8">{player.rank}</div>
                  <div>
                    <h3 className="font-bold group-hover:text-accent transition-colors">{player.name}</h3>
                    <p className="text-[10px] text-muted-foreground uppercase">{player.team} • ODI Batting</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-accent">{player.rating}</div>
                  <div className="text-[10px] text-muted-foreground uppercase">Points</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


