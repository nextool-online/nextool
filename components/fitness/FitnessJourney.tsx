"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { getLocaleProfile } from "../../data/localeProfiles";
import { getFitnessContent } from "../../data/fitness";
import { formatDecimal, formatNumber, formatUnit } from "../../utils/formatters";
import {
  calculateBmi,
  getBmiCategory,
  getBmiMarkerPosition,
  getHealthyWeightRange,
  kgToPounds,
  normalizeBmiInput,
  type BmiInput,
} from "../../tools/health/bmi";
import {
  calculateBmr,
  calculateGoalCalories,
  calculateMaintenanceCalories,
  calculateProteinRange,
  calculateWaterIntakeLiters,
  kgRangeToPoundsRange,
  litersToFluidOunces,
  type ActivityLevel,
  type FitnessGoal,
  type Sex,
} from "../../tools/health/fitness";

import type { LanguageCode } from "../../data/languages";

type FitnessJourneyProps = {
  lang: LanguageCode;
};

type Snapshot = {
  createdAt: string;
  bmi: number;
  weight: number;
  unit: "kg" | "lb";
};

const storageKey = "nextool_fit_snapshots_v1";

const categoryLabels = {
  en: {
    underweight: "Underweight",
    normal: "Normal",
    overweight: "Overweight",
    obesity: "Obesity",
  },
  pt: {
    underweight: "Abaixo",
    normal: "Normal",
    overweight: "Sobrepeso",
    obesity: "Obesidade",
  },
};

function metricCard({ label, value, helper }: { label: string; value: string; helper?: string }) {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wide text-zinc-400">
        {label}
      </p>
      <p className="mt-3 text-3xl font-black tracking-tight text-zinc-950">
        {value}
      </p>
      {helper && <p className="mt-2 text-sm leading-6 text-zinc-600">{helper}</p>}
    </div>
  );
}

