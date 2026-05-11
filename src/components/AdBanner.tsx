"use client";

interface AdBannerProps {
  type: "horizontal" | "vertical" | "square";
  label?: string;
}

export default function AdBanner({ type, label = "Sponsored" }: AdBannerProps) {
  const styles = {
    horizontal: "w-full h-24",
    vertical: "w-64 h-[600px]",
    square: "w-full aspect-square max-w-[300px]",
  };

  return (
    <div className={`relative glass rounded-2xl overflow-hidden border border-white/5 flex flex-col items-center justify-center bg-white/5 ${styles[type]} group`}>
      <div className="absolute top-2 right-2 text-[8px] font-bold uppercase tracking-widest text-muted-foreground opacity-50 group-hover:opacity-100 transition-opacity">
        {label}
      </div>
      
      {/* Ad Placeholder Content */}
      <div className="text-center p-4">
        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3 text-accent/20">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
          </svg>
        </div>
        <p className="text-[10px] font-bold text-muted-foreground/30 uppercase tracking-tighter">Advertisement Space</p>
        <p className="text-[9px] text-muted-foreground/20 mt-1">Sourced from AdSense Partners</p>
      </div>

      {/* Decorative pulse */}
      <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse"></div>
    </div>
  );
}
