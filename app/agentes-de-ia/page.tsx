"use client";

import { useLayoutEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useContactDialog } from "@/contexts/ContactDialogContext";

const ContactFormDialog = dynamic(() => import("@/components/ContactFormDialog"), {
  ssr: false,
});

const benefits = [
  "Atendimento automatizado via WhatsApp",
  "Integração com site e redes sociais",
  "Respostas personalizadas e contextuais",
  "Aprendizado contínuo com cada interação",
  "Qualificação automática de leads",
  "Transferência inteligente para humanos",
];

const featureCards = [
  {
    title: "WhatsApp Business",
    description: "Atendimento completo via WhatsApp com respostas instantâneas e naturais.",
  },
  {
    title: "Multi-canal",
    description: "Um agente, múltiplos canais: site, Instagram, Facebook e mais.",
  },
  {
    title: "IA Conversacional",
    description: "Entende intenção, contexto e mantém conversas naturais com seus clientes.",
  },
];

export default function AgentesDeIaPage() {
  const { openDialog } = useContactDialog();
  const router = useRouter();
  
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
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl" style={{ backgroundImage: "linear-gradient(135deg, rgba(0, 123, 255, 1) 0%, rgba(0, 123, 255, 0) 100%)" }}>
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
                <path d="M32.0007 21.3332V10.6665H21.334" stroke="white" strokeWidth="5.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M47.9994 21.3335H15.9993C13.0538 21.3335 10.666 23.7213 10.666 26.6668V48.0002C10.666 50.9457 13.0538 53.3335 15.9993 53.3335H47.9994C50.9449 53.3335 53.3327 50.9457 53.3327 48.0002V26.6668C53.3327 23.7213 50.9449 21.3335 47.9994 21.3335Z" stroke="white" strokeWidth="5.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5.33398 37.3335H10.6673" stroke="white" strokeWidth="5.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M53.334 37.3335H58.6673" stroke="white" strokeWidth="5.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M40 34.6665V39.9998" stroke="white" strokeWidth="5.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M24 34.6665V39.9998" stroke="white" strokeWidth="5.33333" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Agentes de IA</h1>
            <p className="text-lg text-muted-foreground">
              Automação inteligente para atendimento e vendas
            </p>
            <p className="max-w-2xl text-muted-foreground">
              Transforme a experiência do seu cliente com agentes de IA que entendem, respondem e vendem 24/7.
            </p>
            <Button 
              size="lg" 
              className="mt-4"
              onClick={() => router.push('/#experimente-ia')}
            >
              Testar Agora
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
            <Button size="lg" onClick={openDialog}>Falar com Especialista</Button>
          </div>
        </div>
      </section>

      <Footer />
      <ContactFormDialog />
    </div>
  );
}

