import { useLanguage } from "@/contexts/LanguageContext";
import { Clock, Eye, MapPin, Bell } from "lucide-react";

export const WhyLessWaitSection = () => {
  const { t } = useLanguage();

  const tr = (key: string, fallback: string) => {
    const v = t(key);
    return v === key ? fallback : v;
  };

  const bullets = [
    {
      icon: Eye,
      title: tr("lessWait.b1.title", "See your place in line"),
      desc: tr("lessWait.b1.desc", "Customers always know where they stand — no more guessing."),
    },
    {
      icon: Bell,
      title: tr("lessWait.b2.title", "Instant Telegram alerts"),
      desc: tr("lessWait.b2.desc", "Turn alerts and reminders arrive automatically — no app install."),
    },
    {
      icon: MapPin,
      title: tr("lessWait.b3.title", "Arrive at the right time"),
      desc: tr("lessWait.b3.desc", "People show up when they're close — counters stay uncrowded."),
    },
    {
      icon: Clock,
      title: tr("lessWait.b4.title", "Staff serve, not explain"),
      desc: tr("lessWait.b4.desc", "Fewer 'how long left?' questions. Smoother service flow."),
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background via-primary/5 to-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="text-sm font-semibold text-primary">
              {tr("lessWait.badge", "Real-time position")}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            <span className="text-gradient">
              {tr("lessWait.title", "Real-time position — 40% less wait")}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {tr(
              "lessWait.subtitle",
              "When customers can track their place in line, waiting feels shorter — and businesses spend less time explaining."
            )}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Big stat callout */}
          <div className="relative animate-fade-up">
            <div className="rounded-3xl p-10 bg-gradient-to-br from-primary/15 via-accent/10 to-primary/5 border border-primary/20 shadow-glow text-center">
              <div className="text-7xl md:text-8xl font-black text-gradient mb-2">40%</div>
              <p className="text-xl font-semibold mb-2">
                {tr("lessWait.stat.title", "Less perceived waiting time")}
              </p>
              <p className="text-sm text-muted-foreground">
                {tr(
                  "lessWait.stat.desc",
                  "Uncertainty is what makes waiting painful. Real-time updates reduce it."
                )}
              </p>
            </div>
          </div>

          {/* Bullets */}
          <div className="space-y-4">
            {bullets.map((b, i) => (
              <div
                key={i}
                className="flex gap-4 p-5 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-lg transition-all animate-fade-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <b.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">{b.title}</h3>
                  <p className="text-sm text-muted-foreground">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
