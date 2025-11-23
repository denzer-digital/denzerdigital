import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bot, Compass, ShoppingBag, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const servicesData = {
  "agentes-ia": {
    icon: Bot,
    title: "Agentes de IA",
    subtitle: "Automação inteligente para atendimento e vendas",
    description: "Transforme a experiência do seu cliente com agentes de IA que entendem, respondem e vendem 24/7.",
    gradient: "from-primary to-primary-glow",
    benefits: [
      "Atendimento automatizado via WhatsApp",
      "Integração com site e redes sociais",
      "Respostas personalizadas e contextuais",
      "Aprendizado contínuo com cada interação",
      "Qualificação automática de leads",
      "Transferência inteligente para humanos"
    ],
    features: [
      {
        title: "WhatsApp Business",
        description: "Atendimento completo via WhatsApp com respostas instantâneas e naturais."
      },
      {
        title: "Multi-canal",
        description: "Um agente, múltiplos canais: site, Instagram, Facebook e mais."
      },
      {
        title: "IA Conversacional",
        description: "Entende intenção, contexto e mantém conversas naturais com seus clientes."
      }
    ]
  },
  "gestao-digital": {
    icon: Compass,
    title: "Gestão Digital 360°",
    subtitle: "Estratégia, mídia e automação baseadas em dados",
    description: "Planejamento completo e execução de campanhas digitais com inteligência artificial.",
    gradient: "from-accent to-accent-glow",
    benefits: [
      "Planejamento estratégico personalizado",
      "Gestão de mídia paga (Meta, Google)",
      "Automações de marketing inteligentes",
      "Análise de dados e otimização contínua",
      "Integração com CRM e ferramentas",
      "Relatórios e insights em tempo real"
    ],
    features: [
      {
        title: "Estratégia Data-Driven",
        description: "Decisões baseadas em dados reais e comportamento do seu público."
      },
      {
        title: "Automação RD Station",
        description: "Nutrição automática de leads e automações inteligentes de marketing."
      },
      {
        title: "Performance Marketing",
        description: "Campanhas otimizadas para máximo ROI em Meta Ads e Google Ads."
      }
    ]
  },
  "ecommerce-shopify": {
    icon: ShoppingBag,
    title: "E-commerce Shopify",
    subtitle: "Lojas virtuais de alta performance",
    description: "Crie e escale seu e-commerce com a plataforma líder mundial, potencializada por IA.",
    gradient: "from-primary to-accent",
    benefits: [
      "Loja Shopify completa e personalizada",
      "Integração nativa com agentes de IA",
      "Checkout otimizado para conversão",
      "Gestão de estoque e pedidos automatizada",
      "Integração com marketplaces",
      "Suporte e manutenção contínua"
    ],
    features: [
      {
        title: "Shopify Plus",
        description: "Plataforma robusta e escalável, confiada por milhões de lojas no mundo."
      },
      {
        title: "IA Integrada",
        description: "Agentes de IA nativos para atendimento, recomendações e vendas automatizadas."
      },
      {
        title: "Alta Performance",
        description: "Otimização de velocidade, SEO e conversão desde o primeiro dia."
      }
    ]
  }
};

const Services = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  
  const service = serviceId && servicesData[serviceId as keyof typeof servicesData];

  if (!service) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Serviço não encontrado</h1>
          <Button onClick={() => navigate("/")}>Voltar para home</Button>
        </div>
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
        
        <div className="container relative mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-8 group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Voltar
          </Button>

          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in-up">
            <div className={`inline-flex p-6 rounded-2xl bg-gradient-to-br ${service.gradient} mb-4`}>
              <Icon className="h-16 w-16 text-white" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold">
              {service.title}
            </h1>
            
            <p className="text-2xl text-muted-foreground">
              {service.subtitle}
            </p>
            
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
              {service.description}
            </p>

            <div className="pt-6">
              <Button 
                size="lg"
                className={`text-lg px-8 py-6 bg-gradient-to-r ${service.gradient} hover:shadow-lg hover:scale-105 transition-all duration-300`}
                onClick={() => {
                  const demoSection = document.getElementById("demonstracao");
                  if (demoSection) {
                    navigate("/");
                    setTimeout(() => {
                      demoSection.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }
                }}
              >
                Testar Agora
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Benefícios e <span className="text-gradient-primary">Recursos</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {service.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-all"
                >
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <span className="text-lg">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {service.features.map((feature, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all hover:scale-105"
                >
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6 p-12 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
            <h2 className="text-3xl md:text-4xl font-bold">
              Pronto para transformar seu negócio?
            </h2>
            <p className="text-xl text-muted-foreground">
              Converse com nossos especialistas e descubra como podemos ajudar.
            </p>
            <Button 
              size="lg"
              className={`text-lg px-8 py-6 bg-gradient-to-r ${service.gradient} hover:shadow-lg hover:scale-105 transition-all duration-300`}
              onClick={() => {
                const demoSection = document.getElementById("demonstracao");
                if (demoSection) {
                  navigate("/");
                  setTimeout(() => {
                    demoSection.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }
              }}
            >
              Falar com Especialista
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;