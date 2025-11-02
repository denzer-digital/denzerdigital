import { Linkedin, Instagram, Youtube } from "lucide-react";
import logo from "@/assets/denzer-logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Logo and Description */}
            <div className="md:col-span-2 space-y-4">
              <img 
                src={logo} 
                alt="Denzer Digital AI Systems" 
                className="h-10 w-auto"
              />
              <p className="text-sm text-muted-foreground max-w-md">
                Transformando operações digitais através de inteligência artificial, 
                estratégia e tecnologia de ponta.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-4 pt-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5 text-primary" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5 text-primary" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="h-5 w-5 text-primary" />
                </a>
              </div>
            </div>

            {/* Links Column 1 */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Soluções</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Agentes de IA
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    E-commerce Shopify
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Gestão Digital 360°
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Consultoria
                  </a>
                </li>
              </ul>
            </div>

            {/* Links Column 2 */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Empresa</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Sobre nós
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Casos de sucesso
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Contato
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Suporte
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#" className="hover:text-primary transition-colors">
                Política de Privacidade
              </a>
              <span>•</span>
              <a href="#" className="hover:text-primary transition-colors">
                Termos de Uso
              </a>
            </div>
            
            <div className="text-center md:text-right">
              <p>© 2025 Denzer Digital AI Systems. Todos os direitos reservados.</p>
              <p className="text-xs mt-1">Powered by Denzer Digital</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
