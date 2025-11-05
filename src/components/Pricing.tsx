import { Check } from "lucide-react";
import { VideoButton } from "./VideoModal";
import { useState } from "react";
import { VideoModal } from "./VideoModal";
import { StripeCheckoutButton } from "./StripeCheckoutButton";

const features = [
  "Telegram alerts",
  "Multi-counter support",
  "Ads panel",
  "Memory game",
  "Real-time sync",
  "Audio notifications",
  "Regular updates"
];

const Pricing = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="py-12 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-10 animate-fade-up">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Simple, <span className="text-gradient">transparent pricing</span>
          </h2>
          <p className="text-base text-muted-foreground">
            Everything you need, nothing you don't
          </p>
        </div>
        
        {/* Pricing card */}
        <div className="max-w-md mx-auto">
          <div className="relative p-6 lg:p-8 rounded-xl bg-card shadow-[0_10px_40px_-10px_rgba(0,0,0,0.25)] border-2 border-primary/30 scroll-reveal hover-lift">
            {/* Badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full gradient-accent text-white text-xs font-bold shadow-glow">
              Most Popular
            </div>
            
            {/* Price */}
            <div className="text-center mb-6">
              <div className="text-5xl font-black mb-1">
                <span className="text-gradient">RM10</span>
              </div>
              <div className="text-muted-foreground text-sm font-medium">per month</div>
            </div>
            
            {/* Features */}
            <ul className="space-y-2 mb-6">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-accent" />
                  </div>
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            
            {/* CTA */}
            <div className="w-full space-y-3">
              <StripeCheckoutButton className="w-full" />
              <VideoButton onClick={() => setShowVideo(true)} />
            </div>
            
            {/* Legal note */}
            <p className="text-center text-sm text-muted-foreground mt-4">
              No credit card needed for demo. Cancel anytime.
            </p>
          </div>
        </div>
      </div>
      
      <VideoModal 
        isOpen={showVideo} 
        onClose={() => setShowVideo(false)} 
        videoSrc="/demo/queuejoy-demo.mp4"
      />
    </section>
  );
};

export default Pricing;
