import { useEffect, useRef } from "react";

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useScrollReveal(
  elementRef: React.RefObject<HTMLElement | null>,
  options: UseScrollRevealOptions = {}
) {
  const {
    threshold = 0.1,
    rootMargin = "0px",
    once = true,
  } = options;

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Create intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.setAttribute("data-revealed", "true");
            
            if (once && observerRef.current) {
              observerRef.current.unobserve(element);
            }
          } else if (!once) {
            element.setAttribute("data-revealed", "false");
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    // If user prefers reduced motion, immediately reveal
    if (prefersReducedMotion) {
      element.setAttribute("data-revealed", "true");
    } else {
      observerRef.current.observe(element);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [elementRef, threshold, rootMargin, once]);
}
