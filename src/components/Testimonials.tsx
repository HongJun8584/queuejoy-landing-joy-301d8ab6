import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Reduced our waiting time by 40%. Patients love the Telegram notifications!",
    author: "Dr. Sarah Chen",
    role: "Clinic Manager",
    avatar: "SC"
  },
  {
    quote: "Game changer for our lunch rush. Staff can focus on service, not crowd control.",
    author: "Ahmad Rahman",
    role: "Restaurant Owner",
    avatar: "AR"
  },
  {
    quote: "Setup took 10 minutes. Now our students queue properly without chaos.",
    author: "Linda Wong",
    role: "School Administrator",
    avatar: "LW"
  }
];

const Testimonials = () => {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-10 animate-fade-up">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Trusted by <span className="text-gradient">businesses</span>
          </h2>
          <p className="text-base text-muted-foreground">
            See what our customers are saying
          </p>
        </div>
        
        {/* Testimonial cards */}
        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="scroll-reveal hover-lift"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-4">
                <Quote className="w-8 h-8 text-accent/30 mb-3" />
                <p className="text-sm mb-4 leading-relaxed">{testimonial.quote}</p>
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full gradient-accent flex items-center justify-center text-white text-xs font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-sm">{testimonial.author}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
