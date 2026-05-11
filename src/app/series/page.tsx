import leaguesData from "../../../data/leagues.json";

export default function SeriesPage() {
  const leagues = leaguesData || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Cricket Series & Leagues</h1>
        <p className="text-muted-foreground">Ongoing and upcoming tournaments worldwide</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* International Series - Mocked for now */}
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-primary rounded-full"></span>
            International Series
          </h2>
          <div className="space-y-4">
            <div className="glass p-6 rounded-2xl hover:bg-white/5 transition-all">
              <h3 className="font-bold text-lg mb-1">Australia tour of Pakistan, 2026</h3>
              <p className="text-sm text-muted-foreground mb-4">3 Tests, 3 ODIs, 1 T20I</p>
              <div className="flex justify-between items-center text-xs">
                <span className="text-accent bg-accent/10 px-2 py-1 rounded">Ongoing</span>
                <span className="text-muted-foreground">May 2026 - Jun 2026</span>
              </div>
            </div>
            <div className="glass p-6 rounded-2xl hover:bg-white/5 transition-all">
              <h3 className="font-bold text-lg mb-1">South Africa tour of India, 2026</h3>
              <p className="text-sm text-muted-foreground mb-4">3 ODIs, 5 T20Is</p>
              <div className="flex justify-between items-center text-xs">
                <span className="text-accent bg-accent/10 px-2 py-1 rounded">Ongoing</span>
                <span className="text-muted-foreground">May 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* League Cricket */}
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-accent rounded-full"></span>
            T20 Leagues
          </h2>
          <div className="space-y-4">
            {leagues.map((league: any) => (
              <div key={league.id} className="glass p-6 rounded-2xl hover:bg-white/5 transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg group-hover:text-accent transition-colors">{league.name}</h3>
                    <p className="text-sm text-muted-foreground">{league.teams} Teams • {league.matches} Matches</p>
                  </div>
                  <div className="w-10 h-10 glass rounded-lg flex items-center justify-center font-bold text-xs text-accent">
                    {league.logo}
                  </div>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className={`px-2 py-1 rounded ${
                    league.status === "Ongoing" ? "bg-accent/10 text-accent" : "bg-white/5 text-muted-foreground"
                  }`}>
                    {league.status}
                  </span>
                  <button className="text-accent hover:underline font-bold">Points Table →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
