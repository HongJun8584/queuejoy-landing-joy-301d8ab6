import { useState } from "react";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { FeatureDetailDialog } from "./FeatureDetailDialog";
import staffCounterMockup from "@/assets/staff-counter-mockup.png";
import { Zap } from "lucide-react";

export const StaffCounterSection = () => {
  const { t } = useLanguage();
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <section className="py-32 bg-gradient-to-br from-primary/10 via-background to-accent/5 scroll-reveal">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Content */}
            <div className="space-y-6 animate-fade-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary">{t("staffcounter.badge")}</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="text-gradient">{t("staffcounter.title")}</span>
              </h2>

              <p className="text-xl text-muted-foreground leading-relaxed">
                {t("staffcounter.subtitle")}
              </p>

              <ul className="space-y-4">
                {[1, 2].map((i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <p className="text-lg text-foreground/90">
                      {t(`staffcounter.bullet${i}`)}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="pt-4">
                <Button 
                  size="lg" 
                  className="text-lg shadow-glow hover:scale-105 transition-transform"
                  onClick={() => setShowDialog(true)}
                >
                  {t("staffcounter.cta")}
                </Button>
              </div>
            </div>

            {/* Image */}
            <div className="group animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-primary/20 transition-all duration-500 group-hover:shadow-glow group-hover:scale-[1.02] group-hover:border-primary/40">
                <img
                  src={staffCounterMockup}
                  alt="Fast Staff Counter interface showing one-tap queue management"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {showDialog && (
        <FeatureDetailDialog
          isOpen={showDialog}
          onClose={() => setShowDialog(false)}
          featureId="staffcounter"
          title={t("staffcounter.title")}
          description={t("staffcounter.subtitle")}
          videoSrc="/demo/feature-demo.mp4"
        />
      )}
    </>
  );
};
