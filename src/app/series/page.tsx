import seriesData from "../../../data/series.json";

export default function SeriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-2 text-accent">Series Archives</h1>
        <p className="text-muted-foreground font-medium">Historical records and tournament summaries from major cricket events</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {seriesData.map((series: any) => (
          <div key={series.id} className="glass p-8 rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-accent/5 to-transparent relative overflow-hidden group hover:border-accent/30 transition-all">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <span className="text-8xl font-black italic text-accent">{series.date.split(' ').pop()}</span>
            </div>
            
            <div className="relative z-10">
              <div className="inline-block bg-accent/20 text-accent text-[10px] font-black px-3 py-1 rounded-full mb-6 uppercase tracking-widest border border-accent/20">
                {series.host}
              </div>
              <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-8 leading-tight group-hover:text-accent transition-colors">
                {series.name}
              </h2>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <p className="text-[10px] text-muted-foreground uppercase font-black mb-2 tracking-widest">🏆 Champion</p>
                  <p className="text-xl font-black italic text-accent">{series.winner}</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <p className="text-[10px] text-muted-foreground uppercase font-black mb-2 tracking-widest">🥈 Runner-up</p>
                  <p className="text-xl font-black italic text-white/80">{series.runnerUp}</p>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-white/5">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground font-bold uppercase text-[10px] tracking-widest">Player of Series</span>
                  <span className="font-bold text-white">{series.playerOfSeries}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground font-bold uppercase text-[10px] tracking-widest">Most Runs</span>
                  <span className="font-bold text-white">{series.mostRuns}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground font-bold uppercase text-[10px] tracking-widest">Most Wickets</span>
                  <span className="font-bold text-white">{series.mostWickets}</span>
                </div>
              </div>

              <button className="w-full mt-8 py-3 rounded-2xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest hover:border-accent hover:text-accent transition-all">
                View Full Scorecards →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
