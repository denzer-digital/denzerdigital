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
    icon: "/assets/favicon-denzer.webp",
    shortcut: "/assets/favicon-denzer.webp",
    apple: "/assets/favicon-denzer.webp",
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
        url: `${siteUrl}/assets/Logo-Denzer-Digital.webp`,
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
    images: ["/assets/Logo-Denzer-Digital.webp"],
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
        {/* 
          Preconnect e DNS Prefetch para recursos externos - melhora performance
          Nota: Recursos de terceiros (Facebook SDK, RD Station, CloudFront) não podem ter 
          seus headers de cache controlados por nós, pois são servidos por terceiros.
          No entanto, preconnect/dns-prefetch acelera a conexão inicial com esses domínios.
        */}
        <link rel="preconnect" href="https://connect.facebook.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://stape.denzerdigital.com.br" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://d335luupugsy2.cloudfront.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://d1sag09wwfbul8.cloudfront.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://dk9suync0k2va.cloudfront.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.facebook.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://stape.denzerdigital.com.br" />
        <link rel="dns-prefetch" href="https://d335luupugsy2.cloudfront.net" />
        <link rel="dns-prefetch" href="https://d1sag09wwfbul8.cloudfront.net" />
        <link rel="dns-prefetch" href="https://dk9suync0k2va.cloudfront.net" />
        <link rel="dns-prefetch" href="https://www.facebook.com" />
        
        {/* GTM - Movido para afterInteractive para não bloquear renderização inicial */}
        <Script id="gtm-stape" strategy="afterInteractive">
          {`(function(w,d,s,l,i){try{if(typeof w!=='undefined'&&typeof d!=='undefined'){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0];if(f){var j=d.createElement(s);j.async=true;j.src="https://stape.denzerdigital.com.br/3ugm6ismcveky.js?"+i;f.parentNode.insertBefore(j,f);}}}catch(e){console.warn('Erro ao carregar GTM:',e);}})(window,document,'script','dataLayer','dvduuqd=EA9YMTcgXj0hU1InWiolTw9WV1hSSxcHRA8AGBkIAQ0QDAwCAgFdChYGSxQR');`}
        </Script>
        {/* Facebook App ID - Meta tag customizada */}
        <meta property="fb:app_id" content="658289000700758" />
        {/* Open Graph Image - Meta tag customizada */}
        <meta property="og:image" content={`${siteUrl}/assets/Logo-Denzer-Digital.webp`} />
        {/* Facebook SDK - Carregado globalmente em todas as páginas */}
        <Script
          id="facebook-sdk-loader"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function(d, s, id){
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {return;}
                js = d.createElement(s); js.id = id;
                js.src = "https://connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
              }(document, 'script', 'facebook-jssdk'));
            `,
          }}
        />
        <Script
          id="facebook-sdk-init"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.fbAsyncInit = function() {
                FB.init({
                  appId      : '658289000700758',
                  cookie     : true,
                  xfbml      : true,
                  version    : 'v24.0'
                });
                FB.AppEvents.logPageView();   
              };
            `,
          }}
        />
        {/* WhatsApp Embedded Signup - Listener de mensagens do Facebook */}
        <Script
          id="whatsapp-embedded-signup"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('message', (event) => {
                if (event.origin !== "https://www.facebook.com") return;
                
                try {
                  const data = JSON.parse(event.data);
                  if (data.type === 'WA_EMBEDDED_SIGNUP') {
                    console.log('WhatsApp Embedded Signup event received:', data);
                    // Adicione aqui a lógica para processar o evento de signup
                    // Exemplo: redirecionar, atualizar UI, enviar dados para servidor, etc.
                  }
                } catch (error) {
                  // Ignora erros de parsing
                }
              });
            `,
          }}
        />
        {/* RD Station Loader Script - Carrega o script principal com o token */}
        <Script
          id="rdstation-loader"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window === 'undefined') return;
                
                // Verifica se está no domínio principal
                const hostname = window.location.hostname;
                const allowedDomain = 'denzerdigital.com.br';
                
                // Verifica se é o domínio principal ou subdomínio permitido
                if (hostname === allowedDomain || hostname.endsWith('.' + allowedDomain)) {
                  // Carrega o script loader do RD Station com o token
                  var loaderScript = document.createElement('script');
                  loaderScript.id = 'rdstation-loader-script';
                  loaderScript.src = 'https://d335luupugsy2.cloudfront.net/js/loader-scripts/02b269cd38a50b7180df773a81bf966c-loader.js';
                  loaderScript.async = true;
                  document.head.appendChild(loaderScript);
                  
                  // Também carrega o script de forms para compatibilidade
                  var formsScript = document.createElement('script');
                  formsScript.id = 'rdstation-forms-script';
                  formsScript.src = 'https://d335luupugsy2.cloudfront.net/js/rdstation-forms/stable/rdstation-forms.min.js';
                  formsScript.async = true;
                  document.head.appendChild(formsScript);
                } else {
                  console.log('RD Station não carregado: domínio não permitido (' + hostname + ')');
                }
              })();
            `,
          }}
        />
        {/* Script para inicializar e reinicializar RD Station quando necessário - Apenas no domínio principal */}
        <Script
          id="rdstation-helper"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window === 'undefined') return;
                
                // Verifica se está no domínio principal
                const hostname = window.location.hostname;
                const allowedDomain = 'denzerdigital.com.br';
                
                // Verifica se é o domínio principal ou subdomínio permitido
                if (hostname !== allowedDomain && !hostname.endsWith('.' + allowedDomain)) {
                  console.log('RD Station helper não executado: domínio não permitido (' + hostname + ')');
                  return;
                }
                
                // Função global para reinicializar RD Station usando o método de integração
                window.reinitRDStation = function() {
                  const token = '02b269cd38a50b7180df773a81bf966c';
                  
                  // Tenta usar o método de integração do RD Station (método recomendado)
                  if (window.RdstationFormsIntegration && window.RdstationFormsIntegration.Integration) {
                    try {
                      window.RdstationFormsIntegration.Integration.integrateAll(token);
                      console.log('RD Station integração forçada via integrateAll');
                      return true;
                    } catch (error) {
                      console.warn('Erro ao integrar RD Station via integrateAll:', error);
                    }
                  }
                  
                  // Fallback para o método antigo
                  if (window.RDCaptureForms) {
                    try {
                      window.RDCaptureForms.init();
                      console.log('RD Station Forms reinicializado (fallback)');
                      return true;
                    } catch (error) {
                      console.warn('Erro ao reinicializar RD Station Forms:', error);
                      return false;
                    }
                  }
                  return false;
                };
                
                // Função para inicializar quando o script do RD Station carregar
                function initRDStationWhenReady() {
                  if (window.RDCaptureForms) {
                    try {
                      window.RDCaptureForms.init();
                      console.log('RD Station Forms inicializado globalmente');
                    } catch (error) {
                      console.warn('Erro ao inicializar RD Station Forms:', error);
                    }
                  } else {
                    // Se ainda não carregou, tenta novamente após um tempo
                    setTimeout(initRDStationWhenReady, 200);
                  }
                }
                
                // Aguarda o script do RD Station carregar
                const checkRDStation = setInterval(function() {
                  if (window.RDCaptureForms) {
                    clearInterval(checkRDStation);
                    initRDStationWhenReady();
                  }
                }, 100);
                
                // Limpa o intervalo após 10 segundos
                setTimeout(function() {
                  clearInterval(checkRDStation);
                }, 10000);
                
                // Inicializa quando o DOM estiver pronto
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', function() {
                    setTimeout(initRDStationWhenReady, 500);
                  });
                } else {
                  setTimeout(initRDStationWhenReady, 500);
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased" suppressHydrationWarning>
        {/* fb-root necessário para o SDK do Facebook */}
        <div id="fb-root"></div>
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

