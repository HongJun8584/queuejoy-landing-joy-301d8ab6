import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const comparisons = [
  {
    id: "hospital",
    scenario: "comparison.hospital.title",
    oldWay: "comparison.hospital.old",
    queuejoyWay: "comparison.hospital.new"
  },
  {
    id: "bank",
    scenario: "comparison.bank.title",
    oldWay: "comparison.bank.old",
    queuejoyWay: "comparison.bank.new"
  },
  {
    id: "food",
    scenario: "comparison.food.title",
    oldWay: "comparison.food.old",
    queuejoyWay: "comparison.food.new"
  },
  {
    id: "transport",
    scenario: "comparison.transport.title",
    oldWay: "comparison.transport.old",
    queuejoyWay: "comparison.transport.new"
  }
];

export const ComparisonSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-24 bg-muted/30 scroll-reveal">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("comparison.title")} <span className="text-gradient">{t("comparison.subtitle")}</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            {t("comparison.description")}
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="max-w-6xl mx-auto space-y-6">
          {comparisons.map((item, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl border border-border overflow-hidden scroll-reveal hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-primary/10 p-4 border-b border-border">
                <h3 className="text-xl font-bold text-center">{t(item.scenario)}</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 p-6">
                {/* Old Way */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-destructive">
                    <ThumbsDown className="w-5 h-5" />
                    <h4 className="font-bold text-lg">{t("comparison.old")}</h4>
                  </div>
                  <p className="text-muted-foreground">{t(item.oldWay)}</p>
                </div>

                {/* QueueJoy Way */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-accent">
                    <ThumbsUp className="w-5 h-5" />
                    <h4 className="font-bold text-lg">{t("comparison.new")}</h4>
                  </div>
                  <p className="text-foreground">{t(item.queuejoyWay)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
