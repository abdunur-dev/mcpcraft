"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [copiedText, setCopiedText] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(""), 2000);
  };

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

  return (
    <div className="min-h-screen flex flex-col bg-black text-white font-sans selection:bg-white/10 selection:text-white">
      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-stretch border-b border-white/10 bg-black/80 backdrop-blur-md h-14">
        {/* Logo Section */}
        <div className="flex items-center px-3 sm:px-6 border-r border-white/10 shrink-0">
          <Link href="/" className="hover:opacity-85 transition-opacity">
            {mcpcraftLogo}
          </Link>
        </div>

        {/* Desktop Nav Tabs */}
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

        {/* Version Badge - Desktop */}
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

        {/* Hamburger - Mobile */}
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

      {/* Mobile Menu Dropdown */}
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

      {/* Main Content Area */}
      <main className="flex-1 pt-14">
        {/* Hero Section — Text + Code side by side, fills viewport */}
        <section className="relative min-h-[calc(100dvh-3.5rem)] flex items-center py-12 sm:py-16 border-b border-white/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              {/* Left: Text */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono border border-white/10 bg-white/[0.02] text-white/60 mb-4 sm:mb-6">
                  <span className="text-white">●</span> npm install mcpcraft
                </div>
                
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 sm:mb-6">
                  Build MCP Servers <span className="text-white/40 font-light">Fast</span>
                </h1>
                
                <p className="text-sm sm:text-base lg:text-lg text-white/60 leading-relaxed font-sans mb-6 sm:mb-8">
                  A lightweight TypeScript SDK for building Model Context Protocol servers. Zero boilerplate, full type safety, and automatic schema validation.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3 sm:gap-4">
                  <Link 
                    href="/docs/installation" 
                    className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 rounded-md text-[11px] sm:text-xs font-mono uppercase tracking-wider bg-white text-black hover:bg-white/90 transition-all font-bold text-center"
                  >
                    Get Started
                  </Link>
                  <a 
                    href="https://github.com/abdunur-dev/mcpcraft" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 rounded-md text-[11px] sm:text-xs font-mono uppercase tracking-wider bg-transparent border border-white/15 hover:border-white/30 text-white transition-colors text-center"
                  >
                    View GitHub
                  </a>
                </div>
              </div>

              {/* Right: Code */}
              <div className="-mx-4 sm:mx-0 rounded-none sm:rounded-lg border-x-0 sm:border border-white/10 bg-[#050505] shadow-2xl text-left overflow-hidden">
                <div className="bg-[#0b0b0b] border-b border-white/10 px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                    <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white/10 shrink-0" />
                    <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white/10 shrink-0" />
                    <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white/10 shrink-0" />
                    <span className="text-[10px] sm:text-xs text-white/40 font-mono ml-1 sm:ml-2 truncate">server.ts</span>
                  </div>
                  <button 
                    onClick={() => handleCopy(`import { createServer, tool } from "mcpcraft"

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

server.start()`, "hero-code")}
                    className="text-[10px] sm:text-xs font-mono text-white/40 hover:text-white flex items-center gap-1.5 transition-colors shrink-0"
                  >
                    {copiedText === "hero-code" ? "Copied!" : "Copy"}
                  </button>
                </div>
                <pre className="p-4 sm:p-6 overflow-x-auto text-[11px] sm:text-[13px] font-mono leading-relaxed bg-black">
<code><div><span className="text-purple-400">import</span> {"{"} createServer, tool {"}"} <span className="text-purple-400">from</span> <span className="text-emerald-300">"mcpcraft"</span></div>
<div></div>
<div><span className="text-purple-400">const</span> server = <span className="text-blue-400">createServer</span>({"{"} name: <span className="text-emerald-300">"my-server"</span> {"}"})</div>
<div></div>
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
<div></div>
<div>server.<span className="text-blue-400">start</span>()</div></code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="border-b border-white/10 bg-white/[0.01]">
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 divide-x-0 sm:divide-x divide-white/10 text-center font-mono">
            <div className="py-6 sm:py-8">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">&lt; 5 min</div>
              <div className="text-[10px] sm:text-[11px] text-white/40 uppercase tracking-widest mt-1">Time to first server</div>
            </div>
            <div className="py-6 sm:py-8">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">100%</div>
              <div className="text-[10px] sm:text-[11px] text-white/40 uppercase tracking-widest mt-1">Type Safe</div>
            </div>
            <div className="py-6 sm:py-8">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">MIT</div>
              <div className="text-[10px] sm:text-[11px] text-white/40 uppercase tracking-widest mt-1">License</div>
            </div>
          </div>
        </section>

        {/* Monochromatic Features Grid */}
        <section className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-3 sm:mb-4">
              Everything you need
            </h2>
            <p className="text-white/40 text-sm sm:text-base max-w-xl mx-auto font-sans">
              Build production-ready MCP integrations with clean, standard code.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Card 1 */}
            <div className="p-6 rounded-lg border border-white/10 bg-white/[0.01] hover:border-white/20 transition-all duration-200">
              <div className="font-mono text-xs uppercase tracking-widest text-white/40 mb-3">01 / Setup</div>
              <h3 className="text-base font-bold text-white mb-2">Zero Boilerplate</h3>
              <p className="text-sm text-white/50 leading-relaxed font-sans">
                Create a full, running MCP server in just 10 lines of code. No protocol plumbing or transport details required.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-lg border border-white/10 bg-white/[0.01] hover:border-white/20 transition-all duration-200">
              <div className="font-mono text-xs uppercase tracking-widest text-white/40 mb-3">02 / Safety</div>
              <h3 className="text-base font-bold text-white mb-2">Full Type Safety</h3>
              <p className="text-sm text-white/50 leading-relaxed font-sans">
                Handler input types are inferred automatically from your tool parameters. Zero type casting, complete autocomplete.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-lg border border-white/10 bg-white/[0.01] hover:border-white/20 transition-all duration-200">
              <div className="font-mono text-xs uppercase tracking-widest text-white/40 mb-3">03 / Schema</div>
              <h3 className="text-base font-bold text-white mb-2">Built-in Validation</h3>
              <p className="text-sm text-white/50 leading-relaxed font-sans">
                Dynamic Zod validation checks all inputs before they reach your handler. Invalid parameters receive clear feedback.
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-6 rounded-lg border border-white/10 bg-white/[0.01] hover:border-white/20 transition-all duration-200">
              <div className="font-mono text-xs uppercase tracking-widest text-white/40 mb-3">04 / Models</div>
              <h3 className="text-base font-bold text-white mb-2">Tools & Resources</h3>
              <p className="text-sm text-white/50 leading-relaxed font-sans">
                Clean APIs to register both tools and resources (static files or dynamic template endpoints) using a simple `add()` API.
              </p>
            </div>

            {/* Card 5 */}
            <div className="p-6 rounded-lg border border-white/10 bg-white/[0.01] hover:border-white/20 transition-all duration-200">
              <div className="font-mono text-xs uppercase tracking-widest text-white/40 mb-3">05 / Standard</div>
              <h3 className="text-base font-bold text-white mb-2">Official SDK</h3>
              <p className="text-sm text-white/50 leading-relaxed font-sans">
                mcpcraft wraps the official `@modelcontextprotocol/sdk`. It remains fully spec-compliant and compatible with all MCP hosts.
              </p>
            </div>

            {/* Card 6 */}
            <div className="p-6 rounded-lg border border-white/10 bg-white/[0.01] hover:border-white/20 transition-all duration-200">
              <div className="font-mono text-xs uppercase tracking-widest text-white/40 mb-3">06 / CLI</div>
              <h3 className="text-base font-bold text-white mb-2">CLI Scaffolding</h3>
              <p className="text-sm text-white/50 leading-relaxed font-sans">
                Instantly scaffold a new ready-to-run MCP server project configured with TypeScript and mcpcraft in a single command.
              </p>
            </div>
          </div>
        </section>

        {/* Code Comparison Section (Raw vs mcpcraft) */}
        <section className="py-16 sm:py-24 border-t border-white/10 bg-white/[0.01]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-3 sm:mb-4">
                Less code. More done.
              </h2>
              <p className="text-white/40 text-sm max-w-md mx-auto font-sans">
                We did the boilerplate plumbing so you can focus on building your tools and resource loaders.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Without mcpcraft */}
              <div className="flex flex-col max-h-[300px] sm:max-h-[420px]">
                <div className="px-3 sm:px-4 py-1.5 sm:py-2 border border-white/10 border-b-0 bg-white/[0.02] rounded-t-md text-[10px] sm:text-xs font-mono text-white/40 flex items-center justify-between">
                  <span className="truncate">Without mcpcraft (100+ lines)</span>
                  <span className="text-white/20 hidden sm:inline">RAW SDK Boilerplate</span>
                </div>
                <div className="flex-1 border border-white/10 bg-black rounded-b-md p-3 sm:p-5 font-mono text-[10px] sm:text-xs overflow-hidden relative leading-relaxed">
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
                  {/* Fade Out Effect */}
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
                </div>
              </div>

              {/* With mcpcraft */}
              <div className="flex flex-col max-h-[300px] sm:max-h-[420px]">
                <div className="px-3 sm:px-4 py-1.5 sm:py-2 border border-white/15 border-b-0 bg-white/[0.04] rounded-t-md text-[10px] sm:text-xs font-mono text-white flex items-center justify-between">
                  <span className="truncate">With mcpcraft (12 lines)</span>
                  <span className="text-white/55 hidden sm:inline">Simple & Clean</span>
                </div>
                <div className="flex-1 border border-white/10 bg-[#050505] rounded-b-md p-3 sm:p-5 font-mono text-[10px] sm:text-xs overflow-y-auto leading-relaxed">
                  <pre className="text-white/90">
