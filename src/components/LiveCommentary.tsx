"use client";
import { useState, useEffect } from 'react';
import { triggerNotification } from '@/lib/notifications';

interface Ball {
  over: string;
  bowler: string;
  batter: string;
  runs: string;
  description: string;
}

export default function LiveCommentary({ initialCommentary, isLive }: { initialCommentary: Ball[], isLive: boolean }) {
  const [displayedCommentary, setDisplayedCommentary] = useState<Ball[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    // Show first 3 balls immediately
    setDisplayedCommentary(initialCommentary.slice(0, 3));
    
    if (isLive) {
      let index = 3;
      const interval = setInterval(() => {
        if (index < initialCommentary.length) {
          const ball = initialCommentary[index];
          setIsUpdating(true);
          
          setTimeout(() => {
            setDisplayedCommentary(prev => [ball, ...prev]);
            setIsUpdating(false);

            // TRIGGER NOTIFICATION
            if (ball.runs === 'W') {
              triggerNotification("OUT!", `${ball.bowler} takes the wicket of ${ball.batter}!`, 'wicket');
            } else if (ball.runs === '4' || ball.runs === '6') {
              triggerNotification(`${ball.runs} RUNS!`, `${ball.batter} hits a massive boundary off ${ball.bowler}!`, 'boundary');
            }

            index++;
          }, 800);
        } else {
          clearInterval(interval);
        }
      }, 5000); 

      return () => clearInterval(interval);
    } else {
      setDisplayedCommentary(initialCommentary);
    }
  }, [initialCommentary, isLive]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-black italic uppercase tracking-tighter">Live Commentary Panel</h2>
        {isLive && (
          <div className="flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full">
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></span>
            <span className="text-[10px] font-bold text-accent uppercase tracking-widest">Live Updates On</span>
          </div>
        )}
      </div>

      <div className="space-y-8 relative">
        {isUpdating && (
          <div className="absolute -top-4 left-0 w-full flex justify-center z-20">
            <div className="bg-accent text-background text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-[0_0_20px_rgba(0,255,136,0.5)] animate-bounce">
              New Ball Coming...
            </div>
          </div>
        )}

        {displayedCommentary.map((ball, idx) => (
          <div 
            key={idx} 
            className="flex gap-6 group animate-in fade-in slide-in-from-left-4 duration-500"
          >
            <div className={`w-14 h-14 glass rounded-2xl flex flex-col items-center justify-center shrink-0 border border-white/5 group-hover:border-accent/50 transition-all ${
              ball.runs === 'W' ? 'bg-red-500/10 border-red-500/30' : 
              ball.runs === '6' || ball.runs === '4' ? 'bg-accent/10 border-accent/30' : ''
            }`}>
              <span className="text-[10px] font-bold text-muted-foreground uppercase">{ball.over}</span>
              <span className={`text-lg font-black italic ${
                ball.runs === 'W' ? 'text-red-500' : 
                ball.runs === '6' || ball.runs === '4' ? 'text-accent' : 'text-white'
              }`}>
                {ball.runs}
              </span>
            </div>
            
            <div className="flex-1 pb-8 border-b border-white/5 last:border-0">
              <div className="flex items-center gap-3 mb-3">
                <span className="font-black text-sm uppercase tracking-tighter italic text-white/90">
                  {ball.bowler} <span className="text-muted-foreground text-xs mx-1">to</span> {ball.batter}
                </span>
                {ball.runs === 'W' && (
                  <span className="bg-red-500 text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-tighter">Wicket</span>
                )}
                {(ball.runs === '6' || ball.runs === '4') && (
                  <span className="bg-accent text-background text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-tighter">Boundary</span>
                )}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed font-medium group-hover:text-white/80 transition-colors">
                {ball.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
