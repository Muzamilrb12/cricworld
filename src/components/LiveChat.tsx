"use client";
import { useState } from "react";

export default function LiveChat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([
    { user: "Muzamil", text: "What a shot by Rizwan! 🔥", time: "12:45" },
    { user: "CricketFan99", text: "Bumrah is unplayable today.", time: "12:46" },
    { user: "Alex", text: "Is it raining in Lahore?", time: "12:47" },
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    setChat([...chat, { user: "You", text: message, time: "Just now" }]);
    setMessage("");
  };

  return (
    <div className="glass rounded-3xl border border-white/5 flex flex-col h-[500px] overflow-hidden">
      <div className="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
        <h3 className="font-black italic uppercase text-sm tracking-tighter">Fan Live Chat</h3>
        <span className="flex items-center gap-2 text-[10px] font-bold text-accent">
          <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></span>
          14.2K Online
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
        {chat.map((msg, idx) => (
          <div key={idx} className={`flex flex-col ${msg.user === "You" ? "items-end" : "items-start"}`}>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[10px] font-bold ${msg.user === "You" ? "text-accent" : "text-muted-foreground"}`}>{msg.user}</span>
              <span className="text-[9px] text-muted-foreground/50">{msg.time}</span>
            </div>
            <div className={`px-4 py-2 rounded-2xl text-sm ${
              msg.user === "You" ? "bg-accent text-background font-medium rounded-tr-none" : "bg-white/5 border border-white/5 rounded-tl-none"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="p-4 bg-white/5 border-t border-white/5">
        <div className="relative">
          <input 
            type="text" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Join the conversation..."
            className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-accent"
          />
          <button type="submit" className="absolute right-2 top-2 p-1.5 text-accent hover:scale-110 transition-transform">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
