'use client';
import { useState, useEffect } from 'react';

interface DataUnavailableProps {
  retryAfter?: number; // seconds
  onRetry?: () => void;
  sourceName?: string;
  sourceUrl?: string;
}

export default function DataUnavailable({ retryAfter = 30, onRetry, sourceName, sourceUrl }: DataUnavailableProps) {
  const [countdown, setCountdown] = useState(retryAfter);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          onRetry?.();
          return retryAfter;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [retryAfter, onRetry]);

  return (
    <div className="glass p-12 rounded-[3rem] border border-yellow-500/20 bg-gradient-to-br from-yellow-500/5 to-transparent text-center">
      <div className="w-16 h-16 border-4 border-yellow-500/30 border-t-yellow-500 rounded-full animate-spin mx-auto mb-6"></div>
      <h3 className="text-xl font-black italic uppercase tracking-tighter text-yellow-500 mb-2">
        Live Data Temporarily Unavailable
      </h3>
      <p className="text-sm text-muted-foreground font-bold mb-6">
        Retrying in <span className="text-yellow-500 font-black">{countdown}s</span>
      </p>
      <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mb-6">
        <div 
          className="h-full bg-yellow-500 rounded-full transition-all duration-1000"
          style={{ width: `${((retryAfter - countdown) / retryAfter) * 100}%` }}
        ></div>
      </div>
      {sourceName && (
        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
          Source: {sourceUrl ? (
            <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="text-yellow-500 underline underline-offset-4">
              {sourceName}
            </a>
          ) : sourceName}
        </p>
      )}
      <button 
        onClick={onRetry}
        className="mt-6 px-6 py-2 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-yellow-500/20 transition-all"
      >
        Retry Now
      </button>
    </div>
  );
}
