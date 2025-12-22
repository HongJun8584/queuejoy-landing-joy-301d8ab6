import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { X, ShoppingCart, Play, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const EngagementPopup = () => {
  const { t } = useLanguage();
  const [showPopup, setShowPopup] = useState(false);
  const [hasPurchased, setHasPurchased] = useState(false);

  useEffect(() => {
    // Check if user has already interacted with pricing
    const hasInteracted = sessionStorage.getItem("queuejoy-interacted");
    if (hasInteracted) {
      setHasPurchased(true);
      return;
    }

    // Show popup after 20 seconds
    const timer = setTimeout(() => {
      if (!hasPurchased) {
        setShowPopup(true);
      }
    }, 20000);

    return () => clearTimeout(timer);
  }, [hasPurchased]);

  const handleClose = () => {
    setShowPopup(false);
  };

  const handleBuyClick = () => {
    sessionStorage.setItem("queuejoy-interacted", "true");
    setShowPopup(false);
    window.location.href = "#pricing";
  };

  const handleDemoClick = () => {
    setShowPopup(false);
    window.open("https://queuejoy.netlify.app", "_blank");
  };

  if (!showPopup) return null;

  return (
    <div 
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
      onClick={handleClose}
    >
      <div 
        className="relative bg-card rounded-3xl max-w-md w-full p-8 shadow-2xl border border-primary/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
          aria-label="Close popup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="text-center space-y-6">
          {/* Emoji accent */}
          <div className="text-5xl">🛒</div>

          {/* Headline */}
          <h3 className="text-2xl md:text-3xl font-black leading-tight">
            {t("popup.headline")}
          </h3>

          {/* Body */}
          <p className="text-muted-foreground leading-relaxed">
            {t("popup.body")}
          </p>

          {/* CTAs */}
          <div className="space-y-3 pt-4">
            <Button 
              onClick={handleBuyClick}
              size="lg" 
              className="w-full text-lg py-6 rounded-xl shadow-glow"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {t("popup.cta.buy")}
            </Button>
            
            <Button 
              onClick={handleDemoClick}
              variant="outline"
              size="lg"
              className="w-full text-lg py-6 rounded-xl"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              {t("popup.cta.demo")}
            </Button>
          </div>

          {/* Microcopy */}
          <p className="text-xs text-muted-foreground">
            {t("popup.microcopy")}
          </p>
        </div>
      </div>
    </div>
  );
};
