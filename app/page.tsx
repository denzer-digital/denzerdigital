"use client";

import { useLayoutEffect } from "react";
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
  useLayoutEffect(() => {
    // Garante que a página comece no topo
    window.scrollTo(0, 0);
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

