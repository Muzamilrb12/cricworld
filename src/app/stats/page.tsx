export default function StatsPage() {
  const orangeCap = [
    { rank: 1, player: "Virat Kohli", team: "RCB", runs: 642, avg: "64.20", sr: "152.4" },
    { rank: 2, player: "Travis Head", team: "SRH", runs: 588, avg: "49.00", sr: "192.1" },
    { rank: 3, player: "Ruturaj Gaikwad", team: "CSK", runs: 541, avg: "54.10", sr: "145.8" },
    { rank: 4, player: "Sunil Narine", team: "KKR", runs: 482, avg: "40.17", sr: "180.5" },
    { rank: 5, player: "Rishabh Pant", team: "DC", runs: 446, avg: "44.60", sr: "155.2" },
  ];

  const purpleCap = [
    { rank: 1, player: "Jasprit Bumrah", team: "MI", wickets: 22, eco: "6.42", avg: "15.4" },
    { rank: 2, player: "Harshal Patel", team: "PBKS", wickets: 20, eco: "9.10", avg: "18.2" },
    { rank: 3, player: "Varun Chakaravarthy", team: "KKR", wickets: 19, eco: "7.80", avg: "20.1" },
    { rank: 4, player: "T Natarajan", team: "SRH", wickets: 17, eco: "8.90", avg: "22.5" },
    { rank: 5, player: "Yuzvendra Chahal", team: "RR", wickets: 16, eco: "8.50", avg: "24.1" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2 italic uppercase tracking-tighter">IPL 2026 Statistics</h1>
        <p className="text-muted-foreground font-medium">Tournament leaders, records, and season highlights</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Orange Cap */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.4)]">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
              </svg>
            </div>
            <h2 className="text-2xl font-black italic uppercase tracking-tighter">Orange Cap (Most Runs)</h2>
          </div>
          
          <div className="glass rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 font-bold text-muted-foreground uppercase">
                <tr>
                  <th className="px-6 py-4">Rank</th>
                  <th className="px-6 py-4">Player</th>
                  <th className="px-6 py-4 text-right">Runs</th>
                  <th className="px-6 py-4 text-right">SR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {orangeCap.map((p) => (
                  <tr key={p.rank} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4 font-black italic text-muted-foreground/30">{p.rank}</td>
                    <td className="px-6 py-4">
                      <p className="font-bold group-hover:text-orange-500 transition-colors">{p.player}</p>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">{p.team}</p>
                    </td>
                    <td className="px-6 py-4 text-right font-black text-orange-500 text-lg">{p.runs}</td>
                    <td className="px-6 py-4 text-right text-muted-foreground">{p.sr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Purple Cap */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(147,51,234,0.4)]">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
              </svg>
            </div>
            <h2 className="text-2xl font-black italic uppercase tracking-tighter">Purple Cap (Most Wickets)</h2>
          </div>
          
          <div className="glass rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 font-bold text-muted-foreground uppercase">
                <tr>
                  <th className="px-6 py-4">Rank</th>
                  <th className="px-6 py-4">Player</th>
                  <th className="px-6 py-4 text-right">Wkts</th>
                  <th className="px-6 py-4 text-right">Eco</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {purpleCap.map((p) => (
                  <tr key={p.rank} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4 font-black italic text-muted-foreground/30">{p.rank}</td>
                    <td className="px-6 py-4">
                      <p className="font-bold group-hover:text-purple-500 transition-colors">{p.player}</p>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">{p.team}</p>
                    </td>
                    <td className="px-6 py-4 text-right font-black text-purple-500 text-lg">{p.wickets}</td>
                    <td className="px-6 py-4 text-right text-muted-foreground">{p.eco}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Season Records */}
      <div className="mt-16">
        <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-8 text-accent">Season Records</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass p-8 rounded-3xl border border-white/5">
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-2">Most Sixes</p>
            <h3 className="text-2xl font-black italic">Abhishek Sharma</h3>
            <p className="text-4xl font-black text-accent mt-2">42</p>
            <p className="text-xs text-muted-foreground mt-1">SRH • 12 Matches</p>
          </div>
          <div className="glass p-8 rounded-3xl border border-white/5">
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-2">Best Figures</p>
            <h3 className="text-2xl font-black italic">Jasprit Bumrah</h3>
            <p className="text-4xl font-black text-accent mt-2">5/14</p>
            <p className="text-xs text-muted-foreground mt-1">vs KKR • Wankhede</p>
          </div>
          <div className="glass p-8 rounded-3xl border border-white/5">
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-2">Fastest 100</p>
            <h3 className="text-2xl font-black italic">Travis Head</h3>
            <p className="text-4xl font-black text-accent mt-2">39 Balls</p>
            <p className="text-xs text-muted-foreground mt-1">vs RCB • M. Chinnaswamy</p>
          </div>
        </div>
      </div>
    </div>
  );
}
