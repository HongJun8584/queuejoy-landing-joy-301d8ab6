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
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Trusted by <span className="text-gradient">businesses</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            See what our customers are saying
          </p>
        </div>
        
        {/* Testimonial cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="scroll-reveal hover-lift"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CardContent className="pt-6">
                <Quote className="w-10 h-10 text-accent/30 mb-4" />
                <p className="text-lg mb-6 leading-relaxed">{testimonial.quote}</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full gradient-accent flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
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
