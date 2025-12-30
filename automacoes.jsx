import React, { useState, useEffect } from 'react';
import { 
  Workflow, 
  GitMerge, 
  Database, 
  Zap, 
  ArrowRight, 
  Menu, 
  X, 
  CheckCircle2, 
  Clock, 
  LayoutDashboard, 
  RefreshCw, 
  Cable, 
  ShoppingCart, 
  FileSpreadsheet, 
  Banknote, 
  Code2,
  ShieldCheck
} from 'lucide-react';

const AutomationLandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll detection for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* --- NAVIGATION --- */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800 py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="font-bold text-white text-xl">D</span>
            </div>
            <span className="text-xl font-bold tracking-tight">Denzer <span className="text-cyan-400">Flow</span></span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('problema')} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">O Problema</button>
            <button onClick={() => scrollToSection('solucoes')} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Soluções</button>
            <button onClick={() => scrollToSection('stack')} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Tecnologias</button>
            <button 
              onClick={() => scrollToSection('cta-final')}
              className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-full transition-all hover:shadow-[0_0_20px_rgba(8,145,178,0.4)] border border-cyan-500/50"
            >
              Mapear Processos
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-slate-300" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-slate-800 p-6 flex flex-col gap-4 shadow-2xl">
            <button onClick={() => scrollToSection('problema')} className="text-left text-slate-300 py-2">O Problema</button>
            <button onClick={() => scrollToSection('solucoes')} className="text-left text-slate-300 py-2">Soluções</button>
            <button onClick={() => scrollToSection('cta-final')} className="w-full py-3 bg-cyan-600 text-white font-bold rounded-lg">
              Falar com Especialista
            </button>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]"></div>
          {/* Grid/Nodes Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_80%)]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-8 uppercase tracking-wider animate-fade-in-up">
            <Cable className="w-4 h-4" />
            Conectividade Total via API
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 max-w-5xl mx-auto">
            Sua empresa rodando no <br/> <span className="text-cyan-400">piloto automático.</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            Pare de desperdiçar talento humano copiando e colando dados. Conectamos suas ferramentas de Marketing, Vendas e Financeiro em um ecossistema único e autônomo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => scrollToSection('cta-final')}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-lg rounded-lg transition-all transform hover:scale-105 hover:shadow-[0_0_30px_rgba(8,145,178,0.5)] flex items-center justify-center gap-2"
            >
              <Workflow className="w-5 h-5" />
              Automatizar Meus Processos
            </button>
            <p className="text-xs text-slate-500 mt-2 sm:mt-0">
              Especialistas em n8n, Make, Zapier e APIs Customizadas.
            </p>
          </div>
        </div>
      </header>

      {/* --- PROBLEM SECTION --- */}
      <section id="problema" className="py-20 bg-slate-900 border-y border-slate-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                O custo invisível da <br />
                <span className="text-red-500 border-b-2 border-red-500">operação manual.</span>
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Quantas horas sua equipe perde exportando CSVs, atualizando planilhas ou corrigindo erros de digitação? Sistemas desconectados geram lentidão e prejuízo.
              </p>
              
              <div className="grid gap-4">
                {[
                  { text: "Leads esfriando enquanto aguardam cadastro manual", icon: <Clock className="w-5 h-5 text-red-400" /> },
                  { text: "Erros de digitação em notas fiscais e contratos", icon: <FileSpreadsheet className="w-5 h-5 text-red-400" /> },
                  { text: "Estoque furado por falta de sincronização", icon: <ShoppingCart className="w-5 h-5 text-red-400" /> }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-slate-950 border border-slate-800 rounded-lg">
                    {item.icon}
                    <span className="text-slate-300 font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Metaphor: Chaos vs Order */}
            <div className="w-full md:w-1/2 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent blur-3xl rounded-full"></div>
              <div className="relative bg-slate-950 border border-slate-800 rounded-2xl p-8 shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-6">Transformação de Fluxo</h3>
                
                <div className="space-y-6">
                  {/* Before */}
                  <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20 opacity-70">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-red-400 font-mono text-xs font-bold">ANTES: FLUXO MANUAL</span>
                      <X className="w-4 h-4 text-red-500" />
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                      <span>Venda Site</span>
                      <span className="text-xs">→</span>
                      <span>Planilha</span>
                      <span className="text-xs">→</span>
                      <span>ERP</span>
                      <span className="text-xs">→</span>
                      <span>Logística</span>
                    </div>
                    <p className="text-xs text-red-400 mt-2 text-right">Tempo: 4h a 24h</p>
                  </div>
                  
                  {/* Connector Line */}
                  <div className="flex justify-center -my-2">
                     <ArrowRight className="w-5 h-5 text-slate-600 rotate-90" />
                  </div>

                  {/* After */}
                  <div className="p-4 rounded-lg bg-cyan-500/5 border border-cyan-500/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent w-[200%] animate-[shimmer_2s_infinite] -translate-x-full"></div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-cyan-400 font-mono text-xs font-bold flex items-center gap-2">
                         <Zap className="w-3 h-3" /> DEPOIS: DENZER FLOW
                      </span>
                      <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                    </div>
                    <div className="flex items-center justify-between text-slate-300 text-sm font-medium">
                      <span>Venda</span>
                      <div className="h-0.5 flex-1 bg-cyan-500/30 mx-2 relative">
                         <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]"></div>
                      </div>
                      <span>Nota Fiscal + Estoque + Envio</span>
                    </div>
                    <p className="text-xs text-cyan-400 mt-2 text-right">Tempo: 0.5 segundos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section id="solucoes" className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Conecte seus sistemas. <br/>
              <span className="text-cyan-400">Elimine o erro humano.</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Utilizamos as ferramentas mais modernas de integração (Low-code e Code-based) para garantir que seus dados fluam sem interrupções.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div 
                key={idx} 
                className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-cyan-500/50 hover:-translate-y-2 transition-all duration-300 group shadow-lg hover:shadow-cyan-900/10"
              >
                <div className="w-14 h-14 bg-slate-800 rounded-xl flex items-center justify-center mb-6 group-hover:bg-cyan-600 group-hover:text-white transition-colors text-cyan-400">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-slate-400 mb-6 leading-relaxed min-h-[80px]">
                  {service.desc}
                </p>
                <ul className="space-y-3">
                  {service.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TECH STACK SECTION --- */}
      <section id="stack" className="py-20 bg-slate-900 border-y border-slate-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Stack Tecnológico</h2>
            <p className="text-slate-400">Trabalhamos com o que há de mais robusto em automação.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-8 max-w-5xl mx-auto opacity-90">
            {/* Tech Bubbles */}
            {['n8n', 'Make (Integromat)', 'Zapier', 'Python', 'Node.js', 'Webhooks', 'REST API', 'GraphQL', 'AWS Lambda', 'Google Cloud Functions'].map((tech, i) => (
              <div key={i} className="group relative px-5 py-2 rounded-full bg-slate-950 border border-slate-800 text-slate-400 font-mono text-sm hover:border-cyan-500 hover:text-white transition-all cursor-default overflow-hidden">
                <div className="absolute inset-0 bg-cyan-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative z-10">{tech}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-16 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
             <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex items-start gap-4">
                <Database className="w-8 h-8 text-cyan-500 shrink-0" />
                <div>
                   <h4 className="font-bold text-white mb-1">Centralização de Dados (ETL)</h4>
                   <p className="text-sm text-slate-400">Extraímos dados de múltiplas fontes (Ads, CRM, Banco) e unificamos em um Data Warehouse para relatórios precisos.</p>
                </div>
             </div>
             <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex items-start gap-4">
                <LayoutDashboard className="w-8 h-8 text-blue-500 shrink-0" />
                <div>
                   <h4 className="font-bold text-white mb-1">Dashboards em Tempo Real</h4>
                   <p className="text-sm text-slate-400">Visualize sua operação no Looker Studio ou Power BI com dados que se atualizam sozinhos a cada minuto.</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- CTA FINAL --- */}
      <section id="cta-final" className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 text-center px-6 border-t border-slate-800 relative">
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
            Pare de trabalhar para o sistema. <br/>
            <span className="text-cyan-400">Faça o sistema trabalhar para você.</span>
          </h2>
          <p className="text-xl text-slate-400 mb-10">
            Agende um mapeamento de processos gratuito e descubra onde você pode economizar horas da sua equipe.
          </p>
          
          <button className="px-10 py-5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xl rounded-full transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(8,145,178,0.4)] mb-8 flex items-center gap-3 mx-auto">
            Agendar Mapeamento
            <ArrowRight className="w-6 h-6" />
          </button>
          
          <div className="flex justify-center gap-6 text-slate-500 text-sm">
             <div className="flex items-center gap-2">
               <RefreshCw className="w-4 h-4" /> Automação 24/7
             </div>
             <div className="flex items-center gap-2">
               <ShieldCheck className="w-4 h-4" /> Segurança de Dados
             </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-950 py-10 border-t border-slate-900 text-center text-slate-600 text-sm">
        <div className="container mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
             <div className="w-6 h-6 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded flex items-center justify-center">
              <span className="font-bold text-white text-xs">D</span>
            </div>
            <span className="font-bold text-slate-400">Denzer Digital</span>
          </div>
          <p>&copy; {new Date().getFullYear()} Denzer Digital. Todos os direitos reservados.</p>
          <p className="mt-2">Especialistas em Automação & Integração de Sistemas.</p>
        </div>
      </footer>
    
    {/* CSS Animation defined locally for simple usage */}
    <style>{`
      @keyframes fade-in-up {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fade-in-up {
        animation: fade-in-up 0.8s ease-out forwards;
      }
      @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
    `}</style>

    </div>
  );
};

export default AutomationLandingPage;