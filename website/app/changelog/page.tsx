"use client";

import Link from "next/link";

const entries = [
  {
    version: "0.1.0",
    date: "June 2026",
    changes: [
      "Initial release",
      "createServer() — create an MCP server with stdio transport",
      "tool() — define tools with typed inputs and auto-generated JSON Schema",
      "Built-in Zod validation for tool inputs",
      "Full TypeScript support with type inference",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white/10 selection:text-white">
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center border-b border-white/10 bg-black/80 backdrop-blur-md h-14 px-4 sm:px-6">
        <Link href="/" className="font-mono text-sm uppercase tracking-wider font-bold text-white hover:opacity-80 transition-opacity">
          MCPCRAFT
        </Link>
      </div>

      <main className="pt-24 pb-16 px-4 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2 font-mono">Changelog</h1>
          <p className="text-sm text-white/40 font-mono mb-8">Release history for mcpcraft-sdk.</p>

          <div className="space-y-8">
            {entries.map((entry) => (
              <div key={entry.version} className="border border-white/10 rounded-lg p-6">
                <div className="flex items-baseline gap-3 mb-4">
                  <h2 className="text-lg font-semibold text-white font-mono">{entry.version}</h2>
                  <time className="text-xs text-white/30 font-mono">{entry.date}</time>
                </div>
                <ul className="space-y-2">
                  {entry.changes.map((change, i) => (
                    <li key={i} className="text-sm text-white/60 font-mono flex items-start gap-2">
                      <span className="text-emerald-400/70 mt-1 shrink-0">-</span>
                      {change}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
