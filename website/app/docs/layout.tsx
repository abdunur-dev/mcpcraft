import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import Footer from "@/components/Footer";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <DocsLayout
        tree={source.pageTree}
        nav={{
          title: (
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-white" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 2 L28 9 L28 23 L16 30 L4 23 L4 9 Z" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M16 2 L28 9 L16 16 L4 9 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M16 16 L28 9 L28 23 L16 30 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M4 9 L16 16 L16 30 L4 23 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
              </svg>
              <span className="font-mono text-xs uppercase tracking-wider font-bold text-white">mcpcraft-sdk</span>
            </div>
          ),
          url: "/",
          transparentMode: "top",
        }}
        links={[
          {
            text: "README",
            url: "/",
          },
          {
            text: "DOCS",
            url: "/docs",
            active: "nested-url",
          },
          {
            text: "GITHUB",
            url: "https://github.com/abdunur-dev/mcpcraft",
            external: true,
          },
        ]}
        themeSwitch={{
          enabled: false,
        }}
        searchToggle={{
          enabled: true,
        }}
      >
        {children}
      </DocsLayout>
      <Footer />
    </>
  );
}


