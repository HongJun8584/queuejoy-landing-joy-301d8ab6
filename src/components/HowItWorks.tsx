import { Hash, Smartphone, Bell } from "lucide-react";

const steps = [
  {
    icon: Hash,
    number: "01",
    title: "Take a number",
    description: "QR / kiosk / staff"
  },
  {
    icon: Smartphone,
    number: "02",
    title: "Watch status",
    description: "Phone or screen"
  },
  {
    icon: Bell,
    number: "03",
    title: "Get notified",
    description: "Telegram DM or audio callout"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-10 animate-fade-up">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-base text-muted-foreground">
            Simple 3-step flow — setup in under 10 minutes
          </p>
        </div>
        
        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index}
                className="relative scroll-reveal"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary to-accent opacity-30" />
                )}
                
                <div className="text-center">
                  {/* Number */}
                  <div className="text-4xl font-bold text-gradient mb-2 opacity-20">
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-full gradient-accent flex items-center justify-center mx-auto mb-4 shadow-glow relative z-10 hover-lift">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  
                  {/* Title & Description */}
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
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
