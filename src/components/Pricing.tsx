import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Essencial",
    subtitle: "IA + Atendimento",
    price: "sob consulta",
    description: "Perfeito para começar com automação inteligente",
    features: [
      "Agente de IA para WhatsApp",
      "Chatbot no site",
      "Integração com CRM",
      "Relatórios básicos",
      "Suporte por email"
    ],
    featured: false
  },
  {
    name: "Performance",
    subtitle: "IA + Shopify + Marketing",
    price: "sob consulta",
    description: "Solução completa para crescimento acelerado",
    features: [
      "Tudo do Essencial",
      "Loja Shopify otimizada",
      "Gestão de mídia paga",
      "Automações avançadas",
      "Dashboard analytics",
      "Suporte prioritário"
    ],
    featured: true
  },
  {
    name: "Enterprise",
    subtitle: "Gestão 360° + IA Avançada",
    price: "sob consulta",
    description: "Transformação digital completa",
    features: [
      "Tudo do Performance",
      "IA personalizada",
      "Integrações ilimitadas",
      "Consultoria estratégica",
      "Suporte 24/7",
      "Account manager dedicado"
    ],
    featured: false
  }
];

const Pricing = () => {
  return (
    <section id="planos" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      <div className="container relative mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Header */}
          <div className="text-center space-y-4 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold">
              Planos que se adaptam ao seu <span className="text-gradient-primary">crescimento</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Escolha a solução ideal para o momento do seu negócio
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative p-8 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                  plan.featured
                    ? 'bg-card border-primary shadow-2xl glow-primary'
                    : 'bg-card border-border hover:border-primary/50'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
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
                  >
                    Solicitar proposta
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <p className="text-center text-sm text-muted-foreground">
            Todos os planos incluem período de testes e garantia de satisfação
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
