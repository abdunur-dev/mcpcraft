"use client";

import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white/10 selection:text-white">
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center border-b border-white/10 bg-black/80 backdrop-blur-md h-14 px-4 sm:px-6">
        <Link href="/" className="font-mono text-sm uppercase tracking-wider font-bold text-white hover:opacity-80 transition-opacity">
          MCPCRAFT
        </Link>
      </div>

      <main className="pt-24 pb-16 px-4 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2 font-mono">Terms of Service</h1>
          <p className="text-xs text-white/30 font-mono mb-8">Last updated: June 2026</p>

          <div className="space-y-6 text-sm text-white/60 leading-relaxed font-mono">
            <section>
              <h2 className="text-white font-semibold mb-2">1. Acceptance of Terms</h2>
              <p>By using mcpcraft-sdk or accessing this website, you agree to these terms. If you do not agree, do not use our services.</p>
            </section>

            <section>
              <h2 className="text-white font-semibold mb-2">2. License</h2>
              <p>The mcpcraft-sdk is provided under the MIT License. You are free to use, modify, and distribute it in accordance with that license.</p>
            </section>

            <section>
              <h2 className="text-white font-semibold mb-2">3. Limitation of Liability</h2>
              <p>This software is provided &quot;as is&quot;, without warranty of any kind. In no event shall the authors be liable for any claim, damages, or other liability.</p>
            </section>

            <section>
              <h2 className="text-white font-semibold mb-2">4. Changes</h2>
              <p>We reserve the right to update these terms at any time. Continued use after changes constitutes acceptance of the new terms.</p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