export default function FitnessJourney({ lang }: FitnessJourneyProps) {
  const content = getFitnessContent(lang);
  const profile = getLocaleProfile(lang);
  const usesImperial = profile.measurementSystem === "imperial";

  const [weight, setWeight] = useState(usesImperial ? "180" : "70");
  const [heightCm, setHeightCm] = useState("175");
  const [heightFt, setHeightFt] = useState("5");
  const [heightIn, setHeightIn] = useState("10");
  const [age, setAge] = useState("35");
  const [sex, setSex] = useState<Sex>("male");
  const [activity, setActivity] = useState<ActivityLevel>("moderate");
  const [goal, setGoal] = useState<FitnessGoal>("lose");
  const [email, setEmail] = useState("");
  const [snapshots, setSnapshots] = useState<Snapshot[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      const raw = window.localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [saved, setSaved] = useState(false);

  const input = useMemo<BmiInput | null>(() => {
    const weightValue = Number(weight);
    if (!weightValue) return null;

    if (usesImperial) {
      const feet = Number(heightFt);
      const inches = Number(heightIn);
      if (!feet && !inches) return null;

      return {
        system: "imperial",
        weightLb: weightValue,
        heightFt: feet,
        heightIn: inches,
      };
    }

    const cm = Number(heightCm);
    if (!cm) return null;

    return {
      system: "metric",
      weightKg: weightValue,
      heightCm: cm,
    };
  }, [heightCm, heightFt, heightIn, usesImperial, weight]);

  const result = useMemo(() => {
    if (!input || !Number(age)) return null;

    const bmi = calculateBmi(input);
    const category = getBmiCategory(bmi);
    const range = getHealthyWeightRange(input);
    const bmr = calculateBmr({ input, age: Number(age), sex });
    const maintenance = calculateMaintenanceCalories(bmr, activity);
    const goalCalories = calculateGoalCalories(maintenance, goal);
    const waterLiters = calculateWaterIntakeLiters(input, activity);
    const protein = calculateProteinRange(input, goal);
    const normalized = normalizeBmiInput(input);

    return {
      bmi,
      category,
      range,
      bmr,
      maintenance,
      goalCalories,
      waterLiters,
      protein,
      marker: getBmiMarkerPosition(bmi),
      normalized,
    };
  }, [activity, age, goal, input, sex]);

  const formatHealthyRange = () => {
    if (!result) return "—";

    if (usesImperial) {
      const range = kgRangeToPoundsRange({
        minKg: result.range.minKg,
        maxKg: result.range.maxKg,
      });
      return `${formatNumber(range.minLb, lang, { maximumFractionDigits: 0 })}–${formatNumber(range.maxLb, lang, { maximumFractionDigits: 0 })} lb`;
    }

    return `${formatNumber(result.range.minKg, lang, { maximumFractionDigits: 0 })}–${formatNumber(result.range.maxKg, lang, { maximumFractionDigits: 0 })} kg`;
  };

  const waterValue = result
    ? usesImperial
      ? `${formatNumber(litersToFluidOunces(result.waterLiters), lang, { maximumFractionDigits: 0 })} oz`
      : `${formatDecimal(result.waterLiters, lang)} L`
    : "—";

  const saveSnapshot = () => {
    if (!result) return;

    const nextSnapshots = [
      {
        createdAt: new Date().toISOString(),
        bmi: result.bmi,
        weight: usesImperial ? kgToPounds(result.normalized.weightKg) : result.normalized.weightKg,
        unit: usesImperial ? "lb" as const : "kg" as const,
      },
      ...snapshots,
    ].slice(0, 8);

    setSnapshots(nextSnapshots);
    setSaved(true);
    window.localStorage.setItem(storageKey, JSON.stringify(nextSnapshots));
  };

  const clearHistory = () => {
    setSnapshots([]);
    setSaved(false);
    window.localStorage.removeItem(storageKey);
  };

  return (
    <div className="bg-zinc-950 text-white">
      <section className="mx-auto grid max-w-7xl items-start gap-8 px-4 py-8 sm:px-6 md:py-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-12">
        <div className="flex flex-col justify-start lg:pt-6">
          <p className="mb-5 inline-flex w-fit rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-200">
            {content.eyebrow}
          </p>
          <h1 className="max-w-3xl text-4xl font-black tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            {content.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300 md:text-xl">
            {content.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#fitness-form" className="rounded-full bg-emerald-400 px-6 py-3 text-sm font-black text-zinc-950 transition hover:bg-emerald-300">
              {content.cta}
            </a>
            <Link href={`/${lang}/tools/${lang === "pt" ? "calculadora-imc" : "bmi-calculator"}`} className="hidden rounded-full border border-white/15 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10 sm:inline-flex">
              {content.secondaryCta}
            </Link>
          </div>
        </div>

        <div id="fitness-form" className="rounded-[2rem] border border-white/10 bg-white p-4 text-zinc-950 shadow-2xl md:p-6">
          <p className="text-sm font-black uppercase tracking-wide text-emerald-600">
            {content.formTitle}
          </p>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <label className="space-y-1">
              <span className="px-1 text-xs font-bold uppercase tracking-wide text-zinc-400">{content.weight}</span>
              <input className="w-full rounded-2xl border border-zinc-200 p-4 font-bold outline-none focus:border-emerald-500" type="number" value={weight} onChange={(event) => setWeight(event.target.value)} placeholder={content.weight} />
            </label>

            {usesImperial ? (
              <div className="grid grid-cols-2 gap-3">
                <label className="space-y-1">
                  <span className="px-1 text-xs font-bold uppercase tracking-wide text-zinc-400">{content.heightFt}</span>
                  <input className="w-full rounded-2xl border border-zinc-200 p-4 font-bold outline-none focus:border-emerald-500" type="number" value={heightFt} onChange={(event) => setHeightFt(event.target.value)} placeholder={content.heightFt} />
                </label>
                <label className="space-y-1">
                  <span className="px-1 text-xs font-bold uppercase tracking-wide text-zinc-400">{content.heightIn}</span>
                  <input className="w-full rounded-2xl border border-zinc-200 p-4 font-bold outline-none focus:border-emerald-500" type="number" value={heightIn} onChange={(event) => setHeightIn(event.target.value)} placeholder={content.heightIn} />
                </label>
              </div>
            ) : (
              <label className="space-y-1">
                <span className="px-1 text-xs font-bold uppercase tracking-wide text-zinc-400">{content.height}</span>
                <input className="w-full rounded-2xl border border-zinc-200 p-4 font-bold outline-none focus:border-emerald-500" type="number" value={heightCm} onChange={(event) => setHeightCm(event.target.value)} placeholder={content.height} />
              </label>
            )}

            <label className="space-y-1">
              <span className="px-1 text-xs font-bold uppercase tracking-wide text-zinc-400">{content.age}</span>
              <input className="w-full rounded-2xl border border-zinc-200 p-4 font-bold outline-none focus:border-emerald-500" type="number" value={age} onChange={(event) => setAge(event.target.value)} placeholder={content.age} />
            </label>

            <label className="space-y-1">
              <span className="px-1 text-xs font-bold uppercase tracking-wide text-zinc-400">{content.sex}</span>
              <select className="w-full rounded-2xl border border-zinc-200 p-4 font-bold outline-none focus:border-emerald-500" value={sex} onChange={(event) => setSex(event.target.value as Sex)} aria-label={content.sex}>
                <option value="male">{content.male}</option>
                <option value="female">{content.female}</option>
              </select>
            </label>

            <label className="space-y-1">
              <span className="px-1 text-xs font-bold uppercase tracking-wide text-zinc-400">{content.activity}</span>
              <select className="w-full rounded-2xl border border-zinc-200 p-4 font-bold outline-none focus:border-emerald-500" value={activity} onChange={(event) => setActivity(event.target.value as ActivityLevel)} aria-label={content.activity}>
                {Object.entries(content.activityOptions).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </label>

            <label className="space-y-1">
              <span className="px-1 text-xs font-bold uppercase tracking-wide text-zinc-400">{content.goal}</span>
              <select className="w-full rounded-2xl border border-zinc-200 p-4 font-bold outline-none focus:border-emerald-500" value={goal} onChange={(event) => setGoal(event.target.value as FitnessGoal)} aria-label={content.goal}>
                {Object.entries(content.goalOptions).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </label>
          </div>

          {result && (
            <div className="mt-6 space-y-5">
              <div className="rounded-3xl bg-zinc-950 p-5 text-white">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-zinc-400">{content.resultsTitle}</p>
                    <p className="mt-1 text-5xl font-black">{formatDecimal(result.bmi, lang)}</p>
                  </div>
                  <p className="rounded-full bg-emerald-400 px-4 py-2 text-sm font-black text-zinc-950">
                    {categoryLabels[lang][result.category.id]}
                  </p>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="relative pt-5">
                    <div className="absolute top-0 h-5 w-1 rounded-full bg-white" style={{ left: `${result.marker}%` }} />
                    <div className="flex h-4 overflow-hidden rounded-full">
                      <div className="w-1/4 bg-sky-400" />
                      <div className="w-1/4 bg-emerald-400" />
                      <div className="w-1/4 bg-amber-400" />
                      <div className="w-1/4 bg-rose-500" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-[0.68rem] font-bold uppercase tracking-wide text-zinc-300 sm:grid-cols-4">
                    <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-sky-400" />{content.bmiLegend.underweight}</span>
                    <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-400" />{content.bmiLegend.normal}</span>
                    <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-amber-400" />{content.bmiLegend.overweight}</span>
                    <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-rose-500" />{content.bmiLegend.obesity}</span>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {metricCard({ label: content.healthyRange, value: formatHealthyRange(), helper: content.metricHelpers.healthyRange })}
                {metricCard({ label: content.water, value: waterValue, helper: content.metricHelpers.water })}
                {metricCard({ label: content.goalCalories, value: `${formatNumber(result.goalCalories, lang, { maximumFractionDigits: 0 })} kcal`, helper: content.metricHelpers.goalCalories })}
                {metricCard({ label: content.protein, value: `${formatNumber(result.protein.minGrams, lang, { maximumFractionDigits: 0 })}–${formatNumber(result.protein.maxGrams, lang, { maximumFractionDigits: 0 })} g`, helper: content.metricHelpers.protein })}
                {metricCard({ label: content.maintenance, value: `${formatNumber(result.maintenance, lang, { maximumFractionDigits: 0 })} kcal`, helper: content.metricHelpers.maintenance })}
                {metricCard({ label: content.bmr, value: `${formatNumber(result.bmr, lang, { maximumFractionDigits: 0 })} kcal`, helper: content.metricHelpers.bmr })}
              </div>

              <div id="fitness-save" className="rounded-3xl border border-emerald-100 bg-emerald-50 p-5">
                <p className="font-black text-zinc-950">{content.saveTitle}</p>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{content.saveDescription}</p>
                <button type="button" onClick={saveSnapshot} className="mt-4 rounded-full bg-zinc-950 px-5 py-3 text-sm font-black text-white transition hover:bg-zinc-800">
                  {saved ? content.saved : content.saveButton}
                </button>
              </div>

              {snapshots.length > 0 && (
                <div className="rounded-3xl border border-zinc-200 bg-white p-5">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-black text-zinc-950">{content.historyTitle}</p>
                    <button type="button" onClick={clearHistory} className="text-xs font-bold text-zinc-500 hover:text-zinc-950">
                      {content.clearHistory}
                    </button>
                  </div>
                  <div className="mt-4 space-y-2">
                    {snapshots.map((snapshot) => (
                      <div key={`${snapshot.createdAt}-${snapshot.bmi}`} className="flex items-center justify-between rounded-2xl bg-zinc-50 px-4 py-3 text-sm">
                        <span className="font-semibold text-zinc-600">{new Date(snapshot.createdAt).toLocaleDateString(profile.locale)}</span>
                        <span className="font-black">BMI {formatDecimal(snapshot.bmi, lang)} · {formatUnit(snapshot.weight, snapshot.unit, lang)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5">
                <p className="font-black text-zinc-950">{content.emailTitle}</p>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{content.emailDescription}</p>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <input className="min-w-0 flex-1 rounded-full border border-zinc-200 px-5 py-3 text-sm outline-none focus:border-emerald-500" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder={content.emailPlaceholder} />
                  <button type="button" className="rounded-full bg-emerald-400 px-5 py-3 text-sm font-black text-zinc-950 opacity-70" disabled>
                    {content.emailButton}
                  </button>
                </div>
              </div>

              <p className="text-xs leading-5 text-zinc-500">{content.disclaimer}</p>
            </div>
          )}
        </div>
      </section>

      <section id="fitness-next" className="border-t border-white/10 bg-white px-4 py-12 text-zinc-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-black tracking-tight">{content.relatedTitle}</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600">{content.relatedIntro}</p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {[
              ["01", content.bmi, content.relatedSteps.bmi, `/${lang}/tools/${lang === "pt" ? "calculadora-imc" : "bmi-calculator"}`],
              ["02", content.bmr, content.relatedSteps.bmr, `/${lang}/tools/${lang === "pt" ? "calculadora-tmb" : "bmr-calculator"}`],
              ["03", content.goalCalories, content.relatedSteps.calories, `/${lang}/tools/${lang === "pt" ? "calculadora-de-calorias" : "calorie-calculator"}`],
              ["04", content.water, content.relatedSteps.water, `/${lang}/tools/${lang === "pt" ? "calculadora-de-ingestao-de-agua" : "water-intake-calculator"}`],
            ].map(([step, label, helper, href]) => (
              <Link key={href} href={href} className="group rounded-3xl border border-zinc-200 bg-zinc-50 p-5 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50">
                <p className="text-xs font-black text-emerald-600">{step}</p>
                <p className="mt-3 font-black">{label}</p>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{helper}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
