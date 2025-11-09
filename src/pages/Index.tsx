import { useEffect } from "react";
import Hero from "@/components/Hero";
import ValueStats from "@/components/ValueStats";
import AdsEngagement from "@/components/AdsEngagement";
import Features from "@/components/Features";
import Industries from "@/components/Industries";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AboutDialog from "@/components/AboutDialog";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Index = () => {
  useScrollReveal();

  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <ValueStats />
      <AdsEngagement />
      <Industries />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <FAQ />
      <div id="contact">
        <Contact />
      </div>
      <Footer />
      <AboutDialog />
    </main>
  );
};

export default Index;
