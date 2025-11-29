import { useState } from "react";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { FeatureDetailDialog } from "./FeatureDetailDialog";
import notificationImage from "@/assets/notification-mockup.png";
import queueStatusImage from "@/assets/queue-status-mockup.png";
import announcementImage from "@/assets/announcement-mockup.png";
import engagementImage from "@/assets/engagement-mockup.png";

export const FeatureSections = () => {
  const { t } = useLanguage();
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const features = [
    {
      id: "feature1",
      image: notificationImage,
      imageAlt: "Telegram notification examples showing instant alerts",
      reverse: false,
      revealClass: "scroll-reveal-left"
    },
    {
      id: "feature2",
      image: queueStatusImage,
      imageAlt: "Live queue status screen with counter management",
      reverse: true,
      revealClass: "scroll-reveal-right"
    },
    {
      id: "feature3",
      image: announcementImage,
      imageAlt: "Announcement dashboard for sending promotions via Telegram",
      reverse: false,
      revealClass: "scroll-reveal-left"
    },
    {
      id: "feature4",
      image: engagementImage,
      imageAlt: "Customer engagement features with mini-games",
      reverse: true,
      revealClass: "scroll-reveal-right"
    },
    {
      id: "feature5",
      image: queueStatusImage,
      imageAlt: "Live queue screen display",
      reverse: false,
      revealClass: "scroll-reveal-left"
    },
  ];

  return (
    <div className="space-y-32 py-24">
      {features.map((feature, index) => (
        <section
          key={feature.id}
          className={`container mx-auto px-4 ${feature.revealClass}`}
          style={{ transitionDelay: `${index * 200}ms` }}
        >
          <div
            className={`flex flex-col ${
              feature.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
            } items-center gap-12 lg:gap-20`}
          >
            {/* Image */}
            <div className="flex-1 w-full group perspective-1000">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-primary/20 transition-all duration-700 group-hover:shadow-[0_20px_60px_rgba(var(--primary-rgb),0.4)] group-hover:scale-[1.05] group-hover:border-primary/60 group-hover:rotate-y-2">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
                <img
                  src={feature.image}
                  alt={feature.imageAlt}
                  className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 w-full space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="text-gradient">{t(`${feature.id}.title`)}</span>
              </h2>

              <p className="text-xl text-muted-foreground leading-relaxed">
                {t(`${feature.id}.subtitle`)}
              </p>

              <ul className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <p className="text-lg text-foreground/90">
                      {t(`${feature.id}.bullet${i}`)}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="pt-4">
                <Button 
                  size="lg" 
                  className="text-lg group relative overflow-hidden bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-[0_10px_40px_rgba(var(--primary-rgb),0.5)] transition-all duration-300 hover:scale-105"
                  onClick={() => setSelectedFeature(feature.id)}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {t(`${feature.id}.cta`)}
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      ))}

      {selectedFeature && (
        <FeatureDetailDialog
          isOpen={!!selectedFeature}
          onClose={() => setSelectedFeature(null)}
          featureId={selectedFeature}
          title={t(`${selectedFeature}.title`)}
          description={t(`${selectedFeature}.subtitle`)}
          videoSrc="/demo/queuejoy-streamline.mp4"
        />
      )}
    </div>
  );
};
