"use client";

import { useEffect } from "react";

const CHECKOUT_HOST = "pay.hotmart.com";
const PRODUCT_ID = "C107995869L";
const STORAGE_KEY = "nonna-pina-attribution";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

type Attribution = Record<string, string>;

const sckBySource: Record<string, string> = {
  instagram: "ig-organic",
  facebook: "fb-organic",
};

function readStoredAttribution(): Attribution | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;

    return parsed as Attribution;
  } catch {
    return null;
  }
}

function storeAttribution(attribution: Attribution) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // Storage may be unavailable in some privacy/browser modes.
  }
}

function buildAttributionFromUrl(): Attribution | null {
  const params = new URLSearchParams(window.location.search);
  const source = params.get("utm_source")?.toLowerCase();
  const medium = params.get("utm_medium");

  if (!source || medium !== "organic_social" || !sckBySource[source]) {
    return null;
  }

  const attribution: Attribution = {
    sck: sckBySource[source],
  };

  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) attribution[key] = value;
  }

  return attribution;
}

function applyAttributionToCheckout(rawUrl: string) {
  const url = new URL(rawUrl, window.location.href);

  if (url.hostname !== CHECKOUT_HOST || !url.pathname.startsWith(`/${PRODUCT_ID}`)) {
    return rawUrl;
  }

  const attribution = readStoredAttribution();
  if (!attribution) return rawUrl;

  for (const [key, value] of Object.entries(attribution)) {
    url.searchParams.set(key, value);
  }

  return url.toString();
}

export default function HotmartAttribution() {
  useEffect(() => {
    const attribution = buildAttributionFromUrl();
    if (attribution) {
      storeAttribution(attribution);
    }

    function handleClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      anchor.href = applyAttributionToCheckout(anchor.href);
    }

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, []);

  return null;
}
