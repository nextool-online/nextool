"use client";

import { useEffect } from "react";

import type { LanguageCode } from "../../data/languages";

const attributionKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "utm_device", "utm_matchtype", "gclid", "fbclid"];

function getVisitorId() {
  const storageKey = "nextool_fitness_visitor_id";
  const existing = window.localStorage.getItem(storageKey);
  if (existing) return existing;

  const generated = window.crypto?.randomUUID?.() || `visitor-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  window.localStorage.setItem(storageKey, generated);
  return generated;
}

function getAttribution() {
  const storageKey = "nextool_fitness_attribution";
  const params = new URLSearchParams(window.location.search);
  const current = Object.fromEntries(
    attributionKeys
      .map((key) => [key, params.get(key)?.slice(0, 120) || ""])
      .filter(([, value]) => value)
  );
  let stored: Record<string, string> = {};
  try {
    stored = JSON.parse(window.localStorage.getItem(storageKey) || "{}") as Record<string, string>;
  } catch {
    stored = {};
  }
  const shouldPersistCurrent = current.utm_source && current.utm_source !== "nextool";
  const attribution = shouldPersistCurrent ? { ...stored, ...current } : { ...current, ...stored };
  if (Object.keys(attribution).length > 0) {
    window.localStorage.setItem(storageKey, JSON.stringify(attribution));
  }
  return attribution;
}

export function trackAffiliateEvent(event: string, lang: LanguageCode, source: string, metadata: Record<string, string>) {
  if (typeof window === "undefined") return;

  const visitorId = getVisitorId();
  void fetch("/api/fitness/event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    keepalive: true,
    body: JSON.stringify({
      event,
      visitorId,
      lang,
      source,
      path: window.location.pathname,
      metadata: { ...getAttribution(), ...metadata },
    }),
  }).catch(() => undefined);
}

export function AffiliateLandingAnalytics({ lang, source, metadata }: { lang: LanguageCode; source: string; metadata: Record<string, string> }) {
  useEffect(() => {
    trackAffiliateEvent("affiliate_landing_view", lang, source, metadata);
  }, [lang, metadata, source]);

  return null;
}
