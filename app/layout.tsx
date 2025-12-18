import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://denzerdigital.com.br";
const fbAppId = "658289000700758";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Denzer Digital | Inteligência Artificial e Automação para Empresas",
    template: "%s | Denzer Digital",
  },
  description: "Transforme sua operação digital com Inteligência Artificial, automação e tecnologia de ponta. Agentes de IA, e-commerce Shopify, gestão digital 360° e muito mais.",
  keywords: [
    "inteligência artificial",
    "automação",
    "agentes de IA",
    "e-commerce",
    "Shopify",
    "marketing digital",
    "gestão digital",
    "WhatsApp Business",
    "automação de vendas",
    "CRM",
    "RD Station",
    "Kommo",
    "Meta Business",
    "Google Ads",
  ],
  authors: [{ name: "Denzer Digital" }],
  creator: "Denzer Digital",
  publisher: "Denzer Digital",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon_denzer.png",
    shortcut: "/favicon_denzer.png",
    apple: "/favicon_denzer.png",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Denzer Digital",
    title: "Denzer Digital | Inteligência Artificial e Automação para Empresas",
    description: "Transforme sua operação digital com Inteligência Artificial, automação e tecnologia de ponta.",
    images: [
      {
        url: `${siteUrl}/assets/denzer-logo.png`,
        width: 1200,
        height: 630,
        alt: "Denzer Digital",
      },
    ],
  },
  other: {
    "fb:app_id": "658289000700758",
  },
  twitter: {
    card: "summary_large_image",
    title: "Denzer Digital | Inteligência Artificial e Automação",
    description: "Transforme sua operação digital com Inteligência Artificial, automação e tecnologia de ponta.",
    images: ["/assets/denzer-logo.png"],
    creator: "@denzerdigital",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Adicionar códigos de verificação quando disponíveis
    // google: "google-site-verification-code",
    // yandex: "yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        {/* GTM - Mantido como beforeInteractive pois é necessário para tracking */}
        <Script id="gtm-stape" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){try{if(typeof w!=='undefined'&&typeof d!=='undefined'){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0];if(f){var j=d.createElement(s);j.async=true;j.src="https://stape.denzerdigital.com.br/3ugm6ismcveky.js?"+i;f.parentNode.insertBefore(j,f);}}}catch(e){console.warn('Erro ao carregar GTM:',e);}})(window,document,'script','dataLayer','dvduuqd=EA9YMTcgXj0hU1InWiolTw9WV1hSSxcHRA8AGBkIAQ0QDAwCAgFdChYGSxQR');`}
        </Script>
        {/* Facebook App ID - Meta tag customizada */}
        <meta property="fb:app_id" content="658289000700758" />
        {/* Open Graph Image - Meta tag customizada */}
        <meta property="og:image" content={`${siteUrl}/assets/denzer-logo.png`} />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased" suppressHydrationWarning>
        {/* Skip to main content link for keyboard navigation */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Pular para o conteúdo principal
        </a>
        <Providers>{children}</Providers>
        {/* Script de scroll otimizado - carregado após interação */}
        <Script id="scroll-prevention" strategy="afterInteractive">
          {`
            (function() {
              if (typeof window !== 'undefined' && typeof document !== 'undefined') {
                try {
                  if (window.location && window.location.hash) {
                    if (window.history && window.history.replaceState) {
                      window.history.replaceState(null, '', window.location.pathname + window.location.search);
                    }
                  }
                  if (window.scrollTo) {
                    window.scrollTo(0, 0);
                  }
                  if (document.documentElement) {
                    document.documentElement.scrollTop = 0;
                  }
                  if (document.body) {
                    document.body.scrollTop = 0;
                  }
                } catch (e) {
                  console.warn('Erro ao inicializar scroll:', e);
                }
              }
            })();
          `}
        </Script>
      </body>
    </html>
  );
}

