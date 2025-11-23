import { Star, Quote } from "lucide-react";
import { Card } from "./ui/card";

const testimonials = [
  {
    name: "Dr. Sarah Chen",
    role: "Hospital Administrator",
    quote: "Reduced wait time by 40%. Patients love the Telegram alerts. Our staff can focus on care, not crowd control.",
    rating: 5,
    avatar: "👨‍⚕️"
  },
  {
    name: "Ahmad Razak",
    role: "Bank Branch Manager",
    quote: "QueueJoy transformed our service. No more confusion. Customers are happier and our efficiency doubled.",
    rating: 5,
    avatar: "👔"
  },
  {
    name: "Lisa Wong",
    role: "Café Owner",
    quote: "Morning rush used to be chaos. Now customers join the queue from their phones. Game changer!",
    rating: 5,
    avatar: "☕"
  }
];

export const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-24 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What our <span className="text-gradient">customers say</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Join 100+ businesses cutting wait times today
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="p-6 scroll-reveal hover-lift border-2 border-primary/20"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              
              <Quote className="w-8 h-8 text-primary/20 mb-2" />
              
              <p className="text-foreground mb-6 italic">
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
