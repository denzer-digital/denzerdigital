import { AlertCircle, Clock, TrendingDown, Database } from "lucide-react";

const problems = [
  {
    icon: Clock,
    title: "Atendimento lento e caro",
    description: "Equipe humana limitada e custos crescentes"
  },
  {
    icon: TrendingDown,
    title: "Equipes sobrecarregadas",
    description: "Sem tempo para o que realmente importa"
  },
  {
    icon: Database,
    title: "Dados dispersos",
    description: "Falta de automação e integração"
  },
  {
    icon: AlertCircle,
    title: "Loja sem inteligência",
    description: "E-commerce não otimizado para conversão"
  }
];

const Problem = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          <div className="space-y-4 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold">
              Os desafios do digital em <span className="text-gradient-accent">2025</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Enquanto sua concorrência evolui, esses problemas custam caro
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {problems.map((problem, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <problem.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{problem.title}</h3>
                  <p className="text-sm text-muted-foreground">{problem.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
