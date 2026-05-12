'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

export default function UserNav() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return <div className="w-24 h-10 glass rounded-full animate-pulse"></div>;

  if (!user) {
    return (
      <a 
        href="/auth/login" 
        className="px-6 py-2 rounded-full bg-accent text-background font-black italic uppercase tracking-widest text-[10px] hover:shadow-[0_0_20px_rgba(0,255,136,0.5)] transition-all"
      >
        Login
      </a>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <div className="hidden sm:block text-right">
        <p className="text-[10px] font-black uppercase text-accent leading-none">Welcome</p>
        <p className="text-[11px] font-bold text-white truncate max-w-[100px]">{user.email?.split('@')[0]}</p>
      </div>
      <button 
        onClick={() => supabase.auth.signOut()}
        className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-red-500/10 hover:text-red-500 transition-colors border border-white/5"
        title="Logout"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      </button>
    </div>
  );
}
