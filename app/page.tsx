"use client";

import { useLayoutEffect, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";

// Componentes acima da dobra - carregados normalmente
// Componentes abaixo da dobra - lazy loaded
const Solution = dynamic(() => import("@/components/Solution"), {
  loading: () => <div className="min-h-[400px]" />,
});
const Results = dynamic(() => import("@/components/Results"), {
  loading: () => <div className="min-h-[400px]" />,
});
const Demo = dynamic(() => import("@/components/Demo"), {
  loading: () => <div className="min-h-[400px]" />,
});
const HowItWorks = dynamic(() => import("@/components/HowItWorks"), {
  loading: () => <div className="min-h-[400px]" />,
});
const Pricing = dynamic(() => import("@/components/Pricing"), {
  loading: () => <div className="min-h-[400px]" />,
});
const About = dynamic(() => import("@/components/About"), {
  loading: () => <div className="min-h-[400px]" />,
});
const FinalCTA = dynamic(() => import("@/components/FinalCTA"), {
  loading: () => <div className="min-h-[200px]" />,
});
const ContactSection = dynamic(() => import("@/components/ContactSection"), {
  loading: () => <div className="min-h-[300px]" />,
});
const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <div className="min-h-[200px]" />,
});
// ContactFormDialog - modal, pode ser carregado apenas quando necessário
const ContactFormDialog = dynamic(() => import("@/components/ContactFormDialog"), {
  ssr: false,
});

export default function Home() {
  const searchParams = useSearchParams();
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Calcula a posição considerando o navbar fixo (80px)
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 80;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      return true;
    }
    return false;
  };

  useLayoutEffect(() => {
    // Verifica se há uma âncora na URL ao carregar a página
    const hash = window.location.hash;
    if (hash) {
      const id = hash.substring(1);
      // Aguarda para garantir que os componentes carregaram
      const attemptScroll = (retries = 5) => {
        if (scrollToSection(id) || retries === 0) {
          return;
        }
        setTimeout(() => attemptScroll(retries - 1), 200);
      };
      setTimeout(() => attemptScroll(), 300);
    } else {
      // Se não houver âncora, garante que a página comece no topo
      window.scrollTo(0, 0);
    }
  }, []);
  
  // Escuta mudanças no hash (quando navega de outra página ou clica em link)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.substring(1);
        setTimeout(() => {
          scrollToSection(id);
        }, 300);
      }
    };
    
    // Verifica hash periodicamente (para casos onde hashchange não dispara)
    const checkHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.substring(1);
        if (!document.getElementById(id)) {
          // Elemento ainda não carregou, tenta novamente
          setTimeout(checkHash, 200);
        } else {
          scrollToSection(id);
        }
      }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    
    // Verifica hash após um delay inicial (para componentes lazy-loaded)
    setTimeout(checkHash, 500);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <main id="main-content" className="min-h-screen bg-background" role="main">
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <Results />
      <Demo />
      <HowItWorks />
      <Pricing />
      <About />
      <FinalCTA />
      <ContactSection />
      <Footer />
      <ContactFormDialog />
    </main>
  );
}

