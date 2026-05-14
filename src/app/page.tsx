import Image from "next/image";
import MatchCard from "@/components/MatchCard";
import AdBanner from "@/components/AdBanner";
import GoogleNewsFeed from "@/components/GoogleNewsFeed";
import LiveMatchesFeed from "@/components/LiveMatchesFeed";


export default function Home() {


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
          <h2 className="text-2xl font-bold">Live &amp; Upcoming</h2>
          <a href="/schedule" className="text-accent text-sm font-bold hover:underline">View All Schedule</a>
        </div>
        
        <LiveMatchesFeed />

      </section>

      {/* Stats and News Grid */}
      <div className="grid grid-cols-1 gap-8">
        {/* Live Google News Feed */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold">Latest Cricket News</h2>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-widest text-red-400">Live</span>
              </div>
            </div>
            <a href="/news" className="text-accent text-sm font-bold hover:underline">View All News</a>
          </div>
          <GoogleNewsFeed limit={6} layout="grid" showHeader={false} />
        </div>
      </div>
    </div>
  );
}
