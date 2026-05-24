import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Loader2, CheckCircle, XCircle, Copy, ExternalLink, Download, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

// Configuration — production live domain (the deployed tenant app + Netlify functions host)
const NETLIFY_BASE = "https://queuejoy-live.netlify.app";
const CREATE_BUSINESS_ENDPOINT = `${NETLIFY_BASE}/.netlify/functions/createBusiness`;

const buildStatusUrl = (s: string) => `${NETLIFY_BASE}/index.html?slug=${encodeURIComponent(s)}`;
const buildAdminUrl = (s: string, token?: string) =>
  `${NETLIFY_BASE}/admin.html?slug=${encodeURIComponent(s)}${token ? `&token=${encodeURIComponent(token)}` : ""}`;
const buildCounterUrl = (s: string) => `${NETLIFY_BASE}/counter.html?slug=${encodeURIComponent(s)}`;

interface TenantLinks {
  home: string;
  counter: string;
  admin: string;
}

interface CreateBusinessResponse {
  ok?: boolean;
  tenantId?: string;
  slug?: string;
  adminToken?: string;
  // legacy / alt shapes
  data?: any;
  adminUrl?: string;
  siteUrl?: string;
  error?: string;
  message?: string;
}

// Stable idempotency key keyed by Stripe session_id (survives refresh + StrictMode double-mount)
function getOrCreateIdempotencyKey(sessionId: string): string {
  const storageKey = `queuejoy:idem:${sessionId}`;
  try {
    const existing = sessionStorage.getItem(storageKey);
    if (existing) return existing;
    const fresh =
      (crypto as any)?.randomUUID?.() ??
      `idem_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    sessionStorage.setItem(storageKey, fresh);
    return fresh;
  } catch {
    return `idem_${sessionId}`;
  }
}

const StripeSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const sessionId = searchParams.get("session_id");

  const [status, setStatus] = useState<"form" | "submitting" | "success" | "error">("form");
  const [slug, setSlug] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [links, setLinks] = useState<TenantLinks | null>(null);

  // Double-execution guard (React StrictMode / rapid clicks)
  const submittingRef = useRef(false);

  const [checklist, setChecklist] = useState({
    openCustomer: false,
    openCounter: false,
    openAdmin: false,
    downloadQr: false,
  });

  // Restore prior result on refresh
  useEffect(() => {
    if (!sessionId) return;
    try {
      const cached = sessionStorage.getItem(`queuejoy:setup:${sessionId}`);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed?.links?.home && parsed?.slug) {
          setSlug(parsed.slug);
          setBusinessName(parsed.businessName || "");
          setLinks(parsed.links);
          setStatus("success");
        }
      }
    } catch {
      /* ignore */
    }
  }, [sessionId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!sessionId) {
      setErrorMessage("Invalid session. Please contact support.");
      setStatus("error");
      return;
    }

    if (!slug || !businessName) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, "");
    if (cleanSlug.length < 3 || cleanSlug.length > 50) {
      setErrorMessage("Slug must be 3–50 characters (letters, numbers, hyphens).");
      return;
    }

    // Guard against double-submission (StrictMode, retries, rapid clicks)
    if (submittingRef.current) return;
    submittingRef.current = true;

    setStatus("submitting");
    setErrorMessage("");

    const idempotencyKey = getOrCreateIdempotencyKey(sessionId);

    try {
      const res = await fetch(CREATE_BUSINESS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": idempotencyKey,
        },
        body: JSON.stringify({
          businessName,
          email: email || undefined,
          desiredSlug: cleanSlug,
          plan: "monthly_myr_25",
          purchaseInfo: {
            stripeSessionId: sessionId,
            idempotencyKey,
          },
        }),
      });

      // Safe response handling — never assume JSON
      const contentType = res.headers.get("content-type") || "";
      const isJson = contentType.includes("application/json");

      if (!res.ok) {
        let serverMsg = "";
        try {
          serverMsg = isJson
            ? (await res.json())?.error || (await Promise.resolve("")) // fallback chain
            : (await res.text()).slice(0, 200);
        } catch {
          serverMsg = "";
        }

        if (res.status === 404) {
          throw new Error(
            "Setup service is temporarily unavailable (404). Please contact support — your payment is safe."
          );
        }
        if (res.status === 409) {
          throw new Error(serverMsg || "That slug is already taken. Please choose a different one.");
        }
        throw new Error(serverMsg || `Setup failed (HTTP ${res.status}). Please try again.`);
      }

      if (!isJson) {
        const text = await res.text();
        console.error("[StripeSuccess] Non-JSON response:", text.slice(0, 200));
        throw new Error("Setup service returned an unexpected response. Please contact support.");
      }

      const data: CreateBusinessResponse = await res.json();
      const finalSlug = data.slug || cleanSlug;
      const adminToken = data.adminToken;

      const resolvedLinks: TenantLinks = {
        home: buildStatusUrl(finalSlug),
        counter: buildCounterUrl(finalSlug),
        admin: buildAdminUrl(finalSlug, adminToken),
      };

      setLinks(resolvedLinks);
      setStatus("success");

      try {
        sessionStorage.setItem(
          `queuejoy:setup:${sessionId}`,
          JSON.stringify({
            slug: finalSlug,
            businessName,
            tenantId: data.tenantId,
            links: resolvedLinks,
          })
        );
      } catch {
        /* ignore */
      }
    } catch (err: any) {
      console.error("[StripeSuccess] createBusiness error:", err);
      setErrorMessage(err?.message || "Failed to create your system. Please try again.");
      setStatus("error");
    } finally {
      submittingRef.current = false;
    }
  };

  const handleSlugChange = (value: string) => {
    const formatted = value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    setSlug(formatted);
  };

  const copyToClipboard = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    toast({ title: "Copied!", description: `${label} copied to clipboard` });
  };

  const openLink = (url: string, type: "customer" | "counter" | "admin") => {
    window.open(url, "_blank", "noopener,noreferrer");
    setChecklist((prev) => ({
      ...prev,
      [type === "customer" ? "openCustomer" : type === "counter" ? "openCounter" : "openAdmin"]: true,
    }));
  };

  const downloadQR = () => {
    if (!links?.home) return;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(links.home)}`;
    const link = document.createElement("a");
    link.href = qrUrl;
    link.download = `queuejoy-${slug}-qr.png`;
    link.click();
    setChecklist((prev) => ({ ...prev, downloadQr: true }));
    toast({ title: "QR Downloaded!", description: "Print this QR code for customers to scan" });
  };

  const handleRetry = () => {
    setErrorMessage("");
    setStatus("form");
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
          <Button variant="outline" onClick={() => navigate("/")}>
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-background p-4 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Form State */}
        {status === "form" && (
          <div className="bg-card p-8 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border-2 border-primary/30">
            <div className="text-center mb-8">
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
              <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
              <p className="text-muted-foreground">
                Setup takes under a minute. Let's configure your QueueJoy system.
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
                  Shown to your customers on the queue page.
                </p>
              </div>

              <div>
                <Label htmlFor="email" className="text-base">Your Email <span className="text-muted-foreground text-sm">(optional)</span></Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@yourbusiness.com"
                  className="mt-2"
                  maxLength={120}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Used for support and account recovery.
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
                <p className="text-sm text-muted-foreground mt-1 break-all">
                  Your unique URL: {buildStatusUrl(slug || "yourslug")}
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
                Launch My Queue System
              </Button>
            </form>
          </div>
        )}

        {/* Submitting State */}
        {status === "submitting" && (
          <div className="bg-card p-8 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border-2 border-primary/30 text-center">
            <Loader2 className="w-16 h-16 mx-auto mb-6 text-primary animate-spin" />
            <h1 className="text-2xl font-bold mb-4">Creating your system…</h1>
            <p className="text-muted-foreground">
              Setting up <span className="font-semibold">{businessName}</span> at{" "}
              <span className="font-mono">{slug}</span>
            </p>
            <ul className="text-sm text-muted-foreground mt-6 space-y-1 text-left max-w-xs mx-auto">
              <li>✓ Verifying payment</li>
              <li>✓ Creating your business</li>
              <li>✓ Setting up database</li>
              <li>✓ Generating queue pages</li>
              <li>✓ Preparing your dashboard</li>
            </ul>
          </div>
        )}

        {/* Success State */}
        {status === "success" && links && (
          <div className="space-y-6">
            <div className="bg-card p-8 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border-2 border-green-500/30 text-center">
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
              <h1 className="text-2xl font-bold mb-2 text-green-600">
                You're live — welcome to QueueJoy
              </h1>
              <p className="text-muted-foreground">
                Your business links are ready below. Bookmark them or print the QR code.
              </p>
            </div>

            <div className="bg-card p-6 rounded-2xl shadow-lg border border-border">
              <h2 className="text-lg font-bold mb-4">Your Live URLs</h2>

              <div className="space-y-4">
                {/* Customer Page */}
                <div className="p-4 bg-muted/30 rounded-xl">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm mb-1">Customer Page</p>
                      <p className="text-xs text-muted-foreground truncate font-mono">{links.home}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => copyToClipboard(links.home, "Customer page URL")}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button size="sm" onClick={() => openLink(links.home, "customer")}>
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Open
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    What customers see when they scan your QR code.
                  </p>
                </div>

                {/* Counter Page */}
                <div className="p-4 bg-muted/30 rounded-xl">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm mb-1">Counter / Display</p>
                      <p className="text-xs text-muted-foreground truncate font-mono">{links.counter}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => copyToClipboard(links.counter, "Counter page URL")}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button size="sm" onClick={() => openLink(links.counter, "counter")}>
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Open
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Full-screen counter for staff or display monitor.
                  </p>
                </div>

                {/* Admin Page */}
                <div className="p-4 bg-muted/30 rounded-xl">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm mb-1">Admin / Dashboard</p>
                      <p className="text-xs text-muted-foreground truncate font-mono">{links.admin}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => copyToClipboard(links.admin, "Admin page URL")}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button size="sm" onClick={() => openLink(links.admin, "admin")}>
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Open
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Manage queue, promotions, and customers here. Keep this link private.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-6 flex-wrap">
                <Button variant="hero" onClick={() => openLink(links.home, "customer")}>
                  <Play className="h-4 w-4 mr-2" />
                  Try Live Preview
                </Button>
                <Button variant="outline" onClick={downloadQR}>
                  <Download className="h-4 w-4 mr-2" />
                  Download QR (PNG)
                </Button>
              </div>
            </div>

            {/* Checklist */}
            <div className="bg-card p-6 rounded-2xl shadow-lg border border-border">
              <h2 className="text-lg font-bold mb-4">Quick Setup Checklist</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Complete these to go live (under 3 minutes total).
              </p>

              <div className="space-y-3">
                {[
                  { key: "openCustomer", label: "Open Customer page — test Join Queue", time: "~1 min", action: () => openLink(links.home, "customer") },
                  { key: "openCounter", label: "Open Counter page — press Start", time: "~1 min", action: () => openLink(links.counter, "counter") },
                  { key: "openAdmin", label: "Open Admin — confirm business name & slug", time: "~30 sec", action: () => openLink(links.admin, "admin") },
                  { key: "downloadQr", label: "Download QR — print or display", time: "~30 sec", action: downloadQR },
                ].map((item, i) => {
                  const done = (checklist as any)[item.key];
                  return (
                    <div key={item.key} className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${done ? "bg-green-500/10" : "bg-muted/30"}`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${done ? "bg-green-500 text-white" : "bg-primary/20 text-primary"}`}>
                        {done ? "✓" : i + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.time}</p>
                      </div>
                      <Button size="sm" variant="ghost" onClick={item.action}>
                        Do it
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              <p>
                Need help? Contact{" "}
                <a href="mailto:hello.queuejoy@gmail.com" className="text-primary hover:underline">
                  hello.queuejoy@gmail.com
                </a>{" "}
                or WhatsApp{" "}
                <a href="https://wa.me/60195055266" className="text-primary hover:underline">
                  019-505-5266
                </a>
              </p>
            </div>
          </div>
        )}

        {/* Error State */}
        {status === "error" && (
          <div className="bg-card p-8 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border-2 border-destructive/30 text-center">
            <XCircle className="w-16 h-16 mx-auto mb-6 text-destructive" />
            <h1 className="text-2xl font-bold mb-4 text-destructive">Setup Couldn't Finish</h1>
            <p className="text-muted-foreground mb-4">
              {errorMessage || "An error occurred while setting up your system."}
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Your payment is safe. You can retry below or contact support and we'll finish setup for you.
            </p>
            {sessionId && (
              <p className="text-xs text-muted-foreground mb-6 font-mono break-all">
                Reference: {sessionId.slice(0, 16)}…
              </p>
            )}
            <div className="space-y-3">
              <Button variant="hero" onClick={handleRetry} className="w-full">
                Try Again
              </Button>
              <Button
                variant="outline"
                onClick={() => (window.location.href = "mailto:hello.queuejoy@gmail.com")}
                className="w-full"
              >
                Contact Support
              </Button>
              <Button variant="ghost" onClick={() => navigate("/")} className="w-full">
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
