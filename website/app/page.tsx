"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";

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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(""), 1500);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans selection:bg-white/10 selection:text-white">
      <motion.div className="scroll-progress" style={{ scaleX }} />

      {/* ─── Navbar ─── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-14 border-b transition-colors duration-200 ${
          scrolled
            ? "bg-[rgba(0,0,0,0.8)] backdrop-blur-md border-[rgba(255,255,255,0.08)]"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="mx-auto max-w-6xl h-full px-4 sm:px-6 flex items-center justify-between">
          <Link href="/" className="font-mono text-[15px] text-white tracking-tight">
            mcpcraft
          </Link>
          <div className="flex items-center gap-6 font-mono">
            <Link href="/docs" className="text-sm text-[#888888] hover:text-white transition-colors duration-150">
              Docs
            </Link>
            <a
              href="https://github.com/abdunur-dev/mcpcraft"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-[#888888] hover:text-white transition-colors duration-150"
            >
              GitHub
            </a>
            <a
              href="https://npmjs.com/package/mcpcraft"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-[#888888] hover:text-white transition-colors duration-150"
            >
              npm
            </a>
          </div>
        </div>
      </nav>

      <main>
        {/* ─── Hero ─── */}
        <section className="min-h-[calc(100dvh-3.5rem)] flex items-center pt-14">
          <div className="mx-auto max-w-6xl w-full px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="flex flex-col gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Link
                    href="/docs"
                    className="pill-badge inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] border border-[rgba(255,255,255,0.1)] text-[#888888] hover:border-white/40 transition-colors duration-200 font-mono"
                  >
                    mcpcraft v0.1.0 is out
                    <span className="text-white/40">&rarr;</span>
                  </Link>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-[56px] sm:text-[64px] leading-[1.1] font-semibold tracking-[-0.03em] text-white max-w-lg"
                >
                  Build MCP Servers<br />
                  <span className="text-[#888888]">Without the Pain.</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-base sm:text-lg text-[#888888] leading-relaxed max-w-[420px]"
                >
                  Lightweight TypeScript SDK for MCP servers.
                  Zero boilerplate. Full type safety.
                  Automatic Zod validation.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
                >
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
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="text-xs text-[#555555] font-mono"
                >
                  Open source &middot; MIT License &middot; TypeScript first
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="hidden lg:block"
              >
                <div className="code-block-card">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(255,255,255,0.06)]">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-500/60" />
                      <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                      <span className="w-3 h-3 rounded-full bg-green-500/60" />
                      <span className="text-xs text-[#555555] font-mono ml-2">server.ts</span>
                    </div>
                    <button
                      onClick={() => handleCopy(mcpcraftCode, "hero")}
                      className="text-xs font-mono text-[#555555] hover:text-white transition-colors"
                    >
                      {copied === "hero" ? (
                        <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      ) : (
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
                      )}
                    </button>
                  </div>
                  <pre className="p-5 text-sm font-mono leading-relaxed text-white/90 overflow-x-auto">
                    <code>
                      <SyntaxLine><Kw>import</Kw> {'{'} createServer, tool {'}'} <Kw>from</Kw> <Str>"mcpcraft"</Str></SyntaxLine>
                      <SyntaxLine>{' '}</SyntaxLine>
                      <SyntaxLine><Kw>const</Kw> server = <Fn>createServer</Fn>({'{}'} name: <Str>"my-server"</Str> {'}'})</SyntaxLine>
                      <SyntaxLine>{' '}</SyntaxLine>
                      <SyntaxLine>server.<Fn>add</Fn>(<Fn>tool</Fn>({'{}'}</SyntaxLine>
                      <SyntaxLine>  name: <Str>"send_email"</Str>,</SyntaxLine>
                      <SyntaxLine>  description: <Str>"Sends an email"</Str>,</SyntaxLine>
                      <SyntaxLine>  input: {'{}'}</SyntaxLine>
                      <SyntaxLine>    to: {'{}'} type: <Str>"string"</Str>, description: <Str>"Recipient"</Str> {'}'},</SyntaxLine>
                      <SyntaxLine>    body: {'{}'} type: <Str>"string"</Str>, description: <Str>"Content"</Str> {'}'}</SyntaxLine>
                      <SyntaxLine>  {'}'},</SyntaxLine>
                      <SyntaxLine>  run: <Kw>async</Kw> ({'{'} to, body {'}'}) <Kw>=&gt;</Kw> {'{}'}</SyntaxLine>
                      <SyntaxLine>    <Kw>return</Kw> {'{}'} success: <Boo>true</Boo> {'}'}</SyntaxLine>
                      <SyntaxLine>  {'}'}</SyntaxLine>
                      <SyntaxLine>{'}'}))</SyntaxLine>
                      <SyntaxLine>{' '}</SyntaxLine>
                      <SyntaxLine>server.<Fn>start</Fn>()</SyntaxLine>
                    </code>
                  </pre>
                </div>
              </motion.div>
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

        {/* ─── Code Comparison ─── */}
        <Reveal>
          <section className="py-24 sm:py-32 bg-[#0a0a0a]">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.03em] text-white mb-3">
                  Less code. More done.
                </h2>
                <p className="text-[#888888] text-sm max-w-md mx-auto">
                  See the difference for the same email tool.
                </p>
              </div>
              <div className="relative flex flex-col lg:flex-row items-stretch gap-6 lg:gap-8">
                <div className="flex-1 code-comparison-left">
                  <div className="px-4 py-2.5 border border-red-500/20 border-b-0 bg-red-500/[0.03] rounded-t-xl text-xs font-mono text-red-400 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                    Raw MCP SDK &middot; 50+ lines
                  </div>
                  <div className="bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded-b-xl p-5 font-mono text-xs leading-relaxed text-white/30 overflow-hidden max-h-[320px]">
                    <pre className="text-[#666666]">
                      <code>{rawSdkCode}</code>
                    </pre>
                  </div>
                </div>

                <div className="hidden lg:flex items-center justify-center flex-shrink-0">
                  <div className="vs-badge">vs</div>
                </div>

                <div className="flex-1">
                  <div className="code-block-card">
                    <div className="px-4 py-2.5 border border-emerald-500/20 border-b-0 bg-emerald-500/[0.03] rounded-t-xl text-xs font-mono text-emerald-400 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
                        mcpcraft &middot; 12 lines
                      </div>
                      <button
                        onClick={() => handleCopy(mcpcraftCode, "compare")}
                        className="text-[#555555] hover:text-white transition-colors"
                      >
                        {copied === "compare" ? (
                          <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                        ) : (
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
                        )}
                      </button>
                    </div>
                    <pre className="p-5 text-sm font-mono leading-relaxed text-white/90 overflow-x-auto">
                      <code>
                        <SyntaxLine><Kw>import</Kw> {'{'} createServer, tool {'}'} <Kw>from</Kw> <Str>"mcpcraft"</Str></SyntaxLine>
                        <SyntaxLine>{' '}</SyntaxLine>
                        <SyntaxLine><Kw>const</Kw> server = <Fn>createServer</Fn>({'{}'} name: <Str>"my-server"</Str> {'}'})</SyntaxLine>
                        <SyntaxLine>{' '}</SyntaxLine>
                        <SyntaxLine>server.<Fn>add</Fn>(<Fn>tool</Fn>({'{}'}</SyntaxLine>
                        <SyntaxLine>  name: <Str>"send_email"</Str>,</SyntaxLine>
                        <SyntaxLine>  description: <Str>"Sends an email"</Str>,</SyntaxLine>
                        <SyntaxLine>  input: {'{}'}</SyntaxLine>
                        <SyntaxLine>    to: {'{}'} type: <Str>"string"</Str>, description: <Str>"Recipient"</Str> {'}'},</SyntaxLine>
                        <SyntaxLine>    body: {'{}'} type: <Str>"string"</Str>, description: <Str>"Content"</Str> {'}'}</SyntaxLine>
                        <SyntaxLine>  {'}'},</SyntaxLine>
                        <SyntaxLine>  run: <Kw>async</Kw> ({'{'} to, body {'}'}) <Kw>=&gt;</Kw> {'{}'}</SyntaxLine>
                        <SyntaxLine>    <Kw>return</Kw> {'{}'} success: <Boo>true</Boo> {'}'}</SyntaxLine>
                        <SyntaxLine>  {'}'}</SyntaxLine>
                        <SyntaxLine>{'}'}))</SyntaxLine>
                        <SyntaxLine>{' '}</SyntaxLine>
                        <SyntaxLine>server.<Fn>start</Fn>()</SyntaxLine>
                      </code>
                    </pre>
                  </div>
                </div>

                <div className="lg:hidden flex justify-center my-2">
                  <div className="vs-badge">vs</div>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        {/* ─── How It Works ─── */}
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
