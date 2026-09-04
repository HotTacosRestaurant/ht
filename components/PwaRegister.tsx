"use client";

import { useEffect } from "react";

export default function PwaRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const isLocal =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname === "0.0.0.0";

    // Never run a service worker while developing locally. An older production
    // worker can otherwise keep a Next.js dev document alive with stale chunks.
    if (isLocal || process.env.NODE_ENV !== "production") {
      void (async () => {
        const hadController = Boolean(navigator.serviceWorker.controller);
        const registrations = await navigator.serviceWorker.getRegistrations();
        await Promise.all(registrations.map((registration) => registration.unregister()));

        // localhost is a development origin. Nothing in its Cache Storage is
        // considered persistent application data, so remove ALL old PWA caches.
        if ("caches" in window) {
          const keys = await caches.keys();
          await Promise.all(keys.map((key) => caches.delete(key)));
        }

        // Unregistering does not release a document already controlled by a SW.
        // Reload exactly once so this tab is actually worker-free.
        const reloadKey = "ht-local-sw-cleanup-reload";
        if (hadController && sessionStorage.getItem(reloadKey) !== "1") {
          sessionStorage.setItem(reloadKey, "1");
          window.location.reload();
          return;
        }
        sessionStorage.removeItem(reloadKey);
      })();
      return;
    }

    void navigator.serviceWorker
      .register("/sw.js", { updateViaCache: "none" })
      .then((registration) => registration.update())
      .catch((error) => console.error("SW registration failed:", error));
  }, []);

  return null;
}
