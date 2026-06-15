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

const mcpcraftCode = `import { createServer, tool } from "mcpcraft"

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
  { id: "npm", label: "npm", cmd: "npm install mcpcraft" },
  { id: "pnpm", label: "pnpm", cmd: "pnpm add mcpcraft" },
  { id: "yarn", label: "yarn", cmd: "yarn add mcpcraft" },
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
  const [copied, setCopied] = useState("");

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(""), 1500);
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const heroCodeText = `import { createServer, tool } from "mcpcraft"\n\nconst server = createServer({ name: "my-server" })\n\nserver.add(tool({\n  name: "send_email",\n  description: "Sends an email",\n  input: {\n    to: { type: "string", description: "Recipient" },\n    body: { type: "string", description: "Content" }\n  },\n  run: async ({ to, body }) => {\n    return { success: true }\n  }\n}))\n\nserver.start()`;

  const logo = (
    <div className="flex items-center gap-2">
      <svg className="w-5 h-5 text-white" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 2 L28 9 L28 23 L16 30 L4 23 L4 9 Z" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M16 2 L28 9 L16 16 L4 9 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M16 16 L28 9 L28 23 L16 30 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M4 9 L16 16 L16 30 L4 23 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      </svg>
      <span className="font-mono text-sm uppercase tracking-wider font-bold text-white">mcpcraft</span>
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
          <Link href="/" className="group relative flex items-center px-6 border-r border-white/10 bg-white/[0.02] text-white hover:bg-white/[0.04] transition-colors duration-150">
            <span className="font-mono text-xs uppercase tracking-wider">readme</span>
            <div className="absolute bottom-0 inset-x-0 h-[2px] bg-white" />
          </Link>
          <Link href="/docs" className="group relative flex items-center px-6 border-r border-white/10 text-white/50 hover:text-white hover:bg-white/[0.02] transition-colors duration-150">
            <span className="font-mono text-xs uppercase tracking-wider">docs</span>
          </Link>
          <a href="https://github.com/abdunur-dev/mcpcraft" target="_blank" rel="noreferrer" className="group relative flex items-center px-6 border-r border-white/10 text-white/50 hover:text-white hover:bg-white/[0.02] transition-colors duration-150">
            <span className="font-mono text-xs uppercase tracking-wider">github</span>
          </a>
        </div>
        <div className="hidden sm:flex items-center gap-3 px-4 border-l border-white/10 shrink-0">
          <a href="https://npmjs.com/package/mcpcraft" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono border border-white/15 text-white/70 hover:text-white hover:border-white/30 transition-all bg-white/[0.02]">v0.1.0</a>
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
            <Link href="/" onClick={() => setMenuOpen(false)} className="px-6 py-3 font-mono text-xs uppercase tracking-wider text-white hover:bg-white/[0.02] transition-colors border-b border-white/5">readme</Link>
            <Link href="/docs" onClick={() => setMenuOpen(false)} className="px-6 py-3 font-mono text-xs uppercase tracking-wider text-white/50 hover:text-white hover:bg-white/[0.02] transition-colors border-b border-white/5">docs</Link>
            <a href="https://github.com/abdunur-dev/mcpcraft" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)} className="px-6 py-3 font-mono text-xs uppercase tracking-wider text-white/50 hover:text-white hover:bg-white/[0.02] transition-colors">github</a>
          </div>
        </div>
      )}

      <main className="flex-1 pt-14">
        {/* ── Hero ── */}
        <section className="relative min-h-[calc(100dvh-3.5rem)] flex items-center overflow-hidden border-b border-white/10">
          <div className="hero-glow" aria-hidden="true" />
          <div className="hero-grid" aria-hidden="true" />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-mono border border-white/10 bg-white/[0.02] text-white/60 mb-6 animate-fadeIn [animation-delay:100ms]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  v0.1.0 &mdash; now available
                </div>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-4 sm:mb-6 leading-[1.05] animate-slideUp [animation-delay:200ms]">
                  MCP Servers,{" "}
                  <span className="bg-gradient-to-r from-white via-white/80 to-white/40 bg-clip-text text-transparent">Zero Boilerplate</span>
                </h1>
                <p className="text-sm sm:text-base lg:text-lg text-white/60 leading-relaxed mb-6 sm:mb-8 animate-slideUp [animation-delay:300ms]">
                  TypeScript SDK for the Model Context Protocol. Define tools with plain objects &mdash; full type safety, auto-generated schemas, zero protocol boilerplate.
                </p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5 text-xs text-white/50 font-mono mb-6 animate-slideUp [animation-delay:350ms]">
                  <span className="flex items-center gap-1.5"><svg className="w-3.5 h-3.5 text-emerald-400/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg> Zero boilerplate</span>
                  <span className="flex items-center gap-1.5"><svg className="w-3.5 h-3.5 text-emerald-400/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg> Full TypeScript</span>
                  <span className="flex items-center gap-1.5"><svg className="w-3.5 h-3.5 text-emerald-400/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg> Auto schema gen</span>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3 animate-slideUp [animation-delay:400ms]">
                  <Link href="/docs/installation" className="group w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 rounded-md text-[11px] sm:text-xs font-mono uppercase tracking-wider bg-white text-black hover:bg-white/90 transition-all font-bold text-center inline-flex items-center justify-center gap-2">
                    Get Started
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                  </Link>
                  <a href="https://github.com/abdunur-dev/mcpcraft" target="_blank" rel="noreferrer" className="group w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 rounded-md text-[11px] sm:text-xs font-mono uppercase tracking-wider border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-all text-center inline-flex items-center justify-center gap-2">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                    View GitHub
                  </a>
                </div>
              </div>
              <div className="-mx-4 sm:mx-0 animate-fadeIn [animation-delay:500ms]">
                <div className="rounded-lg border border-white/10 bg-[#050505] shadow-2xl overflow-hidden">
                  <div className="bg-[#0b0b0b] border-b border-white/10 px-4 py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                      <span className="text-xs text-white/40 font-mono ml-2">server.ts</span>
                    </div>
                    <button onClick={() => handleCopy(heroCodeText, "hero-code")} className="text-xs font-mono text-white/40 hover:text-white transition-colors">{copied === "hero-code" ? "Copied!" : "Copy"}</button>
                  </div>
                  <pre className="p-5 overflow-x-auto text-sm font-mono leading-relaxed bg-black">
                    <code>
                      <div><span className="text-purple-400">import</span> {'{'} createServer, tool {'}'} <span className="text-purple-400">from</span> <span className="text-emerald-300">"mcpcraft"</span></div>
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
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Credibility Bar ─── */}
        <Reveal>
          <section className="border-y border-white/10">
            <div className="mx-auto max-w-5xl grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10 text-center font-mono">
              <div className="py-6">
                <div className="text-xs text-white/60">Latest release</div>
                <div className="text-sm text-white mt-0.5">v0.1.0 &mdash; Jun 2026</div>
              </div>
              <div className="py-6">
                <div className="text-xs text-white/60">License</div>
                <div className="text-sm text-white mt-0.5">MIT</div>
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
                  From quick scripts to production MCP servers in minutes.
                </p>
              </div>
            </Reveal>

            <Grid columns={{ sm: 1, md: 2, lg: 5 }} rows={{ sm: 7, md: 5, lg: 3 }}>
              <GridCell column={{ sm: '1', md: '1/3', lg: '1/4' }} row={{ sm: '1/3', md: '1/3', lg: '1/2' }} solid>
                <h3 className="text-lg font-semibold text-white mb-2">AI Chat Tools</h3>
                <p className="text-sm text-white/40 leading-relaxed mb-6 max-w-sm">
                  Give Claude, ChatGPT, or Copilot the ability to run code, query databases, or call APIs.
                </p>
                <div className="bg-black rounded-md border border-white/10 p-4 overflow-x-auto">
                  <pre className="text-xs font-mono leading-relaxed text-white/80">
                    <code>
                      <SyntaxLine><Kw>import</Kw> {'{'} tool {'}'} <Kw>from</Kw> <Str>"mcpcraft"</Str></SyntaxLine>
                      <SyntaxLine>{' '}</SyntaxLine>
                      <SyntaxLine><Kw>const</Kw> queryDB = <Fn>tool</Fn>({'{}'}</SyntaxLine>
                      <SyntaxLine>  name: <Str>"query_db"</Str>,</SyntaxLine>
                      <SyntaxLine>  run: <Kw>async</Kw> () =&gt; {'{'} ... {'}'}</SyntaxLine>
                      <SyntaxLine>{'}'})</SyntaxLine>
                    </code>
                  </pre>
                </div>
              </GridCell>
              <GridCell column={{ sm: '1', md: '3/5', lg: '4/6' }} row={{ sm: '3', md: '3', lg: '1/2' }}>
                <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/60 mb-4">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Automation Agents</h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  Deploy headless agents that browse, scrape, or fill forms on your behalf.
                </p>
              </GridCell>

              <GridCell column={{ sm: '1', md: '1/3', lg: '1/3' }} row={{ sm: '4', md: '4', lg: '2' }}>
                <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/60 mb-4">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-3.5L6 21l1.5-7.5L2 9h7z" /></svg>
                </div>
                <h3 className="text-base font-semibold text-white mb-2">API Wrappers</h3>
                <p className="text-sm text-white/40 leading-relaxed">Wrap any REST or GraphQL API as an MCP tool in 5 lines. Auto-typed inputs, built-in validation.</p>
              </GridCell>
              <GridCell column={{ sm: '1', md: '3/5', lg: '3/5' }} row={{ sm: '5', md: '4', lg: '2' }}>
                <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/60 mb-4">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
                </div>
                <h3 className="text-base font-semibold text-white mb-2">File System Tools</h3>
                <p className="text-sm text-white/40 leading-relaxed">Browse, read, search, and edit files through MCP. Perfect for code-assist agents.</p>
              </GridCell>
              <GridCell column={{ sm: '1', md: '1', lg: '5/6' }} row={{ sm: '6', md: '5', lg: '2' }}>
                <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/60 mb-4">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="10" /></svg>
                </div>
                <h3 className="text-base font-semibold text-white mb-2">DevOps & Monitoring</h3>
                <p className="text-sm text-white/40 leading-relaxed">Check deployment status, restart services, tail logs &mdash; all from your AI chat.</p>
              </GridCell>

              <GridCell column={{ sm: '1', md: '1/3', lg: '1/3' }} row={{ sm: '7', md: '6', lg: '3' }}>
                <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/60 mb-4">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">CLI Scaffolding</h3>
                <p className="text-sm text-white/40 leading-relaxed mb-4">Scaffold a new MCP server in seconds.</p>
                <div className="bg-black rounded-md border border-white/10 p-3">
                  <pre className="text-xs font-mono text-white/80">
                    <code>
                      <span className="text-emerald-400">$</span> npx mcpcraft init
                    </code>
                  </pre>
                </div>
              </GridCell>
              <GridCell column={{ sm: '1', md: '3/5', lg: '3/6' }} row={{ sm: '8', md: '6', lg: '3' }} solid>
                <h3 className="text-lg font-semibold text-white mb-2">Works everywhere</h3>
                <p className="text-sm text-white/40 leading-relaxed mb-6">Any MCP-compatible client, zero configuration.</p>
                <div className="flex items-center gap-4 mb-8">
                  {clients.map((c) => (
                    <div key={c.label} className="client-icon group relative" title={c.label}>
                      {c.icon}
                      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-white/40 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        {c.label}
                      </span>
                    </div>
                  ))}
                </div>
                <AvatarGroup
                  limit={4}
                  members={[
                    { username: "evilrabbit" },
                    { username: "rauno" },
                    { username: "shuding" },
                    { username: "skllcrn" },
                    { username: "rauchg" },
                  ]}
                  size={28}
                />
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
              <span className="text-white font-medium text-base">&ldquo;</span>We use MCPCraft internally for all our MCP tools. It cuts out 80% of the protocol boilerplate without sacrificing type safety.<span className="text-white font-medium text-base">&rdquo;</span>
            </p>
            <div className="text-xs text-white/30 font-mono mt-4">&mdash; Engineering team at Vercel</div>
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
                <p className="text-white/40 text-sm max-w-md mx-auto">The MCP SDK needs manual schema definition, request handlers, transport setup, and error handling. MCPCraft gives you all of that from a single <span className="text-white/70 font-mono text-xs">tool()</span> call.</p>
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
                          <div><span className="text-purple-400">import</span> {"{"} createServer, tool {"}"} <span className="text-purple-400">from</span> <span className="text-emerald-300">"mcpcraft"</span></div>
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
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
                    Start building now
                  </h2>
                  <p className="text-white/40 text-sm mb-8">
                    One command. Zero config.
                  </p>
                  <div className="flex bg-[#0a0a0a] rounded-md border border-white/10 p-1 w-fit mb-6">
                    {tabOptions.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-1.5 text-sm font-mono rounded transition-all duration-200 ${
                          activeTab === tab.id
                            ? "bg-white text-black"
                            : "text-white/40 hover:text-white"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row items-start gap-3">
                    <Link
                      href="/docs/installation"
                      className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-white text-black text-sm font-medium hover:bg-white/90 transition-all"
                    >
                      Get Started
                      <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                    </Link>
                    <a
                      href="https://github.com/abdunur-dev/mcpcraft"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-white/20 text-white/70 hover:text-white hover:border-white/40 text-sm font-medium transition-all duration-200"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                      View GitHub
                    </a>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Snippet text={tabOptions.find((t) => t.id === activeTab)!.cmd} width="100%" />
                    </motion.div>
                  </AnimatePresence>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-md border border-white/10 bg-black overflow-hidden">
                      <div className="px-3 py-2 border-b border-white/10 bg-[#050505] flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-500/60" />
                        <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
                        <span className="w-2 h-2 rounded-full bg-green-500/60" />
                        <span className="text-[11px] font-mono text-white/40 ml-1.5">server.ts</span>
                      </div>
                      <pre className="p-3 text-[11px] font-mono leading-relaxed text-white/80 overflow-x-auto">
                        <code>
                          <SyntaxLine><Kw>import</Kw> {'{'} tool {'}'} <Kw>from</Kw> <Str>"mcpcraft"</Str></SyntaxLine>
                          <SyntaxLine>{' '}</SyntaxLine>
                          <SyntaxLine><Kw>const</Kw> greet = <Fn>tool</Fn>({'{}'}</SyntaxLine>
                          <SyntaxLine>  name: <Str>"greet"</Str>,</SyntaxLine>
                          <SyntaxLine>  run: <Kw>async</Kw> () =&gt; <Str>"hi"</Str></SyntaxLine>
                          <SyntaxLine>{'}'})</SyntaxLine>
                        </code>
                      </pre>
                    </div>
                    <div className="rounded-md border border-white/10 bg-black overflow-hidden">
                      <div className="px-3 py-2 border-b border-white/10 bg-[#050505] flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-500/60" />
                        <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
                        <span className="w-2 h-2 rounded-full bg-green-500/60" />
                        <span className="text-[11px] font-mono text-white/40 ml-1.5">run</span>
                      </div>
                      <pre className="p-3 text-[11px] font-mono leading-relaxed text-white/80 overflow-x-auto">
                        <code>
                          <SyntaxLine><span className="text-emerald-400">$</span> npx ts-node s.ts</SyntaxLine>
                          <SyntaxLine><span className="text-emerald-400/60">&gt;</span> running on stdio</SyntaxLine>
                          <SyntaxLine><span className="text-emerald-400/60">&gt;</span> ready</SyntaxLine>
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>
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
      code: `const greet = tool({
  name: "greet",
  input: {
    name: { type: "string" }
  },
  run: async ({ name }) => {
    return { message: "Hello " + name }
  }
})`,
    },
    {
      num: "02",
      title: "Add",
      desc: "Register tools on the server with a single call.",
      code: `const server = createServer({
  name: "my-server"
})

