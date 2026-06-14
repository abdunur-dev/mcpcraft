"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, Check, Copy, Terminal, Code2, Shield, Cpu, GanttChartSquare, Blocks, Unplug, Zap } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const logo = (
  <div className="flex items-center gap-2">
    <svg className="w-5 h-5" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 2 L28 9 L28 23 L16 30 L4 23 L4 9 Z" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M16 2 L28 9 L16 16 L4 9 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M16 16 L28 9 L28 23 L16 30 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M4 9 L16 16 L16 30 L4 23 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    </svg>
    <span className="font-mono text-sm uppercase tracking-wider font-bold">mcpcraft</span>
  </div>
);

const rawSdkCode = `import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  { name: "my-server", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [{
      name: "send_email",
      description: "Sends an email",
      inputSchema: {
        type: "object",
        properties: {
          to: { type: "string" },
          body: { type: "string" }
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
});`;

const mcpcraftCode = `import { createServer, tool } from "mcpcraft";

const server = createServer({ name: "my-server" });

server.add(tool({
  name: "send_email",
  description: "Sends an email",
  input: {
    to: { type: "string", description: "Recipient" },
    body: { type: "string", description: "Content" }
  },
  run: async ({ to, body }) => {
    // business logic...
    return { success: true };
  }
}));

server.start();`;

