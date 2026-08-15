"use client";

import Link from "next/link";

import type { LanguageCode } from "../../data/languages";
import { AffiliateLandingAnalytics, trackAffiliateEvent } from "./AffiliateLandingAnalytics";

const hoplinkBase = "https://c11c2bxvw2sjyq86y9b2eycy01.hop.clickbank.net/";
const metadata = {
  offer_id: "mediterranean-meal-plan",
  product_category: "meal_plan",
  affiliate_platform: "clickbank",
  placement: "next_steps_landing",
  source: "fitness-next-steps",
};

function buildHoplink() {
  const url = new URL(hoplinkBase);
  url.searchParams.set("traffic_source", "google");
  url.searchParams.set("traffic_type", "paid");
  url.searchParams.set("tid", "mednextsteps");

  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    const gclid = params.get("gclid");
    if (gclid) url.searchParams.set("extclid", gclid.slice(0, 120));
  }

  return url.toString();
}

export function MediterraneanMealPlanLanding({ lang }: { lang: LanguageCode }) {
  if (lang !== "en") {
    return (
      <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50 px-4 py-10 text-slate-950">
        <section className="mx-auto max-w-3xl rounded-[2rem] border border-sky-100 bg-white p-6 shadow-2xl shadow-sky-100/70 md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-sky-600">NexTool Fit</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">This next step is available in English.</h1>
          <Link href="/en/fitness/next-steps/mediterranean-meal-plan" className="mt-6 inline-flex rounded-full bg-sky-500 px-6 py-3 text-sm font-black text-white transition hover:bg-sky-400">
            Open English page
          </Link>
        </section>
      </main>
    );
  }

  const hoplink = buildHoplink();

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50 px-4 py-10 text-slate-950" data-testid="mediterranean-meal-plan">
      <AffiliateLandingAnalytics lang={lang} source="fitness-next-steps" metadata={metadata} />
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-sky-100 bg-white/95 p-5 shadow-2xl shadow-sky-100/70 md:p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-emerald-700">NexTool Fit next step</p>
        <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight md:text-6xl">
          Reach your goal sooner than it feels today.
        </h1>
        <p className="mt-5 text-lg font-semibold leading-8 text-slate-700">
          Based on your eating habits and lifestyle, the right meal structure can help you go further than numbers alone. A Mediterranean-style plan is a practical next step for turning your calorie target into simple meals.
        </p>

        <div className="mt-7 rounded-[1.7rem] border border-emerald-100 bg-gradient-to-br from-emerald-50 to-sky-50 p-5 md:p-7">
          <h2 className="text-2xl font-black tracking-tight text-slate-950">What this can help with</h2>
          <div className="mt-5 grid gap-3">
            {[
              "Personalized meals around your routine",
              "Simple alternatives when life gets busy",
              "Weekly structure so you stop guessing",
              "A clearer path from calculator result to action",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-sky-100 bg-white p-4 font-bold leading-6 text-slate-800 shadow-sm">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-500 text-xs text-white">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-7 rounded-[1.7rem] border border-sky-100 bg-sky-50 p-5 md:p-7">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-sky-700">Personalized plan ready</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight md:text-4xl">Get a plan built around your routine</h2>
          <p className="mt-3 text-sm font-bold leading-7 text-slate-700">
            Answer a few quick questions and see a Mediterranean-style plan designed to help you turn today’s numbers into easier meals, clearer choices and stronger momentum.
          </p>
          <a
            href={hoplink}
            rel="nofollow sponsored noopener noreferrer"
            onClick={() => trackAffiliateEvent("affiliate_landing_cta_click", lang, "fitness-next-steps", metadata)}
            className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-emerald-400 px-7 py-4 text-center text-sm font-black uppercase leading-snug tracking-wide text-zinc-950 shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-300 sm:w-auto"
          >
            Get your Mediterranean Diet Plan
          </a>
          <p className="mt-4 text-[11px] leading-5 text-slate-400">
            General wellness information only. This does not replace medical or nutrition advice from a qualified professional.
          </p>
        </div>
      </section>
    </main>
  );
}
