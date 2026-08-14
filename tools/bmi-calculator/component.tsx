"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import ToolBox from "../../components/ui/ToolBox";
import ToolInput from "../../components/toolkit/ToolInput";
import ToolSection from "../../components/toolkit/ToolSection";

import { getLocaleProfile } from "../../data/localeProfiles";
import { getText } from "../../data/i18n";
import { formatDecimal, formatUnit } from "../../utils/formatters";
import {
  getBmiMetricStatus,
  getHealthyWeightMetricStatus,
  type MetricStatusId,
} from "../health/fitness";
import {
  calculateBmi,
  getBmiCategory,
  getBmiMarkerPosition,
  getHealthyWeightRange,
  getWeightDeltaToHealthyRange,
  kgToPounds,
  normalizeBmiInput,
} from "../health/bmi";

import type { BmiCategoryId } from "../health/bmi";
import type { ToolComponentProps } from "../types";

const categoryKeys: BmiCategoryId[] = [
  "underweight",
  "normal",
  "overweight",
  "obesity",
];

const statusLabels = {
  en: {
    good: "Within range",
    attention: "Attention",
    "out-of-range": "Outside estimated range",
    low: "Low",
    neutral: "Reference range",
  },
  pt: {
    good: "Dentro da faixa",
    attention: "Atenção",
    "out-of-range": "Fora da faixa estimada",
    low: "Baixo",
    neutral: "Faixa de referência",
  },
} satisfies Record<string, Record<MetricStatusId, string>>;

const fitnessCta = {
  en: {
    title: "Want the full fitness snapshot?",
    description: "Use BMI together with calories, water, protein and local progress history in NexTool Fit.",
    button: "Open NexTool Fit",
    href: "/en/fitness",
  },
  pt: {
    title: "Quer ver o perfil fitness completo?",
    description: "Use o IMC junto com calorias, água, proteína e histórico local dentro do NexTool Fit.",
    button: "Abrir NexTool Fit",
    href: "/pt/fitness",
  },
} satisfies Record<string, { title: string; description: string; button: string; href: string }>;

const statusCardStyles: Record<MetricStatusId, string> = {
  good: "border-emerald-200 bg-emerald-50/70",
  attention: "border-amber-200 bg-amber-50/70",
  "out-of-range": "border-rose-200 bg-rose-50/70",
  low: "border-sky-200 bg-sky-50/70",
  neutral: "border-zinc-200 bg-white",
};

const statusChipStyles: Record<MetricStatusId, string> = {
  good: "bg-emerald-100 text-emerald-700",
  attention: "bg-amber-100 text-amber-700",
  "out-of-range": "bg-rose-100 text-rose-700",
  low: "bg-sky-100 text-sky-700",
  neutral: "bg-zinc-100 text-zinc-600",
};

const statusValueStyles: Record<MetricStatusId, string> = {
  good: "text-emerald-700",
  attention: "text-amber-700",
  "out-of-range": "text-rose-700",
  low: "text-sky-700",
  neutral: "text-zinc-950",
};

const statusBarPositions: Record<MetricStatusId, number> = {
  low: 18,
  good: 52,
  neutral: 62,
  attention: 76,
  "out-of-range": 92,
};

const statusBarColors: Record<MetricStatusId, string> = {
  good: "bg-emerald-600",
  attention: "bg-amber-500",
  "out-of-range": "bg-rose-600",
  low: "bg-sky-600",
  neutral: "bg-zinc-700",
};

function comparisonCard({
  label,
  value,
  status,
  lang,
}: {
  label: string;
  value: string;
  status: MetricStatusId;
  lang: "en" | "pt";
}) {
  return (
    <div className={`rounded-2xl border p-4 ${statusCardStyles[status]}`}>
      <div className="flex flex-wrap items-start gap-2">
        <p className="min-w-0 flex-1 text-xs font-bold uppercase tracking-wide text-zinc-500">{label}</p>
        <span className={`rounded-full px-2.5 py-1 text-[0.62rem] font-black uppercase tracking-wide ${statusChipStyles[status]}`}>
          {statusLabels[lang][status]}
        </span>
      </div>
      <p className={`mt-3 text-2xl font-black tracking-tight ${statusValueStyles[status]}`}>{value}</p>
      <div className="mt-3" aria-hidden="true">
        <div className="relative h-2 rounded-full bg-gradient-to-r from-sky-300 via-emerald-300 via-amber-300 to-rose-300">
          <span className={`absolute top-1/2 h-4 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full ${statusBarColors[status]}`} style={{ left: `${statusBarPositions[status]}%` }} />
        </div>
      </div>
    </div>
  );
}

function parseUserNumber(value: string) {
  return Number(value.replace(",", "."));
}

function applyTemplate(template: string, values: Record<string, string>) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replaceAll(`{${key}}`, value),
    template
  );
}

