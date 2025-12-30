"use client";

import { useLayoutEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useContactDialog } from "@/contexts/ContactDialogContext";

const ContactFormDialog = dynamic(() => import("@/components/ContactFormDialog"), {
  ssr: false,
});

const benefits = [
  "Integração completa de plataformas (CRM, ERP, E-commerce)",
  "Automação de processos repetitivos e manuais",
  "Sincronização de dados em tempo real",
  "Redução de erros operacionais",
  "Fluxos inteligentes baseados em dados",
  "Otimização de tempo e recursos",
];

const featureCards = [
  {
    title: "Integração de Sistemas",
    description: "Conectamos todas as suas ferramentas em um único ecossistema sincronizado, eliminando silos de dados e trabalho manual.",
  },
  {
    title: "Automação Inteligente",
    description: "Processos automatizados que aprendem com seus dados, otimizando operações e reduzindo erros humanos.",
  },
  {
    title: "Fluxos Personalizados",
    description: "Criamos automações sob medida para seu negócio, desde captação de leads até pós-venda e gestão de estoque.",
  },
];

export default function AutomacaoIntegracoesPage() {
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
            <div 
              className="flex h-20 w-20 items-center justify-center rounded-2xl"
              style={{ backgroundImage: "linear-gradient(135deg, #007BFF 0%, #FF7B00 100%)" }}
            >
              <Image 
                src="/assets/icon-automacao.svg" 
                alt="Automação e Integrações" 
                width={48} 
                height={48} 
                className="w-12 h-12"
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Automação e Integrações Inteligentes</h1>
            <p className="text-lg text-muted-foreground">
              Otimize processos e reduza erros com automação baseada em dados
            </p>
            <p className="max-w-2xl text-muted-foreground">
              A Denzer Digital integra todas as suas plataformas em um único fluxo inteligente, gerando mais inteligência para o seu ecossistema e garantindo operações mais ágeis e precisas.
            </p>
            <Button 
              size="lg" 
              className="mt-4 text-white hover:opacity-90 border-0"
              style={{
                background: 'linear-gradient(135deg, #007BFF 0%, #FF7B00 100%)',
                backgroundColor: 'transparent'
              }}
              onClick={openDialog}
            >
              Quero automatizar meu negócio
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
              Pronto para automatizar seus processos?
            </h3>
            <p className="text-muted-foreground mb-6">
              Converse com nossos especialistas e descubra como podemos integrar seu ecossistema digital.
            </p>
            <Button 
              size="lg" 
              className="text-white hover:opacity-90 border-0" 
              style={{
                background: 'linear-gradient(135deg, #007BFF 0%, #FF7B00 100%)',
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

