"use client";

import useSWR from "swr";
import MatchCard from "./MatchCard";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function LiveMatchesFeed() {
  const { data, error, isLoading } = useSWR("/api/live-matches", fetcher, {
    refreshInterval: 60000, // Poll every 60 seconds
    revalidateOnFocus: true,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="glass p-6 rounded-2xl animate-pulse">
            <div className="flex justify-between mb-4">
              <div className="h-4 bg-white/10 rounded w-24"></div>
              <div className="h-4 bg-white/10 rounded w-12"></div>
            </div>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/10 rounded-full"></div>
                  <div className="h-4 bg-white/10 rounded w-16"></div>
                </div>
                <div className="h-6 bg-white/10 rounded w-12"></div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/10 rounded-full"></div>
                  <div className="h-4 bg-white/10 rounded w-16"></div>
                </div>
                <div className="h-6 bg-white/10 rounded w-12"></div>
              </div>
            </div>
            <div className="h-3 bg-white/10 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error || !data || data.status !== "ok" || !data.data || data.data.length === 0) {
    return (
      <div className="col-span-full py-12 text-center glass rounded-2xl">
        <p className="text-muted-foreground">No live matches at the moment. Check back soon!</p>
      </div>
    );
  }

  const matches = data.data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {matches.map((match: any) => (
        <MatchCard key={match.id} match={match} />
      ))}
    </div>
  );
}
