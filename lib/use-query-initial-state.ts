"use client";

import { useState, useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  window.addEventListener("popstate", callback);
  return () => window.removeEventListener("popstate", callback);
}

function getSearch() {
  return window.location.search;
}

function getServerSearch() {
  return "";
}

/** The server and first client render share the fallback; URL defaults appear after hydration. */
export function useQueryInitialState<T extends string>(
  parameter: string,
  fallback: T,
  allowed: readonly T[],
): readonly [T, (value: T) => void] {
  const search = useSyncExternalStore(subscribe, getSearch, getServerSearch);
  const [override, setOverride] = useState<T | null>(null);
  const raw = new URLSearchParams(search).get(parameter);
  const initial = raw !== null && allowed.some((value) => value === raw)
    ? (raw as T)
    : fallback;
  return [override ?? initial, setOverride] as const;
}
