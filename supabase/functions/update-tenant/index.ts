import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Basic HTML sanitization - strip script tags and dangerous attributes
function sanitizeHtml(html: string): string {
  if (!html) return '';
  
  // Remove script tags and their content
  let sanitized = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Remove event handler attributes (onclick, onerror, etc.)
  sanitized = sanitized.replace(/\son\w+\s*=\s*["'][^"']*["']/gi, '');
  sanitized = sanitized.replace(/\son\w+\s*=\s*[^\s>]*/gi, '');
  
  // Remove javascript: protocol
  sanitized = sanitized.replace(/javascript:/gi, '');
  
  // Remove dangerous tags
  sanitized = sanitized.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');
  sanitized = sanitized.replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '');
  sanitized = sanitized.replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '');
  
  return sanitized.trim();
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { slug, token, settings, logo_url } = await req.json();

    if (!slug || !token) {
      return new Response(
        JSON.stringify({ error: 'Missing slug or token' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }

    console.log('Updating tenant:', slug);

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Hash the provided token
    const encoder = new TextEncoder();
    const data = encoder.encode(token);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedToken = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // Verify authentication
    const { data: tenant, error: authError } = await supabase
      .from('tenants')
      .select('id')
      .eq('slug', slug)
      .eq('admin_token_hash', hashedToken)
      .single();

    if (authError || !tenant) {
      console.error('Invalid admin credentials for update');
      return new Response(
        JSON.stringify({ error: 'Invalid credentials' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401,
        }
      );
    }

    // Validate and sanitize settings
    if (settings) {
      // Validate business_name
      if (settings.business_name && typeof settings.business_name === 'string') {
        settings.business_name = settings.business_name.trim().substring(0, 100);
      }
      
      // Validate welcome_text
      if (settings.welcome_text && typeof settings.welcome_text === 'string') {
        settings.welcome_text = settings.welcome_text.trim().substring(0, 200);
      }
      
      // Sanitize ads_html
      if (settings.ads_html !== undefined) {
        if (typeof settings.ads_html === 'string') {
          settings.ads_html = sanitizeHtml(settings.ads_html).substring(0, 5000);
        } else {
          settings.ads_html = '';
        }
      }
    }

    // Update tenant
    const updateData: any = {
      updated_at: new Date().toISOString()
    };

    if (settings) {
      updateData.settings = settings;
    }

    if (logo_url !== undefined) {
      updateData.logo_url = logo_url;
    }

    const { error: updateError } = await supabase
      .from('tenants')
      .update(updateData)
      .eq('id', tenant.id);

    if (updateError) {
      console.error('Error updating tenant:', updateError);
      return new Response(
        JSON.stringify({ error: 'Failed to update tenant' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
        }
      );
    }

    console.log('Tenant updated successfully');

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error updating tenant:', error);
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
