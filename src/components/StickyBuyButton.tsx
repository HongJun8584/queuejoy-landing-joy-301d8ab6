import { useState, useEffect } from "react";
import { StripeCheckoutButton } from "./StripeCheckoutButton";

const StickyBuyButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <StripeCheckoutButton 
        variant="hero"
        size="lg"
        className="shadow-2xl hover:scale-105 transition-transform"
      >
        Buy Now — RM10/month
      </StripeCheckoutButton>
    </div>
  );
};

export default StickyBuyButton;
