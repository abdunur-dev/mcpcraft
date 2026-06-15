"use client";

import { useState } from "react";

interface FeedbackProps {
  dryRun?: boolean;
  label: string;
  prefix?: React.ReactNode;
}

export function Feedback({ dryRun, label, prefix }: FeedbackProps) {
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);

  const handle = (type: "up" | "down") => {
    if (dryRun) {
      console.log(`[Feedback] ${label}: ${type}`);
    }
    setFeedback(type);
  };

  return (
    <div className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-[#0a0a0a] px-3 py-2 text-xs font-mono text-white/50">
      {prefix && <span className="text-white/40">{prefix}</span>}
      <span className="text-white/40">{label}</span>
      <span className="text-white/10">|</span>
      <button
        onClick={() => handle("up")}
        className={`transition-colors ${feedback === "up" ? "text-emerald-400" : "hover:text-white"}`}
        aria-label="Thumbs up"
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" /></svg>
      </button>
      <button
        onClick={() => handle("down")}
        className={`transition-colors ${feedback === "down" ? "text-red-400" : "hover:text-white"}`}
        aria-label="Thumbs down"
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" /></svg>
      </button>
    </div>
  );
}
