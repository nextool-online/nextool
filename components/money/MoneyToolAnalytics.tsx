"use client";

import { useEffect } from "react";

import type { LanguageCode } from "../../data/languages";

type MoneyToolAnalyticsProps = {
  lang: LanguageCode;
  toolId: string;
};

function getAttribution() {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"];

  return Object.fromEntries(
    keys
      .map((key) => [key, params.get(key)] as const)
      .filter(([, value]) => Boolean(value))
  );
}

export default function MoneyToolAnalytics({ lang, toolId }: MoneyToolAnalyticsProps) {
  useEffect(() => {
    const detail = {
      event_name: "money_tool_view",
      cluster: "money",
      lang,
      tool_id: toolId,
      path: window.location.pathname,
      metadata: getAttribution(),
    };

    window.dispatchEvent(new CustomEvent("nextool:money", { detail }));
  }, [lang, toolId]);

  return null;
}
