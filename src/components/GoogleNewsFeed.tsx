'use client';

import { useEffect, useState, useCallback } from 'react';

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
  category: string;
  time: string;
  author: string;
  authorUrl?: string;
  date: string;
  link: string;
  publishedAt: string;
  isLive: boolean;
}

interface GoogleNewsFeedProps {
  /** Max articles to show. Defaults to 20 */
  limit?: number;
  /** Layout mode: 'grid' for full page, 'compact' for sidebar/homepage */
  layout?: 'grid' | 'compact';
  /** Show the header? */
  showHeader?: boolean;
  /** Specific topic to filter by: 'international' or 'leagues' */
  topic?: 'international' | 'leagues' | string;
}


export default function GoogleNewsFeed({
  limit = 20,
  layout = 'grid',
  showHeader = true,
  topic,
}: GoogleNewsFeedProps) {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [countdown, setCountdown] = useState(60);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchNews = useCallback(async (isManual = false) => {
    try {
      if (isManual) setIsRefreshing(true);
      
      const url = topic 
        ? `/api/google-news?topics=${topic === 'international' ? 'CAAqJggKIiBDQkFTRWdvSUwyMHZNRFp1ZEdvU0FtVnVHZ0pWVXlnQVAB' : topic === 'leagues' ? 'CAAqKggKIiRDQkFTRlFvSUwyMHZNRFp1ZEdvU0JXVnVMVWRDR2dKSlRpZ0FQAQ' : topic}`
        : '/api/google-news';

      const res = await fetch(url, { cache: 'no-store' });

      const data = await res.json();

      if (data.articles && data.articles.length > 0) {
        setArticles(data.articles.slice(0, limit));
        setError(null);
      } else if (data.error) {
        setError(data.error);
      }

      setLastUpdated(new Date().toLocaleTimeString());
      setCountdown(60);
    } catch (err) {
      console.error('Failed to fetch news:', err);
      setError('Connection error. Will retry automatically.');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [limit]);

  // Initial fetch + auto-refresh every 60 seconds
  useEffect(() => {
    fetchNews();

    const interval = setInterval(() => {
      fetchNews();
    }, 60000); // 60 seconds

    return () => clearInterval(interval);
  }, [fetchNews]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev <= 1 ? 60 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Loading skeleton
  if (loading) {
    return (
      <div className={layout === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}>
        {Array.from({ length: layout === 'compact' ? 4 : 6 }).map((_, i) => (
          <div key={i} className="glass rounded-[2rem] overflow-hidden border border-white/5 animate-pulse">
            {layout === 'grid' && <div className="aspect-video bg-white/5" />}
            <div className="p-6 space-y-3">
              <div className="h-3 bg-white/5 rounded w-1/4" />
              <div className="h-5 bg-white/5 rounded w-3/4" />
              <div className="h-4 bg-white/5 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {/* Live Header Bar */}
      {showHeader && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl md:text-4xl font-black italic uppercase tracking-tighter text-accent">
              Live Cricket News
            </h2>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-red-400">Live</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Countdown */}
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              <svg className="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Refresh in <span className="text-accent font-black">{countdown}s</span></span>
            </div>

            {/* Manual refresh button */}
            <button
              onClick={() => fetchNews(true)}
              disabled={isRefreshing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass border border-white/5 hover:border-accent/30 text-[10px] font-black uppercase tracking-widest transition-all hover:text-accent disabled:opacity-50"
            >
              <svg
                className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </button>

            {lastUpdated && (
              <span className="text-[10px] text-muted-foreground font-bold">
                Updated: {lastUpdated}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Error Banner */}
      {error && articles.length === 0 && (
        <div className="glass rounded-2xl p-6 border border-yellow-500/20 bg-yellow-500/5 mb-8 flex items-center gap-3">
          <svg className="w-5 h-5 text-yellow-400 shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
          <p className="text-sm text-yellow-300">{error}</p>
        </div>
      )}

      {/* GRID Layout (Full News Page) */}
      {layout === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, idx) => (
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              key={article.id}
              className="group glass rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-accent/30 transition-all flex flex-col hover:shadow-[0_0_30px_rgba(0,255,136,0.1)]"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=800&auto=format&fit=crop';
                  }}
                />
                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-accent text-background text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-xl">
                    {article.category}
                  </span>
                </div>
                {/* Live indicator */}
                <div className="absolute top-4 right-4">
                  <span className="flex items-center gap-1 bg-black/60 backdrop-blur-md text-[9px] font-black px-2 py-1 rounded-full uppercase tracking-widest text-red-400 border border-red-500/20">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                    Live
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-4">
                  <span>{article.time}</span>
                  <span>•</span>
                  <span>{article.author}</span>
                </div>
                <h2 className="text-xl font-black italic uppercase tracking-tighter mb-4 leading-tight group-hover:text-accent transition-colors line-clamp-3">
                  {article.title}
                </h2>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-6 flex-1">
                  {article.summary}
                </p>
                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-accent group-hover:underline flex items-center gap-1">
                    Read on {article.author}
                    <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </span>
                  <span className="text-[10px] text-muted-foreground font-bold italic">{article.date}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}

      {/* COMPACT Layout (Homepage sidebar / widget) */}
      {layout === 'compact' && (
        <div className="space-y-6">
          {articles.map((article) => (
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              key={article.id}
              className="flex gap-6 p-6 rounded-[2rem] glass hover:bg-white/5 transition-colors cursor-pointer group border border-white/5 hover:border-accent/30"
            >
              <div className="w-40 h-28 bg-zinc-800 rounded-2xl overflow-hidden shrink-0 border border-white/5">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=800&auto=format&fit=crop';
                  }}
                />
              </div>
              <div className="flex-1 flex flex-col justify-center min-w-0">
                <span className="text-[9px] text-accent font-black uppercase tracking-widest mb-2">{article.category}</span>
                <h3 className="font-black italic uppercase tracking-tighter group-hover:text-accent transition-colors mb-2 leading-tight line-clamp-2 text-sm">
                  {article.title}
                </h3>
                <div className="flex items-center gap-2 mt-auto">
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">{article.time}</span>
                  <span className="w-1 h-1 bg-white/20 rounded-full" />
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">{article.author}</span>
                  <span className="w-1 h-1 bg-red-500 rounded-full animate-pulse" />
                </div>
              </div>
            </a>
          ))}
        </div>
      )}

      {/* Footer info */}
      {showHeader && (
        <div className="mt-8 text-center">
          <p className="text-[10px] text-muted-foreground/50 font-bold uppercase tracking-widest">
            Powered by Google News RSS • Auto-refreshes every 60 seconds • {articles.length} articles loaded
          </p>
        </div>
      )}
    </div>
  );
}
