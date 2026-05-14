"use client";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function UpcomingSeries() {
  const { data, isLoading } = useSWR("/api/series", fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 3600000, // Refresh once per hour
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="glass p-4 rounded-2xl animate-pulse">
            <div className="h-4 bg-white/10 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-white/5 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  const series = data?.data || [];

  if (series.length === 0) {
    return (
      <div className="glass p-8 rounded-2xl text-center">
        <p className="text-muted-foreground text-sm italic">No major upcoming series found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {series.map((s: any) => (
        <a
          key={s.id}
          href={s.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block glass p-4 rounded-2xl hover:bg-white/5 transition-all group border border-white/5 hover:border-accent/20"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="font-bold text-sm group-hover:text-accent transition-colors leading-tight mb-1">
                {s.name}
              </h4>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">
                {s.dateRange}
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
