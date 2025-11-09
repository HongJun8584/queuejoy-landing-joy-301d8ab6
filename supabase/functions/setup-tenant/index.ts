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

    // Validate slug format (lowercase alphanumeric and hyphens only)
    const slugRegex = /^[a-z0-9-]+$/;
    if (!slugRegex.test(slug)) {
      return new Response(
        JSON.stringify({ error: 'Slug must contain only lowercase letters, numbers, and hyphens' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }

    console.log('Setting up tenant:', slug, 'for session:', session_id);

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

    // Lookup session mapping
    const { data: mapping, error: mappingError } = await supabase
      .from('sessions_map')
      .select('*')
      .eq('session_id', session_id)
      .is('tenant_slug', null)
      .single();

    if (mappingError || !mapping) {
      console.error('Session not found or already claimed:', session_id);
      return new Response(
        JSON.stringify({ error: 'Invalid session or already set up' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 404,
        }
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

    // Create tenant
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
          business_name: business_name,
          welcome_text: 'Welcome! Please take a number.',
          ads_html: '<p>Thank you for choosing us!</p>',
        }
      });

    if (tenantError) {
      console.error('Error creating tenant:', tenantError);
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
      console.error('Error updating session mapping:', updateError);
      throw updateError;
    }

    console.log('Tenant created successfully:', slug);

    const origin = req.headers.get('origin') || 'https://queuejoy.netlify.app';
    const adminUrl = `${origin}/admin/${slug}?token=${adminToken}`;
    const publicUrl = `${origin}/${slug}`;

    return new Response(
      JSON.stringify({
        ok: true,
        adminUrl,
        publicUrl,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error setting up tenant:', error);
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
