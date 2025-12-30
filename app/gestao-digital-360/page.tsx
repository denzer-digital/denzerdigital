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
      icon: <Target className="w-6 h-6" />,
      items: ["Gestão de Tráfego (Ads)", "Estratégia de Lançamento", "SEO Técnico", "Copywriting de Conversão"]
    },
    {
      category: "Engenharia & Tech",
      icon: <Code2 className="w-6 h-6" />,
      items: ["Lojas Shopify & VTEX", "Landing Pages (WordPress)", "Desenvolvimento Web", "Sistemas Customizados"]
    },
    {
      category: "Inteligência de Dados",
      icon: <BarChart3 className="w-6 h-6" />,
      items: ["Tracking Server-Side", "Dashboards de BI", "Google Analytics 4", "Auditoria de Métricas"]
    },
    {
      category: "Automação & IA",
      icon: <Cpu className="w-6 h-6" />,
      items: ["Agentes de IA", "Integração de CRM", "Automação de Processos", "Chatbots Inteligentes"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* --- HERO SECTION --- */}
      <section 
        ref={heroSection.ref}
        className={`relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden scroll-fade-in ${heroSection.isVisible ? 'visible' : ''}`}
      >
        {/* Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]"></div>
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          {/* Link Voltar */}
          <div className="mb-8 flex items-center justify-center gap-2">
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
              <ArrowRight className="h-4 w-4 rotate-180" />
              Voltar
            </Link>
          </div>

          {/* Badge Card */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-accent/30 text-accent text-xs font-semibold mb-8 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            Gestão Estratégica Integrada
          </div>

          {/* Ícone */}
          <div className="flex justify-center mb-8">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-glow">
              <Compass className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Título */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 max-w-5xl mx-auto">
            Chega de agências fragmentadas. <span className="text-accent">Unificamos seu crescimento.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
            Orquestramos Tráfego, Tecnologia, Dados e IA em uma única estratégia. Transformamos operações isoladas em um Ecossistema Digital de Alta Performance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              onClick={() => openDialog()}
              className="text-lg px-8 py-6"
            >
              Conhecer a Gestão 360
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <p className="text-xs text-muted-foreground mt-2 sm:mt-0">
              Para empresas que buscam escala estruturada.
            </p>
          </div>
        </div>
      </section>

      {/* --- PROBLEM SECTION (Fragmentation) --- */}
      <section 
        id="problema"
        ref={problemSection.ref}
        className={`py-20 bg-secondary/30 border-y border-border scroll-fade-in ${problemSection.isVisible ? 'visible' : ''}`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className={`space-y-6 scroll-fade-in-left ${problemSection.isVisible ? 'visible' : ''}`}>
                <h2 className="text-3xl md:text-4xl font-bold">
                  O "Frankenstein Digital" está <br />
                  <span className="text-destructive border-b-2 border-destructive">matando sua margem.</span>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Você contrata um gestor de tráfego, uma agência de dev e um consultor de dados. Ninguém se fala. O tráfego traz leads que o site não converte, e o CRM não registra a venda.
                </p>
                
                <div className="space-y-4">
                  <div className={`flex items-start gap-4 p-4 bg-card border border-border rounded-lg scroll-fade-in ${problemSection.isVisible ? 'visible' : ''}`}>
                    <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                      <Zap className="w-5 h-5 text-destructive" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">Desconexão Estratégica</h4>
                      <p className="text-sm text-muted-foreground">Campanhas rodando para páginas lentas ou com tracking quebrado.</p>
                    </div>
                  </div>
                  <div className={`flex items-start gap-4 p-4 bg-card border border-border rounded-lg scroll-fade-in ${problemSection.isVisible ? 'visible scroll-delay-100' : ''}`}>
                    <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                      <PieChart className="w-5 h-5 text-destructive" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">Dados Isolados</h4>
                      <p className="text-sm text-muted-foreground">O Marketing vê um número, o Financeiro vê outro. Ninguém sabe o ROAS real.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual: The Unified Core */}
              <div className={`relative scroll-fade-in-right ${problemSection.isVisible ? 'visible' : ''}`}>
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent blur-3xl rounded-full"></div>
                <div className="relative bg-card border border-border rounded-2xl p-8 shadow-lg">
                  <div className="text-center mb-8">
                    <span className="text-xs font-mono text-accent uppercase tracking-widest">O Método Denzer 360</span>
                    <h3 className="text-2xl font-bold text-foreground mt-2">Centralização de Inteligência</h3>
                  </div>

                  {/* Concentric Circles Visual */}
                  <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
                    {/* Outer Ring: Channels */}
                    <div className="absolute inset-0 border border-border rounded-full animate-[spin_10s_linear_infinite]">
                       <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-card px-2 text-xs text-muted-foreground">Ads</div>
                       <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-card px-2 text-xs text-muted-foreground">CRM</div>
                       <div className="absolute top-1/2 -right-3 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">Site</div>
                       <div className="absolute top-1/2 -left-3 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">Dados</div>
                    </div>
                    
                    {/* Middle Ring: Integration */}
                    <div className="absolute inset-4 border border-border/60 rounded-full border-dashed animate-[spin_15s_linear_infinite_reverse]"></div>

                    {/* Core */}
                    <div className="w-24 h-24 bg-gradient-to-br from-accent to-accent-glow rounded-full flex items-center justify-center shadow-[0_0_30px_hsl(var(--accent)/0.5)] z-10">
                      <span className="font-bold text-white text-3xl">D</span>
                    </div>
                    
                    {/* Connecting Lines */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-[1px] h-full bg-border/50 absolute"></div>
                      <div className="h-[1px] w-full bg-border/50 absolute"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ECOSYSTEM GRID (Services) --- */}
      <section 
        id="ecossistema"
        ref={ecosystemSection.ref}
        className={`py-24 relative overflow-hidden scroll-fade-in ${ecosystemSection.isVisible ? 'visible' : ''}`}
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold">
                Um único parceiro. <br/>
                <span className="text-gradient-accent">Todas as soluções.</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Atuamos como seu braço direito de crescimento, fornecendo a tecnologia e a estratégia que faltam na sua operação.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, idx) => (
                <div 
                  key={idx} 
                  className={`group bg-card border border-border rounded-2xl p-8 hover:border-accent/50 hover:-translate-y-2 transition-all duration-300 shadow-lg scroll-fade-in ${ecosystemSection.isVisible ? 'visible' : ''}`}
                  style={{ transitionDelay: `${idx * 0.15}s` }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors text-accent">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold">{service.category}</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {service.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-border group-hover:text-accent transition-colors" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- DELIVERABLES (Specifics) --- */}
      <section 
        id="entregaveis"
        ref={deliverablesSection.ref}
        className={`py-20 bg-secondary/30 border-y border-border scroll-fade-in ${deliverablesSection.isVisible ? 'visible' : ''}`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold">Entregáveis de Alto Nível</h2>
              <p className="text-muted-foreground">Não vendemos "horas", vendemos ativos digitais prontos.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
               {/* Card 1 */}
               <div className={`bg-card p-6 rounded-xl border border-border hover:-translate-y-2 transition-transform scroll-fade-in ${deliverablesSection.isVisible ? 'visible' : ''}`}>
                  <ShoppingCart className="w-8 h-8 text-primary mb-4" />
                  <h4 className="font-bold mb-2">E-commerce High-End</h4>
                  <p className="text-sm text-muted-foreground">Desenvolvimento de lojas Shopify e VTEX focadas em conversão, velocidade e UX mobile-first.</p>
               </div>
               {/* Card 2 */}
               <div className={`bg-card p-6 rounded-xl border border-border hover:-translate-y-2 transition-transform scroll-fade-in ${deliverablesSection.isVisible ? 'visible scroll-delay-100' : ''}`}>
                  <LayoutDashboard className="w-8 h-8 text-accent mb-4" />
                  <h4 className="font-bold mb-2">Landing Pages de Performance</h4>
                  <p className="text-sm text-muted-foreground">Páginas de vendas em WordPress/Elementor desenhadas especificamente para receber tráfego pago.</p>
               </div>
               {/* Card 3 */}
               <div className={`bg-card p-6 rounded-xl border border-border hover:-translate-y-2 transition-transform scroll-fade-in ${deliverablesSection.isVisible ? 'visible scroll-delay-200' : ''}`}>
                  <Users className="w-8 h-8 text-accent mb-4" />
                  <h4 className="font-bold mb-2">Growth Partner</h4>
                  <p className="text-sm text-muted-foreground">Reuniões estratégicas quinzenais para análise de P&L, CAC, LTV e definição de metas de escala.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA FINAL --- */}
      <section 
        id="cta-final"
        ref={ctaSection.ref}
        className={`py-24 bg-gradient-to-b from-secondary/30 to-background text-center px-4 border-t border-border relative scroll-fade-in ${ctaSection.isVisible ? 'visible' : ''}`}
      >
        <div className="max-w-4xl mx-auto relative z-10 space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Pronto para profissionalizar <br/> 
            <span className="text-gradient-accent">seu digital?</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Agende uma sessão estratégica. Vamos desenhar o plano de crescimento da sua empresa para os próximos 12 meses.
          </p>
          
          <Button 
            size="lg"
            onClick={() => openDialog()}
            className="text-xl px-10 py-7 bg-accent hover:bg-accent/90 hover:shadow-lg hover:scale-105 transition-all duration-300 group"
          >
            Agendar Sessão Estratégica
            <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <div className="flex flex-wrap justify-center gap-6 text-muted-foreground text-sm pt-4">
             <div className="flex items-center gap-2">
               <Briefcase className="w-4 h-4" /> Atendimento Executivo
             </div>
             <div className="flex items-center gap-2">
               <Globe className="w-4 h-4" /> Suporte Global
             </div>
          </div>
        </div>
      </section>

      <Footer />
      <ContactFormDialog />
    </div>
  );
}
