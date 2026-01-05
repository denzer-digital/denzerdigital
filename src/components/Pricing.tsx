"use client";

import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { useContactDialog } from "@/contexts/ContactDialogContext";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const plans = [
  {
    name: "Essencial",
    subtitle: "Base operacional (IA + Integrações)",
    price: "Investimento sob diagnóstico",
    description: "Perfeito para começar com automação inteligente",
    features: [
      "IA no WhatsApp para atendimento e triagem",
      "Integrações principais (CRM / formulários / WhatsApp)",
      "Automação de rotinas e follow-ups",
      "Painel básico de indicadores (macro)",
      "Setup e ativação guiada"
    ],
    buttonText: "Solicitar diagnóstico",
    featured: false
  },
  {
    name: "Performance",
    subtitle: "IA + Tracking avançado + automações",
    price: "Proposta personalizada",
    description: "Solução completa para crescimento acelerado",
    features: [
      "Tudo do Essencial",
      "Tracking de eventos (macro + micro)",
      "Correspondência avançada / server-side (quando necessário)",
      "Dashboards de performance por canal e etapa",
      "IA com relatórios no WhatsApp (resumo + alertas)"
    ],
    buttonText: "Quero o plano Performance",
    featured: true
  },
  {
    name: "Enterprise",
    subtitle: "Gestão Estratégica do Ecossistema (360°)",
    price: "Proposta personalizada",
    description: "Transformação digital completa",
    features: [
      "Tudo do Performance",
      "Gestão 360° (plano de ação)",
      "Otimização contínua de processos e vendas",
      "Integrações avançadas e governança de dados",
      "Acompanhamento estratégico",
      "Account manager dedicado"
    ],
    buttonText: "Falar com um especialista",
    featured: false
  }
];

const Pricing = () => {
  const { openDialog } = useContactDialog();
  const headerAnimation = useScrollAnimation();
  const cardsAnimation = useScrollAnimation();
  
  return (
    <section id="planos" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      <div className="container relative mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Header */}
          <div ref={headerAnimation.ref} className={`text-center space-y-4 scroll-fade-in ${headerAnimation.isVisible ? 'visible' : ''}`}>
            <h2 className="text-4xl md:text-5xl font-bold">
              Planos por maturidade de <span className="text-gradient-primary">ecossistema</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Comece pelo Essencial e evolua para Performance e 360° conforme a maturidade da operação.
            </p>
          </div>

          {/* Pricing Cards */}
          <div ref={cardsAnimation.ref} className={`grid grid-cols-1 md:grid-cols-3 gap-8 ${cardsAnimation.isVisible ? 'visible' : ''}`}>
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative p-8 rounded-2xl border transition-all duration-300 hover:scale-105 scroll-scale-in ${cardsAnimation.isVisible ? 'visible' : ''} ${
                  plan.featured
                    ? 'bg-card border-primary shadow-2xl glow-primary'
                    : 'bg-card border-border hover:border-primary/50'
                }`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                {/* Featured badge */}
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-white text-sm font-semibold">
                    Mais popular
                  </div>
                )}

                <div className="space-y-6">
                  {/* Header */}
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground">{plan.subtitle}</p>
                  </div>

                  {/* Price */}
                  <div className="py-4">
                    <div className="text-4xl font-bold text-gradient-primary">
                      {plan.price}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className={`h-5 w-5 flex-shrink-0 mt-0.5 ${
                          plan.featured ? 'text-primary' : 'text-accent'
                        }`} />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    className={`w-full group ${
                      plan.featured
                        ? 'bg-primary hover:bg-primary/90'
                        : 'bg-secondary hover:bg-secondary/80'
                    }`}
                    size="lg"
                    onClick={() => openDialog()}
                  >
                    {plan.buttonText || "Solicitar proposta"}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <p className="text-center text-sm text-muted-foreground">
            Todos os planos incluem diagnóstico, onboarding e um roadmap de evolução do ecossistema.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
