import { DollarSign, Gamepad2 } from "lucide-react";
import adsImage from "@/assets/ads-engagement.png";
import gameImage from "@/assets/memory-game.png";

const AdsEngagement = () => {
  return (
    <section className="py-12 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10 scroll-reveal">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Ads & Engagement
          </h2>
          <p className="text-base text-muted-foreground">
            Monetize wait time — turn waiting into revenue
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Ads panel */}
          <div className="scroll-reveal">
            <div className="relative overflow-hidden rounded-xl shadow-xl mb-4 hover-lift">
              <img 
                src={adsImage} 
                alt="Digital advertisement display showing promotional content" 
                className="w-full h-auto"
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-accent" />
                Display Promotions
              </h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>Show promotions or sell ad space</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>Rotate multiple ads automatically</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Memory game */}
          <div className="scroll-reveal" style={{ transitionDelay: "100ms" }}>
            <div className="relative overflow-hidden rounded-xl shadow-xl mb-4 hover-lift">
              <img 
                src={gameImage} 
                alt="Memory card game interface for customer engagement" 
                className="w-full h-auto"
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Gamepad2 className="w-5 h-5 text-primary" />
                Memory Games
              </h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Keep customers entertained</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Reduces perceived wait time by 40%</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdsEngagement;
