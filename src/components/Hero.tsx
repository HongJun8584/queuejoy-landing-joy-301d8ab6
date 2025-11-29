import { StripeCheckoutButton } from "./StripeCheckoutButton";
import { Button } from "./ui/button";
import { Play } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();
  
  const scrollToDemo = () => {
    const demoSection = document.getElementById("demo");
    if (demoSection) {
      const offset = 80;
      const elementPosition = demoSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/10 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-in">
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="text-gradient block">
              {t("hero.headline")}
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t("hero.subhead")}
          </p>
          
          {/* Trust Strip */}
          <p className="text-sm md:text-base text-muted-foreground/80">
            {t("hero.trust")}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <StripeCheckoutButton 
              variant="hero" 
              size="lg"
              className="text-lg px-8 py-6 shadow-glow hover:shadow-[0_15px_50px_rgba(var(--primary-rgb),0.6)] transition-all duration-300"
            />
            <Button
              variant="outline"
              size="lg"
              onClick={scrollToDemo}
              className="text-lg px-8 py-6 border-2 group hover:border-primary/60"
            >
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              {t("hero.cta.demo")}
            </Button>
          </div>

          {/* Why QueueJoy Section */}
          <div className="pt-16 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("hero.whyTitle")}</h2>
            <p className="text-xl md:text-2xl text-primary font-semibold mb-3">
              {t("hero.whySubtitle")}
            </p>
            <p className="text-base md:text-lg text-muted-foreground mb-8">
              {t("hero.whyDescription")}
            </p>
            
            <div className="space-y-4 text-left">
              {[1, 2, 3, 4, 5].map((i) => (
                <div 
                  key={i}
                  className="group p-5 rounded-xl bg-card/60 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-lg hover:translate-x-3 animate-fade-up"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-4 h-4 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-sm md:text-base text-foreground/90 leading-relaxed">
                      {t(`hero.benefit${i}`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <p className="text-xl md:text-2xl font-bold text-gradient mt-10">
              {t("hero.tagline")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
