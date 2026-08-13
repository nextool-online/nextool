"use client";

import { useEffect } from "react";

import type { LanguageCode } from "../../data/languages";

const attributionKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"];

function getVisitorId() {
  const storageKey = "nextool_fitness_visitor_id";
  const existing = window.localStorage.getItem(storageKey);
  if (existing) return existing;

  const generated = window.crypto?.randomUUID?.() || `visitor-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  window.localStorage.setItem(storageKey, generated);
  return generated;
}

function getAttribution() {
  const params = new URLSearchParams(window.location.search);
  return Object.fromEntries(
    attributionKeys
      .map((key) => [key, params.get(key)?.slice(0, 120) || ""])
      .filter(([, value]) => value)
  );
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
