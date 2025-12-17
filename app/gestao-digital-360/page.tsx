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
  "Planejamento estratégico personalizado",
  "Gestão de mídia paga (Meta, Google)",
  "Automações de marketing inteligentes",
  "Análise de dados e otimização contínua",
  "Integração com CRM e ferramentas",
  "Relatórios e insights em tempo real",
];

const featureCards = [
  {
    title: "Estratégia Data-Driven",
    description: "Decisões baseadas em dados reais e comportamento do seu público.",
  },
  {
    title: "Automação RD Station",
    description: "Nutrição automática de leads e automações inteligentes de marketing.",
  },
  {
    title: "Performance Marketing",
    description: "Campanhas otimizadas para máximo ROI em Meta Ads e Google Ads.",
  },
];

export default function GestaoDigital360Page() {
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
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl" style={{ backgroundImage: "linear-gradient(135deg, rgba(255, 123, 0, 1) 0%, rgba(255, 123, 0, 0) 100%)" }}>
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
                <path d="M43.3067 20.6934L38.496 35.1227C38.2342 35.9082 37.7931 36.622 37.2076 37.2076C36.622 37.7931 35.9082 38.2342 35.1227 38.496L20.6934 43.3067L25.504 28.8774C25.7658 28.0918 26.207 27.378 26.7925 26.7925C27.378 26.207 28.0918 25.7658 28.8774 25.504L43.3067 20.6934Z" stroke="white" strokeWidth="5.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M32.0007 58.6668C46.7282 58.6668 58.6673 46.7278 58.6673 32.0002C58.6673 17.2726 46.7282 5.3335 32.0007 5.3335C17.2731 5.3335 5.33398 17.2726 5.33398 32.0002C5.33398 46.7278 17.2731 58.6668 32.0007 58.6668Z" stroke="white" strokeWidth="5.33333" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Gestão Digital 360º</h1>
            <p className="text-lg text-muted-foreground">
              Estratégia, mídia e automação baseadas em dados
            </p>
            <p className="max-w-2xl text-muted-foreground">
              Planejamento completo e execução de campanhas digitais com inteligência artificial.
            </p>
            <Button 
              size="lg" 
              className="mt-4 text-white hover:opacity-90 border-0"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 123, 0, 1) 0%, rgba(255, 123, 0, 0) 100%)',
                backgroundColor: 'transparent'
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
              className="text-white hover:opacity-90 border-0" 
              style={{
                background: 'linear-gradient(135deg, rgba(255, 123, 0, 1) 0%, rgba(255, 123, 0, 0) 100%)',
                backgroundColor: 'transparent'
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

