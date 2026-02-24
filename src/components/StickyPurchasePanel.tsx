import { useState, useEffect } from "react";
import { StripeCheckoutButton } from "./StripeCheckoutButton";
import { Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const StickyPurchasePanel = () => {
  const [show, setShow] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (~600px)
      setShow(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-card/95 backdrop-blur-xl border-t border-border shadow-lg px-4 py-3 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground flex items-center gap-1 truncate">
            <Shield className="w-3 h-3 flex-shrink-0" />
            {t("pricing.guarantee")}
          </p>
        </div>
        <StripeCheckoutButton 
          size="sm" 
          className="rounded-full px-5 text-sm font-bold flex-shrink-0 shadow-glow"
          data-track="sticky_bottom_buy"
        />
      </div>
    </div>
  );
};
