"use client";

import Link from "next/link";

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white/10 selection:text-white">
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center border-b border-white/10 bg-black/80 backdrop-blur-md h-14 px-4 sm:px-6">
        <Link href="/" className="font-mono text-sm uppercase tracking-wider font-bold text-white hover:opacity-80 transition-opacity">
          MCPCRAFT
        </Link>
      </div>

      <main className="pt-24 pb-16 px-4 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2 font-mono">Cookie Policy</h1>
          <p className="text-xs text-white/30 font-mono mb-8">Last updated: June 2026</p>

          <div className="space-y-6 text-sm text-white/60 leading-relaxed font-mono">
            <section>
              <h2 className="text-white font-semibold mb-2">1. What Are Cookies</h2>
              <p>Cookies are small text files stored on your device by your browser. They help websites remember preferences and improve functionality.</p>
            </section>

            <section>
              <h2 className="text-white font-semibold mb-2">2. How We Use Cookies</h2>
              <p>We use minimal cookies for essential functionality, such as theme preference persistence. We do not use tracking or advertising cookies.</p>
            </section>

            <section>
              <h2 className="text-white font-semibold mb-2">3. Managing Cookies</h2>
              <p>You can control cookies through your browser settings. Disabling cookies may affect certain features of the site.</p>
            </section>

            <section>
              <h2 className="text-white font-semibold mb-2">4. Changes</h2>
              <p>We may update this policy occasionally. Check back for any changes.</p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
