"use client";

import Link from "next/link";

const posts = [
  {
    title: "Introducing mcpcraft-sdk",
    date: "June 2026",
    excerpt: "Build MCP servers with TypeScript — zero boilerplate, full type safety, auto-generated schemas.",
    slug: "introducing-mcpcraft-sdk",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white/10 selection:text-white">
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center border-b border-white/10 bg-black/80 backdrop-blur-md h-14 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-mono text-sm uppercase tracking-wider font-bold text-white hover:opacity-80 transition-opacity">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
          MCPCRAFT
        </Link>
      </div>

      <main className="pt-24 pb-16 px-4 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2 font-mono">Blog</h1>
          <p className="text-sm text-white/40 font-mono mb-8">Updates, guides, and announcements.</p>

          <div className="space-y-8">
            {posts.map((post) => (
              <article key={post.slug} className="border border-white/10 rounded-lg p-6 hover:border-white/20 transition-colors">
                <time className="text-xs text-white/30 font-mono">{post.date}</time>
                <h2 className="text-lg font-semibold text-white mt-1 mb-2">{post.title}</h2>
                <p className="text-sm text-white/50 font-mono leading-relaxed">{post.excerpt}</p>
              </article>
            ))}
          </div>

          {posts.length === 0 && (
            <p className="text-sm text-white/30 font-mono">No posts yet. Check back soon.</p>
          )}
        </div>
      </main>
    </div>
  );
}
