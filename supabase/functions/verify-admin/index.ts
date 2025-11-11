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

    console.log('Verifying admin access for slug:', slug);

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
      console.error('Invalid admin credentials for slug:', slug);
      return new Response(
        JSON.stringify({ error: 'Invalid credentials', authenticated: false }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401,
        }
      );
    }

    console.log('Admin verified successfully for slug:', slug);

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
    console.error('Error verifying admin:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage, authenticated: false }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
