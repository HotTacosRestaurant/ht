export const GA_ID =
  process.env.NEXT_PUBLIC_ANALYTICS_ID ||
  process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ||
  "";

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";

type TrackParams = Record<
  string,
  string | number | boolean | null | undefined
>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

function cleanParams(params?: TrackParams): Record<string, string | number | boolean> {
  const cleaned: Record<string, string | number | boolean> = {};

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

  if (GA_ID && window.gtag) {
    window.gtag("config", GA_ID, {
      page_path: url,
      page_location,
      page_title: document.title,
      debug_mode,
    });
  }

  if (META_PIXEL_ID && window.fbq) {
    window.fbq("track", "PageView");
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

  if (GA_ID && window.gtag) {
    window.gtag("event", eventName, {
      ...cleaned,
      debug_mode,
    });
  }

  if (META_PIXEL_ID && window.fbq) {
    window.fbq("trackCustom", eventName, cleaned);
  }

  pushDataLayer(eventName, cleaned);
}

export function trackOrderClick(branch?: string, source?: string) {
  trackEvent("order_click", {
    branch: branch || "unknown",
    cta_location: source || "unknown",
  });

  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("trackCustom", "OrderClick", {
      branch: branch || "unknown",
      cta_location: source || "unknown",
    });
  }
}

export function trackCallClick(branch?: string, source?: string) {
  trackEvent("call_click", {
    branch: branch || "unknown",
    cta_location: source || "unknown",
  });

  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("trackCustom", "CallClick", {
      branch: branch || "unknown",
      cta_location: source || "unknown",
    });
  }
}

export function trackDirectionsClick(branch?: string, source?: string) {
  trackEvent("directions_click", {
    branch: branch || "unknown",
    cta_location: source || "unknown",
  });

  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("trackCustom", "DirectionsClick", {
      branch: branch || "unknown",
      cta_location: source || "unknown",
    });
  }
}

export function trackRaffleSubmit(branch?: string, locale?: string) {
  trackEvent("raffle_submit", {
    branch: branch || "unknown",
    locale: locale || "unknown",
    form_name: "raffle",
  });

  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Lead", {
      branch: branch || "unknown",
      locale: locale || "unknown",
    });
  }
}

export function trackReviewSubmit(branch?: string, rating?: number, locale?: string) {
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