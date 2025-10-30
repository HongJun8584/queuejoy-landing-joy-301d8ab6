import { Zap, Shield, Bell } from "lucide-react";

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
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div 
                key={index}
                className="flex items-start gap-4 p-6 rounded-xl bg-background shadow-card hover:shadow-primary transition-all duration-300 hover:-translate-y-1 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-lg gradient-accent flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuickBenefits;
