import type { Metadata } from "next";
import Script from "next/script";
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
    <html lang="pt-BR" style={{ scrollBehavior: 'auto' }}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Remove hash da URL para prevenir scroll automático
                if (window.location.hash) {
                  window.history.replaceState(null, '', window.location.pathname + window.location.search);
                }
                // Força página a começar no topo
                window.scrollTo(0, 0);
              })();
            `,
          }}
        />
        <Script id="gtm-stape" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src="https://stape.denzerdigital.com.br/3ugm6ismcveky.js?"+i;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','dvduuqd=EA9YMTcgXj0hU1InWiolTw9WV1hSSxcHRA8AGBkIAQ0QDAwCAgFdChYGSxQR');`}
        </Script>
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

