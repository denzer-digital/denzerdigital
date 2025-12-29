import { Button } from "@/components/ui/button";
import { MessageCircle, Calendar, ArrowRight } from "lucide-react";
import { useContactDialog } from "@/contexts/ContactDialogContext";

const FinalCTA = () => {
  const { openDialog } = useContactDialog();
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20" />
      
      {/* Animated elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" />
      
      <div className="container relative mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Content */}
          <div className="space-y-6 animate-fade-in-up">
            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              Sua operação digital pode ser{" "}
              <span className="text-gradient-primary">até 10x mais inteligente</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Converse com um especialista e veja como integrar IA, dados e estratégia em um ecossistema que gera previsibilidade e escala.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 bg-accent hover:bg-accent/90 glow-accent group"
              onClick={openDialog}
            >
              <MessageCircle className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Falar via WhatsApp
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6 border-2 border-primary/50 hover:border-primary hover:bg-primary/10 group"
              onClick={openDialog}
            >
              <Calendar className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Agendar diagnóstico estratégico
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gradient-primary">Grátis</div>
              <div className="text-sm text-muted-foreground">Diagnóstico estratégico sem custo</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gradient-accent">21 dias</div>
              <div className="text-sm text-muted-foreground">Ecossistema implantado em até 21 dias</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gradient-primary">ROI positivo</div>
              <div className="text-sm text-muted-foreground">Foco em previsibilidade e retorno desde o início</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
