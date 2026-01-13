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
  
  // Truncate session IDs for privacy
  if (typeof sanitized.session_id === 'string') {
    sanitized.session_id = `${(sanitized.session_id as string).substring(0, 8)}...`;
  }
  if (typeof sanitized.admin_token === 'string') {
    sanitized.admin_token = '[REDACTED]';
  }
  
  return sanitized;
}

// Validate Stripe session ID format
function validateSessionId(sessionId: string): boolean {
  if (!sessionId || typeof sessionId !== 'string') return false;
  // Stripe session IDs start with 'cs_' and contain alphanumeric and underscore
  return /^cs_[a-zA-Z0-9_]+$/.test(sessionId);
}

serve(async (req) => {
  const origin = req.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const sessionId = url.searchParams.get('session_id');

    if (!sessionId) {
      return new Response(
        JSON.stringify({ error: 'Missing session_id parameter' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }

    // Validate session ID format
    if (!validateSessionId(sessionId)) {
      return new Response(
        JSON.stringify({ error: 'Invalid session ID format' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }

    logger.info('Claiming session', { session_id: sessionId });

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Lookup session mapping with one-time use check
    const { data: mapping, error } = await supabase
      .from('sessions_map')
      .select('tenant_slug, admin_token, claimed_at, created_at')
      .eq('session_id', sessionId)
      .single();

    if (error || !mapping) {
      logger.error('Session not found', { session_id: sessionId });
      return new Response(
        JSON.stringify({ error: 'Session not found or not yet processed' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 404,
        }
      );
    }

    // Check if already claimed
    if (mapping.claimed_at) {
      logger.error('Session already claimed', { session_id: sessionId });
      return new Response(
        JSON.stringify({ error: 'Session has already been claimed' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 410,
        }
      );
    }

    // Check if session is expired (24 hours)
    const createdAt = new Date(mapping.created_at);
    const now = new Date();
    const hoursSinceCreation = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);
    
    if (hoursSinceCreation > 24) {
      logger.error('Session expired', { session_id: sessionId });
      return new Response(
        JSON.stringify({ error: 'Session has expired' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 410,
        }
      );
    }

    // Mark session as claimed
    await supabase
      .from('sessions_map')
      .update({ claimed_at: now.toISOString() })
      .eq('session_id', sessionId);

    const responseOrigin = origin || 'https://queuejoy.netlify.app';
    const tenantUrl = `${responseOrigin}/admin/${mapping.tenant_slug}?token=${mapping.admin_token}`;

    logger.info('Session claimed, redirecting', { tenant_slug: mapping.tenant_slug });

    return new Response(
      JSON.stringify({ tenant_url: tenantUrl }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    logger.error('Error claiming session', { error: error instanceof Error ? error.message : 'Unknown error' });
    return new Response(
      JSON.stringify({ error: 'An error occurred' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
