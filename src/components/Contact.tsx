import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Github, FileText, Mail } from "lucide-react";
import { useState } from "react";
import Confetti from "./Confetti";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    business: "",
    email: "",
    message: "",
    honeypot: ""
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return;
    if (!formData.name || !formData.email || !formData.message) {
      toast({ title: "Missing information", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({ title: "Invalid email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    const subject = encodeURIComponent(`Queue Joy Inquiry from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nBusiness: ${formData.business}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:hello.queuejoy@gmail.com?subject=${subject}&body=${body}`;
    setShowConfetti(true);
    setFormData({ name: "", business: "", email: "", message: "", honeypot: "" });
    toast({ title: "Message sent!", description: "Your message has been prepared. Please send it from your email client." });
  };

  return (
    <section className="py-24 bg-background">
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t("contact.title").split(" ").slice(0, -1).join(" ")} <span className="text-gradient">{t("contact.title").split(" ").slice(-1)}</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">{t("contact.subtitle")}</p>
            
            <form onSubmit={handleSubmit} className="space-y-6" data-track="contact_form">
              <div className="space-y-2">
                <Label htmlFor="name">{t("contact.name")} *</Label>
                <Input id="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder={t("contact.name")} required maxLength={100} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="business">{t("contact.business")}</Label>
                <Input id="business" value={formData.business} onChange={(e) => setFormData({...formData, business: e.target.value})} placeholder={t("contact.business")} maxLength={100} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t("contact.email")} *</Label>
                <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="your@email.com" required maxLength={255} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">{t("contact.message")} *</Label>
                <Textarea id="message" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} placeholder={t("contact.message")} required rows={5} maxLength={1000} />
              </div>
              <input type="text" name="website" value={formData.honeypot} onChange={(e) => setFormData({...formData, honeypot: e.target.value})} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
              <Button type="submit" variant="hero" size="lg" className="w-full hover-glow" data-track="contact_submit">
                {t("contact.send")}
              </Button>
            </form>
          </div>
          
          <div className="space-y-8 scroll-reveal" style={{ transitionDelay: "200ms" }}>
            <div className="p-8 rounded-2xl bg-muted/50 shadow-card hover-lift">
              <h3 className="text-2xl font-bold mb-6">{t("footer.links")}</h3>
              <div className="space-y-4">
                <a href="https://github.com/HongJun8584/queue-joy" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-lg bg-background hover:shadow-primary transition-all duration-300 group">
                  <Github className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="font-semibold">GitHub</div>
                    <div className="text-sm text-muted-foreground">{t("footer.documentation")}</div>
                  </div>
                </a>
                <a href="https://github.com/HongJun8584/queue-joy#readme" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-lg bg-background hover:shadow-primary transition-all duration-300 group">
                  <FileText className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="font-semibold">{t("footer.documentation")}</div>
                    <div className="text-sm text-muted-foreground">Setup & guides</div>
                  </div>
                </a>
                <a href="https://wa.me/60195055266" target="_blank" rel="noopener noreferrer" className="w-full flex items-center gap-3 p-4 rounded-lg bg-background hover:shadow-primary transition-all duration-300 group">
                  <Mail className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <div className="font-semibold">WhatsApp</div>
                    <div className="text-sm text-muted-foreground">019-505-5266 | hello.queuejoy@gmail.com</div>
                  </div>
                </a>
              </div>
            </div>
            
            <div className="p-6 rounded-xl gradient-accent text-white">
              <h4 className="font-bold text-lg mb-2">{t("contact.trustedTitle")}</h4>
              <p className="text-white/90 text-sm">{t("contact.trustedDesc")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
