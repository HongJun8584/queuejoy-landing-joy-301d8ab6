import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
});

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
  if (typeof sanitized.subscription_id === 'string') {
    sanitized.subscription_id = `${(sanitized.subscription_id as string).substring(0, 12)}...`;
  }
  if (typeof sanitized.customer_id === 'string') {
    sanitized.customer_id = `${(sanitized.customer_id as string).substring(0, 12)}...`;
  }
  
  // Never log secrets
  delete sanitized.stripe_secret;
  delete sanitized.webhook_secret;
  delete sanitized.api_key;
  
  return sanitized;
}

serve(async (req) => {
  const signature = req.headers.get('stripe-signature');
  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');

  if (!signature || !webhookSecret) {
    logger.error('Missing signature or webhook secret');
    return new Response('Webhook signature missing', { status: 400 });
  }

  try {
    const body = await req.text();
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    logger.info('Webhook event received', { event_type: event.type });

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      
      logger.info('Processing checkout session', { session_id: session.id });

      // Store pending session - tenant will be created when user completes setup
      const { error: mappingError } = await supabase
        .from('sessions_map')
        .insert({
          session_id: session.id,
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: session.subscription as string,
        });

      if (mappingError) {
        logger.error('Error creating session mapping', { session_id: session.id, error: mappingError.message });
        throw mappingError;
      }

      logger.info('Pending session created', { session_id: session.id });
    }

    if (event.type === 'customer.subscription.deleted' || 
        event.type === 'customer.subscription.updated') {
      const subscription = event.data.object as Stripe.Subscription;
      
      logger.info('Processing subscription event', { 
        event_type: event.type, 
        subscription_id: subscription.id 
      });

      const { error } = await supabase
        .from('tenants')
        .update({ active: subscription.status === 'active' })
        .eq('stripe_subscription_id', subscription.id);

      if (error) {
        logger.error('Error updating tenant', { subscription_id: subscription.id, error: error.message });
        throw error;
      }

      logger.info('Tenant updated', { subscription_id: subscription.id });
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    logger.error('Webhook error', { error: error instanceof Error ? error.message : 'Unknown error' });
    return new Response(
      JSON.stringify({ error: 'Webhook processing failed' }),
      { status: 400 }
    );
  }
});
