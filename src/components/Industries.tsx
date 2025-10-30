import { GraduationCap, Stethoscope, UtensilsCrossed, Coffee, Building2, Ticket } from "lucide-react";

const industries = [
  {
    icon: GraduationCap,
    title: "Schools",
    benefit: "Manage lines at registration, canteen, library"
  },
  {
    icon: Stethoscope,
    title: "Clinics",
    benefit: "Reduce crowding, show wait times — protect patients"
  },
  {
    icon: UtensilsCrossed,
    title: "Restaurants",
    benefit: "Call tables, manage waiting lists"
  },
  {
    icon: Coffee,
    title: "Cafés",
    benefit: "Notify customers when orders are ready"
  },
  {
    icon: Building2,
    title: "Government offices",
    benefit: "Control queues for counters"
  },
  {
    icon: Ticket,
    title: "Events",
    benefit: "Ticket lines and access control"
  }
];

const Industries = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Built for <span className="text-gradient">every industry</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Whether you serve students, patients, or customers — we've got you covered
          </p>
        </div>
        
        {/* Industry cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <div 
                key={index}
                className="p-6 rounded-xl bg-background shadow-card scroll-reveal hover-lift"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">{industry.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{industry.benefit}</p>
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
