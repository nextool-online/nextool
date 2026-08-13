"use client";

import Link from "next/link";

import type { LanguageCode } from "../../data/languages";
import { AffiliateLandingAnalytics, trackAffiliateEvent } from "./AffiliateLandingAnalytics";

const copy = {
  pt: {
    eyebrow: "NexTool Fit",
    title: "Como bater sua meta de proteína com menos atrito",
    intro:
      "A calculadora mostra o número. A parte difícil é transformar esse número em rotina. Esta página ajuda você a pensar em fontes práticas antes de escolher qualquer produto.",
    principles: [
      "Comece com comida de verdade sempre que possível.",
      "Use complemento apenas quando ele reduzir atrito na rotina.",
      "Compare custo por porção de proteína, não só preço do pote.",
      "Evite promessas milagrosas: proteína ajuda a bater meta, não substitui treino, sono e dieta.",
    ],
    cta: "Voltar para revisar minha proteína",
    disclaimer: "Esta página pode futuramente conter links de afiliado. As recomendações devem ser informativas e não substituem orientação profissional.",
  },
  en: {
    eyebrow: "NexTool Fit",
    title: "How to hit your protein target with less friction",
    intro:
      "The calculator gives you the number. The hard part is turning that number into routine. This page helps you think through practical protein sources before choosing any product.",
    principles: [
      "Start with real food whenever possible.",
      "Use supplements only when they reduce friction in your routine.",
      "Compare cost per protein serving, not only tub price.",
      "Avoid miracle claims: protein helps you hit a target, but does not replace training, sleep or diet.",
    ],
    cta: "Review my protein target",
    disclaimer: "This page may later include affiliate links. Recommendations should be informational and do not replace professional guidance.",
  },
};

const metadata = { offer_id: "protein-contextual-offer", product_category: "protein", placement: "landing" };

export function ProteinOfferLanding({ lang }: { lang: LanguageCode }) {
  const labels = copy[lang] || copy.en;

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10 text-white" data-testid="protein-contextual-offer">
      <AffiliateLandingAnalytics lang={lang} source="protein-calculator" metadata={metadata} />
      <section className="mx-auto max-w-4xl rounded-[2rem] border border-emerald-500/20 bg-zinc-900 p-6 shadow-2xl shadow-emerald-950/20 md:p-10">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-emerald-300">{labels.eyebrow}</p>
        <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">{labels.title}</h1>
        <p className="mt-5 text-lg leading-8 text-zinc-300">{labels.intro}</p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {labels.principles.map((principle) => (
            <div key={principle} className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5 text-base font-bold leading-7 text-zinc-200">
              {principle}
            </div>
          ))}
        </div>

        <Link
          href={`/${lang}/tools/${lang === "pt" ? "calculadora-de-proteina" : "protein-calculator"}`}
          onClick={() => trackAffiliateEvent("affiliate_landing_cta_click", lang, "protein-calculator", metadata)}
          className="mt-8 inline-flex rounded-full bg-emerald-400 px-6 py-3 text-sm font-black text-zinc-950 transition hover:bg-emerald-300"
        >
          {labels.cta}
        </Link>
        <p className="mt-6 text-xs leading-5 text-zinc-500">{labels.disclaimer}</p>
      </section>
    </main>
  );
}
