"use client";

import { useLayoutEffect, useState, useEffect } from "react";
import Link from "next/link";
import Script from "next/script";
import { Facebook, ArrowLeft, CheckCircle2, LogIn, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    FB: any;
    fbAsyncInit: () => void;
    checkLoginState: () => void;
  }
}

export default function FacebookPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loginStatus, setLoginStatus] = useState<string>('unknown');

  // Garante que a página sempre comece no topo
  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.hash && window.history.replaceState) {
        window.history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search
        );
      }
      window.scrollTo(0, 0);
    }
  }, []);

  // Callback para lidar com mudanças no status de login
  const statusChangeCallback = (response: any) => {
    console.log('Status de login:', response);
    setLoginStatus(response.status);

    if (response.status === 'connected') {
      // Pessoa está logada no Facebook e no app
      setIsLoggedIn(true);
      fetchUserData(response.authResponse);
    } else if (response.status === 'not_authorized') {
      // Pessoa está logada no Facebook, mas não no app
      setIsLoggedIn(false);
      setUserData(null);
    } else {
      // Pessoa não está logada no Facebook
      setIsLoggedIn(false);
      setUserData(null);
    }
  };

  // Escuta eventos do botão XFBML
  useEffect(() => {
    const handleFacebookLoginStatus = (event: CustomEvent) => {
      statusChangeCallback(event.detail);
    };

    window.addEventListener('facebook-login-status', handleFacebookLoginStatus as EventListener);

    return () => {
      window.removeEventListener('facebook-login-status', handleFacebookLoginStatus as EventListener);
    };
  }, []);

  // Verifica status de login quando o SDK carrega e processa XFBML
  useEffect(() => {
    const checkLoginStatus = () => {
      if (window.FB) {
        window.FB.getLoginStatus(function(response: any) {
          statusChangeCallback(response);
        });
        
        // Processa elementos XFBML (incluindo o botão de login)
        // Aguarda um pouco para garantir que o DOM está pronto
        setTimeout(() => {
          try {
            if (window.FB && window.FB.XFBML) {
              // Processa apenas o container do botão para evitar duplicação
              const container = document.getElementById('fb-login-button-container');
              if (container) {
                window.FB.XFBML.parse(container);
              }
            }
          } catch (error) {
            console.warn('Erro ao processar XFBML:', error);
          }
        }, 500);
      } else {
        // Tenta novamente após um pequeno delay se o SDK ainda não carregou
        setTimeout(checkLoginStatus, 100);
      }
    };

    // Aguarda o SDK carregar
    const interval = setInterval(() => {
      if (window.FB) {
        clearInterval(interval);
        checkLoginStatus();
      }
    }, 100);

    // Timeout de segurança - para após 10 segundos
    const timeout = setTimeout(() => {
      clearInterval(interval);
      if (window.FB) {
        checkLoginStatus();
      } else {
        console.warn('Facebook SDK não carregou após 10 segundos');
      }
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUserData = (authResponse?: any) => {
    if (window.FB) {
      window.FB.api('/me', { fields: 'name,email,picture' }, (response: any) => {
        if (response && !response.error) {
          setUserData(response);
        }
      });
    }
  };


  const handleFacebookLogin = () => {
    if (!window.FB) {
      console.error('Facebook SDK não carregado');
      return;
    }

    setIsLoading(true);
    window.FB.login((response: any) => {
      setIsLoading(false);
      statusChangeCallback(response);
    }, { scope: 'email,public_profile' });
  };

  const handleFacebookLogout = () => {
    if (window.FB) {
      window.FB.logout((response: any) => {
        setIsLoggedIn(false);
        setUserData(null);
      });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* fb-root necessário para o SDK do Facebook */}
      <div id="fb-root"></div>
      
      {/* Nota: O SDK do Facebook já está carregado globalmente no layout.tsx */}
      
      {/* Script para processar eventos do botão XFBML e garantir processamento */}
      <Script
        id="facebook-login-handler"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.checkLoginState = function() {
              if (window.FB) {
                window.FB.getLoginStatus(function(response) {
                  // Dispara evento customizado para o React escutar
                  window.dispatchEvent(new CustomEvent('facebook-login-status', { detail: response }));
                });
              }
            };
            
            // Processa XFBML quando o SDK estiver pronto (apenas uma vez)
            if (window.fbAsyncInit) {
              const originalFbAsyncInit = window.fbAsyncInit;
              let xfbmlProcessed = false;
              window.fbAsyncInit = function() {
                if (originalFbAsyncInit) originalFbAsyncInit();
                // Aguarda um pouco e processa XFBML apenas uma vez
                if (!xfbmlProcessed) {
                  setTimeout(function() {
                    if (window.FB && window.FB.XFBML) {
                      try {
                        const container = document.getElementById('fb-login-button-container');
                        if (container) {
                          window.FB.XFBML.parse(container);
                          xfbmlProcessed = true;
                        }
                      } catch (e) {
                        console.warn('Erro ao processar XFBML:', e);
                      }
                    }
                  }, 500);
                }
              };
            }
          `,
        }}
      />

      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background via-background/95 to-background/80">
        <div className="container mx-auto px-4 pt-10 pb-16">
          <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
            <ArrowLeft className="h-4 w-4" />
            <Link href="/" className="hover:text-primary transition-colors">
              Voltar
            </Link>
          </div>

          <div className="flex flex-col items-center text-center space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Facebook className="h-10 w-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Login com Facebook</h1>
            <p className="text-lg text-muted-foreground">
              Conecte-se usando sua conta do Facebook
            </p>
            <p className="max-w-2xl text-muted-foreground">
              Faça login de forma rápida e segura usando sua conta do Facebook para acessar nossos serviços.
            </p>
          </div>
        </div>
      </section>

      {/* Login Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card Facebook */}
            <div className="rounded-2xl border border-border bg-card/80 p-8 shadow-lg shadow-primary/5 backdrop-blur space-y-6">
              {!isLoggedIn ? (
                <>
                  <div className="text-center space-y-4">
                    <div className="flex justify-center">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <LogIn className="h-10 w-10" />
                      </div>
                    </div>
                    <h2 className="text-2xl font-semibold">Conectar com Facebook</h2>
                    <p className="text-muted-foreground">
                      Clique no botão abaixo para fazer login com sua conta do Facebook
                    </p>
                  </div>

                  {/* Botão de Login do Facebook usando XFBML */}
                  <div className="flex flex-col items-center gap-4">
                    <div 
                      id="fb-login-button-container"
                      className="fb-login-button" 
                      data-width="" 
                      data-size="large" 
                      data-button-type="continue_with" 
                      data-layout="default" 
                      data-auto-logout-link="false" 
                      data-use-continue-as="false"
                      data-onlogin="checkLoginState"
                      data-scope="email,public_profile"
                    ></div>
                  </div>

                  <div className="pt-4 space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Login rápido e seguro</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Sem necessidade de criar nova conta</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Seus dados estão protegidos</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center space-y-4">
                    <div className="flex justify-center">
                      {userData?.picture?.data?.url ? (
                        <img
                          src={userData.picture.data.url}
                          alt={userData.name}
                          className="h-20 w-20 rounded-full border-2 border-primary"
                        />
                      ) : (
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Facebook className="h-10 w-10" />
                        </div>
                      )}
                    </div>
                    <h2 className="text-2xl font-semibold">Conectado!</h2>
                    {userData && (
                      <div className="space-y-2">
                        <p className="text-lg font-medium">{userData.name}</p>
                        {userData.email && (
                          <p className="text-sm text-muted-foreground">{userData.email}</p>
                        )}
                      </div>
                    )}
                  </div>

                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-destructive/50 hover:border-destructive hover:bg-destructive/10"
                    onClick={handleFacebookLogout}
                  >
                    Desconectar
                  </Button>
                </>
              )}
            </div>

            {/* Card WhatsApp Business */}
            <div className="rounded-2xl border border-border bg-card/80 p-8 shadow-lg shadow-primary/5 backdrop-blur space-y-6">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <MessageCircle className="h-10 w-10" />
                  </div>
                </div>
                <h2 className="text-2xl font-semibold">Integrar WhatsApp Business - Denzer Digital</h2>
                <p className="text-muted-foreground">
                  Conecte sua conta do WhatsApp Business para começar a usar nossos serviços
                </p>
              </div>

              <div className="flex flex-col items-center gap-4">
                <Button
                  size="lg"
                  className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white"
                  onClick={() => {
                    window.open(
                      'https://business.facebook.com/messaging/whatsapp/onboard/?app_id=1410779820393549&config_id=1781278636608577&extras=%7B%22sessionInfoVersion%22%3A%223%22%2C%22version%22%3A%22v3%22%7D',
                      '_blank',
                      'noopener,noreferrer'
                    );
                  }}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Integrar WhatsApp Business
                </Button>
              </div>

              <div className="pt-4 space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Integração rápida e simples</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Conecte sua conta em poucos passos</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Gestão completa do WhatsApp Business</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

