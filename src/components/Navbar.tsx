import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useContactDialog } from "@/contexts/ContactDialogContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { openDialog } = useContactDialog();

  const scrollToSection = (id: string, e?: React.MouseEvent<HTMLAnchorElement>) => {
    e?.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border" role="navigation" aria-label="Navegação principal">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" aria-label="Denzer Digital - Página inicial">
              <Image
                src="/assets/logo_header.webp"
                alt="Denzer Digital AI Systems"
                width={200}
                height={48}
                className="h-12 w-auto"
                priority
                quality={100}
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-8 list-none" role="menubar">
            <li role="none">
              <a 
                href="#solucoes" 
                onClick={(e) => scrollToSection('solucoes', e)}
                className="text-sm font-medium hover:text-primary transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:rounded px-2 py-1"
                role="menuitem"
              >
                Soluções
              </a>
            </li>
            <li role="none">
              <a 
                href="#resultados" 
                onClick={(e) => scrollToSection('resultados', e)}
                className="text-sm font-medium hover:text-primary transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:rounded px-2 py-1"
                role="menuitem"
              >
                Resultados
              </a>
            </li>
            <li role="none">
              <a 
                href="#como-funciona" 
                onClick={(e) => scrollToSection('como-funciona', e)}
                className="text-sm font-medium hover:text-primary transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:rounded px-2 py-1"
                role="menuitem"
              >
                Como Funciona
              </a>
            </li>
            <li role="none">
              <a 
                href="#planos" 
                onClick={(e) => scrollToSection('planos', e)}
                className="text-sm font-medium hover:text-primary transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:rounded px-2 py-1"
                role="menuitem"
              >
                Planos
              </a>
            </li>
            <li role="none">
              <Button 
                size="sm"
                className="bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                onClick={openDialog}
                aria-label="Abrir formulário para falar com especialista"
              >
                Falar com especialista
              </Button>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div id="mobile-menu" className="md:hidden py-4 border-t border-border" role="menu" aria-label="Menu mobile">
            <ul className="flex flex-col space-y-4 list-none">
              <li role="none">
                <a
                  href="#solucoes"
                  onClick={(e) => scrollToSection('solucoes', e)}
                  className="text-sm font-medium hover:text-primary transition-colors text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:rounded px-2 py-1 block"
                  role="menuitem"
                >
                  Soluções
                </a>
              </li>
              <li role="none">
                <a
                  href="#resultados"
                  onClick={(e) => scrollToSection('resultados', e)}
                  className="text-sm font-medium hover:text-primary transition-colors text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:rounded px-2 py-1 block"
                  role="menuitem"
                >
                  Resultados
                </a>
              </li>
              <li role="none">
                <a
                  href="#como-funciona"
                  onClick={(e) => scrollToSection('como-funciona', e)}
                  className="text-sm font-medium hover:text-primary transition-colors text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:rounded px-2 py-1 block"
                  role="menuitem"
                >
                  Como Funciona
                </a>
              </li>
              <li role="none">
                <a
                  href="#planos"
                  onClick={(e) => scrollToSection('planos', e)}
                  className="text-sm font-medium hover:text-primary transition-colors text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:rounded px-2 py-1 block"
                  role="menuitem"
                >
                  Planos
                </a>
              </li>
              <li role="none">
                <Button 
                  size="sm"
                  className="bg-primary hover:bg-primary/90 w-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  onClick={openDialog}
                  aria-label="Abrir formulário para falar com especialista"
                >
                  Falar com especialista
                </Button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
