import playersData from "../../../../data/players.json";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PlayerProfilePage({ params }: PageProps) {
  const { id } = await params;
  const player = (playersData as any[]).find((p: any) => p.id === id);

  if (!player) return notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Profile Section */}
      <div className="relative rounded-3xl overflow-hidden glass p-8 md:p-12 border border-white/5 mb-12">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <div className="text-[120px] font-black italic">{player.image}</div>
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-48 h-48 glass rounded-2xl flex items-center justify-center text-6xl font-black text-accent shadow-[0_0_50px_rgba(0,255,136,0.15)] border border-accent/20">
            {player.image}
          </div>
          <div className="text-center md:text-left">
            <div className="inline-block bg-accent/20 text-accent text-[10px] font-bold px-2 py-0.5 rounded mb-4 uppercase tracking-widest">{player.role}</div>
            <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter italic uppercase">{player.name}</h1>
            <p className="text-xl text-muted-foreground mb-6 font-medium">{player.team}</p>
            <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">{player.bio}</p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="space-y-12">
        <h2 className="text-3xl font-black italic uppercase tracking-tighter">Career Statistics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.entries(player.stats).map(([format, stats]: [string, any]) => (
            <div key={format} className="glass p-6 rounded-3xl border border-white/5 hover:border-accent/30 transition-colors">
              <h3 className="text-xl font-black uppercase text-accent mb-6 italic">{format}</h3>
              <div className="grid grid-cols-2 gap-y-6">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Matches</p>
                  <p className="text-xl font-bold">{stats.matches}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">{player.role === 'Bowler' ? 'Wickets' : 'Runs'}</p>
                  <p className="text-xl font-bold text-accent">{player.role === 'Bowler' ? stats.wickets : stats.runs}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Average</p>
                  <p className="text-xl font-bold">{stats.avg}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">{player.role === 'Bowler' ? 'Economy' : 'Strike Rate'}</p>
                  <p className="text-xl font-bold">{player.role === 'Bowler' ? stats.eco : stats.sr}</p>
                </div>
                {player.role !== 'Bowler' && (
                  <>
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">100s</p>
                      <p className="text-xl font-bold">{stats['100s']}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">50s</p>
                      <p className="text-xl font-bold">{stats['50s']}</p>
                    </div>
                  </>
                )}
                {player.role === 'Bowler' && (
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Best</p>
                    <p className="text-xl font-bold">{stats.best}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
