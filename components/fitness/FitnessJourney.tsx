"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";

import { getLocaleProfile } from "../../data/localeProfiles";
import { getFitnessContent } from "../../data/fitness";
import { formatDecimal, formatNumber } from "../../utils/formatters";
import {
  calculateBmi,
  getBmiCategory,
  getBmiMarkerPosition,
  getHealthyWeightRange,
  normalizeBmiInput,
  type BmiInput,
} from "../../tools/health/bmi";
import {
  calculateBmr,
  calculateGoalCalories,
  calculateMaintenanceCalories,
  calculateProteinRange,
  calculateWaterIntakeLiters,
  getBmiMetricStatus,
  getHealthyWeightMetricStatus,
  getTargetMetricStatus,
  kgRangeToPoundsRange,
  litersToFluidOunces,
  type ActivityLevel,
  type FitnessGoal,
  type MetricStatusId,
  type Sex,
} from "../../tools/health/fitness";

import type { LanguageCode } from "../../data/languages";

type FitnessJourneyProps = {
  lang: LanguageCode;
};

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

const statusCardStyles: Record<MetricStatusId, string> = {
  good: "border-emerald-200 bg-emerald-50/60",
  attention: "border-amber-200 bg-amber-50/60",
  "out-of-range": "border-rose-200 bg-rose-50/60",
  low: "border-sky-200 bg-sky-50/60",
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

function parseUserNumber(value: string) {
  return Number(value.replace(",", "."));
}

function getWeightRangeMarkerPosition(currentKg: number, minKg: number, maxKg: number) {
  if (currentKg < minKg) {
    return Math.max(6, Math.min(27, (currentKg / minKg) * 27));
  }

  if (currentKg > maxKg) {
    return Math.min(94, 73 + ((currentKg - maxKg) / maxKg) * 21);
  }

  return 28 + ((currentKg - minKg) / (maxKg - minKg || 1)) * 44;
}

function metricCard({
  label,
  value,
  helper,
  status,
  statusLabel,
  minMarkerPosition,
  maxMarkerPosition,
  weightMarkerPosition,
  rangeMinLabel,
  rangeMaxLabel,
  currentLabel,
}: {
  label: string;
  value: string;
  helper?: string;
  status: MetricStatusId;
  statusLabel: string;
  minMarkerPosition?: number;
  maxMarkerPosition?: number;
  weightMarkerPosition?: number;
  rangeMinLabel?: string;
  rangeMaxLabel?: string;
  currentLabel?: string;
}) {
  return (
    <div className={`rounded-3xl border p-5 shadow-sm ${statusCardStyles[status]}`}>
      <div className="flex flex-wrap items-start gap-2">
        <p className="min-w-0 flex-1 text-xs font-bold uppercase tracking-wide text-zinc-500">
          {label}
        </p>
        {status !== "neutral" && (
          <span className={`max-w-[8.5rem] shrink rounded-full px-2.5 py-1 text-center text-[0.62rem] font-black uppercase leading-tight tracking-wide ${statusChipStyles[status]}`}>
            {statusLabel}
          </span>
        )}
      </div>
      <p className={`mt-3 text-3xl font-black tracking-tight ${statusValueStyles[status]}`}>
        {value}
      </p>
      <div className="mt-4" aria-hidden="true">
        {typeof weightMarkerPosition === "number" ? (
          <div className="relative px-1 pt-7 pb-6">
            <div className="relative h-3 rounded-full bg-gradient-to-r from-sky-300 via-emerald-300 to-rose-300">
              {[
                { label: rangeMinLabel, position: minMarkerPosition ?? 28, color: "bg-emerald-700", labelClass: "top-7" },
                { label: rangeMaxLabel, position: maxMarkerPosition ?? 72, color: "bg-emerald-700", labelClass: "top-7" },
                { label: currentLabel, position: weightMarkerPosition, color: statusBarColors[status], labelClass: "bottom-7" },
              ].map((marker) => (
                <span
                  key={marker.label}
                  className="absolute top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
                  style={{ left: `${marker.position}%` }}
                >
                  <span className={`h-7 w-1.5 rounded-full ${marker.color}`} />
                  <span className={`absolute ${marker.labelClass} text-[0.62rem] font-black uppercase tracking-wide text-zinc-500`}>{marker.label}</span>
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="relative h-2 rounded-full bg-gradient-to-r from-sky-300 via-emerald-300 via-amber-300 to-rose-300">
            <span
              className={`absolute top-1/2 h-4 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full ${statusBarColors[status]}`}
              style={{ left: `${statusBarPositions[status]}%` }}
            />
          </div>
        )}
      </div>
      {helper && <p className="mt-2 text-sm leading-6 text-zinc-600">{helper}</p>}
    </div>
  );
}

export default function FitnessJourney({ lang }: FitnessJourneyProps) {
  const content = getFitnessContent(lang);
  const usesImperial = getLocaleProfile(lang).measurementSystem === "imperial";
  const weightInputRef = useRef<HTMLInputElement>(null);

  const [weight, setWeight] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState<Sex>("male");
  const [activity, setActivity] = useState<ActivityLevel>("moderate");
  const [goal, setGoal] = useState<FitnessGoal>("lose");
  const [knownCalories, setKnownCalories] = useState("");
  const [source, setSource] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [emailStatus, setEmailStatus] = useState<"idle" | "sending" | "success" | "preview" | "error">("idle");
  const [emailMessage, setEmailMessage] = useState("");
  const resultTrackedRef = useRef(false);
  const pageTrackedRef = useRef(false);
  const visitorIdRef = useRef("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryWeight = params.get("weight");
    const queryHeightCm = params.get("heightCm");
    const queryHeightFt = params.get("heightFt");
    const queryHeightIn = params.get("heightIn");
    const queryActivityMinutes = params.get("activityMinutes");
    const queryActivity = params.get("activity");
    const queryAge = params.get("age");
    const querySex = params.get("sex");
    const queryGoal = params.get("goal");
    const queryCalories = params.get("calories");
    const querySource = params.get("from");

    window.requestAnimationFrame(() => {
      if (queryWeight) setWeight(queryWeight);
      if (queryHeightCm) setHeightCm(queryHeightCm);
      if (queryHeightFt) setHeightFt(queryHeightFt);
      if (queryHeightIn) setHeightIn(queryHeightIn);
      if (queryAge) setAge(queryAge);
      if (queryCalories) setKnownCalories(queryCalories);
      if (querySource) setSource(querySource);
      if (querySex === "male" || querySex === "female") setSex(querySex);
      if (queryGoal === "lose" || queryGoal === "maintain" || queryGoal === "gain") {
        setGoal(queryGoal);
      }
      if (
        queryActivity === "sedentary" ||
        queryActivity === "light" ||
        queryActivity === "moderate" ||
        queryActivity === "very" ||
        queryActivity === "extra"
      ) {
        setActivity(queryActivity);
      }
      if (queryActivityMinutes) {
        const minutes = parseUserNumber(queryActivityMinutes);
        if (minutes >= 45) setActivity("moderate");
        else if (minutes > 0) setActivity("light");
      }
    });
  }, []);

  const input = useMemo<BmiInput | null>(() => {
    const weightValue = parseUserNumber(weight);
    if (!weightValue) return null;

    if (usesImperial) {
      const feet = parseUserNumber(heightFt);
      const inches = parseUserNumber(heightIn);
      if (!feet && !inches) return null;

      return {
        system: "imperial",
        weightLb: weightValue,
        heightFt: feet,
        heightIn: inches,
      };
    }

    const cm = parseUserNumber(heightCm);
    if (!cm) return null;

    return {
      system: "metric",
      weightKg: weightValue,
      heightCm: cm,
    };
  }, [heightCm, heightFt, heightIn, usesImperial, weight]);

  const result = useMemo(() => {
    const ageValue = parseUserNumber(age);
    const knownCalorieValue = parseUserNumber(knownCalories);
    if (!input || !ageValue) return null;

    const bmi = calculateBmi(input);
    const category = getBmiCategory(bmi);
    const range = getHealthyWeightRange(input);
    const bmr = calculateBmr({ input, age: ageValue, sex });
    const maintenance = calculateMaintenanceCalories(bmr, activity);
    const goalCalories = Number.isFinite(knownCalorieValue) && knownCalorieValue > 0
      ? knownCalorieValue
      : calculateGoalCalories(maintenance, goal);
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
      statuses: {
        bmi: getBmiMetricStatus(category.id),
        healthyRange: getHealthyWeightMetricStatus({
          currentWeightKg: normalized.weightKg,
          minKg: range.minKg,
          maxKg: range.maxKg,
        }),
        water: getTargetMetricStatus(),
        goalCalories: getTargetMetricStatus(),
        protein: getTargetMetricStatus(),
        maintenance: getTargetMetricStatus(),
        bmr: getTargetMetricStatus(),
      },
    };
  }, [activity, age, goal, input, knownCalories, sex]);

  const healthyRangeValue = useMemo(() => {
    if (!result) return "—";

    if (usesImperial) {
      const range = kgRangeToPoundsRange({
        minKg: result.range.minKg,
        maxKg: result.range.maxKg,
      });
      return `${formatNumber(range.minLb, lang, { maximumFractionDigits: 0 })}–${formatNumber(range.maxLb, lang, { maximumFractionDigits: 0 })} lb`;
    }

    return `${formatNumber(result.range.minKg, lang, { maximumFractionDigits: 0 })}–${formatNumber(result.range.maxKg, lang, { maximumFractionDigits: 0 })} kg`;
  }, [lang, result, usesImperial]);

  const waterValue = result
    ? usesImperial
      ? `${formatNumber(litersToFluidOunces(result.waterLiters), lang, { maximumFractionDigits: 0 })} oz`
      : `${formatDecimal(result.waterLiters, lang)} L`
    : "—";
  const sourceMessages = content.sourceMessages as Record<string, string>;
  const sourceMessage = source ? sourceMessages[source] || sourceMessages.default : "";

  const startWithOwnData = () => {
    trackFitnessEvent("fitness_profile_started", { source: source || "direct_fitness", lang });
    setWeight("");
    setHeightCm("");
    setHeightFt("");
    setHeightIn("");
    setAge("");
    setKnownCalories("");
    setSource("");
    setEmailStatus("idle");
    setEmailMessage("");
    resultTrackedRef.current = false;

    window.requestAnimationFrame(() => {
      weightInputRef.current?.focus();
      weightInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  };

  const getVisitorId = () => {
    if (typeof window === "undefined") return "";
    if (visitorIdRef.current) return visitorIdRef.current;

    const storageKey = "nextool_fitness_visitor_id";
    const existing = window.localStorage.getItem(storageKey);
    if (existing) {
      visitorIdRef.current = existing;
      return existing;
    }

    const generated = window.crypto?.randomUUID?.() || `visitor-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    window.localStorage.setItem(storageKey, generated);
    visitorIdRef.current = generated;
    return generated;
  };

  const trackFitnessEvent = (eventName: string, detail: Record<string, string | boolean | number> = {}) => {
    if (typeof window === "undefined") return;
    const eventDetail = { event: eventName, ...detail };
    window.dispatchEvent(new CustomEvent("nextool:fitness", { detail: eventDetail }));

    const dataLayer = (window as typeof window & { dataLayer?: Record<string, unknown>[] }).dataLayer;
    dataLayer?.push({ event: eventName, ...detail });

    const visitorId = getVisitorId();
    if (!visitorId) return;

    void fetch("/api/fitness/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        event: eventName,
        visitorId,
        lang,
        source: String(detail.source || source || "direct_fitness"),
        path: window.location.pathname,
      }),
    }).catch(() => undefined);
  };

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      if (pageTrackedRef.current) return;
      pageTrackedRef.current = true;
      trackFitnessEvent("fitness_page_view", { source: source || "direct_fitness", lang });
    }, 300);

    return () => window.clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, source]);

  useEffect(() => {
    if (!result || resultTrackedRef.current) return;
    resultTrackedRef.current = true;
    trackFitnessEvent("fitness_metrics_generated", { source: source || "direct_fitness", lang });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, result, source]);

  const metricsPayload = useMemo(() => {
    if (!result) return null;

    return {
      bmi: formatDecimal(result.bmi, lang),
      idealWeight: healthyRangeValue,
      water: waterValue,
      calories: `${formatNumber(result.goalCalories, lang, { maximumFractionDigits: 0 })} kcal`,
      protein: `${formatNumber(result.protein.minGrams, lang, { maximumFractionDigits: 0 })}–${formatNumber(result.protein.maxGrams, lang, { maximumFractionDigits: 0 })} g`,
      maintenance: `${formatNumber(result.maintenance, lang, { maximumFractionDigits: 0 })} kcal`,
      bmr: `${formatNumber(result.bmr, lang, { maximumFractionDigits: 0 })} kcal`,
    };
  }, [healthyRangeValue, lang, result, waterValue]);

  const submitEmail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!metricsPayload || emailStatus === "sending") return;

    setEmailStatus("sending");
    setEmailMessage("");
    trackFitnessEvent("email_submitted", { source: source || "direct_fitness", lang });

    try {
      const response = await fetch("/api/fitness/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          lang,
          source: source || "direct_fitness",
          consent,
          honeypot,
          profile: {
            weight,
            heightCm,
            heightFt,
            heightIn,
            age,
            sex,
            activity,
            goal,
            calories: knownCalories,
          },
          metrics: metricsPayload,
        }),
      });
      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || "email_error");
      }

      const previewMode = data.mode === "preview";
      setEmailStatus(previewMode ? "preview" : "success");
      setEmailMessage(previewMode ? String(content.emailPreviewSuccess) : String(content.emailSuccess));
      trackFitnessEvent(previewMode ? "email_preview_success" : "email_sent_success", { source: source || "direct_fitness", lang });
    } catch {
      setEmailStatus("error");
      setEmailMessage(String(content.emailError));
      trackFitnessEvent("email_sent_error", { source: source || "direct_fitness", lang });
    }
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
            <button type="button" onClick={startWithOwnData} className="rounded-full bg-emerald-400 px-6 py-3 text-sm font-black text-zinc-950 transition hover:bg-emerald-300">
              {content.cta}
            </button>
            <a href="#fitness-next" className="hidden rounded-full border border-white/15 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10 sm:inline-flex">
              {content.secondaryCta}
            </a>
          </div>
        </div>

        <div id="fitness-form" className="rounded-[2rem] border border-white/10 bg-white p-4 text-zinc-950 shadow-2xl md:p-6">
          <p className="text-sm font-black uppercase tracking-wide text-emerald-600">
            {content.formTitle}
          </p>
          {sourceMessage && (
            <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold leading-6 text-emerald-800">
              {sourceMessage}
            </div>
          )}

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <label className="space-y-1">
              <span className="px-1 text-xs font-bold uppercase tracking-wide text-zinc-400">{content.weight}</span>
              <input ref={weightInputRef} className="w-full rounded-2xl border border-zinc-200 p-4 text-lg font-bold outline-none focus:border-emerald-500" type="text" inputMode="decimal" value={weight} onChange={(event) => setWeight(event.target.value)} onInput={(event) => setWeight(event.currentTarget.value)} placeholder={content.weight} />
            </label>

            {usesImperial ? (
              <div className="grid grid-cols-2 gap-3">
                <label className="space-y-1">
                  <span className="px-1 text-xs font-bold uppercase tracking-wide text-zinc-400">{content.heightFt}</span>
                  <input className="w-full rounded-2xl border border-zinc-200 p-4 text-lg font-bold outline-none focus:border-emerald-500" type="text" inputMode="decimal" value={heightFt} onChange={(event) => setHeightFt(event.target.value)} onInput={(event) => setHeightFt(event.currentTarget.value)} placeholder={content.heightFt} />
                </label>
                <label className="space-y-1">
                  <span className="px-1 text-xs font-bold uppercase tracking-wide text-zinc-400">{content.heightIn}</span>
                  <input className="w-full rounded-2xl border border-zinc-200 p-4 text-lg font-bold outline-none focus:border-emerald-500" type="text" inputMode="decimal" value={heightIn} onChange={(event) => setHeightIn(event.target.value)} onInput={(event) => setHeightIn(event.currentTarget.value)} placeholder={content.heightIn} />
                </label>
              </div>
            ) : (
              <label className="space-y-1">
                <span className="px-1 text-xs font-bold uppercase tracking-wide text-zinc-400">{content.height}</span>
                <input className="w-full rounded-2xl border border-zinc-200 p-4 text-lg font-bold outline-none focus:border-emerald-500" type="text" inputMode="decimal" value={heightCm} onChange={(event) => setHeightCm(event.target.value)} onInput={(event) => setHeightCm(event.currentTarget.value)} placeholder={content.height} />
              </label>
            )}

            <label className="space-y-1">
              <span className="px-1 text-xs font-bold uppercase tracking-wide text-zinc-400">{content.age}</span>
              <input className="w-full rounded-2xl border border-zinc-200 p-4 text-lg font-bold outline-none focus:border-emerald-500" type="text" inputMode="decimal" value={age} onChange={(event) => setAge(event.target.value)} onInput={(event) => setAge(event.currentTarget.value)} placeholder={content.age} />
            </label>

            <label className="space-y-1">
              <span className="px-1 text-xs font-bold uppercase tracking-wide text-zinc-400">{content.sex}</span>
              <select className="w-full rounded-2xl border border-zinc-200 p-4 text-lg font-bold outline-none focus:border-emerald-500" value={sex} onChange={(event) => setSex(event.target.value as Sex)} aria-label={content.sex}>
                <option value="male">{content.male}</option>
                <option value="female">{content.female}</option>
              </select>
            </label>

            <label className="space-y-1">
              <span className="px-1 text-xs font-bold uppercase tracking-wide text-zinc-400">{content.activity}</span>
              <select className="w-full rounded-2xl border border-zinc-200 p-4 text-lg font-bold outline-none focus:border-emerald-500" value={activity} onChange={(event) => setActivity(event.target.value as ActivityLevel)} aria-label={content.activity}>
                {Object.entries(content.activityOptions).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </label>

            <label className="space-y-1">
              <span className="px-1 text-xs font-bold uppercase tracking-wide text-zinc-400">{content.goal}</span>
              <select className="w-full rounded-2xl border border-zinc-200 p-4 text-lg font-bold outline-none focus:border-emerald-500" value={goal} onChange={(event) => setGoal(event.target.value as FitnessGoal)} aria-label={content.goal}>
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
                  <p className={`rounded-full px-4 py-2 text-sm font-black ${statusChipStyles[result.statuses.bmi.id]}`}>
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
                {metricCard({
                  label: content.healthyRange,
                  value: healthyRangeValue,
                  helper: content.metricHelpers.healthyRange,
                  status: result.statuses.healthyRange.id,
                  statusLabel: content.statusLabels[result.statuses.healthyRange.id],
                  minMarkerPosition: 28,
                  maxMarkerPosition: 72,
                  weightMarkerPosition: getWeightRangeMarkerPosition(result.normalized.weightKg, result.range.minKg, result.range.maxKg),
                  currentLabel: lang === "pt" ? "Peso" : "Weight",
                  rangeMinLabel: "Min",
                  rangeMaxLabel: "Max",
                })}
                {metricCard({
                  label: content.water,
                  value: waterValue,
                  helper: content.metricHelpers.water,
                  status: result.statuses.water.id,
                  statusLabel: content.statusLabels[result.statuses.water.id],
                })}
                {metricCard({
                  label: content.goalCalories,
                  value: `${formatNumber(result.goalCalories, lang, { maximumFractionDigits: 0 })} kcal`,
                  helper: content.metricHelpers.goalCalories,
                  status: result.statuses.goalCalories.id,
                  statusLabel: content.statusLabels[result.statuses.goalCalories.id],
                })}
                {metricCard({
                  label: content.protein,
                  value: `${formatNumber(result.protein.minGrams, lang, { maximumFractionDigits: 0 })}–${formatNumber(result.protein.maxGrams, lang, { maximumFractionDigits: 0 })} g`,
                  helper: content.metricHelpers.protein,
                  status: result.statuses.protein.id,
                  statusLabel: content.statusLabels[result.statuses.protein.id],
                })}
                {metricCard({
                  label: content.maintenance,
                  value: `${formatNumber(result.maintenance, lang, { maximumFractionDigits: 0 })} kcal`,
                  helper: content.metricHelpers.maintenance,
                  status: result.statuses.maintenance.id,
                  statusLabel: content.statusLabels[result.statuses.maintenance.id],
                })}
                {metricCard({
                  label: content.bmr,
                  value: `${formatNumber(result.bmr, lang, { maximumFractionDigits: 0 })} kcal`,
                  helper: content.metricHelpers.bmr,
                  status: result.statuses.bmr.id,
                  statusLabel: content.statusLabels[result.statuses.bmr.id],
                })}
              </div>

              <form id="fitness-email" onSubmit={submitEmail} className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-5 shadow-lg shadow-emerald-900/10">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-700">{lang === "pt" ? "Próximo passo" : "Next step"}</p>
                <p className="mt-2 text-2xl font-black tracking-tight text-zinc-950">{content.emailTitle}</p>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{content.emailDescription}</p>
                <input className="hidden" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(event) => setHoneypot(event.target.value)} aria-hidden="true" />
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <input className="min-w-0 flex-1 rounded-full border border-emerald-200 bg-white px-5 py-3 text-base font-semibold outline-none focus:border-emerald-500" type="email" value={email} onFocus={() => trackFitnessEvent("email_field_focused", { source: source || "direct_fitness", lang })} onChange={(event) => setEmail(event.target.value)} placeholder={content.emailPlaceholder} required />
                  <button type="submit" className="rounded-full bg-emerald-400 px-5 py-3 text-sm font-black text-zinc-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60" disabled={emailStatus === "sending"}>
                    {emailStatus === "sending" ? (lang === "pt" ? "Enviando..." : "Sending...") : content.emailButton}
                  </button>
                </div>
                <label className="mt-4 flex items-start gap-3 text-xs font-semibold leading-5 text-zinc-600">
                  <input type="checkbox" className="mt-1 h-4 w-4 rounded border-emerald-300 text-emerald-500" checked={consent} onChange={(event) => setConsent(event.target.checked)} required />
                  <span>{content.emailConsent}</span>
                </label>
                {emailMessage && (
                  <p className={`mt-4 rounded-2xl px-4 py-3 text-sm font-bold leading-6 ${emailStatus === "error" ? "bg-rose-50 text-rose-700" : "bg-white text-emerald-700"}`}>
                    {emailMessage}
                  </p>
                )}
              </form>

              <p className="text-xs leading-5 text-zinc-500">{content.disclaimer}</p>
            </div>
          )}
        </div>
      </section>

      <section id="fitness-next" className="border-t border-white/10 bg-white px-4 py-12 text-zinc-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-black tracking-tight md:text-3xl">{content.relatedTitle}</h2>
            <p className="mt-4 text-lg leading-8 text-zinc-600 md:text-base md:leading-7">{content.relatedIntro}</p>
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-3 xl:grid-cols-7">
            {[
              ["01", content.bmi, content.relatedSteps.bmi, `/${lang}/tools/${lang === "pt" ? "calculadora-imc" : "bmi-calculator"}`],
              ["02", content.bmr, content.relatedSteps.bmr, `/${lang}/tools/${lang === "pt" ? "calculadora-de-tmb" : "bmr-calculator"}`],
              ["03", content.goalCalories, content.relatedSteps.calories, `/${lang}/tools/${lang === "pt" ? "calculadora-calorias" : "calorie-calculator"}`],
              ["04", content.water, content.relatedSteps.water, `/${lang}/tools/${lang === "pt" ? "calculadora-de-ingestao-de-agua" : "water-intake-calculator"}`],
              ["05", content.protein, content.relatedSteps.protein, `/${lang}/tools/${lang === "pt" ? "calculadora-de-proteina" : "protein-calculator"}`],
              ["06", content.healthyRange, content.relatedSteps.idealWeight, `/${lang}/tools/${lang === "pt" ? "calculadora-peso-ideal" : "ideal-weight-calculator"}`],
              ["07", content.macros, content.relatedSteps.macros, `/${lang}/tools/${lang === "pt" ? "calculadora-de-macros" : "macro-calculator"}`],
            ].map(([step, label, helper, href]) => (
              <Link key={href} href={href} className="group rounded-3xl border border-zinc-200 bg-zinc-50 p-5 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50 md:min-h-32">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-emerald-400 text-sm font-black text-zinc-950 shadow-sm shadow-emerald-900/20 md:h-8 md:w-8 md:text-xs">{step}</span>
                  <p className="text-2xl font-black leading-tight md:text-lg">{label}</p>
                </div>
                <p className="mt-4 text-lg leading-7 text-zinc-600 md:text-sm md:leading-6">{helper}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
