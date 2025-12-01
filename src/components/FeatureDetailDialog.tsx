import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">
            <span className="text-gradient">{title}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <p className="text-lg text-muted-foreground">{description}</p>

          {videoSrc && (
            <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-primary/20 transition-all duration-300 hover:border-primary/40 hover:shadow-glow">
              <video
                src={videoSrc}
                controls
                autoPlay
                loop
                className="w-full h-auto"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          )}

          {/* General demo information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Why This Matters</h3>
            <p className="text-foreground/90">
              Watch how QueueJoy transforms the waiting experience. This feature demonstrates real-world usage and shows how businesses and customers benefit from our smart queue management system.
            </p>
          </div>

          {/* Feature-specific content */}
          {featureId === "staffcounter" && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Staff Counter Deep Dive</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <p className="text-foreground/90">
                    <strong>One-Tap Calling:</strong> Staff press "Next" and the system automatically notifies the customer via Telegram
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <p className="text-foreground/90">
                    <strong>Real-Time Sync:</strong> All displays and customer devices update instantly when numbers are called
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <p className="text-foreground/90">
                    <strong>Service History:</strong> Track last served customer, average service time, and throughput
                  </p>
                </li>
              </ul>
            </div>
          )}

          {featureId === "admindashboard" && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Dashboard Analytics</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                  </div>
                  <p className="text-foreground/90">
                    <strong>Live Metrics:</strong> Monitor queue length, wait times, and service speed in real-time
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                  </div>
                  <p className="text-foreground/90">
                    <strong>Peak Hour Analysis:</strong> Identify busy periods and optimize staff allocation
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                  </div>
                  <p className="text-foreground/90">
                    <strong>Export Reports:</strong> Download daily, weekly, or monthly reports for business insights
                  </p>
                </li>
              </ul>
            </div>
          )}

          {featureId === "feature1" && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">How Telegram Alerts Work</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <p className="text-foreground/90">
                    Customers scan QR code or click link to join queue via Telegram
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <p className="text-foreground/90">
                    Real-time notifications sent as their turn approaches
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <p className="text-foreground/90">
                    Final alert when it's time to proceed to counter
                  </p>
                </li>
              </ul>
            </div>
          )}

          {featureId === "feature2" && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Live Status Features</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <p className="text-foreground/90">
                    Display current serving number and customer's number
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <p className="text-foreground/90">
                    Show estimated wait time and people ahead
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <p className="text-foreground/90">
                    Works on any device - phone, tablet, or TV display
                  </p>
                </li>
              </ul>
            </div>
          )}

          {featureId === "feature3" && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Announcement Capabilities</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <p className="text-foreground/90">
                    Send direct messages to all customers in queue
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <p className="text-foreground/90">
                    Support for text, images, videos, and links
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <p className="text-foreground/90">
                    Schedule announcements or send immediately
                  </p>
                </li>
              </ul>
            </div>
          )}

          {featureId === "feature4" && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Enhanced Experience Options</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <p className="text-foreground/90">
                    Mini-games to keep customers entertained while waiting
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <p className="text-foreground/90">
                    Custom welcome messages and branding
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <p className="text-foreground/90">
                    Audio callouts for noisy or busy environments
                  </p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
