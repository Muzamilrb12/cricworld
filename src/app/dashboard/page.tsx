'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function UserDashboard() {
  const [user, setUser] = useState<any>(null);
  const [favoriteTeam, setFavoriteTeam] = useState('Pakistan');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (!currentUser) {
        router.push('/auth/login');
        return;
      }
      setUser(currentUser);
      setFavoriteTeam(currentUser.user_metadata?.favorite_team || 'Pakistan');
      setLoading(false);
    };

    fetchUserData();
  }, [router]);

  const updateFavoriteTeam = async (team: string) => {
    setFavoriteTeam(team);
    await supabase.auth.updateUser({
      data: { favorite_team: team }
    });
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar */}
          <div className="md:w-1/3 space-y-8">
            <div className="glass p-8 rounded-[3rem] border border-accent/20 bg-gradient-to-br from-accent/5 to-transparent text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full -mr-12 -mt-12"></div>
              <div className="w-32 h-32 bg-accent rounded-[2rem] mx-auto mb-6 flex items-center justify-center text-5xl font-black text-background italic shadow-[0_0_40px_rgba(0,255,136,0.3)]">
                {user?.email?.charAt(0).toUpperCase()}
              </div>
              <h1 className="text-3xl font-black italic uppercase tracking-tighter mb-1">{user?.email?.split('@')[0]}</h1>
              <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest">{user?.email}</p>
              
              <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-1">CricPoints</p>
                  <p className="text-xl font-black italic text-accent">3,850</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-1">Rank</p>
                  <p className="text-xl font-black italic">Elite</p>
                </div>
              </div>
            </div>

            {/* Favorite Team Picker */}
            <div className="glass p-8 rounded-[3rem] border border-white/5">
              <h3 className="text-xl font-black italic uppercase tracking-tighter mb-6 flex items-center justify-between">
                My Team
                <span className="text-[10px] bg-accent/10 text-accent px-2 py-0.5 rounded font-black italic">{favoriteTeam}</span>
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {["Pakistan", "India", "Australia", "England", "South Africa", "West Indies"].map((team) => (
                  <button
                    key={team}
                    onClick={() => updateFavoriteTeam(team)}
                    className={`p-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                      favoriteTeam === team ? 'bg-accent text-background border-accent' : 'bg-white/5 border-white/5 hover:border-white/20'
                    }`}
                  >
                    {team}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:w-2/3 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass p-8 rounded-[3rem] border border-white/5 group hover:border-accent/30 transition-all cursor-pointer">
                <h3 className="text-xl font-black italic uppercase tracking-tighter mb-4 text-accent">Team Alerts</h3>
                <div className="p-5 bg-accent/5 border border-accent/20 rounded-3xl">
                  <p className="text-[10px] font-black text-accent uppercase mb-2">Next Match Notification</p>
                  <p className="font-black italic uppercase text-lg leading-tight">Your Team plays tomorrow at 2:30 PM</p>
                  <p className="text-[10px] text-muted-foreground mt-3 font-bold uppercase">Auto-tuned to {favoriteTeam}'s schedule</p>
                </div>
              </div>

              <div className="glass p-8 rounded-[3rem] border border-white/5">
                <h3 className="text-xl font-black italic uppercase tracking-tighter mb-4">Season Rewards</h3>
                <div className="flex items-end gap-3 mb-4">
                  <span className="text-5xl font-black italic text-accent">12</span>
                  <span className="text-xs text-muted-foreground mb-2 font-bold uppercase tracking-widest">Badges Earned</span>
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-10 h-10 glass rounded-xl flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity">🏆</div>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass p-8 rounded-[3rem] border border-white/5">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black italic uppercase tracking-tighter">Activity Feed</h2>
                <button className="text-[10px] font-black uppercase text-muted-foreground hover:text-accent transition-colors underline decoration-accent underline-offset-4">View All</button>
              </div>
              <div className="space-y-6">
                {[
                  { action: "Fantasy Team Created", sub: "IPL 2026: Match 56", pts: "+100", time: "2h ago" },
                  { action: "Commentary Reaction", sub: "Reacted to Babar's 100", pts: "+10", time: "5h ago" },
                  { action: "Login Streak", sub: "5 Days in a row", pts: "+500", time: "Today" }
                ].map((act, i) => (
                  <div key={i} className="flex gap-6 pb-6 border-b border-white/5 last:border-0 last:pb-0 group hover:translate-x-1 transition-transform">
                    <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center shrink-0 border border-white/5 group-hover:border-accent/50 group-hover:bg-accent/5 transition-all">
                      <span className="font-black italic text-xl text-accent/50">{act.action.charAt(0)}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <p className="font-black italic uppercase text-sm tracking-tight">{act.action}</p>
                        <span className="text-accent text-[11px] font-black italic">{act.pts} Pts</span>
                      </div>
                      <p className="text-xs text-muted-foreground font-bold">{act.sub}</p>
                      <p className="text-[9px] text-muted-foreground mt-2 uppercase font-black tracking-widest opacity-50">{act.time}</p>
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
