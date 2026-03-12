export const GA_ID = process.env.NEXT_PUBLIC_ANALYTICS_ID || "";
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  action: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined") return;

  if (GA_ID && window.gtag) {
    window.gtag("event", action, params || {});
  }
}

export function trackOrderClick(branch?: string) {
  trackEvent("order_click", {
    branch: branch || "unknown",
  });

  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("trackCustom", "OrderClick", {
      branch: branch || "unknown",
    });
  }
}

export function trackCallClick(branch?: string) {
  trackEvent("call_click", {
    branch: branch || "unknown",
  });

  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("trackCustom", "CallClick", {
      branch: branch || "unknown",
    });
  }
}

export function trackDirectionsClick(branch?: string) {
  trackEvent("directions_click", {
    branch: branch || "unknown",
  });

  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("trackCustom", "DirectionsClick", {
      branch: branch || "unknown",
    });
  }
}

export function trackRaffleClick() {
  trackEvent("raffle_click");

  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Lead");
  }
}