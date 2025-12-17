import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useContactDialog } from "@/contexts/ContactDialogContext";

const steps = [
  {
    number: "01",
    title: "Diagnóstico gratuito",
    description: "Analisamos sua operação atual, identificamos gargalos e mapeamos onde a IA pode gerar impacto imediato."
  },
  {
    number: "02",
    title: "Arquitetura IA + Estratégia",
    description: "Desenhamos a solução ideal para o seu negócio: fluxos, integrações, funções da IA e objetivos claros."
  },
  {
    number: "03",
    title: "Desenvolvimento e integração",
    description: "Implementamos a solução definida na estratégia, seja um agente de IA, uma automação ou um e-commerce."
  },
  {
    number: "04",
    title: "Treinamento e ajustes",
    description: "Validamos cenários reais, refinamos interações e capacitamos seu time para operar com a IA no dia a dia."
  },
  {
    number: "05",
    title: "Gestão contínua e otimização",
    description: "Acompanhamos e aprimoramos sua solução, seja IA, automação ou e-commerce garantindo evolução constante e maximização de resultados."
  }
];

const HowItWorks = () => {
  const { openDialog } = useContactDialog();
  
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
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 relative items-stretch">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="relative"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Step card */}
                  <div className="bg-card rounded-2xl border border-border hover:border-primary/50 p-6 space-y-3 transition-all duration-300 hover:scale-105 group flex flex-col w-full">
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
          <div className="text-center pt-8 animate-fade-in-up">
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
