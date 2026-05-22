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
  
  // Truncate sensitive IDs
  if (typeof sanitized.session_id === 'string') {
    sanitized.session_id = `${(sanitized.session_id as string).substring(0, 8)}...`;
  }
  if (typeof sanitized.admin_token === 'string') {
    sanitized.admin_token = '[REDACTED]';
  }
  if (typeof sanitized.token === 'string') {
    sanitized.token = '[REDACTED]';
  }
  
  // Remove any stripe secrets
  delete sanitized.stripe_secret;
  delete sanitized.stripe_key;
  
  return sanitized;
}

// Enhanced slug validation
function validateSlug(slug: string): { valid: boolean; error?: string } {
  if (!slug || typeof slug !== 'string') {
    return { valid: false, error: 'Slug is required' };
  }
  
  const trimmed = slug.trim();
  
  // Length check
  if (trimmed.length < 3 || trimmed.length > 50) {
    return { valid: false, error: 'Slug must be 3-50 characters' };
  }
  
  // Format check
  if (!/^[a-z0-9-]+$/.test(trimmed)) {
    return { valid: false, error: 'Slug must contain only lowercase letters, numbers, and hyphens' };
  }
  
  // Hyphen position check
  if (trimmed.startsWith('-') || trimmed.endsWith('-') || trimmed.includes('--')) {
    return { valid: false, error: 'Slug cannot start/end with hyphen or contain consecutive hyphens' };
  }
  
  // Reserved words check
  const reserved = ['admin', 'api', 'auth', 'login', 'logout', 'signup', 'dashboard', 'settings', 'help', 'support', 'billing', 'account', 'profile', 'status', 'counter', 'null', 'undefined'];
  if (reserved.includes(trimmed)) {
    return { valid: false, error: 'This slug is reserved' };
  }
  
  return { valid: true };
}

// Validate business name
function validateBusinessName(name: string): { valid: boolean; error?: string } {
  if (!name || typeof name !== 'string') {
    return { valid: false, error: 'Business name is required' };
  }
  
  const trimmed = name.trim();
  
  if (trimmed.length < 1 || trimmed.length > 100) {
    return { valid: false, error: 'Business name must be 1-100 characters' };
  }
  
  return { valid: true };
}

serve(async (req) => {
  const origin = req.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { session_id, slug, business_name } = await req.json();

    if (!session_id || !slug || !business_name) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: session_id, slug, business_name' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }

    // Validate slug
    const slugValidation = validateSlug(slug);
    if (!slugValidation.valid) {
      return new Response(
        JSON.stringify({ error: slugValidation.error }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }

    // Validate business name
    const nameValidation = validateBusinessName(business_name);
    if (!nameValidation.valid) {
      return new Response(
        JSON.stringify({ error: nameValidation.error }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }

    logger.info('Setting up tenant', { slug, session_id });

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check if slug is already taken
    const { data: existingTenant } = await supabase
      .from('tenants')
      .select('slug')
      .eq('slug', slug)
      .single();

    if (existingTenant) {
      return new Response(
        JSON.stringify({ error: 'This slug is already taken. Please choose another.' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 409,
        }
      );
    }

    // Lookup session mapping (idempotent: refresh-safe)
    const { data: mapping, error: mappingError } = await supabase
      .from('sessions_map')
      .select('*')
      .eq('session_id', session_id)
      .single();

    if (mappingError || !mapping) {
      logger.error('Session not found', { session_id });
      return new Response(
        JSON.stringify({ error: 'Invalid session. Please contact support.' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 404,
        }
      );
    }

    // Idempotency: if this Stripe session already provisioned a tenant, return existing links
    if (mapping.tenant_slug && mapping.admin_token) {
      const responseOrigin = origin || 'https://queuejoy-live.netlify.app';
      const existingSlug = mapping.tenant_slug;
      const existingToken = mapping.admin_token;
      logger.info('Idempotent hit: returning existing tenant links', { session_id, slug: existingSlug });
      return new Response(
        JSON.stringify({
          ok: true,
          exists: true,
          slug: existingSlug,
          links: {
            home: `${responseOrigin}/index.html?slug=${encodeURIComponent(existingSlug)}`,
            counter: `${responseOrigin}/counter.html?slug=${encodeURIComponent(existingSlug)}`,
            admin: `${responseOrigin}/admin.html?slug=${encodeURIComponent(existingSlug)}&token=${encodeURIComponent(existingToken)}`,
          },
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );
    }

    // Generate secure admin token
    const tokenBytes = new Uint8Array(32);
    crypto.getRandomValues(tokenBytes);
    const adminToken = Array.from(tokenBytes).map(b => b.toString(16).padStart(2, '0')).join('');

    // Hash the token
    const encoder = new TextEncoder();
    const data = encoder.encode(adminToken);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const tokenHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // Create tenant with sanitized business name
    const sanitizedBusinessName = business_name.trim().substring(0, 100);
    
    const { error: tenantError } = await supabase
      .from('tenants')
      .insert({
        slug,
        admin_token_hash: tokenHash,
        stripe_customer_id: mapping.stripe_customer_id,
        stripe_subscription_id: mapping.stripe_subscription_id,
        plan: 'monthly_myr_10',
        active: true,
        settings: {
          business_name: sanitizedBusinessName,
          welcome_text: 'Welcome! Please take a number.',
          ads_html: '<p>Thank you for choosing us!</p>',
        }
      });

    if (tenantError) {
      logger.error('Error creating tenant', { slug, error: tenantError.message });
      throw tenantError;
    }

    // Update session mapping with tenant slug and token
    const { error: updateError } = await supabase
      .from('sessions_map')
      .update({
        tenant_slug: slug,
        admin_token: adminToken,
      })
      .eq('session_id', session_id);

    if (updateError) {
      logger.error('Error updating session mapping', { session_id, error: updateError.message });
      throw updateError;
    }

    logger.info('Tenant created successfully', { slug });

    const responseOrigin = 'https://queuejoy-live.netlify.app';
    return new Response(
      JSON.stringify({
        ok: true,
        slug,
        links: {
          home: `${responseOrigin}/index.html?slug=${encodeURIComponent(slug)}`,
          counter: `${responseOrigin}/counter.html?slug=${encodeURIComponent(slug)}`,
          admin: `${responseOrigin}/admin.html?slug=${encodeURIComponent(slug)}&token=${encodeURIComponent(adminToken)}`,
        },
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    logger.error('Error setting up tenant', { error: error instanceof Error ? error.message : 'Unknown error' });
    return new Response(
      JSON.stringify({ error: 'An error occurred during setup' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
