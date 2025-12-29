import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Bot, Compass, ShoppingBag, BarChart3, ArrowRight } from "lucide-react";

// Componente para o ícone SVG customizado de automação
const AutomationIcon = () => (
  <Image 
    src="/assets/icon-automacao.svg" 
    alt="Automação Icon" 
    width={32} 
    height={32} 
    className="text-white"
  />
);

const solutions = [
  {
    icon: Bot,
    title: "Inteligência Artificial Integrada",
    description: "Simplifique seus processos e ganhe eficiência com IA. Automatize atendimento, vendas e operação, reduzindo trabalho manual e acompanhando tudo em tempo real através de uma assistente virtual via WhatsApp.",
    gradient: "from-primary to-primary-glow",
    href: "/agentes-de-ia",
  },
  {
    icon: BarChart3,
    title: "Tracking e Análise de Dados Avançada",
    description: "O tracking é o coração do negócio: ele mostra o macro e o micro da jornada. A Denzer Digital rastreia eventos para entender origem e comportamento, identificar gargalos e oportunidades e alimentar IA, mídia e estratégia com dados precisos.",
    gradient: "from-primary to-primary-glow",
    href: "/tracking",
  },
  {
    icon: AutomationIcon,
    title: "Automação e Integrações Inteligentes",
    description: "Otimize processos e reduza erros com automação baseada em dados. A Denzer Digital integra todas as suas plataformas em um único fluxo inteligente, gerando mais inteligência para o seu ecossistema e garantindo operações mais ágeis e precisas.",
    gradient: "from-accent to-accent-glow",
    href: "/ecommerce-shopify",
  },
  {
    icon: Compass,
    title: "Gestão Estratégica do Ecossistema",
    description: "A Denzer Digital unifica IA, tracking e automações em um ecossistema guiado por dados. Resultado: decisões mais rápidas, planos de ação claros, processos mais eficientes e vendas otimizadas de ponta a ponta.",
    gradient: "from-accent to-accent-glow",
    href: "/gestao-digital-360",
  }
];

const Solution = () => {
  return (
    <section id="solucoes" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      <div className="container relative mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold">
              O ecossistema <span className="text-gradient-primary">Denzer Digital</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Quatro pilares integrados para transformar dados em decisão, automação em eficiência e IA em performance previsível.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <Link
                href={solution.href}
                key={index}
                className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500 hover:scale-105 overflow-hidden"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${solution.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <div className="relative space-y-6">
                  <div 
                    className={`inline-flex p-4 rounded-xl items-center justify-center ${
                      index === 2 
                        ? 'bg-gradient-to-br' 
                        : `bg-gradient-to-br ${solution.gradient}`
                    }`}
                    style={index === 2 ? {
                      backgroundImage: 'linear-gradient(135deg, #007BFF 0%, #FF7B00 100%)'
                    } : {}}
                  >
                    {index === 2 ? (
                      <AutomationIcon />
                    ) : (
                      <solution.icon className="h-8 w-8 text-white" />
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold group-hover:text-gradient-primary transition-all">
                      {solution.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {solution.description}
                    </p>
                  </div>

                  <div className="pt-4">
                    <div className="inline-flex items-center text-primary group-hover:gap-2 transition-all cursor-pointer">
                      <span className="text-sm font-semibold">Saiba mais</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center pt-8 animate-fade-in-up">
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Quando IA, tracking, integrações e estratégia trabalham juntos, sua operação para de "apagar incêndio" e passa a evoluir com clareza com plano de ação e melhoria contínua.
            </p>
            <Button 
              size="lg"
              className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg hover:scale-105 transition-all duration-300 group mt-[50px]"
              onClick={() => {
                const element = document.getElementById('experimente-ia');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              aria-label="Ver como funciona na prática - Ir para seção de chat do agente de IA"
            >
              Ver como funciona na prática
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;
