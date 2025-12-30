"use client";

import { useLayoutEffect, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { 
  ArrowRight, 
  CheckCircle2, 
  BarChart3,
  Server,
  ShieldCheck,
  Zap,
  Lock,
  Smartphone,
  AlertTriangle,
  Database,
  Globe,
  ShoppingBag,
  TrendingUp,
  Cpu,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Calculator,
  Loader2
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useContactDialog } from "@/contexts/ContactDialogContext";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const ContactFormDialog = dynamic(() => import("@/components/ContactFormDialog"), {
  ssr: false,
});

export default function TrackingPage() {
  const { openDialog } = useContactDialog();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll animations
  const problemSection = useScrollAnimation();
  const solutionSection = useScrollAnimation();
  const evolutionSection = useScrollAnimation();
  const ecosystemSection = useScrollAnimation();
  const benefitsSection = useScrollAnimation();
  const implementationSection = useScrollAnimation();
  const calculatorSection = useScrollAnimation();
  const faqSection = useScrollAnimation();
  const ctaSection = useScrollAnimation();

  // --- GEMINI AI STATE ---
  const [adSpend, setAdSpend] = useState("");
  const [roas, setRoas] = useState("");
  const [aiReport, setAiReport] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Scroll detection for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + (window.pageYOffset || window.scrollY || 0) - 80;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  // --- GEMINI API FUNCTION ---
  const analyzeImpact = async () => {
    if (!adSpend || !roas) return;

    setIsAnalyzing(true);
    setAiReport(null);
    setAiError(null);

    const apiKey = "AIzaSyBVu28B_7KH8e69UD9eDBPpjhDvl_tj0U0";
    const userQuery = `Atuo como estrategista da Denzer Digital. O cliente investe R$ ${adSpend} em anúncios e tem ROAS ${roas}.

    Contexto: Sem traqueamento Server-Side (apenas Pixel), ele perde cerca de 30% da atribuição das vendas devido ao iOS 14+.

    Gere um relatório curto, direto e visual ("estilo dashboard") usando EXATAMENTE este formato (mantenha os emojis):

    📊 *Faturamento Rastreado (Atual):* R$ [Calculado: Spend * ROAS]
    👻 *Faturamento Invisível (Não Atribuído):* R$ [Calculado: ~30% adicional que o pixel perdeu]
    🚀 *Potencial Real de Receita:* R$ [Soma dos dois acima]

    *Diagnóstico:*
    [Escreva apenas 2 ou 3 frases curtas e persuasivas alertando que ele está tomando decisões com dados incompletos (cegueira de dados) e como o Server-Side da Denzer traz essa receita de volta para o painel].
    `;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userQuery }] }],
          }),
        }
      );

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }

      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      setAiReport(text || null);

    } catch (error) {
      console.error("Erro na análise:", error);
      setAiError("Não foi possível gerar a análise no momento. Tente novamente em instantes.");
    } finally {
      setIsAnalyzing(false);
    }
  };

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
            Tecnologia Anti-Bloqueio iOS 14+
          </div>

          <div className="flex justify-center mb-8">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-glow">
              <BarChart3 className="w-12 h-12 text-white" />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 max-w-5xl mx-auto">
            Pare de pilotar suas campanhas <span className="text-primary">no escuro.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
            Recupere até <span className="text-foreground font-semibold">30% dos dados</span> perdidos. Implemente o Traqueamento Server-Side Avançado, aumente sua Nota de Atribuição e reduza seu CPA drasticamente.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              onClick={openDialog}
              className="text-lg px-8 py-6"
            >
              Blindar Meu Traqueamento
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <p className="text-xs text-muted-foreground mt-2 sm:mt-0">
              Compatível com Shopify, WordPress, VTEX, Yampi e Custom Code.
            </p>
          </div>
        </div>
      </section>

      {/* --- PROBLEM SECTION (The Blindness) --- */}
      <section id="problema" className="py-20 bg-secondary/30 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div ref={problemSection.ref} className={`w-full md:w-1/2 scroll-fade-in-left ${problemSection.isVisible ? 'visible' : ''}`}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                O Pixel do navegador <br />
                <span className="text-destructive border-b-2 border-destructive">não é mais suficiente.</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Você sente que o Gerenciador de Anúncios mostra menos vendas do que o seu caixa? Não é impressão sua.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3 bg-destructive/5 p-4 rounded-lg border border-destructive/20">
                  <AlertTriangle className="w-6 h-6 text-destructive shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-destructive">Bloqueio de Dados</h3>
                    <p className="text-sm text-muted-foreground">iOS 14 e AdBlockers bloqueiam scripts do navegador, cegando o algoritmo.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-destructive/5 p-4 rounded-lg border border-destructive/20">
                  <TrendingUp className="w-6 h-6 text-destructive shrink-0 mt-1 rotate-180" />
                  <div>
                    <h3 className="font-bold text-destructive">CPA Inflado</h3>
                    <p className="text-sm text-muted-foreground">Sem dados, o Facebook/Google não consegue otimizar, tornando o lead mais caro.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Comparison */}
            <div className={`w-full md:w-1/2 relative scroll-fade-in-right ${problemSection.isVisible ? 'visible scroll-delay-200' : ''}`}>
              <div className="absolute inset-0 bg-gradient-to-r from-destructive/10 to-transparent blur-3xl rounded-full"></div>
              <div className="bg-card border border-border rounded-xl p-6 relative overflow-hidden shadow-2xl">
                <div className="flex justify-between items-center mb-4 border-b border-border pb-4">
                  <span className="text-xs font-mono text-muted-foreground">STATUS DO TRAQUEAMENTO</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-destructive"></div>
                    <div className="w-3 h-3 rounded-full bg-secondary"></div>
                    <div className="w-3 h-3 rounded-full bg-secondary"></div>
                  </div>
                </div>
                
                {/* Simulated Graph */}
                <div className="space-y-4 font-mono text-sm">
                  <div className="flex justify-between items-center text-muted-foreground">
                    <span>Event: Purchase</span>
                    <span className="text-destructive font-bold">MISSING (-30%)</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                    <div className="bg-destructive w-[70%] h-full"></div>
                  </div>
                  
                  <div className="flex justify-between items-center text-muted-foreground mt-4">
                    <span>Match Quality</span>
                    <span className="text-accent font-bold">POOR (3/10)</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                    <div className="bg-accent w-[30%] h-full"></div>
                  </div>
                </div>
                
                <div className="mt-6 bg-secondary p-3 rounded text-center">
                  <p className="text-xs text-muted-foreground">TRAQUEAMENTO CLIENT-SIDE (PADRÃO)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SOLUTION SECTION (Server Side) --- */}
      <section id="solucao" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {/* Badge "A Solução" */}
          <div ref={solutionSection.ref} className={`flex justify-center mb-8 scroll-fade-in ${solutionSection.isVisible ? 'visible' : ''}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Image 
                src="/assets/icon-a-solucao.svg" 
                alt="A Solução" 
                width={16} 
                height={16}
                className="w-4 h-4"
              />
              <span className="text-primary text-sm font-medium">A Solução</span>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
              A Evolução: <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-purple-500">Traqueamento via API (Server-Side)</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Nós tiramos a inteligência do navegador do usuário e passamos para um servidor seguro.
            </p>
          </div>

          {/* Comparison Cards */}
          <div className={`grid md:grid-cols-2 gap-6 mb-16 max-w-6xl mx-auto scroll-fade-in ${solutionSection.isVisible ? 'visible scroll-delay-200' : ''}`}>
            {/* Left Card - Traqueamento Antigo */}
            <div className="bg-card/60 backdrop-blur-md border border-border rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-destructive/20 flex items-center justify-center">
                  <X className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Traqueamento Antigo</h3>
                  <p className="text-sm text-muted-foreground">Client-Side (Pixel)</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-destructive mt-2 shrink-0"></div>
                  <p className="text-sm text-muted-foreground">Bloqueado por iOS 14+</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-destructive mt-2 shrink-0"></div>
                  <p className="text-sm text-muted-foreground">AdBlockers interceptam dados</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-destructive mt-2 shrink-0"></div>
                  <p className="text-sm text-muted-foreground">Cookies de terceiros eliminados</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-destructive mt-2 shrink-0"></div>
                  <p className="text-sm text-muted-foreground">Dados perdidos permanentemente</p>
                </div>
              </div>

              <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4">
                <p className="text-sm font-medium text-destructive flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Perdendo 20-30% das conversões
                </p>
              </div>
            </div>

            {/* Right Card - Server-Side Denzer */}
            <div className="bg-card/60 backdrop-blur-md border border-primary/30 rounded-2xl p-8 shadow-[0_0_40px_rgba(60,131,246,0.3),0_0_80px_rgba(60,131,246,0.1)]">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Server-Side Denzer</h3>
                  <p className="text-sm text-primary">Traqueamento via API</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0"></div>
                  <p className="text-sm text-foreground">Imune a bloqueios do iOS</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0"></div>
                  <p className="text-sm text-foreground">Bypassa AdBlockers</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0"></div>
                  <p className="text-sm text-foreground">Dados de primeira parte</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0"></div>
                  <p className="text-sm text-foreground">100% das conversões rastreadas</p>
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                <p className="text-sm font-medium text-green-500 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Recuperando até 30% dos dados perdidos
                </p>
              </div>
            </div>
          </div>

          {/* Solution Components - Three Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Card 1 - GTM Server-Side */}
            <div ref={evolutionSection.ref} className={`bg-card/60 backdrop-blur-md border border-border rounded-2xl p-6 scroll-fade-in ${evolutionSection.isVisible ? 'visible' : ''}`}>
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Server className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-foreground leading-tight">
                Google Tag Manager Server-Side
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                O cérebro da operação em um container seguro.
              </p>
            </div>

            {/* Card 2 - CAPI */}
            <div className={`bg-card/60 backdrop-blur-md border border-border rounded-2xl p-6 scroll-fade-in ${evolutionSection.isVisible ? 'visible scroll-delay-200' : ''}`}>
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <ShieldCheck className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-foreground leading-tight">
                API de Conversões (CAPI) Meta & Google, GA4 e TikTok Events API
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Envio de dados à prova de bloqueios.
              </p>
            </div>

            {/* Card 3 - Data Layer */}
            <div className={`bg-card/60 backdrop-blur-md border border-border rounded-2xl p-6 scroll-fade-in ${evolutionSection.isVisible ? 'visible scroll-delay-400' : ''}`}>
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Database className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-foreground leading-tight">
                Data Layer Avançado
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Coleta de e-mail, telefone e ID do usuário de forma criptografada para Advanced Matching.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- AI IMPACT CALCULATOR SECTION (Gemini API) --- */}
      <section id="calculadora" className="py-20 bg-gradient-to-b from-background to-secondary/20 border-t border-border relative overflow-hidden">
        {/* Decorative background for AI section */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div ref={calculatorSection.ref} className={`text-center mb-10 scroll-fade-in ${calculatorSection.isVisible ? 'visible' : ''}`}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-semibold mb-4 uppercase tracking-wider">
              <Sparkles className="w-3 h-3" /> Powered by Gemini AI
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Calculadora de Receita Invisível</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Descubra quanto dinheiro você pode estar perdendo hoje. Nossa IA analisa seus dados e projeta o impacto do Server-Side no seu faturamento.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-card border border-border rounded-2xl p-6 md:p-10 shadow-2xl relative">
            <div className="grid md:grid-cols-2 gap-10">
              
              {/* Input Side */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-primary" />
                    Investimento Mensal (Ads)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">R$</span>
                    <input 
                      type="number" 
                      value={adSpend}
                      onChange={(e) => setAdSpend(e.target.value)}
                      placeholder="Ex: 50000" 
                      className="w-full bg-secondary border border-border text-foreground rounded-lg py-4 pl-12 pr-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    ROAS Atual (Retorno sobre Gasto)
                  </label>
                  <input 
                    type="number" 
                    value={roas}
                    onChange={(e) => setRoas(e.target.value)}
                    placeholder="Ex: 3.5" 
                    step="0.1"
                    className="w-full bg-secondary border border-border text-foreground rounded-lg py-4 px-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground"
                  />
                </div>

                <Button 
                  onClick={analyzeImpact}
                  disabled={!adSpend || !roas || isAnalyzing}
                  size="lg"
                  className="w-full"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analisando Dados...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Gerar Relatório de Inteligência
                    </>
                  )}
                </Button>
                <p className="text-xs text-muted-foreground text-center">A IA considerará uma perda média de 20-30% de atribuição.</p>
              </div>

              {/* Output Side */}
              <div className="bg-secondary rounded-xl p-6 border border-border flex flex-col min-h-[300px]">
                {!aiReport && !isAnalyzing && !aiError && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center text-muted-foreground">
                    <div className="w-16 h-16 bg-card rounded-full flex items-center justify-center mb-4">
                      <Cpu className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="max-w-[200px]">Preencha os dados ao lado para desbloquear a análise da IA.</p>
                  </div>
                )}

                {isAnalyzing && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="relative w-16 h-16">
                      <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <p className="text-primary font-mono text-sm animate-pulse">Consultando algoritmos...</p>
                  </div>
                )}

                {aiError && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center text-destructive">
                    <AlertTriangle className="w-10 h-10 mb-2" />
                    <p>{aiError}</p>
                  </div>
                )}

                {aiReport && (
                  <div className="flex flex-col h-full animate-fade-in-up">
                    <div className="flex items-center gap-2 mb-4 border-b border-border pb-3">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                      <span className="text-primary font-bold text-sm tracking-wide">DENZER AI INSIGHTS</span>
                    </div>
                    <div className="prose prose-invert prose-sm text-muted-foreground leading-relaxed flex-1 overflow-y-auto pr-2">
                       {/* Rendering markdown-like text simply */}
                       {aiReport.split('\n').map((line, i) => (
                         <p key={i} className="mb-2" dangerouslySetInnerHTML={{ 
                           __html: line.replace(/\*\*(.*?)\*\*/g, '<span class="text-foreground font-bold">$1</span>') 
                         }}></p>
                       ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-border">
                      <Button 
                        variant="ghost" 
                        onClick={openDialog} 
                        className="text-primary text-sm font-bold hover:text-primary/80 flex items-center gap-1 p-0 h-auto"
                      >
                        Agendar implementação <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ECOSYSTEM SECTION --- */}
      <section className="py-20 bg-secondary/30 overflow-hidden relative">
        <div className="container mx-auto px-4 relative z-10">
          <div ref={ecosystemSection.ref} className={`text-center mb-12 scroll-fade-in ${ecosystemSection.isVisible ? 'visible' : ''}`}>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Ecossistema Integrado</h2>
            <p className="text-muted-foreground">Conexão cirúrgica com as maiores inteligências do mercado.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-10 opacity-90">
            {/* Tech Stack Bubbles */}
            <div className="flex items-center gap-3 bg-card px-6 py-3 rounded-full border border-border">
              <Image 
                src="/assets/Google_Analytics_(11).svg" 
                alt="Google Analytics 4" 
                width={24} 
                height={24}
                className="w-6 h-6"
              />
              <span className="font-semibold">GA4</span>
            </div>
            <div className="flex items-center gap-3 bg-card px-6 py-3 rounded-full border border-border">
              <Image 
                src="/assets/Google_AdWords_(1).svg" 
                alt="Google Ads" 
                width={24} 
                height={24}
                className="w-6 h-6"
              />
              <span className="font-semibold">Google Ads</span>
            </div>
            <div className="flex items-center gap-3 bg-card px-6 py-3 rounded-full border border-border">
              <Image 
                src="/assets/Meta_(4).svg" 
                alt="Meta Ads" 
                width={24} 
                height={24}
                className="w-6 h-6"
              />
              <span className="font-semibold">Meta CAPI</span>
            </div>
            <div className="flex items-center gap-3 bg-card px-6 py-3 rounded-full border border-border">
              <Image 
                src="/assets/TikTok_(7).svg" 
                alt="TikTok Events API" 
                width={24} 
                height={24}
                className="w-6 h-6"
              />
              <span className="font-semibold">TikTok Events API</span>
            </div>
            <div className="flex items-center gap-3 bg-card px-6 py-3 rounded-full border border-border">
              <Image 
                src="/assets/stape-logo.webp" 
                alt="Stape" 
                width={24} 
                height={24}
                className="w-6 h-6 object-contain"
              />
              <span className="font-semibold">Stape</span>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground uppercase tracking-widest mb-4">Plataformas Suportadas</p>
            <div className="flex flex-wrap justify-center gap-4 text-muted-foreground text-sm font-mono">
              <span className="px-3 py-1 bg-card rounded border border-border">Shopify</span>
              <span className="px-3 py-1 bg-card rounded border border-border">WooCommerce</span>
              <span className="px-3 py-1 bg-card rounded border border-border">Nuvemshop</span>
              <span className="px-3 py-1 bg-card rounded border border-border">VTEX</span>
              <span className="px-3 py-1 bg-card rounded border border-border">Yampi</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- BENEFITS SECTION --- */}
      <section id="beneficios" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div ref={benefitsSection.ref} className={`scroll-fade-in-left ${benefitsSection.isVisible ? 'visible' : ''}`}>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Por que o Server-Side <br/> é uma obrigação?
              </h2>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-foreground mb-2">Nota de Atribuição Máxima</h4>
                    <p className="text-muted-foreground">Enviamos dados "hash" (criptografados) do usuário. O Facebook entende exatamente quem comprou, elevando sua nota de 3/10 para 9/10.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-foreground mb-2">Redução de CPA em até 40%</h4>
                    <p className="text-muted-foreground">O algoritmo aprende mais rápido com dados reais. Você sai da "fase de aprendizado" mais cedo e gasta menos.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <Lock className="w-6 h-6 text-foreground" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-foreground mb-2">Blindagem iOS 14+</h4>
                    <p className="text-muted-foreground">O traqueamento via servidor ignora restrições da Apple. Se o usuário comprou, nós marcamos. Ponto final.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Stats Card */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-20"></div>
              <div className="relative bg-card border border-border rounded-2xl p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="text-sm text-muted-foreground uppercase">Resultado Esperado</p>
                    <h3 className="text-2xl font-bold text-foreground">Performance Lift</h3>
                  </div>
                  <Cpu className="text-primary w-8 h-8" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-secondary p-4 rounded-xl border border-border text-center">
                    <p className="text-3xl font-bold text-primary mb-1">+25%</p>
                    <p className="text-xs text-muted-foreground uppercase">ROAS</p>
                  </div>
                  <div className="bg-secondary p-4 rounded-xl border border-border text-center">
                    <p className="text-3xl font-bold text-primary mb-1">-35%</p>
                    <p className="text-xs text-muted-foreground uppercase">CPA Médio</p>
                  </div>
                  <div className="bg-secondary p-4 rounded-xl border border-border text-center col-span-2">
                    <p className="text-3xl font-bold text-foreground mb-1">100%</p>
                    <p className="text-xs text-muted-foreground uppercase">Dados Proprietários</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- IMPLEMENTATION STEPS --- */}
      <section className="py-20 bg-secondary/30 border-y border-border">
        <div className="container mx-auto px-4">
          <div ref={implementationSection.ref} className={`text-center mb-16 scroll-fade-in ${implementationSection.isVisible ? 'visible' : ''}`}>
            <h2 className="text-3xl font-bold text-foreground">Implementação Técnica sem Dor de Cabeça</h2>
            <p className="text-muted-foreground mt-2">Nós cuidamos do código, você foca nas vendas.</p>
          </div>

          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 z-0"></div>

            <div className="grid md:grid-cols-4 gap-8 relative z-10">
              {[
                { step: "01", title: "Diagnóstico", desc: "Análise do seu GTM e Data Layer atual." },
                { step: "02", title: "Configuração", desc: "Subimos a infra Google Cloud ou Stape." },
                { step: "03", title: "Validação", desc: "Testes em tempo real (Debug Mode)." },
                { step: "04", title: "Entrega", desc: "Rastreamento pronto para escalar." }
              ].map((item, idx) => (
                <div key={idx} className={`bg-card border border-border p-6 rounded-xl text-center hover:-translate-y-2 transition-transform duration-300 scroll-scale-in ${implementationSection.isVisible ? 'visible' : ''}`} style={{ transitionDelay: `${idx * 0.1}s` }}>
                  <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-primary font-bold mx-auto mb-4 border border-primary/20 shadow-[0_0_15px_hsl(var(--primary)/0.2)]">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 ref={faqSection.ref} className={`text-3xl font-bold text-center mb-10 text-foreground scroll-fade-in ${faqSection.isVisible ? 'visible' : ''}`}>Perguntas Frequentes</h2>
          
          <div className="space-y-4">
            {[
              {
                q: "Isso deixa meu site lento?",
                a: "Não. Pelo contrário. Ao mover o processamento para o servidor (Server-Side), tiramos a carga do navegador do usuário, deixando seu site mais leve e rápido (o que ajuda no SEO)."
              },
              {
                q: "Funciona para E-commerce e Lançamentos?",
                a: "Sim. Seja uma venda complexa de e-commerce com vários produtos ou uma captura de leads simples em uma Landing Page, o rastreamento é essencial."
              },
              {
                q: "Preciso pagar servidor mensal?",
                a: "O custo do servidor (Google Cloud ou Stape) é marginal comparado ao valor recuperado em ROAS. Para a maioria dos negócios, custa menos de $20/mês."
              },
              {
                q: "Quanto tempo demora para implementar?",
                a: "A estrutura completa geralmente é entregue validada entre 3 a 5 dias úteis após o acesso aos ativos."
              }
            ].map((faq, idx) => (
              <div key={idx} className="border border-border rounded-lg bg-card overflow-hidden">
                <button 
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex justify-between items-center p-5 text-left hover:bg-secondary transition-colors"
                >
                  <span className="font-semibold text-foreground">{faq.q}</span>
                  {openFaqIndex === idx ? <ChevronUp className="text-primary" /> : <ChevronDown className="text-muted-foreground" />}
                </button>
                {openFaqIndex === idx && (
                  <div className="p-5 pt-0 text-muted-foreground border-t border-border/50 mt-2">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER CTA --- */}
      <section id="cta-final" className="py-24 bg-gradient-to-b from-secondary/30 to-background text-center px-4 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <h2 ref={ctaSection.ref} className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground tracking-tight px-2 scroll-fade-in ${ctaSection.isVisible ? 'visible' : ''}`}>
            A diferença entre o amador e o líder de mercado está na <span className="text-primary">precisão dos dados.</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-10 px-2">
            Não deixe o algoritmo adivinhar. Dê a ele os dados exatos para encontrar seu próximo cliente.
          </p>
          
          <Button 
            size="lg" 
            onClick={openDialog}
            className="text-sm sm:text-base md:text-lg lg:text-xl px-4 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-4 md:py-5 mb-8 w-full sm:w-auto whitespace-normal sm:whitespace-nowrap"
          >
            QUERO O TRAQUEAMENTO AVANÇADO
          </Button>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 text-muted-foreground text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> Eficiência na Coleta de Dados
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" /> Implementação Rápida
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ContactFormDialog />
    </div>
  );
}
