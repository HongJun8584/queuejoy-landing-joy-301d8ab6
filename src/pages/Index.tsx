import Hero from "@/components/Hero";
import QuickBenefits from "@/components/QuickBenefits";
import Features from "@/components/Features";
import Industries from "@/components/Industries";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <QuickBenefits />
      <Features />
      <Industries />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <FAQ />
      <div id="contact">
        <Contact />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
