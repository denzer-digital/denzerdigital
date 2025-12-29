import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useContactDialog } from "@/contexts/ContactDialogContext";

const Hero = () => {
  const { openDialog } = useContactDialog();
  
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-background" aria-label="Hero section">
      {/* Background Gradient - Sutil */}
      <div className="absolute inset-0 z-0">
        {/* Gradiente base sutil */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20" />
        
        {/* Gradiente de detalhe com cores da identidade - muito sutil */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        
        {/* Gradiente radial sutil no centro */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.08)_0%,transparent_50%)]" />
      </div>

      {/* Animated particles overlay - mais partículas para criar profundidade */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Partículas principais */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/60 rounded-full animate-pulse-glow blur-sm" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-accent/60 rounded-full animate-pulse-glow blur-sm" style={{
        animationDelay: '1s'
      }} />
        <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-primary/60 rounded-full animate-pulse-glow blur-sm" style={{
        animationDelay: '2s'
      }} />
        <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-accent/60 rounded-full animate-pulse-glow blur-sm" style={{
        animationDelay: '0.5s'
      }} />
        
        {/* Partículas adicionais para criar profundidade */}
        <div className="absolute top-1/2 left-1/3 w-1.5 h-1.5 bg-primary/40 rounded-full animate-pulse-glow blur-sm" style={{
        animationDelay: '1.5s'
      }} />
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-accent/40 rounded-full animate-pulse-glow blur-sm" style={{
        animationDelay: '2.5s'
      }} />
        <div className="absolute bottom-1/2 left-1/5 w-1 h-1 bg-primary/40 rounded-full animate-pulse-glow blur-sm" style={{
        animationDelay: '0.8s'
      }} />
        <div className="absolute top-1/5 right-1/2 w-1.5 h-1.5 bg-accent/40 rounded-full animate-pulse-glow blur-sm" style={{
        animationDelay: '1.2s'
      }} />
        
        {/* Linhas sutis de conexão (elementos da identidade) */}
        <div className="absolute top-1/4 left-1/4 w-px h-20 bg-gradient-to-b from-primary/20 to-transparent rotate-45" />
        <div className="absolute bottom-1/4 right-1/4 w-px h-16 bg-gradient-to-t from-accent/20 to-transparent -rotate-45" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="mx-auto text-center space-y-8 animate-fade-in-up" style={{ maxWidth: '1330px' }}>
          <h1 className="font-bold leading-tight mx-auto text-3xl md:text-5xl lg:text-[60px]">
            Transforme dados em resultados previsíveis
            com um <span style={{ color: '#FF8819' }}>ecossistema inteligente</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto">A Denzer Digital integra IA, automações e análise de dados para entregar um plano de ação claro, identificar gargalos e garantir controle total sobre a sua operação.</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 glow-primary group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              onClick={openDialog}
              aria-label="Abrir formulário para falar com um especialista"
            >
              Falar com um especialista
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6 border-2 border-primary/50 hover:border-primary hover:bg-primary/10 group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              onClick={() => {
                const element = document.getElementById('experimente-ia');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              aria-label="Ver como funciona - Ir para seção de chat do agente de IA"
            >
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
              Ver como funciona
            </Button>
          </div>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto">Diagnóstico, roadmap e implantação do ecossistema em até 21 dias.</p>

          {/* Trust indicators - Partner Badges */}
          <div className="pt-12" aria-label="Parceiros e certificações">
            {/* Desktop: Grid layout */}
            <div className="hidden md:flex flex-wrap justify-center items-center gap-[10px]" role="list" aria-label="Logos de parceiros">
              <Image src="/assets/shopify.webp" alt="Shopify Partner" width={256} height={256} className="h-12 md:h-16 w-auto object-contain" quality={100} unoptimized />
              <Image src="/assets/rd.webp" alt="RD Station Partner" width={256} height={256} className="h-12 md:h-16 w-auto object-contain" quality={100} unoptimized />
              <a href="https://www.kommo.com/" target="_blank" rel="noopener noreferrer" aria-label="Visitar site do Kommo">
                <Image src="/assets/kommo_nova.svg" alt="Kommo Partner" width={318} height={120} className="h-12 md:h-16 w-auto object-contain" quality={100} unoptimized />
              </a>
              <Image src="/assets/meta.webp" alt="Meta Business Partner" width={256} height={256} className="h-12 md:h-16 w-auto object-contain" quality={100} unoptimized />
              <Image src="/assets/google.webp" alt="Google Partner" width={256} height={256} className="h-12 md:h-16 w-auto object-contain" quality={100} unoptimized />
            </div>

            {/* Mobile: Carousel */}
            <div className="md:hidden w-full max-w-sm mx-auto" role="region" aria-label="Carrossel de parceiros">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                plugins={[
                  Autoplay({
                    delay: 3000,
                  }),
                ]}
                className="w-full"
                aria-label="Carrossel de parceiros"
              >
                <CarouselContent>
                  <CarouselItem className="basis-1/3">
                    <div className="flex justify-center">
                      <Image src="/assets/shopify.webp" alt="Shopify Partner" width={256} height={256} className="h-12 w-auto object-contain" loading="lazy" quality={100} unoptimized />
                    </div>
                  </CarouselItem>
                  <CarouselItem className="basis-1/3">
                    <div className="flex justify-center">
                      <Image src="/assets/rd.webp" alt="RD Station Partner" width={256} height={256} className="h-12 w-auto object-contain" loading="lazy" quality={100} unoptimized />
                    </div>
                  </CarouselItem>
                  <CarouselItem className="basis-1/3">
                    <div className="flex justify-center">
                      <a href="https://www.kommo.com/" target="_blank" rel="noopener noreferrer" aria-label="Visitar site do Kommo">
                        <Image src="/assets/kommo_nova.svg" alt="Kommo Partner" width={318} height={120} className="h-12 w-auto object-contain" loading="lazy" quality={100} unoptimized />
                      </a>
                    </div>
                  </CarouselItem>
                  <CarouselItem className="basis-1/3">
                    <div className="flex justify-center">
                      <Image src="/assets/meta.webp" alt="Meta Business Partner" width={256} height={256} className="h-12 w-auto object-contain" loading="lazy" quality={100} unoptimized />
                    </div>
                  </CarouselItem>
                  <CarouselItem className="basis-1/3">
                    <div className="flex justify-center">
                      <Image src="/assets/google.webp" alt="Google Partner" width={256} height={256} className="h-12 w-auto object-contain" loading="lazy" quality={100} unoptimized />
                    </div>
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>;
};
export default Hero;