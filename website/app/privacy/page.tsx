"use client";

import Link from "next/link";

export default function PrivacyPage() {
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
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2 font-mono">Privacy Policy</h1>
          <p className="text-xs text-white/30 font-mono mb-8">Last updated: June 2026</p>

          <div className="space-y-6 text-sm text-white/60 leading-relaxed font-mono">
            <section>
              <h2 className="text-white font-semibold mb-2">1. Information We Collect</h2>
              <p>We collect information you provide directly, such as when you use our SDK, visit our website, or contact us. This may include your name, email address, and usage data.</p>
            </section>

            <section>
              <h2 className="text-white font-semibold mb-2">2. How We Use Your Information</h2>
              <p>We use the information to operate, maintain, and improve our services, communicate with you, and comply with legal obligations.</p>
            </section>

            <section>
              <h2 className="text-white font-semibold mb-2">3. Data Sharing</h2>
              <p>We do not sell your personal information. We may share data with service providers who help us operate our infrastructure, subject to confidentiality agreements.</p>
            </section>

            <section>
              <h2 className="text-white font-semibold mb-2">4. Security</h2>
              <p>We implement industry-standard security measures to protect your data. However, no method of transmission over the Internet is 100% secure.</p>
            </section>

            <section>
              <h2 className="text-white font-semibold mb-2">5. Contact</h2>
              <p>If you have questions about this policy, please reach out via our GitHub repository.</p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
