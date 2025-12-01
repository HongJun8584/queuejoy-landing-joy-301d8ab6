import { useState } from "react";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { FeatureDetailDialog } from "./FeatureDetailDialog";
import adminDashboardMockup from "@/assets/admin-dashboard-mockup.png";
import { BarChart3 } from "lucide-react";

export const AdminDashboardSection = () => {
  const { t } = useLanguage();
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <section className="py-32 bg-gradient-to-br from-accent/5 via-background to-primary/10 scroll-reveal">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Image */}
            <div className="group animate-fade-up lg:order-1 order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-primary/20 transition-all duration-500 group-hover:shadow-glow group-hover:scale-[1.02] group-hover:border-primary/40">
                <img
                  src={adminDashboardMockup}
                  alt="Admin Dashboard showing queue analytics and insights"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6 animate-fade-up lg:order-2 order-1" style={{ animationDelay: "0.2s" }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full">
                <BarChart3 className="w-4 h-4 text-accent" />
                <span className="text-sm font-semibold text-accent">{t("admindashboard.badge")}</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="text-gradient">{t("admindashboard.title")}</span>
              </h2>

              <p className="text-xl text-muted-foreground leading-relaxed">
                {t("admindashboard.subtitle")}
              </p>

              <ul className="space-y-4">
                {[1, 2].map((i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                    </div>
                    <p className="text-lg text-foreground/90">
                      {t(`admindashboard.bullet${i}`)}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="pt-4">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="text-lg shadow-glow hover:scale-105 transition-transform"
                  onClick={() => setShowDialog(true)}
                >
                  {t("admindashboard.cta")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showDialog && (
        <FeatureDetailDialog
          isOpen={showDialog}
          onClose={() => setShowDialog(false)}
          featureId="admindashboard"
          title={t("admindashboard.title")}
          description={t("admindashboard.subtitle")}
          videoSrc="/demo/feature-demo.mp4"
        />
      )}
    </>
  );
};
