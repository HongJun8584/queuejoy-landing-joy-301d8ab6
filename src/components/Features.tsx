import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { RefreshCw, Users, Lock, Megaphone, Gamepad2, Wifi } from "lucide-react";

const features = [
  {
    icon: Wifi,
    title: "Telegram notifications",
    description: "Stay connected",
    bullets: ["Instant 'It's your turn' alerts", "No app install required"]
  },
  {
    icon: RefreshCw,
    title: "Real-time sync & multi-counter",
    description: "Flexible operations",
    bullets: ["Instant updates on all devices", "Multiple counters, single dashboard"]
  },
  {
    icon: Lock,
    title: "Secure staff controls",
    description: "Access control",
    bullets: ["Staff PIN for sensitive actions", "Customer-facing displays stay simple"]
  },
  {
    icon: Megaphone,
    title: "Ads & engagement",
    description: "Monetize wait time",
    bullets: ["Display promotions while customers wait", "Memory games reduce perceived wait"]
  },
  {
    icon: Gamepad2,
    title: "Audio callouts",
    description: "Keep everyone informed",
    bullets: ["Automatic voice announcements", "Works alongside Telegram alerts"]
  }
];

const Features = () => {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-10 animate-fade-up">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Everything you need to <span className="text-gradient">manage queues</span>
          </h2>
          <p className="text-base text-muted-foreground">
            Built for businesses that value their customers' time
          </p>
        </div>
        
        {/* Feature cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
                className="scroll-reveal hover-lift"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardHeader className="p-4 pb-3">
                  <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center mb-3 shadow-glow">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <CardTitle className="text-base">{feature.title}</CardTitle>
                  <CardDescription className="text-sm">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <ul className="space-y-1">
                    {feature.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <span className="text-accent mt-0.5">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
