import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const FIREBASE_DB_URL = Deno.env.get("FIREBASE_DB_URL") || "";
const MASTER_API_KEY = Deno.env.get("MASTER_API_KEY") || "";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-master-key",
};

interface CreateBusinessRequest {
  slug: string;
  name?: string;
  sessionId?: string;
  contactEmail?: string;
  contactPhone?: string;
  defaults?: {
    introText?: string;
    adText?: string;
    adImage?: string;
    logo?: string;
    chatId?: string;
    extra?: Record<string, unknown>;
  };
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify master API key
    const authHeader = req.headers.get("x-master-key") || req.headers.get("authorization") || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;
    
    if (!MASTER_API_KEY) {
      throw new Error("MASTER_API_KEY not configured on server");
    }
    
    if (token !== MASTER_API_KEY) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body: CreateBusinessRequest = await req.json();
    const slugRaw = (body.slug || "").trim().toLowerCase();
    
    if (!slugRaw) {
      return new Response(
        JSON.stringify({ error: "slug required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const slug = slugRaw.replace(/[^a-z0-9\-]/g, "-");

    // Check if business already exists
    const checkResponse = await fetch(`${FIREBASE_DB_URL}/businesses/${slug}.json`);
    const existingBusiness = await checkResponse.json();
    
    if (existingBusiness && existingBusiness.createdAt) {
      return new Response(
        JSON.stringify({ error: "Slug already exists" }),
        { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const name = body.name || slug;
    const defaults = body.defaults || {};

    const data = {
      createdAt: Date.now(),
      name,
      settings: {
        name,
        introText: defaults.introText || "Welcome to our store!",
        adText: defaults.adText || "",
        adImage: defaults.adImage || "",
        logo: defaults.logo || "",
        chatId: defaults.chatId || "",
      },
      customers: {},
      meta: {
        createdBy: body.contactEmail || "system",
        id: slug,
        sessionId: body.sessionId || "",
        contactEmail: body.contactEmail || "",
        contactPhone: body.contactPhone || "",
      },
      ...(defaults.extra || {}),
    };

    // Create business in Firebase
    const createResponse = await fetch(`${FIREBASE_DB_URL}/businesses/${slug}.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!createResponse.ok) {
      throw new Error("Failed to create business in Firebase");
    }

    return new Response(
      JSON.stringify({ 
        ok: true, 
        slug, 
        data,
        adminUrl: `/admin.html?slug=${encodeURIComponent(slug)}`,
        siteUrl: `/index.html?slug=${encodeURIComponent(slug)}`,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("createBusiness error", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
