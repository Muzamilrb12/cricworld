"use client";
import { useState, useEffect } from "react";
import { notificationManager } from "@/lib/notifications";

interface Notification {
  id: number;
  title: string;
  msg: string;
  type: 'wicket' | 'boundary' | 'info';
}

export default function NotificationToast() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const unsubscribe = notificationManager.subscribe((event) => {
      const newNotif = { ...event, id: Date.now() };
      setNotifications(prev => [...prev, newNotif]);

      // Play alert sound based on type
      if (typeof window !== 'undefined') {
        const audio = new Audio(event.type === 'wicket' ? '/wicket-alert.mp3' : '/boundary-alert.mp3');
        audio.volume = 0.3;
        audio.play().catch(() => {}); // Browser might block autoplay
      }

      // Remove after 5 seconds
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== newNotif.id));
      }, 5000);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4 w-full max-w-sm pointer-events-none">
      {notifications.map((notif) => (
        <div 
          key={notif.id} 
          className="pointer-events-auto glass p-6 rounded-[2rem] border border-white/10 shadow-2xl animate-in slide-in-from-right duration-500 bg-zinc-950/80 backdrop-blur-xl group"
        >
          <div className="flex items-start gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border border-white/5 ${
              notif.type === 'wicket' ? 'bg-red-500/20 text-red-500' : 
              notif.type === 'boundary' ? 'bg-accent/20 text-accent' : 
              'bg-blue-500/20 text-blue-400'
            }`}>
              {notif.type === 'wicket' ? (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              ) : (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-black italic uppercase text-lg tracking-tighter text-white">{notif.title}</h4>
                <button 
                  onClick={() => setNotifications(prev => prev.filter(n => n.id !== notif.id))} 
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed font-bold">{notif.msg}</p>
              <div className="mt-3 w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div className={`h-full animate-progress-shrink ${
                  notif.type === 'wicket' ? 'bg-red-500' : 'bg-accent'
                }`}></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
