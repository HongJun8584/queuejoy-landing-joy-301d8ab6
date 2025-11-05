import { GraduationCap, Stethoscope, UtensilsCrossed, Coffee, Building2, Ticket } from "lucide-react";

const topIndustries = [
  {
    icon: GraduationCap,
    title: "Schools",
    benefit: "Registration, canteen, library"
  },
  {
    icon: Stethoscope,
    title: "Clinics",
    benefit: "Reduce crowding — protect patients"
  },
  {
    icon: UtensilsCrossed,
    title: "Restaurants",
    benefit: "Call tables, manage waiting lists"
  },
  {
    icon: Coffee,
    title: "Cafés",
    benefit: "Notify when orders are ready"
  }
];

const Industries = () => {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-10 animate-fade-up">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Built for <span className="text-gradient">every industry</span>
          </h2>
          <p className="text-base text-muted-foreground">
            Students, patients, or customers — we've got you covered
          </p>
        </div>
        
        {/* Industry cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {topIndustries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <div 
                key={index}
                className="p-4 rounded-lg bg-background shadow-card scroll-reveal hover-lift"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-1">{industry.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{industry.benefit}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Industries;
