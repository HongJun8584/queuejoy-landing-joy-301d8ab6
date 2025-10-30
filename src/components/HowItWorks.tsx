import { QrCode, MonitorPlay, Bell } from "lucide-react";

const steps = [
  {
    icon: QrCode,
    number: "01",
    title: "Take a number",
    description: "QR / kiosk / staff"
  },
  {
    icon: MonitorPlay,
    number: "02",
    title: "Watch status on any screen",
    description: "Real-time updates"
  },
  {
    icon: Bell,
    number: "03",
    title: "Get notified",
    description: "Telegram / audio callout"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How it <span className="text-gradient">works</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Three simple steps to better queue management
          </p>
        </div>
        
        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index}
                className="relative animate-fade-up"
                style={{ animationDelay: `${index * 150}ms` }}
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
                  <div className="w-20 h-20 rounded-full gradient-accent flex items-center justify-center mx-auto mb-6 shadow-glow relative z-10">
                    <Icon className="w-10 h-10 text-white" />
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
