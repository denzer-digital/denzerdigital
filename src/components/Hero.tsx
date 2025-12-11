import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useContactDialog } from "@/contexts/ContactDialogContext";

const Hero = () => {
  const { openDialog } = useContactDialog();
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0" style={{
      backgroundImage: `url(${heroBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background" />
      </div>

      {/* Animated particles overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-accent rounded-full animate-pulse-glow" style={{
        animationDelay: '1s'
      }} />
        <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-primary rounded-full animate-pulse-glow" style={{
        animationDelay: '2s'
      }} />
        <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-accent rounded-full animate-pulse-glow" style={{
        animationDelay: '0.5s'
      }} />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Sua empresa + Inteligência Artificial ={" "}
            <span className="text-gradient-primary">Lucro em Escala</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">Agentes de IA que vendem, atendem e otimizam sua operação digital integrados à sua loja Shopify e à sua estratégia de marketing.</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 glow-primary group"
              onClick={openDialog}
            >
              Falar com um especialista
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 border-2 border-primary/50 hover:border-primary hover:bg-primary/10 group"
              onClick={() => scrollToSection('experimente-ia')}
            >
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Ver como funciona
            </Button>
          </div>

          {/* Trust indicators - Partner Badges */}
          <div className="pt-12">
            {/* Desktop: Grid layout */}
            <div className="hidden md:flex flex-wrap justify-center items-center gap-[10px]">
              <img src="/assets/shopify.webp" alt="Shopify Partner" className="h-12 md:h-16 object-contain" />
              <img src="/assets/rd.webp" alt="RD Station Partner" className="h-12 md:h-16 object-contain" />
              <img src="/assets/kommo.webp" alt="Kommo Partner" className="h-12 md:h-16 object-contain" />
              <img src="/assets/meta.webp" alt="Meta Business Partner" className="h-12 md:h-16 object-contain" />
              <img src="/assets/google.webp" alt="Google Partner" className="h-12 md:h-16 object-contain" />
            </div>

            {/* Mobile: Carousel */}
            <div className="md:hidden w-full max-w-sm mx-auto">
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
              >
                <CarouselContent>
                  <CarouselItem className="basis-1/3">
                    <div className="flex justify-center">
                      <img src="/assets/shopify.webp" alt="Shopify Partner" className="h-12 object-contain" />
                    </div>
                  </CarouselItem>
                  <CarouselItem className="basis-1/3">
                    <div className="flex justify-center">
                      <img src="/assets/rd.webp" alt="RD Station Partner" className="h-12 object-contain" />
                    </div>
                  </CarouselItem>
                  <CarouselItem className="basis-1/3">
                    <div className="flex justify-center">
                      <img src="/assets/kommo.webp" alt="Kommo Partner" className="h-12 object-contain" />
                    </div>
                  </CarouselItem>
                  <CarouselItem className="basis-1/3">
                    <div className="flex justify-center">
                      <img src="/assets/meta.webp" alt="Meta Business Partner" className="h-12 object-contain" />
                    </div>
                  </CarouselItem>
                  <CarouselItem className="basis-1/3">
                    <div className="flex justify-center">
                      <img src="/assets/google.webp" alt="Google Partner" className="h-12 object-contain" />
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