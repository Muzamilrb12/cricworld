import newsData from "../../../data/news.json";

export default function NewsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-2 text-accent">Cricket News & Articles</h1>
        <p className="text-muted-foreground font-medium">Breaking news, expert analysis, and exclusive interviews</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {newsData.map((item: any) => (
          <a 
            href={`/news/${item.id}`} 
            key={item.id} 
            className="group glass rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-accent/30 transition-all flex flex-col"
          >
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={item.imageUrl} 
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-accent text-background text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-xl">
                  {item.category}
                </span>
              </div>
            </div>
            
            <div className="p-8 flex-1 flex flex-col">
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-4">
                <span>{item.time}</span>
                <span>•</span>
                <span>{item.author}</span>
              </div>
              <h2 className="text-xl font-black italic uppercase tracking-tighter mb-4 leading-tight group-hover:text-accent transition-colors">
                {item.title}
              </h2>
              <p className="text-sm text-muted-foreground line-clamp-3 mb-6 flex-1">
                {item.summary}
              </p>
              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-accent group-hover:underline">Read Article →</span>
                <span className="text-[10px] text-muted-foreground font-bold italic">{item.date}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
