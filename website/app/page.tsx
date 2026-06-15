"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";

function AnimateInView({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
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

function StaggerReveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FadeUpChild({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
      }}
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
  { label: "Claude", icon: "C" },
  { label: "Cursor", icon: "Cu" },
  { label: "VS Code", icon: "V" },
  { label: "Windsurf", icon: "W" },
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
        <div className="hidden sm:flex items-center px-6 border-l border-white/10 shrink-0">
          <a href="https://npmjs.com/package/mcpcraft" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono border border-white/15 text-white/70 hover:text-white hover:border-white/30 transition-all bg-white/[0.02]">v0.1.0</a>
        </div>
        <div className="flex sm:hidden items-center px-4 border-l border-white/10 ml-auto">
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
                  Build MCP Servers{" "}
                  <span className="bg-gradient-to-r from-white via-white/80 to-white/40 bg-clip-text text-transparent">Fast</span>
                </h1>
                <p className="text-sm sm:text-base lg:text-lg text-white/60 leading-relaxed mb-6 sm:mb-8 animate-slideUp [animation-delay:300ms]">
                  A lightweight TypeScript SDK for building Model Context Protocol servers. Zero boilerplate, full type safety, and automatic schema validation.
                </p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5 text-xs text-white/50 font-mono mb-6 animate-slideUp [animation-delay:350ms]">
                  <span className="flex items-center gap-1.5"><svg className="w-3.5 h-3.5 text-emerald-400/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg> Fully typed schemas</span>
                  <span className="flex items-center gap-1.5"><svg className="w-3.5 h-3.5 text-emerald-400/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg> Automatic validation</span>
                  <span className="flex items-center gap-1.5"><svg className="w-3.5 h-3.5 text-emerald-400/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg> 10 lines to a server</span>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3 animate-slideUp [animation-delay:400ms]">
                  <Link href="/docs/installation" className="group w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 rounded-md text-[11px] sm:text-xs font-mono uppercase tracking-wider bg-white text-black hover:bg-white/90 transition-all font-bold text-center inline-flex items-center justify-center gap-2">
                    Get Started
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                  </Link>
                  <a href="https://github.com/abdunur-dev/mcpcraft" target="_blank" rel="noreferrer" className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 rounded-md text-[11px] sm:text-xs font-mono uppercase tracking-wider border border-white/15 hover:border-white/30 text-white transition-colors text-center inline-flex items-center justify-center gap-2">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                    View GitHub
                  </a>
                </div>
              </div>
              <div className="-mx-4 sm:mx-0 animate-fadeIn [animation-delay:500ms]">
                <div className="rounded-lg border border-white/10 bg-[#050505] shadow-2xl overflow-hidden">
                  <div className="bg-[#0b0b0b] border-b border-white/10 px-4 py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                      <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                      <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
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

        {/* ─── Stats ─── */}
        <Reveal>
          <section className="border-t border-b border-[rgba(255,255,255,0.08)]">
            <div className="mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 divide-x-0 sm:divide-x divide-[rgba(255,255,255,0.08)] text-center font-mono">
              <div className="py-8">
                <CountUp target={5} suffix="" />
                <div className="text-[11px] text-[#555555] uppercase tracking-widest mt-1">Time to first server</div>
              </div>
              <div className="py-8">
                <CountUp target={100} suffix="%" />
                <div className="text-[11px] text-[#555555] uppercase tracking-widest mt-1">TypeScript coverage</div>
              </div>
              <div className="py-8">
                <div className="text-2xl font-bold text-white">MIT</div>
                <div className="text-[11px] text-[#555555] uppercase tracking-widest mt-1">License</div>
              </div>
            </div>
          </section>
        </Reveal>

        {/* ─── Bento Features ─── */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.03em] text-white mb-3">
                  Everything you need
                </h2>
                <p className="text-[#888888] text-sm sm:text-base max-w-md mx-auto">
                  A framework that gets out of your way. Define tools. Ship servers.
                </p>
              </div>
            </Reveal>

            {/* Row 1: 60/40 */}
            <StaggerReveal className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4">
              <FadeUpChild className="lg:col-span-3">
                <div className="bento-card-lg h-full flex flex-col relative overflow-hidden">
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />
                  <div className="relative z-10">
                    <h3 className="text-lg font-semibold text-white mb-2">Zero Boilerplate</h3>
                    <p className="text-sm text-[#888888] leading-relaxed mb-6 max-w-sm">
                      Skip protocol setup entirely. Define tools with a plain object and ship.
                    </p>
                    <div className="bg-[#111111] rounded-xl border border-[rgba(255,255,255,0.06)] p-4 overflow-x-auto">
                      <pre className="text-xs font-mono leading-relaxed text-white/80">
                        <code>
                          <SyntaxLine><Kw>import</Kw> {'{'} tool {'}'} <Kw>from</Kw> <Str>"mcpcraft"</Str></SyntaxLine>
                          <SyntaxLine>{' '}</SyntaxLine>
                          <SyntaxLine><Kw>const</Kw> myTool = <Fn>tool</Fn>({'{}'}</SyntaxLine>
                          <SyntaxLine>  name: <Str>"hello"</Str>,</SyntaxLine>
                          <SyntaxLine>  run: <Kw>async</Kw> () =&gt; {'{'} ... {'}'}</SyntaxLine>
                          <SyntaxLine>{'}'})</SyntaxLine>
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>
              </FadeUpChild>
              <FadeUpChild className="lg:col-span-2">
                <div className="bento-card h-full flex flex-col items-start justify-center relative overflow-hidden">
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/[0.03] rounded-full blur-2xl pointer-events-none" />
                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/60 mb-4 text-sm font-mono font-bold">
                      TS
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Full Type Safety</h3>
                    <p className="text-sm text-[#888888] leading-relaxed max-w-xs">
                      Inputs inferred automatically. No manual typing. No casting.
                    </p>
                  </div>
                </div>
              </FadeUpChild>
            </StaggerReveal>

            {/* Row 2: 3 equal columns */}
            <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {[
                {
                  icon: (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-3.5L6 21l1.5-7.5L2 9h7z" />
                    </svg>
                  ),
                  title: "Runtime Validation",
                  desc: "Zod-powered validation catches errors before they reach your handler.",
                },
                {
                  icon: (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
                    </svg>
                  ),
                  title: "Tools & Resources",
                  desc: "One API for tools, resources, templates. Simple and composable.",
                },
                {
                  icon: (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="10" />
                    </svg>
                  ),
                  title: "Standards Compliant",
                  desc: "100% MCP spec compliant. Works with Claude, Cursor, and more.",
                },
              ].map((f, i) => (
                <FadeUpChild key={i}>
                  <div className="bento-card h-full flex flex-col">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/60 mb-4">
                      {f.icon}
                    </div>
                    <h3 className="text-base font-semibold text-white mb-2">{f.title}</h3>
                    <p className="text-sm text-[#888888] leading-relaxed">{f.desc}</p>
                  </div>
                </FadeUpChild>
              ))}
            </StaggerReveal>

            {/* Row 3: 40/60 */}
            <StaggerReveal className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              <FadeUpChild className="lg:col-span-2">
                <div className="bento-card h-full flex flex-col">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/60 mb-4 text-lg">
                    {'>_'}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">CLI Scaffolding</h3>
                  <p className="text-sm text-[#888888] leading-relaxed mb-4">Scaffold a new project in seconds.</p>
                  <div className="bg-[#111111] rounded-xl border border-[rgba(255,255,255,0.06)] p-3">
                    <pre className="text-xs font-mono text-white/80">
                      <code>
                        <span className="text-emerald-400">$</span> npx mcpcraft init
                      </code>
                    </pre>
                  </div>
                </div>
              </FadeUpChild>
              <FadeUpChild className="lg:col-span-3">
                <div className="bento-card-lg h-full flex flex-col">
                  <h3 className="text-lg font-semibold text-white mb-2">Works everywhere</h3>
                  <p className="text-sm text-[#888888] leading-relaxed mb-6">Any MCP-compatible client, zero configuration.</p>
                  <div className="flex items-center gap-4">
                    {clients.map((c) => (
                      <div key={c.label} className="client-icon group relative" title={c.label}>
                        {c.icon}
                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-[#555555] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                          {c.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUpChild>
            </StaggerReveal>
          </div>
        </section>

        {/* ── Code Comparison ── */}
        <AnimateInView delay={300}>
          <section className="py-20 sm:py-24 border-t border-white/10 bg-white/[0.01]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-12 sm:mb-16">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-mono border border-white/10 bg-white/[0.02] text-white/40 uppercase tracking-wider mb-4">Before vs After</div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">Less code. More done.</h2>
                <p className="text-white/40 text-sm max-w-md mx-auto">See the difference between the raw MCP SDK and MCPCraft for the same email tool.</p>
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
                      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
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

        {/* ─── Install ─── */}
        <Reveal>
          <section className="py-24 sm:py-32">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.03em] text-white mb-3">
                Start building now
              </h2>
              <p className="text-[#888888] text-sm mb-10">
                One command. Zero config.
              </p>

              <div className="max-w-xs mx-auto mb-8">
                <div className="flex bg-[#0a0a0a] rounded-xl border border-[rgba(255,255,255,0.08)] p-1">
                  {tabOptions.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 px-4 py-2 text-sm font-mono rounded-lg transition-all duration-200 ${
                        activeTab === tab.id
                          ? "bg-white text-black"
                          : "text-[#555555] hover:text-white"
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
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="code-block-card text-left max-w-md mx-auto mb-12">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(255,255,255,0.06)]">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-500/60" />
                        <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                        <span className="w-3 h-3 rounded-full bg-green-500/60" />
                        <span className="text-xs text-[#555555] font-mono ml-2">terminal</span>
                      </div>
                      <button
                        onClick={() => handleCopy(tabOptions.find((t) => t.id === activeTab)!.cmd, "install")}
                        className="text-xs font-mono text-[#555555] hover:text-white transition-colors"
                      >
                        {copied === "install" ? (
                          <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                        ) : (
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
                        )}
                      </button>
                    </div>
                    <pre className="p-5 text-sm font-mono leading-relaxed text-white/90 overflow-x-auto">
                      <code>
                        <span className="text-emerald-400">$</span> {tabOptions.find((t) => t.id === activeTab)!.cmd}
                      </code>
                    </pre>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
                <div className="code-block-card">
                  <div className="px-4 py-2.5 border-b border-[rgba(255,255,255,0.06)] text-xs font-mono text-[#555555]">
                    server.ts
                  </div>
                  <pre className="p-4 text-xs font-mono leading-relaxed text-white/80 overflow-x-auto">
                    <code>
                      <SyntaxLine><Kw>import</Kw> {'{'} createServer, tool {'}'} <Kw>from</Kw> <Str>"mcpcraft"</Str></SyntaxLine>
                      <SyntaxLine>{' '}</SyntaxLine>
                      <SyntaxLine><Kw>const</Kw> server = <Fn>createServer</Fn>({'{}'} name: <Str>"my-server"</Str> {'}'})</SyntaxLine>
                      <SyntaxLine>{' '}</SyntaxLine>
                      <SyntaxLine>server.<Fn>add</Fn>(</SyntaxLine>
                      <SyntaxLine>  <Fn>tool</Fn>({'{}'}</SyntaxLine>
                      <SyntaxLine>    name: <Str>"greet"</Str>,</SyntaxLine>
                      <SyntaxLine>    input: {'{}'}</SyntaxLine>
                      <SyntaxLine>      name: {'{}'} type: <Str>"string"</Str> {'}'}</SyntaxLine>
                      <SyntaxLine>    {'}'},</SyntaxLine>
                      <SyntaxLine>    run: <Kw>async</Kw> ({'{'} name {'}'}) =&gt; {'{}'}</SyntaxLine>
                      <SyntaxLine>      <Kw>return</Kw> {'{'} message: <Str>`Hello </Str>{'{'}name{'}'}<Str>`</Str> {'}'}</SyntaxLine>
                      <SyntaxLine>    {'}'}</SyntaxLine>
                      <SyntaxLine>  {'}'})</SyntaxLine>
                      <SyntaxLine>)</SyntaxLine>
                      <SyntaxLine>{' '}</SyntaxLine>
                      <SyntaxLine>server.<Fn>start</Fn>()</SyntaxLine>
                    </code>
                  </pre>
                </div>
                <div className="code-block-card">
                  <div className="px-4 py-2.5 border-b border-[rgba(255,255,255,0.06)] text-xs font-mono text-[#555555]">
                    terminal
                  </div>
                  <pre className="p-4 text-xs font-mono leading-relaxed text-white/80 overflow-x-auto">
                    <code>
                      <SyntaxLine><span className="text-emerald-400">$</span> npx ts-node server.ts</SyntaxLine>
                      <SyntaxLine>{' '}</SyntaxLine>
                      <SyntaxLine><span className="text-emerald-400/60">&gt;</span> MCP server running on stdio</SyntaxLine>
                      <SyntaxLine><span className="text-emerald-400/60">&gt;</span> Tools: greet</SyntaxLine>
                      <SyntaxLine><span className="text-emerald-400/60">&gt;</span> Ready for connections...</SyntaxLine>
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        {/* ─── CTA ─── */}
        <Reveal>
          <section className="py-24 sm:py-32 bg-[#0a0a0a] border-t border-[rgba(255,255,255,0.08)] text-center relative overflow-hidden">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(255,255,255,0.03) 0%, transparent 70%)",
              }}
            />
            <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6">
              <div className="text-xs font-mono text-white/40 mb-4 tracking-wider uppercase">
                Open Source
              </div>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.03em] text-white mb-3">
                Ready to build?
              </h2>
              <p className="text-[#888888] text-sm mb-8 max-w-md mx-auto">
                Join developers building the agentic web.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href="/docs/installation"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black text-sm font-medium"
                  >
                    Get Started
                    <span className="text-black/60">&rarr;</span>
                  </Link>
                  <a
                    href="https://github.com/abdunur-dev/mcpcraft"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/20 text-white text-sm font-medium hover:bg-white hover:text-black transition-all duration-200"
                  >
                    View GitHub
                  </a>
              </div>
            </div>
          </section>
        </Reveal>
      </main>

      {/* ─── Footer ─── */}
      <footer className="border-t border-[rgba(255,255,255,0.08)] py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-mono text-sm text-white">mcpcraft</div>
          <div className="flex items-center gap-4 text-xs font-mono text-[#555555]">
            <Link href="/docs" className="hover:text-white transition-colors duration-150">
              Docs
            </Link>
            <a
              href="https://github.com/abdunur-dev/mcpcraft"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors duration-150"
            >
              GitHub
            </a>
            <a
              href="https://npmjs.com/package/mcpcraft"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors duration-150"
            >
              npm
            </a>
            <span className="text-[#333333] hidden sm:inline">MIT</span>
          </div>
          <div className="text-xs font-mono text-[#333333]">&copy; 2026 mcpcraft</div>
        </div>
      </footer>
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
    <div ref={ref} className="text-2xl font-bold text-white">
      {count}{suffix}
    </div>
  );
}

