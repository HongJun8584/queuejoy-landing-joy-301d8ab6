import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";

interface FeatureDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  featureId: string;
  title: string;
  description: string;
  videoSrc?: string;
}

export const FeatureDetailDialog = ({
  isOpen,
  onClose,
  featureId,
  title,
  description,
  videoSrc,
}: FeatureDetailDialogProps) => {
  const { t } = useLanguage();
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-background via-background to-primary/5">
        <DialogHeader className="space-y-4 pb-6">
          <DialogTitle className="text-4xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60">
              {title}
            </span>
          </DialogTitle>
          <DialogDescription className="text-xl text-muted-foreground leading-relaxed">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8">
          {/* Video Section */}
          {videoSrc && (
            <div className="group relative rounded-2xl overflow-hidden shadow-2xl border-2 border-primary/30 hover:border-primary/60 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(var(--primary-rgb),0.4)]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
              <video
                src={videoSrc}
                controls
                autoPlay
                className="w-full transition-transform duration-500 group-hover:scale-[1.02]"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          )}

          {/* Feature Details */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gradient">{t(`${featureId}.title`)}</h3>
            <ul className="space-y-4">
              {[1, 2, 3].map((i) => (
                <li 
                  key={i} 
                  className="flex items-start gap-4 p-5 rounded-xl bg-gradient-to-r from-card/80 to-card/40 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:translate-x-2 group animate-fade-up"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <svg className="w-4 h-4 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
                    {t(`${featureId}.bullet${i}`)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
