"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  flushPendingAnalytics,
  trackPageView,
} from "@/lib/analytics";

export default function AnalyticsRouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    window.addEventListener(
      "ht:analytics-ready",
      flushPendingAnalytics
    );

    flushPendingAnalytics();

    return () => {
      window.removeEventListener(
        "ht:analytics-ready",
        flushPendingAnalytics
      );
    };
  }, []);

  useEffect(() => {
    const query = searchParams?.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    trackPageView(url);
  }, [pathname, searchParams]);

  return null;
}