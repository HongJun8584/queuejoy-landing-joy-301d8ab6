import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const StripeSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get('session_id');
  
  const [status, setStatus] = useState<'form' | 'submitting' | 'success' | 'error'>('form');
  const [slug, setSlug] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [adminUrl, setAdminUrl] = useState('');
  const [publicUrl, setPublicUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!sessionId) {
      setErrorMessage('Invalid session. Please contact support.');
      setStatus('error');
      return;
    }

    if (!slug || !businessName) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const { data, error } = await supabase.functions.invoke('setup-tenant', {
        body: {
          session_id: sessionId,
          slug: slug.toLowerCase().replace(/[^a-z0-9-]/g, ''),
          business_name: businessName,
        },
      });

      if (error) throw error;

      if (data?.ok) {
        setAdminUrl(data.adminUrl);
        setPublicUrl(data.publicUrl);
        setStatus('success');
        
        // Redirect after 3 seconds
        setTimeout(() => {
          window.location.href = data.adminUrl;
        }, 3000);
      } else {
        throw new Error(data?.error || 'Setup failed');
      }
    } catch (error: any) {
      console.error('Setup error:', error);
      setErrorMessage(error.message || 'Failed to create your system. Please try again.');
      setStatus('error');
    }
  };

  const handleSlugChange = (value: string) => {
    // Auto-format slug: lowercase, replace spaces with hyphens
    const formatted = value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    setSlug(formatted);
  };

  if (!sessionId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-accent/5 to-background p-4">
        <div className="max-w-md w-full bg-card p-8 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border-2 border-primary/30 text-center">
          <XCircle className="w-16 h-16 mx-auto mb-6 text-destructive" />
          <h1 className="text-2xl font-bold mb-4 text-destructive">Invalid Session</h1>
          <p className="text-muted-foreground mb-6">
            No payment session found. Please complete checkout first.
          </p>
          <Button variant="outline" onClick={() => navigate('/')}>
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-accent/5 to-background p-4">
      <div className="max-w-md w-full bg-card p-8 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border-2 border-primary/30">
        
        {status === 'form' && (
          <>
            <div className="text-center mb-8">
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
              <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
              <p className="text-muted-foreground">
                Now let's set up your QueueJoy system
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="businessName" className="text-base">Business Name</Label>
                <Input
                  id="businessName"
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. My Cafe"
                  className="mt-2"
                  required
                  maxLength={100}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Your business name as it will appear to customers
                </p>
              </div>

              <div>
                <Label htmlFor="slug" className="text-base">Preferred Slug</Label>
                <Input
                  id="slug"
                  type="text"
                  value={slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  placeholder="e.g. mycafe"
                  className="mt-2 font-mono"
                  required
                  maxLength={50}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Your unique URL: queuejoy.app/<strong>{slug || 'yourslug'}</strong>
                </p>
              </div>

              {errorMessage && (
                <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
                  <p className="text-sm text-destructive">{errorMessage}</p>
                </div>
              )}

              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full"
                disabled={!slug || !businessName}
              >
                Create My System
              </Button>
            </form>
          </>
        )}

        {status === 'submitting' && (
          <div className="text-center">
            <Loader2 className="w-16 h-16 mx-auto mb-6 text-primary animate-spin" />
            <h1 className="text-2xl font-bold mb-4">Creating your system...</h1>
            <p className="text-muted-foreground">
              Setting up {businessName} at <span className="font-mono">{slug}</span>
            </p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <CheckCircle className="w-16 h-16 mx-auto mb-6 text-green-500" />
            <h1 className="text-2xl font-bold mb-4 text-green-600">Your system is ready!</h1>
            <p className="text-muted-foreground mb-6">
              Redirecting to your admin dashboard...
            </p>

            <div className="space-y-3 text-left bg-accent/10 p-4 rounded-lg mb-6">
              <div>
                <p className="text-sm font-semibold mb-1">Admin Dashboard:</p>
                <a
                  href={adminUrl}
                  className="text-sm text-primary hover:underline break-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {adminUrl}
                </a>
              </div>
              <div>
                <p className="text-sm font-semibold mb-1">Customer Page:</p>
                <a
                  href={publicUrl}
                  className="text-sm text-primary hover:underline break-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {publicUrl}
                </a>
              </div>
            </div>

            <Button
              variant="hero"
              size="lg"
              onClick={() => window.location.href = adminUrl}
              className="w-full"
            >
              Go to Admin Dashboard
            </Button>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center">
            <XCircle className="w-16 h-16 mx-auto mb-6 text-destructive" />
            <h1 className="text-2xl font-bold mb-4 text-destructive">Setup Failed</h1>
            <p className="text-muted-foreground mb-4">
              {errorMessage || 'An error occurred while setting up your system.'}
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Your payment was successful. Please contact support with your order details.
            </p>
            <div className="space-y-3">
              <Button
                variant="hero"
                onClick={() => setStatus('form')}
                className="w-full"
              >
                Try Again
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="w-full"
              >
                Return to Home
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StripeSuccess;