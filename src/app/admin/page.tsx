'use client';
import { useState, useEffect } from 'react';

import { supabase } from '@/lib/supabase';
import matchesData from '../../../data/matches.json';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, matches: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      setLoading(true);
      setTimeout(() => {
        setStats({ users: 12450, matches: matchesData.length, revenue: 5820 });
        setLoading(false);
      }, 1000);
    };


    fetchAdminData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">Admin Control Panel</h1>
          <p className="text-muted-foreground font-medium">Manage CricWorld platform and real-time data</p>
        </div>
        <div className="px-4 py-2 bg-accent/20 rounded-xl border border-accent/20 text-accent text-xs font-bold uppercase animate-pulse">
          Live System Status: Optimal
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="glass p-8 rounded-3xl border border-white/5">
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-2">Total Users</p>
          <h3 className="text-4xl font-black italic">{loading ? "..." : stats.users.toLocaleString()}</h3>
          <div className="mt-4 flex items-center gap-2 text-green-400 text-xs font-bold">
            <span>↑ 12% this week</span>
          </div>
        </div>
        <div className="glass p-8 rounded-3xl border border-white/5">
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-2">Active Matches</p>
          <h3 className="text-4xl font-black italic text-accent">{loading ? "..." : stats.matches}</h3>
          <div className="mt-4 flex items-center gap-2 text-muted-foreground text-xs font-bold">
            <span>Running Scrapers: 3</span>
          </div>
        </div>
        <div className="glass p-8 rounded-3xl border border-white/5">
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-2">Ad Revenue (Est)</p>
          <h3 className="text-4xl font-black italic">${loading ? "..." : stats.revenue.toLocaleString()}</h3>
          <div className="mt-4 flex items-center gap-2 text-accent text-xs font-bold">
            <span>↑ 24% vs last month</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass p-8 rounded-3xl border border-white/5">
          <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-6">Recent Platform Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center font-bold text-accent">U</div>
                  <div>
                    <p className="text-sm font-bold">New User Registered</p>
                    <p className="text-[10px] text-muted-foreground uppercase">2 minutes ago</p>
                  </div>
                </div>
                <button className="text-xs text-accent font-bold hover:underline">Details</button>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-8 rounded-3xl border border-white/5">
          <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-6">Data Scraper Controls</h2>
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <p className="font-bold">ICC Rankings Scraper</p>
                <span className="px-2 py-0.5 bg-green-500/20 text-green-500 text-[10px] font-bold rounded">ACTIVE</span>
              </div>
              <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                <div className="w-3/4 h-full bg-accent"></div>
              </div>
              <p className="text-[10px] text-muted-foreground mt-2 uppercase font-bold">Last Sync: 15 mins ago</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <p className="font-bold">Cricinfo Live Scores</p>
                <span className="px-2 py-0.5 bg-accent/20 text-accent text-[10px] font-bold rounded">STANDBY</span>
              </div>
              <button className="w-full py-2 bg-accent text-background font-black uppercase italic tracking-widest text-xs rounded-xl hover:scale-[1.02] transition-transform">
                Force Manual Sync
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
