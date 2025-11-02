import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Diagnóstico gratuito",
    description: "Analisamos sua operação atual e identificamos oportunidades"
  },
  {
    number: "02",
    title: "Arquitetura IA + Shopify + Estratégia",
    description: "Desenhamos a solução perfeita para seu negócio"
  },
  {
    number: "03",
    title: "Desenvolvimento e integração",
    description: "Implementamos tudo com agilidade e qualidade"
  },
  {
    number: "04",
    title: "Treinamento e ajustes",
    description: "Capacitamos sua equipe e otimizamos processos"
  },
  {
    number: "05",
    title: "Gestão contínua e otimização",
    description: "Evoluímos constantemente para maximizar resultados"
  }
];

const HowItWorks = () => {
  return (
    <section id="como-funciona" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Header */}
          <div className="text-center space-y-4 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold">
              Implantamos em até <span className="text-gradient-accent">21 dias</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Processo estruturado e transparente do início ao fim
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Connection line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary -translate-y-1/2" />
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 relative">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="relative"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Step card */}
                  <div className="bg-card rounded-2xl border border-border hover:border-primary/50 p-6 space-y-4 transition-all duration-300 hover:scale-105 group">
                    {/* Number badge */}
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent text-white text-2xl font-bold group-hover:scale-110 transition-transform">
                      {step.number}
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </div>

                    {/* Check icon */}
                    <CheckCircle2 className="h-5 w-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Arrow for mobile */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center py-4">
                      <ArrowRight className="h-6 w-6 text-primary rotate-90" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center pt-8 animate-fade-in-up">
            <Button 
              size="lg"
              className="text-lg px-8 py-6 bg-accent hover:bg-accent/90 glow-accent group"
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