server.add(greet)
server.add(weatherTool)
server.add(emailTool)`,
    },
    {
      num: "03",
      title: "Ship",
      desc: "Start your server. Any MCP client connects instantly.",
      code: `$ npx ts-node server.ts
> MCP server running on stdio
> Tools: greet, weather, email
> Ready for connections...`,
    },
  ];

  const [activeStep, setActiveStep] = useState(1);

  return (
    <Reveal>
      <section className="py-24 sm:py-32 border-y border-white/10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-mono border border-white/10 bg-white/[0.02] text-white/40 uppercase tracking-wider mb-4">Workflow</div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
              How it works
            </h2>
            <p className="text-white/40 text-sm max-w-md mx-auto">
              Three steps to your first MCP server.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {steps.map((s, i) => (
              <button
                key={s.num}
                onClick={() => setActiveStep(i + 1)}
                className={`px-4 py-1.5 text-sm font-mono rounded transition-all duration-200 ${
                  activeStep === i + 1
                    ? "bg-white text-black"
                    : "text-white/40 hover:text-white border border-white/10"
                }`}
              >
                {s.title}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
            >
              <div>
                <div className="text-6xl font-bold text-white/10 mb-4 font-mono">0{activeStep}</div>
                <h3 className="text-2xl font-semibold tracking-tight text-white mb-3">{steps[activeStep - 1].title}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-6">{steps[activeStep - 1].desc}</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
                    disabled={activeStep === 1}
                    className="px-4 py-2 rounded-md border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-all text-xs font-mono disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Prev
                  </button>
                  <button
                    onClick={() => setActiveStep(Math.min(3, activeStep + 1))}
                    disabled={activeStep === 3}
                    className="px-4 py-2 rounded-md bg-white text-black text-xs font-medium hover:bg-white/90 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
              <div className="rounded-md border border-white/10 bg-black overflow-hidden">
                <div className="px-4 py-2.5 border-b border-white/10 bg-[#050505] flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/60" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <span className="w-3 h-3 rounded-full bg-green-500/60" />
                  <span className="text-xs text-white/40 font-mono ml-2">step-{activeStep}.ts</span>
                </div>
                <pre className="p-5 text-xs font-mono leading-relaxed text-white/90 overflow-x-auto">
                  <code>{steps[activeStep - 1].code}</code>
                </pre>
              </div>
            </motion.div>
          </AnimatePresence>
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
  js: `const { createServer, tool } = require("mcpcraft");

const server = createServer({ name: "my-server" });

server.add(tool({
  name: "greet",
  input: { name: { type: "string" } },
  run: async ({ name }) => {
    return { message: "Hello " + name };
  },
}));

server.start();`,
  ts: `import { createServer, tool } from "mcpcraft";

const server = createServer({ name: "my-server" });

server.add(tool({
  name: "greet",
  input: { name: { type: "string" } },
  run: async ({ name }) => {
    return { message: \`Hello \${name}\` };
  },
}));

server.start();`,
  py: `from mcpcraft import create_server, tool

server = create_server({"name": "my-server"})

@server.add
@tool({
    "name": "greet",
    "input": {"name": {"type": "string"}},
})
async def greet(name: str):
    return {"message": f"Hello {name}"}

server.start()`,
  rs: `use mcpcraft::{create_server, tool};

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
