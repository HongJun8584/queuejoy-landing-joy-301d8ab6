import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { RefreshCw, Users, Lock, Megaphone, Gamepad2, Wifi } from "lucide-react";

const features = [
  {
    icon: RefreshCw,
    title: "Real-time queue sync",
    description: "Multi-screen support",
    bullets: ["Instant updates on all devices", "Zero refresh needed"]
  },
  {
    icon: Users,
    title: "Multi-counter support",
    description: "Flexible operations",
    bullets: ["Multiple counters, single dashboard", "Scale as you grow"]
  },
  {
    icon: Lock,
    title: "Secure staff PIN",
    description: "Access control",
    bullets: ["Controls for staff, not customers", "Protect sensitive actions"]
  },
  {
    icon: Megaphone,
    title: "Ads & promotions panel",
    description: "Engage while they wait",
    bullets: ["Monetize wait time", "Inform customers"]
  },
  {
    icon: Gamepad2,
    title: "Games & entertainment",
    description: "Keep customers happy",
    bullets: ["Simple memory game", "Reduce perceived wait time"]
  },
  {
    icon: Wifi,
    title: "Telegram notifications",
    description: "Stay connected",
    bullets: ["Instant 'It's your turn' alerts", "No app install required"]
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
                className="animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="w-14 h-14 rounded-lg gradient-primary flex items-center justify-center mb-4 shadow-glow">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-accent mt-1">•</span>
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
