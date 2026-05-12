import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CricWorld | Premium Cricket Live Scores & Analytics",
  description: "Experience cricket like never before with real-time scores, ball-by-ball commentary, and advanced analytics.",
  manifest: "/manifest.json",
  themeColor: "#00ff88",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "CricWorld",
  },
};


import NotificationToast from "@/components/NotificationToast";
import UserNav from "@/components/UserNav";
import LiveScoreTicker from "@/components/LiveScoreTicker";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans relative">
        <NotificationToast />
        <header className="glass-header sticky top-0 z-50 w-full">

          <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(0,255,136,0.5)]">
                <span className="text-background font-bold text-xl">C</span>
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Cric<span className="text-accent">World</span>
              </span>
            </div>
            
            <div className="hidden lg:flex items-center gap-6 text-sm font-black italic uppercase tracking-tighter">
              {/* Home Link */}
              <a href="/" className="hover:text-accent transition-colors">Home</a>

              {/* Matches Group */}
              <div className="relative group/nav py-4">
                <button className="flex items-center gap-1.5 hover:text-accent transition-colors">
                  Matches <svg className="w-3 h-3 group-hover/nav:rotate-180 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>
                </button>
                <div className="absolute top-full left-0 w-48 glass rounded-2xl p-2 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all border border-white/5 shadow-2xl">
                  <a href="/live" className="flex items-center gap-2 p-3 rounded-xl hover:bg-accent/10 hover:text-accent transition-all">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></span> Live Scores
                  </a>
                  <a href="/schedule" className="p-3 rounded-xl hover:bg-white/5 block transition-all">Schedule</a>
                  <a href="/series" className="p-3 rounded-xl hover:bg-white/5 block transition-all">Series Archives</a>
                </div>
              </div>

              {/* Analysis Group */}
              <div className="relative group/nav py-4">
                <button className="flex items-center gap-1.5 hover:text-accent transition-colors">
                  Analysis <svg className="w-3 h-3 group-hover/nav:rotate-180 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>
                </button>
                <div className="absolute top-full left-0 w-48 glass rounded-2xl p-2 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all border border-white/5 shadow-2xl">
                  <a href="/rankings" className="p-3 rounded-xl hover:bg-white/5 block transition-all text-accent">ICC Rankings</a>
                  <a href="/points-table" className="p-3 rounded-xl hover:bg-white/5 block transition-all">Points Table</a>
                  <a href="/stats" className="p-3 rounded-xl hover:bg-white/5 block transition-all">Player Stats</a>
                </div>
              </div>

              {/* Features Group */}
              <div className="relative group/nav py-4">
                <button className="flex items-center gap-1.5 hover:text-accent transition-colors">
                  Features <svg className="w-3 h-3 group-hover/nav:rotate-180 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>
                </button>
                <div className="absolute top-full left-0 w-48 glass rounded-2xl p-2 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all border border-white/5 shadow-2xl">
                  <a href="/fantasy" className="p-3 rounded-xl hover:bg-white/5 block transition-all">Fantasy Pro</a>
                  <a href="/news" className="p-3 rounded-xl hover:bg-white/5 block transition-all">Latest News</a>
                  <a href="/videos" className="p-3 rounded-xl hover:bg-white/5 block transition-all">Highlights</a>
                </div>
              </div>

              {/* Admin Group */}
              <div className="relative group/nav py-4">
                <button className="flex items-center gap-1.5 hover:text-accent transition-colors text-white/50">
                  More <svg className="w-3 h-3 group-hover/nav:rotate-180 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>
                </button>
                <div className="absolute top-full right-0 w-48 glass rounded-2xl p-2 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all border border-white/5 shadow-2xl">
                  <a href="/about" className="p-3 rounded-xl hover:bg-white/5 block transition-all">About Us</a>
                  <a href="/admin/live-editor" className="p-3 rounded-xl hover:bg-accent/10 text-accent font-bold block transition-all">Live Editor</a>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <UserNav />
              <button className="md:hidden text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
          </nav>
        </header>
        
        <LiveScoreTicker />

        <main className="flex-1">
          {children}
        </main>

        <footer className="glass-header mt-auto border-t border-white/5 py-12">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <span className="text-2xl font-bold tracking-tight text-white mb-4 block">
                Cric<span className="text-accent">World</span>
              </span>
              <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
                The ultimate destination for cricket fans worldwide. Live scores, stats, and real-time updates.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-accent">About Us</a></li>
                <li><a href="#" className="hover:text-accent">Contact</a></li>
                <li><a href="#" className="hover:text-accent">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <div className="w-8 h-8 glass rounded-full flex items-center justify-center hover:text-accent cursor-pointer transition-colors">T</div>
                <div className="w-8 h-8 glass rounded-full flex items-center justify-center hover:text-accent cursor-pointer transition-colors">F</div>
                <div className="w-8 h-8 glass rounded-full flex items-center justify-center hover:text-accent cursor-pointer transition-colors">I</div>
              </div>
            </div>
          </div>
          <div className="container mx-auto px-4 mt-8 pt-8 border-t border-white/5 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} CricWorld. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}

