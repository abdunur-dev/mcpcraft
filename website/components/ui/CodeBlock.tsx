"use client";

import { useState } from "react";

interface SwitcherOption {
  label: string;
  value: string;
}

interface CodeBlockProps {
  children: React.ReactNode;
  "aria-label"?: string;
  filename?: string;
  language?: string;
  copyText?: string;
  switcher?: {
    options: SwitcherOption[];
    value: string;
    onChange: (value: string) => void;
  };
}

export function CodeBlock({ children, filename, switcher, copyText }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(copyText || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="rounded-md border border-white/10 bg-black overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-[#050505] flex-wrap gap-2">
        <div className="flex items-center gap-2">
          {filename && (
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              <span className="text-xs text-white/40 font-mono ml-1.5">{filename}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {switcher && (
            <select
              value={switcher.value}
              onChange={(e) => switcher.onChange(e.target.value)}
              className="bg-[#0a0a0a] border border-white/10 rounded text-[11px] font-mono text-white/60 px-2 py-1 focus:outline-none focus:border-white/30 cursor-pointer"
            >
              {switcher.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          )}
          <button
            onClick={handleCopy}
            className="text-xs font-mono text-white/40 hover:text-white transition-colors"
            aria-label="Copy code"
          >
            {copied ? (
              <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
            )}
          </button>
        </div>
      </div>
      <pre className="p-5 text-sm font-mono leading-relaxed overflow-x-auto">
        <code className="text-white/90">{children}</code>
      </pre>
    </div>
  );
}
