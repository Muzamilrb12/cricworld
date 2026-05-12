'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface BallEvent {
  id: number;
  over_no: number;
  event: string;
  text: string;
  is_wicket: boolean;
  batsman?: string;
  bowler?: string;
}

export default function CommentaryFeed({ matchId }: { matchId: string }) {
  const [events, setEvents] = useState<BallEvent[]>([]);

  useEffect(() => {
    // 1. Fetch initial commentary
    const fetchInitial = async () => {
      const { data } = await supabase
        .from('commentary')
        .select('*')
        .eq('match_id', matchId)
        .order('over_no', { ascending: false })
        .limit(20);
      
      if (data) setEvents(data);
    };

    fetchInitial();

    // 2. Subscribe to new balls (Real-time)
    const channel = supabase
      .channel(`commentary-${matchId}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'commentary',
        filter: `match_id=eq.${matchId}`
      }, (payload) => {
        setEvents(prev => [payload.new as BallEvent, ...prev].slice(0, 50));
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [matchId]);

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-black italic uppercase tracking-tighter text-accent flex items-center gap-3">
        <span className="w-2 h-2 bg-accent rounded-full animate-ping"></span>
        Ball-by-Ball Commentary
      </h3>

      <div className="space-y-4">
        {events.length === 0 ? (
          <div className="glass p-8 rounded-3xl text-center text-muted-foreground italic">
            Waiting for next ball...
          </div>
        ) : (
          events.map((ball) => (
            <div 
              key={ball.id} 
              className={`glass p-6 rounded-[2rem] border transition-all animate-in slide-in-from-top-4 duration-500 ${
                ball.is_wicket ? 'border-red-500/50 bg-red-500/5' : 'border-white/5'
              }`}
            >
              <div className="flex gap-6">
                {/* Ball Number Pill */}
                <div className={`w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center font-black italic text-lg ${
                  ball.is_wicket ? 'bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]' :
                  ['4', '6'].includes(ball.event) ? 'bg-accent text-background shadow-[0_0_20px_rgba(0,255,136,0.4)]' :
                  'bg-white/5 text-muted-foreground'
                }`}>
                  {ball.over_no}
                </div>

                {/* Event Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                      ball.is_wicket ? 'bg-red-500/20 text-red-500' : 
                      ['4', '6'].includes(ball.event) ? 'bg-accent/20 text-accent' : 
                      'bg-white/10 text-muted-foreground'
                    }`}>
                      {ball.is_wicket ? 'Wicket' : ball.event === '0' ? 'Dot Ball' : `${ball.event} Runs`}
                    </span>
                  </div>
                  <p className="text-sm font-medium leading-relaxed text-white/90">
                    {ball.text}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
