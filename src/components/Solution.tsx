import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bot, Compass, ShoppingBag, ArrowRight } from "lucide-react";

const solutions = [
  {
    icon: Bot,
    title: "Agentes de IA",
    description: "Atendimento e vendas automatizados via WhatsApp, site e redes sociais.",
    gradient: "from-primary to-primary-glow",
    href: "/agentes-de-ia",
  },
  {
    icon: Compass,
    title: "Gestão Digital 360°",
    description: "Planejamento, mídia e automações inteligentes baseadas em dados.",
    gradient: "from-accent to-accent-glow",
    href: "/gestao-digital-360",
  },
  {
    icon: ShoppingBag,
    title: "E-commerce Shopify",
    description: "Lojas de alta performance integradas com IA e automações nativas.",
    gradient: "from-primary to-accent",
    href: "/ecommerce-shopify",
  }
];

const Solution = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section id="solucoes" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      <div className="container relative mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold">
              O ecossistema <span className="text-gradient-primary">Denzer Digital AI</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Três pilares integrados para transformar seu negócio digital
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${solution.gradient}`}>
                    <solution.icon className="h-8 w-8 text-white" />
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
            <Button 
              size="lg"
              className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg hover:scale-105 transition-all duration-300 group"
              onClick={() => scrollToSection('experimente-ia')}
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
