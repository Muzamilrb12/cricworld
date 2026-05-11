export default function PointsTablePage() {
  const leagues = ["IPL 2026", "PSL 11", "ICC Men's ODI Rankings", "SA20"];
  
  const iplPoints = [
    { rank: 1, team: "PBKS", fullName: "Punjab Kings", p: 13, w: 9, l: 3, nr: 1, nrr: "+1.050", pts: 19 },
    { rank: 2, team: "RCB", fullName: "Royal Challengers Bengaluru", p: 13, w: 9, l: 4, nr: 0, nrr: "+0.825", pts: 18 },
    { rank: 3, team: "MI", fullName: "Mumbai Indians", p: 13, w: 8, l: 5, nr: 0, nrr: "+0.450", pts: 16 },
    { rank: 4, team: "GT", fullName: "Gujarat Titans", p: 13, w: 7, l: 5, nr: 1, nrr: "+0.312", pts: 15 },
    { rank: 5, team: "KKR", fullName: "Kolkata Knight Riders", p: 13, w: 7, l: 6, nr: 0, nrr: "+0.210", pts: 14 },
    { rank: 6, team: "SRH", fullName: "Sunrisers Hyderabad", p: 13, w: 6, l: 7, nr: 0, nrr: "-0.150", pts: 12 },
    { rank: 7, team: "RR", fullName: "Rajasthan Royals", p: 13, w: 6, l: 7, nr: 0, nrr: "-0.245", pts: 12 },
    { rank: 8, team: "CSK", fullName: "Chennai Super Kings", p: 13, w: 5, l: 8, nr: 0, nrr: "-0.312", pts: 10 },
    { rank: 9, team: "DC", fullName: "Delhi Capitals", p: 13, w: 5, l: 8, nr: 0, nrr: "-0.452", pts: 10 },
    { rank: 10, team: "LSG", fullName: "Lucknow Super Giants", p: 13, w: 4, l: 9, nr: 0, nrr: "-0.612", pts: 8 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2 italic uppercase tracking-tighter">Points Table</h1>
        <p className="text-muted-foreground">Live updated standings across all major leagues and tournaments</p>
      </div>

      <div className="flex gap-4 mb-8 overflow-x-auto pb-4 scrollbar-hide">
        {leagues.map((league, idx) => (
          <button 
            key={idx} 
            className={`px-6 py-2 rounded-xl glass text-xs font-bold whitespace-nowrap transition-all border ${
              idx === 0 ? "border-accent text-accent shadow-[0_0_15px_rgba(0,255,136,0.2)]" : "border-white/5 text-muted-foreground hover:text-white"
            }`}
          >
            {league}
          </button>
        ))}
      </div>

      <div className="glass rounded-3xl overflow-hidden border border-white/5">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-xs font-bold text-muted-foreground uppercase tracking-widest">
            <tr>
              <th className="px-6 py-6">Rank</th>
              <th className="px-6 py-6">Team</th>
              <th className="px-6 py-6 text-center">Played</th>
              <th className="px-6 py-6 text-center">Won</th>
              <th className="px-6 py-6 text-center">Lost</th>
              <th className="px-6 py-6 text-center">NRR</th>
              <th className="px-6 py-6 text-right">Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {iplPoints.map((item) => (
              <tr key={item.rank} className="hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4 font-black italic text-muted-foreground/30">{item.rank}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 glass rounded-lg flex items-center justify-center font-bold text-[10px] group-hover:text-accent transition-colors">{item.team}</div>
                    <span className="font-bold group-hover:text-accent transition-colors">{item.fullName}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center font-medium">{item.p}</td>
                <td className="px-6 py-4 text-center font-medium text-green-400">{item.w}</td>
                <td className="px-6 py-4 text-center font-medium text-red-400">{item.l}</td>
                <td className="px-6 py-4 text-center text-xs font-mono">{item.nrr}</td>
                <td className="px-6 py-4 text-right">
                  <span className="bg-accent/10 text-accent px-4 py-1.5 rounded-lg font-black italic">
                    {item.pts}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        <div className="glass p-8 rounded-3xl border border-white/5 bg-gradient-to-br from-accent/5 to-transparent">
          <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-6">Qualification Analysis</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                <span className="text-xs font-bold text-green-400 uppercase">Qualified</span>
              </div>
              <p className="font-bold">Punjab Kings (PBKS)</p>
              <p className="text-xs text-muted-foreground mt-1">PBKS have secured a top-2 finish. They will play Qualifier 1.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 border-l-4 border-l-accent">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></span>
                <span className="text-xs font-bold text-accent uppercase">Battle for Top 4</span>
              </div>
              <p className="font-bold">Royal Challengers Bengaluru (RCB)</p>
              <p className="text-xs text-muted-foreground mt-1">RCB needs 1 win in their next match to guarantee qualification.</p>
            </div>
          </div>
        </div>

        <div className="glass p-8 rounded-3xl border border-white/5">
          <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-6 text-accent">NRR Calculator</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold uppercase text-muted-foreground mb-2 block">Total Runs Scored</label>
                <input type="number" placeholder="1850" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-accent" />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-muted-foreground mb-2 block">Overs Faced</label>
                <input type="number" placeholder="198.4" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-accent" />
              </div>
            </div>
            <button className="w-full bg-accent text-background font-black uppercase italic tracking-widest py-3 rounded-xl text-xs hover:shadow-[0_0_20px_rgba(0,255,136,0.2)] transition-all">
              Calculate Scenario
            </button>
            <p className="text-[9px] text-muted-foreground text-center italic">Calculate exactly what score your team needs to win to improve NRR.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
