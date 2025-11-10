import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { StripeCheckoutButton } from "./StripeCheckoutButton";

const AboutDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating button */}
      <Button
        onClick={() => setIsOpen(true)}
        variant="hero"
        className="fixed bottom-6 right-6 z-50 rounded-full px-6 py-3 shadow-glow hover-lift text-base font-semibold"
        aria-label="About QueueJoy"
      >
        Click me!
      </Button>

      {/* Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">About QueueJoy</DialogTitle>
            <DialogDescription className="text-base pt-4 leading-relaxed">
              Hi! I'm Hong Jun, 14, and I created QueueJoy to help local stores manage queues effortlessly. QueueJoy transforms slow, traditional lines into a modern, fast, and easy system—no expensive hardware or complicated setup needed. Staff can focus on service, not crowd control, while customers enjoy a smoother experience. IF YOU BUY MY SYSTEM, I CAN HELP TO PROMOTE YOUR COMPANY IN MY INSTAGRAM!
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 justify-end pt-4">
            <Button onClick={() => setIsOpen(false)} variant="outline">
              Got it
            </Button>
            <StripeCheckoutButton size="default">
              Buy Now - RM10/month
            </StripeCheckoutButton>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AboutDialog;
