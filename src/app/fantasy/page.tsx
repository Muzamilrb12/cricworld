export default function FantasyPage() {
  const fantasyPicks = [
    { name: "Virat Kohli", team: "IND", role: "Batter", points: "98", price: "11.5" },
    { name: "Shaheen Afridi", team: "PAK", role: "Bowler", points: "85", price: "10.0" },
    { name: "Glenn Maxwell", team: "AUS", role: "All-rounder", points: "92", price: "10.5" },
    { name: "Rashid Khan", team: "AFG", role: "Bowler", points: "89", price: "9.5" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Fantasy Insights</h1>
        <p className="text-muted-foreground">Expert analysis and top picks to help you win big</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          {/* Featured Prediction */}
          <div className="relative rounded-3xl overflow-hidden glass p-8 border border-accent/20">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <div className="w-48 h-48 bg-accent rounded-full blur-3xl"></div>
            </div>
            <div className="relative z-10">
              <div className="inline-block bg-accent/20 text-accent text-[10px] font-bold px-2 py-0.5 rounded mb-4 uppercase tracking-widest">Today's Best Pick</div>
              <h2 className="text-3xl font-bold mb-4">MI vs CSK: Dream11 Prediction & Top Fantasy Picks</h2>
              <p className="text-muted-foreground mb-6">Wankhede is expected to be a batting paradise. Rohit Sharma and Ruturaj Gaikwad are must-haves for your team...</p>
              <button className="bg-accent text-background font-bold px-6 py-2 rounded-xl text-sm">Read Full Analysis</button>
            </div>
          </div>

          {/* Top Picks List */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Top Fantasy Picks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fantasyPicks.map((player, idx) => (
                <div key={idx} className="glass p-5 rounded-2xl flex items-center justify-between hover:bg-white/5 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center font-bold text-xs">{player.team}</div>
                    <div>
                      <h3 className="font-bold">{player.name}</h3>
                      <p className="text-[10px] text-muted-foreground uppercase">{player.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-accent font-bold">{player.price} Cr</div>
                    <div className="text-[10px] text-muted-foreground uppercase">Value</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pitch Report Section */}
          <div className="glass p-8 rounded-3xl">
            <h2 className="text-2xl font-bold mb-4">Smart Pitch Reports</h2>
            <div className="flex gap-8 items-center flex-col md:flex-row">
              <div className="w-full md:w-1/3 aspect-video glass rounded-2xl flex items-center justify-center text-accent/20 font-bold italic">Pitch View</div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2 text-accent">Wankhede Stadium, Mumbai</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A fresh wicket with even bounce. Spinners might get some purchase in the second innings as the temperature drops. Expect a high-scoring game with 190+ being par.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="glass p-6 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent">
            <h2 className="font-bold mb-4 text-accent">AI Team Generator</h2>
            <p className="text-xs text-muted-foreground mb-4">Let our AI build the optimal team based on recent form and ground stats.</p>
            <button className="w-full bg-white/5 border border-white/10 hover:border-accent transition-colors text-white font-bold py-3 rounded-xl text-xs uppercase tracking-widest">
              Generate Team
            </button>
          </div>

          <div className="glass p-6 rounded-2xl">
            <h2 className="font-bold mb-4">Top Fantasy Players</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-[10px] font-bold text-accent">1</div>
                <div className="flex-1 text-sm font-medium">Alex Johnson</div>
                <div className="text-xs font-bold text-accent">14,230 pts</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-bold text-muted-foreground">2</div>
                <div className="flex-1 text-sm font-medium">Muzamil Cricketer</div>
                <div className="text-xs font-bold text-accent">13,980 pts</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
