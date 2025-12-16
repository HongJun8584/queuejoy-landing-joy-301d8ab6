import { useEffect, useState, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { TrendingDown, Users, Clock, Zap } from "lucide-react";

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

const AnimatedCounter = ({ end, suffix = "", prefix = "", duration = 2000 }: CounterProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count}{suffix}
    </span>
  );
};

export const AnimatedMetrics = () => {
  const { t } = useLanguage();

  const metrics = [
    {
      icon: TrendingDown,
      value: 40,
      suffix: "%",
      label: t("metrics.waitTime"),
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      icon: Users,
      value: 100,
      suffix: "+",
      label: t("metrics.businesses"),
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: Clock,
      value: 10,
      suffix: " min",
      label: t("metrics.setup"),
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      icon: Zap,
      value: 25,
      prefix: "RM",
      label: t("metrics.price"),
      color: "text-orange-500",
      bgColor: "bg-orange-500/10"
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {metrics.map((metric, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-12 h-12 rounded-xl ${metric.bgColor} flex items-center justify-center mx-auto mb-4`}>
                <metric.icon className={`w-6 h-6 ${metric.color}`} />
              </div>
              <div className={`text-3xl md:text-4xl font-black ${metric.color} mb-2`}>
                <AnimatedCounter 
                  end={metric.value} 
                  suffix={metric.suffix} 
                  prefix={metric.prefix}
                />
              </div>
              <p className="text-sm text-muted-foreground font-medium">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
