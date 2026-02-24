import { Star, Quote } from "lucide-react";
import { Card } from "./ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export const TestimonialsSection = () => {
  const { t } = useLanguage();

  const testimonials = [
    {
      quote: t("testimonials.1.quote"),
      name: t("testimonials.1.name"),
      role: t("testimonials.1.role"),
      rating: 5,
      avatar: "👨‍⚕️"
    },
    {
      quote: t("testimonials.2.quote"),
      name: t("testimonials.2.name"),
      role: t("testimonials.2.role"),
      rating: 5,
      avatar: "👔"
    },
    {
      quote: t("testimonials.3.quote"),
      name: t("testimonials.3.name"),
      role: t("testimonials.3.role"),
      rating: 5,
      avatar: "☕"
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">{t("testimonials.title")}</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            {t("testimonials.subtitle")}
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
                &ldquo;{testimonial.quote}&rdquo;
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
