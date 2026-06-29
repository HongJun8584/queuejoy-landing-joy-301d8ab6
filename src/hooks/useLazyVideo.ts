import { useEffect, useRef } from "react";

interface UseLazyVideoOptions {
  threshold?: number;
  rootMargin?: string;
  onLoad?: () => void;
}

export function useLazyVideo(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  videoSrc: string,
  options: UseLazyVideoOptions = {}
) {
  const {
    threshold = 0.1,
    rootMargin = "200px",
    onLoad,
  } = options;

  const observerRef = useRef<IntersectionObserver | null>(null);
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    if (!videoRef.current) return;

    const videoElement = videoRef.current;

    // If src is already set, consider it loaded
    if (videoElement.src) {
      hasLoadedRef.current = true;
      onLoad?.();
      return;
    }

    // Create intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasLoadedRef.current) {
            // Load video source
            videoElement.src = videoSrc;
            hasLoadedRef.current = true;
            onLoad?.();
            
            // Stop observing after load
            if (observerRef.current) {
              observerRef.current.unobserve(videoElement);
            }
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observerRef.current.observe(videoElement);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [videoRef, videoSrc, threshold, rootMargin, onLoad]);
}
