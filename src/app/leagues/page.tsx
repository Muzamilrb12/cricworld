import leaguesData from "../../../data/leagues.json";
import Link from "next/link";

export default function LeaguesPage() {
  const leagues = leaguesData || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">T20 Leagues</h1>
        <p className="text-muted-foreground">Comprehensive coverage of all cricket leagues worldwide</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {leagues.map((league: any) => (
          <Link 
            href={`/leagues/${league.id}`} 
            key={league.id}
            className="glass p-6 rounded-2xl hover:scale-[1.02] transition-all group relative overflow-hidden"
          >
            {league.status === "LIVE" && (
              <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2 py-0.5 rounded bg-accent/20 border border-accent/30 text-[10px] font-bold text-accent animate-pulse">
                <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                LIVE
              </div>
            )}
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 glass rounded-xl flex items-center justify-center font-bold text-xl text-accent group-hover:scale-110 transition-transform">
                {league.logo}
              </div>
              <div>
                <h3 className="text-xl font-bold group-hover:text-accent transition-colors">{league.name}</h3>
                <p className="text-xs text-muted-foreground">{league.country}</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Teams</span>
                <span className="font-bold">{league.teams}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Format</span>
                <span className="font-bold">T20</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                {league.status}
              </span>
              <span className="text-accent text-xs font-bold group-hover:translate-x-1 transition-transform">
                View Details →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
