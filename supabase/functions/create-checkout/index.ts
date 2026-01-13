import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0';

// Allowed origins for CORS
const allowedOrigins = [
  'https://queuejoy.netlify.app',
  'https://helloqueuejoy.netlify.app',
];

function getCorsHeaders(origin: string | null): Record<string, string> {
  const allowedOrigin = origin && allowedOrigins.includes(origin) 
    ? origin 
    : allowedOrigins[0];
  
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Credentials': 'true',
  };
}

// Structured logger with sanitization
const logger = {
  info: (message: string, context?: Record<string, unknown>) => {
    const sanitized = sanitizeContext(context);
    console.log(JSON.stringify({ 
      level: 'info', 
      message, 
      timestamp: new Date().toISOString(), 
      ...sanitized 
    }));
  },
  error: (message: string, context?: Record<string, unknown>) => {
    const sanitized = sanitizeContext(context);
    console.error(JSON.stringify({ 
      level: 'error', 
      message, 
      timestamp: new Date().toISOString(), 
      ...sanitized 
    }));
  }
};

function sanitizeContext(context?: Record<string, unknown>): Record<string, unknown> {
  if (!context) return {};
  const sanitized = { ...context };
  
  // Truncate session IDs for privacy
  if (typeof sanitized.session_id === 'string') {
    sanitized.session_id = `${(sanitized.session_id as string).substring(0, 12)}...`;
  }
  
  // Never log secrets
  delete sanitized.stripe_secret;
  delete sanitized.api_key;
  
  return sanitized;
}

// Validate price ID format (Stripe price IDs start with 'price_')
function validatePriceId(priceId: string): boolean {
  if (!priceId || typeof priceId !== 'string') return false;
  return /^price_[a-zA-Z0-9]+$/.test(priceId);
}

serve(async (req) => {
  const origin = req.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    });

    const { priceId } = await req.json();

    // Validate price ID format
    if (!validatePriceId(priceId)) {
      return new Response(
        JSON.stringify({ error: 'Invalid price ID format' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }

    // Use the validated origin for redirect URLs
    const redirectOrigin = origin && allowedOrigins.includes(origin) 
      ? origin 
      : allowedOrigins[0];

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${redirectOrigin}/#/stripe-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${redirectOrigin}`,
      metadata: {
        plan: 'monthly_myr_10',
      },
    });

    logger.info('Checkout session created', { session_id: session.id });

    return new Response(
      JSON.stringify({ url: session.url }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    logger.error('Error creating checkout session', { error: error instanceof Error ? error.message : 'Unknown error' });
    return new Response(
      JSON.stringify({ error: 'Failed to create checkout session' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
