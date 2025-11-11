import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
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

    console.log('Claiming session:', sessionId);

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
      console.error('Session not found:', sessionId);
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
      console.error('Session already claimed:', sessionId);
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
      console.error('Session expired:', sessionId);
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

    const origin = req.headers.get('origin') || 'https://queuejoy.netlify.app';
    const tenantUrl = `${origin}/admin/${mapping.tenant_slug}?token=${mapping.admin_token}`;

    console.log('Session claimed, redirecting to:', mapping.tenant_slug);

    return new Response(
      JSON.stringify({ tenant_url: tenantUrl }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error claiming session:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});