import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

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
  
  // Truncate or redact sensitive data
  if (typeof sanitized.slug === 'string' && (sanitized.slug as string).length > 20) {
    sanitized.slug = `${(sanitized.slug as string).substring(0, 20)}...`;
  }
  if (typeof sanitized.token === 'string') {
    sanitized.token = '[REDACTED]';
  }
  
  return sanitized;
}

// Validate token format (64 hex characters)
function validateTokenFormat(token: string): boolean {
  return /^[a-f0-9]{64}$/i.test(token);
}

// Validate slug format
function validateSlugFormat(slug: string): boolean {
  if (!slug || typeof slug !== 'string') return false;
  if (slug.length < 3 || slug.length > 50) return false;
  return /^[a-z0-9-]+$/.test(slug);
}

serve(async (req) => {
  const origin = req.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { slug, token } = await req.json();

    if (!slug || !token) {
      return new Response(
        JSON.stringify({ error: 'Missing slug or token' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }

    // Validate slug format
    if (!validateSlugFormat(slug)) {
      return new Response(
        JSON.stringify({ error: 'Invalid credentials', authenticated: false }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401,
        }
      );
    }

    // Validate token format before hashing
    if (!validateTokenFormat(token)) {
      return new Response(
        JSON.stringify({ error: 'Invalid credentials', authenticated: false }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401,
        }
      );
    }

    logger.info('Verifying admin access', { slug });

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Hash the provided token
    const encoder = new TextEncoder();
    const data = encoder.encode(token);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedToken = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // Verify against database using service role
    const { data: tenant, error } = await supabase
      .from('tenants')
      .select('id, slug, settings, logo_url')
      .eq('slug', slug)
      .eq('admin_token_hash', hashedToken)
      .single();

    if (error || !tenant) {
      logger.error('Invalid admin credentials', { slug });
      return new Response(
        JSON.stringify({ error: 'Invalid credentials', authenticated: false }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401,
        }
      );
    }

    logger.info('Admin verified successfully', { slug });

    return new Response(
      JSON.stringify({ 
        authenticated: true,
        tenant: {
          id: tenant.id,
          slug: tenant.slug,
          settings: tenant.settings,
          logo_url: tenant.logo_url
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    logger.error('Error verifying admin', { error: error instanceof Error ? error.message : 'Unknown error' });
    return new Response(
      JSON.stringify({ error: 'An error occurred', authenticated: false }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
