import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card } from "./ui/card";
import { Loader2, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface PostPaymentFormProps {
  sessionId: string;
}

export const PostPaymentForm = ({ sessionId }: PostPaymentFormProps) => {
  const [slug, setSlug] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<{slug: string, name: string} | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessData(null);

    try {
      // Call the create-business edge function
      const { data, error } = await supabase.functions.invoke('create-business', {
        body: {
          slug: slug.toLowerCase().trim(),
          name: businessName.trim(),
          defaults: {
            introText: "Welcome to our queue!",
            enableAnnouncements: true,
            enableMiniGames: false
          }
        }
      });

      if (error) throw error;
      if (!data?.ok) throw new Error(data?.error || "Failed to create business");
      
      setSuccessData({
        slug: data.slug,
        name: businessName
      });
    } catch (error: any) {
      console.error("Business creation error:", error);
      setErrorMessage(error.message || "Failed to create business. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (successData) {
    return (
      <div className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-2 border-green-300 dark:border-green-700 rounded-xl space-y-6 animate-scale-in max-w-3xl mx-auto">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-3xl font-bold text-green-800 dark:text-green-200 mb-3">🎉 Success!</h3>
          <p className="text-lg text-green-700 dark:text-green-300 mb-6">
            Your business <span className="font-bold">"{successData.name}"</span> has been created!
          </p>
          <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-6 space-y-3 mb-8 shadow-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">Your business slug:</p>
            <code className="text-2xl font-mono font-bold text-primary block">{successData.slug}</code>
          </div>
          <div className="space-y-4">
            <a 
              href={`/admin.html?slug=${successData.slug}`}
              className="block w-full py-4 px-6 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl font-semibold hover:shadow-glow transition-all duration-300 hover:scale-105"
            >
              🚀 Go to Admin Dashboard →
            </a>
            <a 
              href={`/index.html?slug=${successData.slug}`}
              className="block w-full py-4 px-6 bg-secondary text-secondary-foreground rounded-xl font-semibold hover:opacity-90 transition-opacity"
            >
              👥 View Public Queue Page →
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className="p-8 max-w-2xl mx-auto shadow-2xl">
      <h3 className="text-3xl font-bold mb-2 text-gradient">Setup My System</h3>
      <p className="text-muted-foreground mb-8 text-lg">
        Create your business queue in seconds
      </p>

      {errorMessage && (
        <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive mb-6 animate-fade-in">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="businessName" className="text-base">Business Name *</Label>
          <Input
            id="businessName"
            required
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="e.g., Happy Café"
            className="mt-2 text-lg py-6"
          />
        </div>

        <div>
          <Label htmlFor="slug" className="text-base">Choose Your URL Slug *</Label>
          <Input
            id="slug"
            required
            value={slug}
            onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
            placeholder="e.g., happy-cafe"
            className="mt-2 text-lg py-6"
          />
          <p className="text-sm text-muted-foreground mt-2">
            Your admin: <span className="font-mono">admin.html?slug={slug || 'your-slug'}</span>
          </p>
        </div>

        <Button 
          type="submit" 
          size="lg" 
          className="w-full text-lg py-6 bg-gradient-to-r from-primary to-primary/80 hover:shadow-glow transition-all duration-300 hover:scale-105" 
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Creating Your Queue System...
            </>
          ) : (
            "🚀 Create My QueueJoy System"
          )}
        </Button>
      </form>
    </Card>
  );
};
