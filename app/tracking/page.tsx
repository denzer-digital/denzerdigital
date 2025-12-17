"use client";

import { useLayoutEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowLeft, CheckCircle2, BarChart3 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useContactDialog } from "@/contexts/ContactDialogContext";

const ContactFormDialog = dynamic(() => import("@/components/ContactFormDialog"), {
  ssr: false,
});

const benefits = [
  "Rastreamento completo de conversões e eventos",
  "Integração com GTM, GA4, Meta Ads e Google Ads",
  "Análise de jornada do cliente em múltiplos canais",
  "Relatórios personalizados e dashboards em tempo real",
  "Otimização contínua baseada em dados reais",
  "Conformidade com LGPD e privacidade de dados",
];

const featureCards = [
  {
    title: "Google Tag Manager (GTM)",
    description: "Configuração e gerenciamento centralizado de tags, eventos e conversões para máxima precisão no rastreamento.",
  },
  {
    title: "Google Analytics 4 (GA4)",
    description: "Implementação completa com eventos customizados, e-commerce tracking e análise de comportamento do usuário.",
  },
  {
    title: "Meta Ads Tracking",
    description: "Pixel do Facebook e Instagram configurado para rastrear conversões, otimizar campanhas e medir ROI real.",
  },
  {
    title: "Google Ads Tracking",
    description: "Integração com Google Ads para rastreamento de conversões, remarketing e otimização de campanhas de performance.",
  },
];

export default function TrackingPage() {
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
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl" style={{ backgroundImage: "linear-gradient(135deg, rgba(0, 123, 255, 1) 0%, rgba(0, 123, 255, 0) 100%)" }}>
              <BarChart3 className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Tracking e Analytics</h1>
            <p className="text-lg text-muted-foreground">
              Rastreamento completo e análise de dados
            </p>
            <p className="max-w-2xl text-muted-foreground">
              Implementação profissional de tracking via GTM, GA4, Meta Ads e Google Ads para medir, otimizar e escalar seus resultados.
            </p>
            <Button size="lg" className="mt-4" onClick={openDialog}>
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
            {benefits.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-xl border border-border bg-secondary/30 px-4 py-3"
              >
                <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm md:text-base text-foreground">{item}</span>
              </div>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {featureCards.map((card, index) => (
              <div
                key={index}
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
              Pronto para rastrear seus resultados?
            </h3>
            <p className="text-muted-foreground mb-6">
              Converse com nossos especialistas e descubra como podemos implementar o tracking completo para seu negócio.
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

