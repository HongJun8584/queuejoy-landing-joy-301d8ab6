import { useState } from "react";
import { Play } from "lucide-react";
import { VideoModal } from "./VideoModal";

export const DemoVideoSection = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <>
      <section id="demo" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">Watch How QueueJoy Works</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              See the magic in action — 2 minutes that'll change how you think about queues
            </p>
          </div>

          {/* Video Thumbnail */}
          <div className="max-w-4xl mx-auto scroll-reveal">
            <div 
              className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-primary/30 cursor-pointer group hover-lift"
              onClick={() => setShowVideo(true)}
              onMouseEnter={(e) => {
                const video = e.currentTarget.querySelector('video');
                if (video) video.play();
              }}
              onMouseLeave={(e) => {
                const video = e.currentTarget.querySelector('video');
                if (video) {
                  video.pause();
                  video.currentTime = 0;
                }
              }}
            >
              <video 
                src="/demo/queuejoy-demo.mp4"
                poster="/demo/queuejoy-poster.jpg"
                muted
                loop
                playsInline
                className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition-colors">
                <div className="w-24 h-24 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                  <Play className="w-12 h-12 text-white fill-white ml-1" />
                </div>
              </div>

              {/* Hover Text */}
              <div className="absolute bottom-8 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-lg font-bold drop-shadow-lg">
                  Click to watch demo
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <VideoModal 
        isOpen={showVideo} 
        onClose={() => setShowVideo(false)} 
        videoSrc="/demo/queuejoy-demo.mp4"
      />
    </>
  );
};
