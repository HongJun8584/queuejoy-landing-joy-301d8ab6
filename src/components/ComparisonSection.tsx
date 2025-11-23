import { ThumbsDown, ThumbsUp } from "lucide-react";

const comparisons = [
  {
    scenario: "Hospitals & Clinics",
    oldWay: "Long waits to see a doctor. Staff manage lines manually.",
    queuejoyWay: "Patients join via Telegram or kiosk. See position & wait time. Less stress and crowding."
  },
  {
    scenario: "Banks & Service Counters",
    oldWay: "Long lines, slow service, confusing for staff.",
    queuejoyWay: "One-tap 'Call Next.' Staff see last customer. Service is faster and easier."
  },
  {
    scenario: "Fast Food & Coffee Shops",
    oldWay: "Busy mornings and lunches slow orders. Customers frustrated.",
    queuejoyWay: "Customers join virtually. Staff manage counters smoothly. Orders move faster."
  },
  {
    scenario: "Public Transport & Events",
    oldWay: "Crowded entrances, delays, safety risks.",
    queuejoyWay: "QueueJoy handles large crowds. Notifications and alerts keep flow safe and organized."
  }
];

export const ComparisonSection = () => {
  return (
    <section id="comparison" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Stop losing customers to <span className="text-gradient">long lines</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            See the difference QueueJoy makes across industries
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="max-w-6xl mx-auto space-y-6">
          {comparisons.map((item, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl border border-border overflow-hidden scroll-reveal hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-primary/10 p-4 border-b border-border">
                <h3 className="text-xl font-bold text-center">{item.scenario}</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 p-6">
                {/* Old Way */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-destructive">
                    <ThumbsDown className="w-5 h-5" />
                    <h4 className="font-bold text-lg">Old Way</h4>
                  </div>
                  <p className="text-muted-foreground">{item.oldWay}</p>
                </div>

                {/* QueueJoy Way */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-accent">
                    <ThumbsUp className="w-5 h-5" />
                    <h4 className="font-bold text-lg">QueueJoy Way</h4>
                  </div>
                  <p className="text-foreground">{item.queuejoyWay}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
