import { useLanguage } from "@/contexts/LanguageContext";
import staffCounterMockup from "@/assets/staff-counter-mockup.png";
import adminDashboardMockup from "@/assets/admin-dashboard-mockup.png";

const QuickBenefits = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5 scroll-reveal">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 animate-fade-up">
          <span className="text-gradient">{t("quickbenefits.title")}</span>
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Fast Staff Counter */}
          <div className="group animate-fade-up feature-card">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-primary/20 mb-6 transition-all duration-500 group-hover:shadow-glow group-hover:scale-[1.02] group-hover:border-primary/40">
              <img
                src={staffCounterMockup}
                alt="Fast Staff Counter interface showing one-tap queue management"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gradient">
              {t("quickbenefits.staff.title")}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("quickbenefits.staff.desc")}
            </p>
          </div>

          {/* Admin Dashboard */}
          <div className="group animate-fade-up feature-card" style={{ animationDelay: "0.2s" }}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-primary/20 mb-6 transition-all duration-500 group-hover:shadow-glow group-hover:scale-[1.02] group-hover:border-primary/40">
              <img
                src={adminDashboardMockup}
                alt="Admin Dashboard showing queue analytics and insights"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gradient">
              {t("quickbenefits.admin.title")}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("quickbenefits.admin.desc")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickBenefits;
