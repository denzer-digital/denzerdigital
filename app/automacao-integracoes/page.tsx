"use client";

import { useLayoutEffect, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { 
  ArrowRight, 
  CheckCircle2, 
  Clock,
  GitMerge, 
  Database, 
  Zap, 
  Menu, 
  X, 
  LayoutDashboard, 
  RefreshCw, 
  Cable, 
  ShoppingCart, 
  FileSpreadsheet, 
  Banknote, 
  Code2,
  ShieldCheck,
  Workflow,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useContactDialog } from "@/contexts/ContactDialogContext";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const ContactFormDialog = dynamic(() => import("@/components/ContactFormDialog"), {
  ssr: false,
});

export default function AutomacaoIntegracoesPage() {
  const { openDialog } = useContactDialog();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Scroll animations
  const heroSection = useScrollAnimation();
  const problemSection = useScrollAnimation();
  const servicesSection = useScrollAnimation();
  const techStackSection = useScrollAnimation();
  const ctaSection = useScrollAnimation();
  const faqSection = useScrollAnimation();

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
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const services = [
    {
      title: "Integração Marketing & CRM",
      icon: <GitMerge className="w-6 h-6" />,
      desc: "Chega de baixar planilhas de leads. Conectamos Facebook Ads e Google Ads direto ao seu CRM (Salesforce, Pipedrive, RD Station) em tempo real.",
      features: ["Distribuição automática de leads", "Enriquecimento de dados", "Alertas no Slack/WhatsApp"]
    },
    {
      title: "Automação Financeira (ERP)",
      icon: <Banknote className="w-6 h-6" />,
      desc: "Sincronize gateways de pagamento (Stripe, Mercado Pago) com seu ERP (Bling, Tiny, Omie). Vendeu? A nota fiscal é emitida sozinha.",
      features: ["Conciliação bancária automática", "Disparo de Boletos/Pix", "Baixa de estoque em tempo real"]
    },
    {
      title: "Fluxos Personalizados (API)",
      icon: <Code2 className="w-6 h-6" />,
      desc: "Desenvolvemos conectores sob medida via API e Webhooks para sistemas que 'não conversam' nativamente. Se tem API, nós conectamos.",
      features: ["n8n & Make (Integromat)", "Scripts Python/Node.js", "Tratamento de dados complexos"]
    }
  ];

  const techStack = [
    'n8n', 
    'Make (Integromat)', 
    'Zapier', 
    'Python', 
    'Node.js', 
    'Webhooks', 
    'REST API', 
    'GraphQL', 
    'AWS Lambda', 
    'Google Cloud Functions'
  ];

  const faqs = [
    {
      question: "Quanto tempo leva para implementar uma automação?",
      answer: "Depende da complexidade do fluxo. Integrações simples (ex: Facebook Ads → CRM) podem ser implementadas em 2-3 dias. Fluxos customizados com múltiplas APIs podem levar de 1 a 3 semanas."
    },
    {
      question: "Vocês trabalham com quais ferramentas?",
      answer: "Trabalhamos com as principais plataformas de automação (n8n, Make, Zapier) e também desenvolvemos integrações customizadas via API. Se a ferramenta tem API documentada, conseguimos conectar."
    },
    {
      question: "E se meu sistema não tiver API?",
      answer: "Em casos onde não há API disponível, podemos utilizar técnicas de web scraping, RPA (Robotic Process Automation) ou até mesmo desenvolver uma camada intermediária para viabilizar a integração."
    },
    {
      question: "Como garantem a segurança dos dados?",
      answer: "Todas as integrações seguem as melhores práticas de segurança: autenticação OAuth 2.0, criptografia de dados em trânsito (SSL/TLS), armazenamento seguro de credenciais e logs de auditoria. Além disso, seguimos LGPD e GDPR quando aplicável."
    },
    {
      question: "Preciso ter conhecimento técnico para usar as automações?",
      answer: "Não! Desenvolvemos as automações para funcionar de forma transparente. Você só precisa usar seus sistemas normalmente - a mágica acontece nos bastidores. Fornecemos documentação e treinamento quando necessário."
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
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px]"></div>
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-primary/30 text-primary text-xs font-semibold mb-8 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Conectividade Total via API
          </div>

          {/* Ícone */}
          <div className="flex justify-center mb-8">
            <div 
              className="flex h-20 w-20 items-center justify-center rounded-2xl"
              style={{
                backgroundImage: 'linear-gradient(135deg, #007BFF 0%, #FF7B00 100%)'
              }}
            >
              <Image 
                src="/assets/icon-automacao.svg" 
                alt="Automação Icon" 
                width={48} 
                height={48}
                className="text-white"
              />
            </div>
          </div>

          {/* Título */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 max-w-5xl mx-auto">
            Sua empresa rodando no <span className="text-primary">piloto automático.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
            Pare de desperdiçar talento humano copiando e colando dados. Conectamos suas ferramentas de Marketing, Vendas e Financeiro em um ecossistema único e autônomo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              onClick={() => openDialog("form-automacoes")}
              className="text-lg px-8 py-6"
            >
              <Workflow className="w-5 h-5 mr-2" />
              Automatizar Meus Processos
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <p className="text-xs text-muted-foreground mt-2 sm:mt-0">
              Especialistas em n8n, Make, Zapier e APIs Customizadas.
            </p>
          </div>
        </div>
      </section>

      {/* --- PROBLEM SECTION --- */}
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
                  O custo invisível da <br />
                  <span className="text-destructive border-b-2 border-destructive">operação manual.</span>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Quantas horas sua equipe perde exportando CSVs, atualizando planilhas ou corrigindo erros de digitação? Sistemas desconectados geram lentidão e prejuízo.
                </p>
                
                <div className="space-y-4">
                  {[
                    { text: "Leads esfriando enquanto aguardam cadastro manual", icon: <Clock className="w-5 h-5 text-destructive" /> },
                    { text: "Erros de digitação em notas fiscais e contratos", icon: <FileSpreadsheet className="w-5 h-5 text-destructive" /> },
                    { text: "Estoque furado por falta de sincronização", icon: <ShoppingCart className="w-5 h-5 text-destructive" /> }
                  ].map((item, i) => (
                    <div 
                      key={i} 
                      className={`flex items-center gap-4 p-4 bg-card border border-border rounded-lg scroll-fade-in ${problemSection.isVisible ? 'visible' : ''}`}
                      style={{ transitionDelay: `${i * 0.1}s` }}
                    >
                      {item.icon}
                      <span className="text-foreground font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual Metaphor: Chaos vs Order */}
              <div className={`relative scroll-fade-in-right ${problemSection.isVisible ? 'visible' : ''}`}>
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent blur-3xl rounded-full"></div>
                <div className="relative bg-card border border-border rounded-2xl p-8 shadow-lg">
                  <h3 className="text-xl font-bold mb-6">Transformação de Fluxo</h3>
                  
                  <div className="space-y-6">
                    {/* Before */}
                    <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/20 opacity-70">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-destructive font-mono text-xs font-bold">ANTES: FLUXO MANUAL</span>
                        <X className="w-4 h-4 text-destructive" />
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <span>Venda Site</span>
                        <span className="text-xs">→</span>
                        <span>Planilha</span>
                        <span className="text-xs">→</span>
                        <span>ERP</span>
                        <span className="text-xs">→</span>
                        <span>Logística</span>
                      </div>
                      <p className="text-xs text-destructive mt-2 text-right">Tempo: 4h a 24h</p>
                    </div>
                    
                    {/* Connector Line */}
                    <div className="flex justify-center -my-2">
                       <ArrowRight className="w-5 h-5 text-muted-foreground rotate-90" />
                    </div>

                    {/* After */}
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 relative overflow-hidden">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-primary font-mono text-xs font-bold flex items-center gap-2">
                           <Zap className="w-3 h-3" /> DEPOIS: DENZER FLOW
                        </span>
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex items-center justify-between text-foreground text-sm font-medium">
                        <span>Venda</span>
                        <div className="h-0.5 flex-1 bg-primary/30 mx-2 relative">
                           <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_hsl(var(--primary))]"></div>
                        </div>
                        <span>Nota Fiscal + Estoque + Envio</span>
                      </div>
                      <p className="text-xs text-primary mt-2 text-right">Tempo: 0.5 segundos</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section 
        id="solucoes"
        ref={servicesSection.ref}
        className={`py-24 relative overflow-hidden scroll-fade-in ${servicesSection.isVisible ? 'visible' : ''}`}
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold">
                Conecte seus sistemas. <br/>
                <span className="text-gradient-primary">Elimine o erro humano.</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                Utilizamos as ferramentas mais modernas de integração (Low-code e Code-based) para garantir que seus dados fluam sem interrupções.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {services.map((service, idx) => (
                <div 
                  key={idx} 
                  className={`group bg-card border border-border rounded-2xl p-8 hover:border-primary/50 hover:-translate-y-2 transition-all duration-300 shadow-lg scroll-fade-in ${servicesSection.isVisible ? 'visible' : ''}`}
                  style={{ transitionDelay: `${idx * 0.15}s` }}
                >
                  <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors text-primary">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
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
        </div>
      </section>

      {/* --- TECH STACK SECTION --- */}
      <section 
        id="stack"
        ref={techStackSection.ref}
        className={`py-20 bg-secondary/30 border-y border-border scroll-fade-in ${techStackSection.isVisible ? 'visible' : ''}`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold">Stack Tecnológico</h2>
              <p className="text-muted-foreground">Trabalhamos com o que há de mais robusto em automação.</p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {techStack.map((tech, i) => (
                <div 
                  key={i} 
                  className={`group relative px-5 py-2 rounded-full bg-card border border-border text-muted-foreground font-mono text-sm hover:border-primary hover:text-primary transition-all cursor-default overflow-hidden scroll-scale-in ${techStackSection.isVisible ? 'visible' : ''}`}
                  style={{ transitionDelay: `${i * 0.05}s` }}
                >
                  <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <span className="relative z-10">{tech}</span>
                </div>
              ))}
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
               <div className={`bg-card p-6 rounded-xl border border-border flex items-start gap-4 scroll-fade-in-left ${techStackSection.isVisible ? 'visible' : ''}`}>
                  <Database className="w-8 h-8 text-primary shrink-0" />
                  <div>
                     <h4 className="font-bold mb-1">Centralização de Dados (ETL)</h4>
                     <p className="text-sm text-muted-foreground">Extraímos dados de múltiplas fontes (Ads, CRM, Banco) e unificamos em um Data Warehouse para relatórios precisos.</p>
                  </div>
               </div>
               <div className={`bg-card p-6 rounded-xl border border-border flex items-start gap-4 scroll-fade-in-right ${techStackSection.isVisible ? 'visible' : ''}`}>
                  <LayoutDashboard className="w-8 h-8 text-accent shrink-0" />
                  <div>
                     <h4 className="font-bold mb-1">Dashboards em Tempo Real</h4>
                     <p className="text-sm text-muted-foreground">Visualize sua operação no Looker Studio ou Power BI com dados que se atualizam sozinhos a cada minuto.</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section 
        id="faq"
        ref={faqSection.ref}
        className={`py-24 scroll-fade-in ${faqSection.isVisible ? 'visible' : ''}`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">
                Perguntas <span className="text-gradient-primary">Frequentes</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Tire suas dúvidas sobre automação e integrações
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className={`bg-card border border-border rounded-lg overflow-hidden scroll-fade-in ${faqSection.isVisible ? 'visible' : ''}`}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-secondary/50 transition-colors"
                  >
                    <span className="font-semibold pr-4">{faq.question}</span>
                    {openFaqIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-primary shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                    )}
                  </button>
                  {openFaqIndex === index && (
                    <div className="px-6 pb-4 text-muted-foreground leading-relaxed border-t border-border pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
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
            Pare de trabalhar para o sistema. <br/>
            <span className="text-gradient-primary">Faça o sistema trabalhar para você.</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Agende um mapeamento de processos gratuito e descubra onde você pode economizar horas da sua equipe.
          </p>
          
          <Button 
            size="lg"
            onClick={() => openDialog()}
            className="text-xl px-10 py-7 bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg hover:scale-105 transition-all duration-300 group"
          >
            Agendar Mapeamento
            <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <div className="flex flex-wrap justify-center gap-6 text-muted-foreground text-sm pt-4">
             <div className="flex items-center gap-2">
               <RefreshCw className="w-4 h-4" /> Automação 24/7
             </div>
             <div className="flex items-center gap-2">
               <ShieldCheck className="w-4 h-4" /> Segurança de Dados
             </div>
          </div>
        </div>
      </section>

      <Footer />
      <ContactFormDialog />
    </div>
  );
}
