"use client";

import { useLayoutEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useContactDialog } from "@/contexts/ContactDialogContext";

const ContactFormDialog = dynamic(() => import("@/components/ContactFormDialog"), {
  ssr: false,
});

const benefits = [
  "Loja Shopify completa e personalizada",
  "Integração nativa com agentes de IA",
  "Checkout otimizado para conversão",
  "Gestão de estoque e pedidos automatizada",
  "Integração com marketplaces",
  "Suporte e manutenção contínua",
];

const featureCards = [
  {
    title: "Shopify Plus",
    description: "Plataforma robusta e escalável, confiável para milhares de lojas no mundo.",
  },
  {
    title: "IA Integrada",
    description: "Agentes de IA nativos para atendimento, recomendações e vendas automatizadas.",
  },
  {
    title: "Alta Performance",
    description: "Otimização de velocidade, SEO e conversão desde o primeiro dia.",
  },
];

export default function EcommerceShopifyPage() {
  const { openDialog } = useContactDialog();
  
  // Garante que a página sempre comece no topo (antes do paint)
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background via-background/95 to-background/80 pt-20">
        <div className="container mx-auto px-4 pt-[60px] pb-24">
          <div className="mb-12 flex items-center gap-2 text-sm text-muted-foreground">
            <ArrowLeft className="h-4 w-4" />
            <Link href="/" className="hover:text-primary transition-colors">
              Voltar
            </Link>
          </div>

          <div className="flex flex-col items-center text-center space-y-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl" style={{ backgroundImage: "linear-gradient(135deg, rgba(0, 123, 255, 1) 0%, rgba(255, 123, 0, 1) 100%)" }}>
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
                <path d="M16 5.3335L8 16.0002V53.3335C8 54.748 8.5619 56.1045 9.5621 57.1047C10.5623 58.1049 11.9188 58.6668 13.3333 58.6668H50.6667C52.0812 58.6668 53.4377 58.1049 54.4379 57.1047C55.4381 56.1045 56 54.748 56 53.3335V16.0002L48 5.3335H16Z" stroke="white" strokeWidth="5.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 16H56" stroke="white" strokeWidth="5.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M42.6673 26.6665C42.6673 29.4955 41.5435 32.2086 39.5431 34.209C37.5427 36.2094 34.8296 37.3332 32.0007 37.3332C29.1717 37.3332 26.4586 36.2094 24.4582 34.209C22.4578 32.2086 21.334 29.4955 21.334 26.6665" stroke="white" strokeWidth="5.33333" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">E-commerce Shopify</h1>
            <p className="text-lg text-muted-foreground">Desenvolvimento de loja personalizada</p>
            <p className="max-w-2xl text-muted-foreground">
              Crie e escale seu e-commerce com a plataforma líder mundial, potencializada por IA.
            </p>
            <Button 
              size="lg" 
              className="mt-4 text-white hover:opacity-90"
              style={{
                backgroundImage: 'linear-gradient(90deg, rgba(255, 123, 0, 1) 0%, rgba(0, 123, 255, 1) 100%)'
              }}
              onClick={openDialog}
            >
              Quero saber mais
            </Button>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-16" style={{ backgroundColor: 'rgba(31, 36, 46, 0.3)' }}>
        <div className="mx-auto px-4 space-y-10" style={{ maxWidth: '1160px' }}>
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-semibold">
              Benefícios e <span className="text-primary">Recursos</span>
            </h2>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {benefits.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl border border-border bg-secondary/30 px-4 py-3"
              >
                <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm md:text-base text-foreground">{item}</span>
              </div>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {featureCards.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-border bg-secondary/40 p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[80px]">
        <div className="container mx-auto px-4">
          <div 
            className="mx-auto max-w-4xl rounded-2xl border px-8 py-10 text-center shadow-lg"
            style={{
              backgroundImage: 'linear-gradient(163.7deg, rgba(0, 123, 255, 0.1) 0%, rgba(255, 123, 0, 0.1) 100%)',
              borderColor: 'rgba(0, 123, 255, 0.2)'
            }}
          >
            <h3 className="text-2xl md:text-3xl font-semibold mb-3">
              Pronto para transformar seu negócio?
            </h3>
            <p className="text-muted-foreground mb-6">
              Converse com nossos especialistas e descubra como podemos ajudar.
            </p>
            <Button 
              size="lg" 
              className="hover:opacity-90 text-white" 
              style={{
                backgroundImage: 'linear-gradient(90deg, rgba(255, 123, 0, 1) 0%, rgba(0, 123, 255, 1) 100%)'
              }}
              onClick={openDialog}
            >
              Falar com Especialista
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <ContactFormDialog />
    </div>
  );
}

