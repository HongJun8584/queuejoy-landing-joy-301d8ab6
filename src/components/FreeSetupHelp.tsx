import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "./ui/button";
import { MessageCircle, Mail, Sparkles, Check } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/60195055266";
const EMAIL = "hello.queuejoy@gmail.com";
const PHONE_DISPLAY = "019-505-5266";

export const FreeSetupHelp = () => {
  const { t } = useLanguage();
  const tr = (key: string, fallback: string) => {
    const v = t(key);
    return v === key ? fallback : v;
  };

  const badges = [
    tr("setupHelp.badge1", "Free Setup Guidance"),
    tr("setupHelp.badge2", "Real Human Support"),
    tr("setupHelp.badge3", "Fast Response"),
    tr("setupHelp.badge4", "White-Glove Help"),
  ];

  return (
    <section id="setup-help" className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="relative rounded-3xl overflow-hidden border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-accent/10 backdrop-blur-xl p-8 md:p-12 shadow-glow animate-fade-up">
          {/* Decorative glow */}
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-accent/20 blur-3xl pointer-events-none" />

          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            {/* Left: copy */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 mb-4">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold text-primary uppercase tracking-wide">
                  {tr("setupHelp.tag", "Included Free")}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-4">
                {tr("setupHelp.title", "Free Setup Help — we launch it with you")}
              </h2>
              <p className="text-muted-foreground mb-4">
                {tr(
                  "setupHelp.desc",
                  "Every QueueJoy purchase includes free setup guidance. We'll help you configure your business, counters, branding, Telegram connection, and queue flow — so you start the right way."
                )}
              </p>
              <p className="text-sm font-medium mb-6">
                {tr(
                  "setupHelp.tagline",
                  "We don't just give you software — we help you launch it properly."
                )}
              </p>

              <div className="grid grid-cols-2 gap-2 mb-6">
                {badges.map((b, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-muted-foreground">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: contact card */}
            <div className="bg-card/80 backdrop-blur rounded-2xl p-6 border border-border space-y-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                  {tr("setupHelp.whatsapp", "WhatsApp / Phone")}
                </p>
                <p className="text-lg font-bold font-mono">{PHONE_DISPLAY}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                  {tr("setupHelp.email", "Email")}
                </p>
                <p className="text-lg font-bold break-all">{EMAIL}</p>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <Button
                  variant="hero"
                  size="lg"
                  className="w-full"
                  onClick={() => window.open(WHATSAPP_URL, "_blank", "noopener")}
                  data-track="setup_help_whatsapp"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {tr("setupHelp.cta.whatsapp", "Chat on WhatsApp")}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={() => (window.location.href = `mailto:${EMAIL}`)}
                  data-track="setup_help_email"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  {tr("setupHelp.cta.email", "Email Support")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
