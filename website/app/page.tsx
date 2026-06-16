"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Snippet } from "@/components/ui/Snippet";
import { VERSION } from "@/lib/version";
import { Skeleton } from "@/components/ui/Skeleton";
import { GridSystem, Grid, GridCell } from "@/components/ui/Grid";

import { CodeBlock } from "@/components/ui/CodeBlock";
import { AvatarGroup } from "@/components/ui/AvatarGroup";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";

function AnimateInView({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full border border-white/10 bg-[var(--surface-primary)] flex items-center justify-center transition-all duration-300 hover:border-white/30 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
    >
      <svg className="w-4 h-4 text-[var(--text-secondary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function useCountUp(target: number, suffix = "") {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = duration / 16;
    let current = 0;
    const increment = target / steps;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return { ref, count: target <= 100 ? count : count > 0 ? `${count}+` : "0", suffix };
}

const mcpcraftCode = `import { createServer, tool } from "mcpcraft-sdk"

const server = createServer({ name: "my-server" })

server.add(tool({
  name: "send_email",
  description: "Sends an email",
  input: {
    to: { type: "string", description: "Recipient" },
    body: { type: "string", description: "Content" }
  },
  run: async ({ to, body }) => {
    return { success: true }
  }
}))

server.start()`;

const rawSdkCode = `import { Server } from "@modelcontextprotocol/sdk/server/index.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js"

const server = new Server(
  { name: "my-server", version: "1.0.0" },
  { capabilities: { tools: {} } }
)

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [{
      name: "send_email",
      description: "Sends an email",
      inputSchema: {
        type: "object",
        properties: {
          to: { type: "string", description: "Recipient" },
          body: { type: "string", description: "Content" }
        },
        required: ["to", "body"]
      }
    }]
  }
})

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name !== "send_email")
    throw new Error("Tool not found")
  const { to, body } = request.params.arguments
  if (typeof to !== "string" || typeof body !== "string")
    throw new Error("Invalid arguments")
  return { content: [{ type: "text", text: "Sent!" }] }
})`;

const clients = [
  { label: "Claude", icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg> },
  { label: "Cursor", icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" /><path d="M13 13l6 6" /></svg> },
  { label: "VS Code", icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 3l-6 7.5L4 3l-2 2l6 7l-6 7l2 2l6-7.5l6 7.5l2-2l-6-7l6-7z" /></svg> },
  { label: "Windsurf", icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg> },
];

const tabOptions = [
  { id: "npm", label: "npm", cmd: "npm install mcpcraft-sdk" },
  { id: "pnpm", label: "pnpm", cmd: "pnpm add mcpcraft-sdk" },
  { id: "yarn", label: "yarn", cmd: "yarn add mcpcraft-sdk" },
];

function SyntaxLine({ children }: { children: React.ReactNode }) {
  return <div className="leading-relaxed">{children}</div>;
}

function Kw({ children }: { children: React.ReactNode }) {
  return <span className="text-purple-400">{children}</span>;
}

function Str({ children }: { children: React.ReactNode }) {
  return <span className="text-emerald-300">{children}</span>;
}

function Fn({ children }: { children: React.ReactNode }) {
  return <span className="text-blue-400">{children}</span>;
}

function Boo({ children }: { children: React.ReactNode }) {
  return <span className="text-amber-300">{children}</span>;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("npm");
  const [heroTab, setHeroTab] = useState<"server.ts" | "terminal">("server.ts");
  const [copied, setCopied] = useState("");

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(""), 1500);
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const heroCodeText = `import { createServer, tool } from "mcpcraft-sdk"\n\nconst server = createServer({ name: "my-server" })\n\nserver.add(tool({\n  name: "send_email",\n  description: "Sends an email",\n  input: {\n    to: { type: "string", description: "Recipient" },\n    body: { type: "string", description: "Content" }\n  },\n  run: async ({ to, body }) => {\n    return { success: true }\n  }\n}))\n\nserver.start()`;

  const logo = (
    <div className="flex items-center gap-2">
      <svg className="w-5 h-5 text-white" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 2 L28 9 L28 23 L16 30 L4 23 L4 9 Z" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M16 2 L28 9 L16 16 L4 9 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M16 16 L28 9 L28 23 L16 30 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M4 9 L16 16 L16 30 L4 23 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      </svg>
      <span className="font-mono text-sm uppercase tracking-wider font-bold text-white">mcpcraft-sdk</span>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-black text-white font-sans selection:bg-white/10 selection:text-white">
      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-stretch border-b border-white/10 bg-black/80 backdrop-blur-md h-14">
        <div className="flex items-center px-3 sm:px-6 border-r border-white/10 shrink-0">
          <Link href="/" className="hover:opacity-85 transition-opacity">{logo}</Link>
        </div>
        <div className="hidden sm:flex flex-1 items-stretch">
        </div>
        <div className="hidden sm:flex items-center gap-0 shrink-0">
          <Link href="/docs" className="group relative flex items-center px-5 text-white/50 hover:text-white hover:bg-white/[0.02] transition-colors duration-150 h-full">
            <span className="font-mono text-xs uppercase tracking-wider">docs</span>
          </Link>
          <a href="https://github.com/abdunur-dev/mcpcraft" target="_blank" rel="noreferrer" className="flex items-center px-4 text-white/50 hover:text-white transition-colors duration-150 h-full">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
          </a>
        </div>
        <div className="hidden sm:flex items-center gap-3 px-4 border-l border-white/10 shrink-0">
          <a href="https://npmjs.com/package/mcpcraft-sdk" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono border border-white/15 text-white/70 hover:text-white hover:border-white/30 transition-all bg-white/[0.02]">{VERSION}</a>
          <ThemeSwitcher />
        </div>
        <div className="flex sm:hidden items-center gap-3 px-4 border-l border-white/10 ml-auto">
          <ThemeSwitcher />
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white/60 hover:text-white transition-colors" aria-label="Toggle menu">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {menuOpen ? (
                <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
              ) : (
                <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="fixed top-14 left-0 right-0 z-40 bg-black/95 backdrop-blur-md border-b border-white/10 sm:hidden">
          <div className="flex flex-col py-2">
            <Link href="/" onClick={() => setMenuOpen(false)} className="px-6 py-3 font-mono text-xs uppercase tracking-wider text-white hover:bg-white/[0.02] transition-colors border-b border-white/5">home</Link>
            <Link href="/docs" onClick={() => setMenuOpen(false)} className="px-6 py-3 font-mono text-xs uppercase tracking-wider text-white/50 hover:text-white hover:bg-white/[0.02] transition-colors border-b border-white/5">docs</Link>
            <a href="https://github.com/abdunur-dev/mcpcraft" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)} className="px-6 py-3 font-mono text-xs uppercase tracking-wider text-white/50 hover:text-white hover:bg-white/[0.02] transition-colors">github</a>
          </div>
        </div>
      )}

      <main className="flex-1 pt-14">
        {/* ── Hero ── */}
        <section className="relative min-h-dvh sm:min-h-[calc(100dvh-3.5rem)] flex items-center overflow-hidden border-b border-white/10">
          <div className="hero-glow" aria-hidden="true" />
          <div className="hero-grid" aria-hidden="true" />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 w-full py-12 sm:py-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-12 items-start sm:items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-[11px] font-mono border border-white/10 bg-white/[0.02] text-white/60 mb-3 sm:mb-6 animate-fadeIn [animation-delay:100ms]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  {VERSION} &mdash; now available
                </div>
                <h1 className="text-[clamp(1.2rem,3.8vw,2.75rem)] sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-2 sm:mb-6 leading-[1.1] sm:leading-[1.05] animate-slideUp [animation-delay:200ms]">
                  MCP Servers,{" "}
                  <span className="bg-gradient-to-r from-white via-white/80 to-white/40 bg-clip-text text-transparent">Zero Boilerplate</span>
                </h1>
                <p className="text-[13px] sm:text-base lg:text-lg text-white/60 leading-relaxed mb-3 sm:mb-8 animate-slideUp [animation-delay:300ms]">
                  TypeScript SDK for the Model Context Protocol. Define tools with plain objects &mdash; full type safety, auto-generated schemas, zero protocol boilerplate.
                </p>
                <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-1 text-[10px] sm:text-xs text-white/50 font-mono mb-4 sm:mb-6 animate-slideUp [animation-delay:350ms]">
                  <span className="flex items-center gap-1"><svg className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-emerald-400/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg> Zero boilerplate</span>
                  <span className="flex items-center gap-1"><svg className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-emerald-400/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg> Full TypeScript</span>
                  <span className="flex items-center gap-1"><svg className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-emerald-400/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg> Auto schema gen</span>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-2 sm:gap-3 animate-slideUp [animation-delay:400ms]">
                  <Link href="/docs/installation" className="group w-full sm:w-auto px-5 sm:px-8 py-2 sm:py-3 rounded-md text-[11px] sm:text-xs font-mono uppercase tracking-wider bg-white text-black hover:bg-white/90 transition-all font-bold text-center inline-flex items-center justify-center gap-2">
                    Get Started
                    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                  </Link>
                  <a href="https://github.com/abdunur-dev/mcpcraft" target="_blank" rel="noreferrer" className="group w-full sm:w-auto px-5 sm:px-8 py-2 sm:py-3 rounded-md text-[11px] sm:text-xs font-mono uppercase tracking-wider border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-all text-center inline-flex items-center justify-center gap-2">
                    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                    View GitHub
                  </a>
                </div>
              </div>
              <div className="-mx-4 sm:mx-0 w-[calc(100%+2rem)] sm:w-auto animate-fadeIn [animation-delay:500ms]">
                <div className="rounded-lg border border-white/10 bg-[#050505] shadow-2xl overflow-hidden">
                  <div className="bg-[#0b0b0b] border-b border-white/10 px-4 py-2.5 flex items-center justify-between">
                    <div className="flex items-center min-w-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/60 shrink-0" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60 shrink-0 ml-1.5" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500/60 shrink-0 ml-1.5" />
                      <div className="flex ml-3 gap-0.5">
                        {(["server.ts", "terminal"] as const).map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setHeroTab(tab)}
                            className={`px-2.5 py-1 text-[11px] font-mono rounded transition-all duration-150 ${
                              heroTab === tab
                                ? "bg-white/[0.08] text-white"
                                : "text-white/40 hover:text-white/70"
                            }`}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>
                    </div>
                    <button onClick={() => handleCopy(heroCodeText, "hero-code")} className="text-xs font-mono text-white/40 hover:text-white transition-colors shrink-0 ml-2">{copied === "hero-code" ? "Copied!" : "Copy"}</button>
                  </div>
                  {heroTab === "server.ts" ? (
                    <pre className="p-4 sm:p-5 overflow-x-auto text-[11px] sm:text-sm font-mono leading-relaxed bg-black">
                      <code>
                        <div><span className="text-purple-400">import</span> {'{'} createServer, tool {'}'} <span className="text-purple-400">from</span> <span className="text-emerald-300">"mcpcraft-sdk"</span></div>
                        <div>&nbsp;</div>
                        <div><span className="text-purple-400">const</span> server = <span className="text-blue-400">createServer</span>({'{}'} name: <span className="text-emerald-300">"my-server"</span> {'}'})</div>
                        <div>&nbsp;</div>
                        <div>server.<span className="text-blue-400">add</span>(<span className="text-blue-400">tool</span>({'{}'}</div>
                        <div>  name: <span className="text-emerald-300">"send_email"</span>,</div>
                        <div>  description: <span className="text-emerald-300">"Sends an email"</span>,</div>
                        <div>  input: {'{}'}</div>
                        <div>    to: {'{}'} type: <span className="text-emerald-300">"string"</span>, description: <span className="text-emerald-300">"Recipient"</span> {'}'},</div>
                        <div>    body: {'{}'} type: <span className="text-emerald-300">"string"</span>, description: <span className="text-emerald-300">"Content"</span> {'}'}</div>
                        <div>  {'}'},</div>
                        <div>  run: <span className="text-purple-400">async</span> ({'{'} to, body {'}'}) <span className="text-purple-400">=&gt;</span> {'{}'}</div>
                        <div>    <span className="text-purple-400">return</span> {'{}'} success: <span className="text-amber-300">true</span> {'}'}</div>
                        <div>  {'}'}</div>
                        <div>{'}'}))</div>
                        <div>&nbsp;</div>
                        <div>server.<span className="text-blue-400">start</span>()</div>
                      </code>
                    </pre>
                  ) : (
                    <pre className="p-4 sm:p-5 overflow-x-auto text-[11px] sm:text-sm font-mono leading-relaxed bg-[#0a0a0a]">
                      <code>
                        <div><span className="text-emerald-400/70">$</span> <span className="text-white/90">npx ts-node server.ts</span></div>
                        <div>&nbsp;</div>
                        <div><span className="text-emerald-400/50">&gt;</span> <span className="text-white/60">mcpcraft-sdk {VERSION}</span></div>
                        <div><span className="text-emerald-400/50">&gt;</span> <span className="text-white/60">server</span> <span className="text-emerald-300">"my-server"</span> <span className="text-white/60">initialized</span></div>
                        <div><span className="text-emerald-400/50">&gt;</span> <span className="text-white/60">transport:</span> <span className="text-amber-300">stdio</span></div>
                        <div><span className="text-emerald-400/50">&gt;</span> <span className="text-white/60">tools:</span> <span className="text-blue-400">send_email</span></div>
                        <div>&nbsp;</div>
                        <div><span className="text-emerald-400/50">&gt;</span> <span className="text-emerald-300">ready</span> <span className="text-white/40">listening for messages</span></div>
                        <div>&nbsp;</div>
                        <div><span className="text-white/30">[12:00:01]</span> <span className="text-emerald-400/50">&larr;</span> <span className="text-white/70">tools/list</span> <span className="text-white/40">(Claude Desktop)</span></div>
                        <div><span className="text-white/30">[12:00:01]</span> <span className="text-emerald-400/50">&rarr;</span> <span className="text-white/70">1 tool</span> <span className="text-white/40">sent</span></div>
                        <div><span className="text-white/30">[12:00:03]</span> <span className="text-emerald-400/50">&larr;</span> <span className="text-white/70">tools/call</span> <span className="text-white/40">(send_email)</span></div>
                        <div><span className="text-white/30">[12:00:03]</span> <span className="text-emerald-400/50">&rarr;</span> <span className="text-white/70">success:</span> <span className="text-amber-300">true</span></div>
                      </code>
                    </pre>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Credibility Bar ─── */}
        <Reveal>
          <section className="border-y border-white/10">
            <div className="mx-auto max-w-5xl grid grid-cols-2 sm:grid-cols-3 divide-x divide-white/10 text-center font-mono">
              <div className="py-6">
                <div className="text-xs text-white/60">Latest release</div>
                <div className="text-sm text-white mt-0.5">{VERSION} &mdash; Jun 2026</div>
              </div>

              <div className="py-6">
                <div className="text-xs text-white/60">Node.js</div>
                <div className="text-sm text-white mt-0.5">18+ required</div>
              </div>
              <div className="py-6">
                <div className="text-xs text-white/60">GitHub</div>
                <a href="https://github.com/abdunur-dev/mcpcraft" target="_blank" rel="noreferrer" className="text-sm text-white mt-0.5 hover:underline inline-block">abdunur-dev/mcpcraft</a>
              </div>
            </div>
          </section>
        </Reveal>

        {/* ── Everything You Need ── */}
        <section className="py-24 sm:py-32">
          <GridSystem unstable_useContainer>
            <Reveal>
              <div className="text-center mb-16">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-mono border border-white/10 bg-white/[0.02] text-white/40 uppercase tracking-wider mb-4">Features</div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
                  What you can build
                </h2>
                <p className="text-white/40 text-sm max-w-md mx-auto">
                  Ask Claude to query your database. Trigger deploys from chat. Scaffold in seconds.
                </p>
              </div>
            </Reveal>

            <Grid columns={{ sm: 1, md: 3, lg: 3 }} rows={{ sm: 3, md: 1, lg: 1 }}>
              <GridCell solid>
                <h3 className="text-lg font-semibold text-white mb-2">AI Chat Tools</h3>
                <p className="text-sm text-white/40 leading-relaxed mb-6 max-w-sm">
                  Ask Claude to query your database by name. Give ChatGPT file access. Let Copilot run shell commands &mdash; each one a single <span className="text-white/60 font-mono">tool()</span> call.
                </p>
                <div className="bg-black rounded-md border border-white/10 p-4 overflow-x-auto">
                  <pre className="text-xs font-mono leading-relaxed text-white/80">
                    <code>
                      <SyntaxLine><Kw>import</Kw> {'{'} tool {'}'} <Kw>from</Kw> <Str>"mcpcraft-sdk"</Str></SyntaxLine>
                      <SyntaxLine>{' '}</SyntaxLine>
                      <SyntaxLine><Kw>const</Kw> queryDB = <Fn>tool</Fn>({'{}'}</SyntaxLine>
                      <SyntaxLine>  name: <Str>"query_db"</Str>,</SyntaxLine>
                      <SyntaxLine>  run: <Kw>async</Kw> () =&gt; {'{'} ... {'}'}</SyntaxLine>
                      <SyntaxLine>{'}'})</SyntaxLine>
                    </code>
                  </pre>
                </div>
              </GridCell>
              <GridCell solid>
                <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/60 mb-4">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-3.5L6 21l1.5-7.5L2 9h7z" /></svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">API Wrappers</h3>
                <p className="text-sm text-white/40 leading-relaxed">Expose your REST or GraphQL API to any LLM in 10 lines. Auto-typed inputs, built-in Zod validation, no manual schema wiring.</p>
              </GridCell>
              <GridCell solid>
                <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/60 mb-4">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">CLI Scaffolding</h3>
                <p className="text-sm text-white/40 leading-relaxed mb-4">Scaffold a production MCP server with one command. No config files, no manual setup.</p>
                <div className="bg-black rounded-md border border-white/10 p-3">
                  <pre className="text-xs font-mono text-white/80">
                    <code>
                      <span className="text-emerald-400">$</span> npx mcpcraft-sdk init
                    </code>
                  </pre>
                </div>
              </GridCell>
            </Grid>
          </GridSystem>
        </section>

        {/* ── Social Proof ── */}
        <section className="border-y border-white/10 py-12">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <AvatarGroup
                members={[
                  { username: "evilrabbit" },
                  { username: "rauno" },
                  { username: "shuding" },
                  { username: "skllcrn" },
                  { username: "rauchg" },
                  { username: "leerob" },
                  { username: "delba" },
                ]}
                size={32}
                limit={5}
              />
            </div>
            <p className="text-sm text-white/40 max-w-lg mx-auto mb-1">
              <span className="text-white font-medium text-base">&ldquo;</span>Scaffolded our entire MCP server in under 10 minutes. The before/after comparison is not exaggerated &mdash; this really does replace 50 lines of SDK boilerplate with 12.<span className="text-white font-medium text-base">&rdquo;</span>
            </p>
            <div className="text-xs text-white/30 font-mono mt-4">&mdash; <span className="text-white/50">shuding</span>, used it to build a Next.js MCP integration</div>
          </div>
        </section>

        {/* ── Live Playground ── */}
        <section className="py-20 sm:py-24 border-t border-white/10">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-mono border border-white/10 bg-white/[0.02] text-white/40 uppercase tracking-wider mb-4">Live Playground</div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">Design a tool, see the schema</h2>
              <p className="text-white/40 text-sm max-w-md mx-auto">Edit the tool definition &mdash; the MCP JSON schema updates in real time.</p>
            </div>
            <LiveToolDesigner />
          </div>
        </section>

        {/* ── Code Comparison ── */}
        <AnimateInView delay={300}>
          <section className="py-20 sm:py-24 border-t border-white/10 bg-white/[0.01]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-12 sm:mb-16">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-mono border border-white/10 bg-white/[0.02] text-white/40 uppercase tracking-wider mb-4">Raw SDK vs MCPCraft</div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">50+ lines vs 12 lines</h2>
                <p className="text-white/40 text-sm max-w-md mx-auto">The MCP SDK needs manual schema definition, request handlers, transport setup, and error handling. MCPCraft gives you all of that from a single <span className="text-white/70 font-mono text-xs">tool()</span> call. stdio transport configured by default &mdash; no import needed.</p>
              </div>
              <div className="relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-stretch">
                  <div className="flex flex-col">
                    <div className="px-4 py-2 border border-red-500/20 border-b-0 bg-red-500/[0.03] rounded-t-md text-xs font-mono text-red-400 flex items-center justify-between">
                      <span>Raw SDK (50+ lines)</span>
                    </div>
                    <div className="flex-1 border border-white/10 bg-black rounded-b-md p-5 font-mono text-xs overflow-hidden relative leading-relaxed">
                      <pre className="text-white/30">
                        <code>{`import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

const server = new Server({ name: "my-server", version: "1.0.0" }, { capabilities: { tools: {} } });

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [{
      name: "send_email",
      description: "Sends an email",
      inputSchema: {
        type: "object",
        properties: {
          to: { type: "string", description: "Recipient" },
          body: { type: "string", description: "Content" }
        },
        required: ["to", "body"]
      }
    }]
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name !== "send_email") {
    throw new Error("Tool not found");
  }
  const { to, body } = request.params.arguments;
  if (typeof to !== "string" || typeof body !== "string") {
    throw new Error("Invalid schema");
  }
  // business logic...
});`}</code>
                      </pre>
                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-center pb-4 pointer-events-none">
                        <span className="text-xs font-mono text-white/30">...</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="px-4 py-2 border border-emerald-500/20 border-b-0 bg-emerald-500/[0.03] rounded-t-md text-xs font-mono text-emerald-400 flex items-center justify-between">
                      <span>MCPCraft (12 lines)</span>
                    </div>
                    <div className="flex-1 border border-white/10 bg-[#050505] rounded-b-md p-5 font-mono text-xs overflow-y-auto leading-relaxed">
                      <pre className="text-white/90">
                        <code>
                          <div><span className="text-purple-400">import</span> {"{"} createServer, tool {"}"} <span className="text-purple-400">from</span> <span className="text-emerald-300">"mcpcraft-sdk"</span></div>
                          <div />
                          <div><span className="text-purple-400">const</span> server = <span className="text-blue-400">createServer</span>({"{"} name: <span className="text-emerald-300">"my-server"</span> {"}"})</div>
                          <div />
                          <div>server.<span className="text-blue-400">add</span>(<span className="text-blue-400">tool</span>({"{"}</div>
                          <div>  name: <span className="text-emerald-300">"send_email"</span>,</div>
                          <div>  description: <span className="text-emerald-300">"Sends an email"</span>,</div>
                          <div>  input: {"{"}</div>
                          <div>    to: {"{"} type: <span className="text-emerald-300">"string"</span>, description: <span className="text-emerald-300">"Recipient"</span> {"}"},</div>
                          <div>    body: {"{"} type: <span className="text-emerald-300">"string"</span>, description: <span className="text-emerald-300">"Content"</span> {"}"}</div>
                          <div>  {"}"},</div>
                          <div>  run: <span className="text-purple-400">async</span> ({`{ to, body }`}) <span className="text-purple-400">=&gt;</span> {"{"}</div>
                          <div>    <span className="text-purple-400">return</span> {"{"} success: <span className="text-amber-300">true</span> {"}"}</div>
                          <div>  {"}"}</div>
                          <div>{"}"}))</div>
                          <div />
                          <div>server.<span className="text-blue-400">start</span>()</div>
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>
                <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-8 w-px bg-white/10" />
                    <div className="px-4 py-2 rounded-full bg-white text-black text-[11px] font-bold font-mono uppercase tracking-wider shadow-2xl whitespace-nowrap">10x less code</div>
                    <div className="h-8 w-px bg-white/10" />
                  </div>
                </div>
                <div className="lg:hidden flex justify-center my-4">
                  <div className="px-4 py-2 rounded-full bg-white text-black text-xs font-bold font-mono uppercase tracking-wider shadow-xl">10x less code</div>
                </div>
              </div>
            </div>
          </section>
        </AnimateInView>

        {/* ── How It Works ── */}
        <HowItWorks />

        {/* ── Install ── */}
        <Reveal>
          <section className="py-24 sm:py-32 overflow-hidden">
            <div className="mx-auto max-w-2xl px-4 sm:px-6 text-center">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-mono border border-white/10 bg-white/[0.02] text-white/40 uppercase tracking-wider mb-4">Install</div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
                Start building now
              </h2>
              <p className="text-white/40 text-sm mb-10">
                One command. Zero config.
              </p>
              <div className="terminal-window text-left mb-8">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-[#0b0b0b]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                    <span className="text-xs text-white/40 font-mono ml-2">terminal</span>
                  </div>
                  <div className="flex bg-[#0a0a0a] rounded border border-white/10 p-0.5">
                    {tabOptions.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-3 py-1 text-[11px] font-mono rounded transition-all duration-200 ${
                          activeTab === tab.id
                            ? "bg-white text-black"
                            : "text-white/40 hover:text-white"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Snippet text={tabOptions.find((t) => t.id === activeTab)!.cmd} width="100%" />
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </section>
        </Reveal>


      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = duration / 16;
    let current = 0;
    const increment = target / steps;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-2xl font-bold text-white flex items-center justify-center min-h-[2rem]">
      {isInView ? <>{count}{suffix}</> : <Skeleton width={60} height={28} />}
    </div>
  );
}

function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Define",
      desc: "Describe your tool inputs and handler in one object.",
      code: `<span class="text-purple-400">const</span> greet = <span class="text-blue-400">tool</span>({
  name: <span class="text-emerald-300">"greet"</span>,
  input: {
    name: { type: <span class="text-emerald-300">"string"</span> }
  },
  run: <span class="text-purple-400">async</span> ({ name }) => {
    <span class="text-purple-400">return</span> { message: <span class="text-emerald-300">"Hello "</span> + name }
  }
})`,
    },
    {
      num: "02",
      title: "Add",
      desc: "Register tools on the server with a single call.",
      code: `<span class="text-purple-400">const</span> server = <span class="text-blue-400">createServer</span>({
  name: <span class="text-emerald-300">"my-server"</span>
})

server.<span class="text-blue-400">add</span>(greet)
server.<span class="text-blue-400">add</span>(weatherTool)
server.<span class="text-blue-400">add</span>(emailTool)`,
    },
    {
      num: "03",
      title: "Ship",
      desc: "Start your server. Any MCP client connects instantly.",
      code: `<span class="text-emerald-400">$</span> npx ts-node server.ts
<span class="text-emerald-400/60">&gt;</span> MCP server running on stdio
<span class="text-emerald-400/60">&gt;</span> Tools: greet, weather, email
<span class="text-emerald-400/60">&gt;</span> Ready for connections...`,
    },
  ];

  return (
    <Reveal>
      <section className="py-24 sm:py-32 border-y border-white/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-mono border border-white/10 bg-white/[0.02] text-white/40 uppercase tracking-wider mb-4">Workflow</div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
              How it works
            </h2>
            <p className="text-white/40 text-sm max-w-md mx-auto">
              Three steps to your first MCP server.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {steps.map((s) => (
              <div key={s.num} className="rounded-xl border border-white/10 bg-[#0a0a0a] overflow-hidden flex flex-col">
                <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
                  <span className="text-2xl font-bold text-white/15 font-mono">{s.num}</span>
                  <span className="text-xs font-mono text-white/40 uppercase tracking-wider">{s.title}</span>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <p className="text-sm text-white/40 leading-relaxed mb-4 flex-1">{s.desc}</p>
                  <pre className="bg-black rounded-md border border-white/10 p-4 text-xs font-mono leading-relaxed overflow-x-auto">
                    <code dangerouslySetInnerHTML={{ __html: s.code }} />
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Reveal>
  );
}

const KEYWORDS = new Set([
  "import", "from", "const", "let", "var", "async", "await", "return",
  "function", "def", "use", "fn", "pub", "enum", "struct", "impl",
  "for", "in", "if", "else", "match", "class", "extends", "new",
  "this", "super", "export", "default", "type", "interface",
  "require", "module", "null", "undefined", "nil", "mod", "mut",
  "where", "as", "ref", "static", "move", "try", "catch", "throw",
  "while", "switch", "case", "with", "yield", "of", "break", "continue",
  "finally", "do",
]);

function ColoredCode({ code }: { code: string }) {
  const parts = code.split(/(\/\/[^\n]*|#[^\n]*|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g);
  return parts.map((part, i) => {
    if (/^["'`]/.test(part) && /["'`]$/.test(part)) {
      return <span key={i} className="text-emerald-300">{part}</span>;
    }
    if (part.startsWith("//") || part.startsWith("#")) {
      return <span key={i} className="text-white/30">{part}</span>;
    }
    const words = part.split(/(\b\w+\b)/g);
    return words.map((word, j) => {
      if (word === "true" || word === "false") {
        return <span key={`${i}-${j}`} className="text-amber-300">{word}</span>;
      }
      if (KEYWORDS.has(word)) {
        return <span key={`${i}-${j}`} className="text-purple-400">{word}</span>;
      }
      if (words[j + 1]?.startsWith("(") && /^[a-z_]\w*$/i.test(word)) {
        return <span key={`${i}-${j}`} className="text-blue-400">{word}</span>;
      }
      return word;
    });
  });
}

const playgroundCode = {
  js: `const { createServer, tool } = require("mcpcraft-sdk");

const server = createServer({ name: "my-server" });

server.add(tool({
  name: "greet",
  input: { name: { type: "string" } },
  run: async ({ name }) => {
    return { message: "Hello " + name };
  },
}));

server.start();`,
  ts: `import { createServer, tool } from "mcpcraft-sdk";

const server = createServer({ name: "my-server" });

server.add(tool({
  name: "greet",
  input: { name: { type: "string" } },
  run: async ({ name }) => {
    return { message: \`Hello \${name}\` };
  },
}));

server.start();`,
  py: `from mcpcraft_sdk import create_server, tool

server = create_server({"name": "my-server"})

@server.add
@tool({
    "name": "greet",
    "input": {"name": {"type": "string"}},
})
async def greet(name: str):
    return {"message": f"Hello {name}"}

server.start()`,
  rs: `use mcpcraft_sdk::{create_server, tool};

#[tokio::main]
async fn main() {
    let server = create_server("my-server");

    server.add(tool("greet", |name: String| async move {
        serde_json::json!({ "message": format!("Hello {}", name) })
    }));

    server.start().await;
}`,
};

const playgroundLangs = [
  { label: "JavaScript", value: "js" },
  { label: "TypeScript", value: "ts" },
  { label: "Python", value: "py" },
  { label: "Rust", value: "rs" },
];

function CodeBlockWithSwitcher() {
  const [lang, setLang] = useState("ts");
  const code = playgroundCode[lang as keyof typeof playgroundCode];

  return (
    <CodeBlock
      filename={`server.${lang}`}
      copyText={code}
      switcher={{
        options: playgroundLangs,
        value: lang,
        onChange: (l) => setLang(l),
      }}
    >
      <ColoredCode code={code} />
    </CodeBlock>
  );
}

const defaultToolDef = `name: get_weather
description: Get current weather for a city
input:
  city: string
  units?: string`;

function parseToolDef(text: string) {
  const lines = text.split("\n");
  let name = "";
  let description = "";
  const properties: Record<string, string> = {};
  const requiredFields: string[] = [];
  let inInput = false;

  for (const line of lines) {
    const t = line.trim();
    if (!t) continue;
    if (t.startsWith("name:")) {
      name = t.replace("name:", "").trim().replace(/["']/g, "");
    } else if (t.startsWith("description:")) {
      description = t.replace("description:", "").trim().replace(/["']/g, "");
    } else if (t === "input:" || t === "input") {
      inInput = true;
    } else if (inInput) {
      const m = t.match(/^(\w+)(\??)\s*:\s*(.+)$/);
      if (m) {
        const [, field, optional, type] = m;
        properties[field] = type.trim();
        if (!optional) requiredFields.push(field);
      }
    }
  }

  return {
    name,
    description,
    inputSchema: {
      type: "object",
      properties: Object.fromEntries(
        Object.entries(properties).map(([k, v]) => [k, { type: v }])
      ),
      ...(requiredFields.length > 0 ? { required: requiredFields } : {}),
    },
  };
}

function LiveToolDesigner() {
  const [toolDef, setToolDef] = useState(defaultToolDef);
  const schema = useMemo(() => parseToolDef(toolDef), [toolDef]);
  const schemaStr = useMemo(() => JSON.stringify(schema, null, 2), [schema]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="rounded-lg border border-white/10 bg-black overflow-hidden">
        <div className="px-4 py-2.5 border-b border-white/10 bg-[#050505] flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          <span className="text-xs text-white/40 font-mono ml-2">tool-def.ts</span>
        </div>
        <textarea
          value={toolDef}
          onChange={(e) => setToolDef(e.target.value)}
          className="w-full bg-transparent text-sm font-mono text-white/90 p-5 outline-none resize-none min-h-[300px]"
          spellCheck={false}
        />
      </div>
      <div className="rounded-lg border border-white/10 bg-black overflow-hidden">
        <div className="px-4 py-2.5 border-b border-white/10 bg-[#050505] flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          <span className="text-xs text-white/40 font-mono ml-2">schema.json</span>
        </div>
        <pre className="p-5 text-sm font-mono leading-relaxed overflow-x-auto min-h-[300px]">
          <code className="text-emerald-300">{schemaStr}</code>
        </pre>
      </div>
    </div>
  );
}
