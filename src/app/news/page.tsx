import newsData from "../../../data/news.json";
import Link from "next/link";

export default function NewsPage() {
  const news = newsData || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Cricket News</h1>
        <p className="text-muted-foreground">Stay updated with the latest from the world of cricket</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          {news.map((item: any) => (
            <Link 
              href={`/news/${item.id}`} 
              key={item.id}
              className="flex flex-col md:flex-row gap-6 glass p-6 rounded-2xl hover:bg-white/5 transition-all group"
            >
              <div className="w-full md:w-64 h-48 bg-zinc-800 rounded-xl overflow-hidden shrink-0">
                <div className="w-full h-full bg-gradient-to-br from-zinc-700 to-zinc-900 animate-pulse group-hover:scale-105 transition-transform"></div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 text-[10px] font-bold text-accent uppercase tracking-widest mb-3">
                  {item.category} • {item.time}
                </div>
                <h2 className="text-2xl font-bold mb-4 group-hover:text-accent transition-colors">{item.title}</h2>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{item.summary}</p>
                <div className="text-xs text-muted-foreground">By <span className="text-white font-medium">{item.author}</span></div>
              </div>
            </Link>
          ))}
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-bold mb-6">Trending Topics</h2>
            <div className="flex flex-wrap gap-2">
              <span className="glass px-3 py-1.5 rounded-full text-xs font-bold hover:text-accent cursor-pointer">#IPL2026</span>
              <span className="glass px-3 py-1.5 rounded-full text-xs font-bold hover:text-accent cursor-pointer">#BabarAzam</span>
              <span className="glass px-3 py-1.5 rounded-full text-xs font-bold hover:text-accent cursor-pointer">#WorldT20</span>
              <span className="glass px-3 py-1.5 rounded-full text-xs font-bold hover:text-accent cursor-pointer">#Ashes</span>
              <span className="glass px-3 py-1.5 rounded-full text-xs font-bold hover:text-accent cursor-pointer">#FantasyTips</span>
            </div>
          </div>
          
          <div className="glass p-6 rounded-2xl">
            <h2 className="font-bold mb-4">Newsletter</h2>
            <p className="text-xs text-muted-foreground mb-4">Get daily cricket updates delivered straight to your inbox.</p>
            <input 
              type="email" 
              placeholder="Your email address" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-accent mb-3"
            />
            <button className="w-full bg-accent text-background font-bold py-2 rounded-xl text-sm">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
}
