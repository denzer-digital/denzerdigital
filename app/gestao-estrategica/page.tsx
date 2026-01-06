"use client";

import { useLayoutEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { 
  ArrowRight, 
  CheckCircle2, 
  Compass,
  Target, 
  Cpu, 
  Code2, 
  BarChart3, 
  PieChart, 
  Zap, 
  ShoppingCart,
  LayoutDashboard,
  Users,
  Briefcase,
  Globe
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useContactDialog } from "@/contexts/ContactDialogContext";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const ContactFormDialog = dynamic(() => import("@/components/ContactFormDialog"), {
  ssr: false,
});

export default function GestaoDigital360Page() {
  const { openDialog } = useContactDialog();

  // Scroll animations
  const heroSection = useScrollAnimation();
  const problemSection = useScrollAnimation();
  const ecosystemSection = useScrollAnimation();
  const deliverablesSection = useScrollAnimation();
  const ctaSection = useScrollAnimation();

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

  const services = [
    {
      category: "Growth & Performance",
      items: [
        {
          title: "Estratégia de Crescimento",
          icon: Target,
          desc: "Roadmap de 12 meses com metas claras, KPIs e planos de ação mensuráveis."
        },
        {
          title: "Otimização de Performance",
          icon: Zap,
          desc: "Ajustes contínuos em campanhas, funis e conversões baseados em dados reais."
        }
      ]
    },
    {
      category: "Operações & Automação",
      items: [
        {
          title: "Automação de Processos",
          icon: Cpu,
          desc: "Integração de sistemas, workflows automatizados e redução de tarefas manuais."
        },
        {
          title: "Gestão de Operações",
          icon: LayoutDashboard,
          desc: "Visão unificada de toda a operação digital em dashboards personalizados."
        }
      ]
    },
    {
      category: "Dados & Inteligência",
      items: [
        {
          title: "Business Intelligence",
          icon: BarChart3,
          desc: "Relatórios executivos, análises preditivas e insights acionáveis."
        },
        {
          title: "Tracking & Atribuição",
          icon: PieChart,
          desc: "Rastreamento completo de conversões com atribuição multi-canal."
        }
      ]
    },
    {
      category: "E-commerce & Vendas",
      items: [
        {
          title: "Gestão de E-commerce",
          icon: ShoppingCart,
          desc: "Otimização de lojas virtuais, gestão de estoque e experiência do cliente."
        },
        {
          title: "CRM & Relacionamento",
          icon: Users,
          desc: "Gestão de leads, pipeline de vendas e nutrição automatizada."
        }
      ]
    }
  ];

  const deliverables = [
    {
      title: "Diagnóstico Completo",
      icon: Compass,
      desc: "Análise profunda da operação atual, identificação de gargalos e oportunidades."
    },
    {
      title: "Roadmap Estratégico",
      icon: Target,
      desc: "Plano de ação de 12 meses com entregas mensais e metas claras."
    },
    {
      title: "Dashboard Executivo",
      icon: LayoutDashboard,
      desc: "Visão unificada de todos os KPIs e métricas em tempo real."
    },
    {
      title: "Implementação",
      icon: Code2,
      desc: "Setup completo de ferramentas, integrações e automações."
    },
    {
      title: "Acompanhamento Mensal",
      icon: BarChart3,
      desc: "Revisões estratégicas, ajustes e otimizações contínuas."
    },
    {
      title: "Suporte Dedicado",
      icon: Briefcase,
      desc: "Time especializado disponível para suporte e evolução do ecossistema."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero Section */}
      <section ref={heroSection.ref} className={`relative py-24 md:py-32 px-4 bg-gradient-to-b from-primary/5 via-background to-background scroll-fade-in ${heroSection.isVisible ? 'visible' : ''}`}>
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Gestão Estratégica do <span className="text-primary">Ecossistema Digital</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto">
              Unificamos IA, tracking e automações em um ecossistema guiado por dados. Resultado: decisões mais rápidas, planos de ação claros, processos mais eficientes e vendas otimizadas de ponta a ponta.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              onClick={() => openDialog("form-gestao")}
              className="text-lg px-8 py-6"
            >
              Conhecer a Gestão 360
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section ref={problemSection.ref} className={`py-24 px-4 bg-secondary/30 scroll-fade-in ${problemSection.isVisible ? 'visible' : ''}`}>
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Quando ferramentas não se falam, <span className="text-primary">a operação vira caos</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Você tem dados em 5 lugares diferentes, processos manuais que consomem horas e decisões baseadas em "achismo". Sem uma visão unificada, é impossível escalar com confiança.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="text-lg font-bold mb-2">Dados Fragmentados</h3>
              <p className="text-sm text-muted-foreground">
                Informações espalhadas em múltiplas plataformas sem conexão entre elas.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="text-lg font-bold mb-2">Processos Manuais</h3>
              <p className="text-sm text-muted-foreground">
                Tarefas repetitivas que consomem tempo da equipe e geram erros.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                <Compass className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="text-lg font-bold mb-2">Falta de Direção</h3>
              <p className="text-sm text-muted-foreground">
                Decisões tomadas sem dados consolidados e sem visão estratégica clara.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section ref={ecosystemSection.ref} className={`py-24 px-4 bg-background scroll-fade-in ${ecosystemSection.isVisible ? 'visible' : ''}`}>
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Um <span className="text-primary">ecossistema integrado</span> que funciona como um só
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Conectamos todas as peças: IA, tracking, automações e estratégia. Tudo em um único lugar, com visão unificada e ações coordenadas.
            </p>
          </div>

          <div className="space-y-12">
            {services.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h3 className="text-xl font-bold mb-6 text-primary">{category.category}</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {category.items.map((item, itemIndex) => {
                    const Icon = item.icon;
                    return (
                      <div key={itemIndex} className="bg-card border border-border rounded-xl p-6">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables Section */}
      <section ref={deliverablesSection.ref} className={`py-24 px-4 bg-secondary/30 scroll-fade-in ${deliverablesSection.isVisible ? 'visible' : ''}`}>
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              O que você <span className="text-primary">recebe</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Entregas claras e mensuráveis em cada etapa do processo.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deliverables.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="bg-card border border-border rounded-xl p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaSection.ref} className={`py-24 px-4 bg-gradient-to-b from-background to-secondary/30 scroll-fade-in ${ctaSection.isVisible ? 'visible' : ''}`}>
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Transforme sua operação digital em um <span className="text-primary">ecossistema inteligente</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Agende uma sessão estratégica. Vamos desenhar o plano de crescimento da sua empresa para os próximos 12 meses.
          </p>
          
          <Button 
            size="lg"
            onClick={() => openDialog("form-gestao")}
            className="text-xl px-10 py-7 bg-accent hover:bg-accent/90 hover:shadow-lg hover:scale-105 transition-all duration-300 group"
          >
            Agendar Sessão Estratégica
            <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      <Footer />
      <ContactFormDialog />
    </div>
  );
}

