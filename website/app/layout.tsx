import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { RootProvider } from "fumadocs-ui/provider/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full dark`} style={{ colorScheme: "dark" }} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-[#000000] text-[#ffffff] antialiased">
        <div className="hero-grid-fixed" aria-hidden="true" />
        <RootProvider>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}


