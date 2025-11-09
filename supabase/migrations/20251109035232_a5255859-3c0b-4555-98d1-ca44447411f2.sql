-- Modify sessions_map to support pending sessions without tenant
ALTER TABLE public.sessions_map 
DROP CONSTRAINT IF EXISTS sessions_map_tenant_slug_fkey;

ALTER TABLE public.sessions_map 
ALTER COLUMN tenant_slug DROP NOT NULL;

-- Add customer info to sessions_map for later tenant creation
ALTER TABLE public.sessions_map
ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT,
ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT;

-- Add index for customer lookup
CREATE INDEX IF NOT EXISTS idx_sessions_stripe_customer ON public.sessions_map(stripe_customer_id);