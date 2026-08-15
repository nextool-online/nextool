"use client";

import Link from "next/link";

import type { LanguageCode } from "../../data/languages";
import { trackAffiliateEvent } from "./AffiliateLandingAnalytics";

const metadataBase = {
  offer_id: "mediterranean-meal-plan",
  product_category: "meal_plan",
  affiliate_platform: "clickbank",
};

type Props = {
  lang: LanguageCode;
  placement: string;
  source: string;
  compact?: boolean;
};

export function MediterraneanNextStepPromo({ lang, placement, source, compact = false }: Props) {
  if (lang !== "en") return null;

  const href = `/en/fitness/next-steps/mediterranean-meal-plan?utm_source=nextool&utm_medium=fitness_flow&utm_campaign=mediterranean_meal_plan&utm_content=${encodeURIComponent(placement)}`;
  const metadata = { ...metadataBase, placement, source };

  return (
    <div className={`rounded-3xl border border-sky-200 bg-gradient-to-br from-white to-emerald-50 text-slate-950 shadow-lg shadow-sky-100/70 ${compact ? "p-4" : "p-5"}`} data-testid="mediterranean-next-step-promo">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-700">Optional accelerator</p>
      <h3 className={`${compact ? "mt-2 text-xl" : "mt-2 text-2xl"} font-black tracking-tight`}>
        Based on your numbers and your goals
      </h3>
      <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">
        With the right support, your calorie target can become a meal routine faster than trying to figure it out alone. See a Mediterranean-style path designed to make the next step easier.
      </p>
      <Link
        href={href}
        onClick={() => trackAffiliateEvent("affiliate_offer_click", lang, "fitness-next-steps", metadata)}
        className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-emerald-400 px-6 py-4 text-center text-sm font-black uppercase leading-snug tracking-wide text-zinc-950 shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-300 sm:w-auto"
      >
        See the Mediterranean-style path
      </Link>
    </div>
  );
}
