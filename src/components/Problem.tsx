"use client";

import { AlertCircle, TrendingDown, Database } from "lucide-react";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

// Componente para o ícone SVG customizado do primeiro card
const AIIcon = () => (
  <Image 
    src="/assets/SVG.svg" 
    alt="AI Icon" 
    width={32} 
    height={32} 
    className="text-primary"
  />
);

const problems = [
  {
    title: "Inteligência Artificial inexistente ou isolada",
    description: "Decisões lentas e processos que não escalam."
  },
  {
    icon: TrendingDown,
    title: "Dados sem tracking confiável",
    description: "Você não enxerga vazamentos nem prioridades."
  },
  {
    icon: Database,
    title: "Plataformas desconectadas",
    description: "Retrabalho, erros e perda de eficiência."
  },
  {
    icon: AlertCircle,
    title: "Sem gestão estratégica",
    description: "Esforço alto, direção baixa e resultado imprevisível."
  }
];

const Problem = () => {
  const headerAnimation = useScrollAnimation();
  const cardsAnimation = useScrollAnimation();

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          <div ref={headerAnimation.ref} className={`space-y-4 scroll-fade-in ${headerAnimation.isVisible ? 'visible' : ''}`}>
            <h2 className="text-4xl md:text-5xl font-bold">
              Sem ecossistema, <span style={{ color: '#FF8819' }}>não</span> <span style={{ color: '#FF8819' }}>existe</span> <span style={{ color: '#FF8819' }}>previsibilidade</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Quando dados, processos e estratégia não estão conectados, o crescimento vira aposta
            </p>
          </div>

          <div ref={cardsAnimation.ref} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${cardsAnimation.isVisible ? 'visible' : ''}`}>
            {problems.map((problem, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 group scroll-scale-in ${cardsAnimation.isVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors flex items-center justify-center">
                    {index === 0 ? (
                      <AIIcon />
                    ) : (
                      <problem.icon className="h-8 w-8 text-primary" />
                    )}
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
