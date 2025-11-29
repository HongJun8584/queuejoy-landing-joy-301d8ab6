import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "./ui/button";

export const DemoVideoSection = () => {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <section id="demo" className="py-24 bg-gradient-to-b from-background via-muted/10 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center space-y-10 scroll-reveal">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-gradient">{t("demo.title")}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("demo.subtitle")}
          </p>

          <div 
            className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-primary/30 group cursor-pointer hover:shadow-[0_25px_70px_rgba(var(--primary-rgb),0.5)] transition-all duration-700 hover:border-primary/60"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />
            <video
              ref={videoRef}
              className="w-full transition-all duration-700 group-hover:scale-[1.02]"
              src="/demo/queuejoy-streamline.mp4"
              controls
            >
              Your browser does not support the video tag.
            </video>
          </div>
          
          <Button 
            size="lg"
            className="text-lg bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-[0_10px_40px_rgba(var(--primary-rgb),0.5)] transition-all duration-300 hover:scale-105"
          >
            {t("demo.cta")}
          </Button>
        </div>
      </div>
    </section>
  );
};
