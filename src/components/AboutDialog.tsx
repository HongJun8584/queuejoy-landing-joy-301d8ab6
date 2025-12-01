import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { StripeCheckoutButton } from "./StripeCheckoutButton";

const AboutDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      {/* Floating button */}
      <Button
        onClick={() => setIsOpen(true)}
        variant="hero"
        className="fixed bottom-6 right-6 z-50 rounded-full px-6 py-3 shadow-glow hover-lift text-base font-semibold animate-fade-up"
        aria-label={t("clickme.button")}
      >
        {t("clickme.button")}
      </Button>

      {/* Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">{t("clickme.title")}</DialogTitle>
            <DialogDescription className="text-base pt-4 leading-relaxed whitespace-pre-line">
              {t("clickme.description")}
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 justify-end pt-4">
            <Button onClick={() => setIsOpen(false)} variant="outline">
              {t("clickme.cta.ok")}
            </Button>
            <StripeCheckoutButton size="default">
              {t("clickme.cta.buy")}
            </StripeCheckoutButton>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AboutDialog;
