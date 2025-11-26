import { TrendingUp, Clock, DollarSign } from "lucide-react";

const results = [
  {
    icon: Clock,
    value: "-91,4%",
    label: "no tempo de resposta",
    description: "pela IA no WhatsApp"
  },
  {
    icon: TrendingUp,
    value: "+515%",
    label: "de atendimentos processados",
    description: "pela IA no WhatsApp"
  },
  {
    icon: DollarSign,
    value: "R$150 mil",
    label: "adicionais com 764 vendas",
    description: "no mês com IA integrada"
  },
  {
    icon: TrendingUp,
    value: "+52%",
    label: "de aumento na velocidade do site",
    description: "em e-commerces desenvolvidos pela Denzer Digital"
  },
  {
    icon: TrendingUp,
    value: "+214%",
    label: "de aumento na taxa de Conversão",
    description: "em e-commerces desenvolvidos pela Denzer Digital"
  },
  {
    icon: DollarSign,
    value: "+5,4x",
    label: "mais eficiência operacional total",
    description: "combinando IA + Performance + E-commerce Shopify"
  }
];

const Results = () => {
  return (
    <section id="resultados" className="py-24 bg-gradient-to-b from-background via-secondary/20 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Header */}
          <div className="text-center space-y-4 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold">
              Resultados <span className="text-gradient-accent">comprovados</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Transformamos operações digitais em máquinas de crescimento
            </p>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {results.map((result, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-card border border-border text-center space-y-6"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/30 flex items-center justify-center">
                    <result.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="space-y-3">
                  {/* Main Metric */}
                  <div className="text-5xl md:text-6xl font-bold text-primary">
                    {result.value}
                  </div>
                  
                  {/* Label */}
                  <div className="text-lg font-medium text-white">
                    {result.label}
                  </div>
                  
                  {/* Description */}
                  <div className="text-sm text-white/80">
                    {result.description}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Results;
