import { Zap, Shield, Bell } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";

const benefits = [
  {
    icon: Zap,
    title: "Faster service",
    description: "Reduce perceived wait"
  },
  {
    icon: Shield,
    title: "Safer & organized",
    description: "Fewer crowds, better flow"
  },
  {
    icon: Bell,
    title: "Automated alerts",
    description: "Telegram + audio callouts"
  }
];

const QuickBenefits = () => {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Trust subheadline */}
        <div className="text-center max-w-3xl mx-auto mb-12 scroll-reveal">
          <p className="text-lg md:text-xl text-muted-foreground">
            Trusted by clinics, cafés, schools and restaurants to reduce crowding and speed service. 
            <span className="text-gradient font-semibold"> Insanely simple — powerful results.</span>
          </p>
          <p className="mt-4 text-2xl font-bold">
            Reduce wait by <AnimatedCounter end={40} suffix="%" />
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div 
                key={index}
                className="text-center scroll-reveal"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4 shadow-glow hover-lift">
                  <Icon className="w-8 h-8 text-white animate-bounce-subtle" />
                </div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuickBenefits;
