import Link from "next/link";

import type { LanguageCode } from "../../data/languages";

type MoneyNextStep = {
  label: string;
  href: string;
  helper: string;
};

type MoneyContextualNextStepsProps = {
  lang: LanguageCode;
  title?: string;
  description?: string;
  steps: MoneyNextStep[];
};

const fallbackCopy = {
  en: {
    eyebrow: "Based on this result",
    title: "Compare the next decision",
    description: "Use the result as a starting point, then test the next financial question before you decide.",
  },
  pt: {
    eyebrow: "Com base neste resultado",
    title: "Compare a próxima decisão",
    description: "Use o resultado como ponto de partida e teste a próxima pergunta financeira antes de decidir.",
  },
};

export default function MoneyContextualNextSteps({
  lang,
  title,
  description,
  steps,
}: MoneyContextualNextStepsProps) {
  const copy = fallbackCopy[lang];

  return (
    <section className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-5 shadow-xl shadow-emerald-950/10 md:p-6">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-700">
        {copy.eyebrow}
      </p>
      <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
        {title || copy.title}
      </h3>
      <p className="mt-3 text-sm font-semibold leading-6 text-slate-700">
        {description || copy.description}
      </p>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {steps.map((step) => (
          <Link
            key={step.href}
            href={`/${lang}${step.href}`}
            className="group rounded-2xl border border-white bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-950/10"
          >
            <span className="text-sm font-black text-slate-950 group-hover:text-emerald-800">
              {step.label} →
            </span>
            <p className="mt-2 text-xs font-semibold leading-5 text-slate-600">
              {step.helper}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
