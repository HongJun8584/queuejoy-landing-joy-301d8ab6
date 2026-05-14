import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import analytics1 from "@/assets/analytics-demo-1.avif";
import analytics2 from "@/assets/analytics-demo-2.avif";

const slides = [
  { src: analytics1, alt: "QueueJoy analytics dashboard — overview" },
  { src: analytics2, alt: "QueueJoy analytics dashboard — detail view" },
];

export const AnalyticsSlider = () => {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((i: number) => {
    setIndex(((i % slides.length) + slides.length) % slides.length);
  }, []);
  const prev = useCallback(() => goTo(index - 1), [index, goTo]);
  const next = useCallback(() => goTo(index + 1), [index, goTo]);

  // Keyboard navigation when slider is focused
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = (e: KeyboardEvent) => {
      if (!el.matches(":hover") && document.activeElement !== el) return;
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) (dx > 0 ? prev : next)();
    touchStartX.current = null;
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className="relative max-w-5xl mx-auto group focus:outline-none"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      role="region"
      aria-roledescription="carousel"
      aria-label="Analytics screenshots"
    >
      {/* Aspect ratio container — 1882x915 ≈ 2.057:1 */}
      <div
        className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-muted to-accent/10 shadow-2xl border border-border/50"
        style={{ aspectRatio: "1882 / 915" }}
      >
        {slides.map((s, i) => (
          <img
            key={i}
            src={s.src}
            alt={s.alt}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
            width={1882}
            height={915}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out ${
              i === index ? "opacity-100 scale-100" : "opacity-0 scale-[1.02] pointer-events-none"
            }`}
          />
        ))}

        {/* Arrows */}
        <button
          onClick={prev}
          aria-label="Previous analytics screenshot"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-background/90 backdrop-blur border border-border shadow-lg flex items-center justify-center transition-all duration-200 opacity-70 hover:opacity-100 hover:scale-110 hover:bg-background"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          aria-label="Next analytics screenshot"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-background/90 backdrop-blur border border-border shadow-lg flex items-center justify-center transition-all duration-200 opacity-70 hover:opacity-100 hover:scale-110 hover:bg-background"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Counter badge */}
        <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-background/80 backdrop-blur text-xs font-semibold border border-border/50">
          {index + 1} / {slides.length}
        </div>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mt-5" role="tablist">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            role="tab"
            aria-selected={i === index}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === index ? "w-8 bg-primary" : "w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
