import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useContactDialog } from "@/contexts/ContactDialogContext";

const steps = [
  {
    number: "01",
    title: "Diagnóstico e mapa de gargalos",
    description: "Levantamos jornada, canais e processos. Identificamos vazamentos e prioridades de alto impacto."
  },
  {
    number: "02",
    title: "Arquitetura do ecossistema",
    description: "Definimos a estratégia e o desenho da integração: IA, dados, automações e plataforma (Kommo)."
  },
  {
    number: "03",
    title: "Tracking e base de dados confiável",
    description: "Implantamos eventos e coleta avançada (incl. server-side quando necessário) para dados reais e visão macro/micro."
  },
  {
    number: "04",
    title: "Automação + IA em produção",
    description: "Ativamos rotinas inteligentes (atendimento, vendas e operação) e relatórios no WhatsApp para decisão rápida."
  },
  {
    number: "05",
    title: "Gestão estratégica e otimização contínua",
    description: "Acompanhamos performance, ajustamos processos e executamos plano de ação para evoluir o ecossistema."
  }
];

const HowItWorks = () => {
  const { openDialog } = useContactDialog();
  
  return (
    <section id="como-funciona" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-[1330px] mx-auto space-y-16">
          {/* Header */}
          <div className="text-center space-y-4 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold">
              Ecossistema implantado em até <span className="text-gradient-accent">21 dias</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Da arquitetura ao uso no dia a dia, com entregas claras e acompanhamento contínuo.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 relative items-stretch">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="relative"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Step card */}
                  <div className="bg-card rounded-2xl border border-border hover:border-primary/50 p-6 space-y-3 transition-all duration-300 hover:scale-105 group flex flex-col w-full h-full">
                    {/* Number badge */}
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent text-white text-2xl font-bold group-hover:scale-110 transition-transform">
                      {step.number}
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-2 flex-1">
                      <h3 className="text-lg font-semibold leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center pt-4 space-y-6 animate-fade-in-up">
            <p className="text-base md:text-lg text-muted-foreground max-w-4xl mx-auto px-4">
              Você sabe exatamente o que será entregue, em que ordem e com quais metas sem "caixa-preta".
            </p>
            <Button 
              size="lg"
              className="text-lg px-8 py-6 bg-accent hover:bg-accent/90 glow-accent group"
              onClick={openDialog}
            >
              Quero implementar agora
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
