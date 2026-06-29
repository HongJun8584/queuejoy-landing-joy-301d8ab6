import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics";

interface UseVideoAnalyticsOptions {
  videoSrc: string;
  eventPrefix: string; // e.g., "demo_video_1", "tutorial_video"
  locale?: string;
}

export function useVideoAnalytics(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  options: UseVideoAnalyticsOptions
) {
  const {
    videoSrc,
    eventPrefix,
    locale = "en",
  } = options;

  const hasStartedRef = useRef(false);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    if (!videoRef.current) return;

    const videoElement = videoRef.current;

    const handlePlay = () => {
      if (!hasStartedRef.current) {
        hasStartedRef.current = true;
        track(`${eventPrefix}_started`, {
          src: videoSrc,
          locale,
          durationSec: Math.round(videoElement.duration),
        });
      }
    };

    const handleTimeUpdate = () => {
      if (!hasCompletedRef.current) {
        const progress = videoElement.duration > 0 
          ? videoElement.currentTime / videoElement.duration 
          : 0;
        
        if (progress >= 0.9) {
          hasCompletedRef.current = true;
          track(`${eventPrefix}_completed`, {
            src: videoSrc,
            durationSec: Math.round(videoElement.duration),
            watchedSec: Math.round(videoElement.currentTime),
            locale,
          });
        }
      }
    };

    const handleEnded = () => {
      if (!hasCompletedRef.current) {
        hasCompletedRef.current = true;
        track(`${eventPrefix}_completed`, {
          src: videoSrc,
          durationSec: Math.round(videoElement.duration),
          watchedSec: Math.round(videoElement.currentTime),
          locale,
          completedFully: true,
        });
      }
    };

    videoElement.addEventListener("play", handlePlay);
    videoElement.addEventListener("timeupdate", handleTimeUpdate);
    videoElement.addEventListener("ended", handleEnded);

    return () => {
      videoElement.removeEventListener("play", handlePlay);
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      videoElement.removeEventListener("ended", handleEnded);
    };
  }, [videoRef, videoSrc, eventPrefix, locale]);
}
