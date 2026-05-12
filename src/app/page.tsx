import Image from "next/image";
import MatchCard from "@/components/MatchCard";
import AdBanner from "@/components/AdBanner";
import matchesData from "../../data/matches.json";
import newsData from "../../data/news.json";
import pointsTableData from "../../data/points-table.json";

export default function Home() {
  const matches = matchesData || [];
  const news = (newsData || []).slice(0, 3);
  const iplTable = (pointsTableData as any)["leagues"]?.["ipl-2026"]?.slice(0, 5) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="relative mb-12 rounded-3xl overflow-hidden glass p-8 md:p-12">
        <div className="absolute top-0 right-0 p-8 opacity-20 hidden md:block">
          <div className="w-64 h-64 border-4 border-accent rounded-full animate-pulse"></div>
        </div>
        
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
            Global Cricket Hub
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            International <span className="text-accent">Cricket</span> Live
          </h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-lg">
            Follow every international match, series, and league from around the globe. Real-time scores, ball-by-ball commentary, and advanced analytics for all teams.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="/live" className="px-8 py-3 rounded-xl bg-accent text-background font-bold hover:shadow-[0_0_20px_rgba(0,255,136,0.4)] transition-all">
              Watch Live
            </a>
            <a href="/schedule" className="px-8 py-3 rounded-xl glass font-bold hover:bg-white/10 transition-all">
              Full Schedule
            </a>
          </div>
        </div>
      </section>

      {/* Ad Space */}
      <div className="mb-12">
        <AdBanner type="horizontal" label="Trending Series" />
      </div>

      {/* Live Matches Grid */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Live & Upcoming</h2>
          <a href="/schedule" className="text-accent text-sm font-bold hover:underline">View All Schedule</a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.length > 0 ? (
            matches.map((match: any) => (
              <MatchCard key={match.id} match={match} />
            ))
          ) : (
            <div className="col-span-full py-12 text-center glass rounded-2xl">
              <p className="text-muted-foreground">No live matches at the moment. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats and News Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Latest Cricket News</h2>
            <a href="/news" className="text-accent text-sm font-bold hover:underline">Read More</a>
          </div>
          <div className="space-y-6">
            {news.map((item: any) => (
              <a href={`/news/${item.id}`} key={item.id} className="flex gap-4 p-4 rounded-2xl glass hover:bg-white/5 transition-colors cursor-pointer group">
                <div className="w-32 h-24 bg-zinc-800 rounded-xl overflow-hidden shrink-0">
                  <div className="w-full h-full bg-gradient-to-br from-zinc-700 to-zinc-900 animate-pulse group-hover:scale-105 transition-transform"></div>
                </div>
                <div>
                  <h3 className="font-bold group-hover:text-accent transition-colors mb-2 leading-tight">{item.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{item.summary}</p>
                  <span className="text-[10px] text-muted-foreground uppercase mt-2 block">{item.time} • {item.category}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-6">IPL 2026 Standings</h2>
            <div className="glass rounded-2xl overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-white/5 text-muted-foreground text-xs uppercase font-bold">
                  <tr>
                    <th className="px-4 py-3">Team</th>
                    <th className="px-4 py-3">P</th>
                    <th className="px-4 py-3">W</th>
                    <th className="px-4 py-3">Pts</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {iplTable.map((team: any) => (
                    <tr key={team.rank} className="hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3 font-bold">{team.team}</td>
                      <td className="px-4 py-3">{team.p}</td>
                      <td className="px-4 py-3 text-green-400">{team.w}</td>
                      <td className="px-4 py-3 text-accent font-bold">{team.pts}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <a href="/points-table" className="block text-center mt-4 text-xs text-accent font-bold hover:underline uppercase tracking-widest">
              View Full Table →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
