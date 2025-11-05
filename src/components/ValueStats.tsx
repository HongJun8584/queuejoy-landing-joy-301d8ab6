import AnimatedCounter from "./AnimatedCounter";
import { Clock, Users, Zap } from "lucide-react";

const stats = [
  {
    icon: Clock,
    value: 40,
    suffix: "%",
    label: "Reduce wait time"
  },
  {
    icon: Users,
    value: 100,
    suffix: "+",
    label: "Businesses trust us"
  },
  {
    icon: Zap,
    value: 10,
    suffix: " RM",
    label: "Per month only"
  }
];

const ValueStats = () => {
  return (
    <section className="py-8 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index}
                className="text-center scroll-reveal"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center mx-auto mb-3 shadow-glow">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl font-bold mb-1">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValueStats;
