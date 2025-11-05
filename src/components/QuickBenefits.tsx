import { Send, Users, DollarSign, Volume2, Shield } from "lucide-react";

const features = [
  {
    icon: Send,
    title: "Customer Notifications",
    description: "Instant 'It's your turn' DM — relax, keep your spot. No app install."
  },
  {
    icon: Users,
    title: "Staff Alerts",
    description: "Staff get notified when a new customer joins — faster prep."
  },
  {
    icon: DollarSign,
    title: "Ads & Engagement",
    description: "Monetize wait time with an ad panel and simple memory game."
  },
  {
    icon: Volume2,
    title: "Audio Callouts",
    description: "Optional voice announcements for loud spaces."
  },
  {
    icon: Shield,
    title: "Secure Controls",
    description: "Staff-only actions protected by PIN."
  }
];

const QuickBenefits = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10 scroll-reveal">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Everything you need to manage queues
          </h2>
          <p className="text-base text-muted-foreground">
            Simple, powerful, no expensive hardware.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="text-center p-4 rounded-xl bg-card border border-border hover:shadow-card transition-all scroll-reveal hover-lift"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center mx-auto mb-3 shadow-glow">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuickBenefits;
