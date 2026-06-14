"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function AnimateInView({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const features = [
  {
    num: "01", label: "Setup", title: "Zero Boilerplate",
    desc: "Create a full MCP server in just 10 lines of code. No protocol plumbing or transport details required.",
    icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg>,
  },
  {
    num: "02", label: "Safety", title: "Full Type Safety",
    desc: "Handler input types inferred automatically from your tool parameters. Zero type casting, complete autocomplete.",
    icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l8 3v6c0 4-3.5 8-8 10-4.5-2-8-6-8-10V5l8-3z" /><path d="M9 12l2 2 4-4" /></svg>,
  },
  {
    num: "03", label: "Schema", title: "Built-in Validation",
    desc: "Dynamic Zod validation checks all inputs before they reach your handler. Invalid parameters receive clear feedback.",
    icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M16 10l-5 5-3-3" /></svg>,
  },
  {
    num: "04", label: "Models", title: "Tools & Resources",
    desc: "Clean APIs to register both tools and resources using a simple add() API — static files or dynamic template endpoints.",
    icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>,
  },
  {
    num: "05", label: "Standard", title: "Official SDK",
    desc: "Wraps the official @modelcontextprotocol/sdk. Fully spec-compliant and compatible with all MCP hosts.",
    icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-3.5L6 21l1.5-7.5L2 9h7z" /></svg>,
  },
  {
    num: "06", label: "CLI", title: "CLI Scaffolding",
    desc: "Instantly scaffold a new ready-to-run MCP server project configured with TypeScript and mcpcraft in a single command.",
    icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></svg>,
  },
];

