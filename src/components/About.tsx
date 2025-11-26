import rdPartner from "@/assets/rd.webp";
import kommoPartner from "@/assets/kommo.webp";
import metaRetangulo from "@/assets/meta_retangulo.webp";
import googleRetangulo from "@/assets/google_retangulo.webp";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useContactDialog } from "@/contexts/ContactDialogContext";

const badges = [{
  image: shopifyPartner,
  alt: "Shopify Partner"
}, {
  image: rdPartner,
  alt: "RD Station Partner"
}, {
  image: kommoPartner,
  alt: "Kommo Partner"
}, {
  image: metaRetangulo,
  alt: "Meta Business Partner"
}, {
  image: googleRetangulo,
  alt: "Google Partner"
}];
const About = () => {
  const { openDialog } = useContactDialog();
  
  return <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-start">
            {/* Left side - Content */}
            <div className="space-y-6 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold">
                Sobre a <span className="text-primary">Denzer Digital</span>
              </h2>
              
              <p className="text-lg text-foreground leading-relaxed">
                A Denzer Digital une tecnologia, Inteligência Artificial, automação, dados e estratégia para transformar a operação digital de empresas com eficiência, precisão e inteligência aplicada.
              </p>

              <p className="text-lg text-foreground leading-relaxed">
                Atuamos como um ecossistema completo, entregando soluções que vão desde agentes de IA e automações avançadas até e-commerce, performance e gestão operacional tudo integrado para gerar eficiência real e resultados consistentes.
              </p>

              <p className="text-lg text-foreground leading-relaxed">
                Nossa missão é tornar soluções inteligentes acessíveis, eficazes e de alto impacto, ajudando negócios a operarem de forma mais rápida, estruturada e lucrativa.
              </p>

              {/* CTA Button */}
              <div className="pt-4">
                <Button 
                  size="lg"
                  className="text-lg px-8 py-6 bg-accent hover:bg-accent/90 glow-accent group"
                  onClick={openDialog}
                >
                  Quero implementar agora
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>

            {/* Right side - Stats and Partners */}
            <div className="space-y-6 w-full max-w-md">
              <div className="relative p-8 rounded-2xl bg-card border border-border overflow-hidden w-full">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/15 to-background" />
                <div className="relative space-y-6">
                  <div className="space-y-2">
                    <div className="text-5xl font-bold text-primary">100+</div>
                    <div className="text-lg text-foreground">Projetos entregues</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-5xl font-bold text-accent">+90%</div>
                    <div className="text-lg text-foreground">Resolução mais rápida na primeira hora com IA no suporte do cliente</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-5xl font-bold text-foreground">80%</div>
                    <div className="text-lg text-foreground">Redução média de tempo operacional</div>
                  </div>
                </div>
              </div>

              {/* Partner Logos - 2 linhas */}
              <div className="w-full flex flex-col gap-4 items-center">
                {/* Primeira linha: 3 logos */}
                <div className="hidden md:flex gap-[10px] justify-start">
                  <div className="bg-white rounded-lg p-3 border border-border/50 flex items-center justify-center flex-shrink-0">
                    <img src={shopifyPartner} alt="Shopify Partner" className="h-14 object-contain" />
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-border/50 flex items-center justify-center flex-shrink-0">
                    <img src={rdPartner} alt="RD Station Partner" className="h-14 object-contain" />
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-border/50 flex items-center justify-center flex-shrink-0">
                    <img src={kommoPartner} alt="Kommo Partner" className="h-14 object-contain" />
                  </div>
                </div>
                
                {/* Segunda linha: meta_retangulo e google_retangulo */}
                <div className="hidden md:flex gap-[10px] justify-start">
                  <div className="bg-white rounded-lg p-3 border border-border/50 flex items-center justify-center flex-shrink-0">
                    <img src={metaRetangulo} alt="Meta Business Partner" className="h-14 object-contain" />
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-border/50 flex items-center justify-center flex-shrink-0">
                    <img src={googleRetangulo} alt="Google Partner" className="h-14 object-contain" />
                  </div>
                </div>

                {/* Mobile: Carousel */}
                <div className="md:hidden w-full max-w-xs">
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
                      {badges.map((badge, index) => (
                        <CarouselItem key={index} className="basis-1/3">
                          <div className="flex justify-center">
                            <img src={badge.image} alt={badge.alt} className="h-16 object-contain bg-white rounded-lg p-2" />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default About;