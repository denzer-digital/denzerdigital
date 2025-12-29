"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useContactDialog } from "@/contexts/ContactDialogContext";

const About = () => {
  const { openDialog } = useContactDialog();
  
  return <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-start">
            {/* Left side - Content */}
            <div className="space-y-6 animate-fade-in-up text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-bold">
                Sobre a <span className="text-primary">Denzer Digital</span>
              </h2>
              
              <p className="text-lg text-foreground leading-relaxed">
                A Denzer Digital constrói ecossistemas inteligentes que unem IA, tracking, integrações e gestão estratégica para transformar operação em performance previsível.
              </p>

              <p className="text-lg text-foreground leading-relaxed">
                Mais do que executar campanhas, estruturamos a base: dados confiáveis, processos automatizados e tomada de decisão rápida com visão macro e micro da jornada, do gargalo ao plano de ação.
              </p>

              <p className="text-lg text-foreground leading-relaxed">
                <strong>Missão:</strong> tornar a operação digital mais eficiente, inteligente e lucrativa.
              </p>

              {/* CTA Button */}
              <div className="pt-4 flex justify-center md:justify-start">
                <Button 
                  size="lg"
                  className="text-lg px-8 py-6 bg-accent hover:bg-accent/90 glow-accent group"
                  onClick={openDialog}
                >
                  Quero meu diagnóstico
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>

            {/* Right side - Stats */}
            <div className="space-y-6 w-full max-w-md">
              <div className="relative p-8 rounded-2xl bg-card border border-border overflow-hidden w-full">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/15 to-background" />
                <div className="relative space-y-6">
                  <div className="space-y-2">
                    <div className="text-5xl font-bold text-primary">100+</div>
                    <div className="text-lg text-foreground">Projetos entregues com foco em performance e operação</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-5xl font-bold text-accent">+90%</div>
                    <div className="text-lg text-foreground">Mais agilidade na resolução (IA aplicada no suporte)</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-5xl font-bold text-foreground">80%</div>
                    <div className="text-lg text-foreground">Redução média de tempo operacional com automações</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Partner Logos - Below content */}
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
    </section>;
};
export default About;