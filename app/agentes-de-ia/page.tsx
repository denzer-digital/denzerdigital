"use client";

import Link from "next/link";
import { Bot, ArrowLeft, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

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
  return (
    <div className="min-h-screen bg-background text-foreground">
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
              <Bot className="h-10 w-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Agentes de IA</h1>
            <p className="text-lg text-muted-foreground">
              Automação inteligente para atendimento e vendas
            </p>
            <p className="max-w-2xl text-muted-foreground">
              Transforme a experiência do seu cliente com agentes de IA que entendem, respondem e vendem 24/7.
            </p>
            <Button size="lg" className="mt-2">
              Testar Agora
            </Button>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="container mx-auto px-4 py-16 space-y-10">
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
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-background py-14">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl rounded-3xl border border-primary/30 bg-primary/10 px-8 py-10 text-center shadow-lg">
            <h3 className="text-2xl md:text-3xl font-semibold mb-3">
              Pronto para transformar seu negócio?
            </h3>
            <p className="text-muted-foreground mb-6">
              Converse com nossos especialistas e descubra como podemos ajudar.
            </p>
            <Button size="lg">Falar com Especialista</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

