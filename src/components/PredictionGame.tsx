"use client";
import { useState } from "react";

export default function PredictionGame() {
  const [prediction, setPrediction] = useState<string | null>(null);
  const [result, setResult] = useState<{ msg: string; type: 'success' | 'fail' } | null>(null);
  const [loading, setLoading] = useState(false);

  const options = [
    { label: "Dot", value: "0" },
    { label: "1 Run", value: "1" },
    { label: "4 Runs", value: "4" },
    { label: "6 Runs", value: "6" },
    { label: "Wicket", value: "W" },
  ];

  const handlePredict = (val: string) => {
    setPrediction(val);
    setLoading(true);
    
    // Simulate real-time calculation
    setTimeout(() => {
      const win = Math.random() > 0.7; // 30% chance of winning for demo
      setResult({
        msg: win ? `Correct! You earned 100 points.` : `Oops! It was actually a ${Math.floor(Math.random() * 4)} run(s).`,
        type: win ? 'success' : 'fail'
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="glass p-6 rounded-3xl border border-accent/20 bg-accent/5">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
        <h3 className="font-black italic uppercase text-sm tracking-tighter">Live Prediction Game</h3>
      </div>
      
      <p className="text-xs text-muted-foreground mb-6">Predict what will happen on the next ball and win rewards!</p>
      
      {!result ? (
        <div className="grid grid-cols-3 gap-2">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handlePredict(opt.value)}
              disabled={loading}
              className={`py-3 rounded-xl glass text-[10px] font-bold border transition-all ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:border-accent hover:text-accent"
              } ${prediction === opt.value ? "border-accent text-accent" : "border-white/5"}`}
            >
              {loading && prediction === opt.value ? "..." : opt.label}
            </button>
          ))}
        </div>
      ) : (
        <div className={`p-4 rounded-2xl text-center ${result.type === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
          <p className="text-xs font-bold mb-3">{result.msg}</p>
          <button 
            onClick={() => { setResult(null); setPrediction(null); }}
            className="text-[10px] font-black uppercase tracking-widest hover:underline"
          >
            Predict Next Ball →
          </button>
        </div>
      )}
    </div>
  );
}