const features = [
  {
    icon: <Cpu className="size-4" />,
    title: "AI Tools",
    desc: "Build AI-powered tools that integrate with any LLM or agent framework requiring MCP server connectivity.",
  },
  {
    icon: <GanttChartSquare className="size-4" />,
    title: "Automation Systems",
    desc: "Create server-side automation workflows that execute tools based on events, schedules, or triggers.",
  },
  {
    icon: <Blocks className="size-4" />,
    title: "API Wrappers",
    desc: "Wrap existing REST or GraphQL APIs as MCP tools, exposing them to AI agents with minimal overhead.",
  },
  {
    icon: <Zap className="size-4" />,
    title: "Email Tools",
    desc: "Build email sending, searching, and management tools that AI assistants can invoke on demand.",
  },
  {
    icon: <Unplug className="size-4" />,
    title: "Integrations",
    desc: "Connect databases, file systems, and third-party services through standardized MCP tool interfaces.",
  },
  {
    icon: <Code2 className="size-4" />,
    title: "CLI Generators",
    desc: "Generate production-ready MCP server projects from a single scaffold command with full TypeScript support.",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState("");

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <div className="relative min-h-screen bg-black text-foreground selection:bg-white/10 selection:text-white">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-border bg-black/80 backdrop-blur-md">
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            {logo}
          </Link>
          <nav className="hidden sm:flex items-center gap-1">
            <Link href="/docs" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "text-muted-foreground hover:text-foreground")}>
              Docs
            </Link>
            <a href="https://github.com/abdunur-dev/mcpcraft" target="_blank" rel="noreferrer" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "text-muted-foreground hover:text-foreground")}>
              GitHub
            </a>
            <Separator orientation="vertical" className="mx-2 h-5" />
            <Link href="/docs/installation" className={buttonVariants({ variant: "default", size: "sm" })}>
              Get Started
            </Link>
          </nav>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed top-14 left-0 right-0 z-40 bg-black/95 backdrop-blur-md border-b border-border sm:hidden">
          <div className="flex flex-col p-4 gap-2">
            <Link href="/docs" onClick={() => setMenuOpen(false)} className={cn(buttonVariants({ variant: "ghost" }), "justify-start")}>
              Docs
            </Link>
            <a href="https://github.com/abdunur-dev/mcpcraft" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)} className={cn(buttonVariants({ variant: "ghost" }), "justify-start")}>
              GitHub
            </a>
            <Link href="/docs/installation" onClick={() => setMenuOpen(false)} className={cn(buttonVariants({ variant: "default" }), "mt-2")}>
              Get Started
            </Link>
          </div>
        </div>
      )}

      <main className="pt-14">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden border-b border-border">
          <div className="hero-glow" aria-hidden="true" />
          <div className="hero-grid" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28 lg:py-36">
            <div className="max-w-3xl">
              <Badge variant="outline" className="mb-6 border-border text-muted-foreground font-mono text-[11px] tracking-wider uppercase px-3 py-1">
                <span className="relative flex size-2 mr-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                v0.1.0 — Now Available
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground leading-[1.1] mb-4">
                Build MCP Servers{" "}
                <span className="text-muted-foreground font-light">Fast</span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mb-8">
                A lightweight TypeScript SDK for the Model Context Protocol. Zero boilerplate, full type safety, and automatic schema validation — so you can ship MCP servers in minutes, not hours.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link href="/docs/installation" className={cn(buttonVariants({ variant: "default", size: "lg" }), "gap-2")}>
                  Get Started
                  <ArrowRight className="size-4" />
                </Link>
                <a href="https://github.com/abdunur-dev/mcpcraft" target="_blank" rel="noreferrer" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "gap-2")}>
                  View on GitHub
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Social Proof ── */}
        <section className="border-b border-border bg-white/[0.01]">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 py-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs font-mono text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="text-foreground/70">npm</span>
              <span className="text-foreground font-semibold">50k+</span>
              <span className="text-muted-foreground/60">downloads/mo</span>
            </span>
            <span className="size-1 rounded-full bg-border hidden sm:block" />
            <span className="flex items-center gap-2">
              <span className="text-foreground/70">GitHub</span>
              <span className="text-foreground font-semibold">&starf; 1.2k</span>
              <span className="text-muted-foreground/60">stars</span>
            </span>
            <span className="size-1 rounded-full bg-border hidden sm:block" />
            <span className="flex items-center gap-2">
              <span className="text-foreground/70">MIT</span>
              <span className="text-muted-foreground/60">open source</span>
            </span>
          </div>
        </section>

        {/* ── Problem ── */}
        <section className="border-b border-border py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
            <Badge variant="outline" className="mb-4 border-border text-muted-foreground font-mono text-xs tracking-wider uppercase">
              The Problem
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground mb-4">
              MCP server development is too complex
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Building a compliant MCP server from scratch requires deep knowledge of the protocol specification, manual schema definition, request routing, transport setup, and error handling — all before writing a single line of your actual tool logic.
            </p>
          </div>
        </section>

        {/* ── Solution ── */}
        <section className="border-b border-border py-16 sm:py-20 bg-white/[0.01]">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
            <Badge variant="outline" className="mb-4 border-border text-muted-foreground font-mono text-xs tracking-wider uppercase">
              The Solution
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground mb-4">
              Define tools. Ship servers.
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-3xl mx-auto mb-8">
              MCPCraft handles the protocol plumbing so you can focus on what matters: defining your tools with input schemas and handler logic. The framework manages validation, execution, transport, and lifecycle automatically.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              {[
                { step: "01", title: "Define Input Schema", desc: "Describe your tool parameters with a plain object — type, description, and optional validators." },
                { step: "02", title: "Write Handler Logic", desc: "Implement your tool's run function. Receive validated inputs with full TypeScript inference." },
                { step: "03", title: "Deploy & Execute", desc: "Start your server. Any MCP client can discover and call your tools immediately." },
              ].map((s) => (
                <Card key={s.step} className="bg-card border-border">
                  <CardHeader>
                    <div className="font-mono text-xs tracking-widest text-muted-foreground mb-1">{s.step}</div>
                    <CardTitle className="text-foreground text-sm">{s.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ── Before vs After ── */}
        <section className="border-b border-border py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="text-center mb-10">
              <Badge variant="outline" className="mb-4 border-border text-muted-foreground font-mono text-xs tracking-wider uppercase">
                Before vs After
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground mb-3">
                Less code. More done.
              </h2>
              <p className="text-muted-foreground text-sm max-w-lg mx-auto">
                See the difference between the raw MCP SDK and MCPCraft for the same email tool.
              </p>
            </div>
            <Tabs defaultValue="mcpcraft" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="mcpcraft">MCPCraft (12 lines)</TabsTrigger>
                <TabsTrigger value="raw">Raw SDK (50+ lines)</TabsTrigger>
              </TabsList>
              <TabsContent value="mcpcraft">
                <div className="relative rounded-xl border border-border bg-[#050505] overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-[#0a0a0a]">
                    <span className="text-xs text-muted-foreground font-mono">server.ts</span>
                    <button
                      onClick={() => copy(mcpcraftCode, "mc")}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {copied === "mc" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                    </button>
                  </div>
                  <pre className="p-4 sm:p-5 overflow-x-auto text-sm font-mono leading-relaxed text-foreground/90">
                    <code>{mcpcraftCode}</code>
                  </pre>
                </div>
              </TabsContent>
              <TabsContent value="raw">
                <div className="relative rounded-xl border border-border bg-[#050505] overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-[#0a0a0a]">
                    <span className="text-xs text-muted-foreground font-mono">server.js</span>
                    <button
                      onClick={() => copy(rawSdkCode, "raw")}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {copied === "raw" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                    </button>
                  </div>
                  <pre className="p-4 sm:p-5 overflow-x-auto text-sm font-mono leading-relaxed text-muted-foreground/60">
                    <code>{rawSdkCode}</code>
                  </pre>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* ── What You Can Build ── */}
        <section className="border-b border-border py-16 sm:py-20 bg-white/[0.01]">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 border-border text-muted-foreground font-mono text-xs tracking-wider uppercase">
                What You Can Build
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground mb-3">
                Endless possibilities
              </h2>
              <p className="text-muted-foreground text-sm max-w-lg mx-auto">
                MCPCraft is flexible enough to power any server-side tool or integration for AI agents.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((f, i) => (
                <Card key={i} className="bg-card border-border hover:border-muted-foreground/20 transition-colors">
                  <CardHeader>
                    <div className="size-9 rounded-lg border border-border bg-muted/50 flex items-center justify-center text-muted-foreground mb-1">
                      {f.icon}
                    </div>
                    <CardTitle className="text-foreground text-sm">{f.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ── Installation ── */}
        <section className="border-b border-border py-16 sm:py-20">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 text-center">
            <Badge variant="outline" className="mb-4 border-border text-muted-foreground font-mono text-xs tracking-wider uppercase">
              Installation
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground mb-3">
              Start in seconds
            </h2>
            <p className="text-muted-foreground text-sm mb-8">
              One command. Zero config. Requires Node.js 18+.
            </p>

            <div className="terminal-window text-left max-w-md mx-auto mb-6">
              <div className="bg-[#0b0b0b] border-b border-border px-4 py-2 flex items-center gap-2">
                <span className="flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-red-500/40" />
                  <span className="size-2.5 rounded-full bg-yellow-500/40" />
                  <span className="size-2.5 rounded-full bg-green-500/40" />
                </span>
                <span className="text-[11px] text-muted-foreground/50 font-mono ml-2">terminal</span>
                <button
                  onClick={() => copy("npm install mcpcraft", "install")}
                  className="ml-auto text-muted-foreground/40 hover:text-muted-foreground transition-colors"
                >
                  {copied === "install" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                </button>
              </div>
              <div className="terminal-body">
                <div className="flex items-center gap-3">
                  <span className="terminal-prompt">$</span>
                  <span className="text-foreground/90">npm install mcpcraft</span>
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground/40">
                  <span className="animate-pulse text-emerald-400/80">&#9610;</span>
                  <span className="text-muted-foreground/30">ready</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-[#050505] overflow-hidden text-left max-w-md mx-auto">
              <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-[#0a0a0a]">
                <span className="text-xs text-muted-foreground font-mono">server.ts</span>
                <button
                  onClick={() => copy("npm install mcpcraft", "install2")}
                  className="text-muted-foreground/40 hover:text-muted-foreground transition-colors"
                >
                  {copied === "install2" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                </button>
              </div>
              <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed text-foreground/90">
                <code>{`import { createServer, tool } from "mcpcraft";

const server = createServer({ name: "my-server" });

server.add(tool({
  name: "greet",
  description: "Greets a user",
  input: {
    name: { type: "string", description: "User name" }
  },
  run: async ({ name }) => {
    return { message: \`Hello, \${name}!\` };
  }
}));

server.start();`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-2xl px-4 sm:px-6">
            <Card className="bg-card border-border text-center">
              <CardContent className="py-10 sm:py-14">
                <Badge variant="outline" className="mb-4 border-border text-muted-foreground font-mono text-xs tracking-wider uppercase">
                  Get Started
                </Badge>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground mb-3">
                  Ready to build?
                </h2>
                <p className="text-muted-foreground text-sm mb-8 max-w-md mx-auto">
                  Start building production-ready MCP servers in minutes. No boilerplate, no protocol plumbing — just your tools and logic.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link href="/docs/installation" className={cn(buttonVariants({ variant: "default", size: "lg" }), "gap-2")}>
                    Get Started
                    <ArrowRight className="size-4" />
                  </Link>
                  <Link href="/docs" className={buttonVariants({ variant: "outline", size: "lg" })}>
                    Read the Docs
                  </Link>
                  <a href="https://github.com/abdunur-dev/mcpcraft" target="_blank" rel="noreferrer" className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "text-muted-foreground")}>
                    GitHub
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center sm:items-start gap-1">
            {logo}
            <span className="text-xs text-muted-foreground/60 mt-1">Built for the Model Context Protocol ecosystem.</span>
          </div>
          <div className="flex items-center gap-6 text-xs font-mono text-muted-foreground/60">
            <Link href="/docs" className="hover:text-foreground transition-colors">Docs</Link>
            <a href="https://github.com/abdunur-dev/mcpcraft" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
            <a href="https://npmjs.com/package/mcpcraft" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">npm</a>
            <span className="text-muted-foreground/30 hidden sm:inline">MIT License</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
