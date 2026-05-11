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
            
            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
              <a href="/" className="hover:text-accent transition-colors">Home</a>
              <a href="/live" className="flex items-center gap-1.5 hover:text-accent transition-colors">
                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></span>
                Live Scores
              </a>
              <a href="/schedule" className="hover:text-accent transition-colors">Schedule</a>
              <a href="/leagues" className="hover:text-accent transition-colors font-bold text-accent">Leagues</a>
              <a href="/series" className="hover:text-accent transition-colors">Series</a>
              <a href="/news" className="hover:text-accent transition-colors">News</a>
              <a href="/fantasy" className="hover:text-accent transition-colors">Fantasy</a>
              <a href="/points-table" className="hover:text-accent transition-colors">Points Table</a>
              <a href="/videos" className="hover:text-accent transition-colors">Videos</a>
              <a href="/stats" className="hover:text-accent transition-colors">Stats</a>
              <a href="/rankings" className="hover:text-accent transition-colors">Rankings</a>




            </div>

            <div className="flex items-center gap-4">
              <button className="hidden sm:block px-4 py-2 rounded-full glass hover:bg-white/10 transition-colors text-sm font-medium">
                Sign In
              </button>
              <button className="md:hidden text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
          </nav>
        </header>
        
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

