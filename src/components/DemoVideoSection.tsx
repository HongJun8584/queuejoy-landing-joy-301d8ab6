import { useState, useRef } from "react";
import { Play, ArrowRight } from "lucide-react";
import { VideoModal } from "./VideoModal";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLazyVideo } from "@/hooks/useLazyVideo";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useVideoAnalytics } from "@/hooks/useVideoAnalytics";

// Demo Video URLs from Builder CDN
const DEMO_VIDEO_1_URL = "https://cdn.builder.io/o/assets%2F623f31b0b6754a42b514700a4ff5e6c4%2F3d8d99bc9d134fd4b1c7e9380dae575f?alt=media&token=a8889484-4d94-4ae1-bc4d-729752b93098&apiKey=623f31b0b6754a42b514700a4ff5e6c4";
const DEMO_VIDEO_2_URL = "https://cdn.builder.io/o/assets%2F623f31b0b6754a42b514700a4ff5e6c4%2Fcfc41306ce0d4d938e3e55ffd68edd06?alt=media&token=2d428e40-f885-4e43-bcb7-7804ab09a4b1&apiKey=623f31b0b6754a42b514700a4ff5e6c4";
const DEMO_VIDEO_1_POSTER = "/demo/queuejoy-poster-1.jpg";
const DEMO_VIDEO_2_POSTER = "/demo/queuejoy-poster-2.jpg";

export const DemoVideoSection = () => {
  const { t } = useLanguage();
  const [showVideo1, setShowVideo1] = useState(false);
  const [showVideo2, setShowVideo2] = useState(false);
  const [isPlayingDemo1, setIsPlayingDemo1] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Lazy load the video
  useLazyVideo(videoRef, DEMO_VIDEO_1_URL, {
    threshold: 0.1,
    rootMargin: "200px",
  });

  // Scroll reveal animation
  useScrollReveal(sectionRef, {
    threshold: 0.2,
    once: true,
  });

  // Analytics for both videos
  useVideoAnalytics(videoRef, {
    videoSrc: DEMO_VIDEO_1_URL,
    eventPrefix: "demo_video_1",
  });

  const handleVideoHover = (entering: boolean) => {
    if (videoRef.current && !showVideo1) {
      if (entering) {
        videoRef.current.muted = false;
        videoRef.current.play();
        setIsPlayingDemo1(true);
      } else {
        videoRef.current.muted = true;
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        setIsPlayingDemo1(false);
      }
    }
  };

  return (
    <>
      <section 
        id="demo" 
        ref={sectionRef}
        className="py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-transparent via-primary/5 to-transparent"
      >
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12 reveal" data-revealed="false">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold">
                {t("demo.eyebrow") || "See QueueJoy in action"}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
              <span className="text-gradient">{t("demo.videoTitle") || "Watch How QueueJoy Works"}</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground">
              {t("demo.videoSubtitle") || "See how QueueJoy makes waiting easier and keeps customers coming back."}
            </p>
          </div>

          {/* Demo Video 1: Main Featured Video */}
          <div className="max-w-4xl mx-auto mb-8 reveal" data-revealed="false">
            <div 
              className="relative rounded-2xl overflow-hidden shadow-lg border border-primary/20 cursor-pointer group transition-all duration-500 hover:shadow-xl hover:border-primary/40 hover:-translate-y-1"
              onClick={() => setShowVideo1(true)}
              onMouseEnter={() => handleVideoHover(true)}
              onMouseLeave={() => handleVideoHover(false)}
            >
              <video 
                ref={videoRef}
                muted
                loop
                playsInline
                preload="none"
                poster={DEMO_VIDEO_1_POSTER}
                className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Play Button Overlay */}
              <div className={`absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-all duration-300 ${isPlayingDemo1 ? 'opacity-0' : 'opacity-100'}`}>
                <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 sm:w-12 sm:h-12 text-white fill-white ml-1" />
                </div>
              </div>

              {/* Hover Text */}
              <div className={`absolute bottom-6 sm:bottom-8 left-0 right-0 text-center transition-opacity ${isPlayingDemo1 ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`}>
                <p className="text-white text-base sm:text-lg font-semibold drop-shadow-lg">
                  {t("demo.clickToWatch") || "Click to watch"}
                </p>
              </div>
            </div>
          </div>

          {/* Secondary CTA: Want to learn more? */}
          <div className="max-w-4xl mx-auto text-center reveal" data-revealed="false">
            <Button
              onClick={() => setShowVideo2(true)}
              variant="outline"
              size="lg"
              className="border-2 hover:-translate-y-0.5 transition-all duration-300"
            >
              {t("demo.learnMore") || "Want to learn more?"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <p className="text-sm text-muted-foreground mt-3">
              {t("demo.learnMoreHint") || "Watch the full product demo"}
            </p>
          </div>
        </div>
      </section>

      {/* Video 1 Modal */}
      <VideoModal 
        isOpen={showVideo1} 
        onClose={() => {
          setShowVideo1(false);
          if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
          }
        }} 
        videoSrc={DEMO_VIDEO_1_URL}
        title={t("demo.title") || "QueueJoy Overview"}
        autoPlay={true}
      />

      {/* Video 2 Modal - Full Demo */}
      <VideoModal 
        isOpen={showVideo2} 
        onClose={() => setShowVideo2(false)} 
        videoSrc={DEMO_VIDEO_2_URL}
        title={t("demo.video2Title") || "Complete Product Walkthrough"}
        autoPlay={false}
      />
    </>
  );
};
