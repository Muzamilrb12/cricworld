import scheduleData from "../../../data/schedule.json";

export default function SchedulePage() {
  const schedule = scheduleData || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2 italic uppercase tracking-tighter">Match Schedule</h1>
        <p className="text-muted-foreground font-medium">Official upcoming fixtures for International & League Cricket</p>
      </div>

      <div className="space-y-6">
        {schedule.length > 0 ? (
          schedule.map((item: any) => (
            <div key={item.id} className="glass p-8 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-8 group hover:bg-white/5 transition-all border border-white/5 hover:border-accent/30 shadow-xl">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <div className="px-3 py-1 bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest rounded-full">
                    {item.date}
                  </div>
                  <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">{item.series}</span>
                </div>
                
                <div className="flex items-center gap-6 text-2xl md:text-4xl font-black italic uppercase tracking-tighter mb-4 group-hover:text-accent transition-colors">
                  <span>{item.teams[0]}</span>
                  <span className="text-muted-foreground text-sm font-normal not-italic opacity-30">VS</span>
                  <span>{item.teams[1]}</span>
                </div>
                
                <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium">
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {item.venue}
                  </div>
                  <span className="w-1 h-1 bg-white/10 rounded-full"></span>
                  <span className="text-accent/60">{item.match}</span>
                </div>
              </div>
              
              <div className="flex flex-col items-start md:items-end gap-6 shrink-0">
                <div className="md:text-right">
                  <span className="text-2xl font-black italic text-white block mb-1">{item.time}</span>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Local Start Time</p>
                </div>
                <div className="flex gap-3">
                  <button className="px-6 py-2.5 rounded-xl bg-accent text-background text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,255,136,0.2)]">
                    Remind Me
                  </button>
                  <button className="p-2.5 rounded-xl glass border border-white/5 hover:bg-white/10 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6a3 3 0 100-2.684m0 2.684l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-24 text-center glass rounded-3xl border border-white/5 border-dashed">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-muted-foreground font-bold">No upcoming fixtures scheduled at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
