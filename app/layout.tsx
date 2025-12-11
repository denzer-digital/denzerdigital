import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Denzer Digital",
  description: "Site migrado para Next.js (App Router).",
  icons: {
    icon: "/favicon_denzer.png",
    shortcut: "/favicon_denzer.png",
    apple: "/favicon_denzer.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

