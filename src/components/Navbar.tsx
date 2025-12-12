import Link from "next/link";
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <img
                src="/assets/logo_header.webp"
                alt="Denzer Digital AI Systems"
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a 
              href="#solucoes" 
              onClick={(e) => scrollToSection('solucoes', e)}
              className="text-sm font-medium hover:text-primary transition-colors cursor-pointer"
            >
              Soluções
            </a>
            <a 
              href="#resultados" 
              onClick={(e) => scrollToSection('resultados', e)}
              className="text-sm font-medium hover:text-primary transition-colors cursor-pointer"
            >
              Resultados
            </a>
            <a 
              href="#como-funciona" 
              onClick={(e) => scrollToSection('como-funciona', e)}
              className="text-sm font-medium hover:text-primary transition-colors cursor-pointer"
            >
              Como Funciona
            </a>
            <a 
              href="#planos" 
              onClick={(e) => scrollToSection('planos', e)}
              className="text-sm font-medium hover:text-primary transition-colors cursor-pointer"
            >
              Planos
            </a>
            <Button 
              size="sm"
              className="bg-primary hover:bg-primary/90"
              onClick={openDialog}
            >
              Falar com especialista
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <a
                href="#solucoes"
                onClick={(e) => scrollToSection('solucoes', e)}
                className="text-sm font-medium hover:text-primary transition-colors text-left cursor-pointer"
              >
                Soluções
              </a>
              <a
                href="#resultados"
                onClick={(e) => scrollToSection('resultados', e)}
                className="text-sm font-medium hover:text-primary transition-colors text-left cursor-pointer"
              >
                Resultados
              </a>
              <a
                href="#como-funciona"
                onClick={(e) => scrollToSection('como-funciona', e)}
                className="text-sm font-medium hover:text-primary transition-colors text-left cursor-pointer"
              >
                Como Funciona
              </a>
              <a
                href="#planos"
                onClick={(e) => scrollToSection('planos', e)}
                className="text-sm font-medium hover:text-primary transition-colors text-left cursor-pointer"
              >
                Planos
              </a>
              <Button 
                size="sm"
                className="bg-primary hover:bg-primary/90 w-full"
                onClick={openDialog}
              >
                Falar com especialista
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
