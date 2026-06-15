"use client";

import { useState } from "react";

interface SnippetProps {
  text: string | string[];
  width?: string;
  prompt?: boolean;
  className?: string;
}

export function Snippet({ text, width, prompt = true, className = "" }: SnippetProps) {
  const [copied, setCopied] = useState(false);
  const lines = Array.isArray(text) ? text : [text];
  const copyValue = lines.join("\n");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(copyValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className={`group flex items-stretch rounded-md border border-white/10 bg-black overflow-hidden ${className}`}
      style={width ? { width } : undefined}
    >
      <div className="flex-1 min-w-0">
        {lines.map((line, i) => (
          <div
            key={i}
            className="px-4 py-1.5 text-sm font-mono leading-relaxed text-white/80 border-b border-white/5 last:border-b-0"
          >
            {prompt && i === 0 && <span className="text-emerald-400 select-none mr-2">$</span>}
            {line}
          </div>
        ))}
      </div>
      <button
        onClick={handleCopy}
        className="flex items-center justify-center px-3 border-l border-white/10 text-white/30 hover:text-white hover:bg-white/[0.03] transition-all shrink-0"
        aria-label="Copy"
      >
        {copied ? (
          <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
        ) : (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
        )}
      </button>
    </div>
  );
}
