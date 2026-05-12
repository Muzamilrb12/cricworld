'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AuthForm({ mode }: { mode: 'login' | 'signup' }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: authError } = mode === 'signup' 
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError(authError.message);
    } else {
      router.push('/dashboard');
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md glass p-10 rounded-[3rem] border border-white/10 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(0,255,136,0.4)]">
          <span className="text-background font-black text-2xl italic">C</span>
        </div>
        <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-2">
          {mode === 'login' ? 'Welcome Back' : 'Join CricWorld'}
        </h2>
        <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest">
          {mode === 'login' ? 'Login to your account' : 'Start your cricket journey'}
        </p>
      </div>

      <form onSubmit={handleAuth} className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">Email Address</label>
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 font-bold text-sm focus:border-accent outline-none transition-all"
            placeholder="name@example.com"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">Password</label>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 font-bold text-sm focus:border-accent outline-none transition-all"
            placeholder="••••••••"
          />
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-xl text-center">
            {error}
          </div>
        )}

        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-accent text-background font-black italic uppercase tracking-widest py-4 rounded-2xl text-xs hover:shadow-[0_0_40px_rgba(0,255,136,0.5)] transition-all disabled:opacity-50"
        >
          {loading ? 'Processing...' : (mode === 'login' ? 'Login Now' : 'Create Account')}
        </button>

        <div className="text-center pt-4">
          <a 
            href={mode === 'login' ? '/auth/signup' : '/auth/login'} 
            className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors"
          >
            {mode === 'login' ? "Don't have an account? Sign up" : "Already have an account? Login"}
          </a>
        </div>
      </form>
    </div>
  );
}
