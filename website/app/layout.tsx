import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { RootProvider } from "fumadocs-ui/provider/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "mcpcraft — Build MCP Servers Fast",
  description: "Lightweight TypeScript SDK for building MCP servers. Zero boilerplate, full type safety.",
  openGraph: {
    title: "mcpcraft — Build MCP Servers Fast",
    description: "Lightweight TypeScript SDK for building MCP servers. Zero boilerplate, full type safety.",
    url: "https://mcpcraft.org",
    siteName: "mcpcraft",
    images: [
      {
        url: "https://mcpcraft.org/og-image.png",
        width: 1200,
        height: 630,
        alt: "mcpcraft — Build MCP Servers Fast"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "mcpcraft — Build MCP Servers Fast",
    description: "Lightweight TypeScript SDK for building MCP servers. Zero boilerplate, full type safety.",
    images: ["https://mcpcraft.org/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} h-full`} data-theme="dark" suppressHydrationWarning>
      <body className="min-h-full flex flex-col antialiased" style={{ backgroundColor: "var(--page-bg)", color: "var(--page-text)" }}>
        <RootProvider
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