export default function BmiCalculatorTool({
  lang,
  ui,
}: ToolComponentProps) {
  const toolUi = ui!;
  const localeProfile = getLocaleProfile(lang);
  const usesImperial = localeProfile.measurementSystem === "imperial";

  const [weight, setWeight] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");

  const result = useMemo(() => {
    const weightValue = parseUserNumber(weight);

    if (!weightValue) {
      return null;
    }

    const input = usesImperial
      ? {
          system: "imperial" as const,
          weightLb: weightValue,
          heightFt: parseUserNumber(heightFt),
          heightIn: parseUserNumber(heightIn),
        }
      : {
          system: "metric" as const,
          weightKg: weightValue,
          heightCm: parseUserNumber(heightCm),
        };

    const hasValidHeight = usesImperial
      ? input.system === "imperial" && (input.heightFt > 0 || input.heightIn > 0)
      : input.system === "metric" && input.heightCm > 0;

    if (!hasValidHeight) {
      return null;
    }

    const { weightKg } = normalizeBmiInput(input);
    const bmi = calculateBmi(input);
    const category = getBmiCategory(bmi);
    const healthyRange = getHealthyWeightRange(input);
    const delta = getWeightDeltaToHealthyRange(
      weightKg,
      healthyRange.minKg,
      healthyRange.maxKg
    );

    return {
      bmi,
      category,
      healthyRange,
      delta,
      markerPosition: getBmiMarkerPosition(bmi),
      statuses: {
        bmi: getBmiMetricStatus(category.id),
        healthyRange: getHealthyWeightMetricStatus({
          currentWeightKg: weightKg,
          minKg: healthyRange.minKg,
          maxKg: healthyRange.maxKg,
        }),
      },
    };
  }, [heightCm, heightFt, heightIn, usesImperial, weight]);

  const categoryLabels = Object.fromEntries(
    categoryKeys.map((key) => [key, getText(toolUi[key], lang)])
  ) as Record<BmiCategoryId, string>;

  const unitLabel = usesImperial ? "lb" : "kg";

  const formatWeight = (weightKg: number) => {
    const value = usesImperial ? kgToPounds(weightKg) : weightKg;
    return formatUnit(value, unitLabel, lang);
  };

  const summary = result
    ? applyTemplate(getText(toolUi.resultSummary, lang), {
        classification: categoryLabels[result.category.id],
      })
    : "";

  const deltaSummary = result
    ? result.delta.direction === "inside"
      ? getText(toolUi.insideRangeSummary, lang)
      : applyTemplate(
          getText(
            result.delta.direction === "gain"
              ? toolUi.belowRangeSummary
              : toolUi.aboveRangeSummary,
            lang
          ),
          { amount: formatWeight(result.delta.kg) }
        )
    : "";

  const fitnessHref = useMemo(() => {
    const params = new URLSearchParams();
    if (weight) params.set("weight", weight);
    if (usesImperial) {
      if (heightFt) params.set("heightFt", heightFt);
      if (heightIn) params.set("heightIn", heightIn);
    } else if (heightCm) {
      params.set("heightCm", heightCm);
    }
    params.set("from", "bmi");
    const query = params.toString();
    return `${fitnessCta[lang].href}${query ? `?${query}` : ""}`;
  }, [heightCm, heightFt, heightIn, lang, usesImperial, weight]);

  return (
    <ToolBox variant="fitness">
      <ToolSection
        title={getText(toolUi.heading, lang)}
        description={getText(toolUi.helper, lang)}
      >
        <div className="space-y-6">
          <div className="grid gap-3 md:grid-cols-2">
            <label className="block">
              <ToolInput
                type="text"
                inputMode="decimal"
                value={weight}
                onChange={(event) => setWeight(event.target.value)}
                onInput={(event) => setWeight(event.currentTarget.value)}
                placeholder={getText(toolUi.weight, lang)}
              />
            </label>

            {usesImperial ? (
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <ToolInput
                    type="text"
                inputMode="decimal"
                    value={heightFt}
                    onChange={(event) => setHeightFt(event.target.value)}
                    onInput={(event) => setHeightFt(event.currentTarget.value)}
                    placeholder={getText(toolUi.heightFeet, lang)}
                  />
                </label>

                <label className="block">
                  <ToolInput
                    type="text"
                inputMode="decimal"
                    value={heightIn}
                    onChange={(event) => setHeightIn(event.target.value)}
                    onInput={(event) => setHeightIn(event.currentTarget.value)}
                    placeholder={getText(toolUi.heightInches, lang)}
                  />
                </label>
              </div>
            ) : (
              <label className="block">
                <ToolInput
                  type="text"
                inputMode="decimal"
                  value={heightCm}
                  onChange={(event) => setHeightCm(event.target.value)}
                  onInput={(event) => setHeightCm(event.currentTarget.value)}
                  placeholder={getText(toolUi.height, lang)}
                />
              </label>
            )}
          </div>

          {result && (
            <div className="space-y-5 rounded-3xl border border-zinc-200 bg-gradient-to-br from-white to-zinc-50 p-4 shadow-sm md:p-6">
              <div className="grid gap-4 rounded-3xl bg-zinc-950 p-5 text-center text-white sm:grid-cols-2 sm:items-center">
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-sm font-bold text-zinc-400">{getText(toolUi.heading, lang)}</p>
                  <p className="mt-1 text-5xl font-black tracking-tight">{formatDecimal(result.bmi, lang)}</p>
                </div>
                <div className="flex justify-center rounded-2xl bg-white/5 p-4">
                  <span className={`self-center rounded-full px-4 py-2 text-sm font-black uppercase ${statusChipStyles[result.statuses.bmi.id]}`}>
                    {categoryLabels[result.category.id]}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="relative pt-7">
                  <div
                    className="absolute top-0 -translate-x-1/2 text-center"
                    style={{ left: `${result.markerPosition}%` }}
                  >
                    <div className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${statusChipStyles[result.statuses.bmi.id]}`}>
                      {getText(toolUi.you, lang)}
                    </div>

                    <div className="mx-auto h-0 w-0 border-x-4 border-t-4 border-x-transparent border-t-zinc-950" />
                  </div>

                  <div className="flex h-5 overflow-hidden rounded-full ring-1 ring-zinc-200">
                    <div className="w-1/4 bg-sky-400" />
                    <div className="w-1/4 bg-emerald-500" />
                    <div className="w-1/4 bg-amber-400" />
                    <div className="w-1/4 bg-rose-500" />
                  </div>
                </div>

                <div className="grid grid-cols-4 text-center text-[10px] font-semibold uppercase text-zinc-500 md:text-xs">
                  {categoryKeys.map((key) => (
                    <span key={key}>{categoryLabels[key]}</span>
                  ))}
                </div>

                <div className="grid grid-cols-4 text-center text-[10px] font-semibold text-zinc-400 md:text-xs">
                  <span>&lt; 18.5</span>
                  <span>18.5 - 24.9</span>
                  <span>25 - 29.9</span>
                  <span>30+</span>
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                <p className="font-semibold text-zinc-950">{summary}</p>

                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  {deltaSummary}
                </p>

                <p className="mt-3 text-xs leading-5 text-zinc-500">
                  {getText(toolUi.disclaimer, lang)}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {comparisonCard({
                  label: getText(toolUi.healthyMinLabel, lang),
                  value: formatWeight(result.healthyRange.minKg),
                  status: "neutral",
                  lang,
                })}
                {comparisonCard({
                  label: getText(toolUi.healthyMaxLabel, lang),
                  value: formatWeight(result.healthyRange.maxKg),
                  status: "neutral",
                  lang,
                })}
                {comparisonCard({
                  label: getText(toolUi.targetWeightLabel, lang),
                  value: formatWeight(result.healthyRange.targetKg),
                  status: result.statuses.healthyRange.id,
                  lang,
                })}
                {comparisonCard({
                  label: getText(toolUi.weightDeltaLabel, lang),
                  value: formatWeight(result.delta.kg),
                  status: result.delta.direction === "inside" ? "good" : result.statuses.healthyRange.id,
                  lang,
                })}
              </div>

              <div className="overflow-hidden rounded-3xl border border-emerald-200 bg-zinc-950 text-white shadow-2xl shadow-emerald-900/20">
                <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 p-5 text-center md:p-6">
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-300">
                    {lang === "pt" ? "Próximo passo" : "Next step"}
                  </p>
                  <h3 className="text-2xl font-black tracking-tight md:text-3xl">
                    {lang === "pt" ? "Descubra também:" : "Also discover:"}
                  </h3>

                  <div className="grid w-full grid-cols-1 gap-3 text-left text-sm sm:grid-cols-2 lg:grid-cols-4">
                    {(lang === "pt"
                      ? [
                          ["🔥", "Calorias diárias"],
                          ["⚙️", "Metabolismo basal"],
                          ["💧", "Água diária"],
                          ["🥩", "Proteína diária"],
                        ]
                      : [
                          ["🔥", "Daily calories"],
                          ["⚙️", "Basal metabolic rate"],
                          ["💧", "Daily water"],
                          ["🥩", "Daily protein"],
                        ]
                    ).map(([icon, item]) => (
                      <div key={item} className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 text-center shadow-lg shadow-black/10">
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10 text-xl" aria-hidden="true">{icon}</span>
                        <p className="text-base font-black leading-tight text-white md:text-sm lg:text-base">{item}</p>
                      </div>
                    ))}
                  </div>

                  <Link href={fitnessHref} className="inline-flex rounded-full bg-emerald-300 px-5 py-3 text-sm font-black text-zinc-950 shadow-lg shadow-emerald-950/30 transition hover:bg-emerald-200">
                    {lang === "pt" ? "Gerar meu perfil fitness completo" : "Generate my full fitness profile"}
                  </Link>

                  <p className="max-w-2xl text-sm leading-6 text-zinc-300">
                    {lang === "pt"
                      ? "Complete seu painel fitness com as outras métricas que ajudam a transformar um número isolado em uma visão prática."
                      : "Complete your fitness dashboard with the other metrics that turn one isolated number into a practical view."}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </ToolSection>
    </ToolBox>
  );
}
