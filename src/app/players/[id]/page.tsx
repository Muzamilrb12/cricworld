import playersData from "../../../../data/players.json";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PlayerProfilePage({ params }: PageProps) {
  const { id } = await params;
  const player = (playersData as any)[id];

  if (!player) return notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="relative rounded-[3rem] overflow-hidden glass p-8 md:p-12 border border-white/5 bg-gradient-to-br from-accent/10 to-transparent mb-12">
        <div className="absolute top-0 right-0 p-12 opacity-5 hidden lg:block">
          <div className="w-96 h-96 border-[20px] border-accent rounded-full"></div>
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
          <div className="w-48 h-48 rounded-full glass border-4 border-accent flex items-center justify-center text-6xl font-black italic text-accent/20">
            {player.name.charAt(0)}
          </div>
          
          <div className="text-center md:text-left flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-background text-[10px] font-black uppercase tracking-widest mb-4">
              {player.role}
            </div>
            <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-4 text-white">
              {player.name}
            </h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm font-bold uppercase tracking-widest text-muted-foreground">
              <span className="flex items-center gap-2"><span className="w-2 h-2 bg-accent rounded-full"></span>{player.team}</span>
              <span className="flex items-center gap-2"><span className="w-2 h-2 bg-white/20 rounded-full"></span>{player.battingStyle}</span>
              <span className="flex items-center gap-2"><span className="w-2 h-2 bg-white/20 rounded-full"></span>{player.born}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
            <div className="glass p-6 rounded-3xl text-center border border-white/5">
              <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Batting Avg</p>
              <p className="text-3xl font-black italic text-accent">{player.stats.odi.avg}</p>
            </div>
            <div className="glass p-6 rounded-3xl text-center border border-white/5">
              <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Intl 100s</p>
              <p className="text-3xl font-black italic text-accent">{player.stats.test.100s + player.stats.odi.100s + player.stats.t20i.100s}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* Biography */}
          <section>
            <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-6 border-l-4 border-accent pl-4">Biography</h2>
            <div className="glass p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V12C14.017 12.5523 13.5693 13 13.017 13H11.017C10.4647 13 10.017 12.5523 10.017 12V9C10.017 7.34315 11.3602 6 13.017 6H19.017C20.6739 6 22.017 7.34315 22.017 9V15C22.017 17.2091 20.2261 19 18.017 19H17.017V21H14.017ZM2.017 21L2.017 18C2.017 16.8954 2.91243 16 4.017 16H7.017C7.56928 16 8.017 15.5523 8.017 15V9C8.017 8.44772 7.56928 8 7.017 8H3.017C2.46472 8 2.017 8.44772 2.017 9V12C2.017 12.5523 1.56928 13 1.017 13H-0.983C-1.53528 13 -2.017 12.5523 -2.017 12V9C-2.017 7.34315 -0.67385 6 0.983 6H7.017C8.67385 6 10.017 7.34315 10.017 9V15C10.017 17.2091 8.22614 19 6.017 19H5.017V21H2.017Z" /></svg>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed italic">
                &ldquo;{player.bio}&rdquo;
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 pt-8 border-t border-white/5">
                <div>
                  <h4 className="text-[10px] text-accent uppercase font-black tracking-widest mb-4">Physical Attributes</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm border-b border-white/5 pb-2">
                      <span className="text-muted-foreground">Height</span>
                      <span className="font-bold text-white">{player.height}</span>
                    </div>
                    <div className="flex justify-between text-sm border-b border-white/5 pb-2">
                      <span className="text-muted-foreground">Born In</span>
                      <span className="font-bold text-white">{player.birthPlace}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-[10px] text-accent uppercase font-black tracking-widest mb-4">Playing Style</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm border-b border-white/5 pb-2">
                      <span className="text-muted-foreground">Bowling Style</span>
                      <span className="font-bold text-white">{player.bowlingStyle}</span>
                    </div>
                    <div className="flex justify-between text-sm border-b border-white/5 pb-2">
                      <span className="text-muted-foreground">Primary Role</span>
                      <span className="font-bold text-white">{player.role}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Career Stats */}
          <section>
            <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-6 border-l-4 border-accent pl-4">Career Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['test', 'odi', 't20i'].map((format) => {
                const s = (player.stats as any)[format];
                return (
                  <div key={format} className="glass rounded-[2rem] overflow-hidden border border-white/5">
                    <div className="bg-white/5 p-4 text-center border-b border-white/5">
                      <h3 className="font-black italic uppercase text-xs tracking-widest text-accent">{format} Records</h3>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-muted-foreground uppercase font-bold">Matches</span>
                        <span className="font-black text-xl">{s.matches}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-muted-foreground uppercase font-bold">Total Runs</span>
                        <span className="font-black text-xl text-accent">{s.runs.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-muted-foreground uppercase font-bold">Average</span>
                        <span className="font-black text-xl">{s.avg}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-muted-foreground uppercase font-bold">High Score</span>
                        <span className="font-black text-xl">{s.hs}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 pt-4 border-t border-white/5">
                        <div className="bg-white/5 rounded-xl p-2 text-center">
                          <p className="text-[8px] text-muted-foreground uppercase font-bold">100s</p>
                          <p className="font-black italic text-lg">{s.100s}</p>
                        </div>
                        <div className="bg-white/5 rounded-xl p-2 text-center">
                          <p className="text-[8px] text-muted-foreground uppercase font-bold">50s</p>
                          <p className="font-black italic text-lg">{s.50s}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-12">
          {/* Recent Form */}
          <section>
            <h2 className="text-xl font-black italic uppercase tracking-tighter mb-6">Recent Form</h2>
            <div className="glass p-8 rounded-[2.5rem] border border-accent/20 bg-gradient-to-br from-accent/5 to-transparent">
              <div className="flex flex-wrap gap-4 justify-center">
                {player.recentForm.map((score: string, idx: number) => (
                  <div key={idx} className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black italic text-lg border ${
                    parseInt(score) >= 100 ? 'bg-accent text-background border-accent shadow-[0_0_20px_rgba(0,255,136,0.4)]' : 
                    parseInt(score) >= 50 ? 'border-accent text-accent' : 'border-white/10 text-muted-foreground'
                  }`}>
                    {score}
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-center text-muted-foreground uppercase font-bold mt-6 tracking-widest">Last 5 International Innings</p>
            </div>
          </section>

          {/* Records & Awards */}
          <section>
            <h2 className="text-xl font-black italic uppercase tracking-tighter mb-6">Achievements</h2>
            <div className="space-y-4">
              {[
                "ICC Player of the Year",
                "World Cup Winner",
                "Most Centuries in a Season",
                "Top Ranked Intl Batter"
              ].map((award, idx) => (
                <div key={idx} className="glass p-4 rounded-2xl border border-white/5 flex items-center gap-4 group hover:border-accent/30 transition-all">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs">🏆</div>
                  <span className="text-xs font-bold text-white group-hover:text-accent transition-colors">{award}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
