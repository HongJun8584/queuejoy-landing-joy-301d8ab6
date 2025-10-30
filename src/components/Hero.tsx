import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import { useState } from "react";
import heroMockup from "@/assets/hero-mockup.png";
import Toast from "./Toast";

const Hero = () => {
  const [showToast, setShowToast] = useState(false);

  const handleDemoClick = () => {
    window.open('YOUR_NETLIFY_INDEX_URL', '_blank', 'noopener,noreferrer');
    setShowToast(true);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-muted/30 to-background">
      {showToast && (
        <Toast
          message="Demo opened in a new tab — try the live app!"
          onClose={() => setShowToast(false)}
        />
      )}
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8 animate-slide-up">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full text-sm font-medium shadow-card animate-shimmer">
              <Zap className="w-4 h-4 text-accent animate-bounce-subtle" />
              <span>No keys. No setup. RM10 / month</span>
            </div>
            
            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Queue Joy <span className="text-gradient">—</span> Smart queue, zero headaches
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed animate-fade-up" style={{ animationDelay: "0.2s" }}>
              Cut waiting time. Calm the crowd. Notify customers instantly via Telegram. RM10/month — no setup fuss.
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 animate-scale-in" style={{ animationDelay: "0.3s" }}>
              <Button 
                variant="hero" 
                size="lg"
                onClick={handleDemoClick}
                className="group hover-glow"
              >
                Try Demo
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => window.location.href = '/index.html'}
                className="hover:scale-105 transition-transform"
              >
                Open App
              </Button>
            </div>
            
            {/* Microtrust note */}
            <p className="text-sm text-muted-foreground animate-fade-up" style={{ animationDelay: "0.4s" }}>
              No credit card needed for demo. Cancel anytime.
            </p>
          </div>
          
          {/* Right mockup */}
          <div className="relative flex justify-center lg:justify-end animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <div 
              className="relative cursor-pointer animate-float hover:scale-105 transition-transform duration-300"
              onClick={handleDemoClick}
            >
              <img 
                src={heroMockup} 
                alt="Queue Joy app interface showing queue number A023" 
                className="w-full max-w-md lg:max-w-lg drop-shadow-2xl"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-3xl blur-2xl -z-10 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
