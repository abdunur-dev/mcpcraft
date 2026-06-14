import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { RootProvider } from "fumadocs-ui/provider/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "mcpkit — Build MCP Servers Fast",
  description: "Lightweight TypeScript SDK for building MCP servers. Zero boilerplate, full type safety.",
  openGraph: {
    title: "mcpkit — Build MCP Servers Fast",
    description: "Lightweight TypeScript SDK for building MCP servers. Zero boilerplate, full type safety.",
    url: "https://mcpkit.org",
    siteName: "mcpkit",
    images: [
      {
        url: "https://mcpkit.org/og-image.png",
        width: 1200,
        height: 630,
        alt: "mcpkit — Build MCP Servers Fast"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "mcpkit — Build MCP Servers Fast",
    description: "Lightweight TypeScript SDK for building MCP servers. Zero boilerplate, full type safety.",
    images: ["https://mcpkit.org/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full dark`} style={{ colorScheme: "dark" }}>
      <body className="min-h-full flex flex-col bg-[#09090b] text-[#fafafa] antialiased">
        <RootProvider>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
