import { TrendingUp, Clock, DollarSign, Star } from "lucide-react";

const results = [
  {
    icon: TrendingUp,
    value: "+38%",
    label: "em conversões",
    description: "na loja Shopify"
  },
  {
    icon: Clock,
    value: "-70%",
    label: "no tempo de resposta",
    description: "no WhatsApp"
  },
  {
    icon: DollarSign,
    value: "R$240 mil",
    label: "adicionais",
    description: "no trimestre com IA integrada"
  }
];

const testimonials = [
  {
    name: "Carlos Silva",
    role: "CEO, Loja Virtual Premium",
    content: "A automação com IA aumentou nossas vendas em 40% no primeiro mês.",
    rating: 5
  },
  {
    name: "Marina Costa",
    role: "Diretora de Marketing, TechStore",
    content: "Reduzimos custos e melhoramos a experiência do cliente simultaneamente.",
    rating: 5
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {results.map((result, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 text-center space-y-4"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <result.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <div className="text-5xl font-bold text-gradient-primary">
                    {result.value}
                  </div>
                  <div className="text-xl font-semibold">{result.label}</div>
                  <div className="text-sm text-muted-foreground">{result.description}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-card border border-border hover:border-accent/50 transition-all duration-300 space-y-4"
              >
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-lg italic text-muted-foreground">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4 pt-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent" />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
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
