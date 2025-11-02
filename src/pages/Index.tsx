import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import Results from "@/components/Results";
import Demo from "@/components/Demo";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import About from "@/components/About";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
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
      <Footer />
    </div>
  );
};

export default Index;
