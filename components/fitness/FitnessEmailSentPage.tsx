"use client";

import Link from "next/link";

import type { LanguageCode } from "../../data/languages";
import { trackAffiliateEvent } from "./AffiliateLandingAnalytics";

const proteinOffer = {
  offer_id: "protein-contextual-offer",
  product_category: "protein",
  placement: "email_sent_confirmation_page",
  source: "protein-calculator",
};

export function FitnessEmailSentPage({ lang }: { lang: LanguageCode }) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50 px-4 py-10 text-zinc-950">
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-sky-100 bg-white/90 p-5 text-zinc-950 shadow-2xl shadow-sky-100/70 md:p-8">
        <div className="rounded-[1.7rem] border border-sky-100 bg-sky-50 p-5 md:p-7">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-700">{lang === "pt" ? "Email enviado" : "Email sent"}</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight md:text-5xl">{lang === "pt" ? "Suas métricas foram enviadas" : "Your metrics were sent"}</h1>
          <p className="mt-4 text-base font-semibold leading-7 text-zinc-700">
            {lang === "pt"
              ? "Abra seu Gmail e confira a aba Principal. Se não aparecer, procure também em Promoções e Spam."
              : "Open Gmail and check your Primary inbox. If it is not there, also check Promotions and Spam."}
          </p>
          <div className="mt-5 grid gap-3 text-sm font-black text-zinc-800 sm:grid-cols-3">
            <span className="rounded-2xl bg-white px-4 py-4 shadow-sm">1. {lang === "pt" ? "Principal" : "Primary"}</span>
            <span className="rounded-2xl bg-white px-4 py-4 shadow-sm">2. {lang === "pt" ? "Promoções" : "Promotions"}</span>
            <span className="rounded-2xl bg-white px-4 py-4 shadow-sm">3. Spam</span>
          </div>
          <p className="mt-4 text-xs font-semibold leading-5 text-zinc-500">
            {lang === "pt"
              ? "Se encontrou em Promoções, mova para Principal para aumentar a chance dos próximos emails chegarem lá."
              : "If you found it in Promotions, move it to Primary to improve future delivery."}
          </p>
        </div>

        <div className="mt-5 rounded-[1.7rem] border border-emerald-100 bg-gradient-to-br from-white to-emerald-50 p-5 text-zinc-950 shadow-sm md:p-7">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-700">{lang === "pt" ? "Enquanto isso" : "Meanwhile"}</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight md:text-4xl">{lang === "pt" ? "Bater proteína todo dia com menos atrito" : "Hit daily protein with less friction"}</h2>
          <p className="mt-4 text-sm font-semibold leading-7 text-zinc-600">
            {lang === "pt"
              ? "Se sua meta de proteína parece alta, veja opções práticas para transformar a métrica em rotina. Comida primeiro; complemento só quando fizer sentido."
              : "If your protein target feels high, see practical options to turn the metric into routine. Food first; supplements only when they make sense."}
          </p>
          <Link
            href={`/${lang}/fitness/offers/protein`}
            onClick={() => trackAffiliateEvent("affiliate_offer_click", lang, proteinOffer.source, proteinOffer)}
            className="mt-5 inline-flex rounded-full bg-sky-500 px-6 py-3 text-sm font-black text-white transition hover:bg-sky-400"
          >
            {lang === "pt" ? "Ver opções práticas" : "See practical options"}
          </Link>
        </div>
      </section>
    </main>
  );
}
