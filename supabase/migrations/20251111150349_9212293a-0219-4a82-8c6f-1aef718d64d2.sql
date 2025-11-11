-- Remove overly permissive RLS policy on sessions_map
DROP POLICY IF EXISTS "System can manage sessions" ON public.sessions_map;

-- sessions_map should only be accessible via service role (edge functions)
-- No public access at all - RLS enabled but no policies means deny all

-- Update tenants table RLS policies to be more restrictive
-- Remove public write access
DROP POLICY IF EXISTS "System can create tenants" ON public.tenants;
DROP POLICY IF EXISTS "System can update tenants" ON public.tenants;

-- Keep read access for public (needed for queue display)
-- But restrict write operations to service role only via edge functions

-- Add column to track one-time use of admin tokens from claim-session
ALTER TABLE public.sessions_map 
ADD COLUMN IF NOT EXISTS claimed_at timestamp with time zone DEFAULT NULL;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_sessions_map_session_id ON public.sessions_map(session_id);
CREATE INDEX IF NOT EXISTS idx_tenants_slug ON public.tenants(slug);