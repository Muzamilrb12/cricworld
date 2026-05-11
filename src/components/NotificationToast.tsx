"use client";
import { useState, useEffect } from "react";

export default function NotificationToast() {
  const [visible, setVisible] = useState(false);
  const [notification, setNotification] = useState({ title: "", msg: "", type: "wicket" });

  useEffect(() => {
    // Simulate periodic notifications
    const timer = setTimeout(() => {
      setNotification({
        title: "WICKET!",
        msg: "Jasprit Bumrah dismisses Ruturaj Gaikwad. CSK in trouble!",
        type: "wicket"
      });
      setVisible(true);
      
      // Auto hide after 5 seconds
      setTimeout(() => setVisible(false), 5000);
    }, 10000); // Show after 10 seconds of landing

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-8 right-8 z-[100] w-full max-w-sm glass p-6 rounded-3xl border border-accent/20 shadow-2xl animate-in slide-in-from-right duration-500">
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
          notification.type === 'wicket' ? 'bg-red-500/20 text-red-500' : 'bg-accent/20 text-accent'
        }`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-black italic uppercase text-sm tracking-tighter text-white">{notification.title}</h4>
            <button onClick={() => setVisible(false)} className="text-muted-foreground hover:text-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">{notification.msg}</p>
        </div>
      </div>
    </div>
  );
}
