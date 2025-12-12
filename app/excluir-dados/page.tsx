"use client";

import { useLayoutEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const steps = [
  "Nome completo",
  "Telefone de cadastro",
  "Descrição da solicitação",
];

export default function ExcluirDadosPage() {
  // Garante que a página comece no topo
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-primary/10 via-background to-background pt-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute right-0 top-12 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-4xl space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
              Solicitação de exclusão de dados
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Solicitação de <span className="text-gradient-primary">Exclusão de Dados</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Denzer Digital — conformidade com LGPD e políticas da Meta. Envie sua solicitação para
              exclusão dos dados tratados.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <a href="mailto:privacidade@denzerdigital.com.br">Enviar solicitação por e-mail</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary/40 hover:border-primary">
                <Link href="/">Voltar ao site</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-16">
        <div className="rounded-2xl border border-border bg-card/80 p-8 shadow-lg shadow-primary/5 backdrop-blur space-y-6">
          <h2 className="text-2xl font-semibold">Como solicitar a exclusão</h2>
          <p className="text-muted-foreground leading-relaxed">
            Para solicitar a exclusão de dados tratados pela Denzer Digital, conforme a LGPD e as políticas
            da Meta, envie um e-mail para <a className="text-primary hover:underline" href="mailto:privacidade@denzerdigital.com.br">privacidade@denzerdigital.com.br</a> informando:
          </p>
          <ul className="space-y-3 text-muted-foreground leading-relaxed">
            {steps.map((item, index) => (
              <li key={index} className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary/70 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground leading-relaxed">
            A exclusão será processada em até 7 dias úteis, exceto quando houver obrigação legal de retenção.
            A Denzer Digital não armazena dados desnecessários e não utiliza informações fora do escopo contratado.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

