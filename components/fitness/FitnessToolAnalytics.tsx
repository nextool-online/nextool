"use client";

import { useEffect, useRef } from "react";

import type { LanguageCode } from "../../data/languages";

type FitnessToolAnalyticsProps = {
  lang: LanguageCode;
  toolId: string;
};

const attributionKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"];

function getAttribution() {
  const params = new URLSearchParams(window.location.search);
  return Object.fromEntries(
    attributionKeys
      .map((key) => [key, params.get(key)?.slice(0, 120) || ""])
      .filter(([, value]) => value)
  );
}

function getVisitorId() {
  const storageKey = "nextool_fitness_visitor_id";
  const existing = window.localStorage.getItem(storageKey);
  if (existing) return existing;

  const generated = window.crypto?.randomUUID?.() || `visitor-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  window.localStorage.setItem(storageKey, generated);
  return generated;
}

function sendFitnessToolEvent(eventName: string, lang: LanguageCode, toolId: string) {
  const visitorId = getVisitorId();
  const detail = { event: eventName, source: toolId, lang };

  window.dispatchEvent(new CustomEvent("nextool:fitness", { detail }));
  const dataLayer = (window as typeof window & { dataLayer?: Record<string, unknown>[] }).dataLayer;
  dataLayer?.push({ event: eventName, source: toolId, lang });

  void fetch("/api/fitness/event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    keepalive: true,
    body: JSON.stringify({
      event: eventName,
      visitorId,
      lang,
      source: toolId,
      path: window.location.pathname,
      metadata: getAttribution(),
    }),
  }).catch(() => undefined);
}

function hasFitnessCta() {
  return Boolean(
    Array.from(document.querySelectorAll<HTMLAnchorElement>("a[href]")).find((anchor) => {
      const href = anchor.getAttribute("href") || "";
      return /\/(pt|en)\/fitness\?/.test(href);
    })
  );
}

export default function FitnessToolAnalytics({ lang, toolId }: FitnessToolAnalyticsProps) {
  const resultTrackedRef = useRef(false);

  useEffect(() => {
    sendFitnessToolEvent("calculator_view", lang, toolId);

    const maybeTrackResult = () => {
      if (resultTrackedRef.current || !hasFitnessCta()) return;
      resultTrackedRef.current = true;
      sendFitnessToolEvent("calculator_result_shown", lang, toolId);
    };

    maybeTrackResult();
    const observer = new MutationObserver(maybeTrackResult);
    observer.observe(document.body, { childList: true, subtree: true });

    const handleClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest("a[href]") : null;
      const href = target?.getAttribute("href") || "";
      if (/\/(pt|en)\/fitness\?/.test(href)) {
        sendFitnessToolEvent("calculator_cta_click", lang, toolId);
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      observer.disconnect();
      document.removeEventListener("click", handleClick, true);
    };
  }, [lang, toolId]);

  return null;
}