function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (isInView) {
      const t1 = setTimeout(() => setActiveStep(1), 400);
      const t2 = setTimeout(() => setActiveStep(2), 800);
      const t3 = setTimeout(() => setActiveStep(3), 1200);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [isInView]);

  const steps = [
    {
      num: "01",
      title: "Define your tools",
      code: `tool({
  name: "send_email",
  input: {
    to: { type: "string" }
  },
  run: async ({ to }) => {
    // your logic
  }
})`,
    },
    {
      num: "02",
      title: "Add to server",
      code: `const server = createServer({
  name: "my-server"
})

server.add(myTool)`,
    },
    {
      num: "03",
      title: "Ship it",
      code: `$ npx ts-node server.ts
> MCP server running
> Ready for connections...`,
    },
  ];

  return (
    <Reveal>
      <section ref={ref} className="py-24 sm:py-32 border-y border-[rgba(255,255,255,0.08)]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.03em] text-white mb-3">
              How it works
            </h2>
            <p className="text-[#888888] text-sm max-w-md mx-auto">
              Three steps to your first MCP server.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
            <div className="hidden md:block steps-line" />
            <div
              className="hidden md:block steps-line-active"
              style={{
                width: isInView ? `${(activeStep / 3) * 100}%` : "0%",
              }}
            />
            {steps.map((step, i) => (
              <div key={step.num} className="flex flex-col items-center text-center relative">
                <div
                  className={`step-dot mb-6 ${activeStep > i || (activeStep === 3 && i === 2) ? "active" : ""}`}
                />
                <div className="text-xs font-mono text-white/40 mb-2">{step.num}</div>
                <h3 className="text-base font-semibold text-white mb-3">{step.title}</h3>
                <div className="bg-[#111111] rounded-xl border border-[rgba(255,255,255,0.06)] p-3 w-full text-left overflow-x-auto">
                  <pre className="text-[11px] font-mono leading-relaxed text-white/70">
                    <code>{step.code}</code>
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
