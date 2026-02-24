import { Hash, Smartphone, Bell } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const HowItWorks = () => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: Hash,
      number: "01",
      title: t("howitworks.step1.title"),
      description: t("howitworks.step1.desc"),
    },
    {
      icon: Smartphone,
      number: "02",
      title: t("howitworks.step2.title"),
      description: t("howitworks.step2.desc"),
    },
    {
      icon: Bell,
      number: "03",
      title: t("howitworks.step3.title"),
      description: t("howitworks.step3.desc"),
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("howitworks.title")} <span className="text-gradient"></span>
          </h2>
          <p className="text-xl text-muted-foreground">
            {t("howitworks.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative scroll-reveal"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary to-accent opacity-30" />
                )}
                <div className="text-center">
                  <div className="text-6xl font-bold text-gradient mb-4 opacity-20">
                    {step.number}
                  </div>
                  <div className="w-20 h-20 rounded-full gradient-accent flex items-center justify-center mx-auto mb-6 shadow-glow relative z-10 hover-lift">
                    <Icon className="w-10 h-10 text-white animate-bounce-subtle" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-lg">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
