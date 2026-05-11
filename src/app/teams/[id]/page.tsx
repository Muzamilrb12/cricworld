import teamsData from "../../../../data/teams.json";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TeamProfilePage({ params }: PageProps) {
  const { id } = await params;
  const team = (teamsData as any[]).find((t: any) => t.id === id);

  if (!team) return notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Team Section */}
      <div className="relative rounded-3xl overflow-hidden glass p-8 md:p-12 border border-white/5 mb-12 bg-gradient-to-br from-accent/5 to-transparent">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-40 h-40 glass rounded-full flex items-center justify-center text-6xl font-black text-accent shadow-[0_0_50px_rgba(0,255,136,0.1)] border-4 border-accent/20">
            {team.shortName}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter uppercase italic">{team.name}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 mb-8">
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-1">Captain</p>
                <p className="font-bold text-lg">{team.captain}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-1">Head Coach</p>
                <p className="font-bold text-lg">{team.coach}</p>
              </div>
            </div>
            <div className="flex gap-4 justify-center md:justify-start">
              <div className="glass px-4 py-2 rounded-xl text-center">
                <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Test Rank</p>
                <p className="text-xl font-black text-accent">#{team.rankings.test}</p>
              </div>
              <div className="glass px-4 py-2 rounded-xl text-center">
                <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">ODI Rank</p>
                <p className="text-xl font-black text-accent">#{team.rankings.odi}</p>
              </div>
              <div className="glass px-4 py-2 rounded-xl text-center">
                <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">T20 Rank</p>
                <p className="text-xl font-black text-accent">#{team.rankings.t20i}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* Key Players / Squad */}
          <div>
            <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-8">Key Players</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {team.squad.map((player: string) => (
                <div key={player} className="glass p-6 rounded-2xl flex items-center justify-between group hover:bg-white/5 transition-all">
                  <span className="font-bold text-lg group-hover:text-accent transition-colors">{player}</span>
                  <div className="w-8 h-8 glass rounded-full flex items-center justify-center text-[10px] font-bold text-muted-foreground">→</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Results */}
          <div>
            <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-8 text-accent">Recent Form</h2>
            <div className="flex gap-4 flex-wrap">
              {team.recentMatches.map((match: string, idx: number) => (
                <div key={idx} className="glass px-6 py-4 rounded-2xl border-l-4 border-accent">
                  <p className="font-bold italic">{match}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="glass p-8 rounded-3xl border border-white/5">
            <h2 className="text-xl font-black uppercase italic mb-6">Upcoming Fixtures</h2>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <p className="text-[10px] text-accent font-bold uppercase mb-2">ODI Series</p>
                <p className="font-bold">vs Australia</p>
                <p className="text-xs text-muted-foreground">May 24, 2026 • Lahore</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <p className="text-[10px] text-accent font-bold uppercase mb-2">T20 Series</p>
                <p className="font-bold">vs England</p>
                <p className="text-xs text-muted-foreground">Jun 12, 2026 • London</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
