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
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Simple 3-step flow — setup in under 10 minutes
          </p>
        </div>
        
        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
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
                  <div className="hidden md:block absolute top-16 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary to-accent opacity-30" />
                )}
                
                <div className="text-center">
                  {/* Number */}
                  <div className="text-6xl font-bold text-gradient mb-4 opacity-20">
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className="w-20 h-20 rounded-full gradient-accent flex items-center justify-center mx-auto mb-6 shadow-glow relative z-10 hover-lift">
                    <Icon className="w-10 h-10 text-white animate-bounce-subtle" />
                  </div>
                  
                  {/* Title & Description */}
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
