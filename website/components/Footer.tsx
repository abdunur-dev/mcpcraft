"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Feedback } from "@/components/ui/Feedback";
import { VERSION } from "@/lib/version";

interface LinkItem {
  label: string;
  href: string;
  external?: boolean;
}

const footerLinks: Record<string, LinkItem[]> = {
  Build: [
    { label: "Docs", href: "/docs" },
    { label: "API", href: "/docs/api/tool" },
    { label: "Examples", href: "/docs/examples/basic-server" },
  ],
  Resources: [
    { label: "GitHub", href: "https://github.com/abdunur-dev/mcpcraft", external: true },
    { label: "npm", href: "https://npmjs.com/package/mcpcraft-sdk", external: true },
    { label: "Blog", href: "/blog" },
    { label: "Changelog", href: "/changelog" },
  ],
  Company: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: VERSION, href: "https://npmjs.com/package/mcpcraft-sdk", external: true },
  ],
};

function MagnetLink({ href, external, children }: { href: string; external?: boolean; children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 });
  const [hover, setHover] = useState(false);

  const handleMouse = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const Tag = external ? "a" : Link;
  const props = external
    ? { href, target: "_blank", rel: "noreferrer" }
    : { href };

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMouse}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setPos({ x: 0.5, y: 0.5 });
      }}
      className="group relative inline-block text-sm text-white/50 hover:text-white transition-colors duration-200 font-mono w-fit"
      {...(props as any)}
    >
      <span
        className="inline-block transition-transform duration-200 ease-out"
        style={{
          transform: hover
            ? `translateX(${(pos.x - 0.5) * 6}px)`
            : "translateX(0px)",
        }}
      >
        {children}
      </span>
      <span
        className="absolute -bottom-0.5 left-1/2 h-px bg-white transition-all duration-300 ease-out"
        style={{
          width: hover ? `${40 + (1 - Math.abs(pos.x - 0.5) * 2) * 40}%` : "0%",
          transform: "translateX(-50%)",
          opacity: hover ? 1 : 0,
        }}
      />
    </Tag>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        <div className="mb-12">
          <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
            <span className="text-3xl sm:text-4xl font-bold tracking-wider text-white font-mono">
              MCPCRAFT
            </span>
          </Link>
        </div>

        <div className="h-px bg-white/10 mb-12" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[11px] font-mono uppercase tracking-[0.15em] text-white/30 mb-5">
                {category}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <MagnetLink href={link.href} external={link.external}>
                      {link.label}
                    </MagnetLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="h-px bg-white/10 my-12" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30 font-mono">
          <span>&copy; 2026 MCPCRAFT</span>
          <Feedback dryRun label="mcpcraft-sdk" />
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-white transition-colors duration-200">
              Home
            </Link>
            <Link href="/docs" className="hover:text-white transition-colors duration-200">
              Docs
            </Link>
            <a
              href="https://github.com/abdunur-dev/mcpcraft"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors duration-200"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
