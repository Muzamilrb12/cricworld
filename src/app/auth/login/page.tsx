export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md glass p-10 rounded-3xl border border-white/5 shadow-2xl">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(0,255,136,0.3)]">
            <span className="text-background font-black text-3xl">C</span>
          </div>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter">Welcome Back</h1>
          <p className="text-muted-foreground text-sm mt-2">Login to access fantasy rewards and live chat</p>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 px-1">Email Address</label>
            <input 
              type="email" 
              placeholder="name@example.com"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 px-1">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          
          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-muted-foreground hover:text-white">
              <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5" />
              Remember me
            </label>
            <a href="#" className="text-accent hover:underline font-bold">Forgot Password?</a>
          </div>

          <button className="w-full bg-accent text-background font-black uppercase italic tracking-widest py-4 rounded-2xl shadow-[0_0_20px_rgba(0,255,136,0.2)] hover:shadow-[0_0_30px_rgba(0,255,136,0.4)] transition-all">
            Sign In
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account? <a href="/auth/signup" className="text-accent font-bold hover:underline">Create One</a>
          </p>
        </div>
      </div>
    </div>
  );
}
