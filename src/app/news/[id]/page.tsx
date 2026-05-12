import newsData from "../../../../data/news.json";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { id } = await params;
  const article = (newsData as any[]).find((n: any) => n.id === id);

  if (!article) return notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto">
        {/* Article Header */}
        <div className="mb-12 text-center">
          <div className="inline-block bg-accent/20 text-accent text-[10px] font-black px-4 py-1 rounded-full mb-6 uppercase tracking-widest border border-accent/20">
            {article.category}
          </div>
          <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-8 leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center justify-center gap-6 text-sm font-bold uppercase tracking-widest text-muted-foreground">
            <span>By {article.author}</span>
            <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
            <span>{article.date}</span>
            <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
            <span>{article.time}</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative aspect-video rounded-[3rem] overflow-hidden glass border border-white/5 mb-12 shadow-2xl">
          <img 
            src={article.imageUrl} 
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body */}
        <div className="glass p-8 md:p-16 rounded-[3rem] border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5">
            <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24"><path d="M13 14.5s2 3 5 3 5-3 5-3V6s-2 3-5 3-5-3-5-3v8.5zM12 19c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2s2 .9 2 2v13c0 1.1-.9 2-2 2zM5 19c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2s2 .9 2 2v13c0 1.1-.9 2-2 2z" /></svg>
          </div>
          <div className="relative z-10">
            <p className="text-xl md:text-2xl font-bold text-white mb-10 leading-relaxed italic border-l-4 border-accent pl-8">
              &ldquo;{article.summary}&rdquo;
            </p>
            <div className="space-y-8 text-lg text-muted-foreground leading-relaxed">
              {article.content.split('. ').map((para: string, idx: number) => (
                <p key={idx}>{para}.</p>
              ))}
            </div>
          </div>
        </div>

        {/* Article Footer */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-8 glass p-8 rounded-3xl border border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center font-black italic text-background">C</div>
            <div>
              <p className="text-sm font-black italic uppercase">CricWorld Editorial</p>
              <p className="text-[10px] text-muted-foreground uppercase font-bold">Trusted Sports Journalism</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-2 rounded-xl glass border border-white/5 text-[10px] font-black uppercase tracking-widest hover:border-accent transition-colors">Share News</button>
            <button className="px-6 py-2 rounded-xl bg-accent text-background text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform">Follow Updates</button>
          </div>
        </div>
      </article>
    </div>
  );
}
