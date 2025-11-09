import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Send, Shield, Users, MessageSquare, DollarSign } from "lucide-react";

const features = [
  {
    icon: Send,
    title: "Announcement Board",
    description: "Send DMs to your customers anytime. Share updates, promotions, or special offers — all through Telegram. It's like your own personal notice board.",
  },
  {
    icon: Shield,
    title: "Fully Customizable System",
    description: "Make it truly yours. Change your logo, welcome text, and ads anytime. Your brand, your style — no coding needed.",
  },
  {
    icon: Users,
    title: "Smart Queue System",
    description: "No more broken or expensive queue machines. Everything runs online — faster, cleaner, cheaper. Perfect for cafés, clinics, or any busy place.",
  },
  {
    icon: MessageSquare,
    title: "Telegram Notifications",
    description: "Never miss your turn again. Your customers get instant Telegram messages — no apps, no hassle. It just works.",
  },
  {
    icon: DollarSign,
    title: "Ads & Promotions",
    description: "Turn waiting time into profit. Show your ads or special deals while customers wait. Engage them instead of letting time go to waste.",
  }
];

const Features = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything you need to <span className="text-gradient">manage queues</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Built for businesses that value their customers' time
          </p>
        </div>
        
        {/* Feature cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
                className="scroll-reveal hover-lift"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="w-14 h-14 rounded-lg gradient-primary flex items-center justify-center mb-4 shadow-glow">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="mb-3">{feature.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
