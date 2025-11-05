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
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 scroll-reveal">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Everything you need to manage queues
          </h2>
          <p className="text-xl text-muted-foreground">
            Insanely simple — powerful results. No expensive hardware or complicated setup.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="text-center p-6 rounded-2xl bg-card border border-border hover:shadow-card transition-all scroll-reveal hover-lift"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4 shadow-glow">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuickBenefits;
