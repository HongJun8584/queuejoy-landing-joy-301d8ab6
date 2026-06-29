interface AnalyticsEvent {
  event: string;
  props?: Record<string, any>;
  timestamp: number;
}

const MAX_STORED_EVENTS = 50;
const STORAGE_KEY = "queuejoy:analytics:events";

export function track(event: string, props?: Record<string, any>): void {
  const analyticsEvent: AnalyticsEvent = {
    event,
    props,
    timestamp: Date.now(),
  };

  // Always log to console
  console.info("[analytics]", event, props);

  // Forward to Google Analytics if available
  if (typeof window !== "undefined" && (window as any).gtag) {
    try {
      (window as any).gtag("event", event, props);
    } catch (error) {
      console.error("[analytics] Failed to send to gtag:", error);
    }
  }

  // Persist to localStorage
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    let events: AnalyticsEvent[] = stored ? JSON.parse(stored) : [];
    events.push(analyticsEvent);
    
    // Keep only last 50 events
    if (events.length > MAX_STORED_EVENTS) {
      events = events.slice(-MAX_STORED_EVENTS);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  } catch (error) {
    console.error("[analytics] Failed to persist event:", error);
  }
}

export function getStoredEvents(): AnalyticsEvent[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function clearStoredEvents(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore
  }
}
