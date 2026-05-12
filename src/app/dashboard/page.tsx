'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function UserDashboard() {
  const [profile, setProfile] = useState({ name: "Muzamil Khan", email: "muzamil@example.com", joined: "Jan 2024" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated fetching from Supabase
    const fetchUserData = async () => {
      setLoading(true);
      // const { data: { user } } = await supabase.auth.getUser();
      setTimeout(() => {
        setLoading(false);
      }, 800);
    };

    fetchUserData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar */}
          <div className="md:w-1/3 space-y-8">
            <div className="glass p-8 rounded-[3rem] border border-accent/20 bg-gradient-to-br from-accent/5 to-transparent text-center">
              <div className="w-32 h-32 bg-accent rounded-[2rem] mx-auto mb-6 flex items-center justify-center text-5xl font-black text-background italic">
                {profile.name.charAt(0)}
              </div>
              <h1 className="text-3xl font-black italic uppercase tracking-tighter mb-1">{profile.name}</h1>
              <p className="text-muted-foreground text-sm font-bold uppercase tracking-widest">{profile.email}</p>
              <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-1">CricPoints</p>
                  <p className="text-xl font-black italic text-accent">2,450</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-1">Fan Rank</p>
                  <p className="text-xl font-black italic">#142</p>
                </div>
              </div>
            </div>

            <div className="glass p-8 rounded-[3rem] border border-white/5">
              <h3 className="text-xl font-black italic uppercase tracking-tighter mb-6">Following Teams</h3>
              <div className="space-y-4">
                {["Pakistan", "Mumbai Indians", "KKR"].map((team) => (
                  <div key={team} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                    <span className="font-bold">{team}</span>
                    <button className="text-accent text-[10px] font-bold uppercase">Unfollow</button>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-3 border border-dashed border-white/10 rounded-2xl text-[10px] font-bold uppercase text-muted-foreground hover:bg-white/5 transition-colors">
                + Follow More Teams
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:w-2/3 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass p-8 rounded-[3rem] border border-white/5">
                <h3 className="text-xl font-black italic uppercase tracking-tighter mb-4">Upcoming Reminders</h3>
                <div className="p-4 bg-accent/5 border border-accent/20 rounded-2xl">
                  <p className="text-xs font-bold text-accent uppercase mb-1">May 18 • 10:00 AM</p>
                  <p className="font-black italic uppercase">PAK vs BAN (2nd Test)</p>
                  <p className="text-[10px] text-muted-foreground mt-2">Notification set for 15 mins before toss.</p>
                </div>
              </div>
              <div className="glass p-8 rounded-[3rem] border border-white/5">
                <h3 className="text-xl font-black italic uppercase tracking-tighter mb-4">Fantasy Performance</h3>
                <div className="flex items-end gap-2">
                  <span className="text-5xl font-black italic text-accent">842</span>
                  <span className="text-xs text-muted-foreground mb-2 font-bold uppercase tracking-widest">Points This Season</span>
                </div>
                <div className="mt-4 w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <div className="w-[68%] h-full bg-accent"></div>
                </div>
                <p className="text-[10px] text-muted-foreground mt-2 uppercase font-bold">Top 15% of all fans</p>
              </div>
            </div>

            <div className="glass p-8 rounded-[3rem] border border-white/5">
              <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-8">My Match History & Activity</h2>
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-6 pb-6 border-b border-white/5 last:border-0 last:pb-0 group cursor-pointer">
                    <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center shrink-0 border border-white/5 group-hover:border-accent transition-colors">
                      <span className="font-black italic text-xl">W</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <p className="font-bold">Predicted Match Outcome Correctly</p>
                        <span className="text-accent text-[10px] font-bold">+50 Pts</span>
                      </div>
                      <p className="text-xs text-muted-foreground">PAK vs AUS, 1st T20I • You predicted a Pakistan win by 10+ runs.</p>
                      <p className="text-[10px] text-muted-foreground mt-2 uppercase font-bold">Yesterday, 11:30 PM</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
