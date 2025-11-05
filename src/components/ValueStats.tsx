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
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index}
                className="text-center scroll-reveal"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4 shadow-glow">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValueStats;