const mcpcraftLogo = (
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

const heroCodeText = `import { createServer, tool } from "mcpcraft"\n\nconst server = createServer({ name: "my-server" })\n\nserver.add(tool({\n  name: "send_email",\n  description: "Sends an email",\n  input: {\n    to: { type: "string", description: "Recipient" },\n    body: { type: "string", description: "Content" }\n  },\n  run: async ({ to, body }) => {\n    return { success: true }\n  }\n}))\n\nserver.start()`;

export default function Home() {
  const [copiedText, setCopiedText] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(""), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white font-sans selection:bg-white/10 selection:text-white">
      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-stretch border-b border-white/10 bg-black/80 backdrop-blur-md h-14">
        <div className="flex items-center px-3 sm:px-6 border-r border-white/10 shrink-0">
          <Link href="/" className="hover:opacity-85 transition-opacity">
            {mcpcraftLogo}
          </Link>
        </div>

        <div className="hidden sm:flex flex-1 items-stretch">
          <Link
            href="/"
            className="group relative flex items-center px-6 border-r border-white/10 bg-white/[0.02] text-white hover:bg-white/[0.04] transition-colors duration-150"
          >
            <span className="font-mono text-xs uppercase tracking-wider">readme</span>
            <div className="absolute bottom-0 inset-x-0 h-[2px] bg-white" />
          </Link>
          <Link
            href="/docs"
            className="group relative flex items-center px-6 border-r border-white/10 text-white/50 hover:text-white hover:bg-white/[0.02] transition-colors duration-150"
          >
            <span className="font-mono text-xs uppercase tracking-wider">docs</span>
          </Link>
          <a
            href="https://github.com/abdunur-dev/mcpcraft"
            target="_blank"
            rel="noreferrer"
            className="group relative flex items-center px-6 border-r border-white/10 text-white/50 hover:text-white hover:bg-white/[0.02] transition-colors duration-150"
          >
            <span className="font-mono text-xs uppercase tracking-wider">github</span>
          </a>
        </div>

        <div className="hidden sm:flex items-center px-6 border-l border-white/10 shrink-0">
          <a
            href="https://npmjs.com/package/mcpcraft"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono border border-white/15 text-white/70 hover:text-white hover:border-white/30 transition-all bg-white/[0.02]"
          >
            v0.1.0
          </a>
        </div>

        <div className="flex sm:hidden items-center px-4 border-l border-white/10 ml-auto">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white/60 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed top-14 left-0 right-0 z-40 bg-black/95 backdrop-blur-md border-b border-white/10 sm:hidden">
          <div className="flex flex-col py-2">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="px-6 py-3 font-mono text-xs uppercase tracking-wider text-white hover:bg-white/[0.02] transition-colors border-b border-white/5"
            >
              readme
            </Link>
            <Link
              href="/docs"
              onClick={() => setMenuOpen(false)}
              className="px-6 py-3 font-mono text-xs uppercase tracking-wider text-white/50 hover:text-white hover:bg-white/[0.02] transition-colors border-b border-white/5"
            >
              docs
            </Link>
            <a
              href="https://github.com/abdunur-dev/mcpcraft"
              target="_blank"
              rel="noreferrer"
              onClick={() => setMenuOpen(false)}
              className="px-6 py-3 font-mono text-xs uppercase tracking-wider text-white/50 hover:text-white hover:bg-white/[0.02] transition-colors"
            >
              github
            </a>
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
                  <Link
                    href="/docs/installation"
                    className="group w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 rounded-md text-[11px] sm:text-xs font-mono uppercase tracking-wider bg-white text-black hover:bg-white/90 transition-all font-bold text-center inline-flex items-center justify-center gap-2"
                  >
                    Get Started
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                  <a
                    href="https://github.com/abdunur-dev/mcpcraft"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 rounded-md text-[11px] sm:text-xs font-mono uppercase tracking-wider border border-white/15 hover:border-white/30 text-white transition-colors text-center inline-flex items-center justify-center gap-2"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
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
                    <button
                      onClick={() => handleCopy(heroCodeText, "hero-code")}
                      className="text-xs font-mono text-white/40 hover:text-white transition-colors"
                    >
                      {copiedText === "hero-code" ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <pre className="p-5 overflow-x-auto text-sm font-mono leading-relaxed bg-black">
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
          </div>
        </section>

        {/* ── Social Proof ── */}
        <AnimateInView>
          <section className="border-b border-white/10 bg-white/[0.01]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs font-mono text-white/40">
              <span className="flex items-center gap-2">
                <span className="text-white/70">npm</span>
                <span className="text-white font-semibold">50k+</span>
                <span className="text-white/30">downloads/mo</span>
              </span>
              <span className="w-1 h-1 rounded-full bg-white/20 hidden sm:block" />
              <span className="flex items-center gap-2">
                <span className="text-white/70">GitHub</span>
                <span className="text-white font-semibold">&starf; 1.2k</span>
                <span className="text-white/30">stars</span>
              </span>
              <span className="w-1 h-1 rounded-full bg-white/20 hidden sm:block" />
              <span className="flex items-center gap-2">
                <span className="text-white/70">MIT</span>
                <span className="text-white/30">open source</span>
              </span>
            </div>
          </section>
        </AnimateInView>

        {/* ── Stats ── */}
        <AnimateInView delay={100}>
          <section className="border-b border-white/10">
            <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 divide-x-0 sm:divide-x divide-white/10 text-center font-mono">
              <div className="py-8">
                <div className="text-2xl font-bold text-white">&lt; 5 min</div>
                <div className="text-[11px] text-white/40 uppercase tracking-widest mt-1">Time to first server</div>
              </div>
              <div className="py-8">
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-[11px] text-white/40 uppercase tracking-widest mt-1">Type Safe</div>
              </div>
              <div className="py-8">
                <div className="text-2xl font-bold text-white">MIT</div>
                <div className="text-[11px] text-white/40 uppercase tracking-widest mt-1">License</div>
              </div>
            </div>
          </section>
        </AnimateInView>

        {/* ── Features ── */}
        <AnimateInView delay={200}>
          <section className="py-20 sm:py-28 max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-14 sm:mb-20">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
                Everything you need
              </h2>
              <p className="text-white/40 text-sm sm:text-base max-w-xl mx-auto">
                Build production-ready MCP integrations with clean, standard code.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {features.map((f) => (
                <div key={f.num} className="feature-card p-6 rounded-lg border border-white/10 bg-white/[0.01] transition-all duration-200">
                  <div className="w-10 h-10 rounded-lg border border-white/10 bg-white/[0.02] flex items-center justify-center text-white/60 mb-4">
                    {f.icon}
                  </div>
                  <div className="font-mono text-xs uppercase tracking-widest text-white/40 mb-2">{f.num} / {f.label}</div>
                  <h3 className="text-base font-bold text-white mb-1.5">{f.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </AnimateInView>

        {/* ── Code Comparison (Before vs After) ── */}
        <AnimateInView delay={300}>
          <section className="py-20 sm:py-28 border-t border-white/10 bg-white/[0.01]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
                  Less code. More done.
                </h2>
                <p className="text-white/40 text-sm max-w-md mx-auto">
                  We did the boilerplate plumbing so you can focus on building your tools and resource loaders.
                </p>
              </div>

              <div className="relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-stretch">
                  {/* Without mcpcraft */}
                  <div className="flex flex-col">
                    <div className="px-4 py-2 border border-red-500/20 border-b-0 bg-red-500/[0.03] rounded-t-md text-xs font-mono text-red-400 flex items-center justify-between">
                      <span>Without mcpcraft</span>
                      <span className="text-red-400/40 hidden sm:inline">100+ lines</span>
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
  // User logic here...
});`}</code>
                      </pre>
                      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
                    </div>
                  </div>

                  {/* With mcpcraft */}
                  <div className="flex flex-col">
                    <div className="px-4 py-2 border border-emerald-500/20 border-b-0 bg-emerald-500/[0.03] rounded-t-md text-xs font-mono text-emerald-400 flex items-center justify-between">
                      <span>With mcpcraft</span>
                      <span className="text-emerald-400/40 hidden sm:inline">12 lines</span>
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

                {/* "10x Less Code" badge - desktop */}
                <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-8 w-px bg-white/10" />
                    <div className="px-4 py-2 rounded-full bg-white text-black text-[11px] font-bold font-mono uppercase tracking-wider shadow-2xl whitespace-nowrap">
                      10x less code
                    </div>
                    <div className="h-8 w-px bg-white/10" />
                  </div>
                </div>

                {/* "10x Less Code" badge - mobile */}
                <div className="lg:hidden flex justify-center my-4">
                  <div className="px-4 py-2 rounded-full bg-white text-black text-xs font-bold font-mono uppercase tracking-wider shadow-xl">
                    10x less code
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AnimateInView>

        {/* ── Terminal Install ── */}
        <AnimateInView delay={400}>
          <section className="py-20 sm:py-28 border-t border-white/10 text-center bg-black">
            <div className="max-w-xl mx-auto px-4 sm:px-6">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
                Install in seconds
              </h2>
              <p className="text-white/40 text-sm mb-8">
                One command to get started. Zero config required.
              </p>

              <div className="terminal-window text-left max-w-md mx-auto">
                <div className="bg-[#0b0b0b] border-b border-white/10 px-4 py-2 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/30" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/30" />
                  <span className="w-3 h-3 rounded-full bg-green-500/30" />
                  <span className="text-[11px] text-white/30 font-mono ml-2">terminal</span>
                </div>
                <div className="terminal-body">
                  <div className="flex items-center gap-3">
                    <span className="terminal-prompt">$</span>
                    <span className="text-white/90">npm install mcpcraft</span>
                    <button
                      onClick={() => handleCopy("npm install mcpcraft", "install-cmd")}
                      className="ml-auto text-white/30 hover:text-white transition-colors shrink-0"
                    >
                      {copiedText === "install-cmd" ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-xs text-white/40">
                    <span className="animate-pulse text-emerald-400">&#9610;</span>
                    <span className="text-white/20">ready for use</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-xs font-mono text-white/30">
                Requires Node.js 18+ &bull; Works with any MCP host
              </div>
            </div>
          </section>
        </AnimateInView>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center sm:items-start gap-1">
            {mcpcraftLogo}
            <span className="text-xs text-white/30 mt-1 text-center sm:text-left">Built for the Model Context Protocol ecosystem.</span>
          </div>
          <div className="flex items-center gap-4 sm:gap-6 text-[11px] sm:text-xs font-mono text-white/40">
            <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
            <a href="https://github.com/abdunur-dev/mcpcraft" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://npmjs.com/package/mcpcraft" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">npm</a>
            <span className="text-white/20 hidden sm:inline">MIT License</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
