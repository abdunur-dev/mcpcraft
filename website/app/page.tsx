"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [bannerVisible, setBannerVisible] = useState(true);
  const [copiedText, setCopiedText] = useState("");

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(""), 2000);
  };

  const mcpcraftLogo = (
    <div className="flex items-center gap-2">
      <svg className="w-6 h-6 text-[#7c3aed]" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 2 L28 9 L28 23 L16 30 L4 23 L4 9 Z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M16 2 L28 9 L16 16 L4 9 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M16 16 L28 9 L28 23 L16 30 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M4 9 L16 16 L16 30 L4 23 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      </svg>
      <span className="font-bold text-lg tracking-tight text-[#fafafa]">mcpcraft</span>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#09090b] text-[#fafafa] font-sans selection:bg-[#7c3aed]/30 selection:text-white">
      {/* Announcement Banner */}
      {bannerVisible && (
        <div className="relative w-full bg-[#7c3aed] text-white px-4 py-2 text-center text-xs sm:text-sm font-medium z-50 flex items-center justify-center gap-2 transition-all">
          <span>🚀 mcpcraft v0.1.0 is out — Build MCP servers in minutes</span>
          <Link href="/docs/installation" className="underline hover:text-purple-100 transition-colors font-semibold">
            Read the docs &rarr;
          </Link>
          <button 
            onClick={() => setBannerVisible(false)}
            className="absolute right-3 p-1 hover:bg-white/15 rounded-md transition-colors"
            aria-label="Dismiss banner"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Sticky Header */}
      <header className="sticky top-0 z-40 w-full border-b border-[#1f1f23] bg-[#09090b]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="hover:opacity-95 transition-opacity">
            {mcpcraftLogo}
          </Link>
          <nav className="flex items-center gap-4 sm:gap-6">
            <Link href="/docs" className="text-sm font-medium text-[#71717a] hover:text-[#fafafa] transition-colors">
              Docs
            </Link>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer"
              className="text-sm font-medium text-[#71717a] hover:text-[#fafafa] transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://npmjs.com/package/mcpcraft"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#111113] border border-[#1f1f23] text-[#7c3aed]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#7c3aed]" />
              npm v0.1.0
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#7c3aed]/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#111113] border border-[#1f1f23] text-[#71717a] mb-6">
            <span className="text-[#7c3aed]">⚡</span> Built on the official MCP SDK
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#fafafa] mb-6 leading-tight">
            Build MCP Servers <span className="bg-gradient-to-r from-purple-400 to-[#7c3aed] bg-clip-text text-transparent">Fast</span>
          </h1>
          <p className="text-lg sm:text-xl text-[#71717a] max-w-2xl mx-auto mb-10 leading-relaxed">
            The lightweight TypeScript SDK for building Model Context Protocol servers. Zero boilerplate, full type safety, and automatic Zod validation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link 
              href="/docs/installation" 
              className="w-full sm:w-auto px-8 py-3 rounded-lg text-sm font-semibold bg-[#7c3aed] hover:bg-[#6d28d9] text-white shadow-lg shadow-purple-500/10 transition-all duration-200"
            >
              Get Started
            </Link>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-3 rounded-lg text-sm font-semibold bg-[#09090b] hover:bg-[#111113] border border-[#1f1f23] text-[#fafafa] transition-colors"
            >
              View on GitHub
            </a>
          </div>

          {/* Code block showing quick example */}
          <div className="max-w-2xl mx-auto rounded-xl border border-[#1f1f23] bg-[#0d0d0f] shadow-2xl text-left overflow-hidden mb-8">
            <div className="bg-[#111113] border-b border-[#1f1f23] px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="text-xs text-[#71717a] font-mono ml-2">server.ts</span>
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
                className="text-xs font-medium text-[#71717a] hover:text-[#fafafa] flex items-center gap-1 transition-colors"
              >
                {copiedText === "hero-code" ? "Copied!" : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>
            <pre className="p-5 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed text-[#fafafa] bg-[#0d0d0f]">
<code><span className="text-purple-400">import</span> {"{"} createServer, tool {"}"} <span className="text-purple-400">from</span> <span className="text-green-300">"mcpcraft"</span>

<span className="text-purple-400">const</span> server = <span className="text-blue-400">createServer</span>({"{"} name: <span className="text-green-300">"my-server"</span> {"}"})

server.<span className="text-blue-400">add</span>(<span className="text-blue-400">tool</span>({"{"}
  name: <span className="text-green-300">"send_email"</span>,
  description: <span className="text-green-300">"Sends an email"</span>,
  input: {"{"}
    to: {"{"} type: <span className="text-green-300">"string"</span>, description: <span className="text-green-300">"Recipient"</span> {"}"},
    body: {"{"} type: <span className="text-green-300">"string"</span>, description: <span className="text-green-300">"Content"</span> {"}"}
  {"}"},
  run: <span className="text-purple-400">async</span> ({`{ to, body }`}) <span className="text-purple-400">=&gt;</span> {"{"}
    <span className="text-purple-400">return</span> {"{"} success: <span className="text-orange-400">true</span> {"}"}
  {"}"}
{"}"}))

server.<span className="text-blue-400">start</span>()</code>
            </pre>
          </div>

          {/* Copy-paste CLI block */}
          <div className="max-w-sm mx-auto flex items-center justify-between border border-[#1f1f23] rounded-lg bg-[#111113] pl-4 pr-2 py-1.5 text-sm font-mono text-[#fafafa]">
            <span className="text-[#71717a]">
              $ <span className="text-[#fafafa]">npm install mcpcraft</span>
            </span>
            <button 
              onClick={() => handleCopy("npm install mcpcraft", "install-cmd")}
              className="p-1.5 hover:bg-[#1f1f23] rounded transition-colors text-[#71717a] hover:text-[#fafafa]"
              title="Copy install command"
            >
              {copiedText === "install-cmd" ? (
                <span className="text-xs text-[#7c3aed] font-semibold font-sans px-1">Copied</span>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-[#1f1f23] bg-[#111113]/40">
        <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-3 divide-x divide-[#1f1f23] text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#7c3aed]">&lt; 5 min</div>
            <div className="text-xs sm:text-sm text-[#71717a] mt-1">Time to first server</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#7c3aed]">100%</div>
            <div className="text-xs sm:text-sm text-[#71717a] mt-1">TypeScript coverage</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#7c3aed]">MIT</div>
            <div className="text-xs sm:text-sm text-[#71717a] mt-1">License</div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#fafafa] mb-4">
            Everything you need
          </h2>
          <p className="text-[#71717a] text-md sm:text-lg max-w-xl mx-auto">
            Build production-ready MCP integrations with clean, standard code.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-6 rounded-xl border border-[#1f1f23] bg-[#111113]/70 hover:border-[#7c3aed]/30 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#7c3aed]/10 flex items-center justify-center text-[#7c3aed] mb-4">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#fafafa] mb-2">Zero Boilerplate</h3>
            <p className="text-sm text-[#71717a] leading-relaxed">
              Create a full, running MCP server in just 10 lines of code. No protocol plumbing or transport details required.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-xl border border-[#1f1f23] bg-[#111113]/70 hover:border-[#7c3aed]/30 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#7c3aed]/10 flex items-center justify-center text-[#7c3aed] mb-4">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#fafafa] mb-2">Full Type Safety</h3>
            <p className="text-sm text-[#71717a] leading-relaxed">
              Handler input types are inferred automatically from your tool parameters. Zero type casting, complete autocomplete.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-xl border border-[#1f1f23] bg-[#111113]/70 hover:border-[#7c3aed]/30 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#7c3aed]/10 flex items-center justify-center text-[#7c3aed] mb-4">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#fafafa] mb-2">Built-in Validation</h3>
            <p className="text-sm text-[#71717a] leading-relaxed">
              Dynamic Zod validation checks all inputs before they reach your handler. Invalid parameters receive clear feedback.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-xl border border-[#1f1f23] bg-[#111113]/70 hover:border-[#7c3aed]/30 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#7c3aed]/10 flex items-center justify-center text-[#7c3aed] mb-4">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#fafafa] mb-2">Tools & Resources</h3>
            <p className="text-sm text-[#71717a] leading-relaxed">
              Clean APIs to register both tools and resources (static files or dynamic template endpoints) using a simple `add()` API.
            </p>
          </div>

          {/* Card 5 */}
          <div className="p-6 rounded-xl border border-[#1f1f23] bg-[#111113]/70 hover:border-[#7c3aed]/30 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#7c3aed]/10 flex items-center justify-center text-[#7c3aed] mb-4">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l.707-.707m2.828 9.9a5 5 0 113.536 0V21h2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2h2v-2.121z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#fafafa] mb-2">Official SDK</h3>
            <p className="text-sm text-[#71717a] leading-relaxed">
              mcpcraft wraps the official `@modelcontextprotocol/sdk`. It remains fully spec-compliant and compatible with all MCP hosts.
            </p>
          </div>

          {/* Card 6 */}
          <div className="p-6 rounded-xl border border-[#1f1f23] bg-[#111113]/70 hover:border-[#7c3aed]/30 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#7c3aed]/10 flex items-center justify-center text-[#7c3aed] mb-4">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#fafafa] mb-2">CLI Scaffolding</h3>
            <p className="text-sm text-[#71717a] leading-relaxed">
              Instantly scaffold a new ready-to-run MCP server project configured with typescript and mcpcraft in a single command.
            </p>
          </div>
        </div>
      </section>

      {/* Terminal Scaffolder Section */}
      <section className="py-20 border-t border-[#1f1f23] relative">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-[#fafafa] mb-4">
              Scaffold in seconds
            </h2>
            <p className="text-[#71717a] text-sm sm:text-md max-w-lg mx-auto">
              Get standard projects up and running instantly using our CLI bootstrapper.
            </p>
          </div>

          {/* Styled Terminal Block */}
          <div className="max-w-lg mx-auto rounded-xl border border-[#1f1f23] bg-[#0d0d0f] shadow-2xl text-left overflow-hidden">
            <div className="bg-[#111113] border-b border-[#1f1f23] px-4 py-3 flex items-center">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="text-xs text-[#71717a] font-mono ml-2">Terminal</span>
              </div>
            </div>
            <div className="p-6 font-mono text-xs sm:text-sm space-y-2.5 text-[#fafafa]">
              <div>
                <span className="text-purple-400">$</span> npx mcpcraft init
              </div>
              <div className="text-green-400">
                ✔ <span className="text-[#fafafa]">What is your server name?</span> <span className="text-[#71717a]">›</span> my-server
              </div>
              <div className="text-[#fafafa]">
                ✔ Created my-server/
              </div>
              <div className="text-[#fafafa]">
                ✔ Installing dependencies...
              </div>
              <div className="text-[#fafafa] font-semibold">
                ✔ Done! Run: <span className="text-[#7c3aed]">cd my-server && npm run dev</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Comparison Section */}
      <section className="py-24 border-t border-[#1f1f23]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#fafafa] mb-4">
              Less code. More done.
            </h2>
            <p className="text-[#71717a] text-md max-w-md mx-auto">
              We did the boilerplate plumbing so you can focus on building your tools and resource loaders.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Without mcpcraft */}
            <div className="flex flex-col h-[480px]">
              <div className="px-4 py-2 border border-red-500/20 bg-red-950/10 rounded-t-lg text-xs font-semibold text-red-400 border-b-0 flex items-center justify-between">
                <span>Without mcpcraft (100+ lines)</span>
                <span className="text-red-500/50">RAW SDK Boilerplate</span>
              </div>
              <div className="flex-1 border border-[#1f1f23] bg-[#0d0d0f] rounded-b-lg p-5 font-mono text-xs overflow-hidden relative leading-relaxed">
                <pre className="text-red-400/50">
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
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0d0d0f] to-transparent pointer-events-none" />
              </div>
            </div>

            {/* With mcpcraft */}
            <div className="flex flex-col h-[480px]">
              <div className="px-4 py-2 border border-green-500/20 bg-green-950/10 rounded-t-lg text-xs font-semibold text-green-400 border-b-0 flex items-center justify-between">
                <span>With mcpcraft (12 lines)</span>
                <span className="text-green-500/50">Simple & Clean</span>
              </div>
              <div className="flex-1 border border-[#1f1f23] bg-[#0d0d0f] rounded-b-lg p-5 font-mono text-xs overflow-y-auto leading-relaxed">
                <pre className="text-[#fafafa]">
<code><span className="text-purple-400">import</span> {"{"} createServer, tool {"}"} <span className="text-purple-400">from</span> <span className="text-green-300">"mcpcraft"</span>

<span className="text-purple-400">const</span> server = <span className="text-blue-400">createServer</span>({"{"} name: <span className="text-green-300">"my-server"</span> {"}"})

server.<span className="text-blue-400">add</span>(<span className="text-blue-400">tool</span>({"{"}
  name: <span className="text-green-300">"send_email"</span>,
  description: <span className="text-green-300">"Sends an email"</span>,
  input: {"{"}
    to: {"{"} type: <span className="text-green-300">"string"</span>, description: <span className="text-green-300">"Recipient"</span> {"}"},
    body: {"{"} type: <span className="text-green-300">"string"</span>, description: <span className="text-green-300">"Content"</span> {"}"}
  {"}"},
  run: <span className="text-purple-400">async</span> ({`{ to, body }`}) <span className="text-purple-400">=&gt;</span> {"{"}
    <span className="text-purple-400">return</span> {"{"} success: <span className="text-orange-400">true</span> {"}"}
  {"}"}
{"}"}))

server.<span className="text-blue-400">start</span>()</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-[#1f1f23] text-center relative overflow-hidden bg-[#111113]/30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#7c3aed]/5 blur-[90px] rounded-full pointer-events-none" />
        <div className="max-w-xl mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold tracking-tight text-[#fafafa] mb-4">
            Start building in minutes
          </h2>
          <p className="text-[#71717a] text-sm sm:text-md mb-8">
            Install the SDK to create custom API, database, and filesystem integrations for AI agents.
          </p>

          <div className="max-w-xs mx-auto flex items-center justify-between border border-[#1f1f23] rounded-lg bg-[#0d0d0f] pl-4 pr-2 py-1.5 text-sm font-mono text-[#fafafa] mb-6">
            <span className="text-[#71717a]">$ <span className="text-[#fafafa]">npm install mcpcraft</span></span>
            <button 
              onClick={() => handleCopy("npm install mcpcraft", "cta-install-cmd")}
              className="p-1.5 hover:bg-[#1f1f23] rounded transition-colors text-[#71717a] hover:text-[#fafafa]"
            >
              {copiedText === "cta-install-cmd" ? (
                <span className="text-xs text-[#7c3aed] font-semibold font-sans px-1">Copied</span>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
              )}
            </button>
          </div>

          <Link 
            href="/docs/installation" 
            className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-lg text-sm font-semibold bg-[#7c3aed] hover:bg-[#6d28d9] text-white transition-colors"
          >
            Read the docs
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-[#1f1f23] bg-[#09090b] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center sm:items-start gap-2">
            {mcpcraftLogo}
            <span className="text-xs text-[#71717a] mt-1">Built for the Model Context Protocol ecosystem.</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-[#71717a]">
            <Link href="/docs" className="hover:text-[#fafafa] transition-colors">Docs</Link>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-[#fafafa] transition-colors">GitHub</a>
            <a href="https://npmjs.com/package/mcpcraft" target="_blank" rel="noreferrer" className="hover:text-[#fafafa] transition-colors">npm</a>
            <a href="https://raw.githubusercontent.com/username/mcpcraft/main/LICENSE" target="_blank" rel="noreferrer" className="hover:text-[#fafafa] transition-colors">MIT License</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

