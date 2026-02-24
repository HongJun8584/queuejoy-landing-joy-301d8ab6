import { Check, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { StripeCheckoutButton } from "./StripeCheckoutButton";

export const PricingComparison = () => {
  const { t } = useLanguage();

  const features = [
    { name: t("pricing.feature.telegram"), queuejoy: true, others: false },
    { name: t("pricing.feature.noApp"), queuejoy: true, others: false },
    { name: t("pricing.feature.multiCounter"), queuejoy: true, others: "paid" },
    { name: t("pricing.feature.realtime"), queuejoy: true, others: true },
    { name: t("pricing.feature.analytics"), queuejoy: true, others: "paid" },
    { name: t("pricing.feature.announcements"), queuejoy: true, others: false },
    { name: t("pricing.feature.customization"), queuejoy: true, others: "paid" },
    { name: t("pricing.feature.setup"), queuejoy: "< 3 min", others: "1-2 days" },
    { name: t("pricing.feature.price"), queuejoy: "RM25/mo", others: "RM100+" },
  ];

  return (
    <section id="pricing" className="py-24 bg-gradient-to-br from-background via-primary/5 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            <span className="text-gradient">{t("pricing.title")}</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            {t("pricing.subtitle")}
          </p>
        </div>

        {/* Comparison Table */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="rounded-2xl border border-border overflow-hidden bg-card shadow-lg">
            {/* Table Header */}
            <div className="grid grid-cols-3 bg-muted/50 font-semibold text-center">
              <div className="p-4 border-b border-r border-border">{t("pricing.features")}</div>
              <div className="p-4 border-b border-r border-border bg-primary/10 text-primary">QueueJoy</div>
              <div className="p-4 border-b border-border text-muted-foreground">{t("pricing.others")}</div>
            </div>

            {/* Table Body */}
            {features.map((feature, index) => (
              <div 
                key={index}
                className="grid grid-cols-3 text-center border-b last:border-b-0 border-border hover:bg-muted/30 transition-colors"
              >
                <div className="p-4 border-r border-border text-left text-sm font-medium">
                  {feature.name}
                </div>
                <div className="p-4 border-r border-border bg-primary/5">
                  {typeof feature.queuejoy === "boolean" ? (
                    feature.queuejoy ? (
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-red-500 mx-auto" />
                    )
                  ) : (
                    <span className="text-sm font-semibold text-primary">{feature.queuejoy}</span>
                  )}
                </div>
                <div className="p-4">
                  {typeof feature.others === "boolean" ? (
                    feature.others ? (
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-red-500 mx-auto" />
                    )
                  ) : (
                    <span className="text-sm text-muted-foreground">{feature.others}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Card */}
        <div className="max-w-lg mx-auto">
          <div className="relative p-8 lg:p-12 rounded-3xl bg-card shadow-2xl border-2 border-primary/30">
            {/* Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-primary text-primary-foreground text-sm font-bold shadow-lg">
              {t("pricing.badge")}
            </div>

            {/* Price */}
            <div className="text-center mb-8 pt-4">
              <div className="text-6xl md:text-7xl font-black mb-2">
                <span className="text-gradient">RM25</span>
              </div>
              <div className="text-muted-foreground text-lg font-medium">{t("pricing.perMonth")}</div>
            </div>

            {/* Features List */}
            <ul className="space-y-3 mb-8">
              {[
                t("pricing.includes.telegram"),
                t("pricing.includes.counters"),
                t("pricing.includes.analytics"),
                t("pricing.includes.announcements"),
                t("pricing.includes.support"),
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-green-500" />
                  </div>
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <StripeCheckoutButton className="w-full shadow-lg" size="lg" />

            {/* Guarantee */}
            <div className="text-center mt-6 p-4 bg-accent/10 rounded-xl border border-accent/20">
              <p className="text-sm font-semibold">🛡️ {t("pricing.guarantee")}</p>
              <p className="text-xs text-muted-foreground mt-1">{t("pricing.guaranteeDesc")}</p>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-4">
              {t("pricing.cancel")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
