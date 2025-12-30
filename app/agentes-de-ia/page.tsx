"use client";

import { useLayoutEffect, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { 
  ArrowRight, 
  Bot, 
  MessageSquare, 
  Workflow, 
  Database, 
  Zap, 
  ShieldCheck, 
  Clock,
  Users,
  TrendingUp,
  ShoppingBag,
  Building2,
  Briefcase,
  BrainCircuit,
  Sparkles
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useContactDialog } from "@/contexts/ContactDialogContext";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const ContactFormDialog = dynamic(() => import("@/components/ContactFormDialog"), {
  ssr: false,
});

const services = [
  {
    title: "Agente de Atendimento & Vendas",
    icon: MessageSquare,
    desc: "Não responde apenas dúvidas. Ele consulta estoque, rastreia pedidos e envia link de pagamento no WhatsApp.",
    features: ["Disponibilidade 24/7", "Recuperação de Carrinho", "Qualificação de Leads"]
  },
  {
    title: "Agente de Operações (Backoffice)",
    icon: Workflow,
    desc: "Conecta sistemas que não se falam. Emite notas fiscais, avisa a logística e atualiza o CRM automaticamente.",
    features: ["Automação de Tarefas Repetitivas", "Integração ERP <-> CRM", "Zero Erro Humano"]
  },
  {
    title: "Agente de Business Intelligence",
    icon: Database,
    desc: "O fim da cegueira gerencial. Pergunte ao WhatsApp: 'Qual foi o lucro líquido ontem?' e receba um relatório.",
    features: ["Análise de Dados em Tempo Real", "Relatórios via Chat", "Previsão de Demanda"]
  }
];

const useCases = [
  {
    icon: ShoppingBag,
    title: "E-commerce",
    color: "pink",
    desc: "Recuperação de carrinho abandonado humanizada via WhatsApp com oferta de cupom dinâmico baseado no histórico."
  },
  {
    icon: Building2,
    title: "Imobiliárias",
    color: "cyan",
    desc: "Agente que qualifica o lead, verifica agenda dos corretores e marca a visita automaticamente no Google Calendar."
  },
  {
    icon: Briefcase,
    title: "Empresas B2B",
    color: "orange",
    desc: "Leitura automática de e-mails de fornecedores, extração de dados de faturas em PDF e input no financeiro."
  }
];

const features = [
  {
    icon: Database,
    title: "Treinamento RAG (Base de Conhecimento)",
    desc: "A IA não alucina. Nós treinamos o modelo com seus PDFs, manuais e histórico. Ela fala com o tom de voz da sua marca."
  },
  {
    icon: Bot,
    title: "Multimodalidade",
    desc: "Nossos agentes podem \"ver\" comprovantes de pagamento (imagens) e \"ouvir\" áudios no WhatsApp, transcrevendo e agindo."
  },
  {
    icon: ShieldCheck,
    title: "Segurança de Dados",
    desc: "Ambiente seguro e compliance com LGPD. Seus dados estratégicos não vazam para modelos públicos."
  }
];

const integrations = [
  'Salesforce', 'RD Station', 'HubSpot', 'Pipedrive', 
  'Shopify', 'VTEX', 'WhatsApp API', 'Slack', 
  'Google Sheets', 'BigQuery'
];

export default function AgentesDeIaPage() {
  const { openDialog } = useContactDialog();
  
  // Scroll animations
  const heroAnimation = useScrollAnimation();
  const painAnimation = useScrollAnimation();
  const solutionAnimation = useScrollAnimation();
  const integrationsAnimation = useScrollAnimation();
  const featuresAnimation = useScrollAnimation();
  const useCasesAnimation = useScrollAnimation();
  const ctaAnimation = useScrollAnimation();

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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px]"></div>
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="mb-8 flex items-center justify-center gap-2">
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
              <ArrowRight className="h-4 w-4 rotate-180" />
              Voltar
            </Link>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-primary/30 text-primary text-xs font-semibold mb-8 uppercase tracking-wider animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Força de Trabalho Digital
          </div>

          <div className="flex justify-center mb-8">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-glow">
              <Bot className="w-12 h-12 text-white" />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 max-w-5xl mx-auto">
            Contrate a equipe que <span className="text-primary">nunca dorme</span> e não erra.
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
            Automatize Atendimento, Vendas e Backoffice com o Ecossistema de IA da Denzer Digital. Transforme sua empresa em uma máquina autônoma de crescimento por uma fração do custo humano.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              onClick={openDialog}
              className="text-lg px-8 py-6 group"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Automatizar Minha Empresa
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-xs text-muted-foreground mt-2 sm:mt-0">
              Integração total com CRM, ERP e WhatsApp.
            </p>
          </div>
        </div>
      </section>

      {/* --- PAIN SECTION (The Ceiling) --- */}
      <section id="problema" className="py-20 bg-secondary/30 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div ref={painAnimation.ref} className={`w-full md:w-1/2 scroll-fade-in-left ${painAnimation.isVisible ? 'visible' : ''}`}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                O gargalo do seu crescimento <br />
                <span className="text-destructive border-b-2 border-destructive">é operacional.</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                No modelo tradicional, crescer significa contratar mais pessoas, inchar a folha de pagamento e aumentar a complexidade. Enquanto você dorme, seu concorrente automatizado está atendendo.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3 bg-destructive/5 p-4 rounded-lg border border-destructive/20">
                  <Clock className="w-6 h-6 text-destructive shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-destructive">Suporte lento que perde vendas</h3>
                    <p className="text-sm text-muted-foreground">Clientes não esperam. A demora gera frustração e abandono.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-destructive/5 p-4 rounded-lg border border-destructive/20">
                  <Users className="w-6 h-6 text-destructive shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-destructive">Equipe de vendas presa em planilhas</h3>
                    <p className="text-sm text-muted-foreground">Tempo valioso desperdiçado em tarefas repetitivas.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-destructive/5 p-4 rounded-lg border border-destructive/20">
                  <TrendingUp className="w-6 h-6 text-destructive shrink-0 mt-1 rotate-180" />
                  <div>
                    <h3 className="font-bold text-destructive">Decisões baseadas em 'achismo'</h3>
                    <p className="text-sm text-muted-foreground">Falta de dados em tempo real para decisões estratégicas.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Comparison */}
            <div className={`w-full md:w-1/2 relative scroll-fade-in-right ${painAnimation.isVisible ? 'visible scroll-delay-200' : ''}`}>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent blur-3xl rounded-full"></div>
              <div className="bg-card border border-border rounded-xl p-6 relative overflow-hidden shadow-2xl">
                <div className="flex justify-between items-center mb-4 border-b border-border pb-4">
                  <span className="text-xs font-mono text-muted-foreground">COMPARATIVO DE EFICIÊNCIA</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <div className="w-3 h-3 rounded-full bg-secondary"></div>
                    <div className="w-3 h-3 rounded-full bg-secondary"></div>
                  </div>
                </div>
                
                {/* Comparison Bars */}
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Modelo Tradicional (Humano)</span>
                      <span className="text-destructive">Limitado (8h/dia)</span>
                    </div>
                    <div className="h-3 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full w-[40%] bg-destructive/50"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-foreground font-bold flex items-center gap-2">
                        <Zap className="w-3 h-3" /> Modelo Denzer AI
                      </span>
                      <span className="text-primary">Escalável (24/7)</span>
                    </div>
                    <div className="h-3 bg-secondary rounded-full overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent w-full animate-pulse"></div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border flex justify-between items-center">
                  <div>
                    <p className="text-3xl font-bold text-foreground">-60%</p>
                    <p className="text-xs text-muted-foreground uppercase">Custo Operacional</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-foreground">Zero</p>
                    <p className="text-xs text-muted-foreground uppercase">Erros Manuais</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SOLUTION SECTION (The Agents) --- */}
      <section id="solucoes" className="py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div ref={solutionAnimation.ref} className={`text-center mb-16 scroll-fade-in ${solutionAnimation.isVisible ? 'visible' : ''}`}>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Não são apenas "Chatbots". <br/>
              <span className="text-primary">São Funcionários Digitais.</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nós criamos e treinamos Agentes de IA que se integram aos seus sistemas atuais para executar funções complexas autonomamente.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div 
                key={idx} 
                className={`bg-card border border-border rounded-2xl p-8 hover:border-primary/50 hover:-translate-y-2 transition-all duration-300 group shadow-lg scroll-fade-in ${solutionAnimation.isVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${idx * 0.1}s` }}
              >
                <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed min-h-[80px]">
                  {service.desc}
                </p>
                <ul className="space-y-3">
                  {service.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- INTEGRATIONS SECTION --- */}
      <section className="py-20 bg-secondary/30 border-y border-border">
        <div className="container mx-auto px-4">
          <div ref={integrationsAnimation.ref} className={`text-center mb-12 scroll-fade-in ${integrationsAnimation.isVisible ? 'visible' : ''}`}>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Ecossistema Conectado</h2>
            <p className="text-muted-foreground">A IA conecta a inteligência aos seus dados existentes.</p>
          </div>

          <div className={`flex flex-wrap justify-center gap-4 md:gap-6 max-w-4xl mx-auto opacity-90 scroll-fade-in ${integrationsAnimation.isVisible ? 'visible scroll-delay-200' : ''}`}>
            {integrations.map((tech, i) => (
              <div key={i} className="px-5 py-2 rounded-full bg-card border border-border text-muted-foreground font-mono text-sm hover:border-primary/50 hover:text-foreground transition-colors cursor-default">
                {tech}
              </div>
            ))}
          </div>
          
          <div className="mt-12 flex justify-center">
             <div className="relative">
                <div className="absolute inset-0 bg-primary blur-2xl opacity-20 rounded-full"></div>
                <BrainCircuit className="w-16 h-16 text-primary relative z-10 animate-pulse" />
             </div>
          </div>
        </div>
      </section>

      {/* --- WHY US SECTION --- */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div ref={featuresAnimation.ref} className={`scroll-fade-in-left ${featuresAnimation.isVisible ? 'visible' : ''}`}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Por que escolher a <br />
                <span className="text-primary">Engenharia de IA?</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Muitos vendem ferramentas genéricas. Nós vendemos sistemas personalizados para sua realidade.
              </p>

              <div className="space-y-8">
                {features.map((feat, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="mt-1">
                      <feat.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-foreground">{feat.title}</h4>
                      <p className="text-muted-foreground text-sm mt-1">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Feature Card/Demo */}
            <div className={`bg-gradient-to-br from-primary/5 to-card border border-border rounded-2xl p-8 relative overflow-hidden group scroll-fade-in-right ${featuresAnimation.isVisible ? 'visible scroll-delay-200' : ''}`}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all"></div>
              
              <div className="space-y-4 text-sm relative z-10">
                <div className="bg-card/80 p-4 rounded-lg border-l-4 border-accent w-[90%] self-start">
                  <p className="text-accent text-xs mb-1">User (WhatsApp)</p>
                  <p className="text-foreground">Gostaria de saber o status do meu pedido #4920.</p>
                </div>

                <div className="bg-primary/10 p-4 rounded-lg border-l-4 border-primary w-[90%] ml-auto">
                  <div className="flex items-center gap-2 mb-2">
                    <Bot className="w-3 h-3 text-primary" />
                    <p className="text-primary text-xs">Denzer AI Agent</p>
                  </div>
                  <p className="text-foreground">Olá! Seu pedido #4920 já foi despachado. 🚚</p>
                  <p className="text-foreground mt-2">Código de rastreio: <span className="text-white font-bold bg-primary/20 px-1 rounded">BR123456789</span></p>
                  <p className="text-muted-foreground text-xs mt-2 italic flex items-center gap-1">
                    <Zap className="w-3 h-3" /> Consultou ERP em 0.4s
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- USE CASES SECTION --- */}
      <section id="casos" className="py-20 bg-secondary/30 border-y border-border">
        <div className="container mx-auto px-4">
          <h2 ref={useCasesAnimation.ref} className={`text-3xl font-bold text-center mb-12 scroll-fade-in ${useCasesAnimation.isVisible ? 'visible' : ''}`}>Transformando Setores</h2>
          
          <div className={`grid md:grid-cols-3 gap-6 scroll-fade-in ${useCasesAnimation.isVisible ? 'visible scroll-delay-200' : ''}`}>
            {useCases.map((useCase, idx) => (
              <div key={idx} className="p-6 bg-card border border-border rounded-xl hover:border-primary/30 transition-all duration-300 hover:scale-105">
                <useCase.icon className={`w-10 h-10 mb-4 ${
                  useCase.color === 'pink' ? 'text-pink-500' :
                  useCase.color === 'cyan' ? 'text-cyan-500' :
                  'text-orange-500'
                }`} />
                <h3 className="text-xl font-bold text-foreground mb-2">{useCase.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {useCase.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA FINAL --- */}
      <section id="cta-final" className="py-24 bg-gradient-to-b from-secondary/30 to-background text-center px-4 border-t border-border">
        <div ref={ctaAnimation.ref} className={`max-w-4xl mx-auto scroll-fade-in ${ctaAnimation.isVisible ? 'visible' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground tracking-tight">
            A IA não vai substituir empresas. <br/>
            <span className="text-primary">Vai substituir empresas que não usam IA.</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-10">
            Não compre uma ferramenta. Contrate uma transformação operacional.
          </p>
          
          <Button 
            size="lg"
            onClick={openDialog}
            className="text-lg px-10 py-6 mb-8 group"
          >
            Agendar Diagnóstico de IA
            <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <p className="text-muted-foreground text-sm">
            Consultoria Gratuita • Implementação Personalizada • Suporte Humano
          </p>
        </div>
      </section>

      <Footer />
      <ContactFormDialog />
    </div>
  );
}
