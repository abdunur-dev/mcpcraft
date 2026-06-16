import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { RootProvider } from "fumadocs-ui/provider/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "mcpcraft-sdk — MCP Server SDK for TypeScript",
  description: "Build MCP servers fast with mcpcraft-sdk — the lightweight TypeScript SDK for the Model Context Protocol. Zero boilerplate, full type safety, auto-generated schemas.",
  openGraph: {
    title: "mcpcraft-sdk — MCP Server SDK for TypeScript",
    description: "Build MCP servers fast with mcpcraft-sdk — the lightweight TypeScript SDK for the Model Context Protocol. Zero boilerplate, full type safety, auto-generated schemas.",
    url: "https://mcpcraft.org",
    siteName: "mcpcraft-sdk",
    images: [
      {
        url: "https://mcpcraft.org/og-image.png",
        width: 1200,
        height: 630,
        alt: "mcpcraft-sdk — MCP Server SDK for TypeScript"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "mcpcraft-sdk — MCP Server SDK for TypeScript",
    description: "Build MCP servers fast with mcpcraft-sdk — the lightweight TypeScript SDK for the Model Context Protocol. Zero boilerplate, full type safety, auto-generated schemas.",
    images: ["https://mcpcraft.org/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col antialiased" style={{ backgroundColor: "var(--page-bg)", color: "var(--page-text)" }}>
        <RootProvider
          theme={{
            attribute: "class",
            defaultTheme: "dark",
          }}
          search={{
            enabled: true,
            options: {
              api: "/api/search",
            },
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}


