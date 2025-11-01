import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

const AboutDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating button */}
      <Button
        onClick={() => setIsOpen(true)}
        variant="hero"
        size="icon"
        className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 shadow-glow hover-lift"
        aria-label="About QueueJoy"
      >
        <Info className="w-6 h-6" />
      </Button>

      {/* Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">About QueueJoy</DialogTitle>
            <DialogDescription className="text-base pt-4 leading-relaxed">
              Hi! I'm Hong Jun, 14 years old. I built QueueJoy to help local stores 
              handle queues smoothly and save time.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end pt-2">
            <Button onClick={() => setIsOpen(false)} variant="default">
              Got it
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AboutDialog;
