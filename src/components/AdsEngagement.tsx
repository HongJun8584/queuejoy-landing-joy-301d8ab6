import { DollarSign, Gamepad2 } from "lucide-react";
import adsImage from "@/assets/ads-engagement.png";
import gameImage from "@/assets/memory-game.png";

const AdsEngagement = () => {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 scroll-reveal">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ads & Engagement
          </h2>
          <p className="text-xl text-muted-foreground">
            Monetize wait time — turn waiting into revenue and engagement
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Ads panel */}
          <div className="scroll-reveal">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl mb-6 hover-lift">
              <img 
                src={adsImage} 
                alt="Digital advertisement display showing promotional content" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                <div className="text-center">
                  <DollarSign className="w-12 h-12 text-accent mx-auto mb-2" />
                  <p className="text-white font-semibold">Monetize Your Screen</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-accent" />
                Display Promotions
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>Show your own promotions or sell ad space to partners</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>Rotate multiple ads automatically</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>Turn idle screen time into additional revenue</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Memory game */}
          <div className="scroll-reveal" style={{ transitionDelay: "100ms" }}>
            <div className="relative overflow-hidden rounded-2xl shadow-2xl mb-6 hover-lift">
              <img 
                src={gameImage} 
                alt="Memory card game interface for customer engagement" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                <div className="text-center">
                  <Gamepad2 className="w-12 h-12 text-primary mx-auto mb-2" />
                  <p className="text-white font-semibold">Reduce Perceived Wait</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <Gamepad2 className="w-6 h-6 text-primary" />
                Memory Games
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Keep customers entertained while they wait</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Reduces perceived wait time by up to 40%</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Simple, fun games that work on any device</span>
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
