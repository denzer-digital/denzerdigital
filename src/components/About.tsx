import shopifyPartner from "@/assets/shopify-partner.png";
import metaPartner from "@/assets/meta-partner.png";
import rdstationPartner from "@/assets/rdstation-partner.png";
const badges = [{
  image: shopifyPartner,
  alt: "Shopify Partner"
}, {
  image: metaPartner,
  alt: "Meta Business Partner"
}, {
  image: rdstationPartner,
  alt: "RD Station Partner"
}];
const About = () => {
  return <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div className="space-y-6 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold">
                Sobre a <span className="text-gradient-primary">Denzer Digital</span>
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                A Denzer Digital AI Systems une tecnologia, dados e estratégia para 
                transformar a gestão digital de empresas no Brasil.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Nossa missão é democratizar o acesso a soluções de inteligência artificial 
                de ponta, tornando-as acessíveis e eficazes para negócios de todos os tamanhos.
              </p>

              {/* Badges */}
              <div className="pt-6 flex flex-wrap gap-6">
                {badges.map((badge, index) => <img key={index} src={badge.image} alt={badge.alt} className="h-16 object-contain opacity-90 hover:opacity-100 transition-opacity" />)}
              </div>
            </div>

            {/* Right side - Stats */}
            <div className="space-y-6">
              <div className="relative p-8 rounded-2xl bg-card border border-border overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
                <div className="relative space-y-6">
                  <div className="space-y-2">
                    <div className="text-5xl font-bold text-gradient-primary">100+</div>
                    <div className="text-lg">Projetos entregues</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-5xl font-bold text-gradient-accent">95%</div>
                    <div className="text-lg">Satisfação dos clientes</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-5xl font-bold text-gradient-primary">24/7</div>
                    <div className="text-lg">Suporte disponível</div>
                  </div>
                </div>
              </div>

              {/* Team mockup */}
              <div className="relative p-6 rounded-2xl bg-card border border-border">
                <div className="flex -space-x-4">
                  {[...Array(4)].map((_, i) => <div key={i} className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-card" />)}
                  <div className="w-12 h-12 rounded-full bg-secondary border-2 border-card flex items-center justify-center text-sm font-semibold">
                    +12
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Time de especialistas em IA, desenvolvimento e estratégia digital
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default About;