<code><div><span className="text-purple-400">import</span> {"{"} createServer, tool {"}"} <span className="text-purple-400">from</span> <span className="text-emerald-300">"mcpcraft"</span></div>
<div></div>
<div><span className="text-purple-400">const</span> server = <span className="text-blue-400">createServer</span>({"{"} name: <span className="text-emerald-300">"my-server"</span> {"}"})</div>
<div></div>
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
<div></div>
<div>server.<span className="text-blue-400">start</span>()</div></code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-16 sm:py-24 border-t border-white/10 text-center relative overflow-hidden bg-black">
          <div className="max-w-xl mx-auto px-4 sm:px-6 relative z-10">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3 sm:mb-4">
              Start building in minutes
            </h2>
            <p className="text-white/40 text-sm mb-6 sm:mb-8 font-sans px-4">
              Install the SDK to create custom API, database, and filesystem integrations for AI agents.
            </p>

            <div className="max-w-[280px] sm:max-w-xs mx-auto flex items-center justify-between border border-white/10 rounded-md bg-[#050505] pl-3 sm:pl-4 pr-1.5 sm:pr-2 py-1.5 text-[11px] sm:text-xs font-mono text-white/80 mb-6 sm:mb-8">
              <span className="truncate">
                $ <span className="text-white">npm install mcpcraft</span>
              </span>
              <button 
                onClick={() => handleCopy("npm install mcpcraft", "cta-install-cmd")}
                className="p-1 hover:bg-white/10 rounded transition-colors text-white/40 hover:text-white shrink-0"
              >
                {copiedText === "cta-install-cmd" ? "Copied" : "Copy"}
              </button>
            </div>

            <Link 
              href="/docs/installation" 
              className="inline-flex items-center gap-1.5 px-5 sm:px-6 py-2.5 rounded-md text-xs font-mono uppercase tracking-wider bg-white text-black hover:bg-white/95 transition-colors font-bold"
            >
              Read the docs &rarr;
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center sm:items-start gap-1">
            {mcpcraftLogo}
            <span className="text-xs text-white/30 mt-1 font-sans text-center sm:text-left">Built for the Model Context Protocol ecosystem.</span>
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
