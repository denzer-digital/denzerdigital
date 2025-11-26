import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo_header.webp";
import { useContactDialog } from "@/contexts/ContactDialogContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { openDialog } = useContactDialog();

  const scrollToSection = (id: string) => {
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
            <img 
              src={logo} 
              alt="Denzer Digital AI Systems" 
              className="h-12 w-auto"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('solucoes')}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Soluções
            </button>
            <button
              onClick={() => scrollToSection('resultados')}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Resultados
            </button>
            <button
              onClick={() => scrollToSection('como-funciona')}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Como Funciona
            </button>
            <button
              onClick={() => scrollToSection('planos')}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Planos
            </button>
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
              <button
                onClick={() => scrollToSection('solucoes')}
                className="text-sm font-medium hover:text-primary transition-colors text-left"
              >
                Soluções
              </button>
              <button
                onClick={() => scrollToSection('resultados')}
                className="text-sm font-medium hover:text-primary transition-colors text-left"
              >
                Resultados
              </button>
              <button
                onClick={() => scrollToSection('como-funciona')}
                className="text-sm font-medium hover:text-primary transition-colors text-left"
              >
                Como Funciona
              </button>
              <button
                onClick={() => scrollToSection('planos')}
                className="text-sm font-medium hover:text-primary transition-colors text-left"
              >
                Planos
              </button>
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
