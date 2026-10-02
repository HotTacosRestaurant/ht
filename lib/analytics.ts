export const GA_ID =
  process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID ||
  process.env.NEXT_PUBLIC_ANALYTICS_ID ||
  process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ||
  "";

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";

type TrackParams = Record<
  string,
  string | number | boolean | null | undefined
>;

type CleanParams = Record<string, string | number | boolean>;

type AnalyticsCall = {
  args: unknown[];
};

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

const MAX_PENDING_CALLS = 100;

const pendingGA: AnalyticsCall[] = [];
const pendingMeta: AnalyticsCall[] = [];

function cleanParams(params?: TrackParams): CleanParams {
  const cleaned: CleanParams = {};

  if (!params) return cleaned;

  for (const [key, value] of Object.entries(params)) {
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      cleaned[key] = value;
    }
  }

  return cleaned;
}

function queueCall(queue: AnalyticsCall[], args: unknown[]) {
  if (queue.length >= MAX_PENDING_CALLS) {
    queue.shift();
  }

  queue.push({ args });
}

function sendGA(...args: unknown[]) {
  if (typeof window === "undefined" || !GA_ID) return;

  if (typeof window.gtag !== "function") {
    queueCall(pendingGA, args);
    return;
  }

  flushPendingAnalytics();
  window.gtag(...args);
}

function sendMeta(...args: unknown[]) {
  if (typeof window === "undefined" || !META_PIXEL_ID) return;

  if (typeof window.fbq !== "function") {
    queueCall(pendingMeta, args);
    return;
  }

  flushPendingAnalytics();
  window.fbq(...args);
}

export function flushPendingAnalytics() {
  if (typeof window === "undefined") return;

  if (typeof window.gtag === "function") {
    while (pendingGA.length > 0) {
      const call = pendingGA.shift();
      if (call) window.gtag(...call.args);
    }
  }

  if (typeof window.fbq === "function") {
    while (pendingMeta.length > 0) {
      const call = pendingMeta.shift();
      if (call) window.fbq(...call.args);
    }
  }
}

function pushDataLayer(eventName: string, params?: TrackParams) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...cleanParams(params),
  });
}

export function trackPageView(url: string) {
  if (typeof window === "undefined") return;

  const page_location = `${window.location.origin}${url}`;
  const debug_mode = process.env.NODE_ENV !== "production";

  if (GA_ID) {
    sendGA("config", GA_ID, {
      page_path: url,
      page_location,
      page_title: document.title,
      debug_mode,
    });
  }

  if (META_PIXEL_ID) {
    sendMeta("track", "PageView");
  }

  pushDataLayer("page_view", {
    page_path: url,
    page_title: document.title,
  });
}

export function trackEvent(eventName: string, params?: TrackParams) {
  if (typeof window === "undefined") return;

  const cleaned = cleanParams(params);
  const debug_mode = process.env.NODE_ENV !== "production";

  if (GA_ID) {
    sendGA("event", eventName, {
      ...cleaned,
      debug_mode,
    });
  }

  if (META_PIXEL_ID) {
    sendMeta("trackCustom", eventName, cleaned);
  }

  pushDataLayer(eventName, cleaned);
}

export function trackOrderClick(branch?: string, source?: string) {
  const params = {
    branch: branch || "unknown",
    cta_location: source || "unknown",
  };

  trackEvent("order_click", params);
  sendMeta("trackCustom", "OrderClick", params);
}

export function trackCallClick(branch?: string, source?: string) {
  const params = {
    branch: branch || "unknown",
    cta_location: source || "unknown",
  };

  trackEvent("call_click", params);
  sendMeta("trackCustom", "CallClick", params);
}

export function trackDirectionsClick(branch?: string, source?: string) {
  const params = {
    branch: branch || "unknown",
    cta_location: source || "unknown",
  };

  trackEvent("directions_click", params);
  sendMeta("trackCustom", "DirectionsClick", params);
}

export function trackRaffleSubmit(branch?: string, locale?: string) {
  trackEvent("raffle_submit", {
    branch: branch || "unknown",
    locale: locale || "unknown",
    form_name: "raffle",
  });

  sendMeta("track", "Lead", {
    branch: branch || "unknown",
    locale: locale || "unknown",
  });
}

export function trackReviewSubmit(
  branch?: string,
  rating?: number,
  locale?: string
) {
  trackEvent("review_submit", {
    branch: branch || "unknown",
    rating: rating || 0,
    locale: locale || "unknown",
    form_name: "review",
  });
}

export function trackExperienceSubmit(
  branch?: string,
  visitType?: string,
  locale?: string
) {
  trackEvent("customer_experience_submit", {
    branch: branch || "unknown",
    visit_type: visitType || "unknown",
    locale: locale || "unknown",
    form_name: "customer_experience",
  });
}