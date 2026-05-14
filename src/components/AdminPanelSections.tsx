import { useState, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "./ui/button";
import { ExternalLink, Play, X, Megaphone, Palette, BarChart3, TrendingUp, Clock, Users, KeyRound, Copy, Check } from "lucide-react";
import announcementImg from "@/assets/announcement-system.png";
import { AnalyticsSlider } from "./AnalyticsSlider";

const ADMIN_DEMO_URL = "https://queuejoy-live.netlify.app/admin.html?slug=queuejoy-test-cafe-4";

export const AdminPanelSections = () => {
  const { t } = useLanguage();
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [isAnnouncementPlaying, setIsAnnouncementPlaying] = useState(false);
  const [isCustomizePlaying, setIsCustomizePlaying] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 1500);
    });
  };
  const announcementVideoRef = useRef<HTMLVideoElement>(null);
  const customizeVideoRef = useRef<HTMLVideoElement>(null);

  const handleVideoHover = (videoRef: React.RefObject<HTMLVideoElement>, entering: boolean, setPlaying: (val: boolean) => void) => {
    if (videoRef.current) {
      if (entering) {
        videoRef.current.muted = false;
        videoRef.current.play();
        setPlaying(true);
      } else {
        videoRef.current.muted = true;
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        setPlaying(false);
      }
    }
  };

  return (
    <div id="admin-panel">
      {/* Announcements Section - Video centered horizontally */}
      <section className="py-24 bg-muted/30 overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center space-y-6 mb-12">
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Megaphone className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm font-semibold text-primary">{t("admin.announcement.badge")}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black leading-tight">
              {t("admin.announcement.title")}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              {t("admin.announcement.desc")}
            </p>
          </div>

          {/* Video - Centered horizontally like demo video */}
          <div className="max-w-4xl mx-auto mb-8">
            <div 
              className="relative rounded-2xl overflow-hidden shadow-2xl bg-black group cursor-pointer transition-all duration-500 hover:shadow-glow hover:scale-[1.01]"
              onClick={() => setShowAnnouncementModal(true)}
              onMouseEnter={() => handleVideoHover(announcementVideoRef, true, setIsAnnouncementPlaying)}
              onMouseLeave={() => handleVideoHover(announcementVideoRef, false, setIsAnnouncementPlaying)}
            >
              <video
                ref={announcementVideoRef}
                src="/demo/announcement-demo.mp4"
                muted
                loop
                playsInline
                preload="none"
                className="w-full h-auto aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300 ${isAnnouncementPlaying ? 'opacity-0' : 'opacity-100'}`}>
                <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center shadow-glow">
                  <Play className="w-10 h-10 text-white fill-white ml-1" />
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="max-w-3xl mx-auto mb-8 rounded-2xl overflow-hidden shadow-xl">
            <img src={announcementImg} alt="Direct Announcements to Customers" className="w-full h-auto" loading="lazy" width={800} height={500} />
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button onClick={() => setShowAnnouncementModal(true)} size="lg" className="rounded-full" data-track="announcement_cta">
              <Play className="w-4 h-4 mr-2" />
              {t("admin.announcement.cta")}
            </Button>
            <Button variant="outline" size="lg" className="rounded-full" asChild>
              <a href="https://queuejoy-live.netlify.app/admin.html?slug=queuejoy-test-cafe-4" target="_blank" rel="noopener noreferrer" data-track="announcement_live_demo">
                <ExternalLink className="w-4 h-4 mr-2" />
                {t("admin.liveDemo")}
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Customization Section */}
      <section className="py-24 bg-gradient-to-br from-background via-primary/5 to-background overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Palette className="w-6 h-6 text-accent" />
                </div>
                <span className="text-sm font-semibold text-accent">{t("admin.customize.badge")}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black leading-tight">{t("admin.customize.title")}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{t("admin.customize.desc")}</p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button variant="outline" size="lg" className="rounded-full" asChild>
                  <a href="https://queuejoy-live.netlify.app/admin.html?slug=queuejoy-test-cafe-4" target="_blank" rel="noopener noreferrer" data-track="customize_live_demo">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {t("admin.liveDemo")}
                  </a>
                </Button>
              </div>
            </div>

            <div 
              className="relative rounded-2xl overflow-hidden shadow-2xl bg-black group cursor-pointer"
              onMouseEnter={() => handleVideoHover(customizeVideoRef, true, setIsCustomizePlaying)}
              onMouseLeave={() => handleVideoHover(customizeVideoRef, false, setIsCustomizePlaying)}
            >
              <video ref={customizeVideoRef} src="/demo/customization-demo.mp4" muted loop playsInline preload="none" className="w-full h-auto transition-transform duration-500 group-hover:scale-105" />
              <div className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300 ${isCustomizePlaying ? 'opacity-0' : 'opacity-100'}`}>
                <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
                  <Play className="w-8 h-8 text-white fill-white ml-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Section - No image/video in CTA, more description */}
      <section className="py-24 bg-muted/30 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center space-y-6 mb-12">
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-sm font-semibold text-green-600">{t("admin.analytics.badge")}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black leading-tight">{t("admin.analytics.title")}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">{t("admin.analytics.desc")}</p>
            </div>

            {/* Benefits grid instead of image */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="p-6 rounded-2xl bg-card border border-border/50 text-center hover-lift">
                <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-3" />
                <h4 className="font-bold mb-2">{t("admin.analytics.benefit1.title")}</h4>
                <p className="text-sm text-muted-foreground">{t("admin.analytics.benefit1.desc")}</p>
              </div>
              <div className="p-6 rounded-2xl bg-card border border-border/50 text-center hover-lift">
                <Clock className="w-8 h-8 text-accent mx-auto mb-3" />
                <h4 className="font-bold mb-2">{t("admin.analytics.benefit2.title")}</h4>
                <p className="text-sm text-muted-foreground">{t("admin.analytics.benefit2.desc")}</p>
              </div>
              <div className="p-6 rounded-2xl bg-card border border-border/50 text-center hover-lift">
                <Users className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-bold mb-2">{t("admin.analytics.benefit3.title")}</h4>
                <p className="text-sm text-muted-foreground">{t("admin.analytics.benefit3.desc")}</p>
              </div>
            </div>

            {/* Analytics image slider */}
            <div className="mb-10">
              <AnalyticsSlider />
            </div>

            {/* Demo credentials card */}
            <div className="max-w-2xl mx-auto mb-10 p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <KeyRound className="w-5 h-5 text-primary" />
                <h4 className="font-bold text-lg">{t("admin.demo.credentials.title")}</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{t("admin.demo.credentials.desc")}</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <button
                  onClick={() => copy("admin@test.com", "email")}
                  className="flex items-center justify-between gap-2 p-3 rounded-xl bg-background border border-border hover:border-primary/40 transition-colors text-left group"
                >
                  <div className="min-w-0">
                    <div className="text-xs text-muted-foreground">{t("admin.demo.credentials.email")}</div>
                    <div className="font-mono text-sm font-semibold truncate">admin@test.com</div>
                  </div>
                  {copied === "email" ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-muted-foreground group-hover:text-primary" />}
                </button>
                <button
                  onClick={() => copy("123456", "password")}
                  className="flex items-center justify-between gap-2 p-3 rounded-xl bg-background border border-border hover:border-primary/40 transition-colors text-left group"
                >
                  <div className="min-w-0">
                    <div className="text-xs text-muted-foreground">{t("admin.demo.credentials.password")}</div>
                    <div className="font-mono text-sm font-semibold truncate">123456</div>
                  </div>
                  {copied === "password" ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-muted-foreground group-hover:text-primary" />}
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="hero" size="lg" className="rounded-full shadow-glow" asChild>
                <a href={ADMIN_DEMO_URL} target="_blank" rel="noopener noreferrer" data-track="analytics_live_demo">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t("admin.liveDemo")}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      {showAnnouncementModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative bg-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowAnnouncementModal(false)} className="absolute top-4 right-4 p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors z-10">
              <X className="w-5 h-5" />
            </button>
            <div className="p-6 md:p-8">
              <h3 className="text-2xl font-bold mb-4">{t("admin.announcement.title")}</h3>
              <p className="text-muted-foreground mb-6">{t("admin.announcement.modalDesc")}</p>
              <div className="rounded-xl overflow-hidden mb-6">
                <video src="/demo/announcement-demo.mp4" controls autoPlay className="w-full" />
              </div>
              <Button asChild className="w-full rounded-xl" size="lg">
                <a href="https://queuejoy-live.netlify.app/admin.html?slug=queuejoy-test-cafe-4" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t("admin.liveDemo")}
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
