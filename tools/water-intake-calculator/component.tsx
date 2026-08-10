"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import ToolBox from "../../components/ui/ToolBox";
import ToolSection from "../../components/toolkit/ToolSection";

import { getText } from "../../data/i18n";
import { poundsToKg } from "../health/bmi";
import { calculateWaterIntakeLitersFromWeightKg } from "../health/fitness";

import type { ToolComponentProps } from "../types";

type Snapshot = {
  createdAt: string;
  waterLiters: number;
  weightKg: number;
  activityMinutes: number;
};

const storageKey = "nextool_water_snapshots_v1";

const copy = {
  en: {
    weightLabel: "Weight (lb)",
    activityLabel: "Activity minutes/day",
    resultTitle: "Your daily water target",
    status: "Daily target",
    liters: "liters/day",
    milliliters: "milliliters/day",
    summary: "Your estimated water target is based on weight and activity.",
    helper: "Add a few more details to see this together with BMI, calories, protein and metabolism in your full fitness profile.",
    saveTitle: "Want the full fitness snapshot?",
    saveDescription: "Use water together with BMI, calories, protein and local progress history inside NexTool Fit.",
    saveButton: "Save this result",
    saved: "Saved",
    historyTitle: "Local water history",
    clear: "Clear",
    emailTitle: "Soon: weekly fitness profile by email",
    emailDescription: "Receive your water, calories, BMI and progress in one visual report after the full profile is ready.",
    emailPlaceholder: "your@email.com",
    emailButton: "Join the waitlist",
    fullSnapshot: "Open NexTool Fit",
    relatedTitle: "Continue with connected metrics",
    disclaimer: "This is a general estimate for adults and does not replace medical or nutrition advice.",
    links: [
      { href: "/en/tools/bmi-calculator", label: "BMI Calculator" },
      { href: "/en/tools/bmr-calculator", label: "Basal Metabolic Rate Calculator" },
      { href: "/en/tools/calorie-calculator", label: "Daily Calorie Calculator" },
      { href: "/en/tools/body-fat-calculator", label: "Body Fat Calculator" },
    ],
  },
  pt: {
    weightLabel: "Peso (kg)",
    activityLabel: "Minutos de atividade/dia",
    resultTitle: "Sua meta diária de água",
    status: "Meta diária",
    liters: "litros/dia",
    milliliters: "mililitros/dia",
    summary: "Sua meta estimada de água é calculada a partir do seu peso e atividade.",
    helper: "Adicione mais alguns dados para ver água, IMC, calorias, proteína e metabolismo dentro do seu perfil fitness completo.",
    saveTitle: "Quer ver o perfil fitness completo?",
    saveDescription: "Use água junto com IMC, calorias, proteína e histórico local dentro do NexTool Fit.",
    saveButton: "Salvar este resultado",
    saved: "Salvo",
    historyTitle: "Histórico local de água",
    clear: "Limpar",
    emailTitle: "Em breve: perfil fitness semanal por email",
    emailDescription: "Receba água, calorias, IMC e evolução em um relatório visual único quando o perfil completo estiver pronto.",
    emailPlaceholder: "seu@email.com",
    emailButton: "Entrar na lista",
    fullSnapshot: "Abrir NexTool Fit",
    relatedTitle: "Continue com métricas conectadas",
    disclaimer: "Esta é uma estimativa geral para adultos e não substitui orientação médica ou nutricional.",
    links: [
      { href: "/pt/tools/calculadora-imc", label: "Calculadora IMC" },
      { href: "/pt/tools/calculadora-de-tmb", label: "Taxa de Metabolismo Basal" },
      { href: "/pt/tools/calculadora-calorias", label: "Calculadora de Calorias Diárias" },
      { href: "/pt/tools/calculadora-percentual-gordura", label: "Calculadora de Gordura Corporal" },
    ],
  },
};

function parseUserNumber(value: string) {
  return Number(value.replace(",", "."));
}

function formatNumber(value: number, lang: "en" | "pt", options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat(lang === "pt" ? "pt-BR" : "en-US", options).format(value);
}

function getWaterMarker(liters: number) {
  return Math.max(8, Math.min(94, (liters / 5) * 100));
}

export default function WaterIntakeCalculatorTool({
  lang,
  ui,
}: ToolComponentProps) {
  const toolUi = ui!;
  const content = copy[lang];

  const [weight, setWeight] = useState("");
  const [activityMinutes, setActivityMinutes] = useState("");
  const [saved, setSaved] = useState(false);
  const [snapshots, setSnapshots] = useState<Snapshot[]>(() => {
    if (typeof window === "undefined") return [];

    try {
      const raw = window.localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const result = useMemo(() => {
    const inputWeightValue = parseUserNumber(weight);
    const activityValue = parseUserNumber(activityMinutes);

    if (!inputWeightValue) {
      return null;
    }

    const weightKg = lang === "en" ? poundsToKg(inputWeightValue) : inputWeightValue;
    const safeActivity = Math.max(0, activityValue || 0);
    const waterLiters = calculateWaterIntakeLitersFromWeightKg(weightKg, safeActivity);
    const waterMl = waterLiters * 1000;

    return {
      waterMl,
      waterLiters,
      weightKg,
      inputWeight: inputWeightValue,
      activityMinutes: safeActivity,
      marker: getWaterMarker(waterLiters),
    };
  }, [activityMinutes, lang, weight]);

  const fitnessHref = useMemo(() => {
    const params = new URLSearchParams();
    if (weight) params.set("weight", weight);
    if (activityMinutes) params.set("activityMinutes", activityMinutes);
    params.set("from", "water");
    const query = params.toString();
    return `/${lang}/fitness${query ? `?${query}` : ""}`;
  }, [activityMinutes, lang, weight]);

  const saveSnapshot = () => {
    if (!result) return;

    const nextSnapshots = [
      {
        createdAt: new Date().toISOString(),
        waterLiters: result.waterLiters,
        weightKg: result.weightKg,
        activityMinutes: result.activityMinutes,
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
    <ToolBox>
      <ToolSection
        title={getText(toolUi.heading, lang)}
        description={getText(toolUi.helper, lang)}
      >
        <div className="space-y-6">
          <div className="grid gap-3 md:grid-cols-2">
            <label className="block">
              <input
                type="text"
                inputMode="decimal"
                value={weight}
                onChange={(event) => setWeight(event.target.value)}
                onInput={(event) => setWeight(event.currentTarget.value)}
                placeholder={content.weightLabel}
                className="block w-full rounded-xl border border-zinc-300 bg-white p-3 text-center text-lg font-semibold text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 md:p-4 md:text-lg"
              />
            </label>

            <label className="block">
              <input
                type="text"
                inputMode="decimal"
                value={activityMinutes}
                onChange={(event) => setActivityMinutes(event.target.value)}
                onInput={(event) => setActivityMinutes(event.currentTarget.value)}
                placeholder={content.activityLabel}
                className="block w-full rounded-xl border border-zinc-300 bg-white p-3 text-center text-lg font-semibold text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 md:p-4 md:text-lg"
              />
            </label>
          </div>

          {result && (
            <div className="space-y-5 rounded-3xl border border-sky-200 bg-gradient-to-br from-white to-sky-50 p-4 shadow-sm md:p-6">
              <div className="grid gap-4 rounded-3xl bg-zinc-950 p-5 text-center text-white sm:grid-cols-2 sm:items-center">
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-sm font-bold text-zinc-400">{content.resultTitle}</p>
                  <p className="mt-1 text-5xl font-black tracking-tight">
                    {formatNumber(result.waterLiters, lang, { minimumFractionDigits: 1, maximumFractionDigits: 1 })} L
                  </p>
                </div>
                <div className="flex justify-center rounded-2xl bg-white/5 p-4">
                  <span className="self-center rounded-full bg-sky-100 px-4 py-2 text-sm font-black uppercase text-sky-700">
                    {content.status}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="relative pt-6">
                  <div
                    className="absolute top-0 h-5 w-1 -translate-x-1/2 rounded-full bg-sky-700"
                    style={{ left: `${result.marker}%` }}
                  />
                  <div className="h-4 rounded-full bg-gradient-to-r from-sky-200 via-sky-400 to-cyan-700 ring-1 ring-sky-100" />
                </div>
                <div className="grid grid-cols-3 text-center text-[10px] font-bold uppercase tracking-wide text-zinc-500 md:text-xs">
                  <span>1 L</span>
                  <span>3 L</span>
                  <span>5 L+</span>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4">
                  <p className="text-xs font-black uppercase tracking-wide text-zinc-500">{content.liters}</p>
                  <p className="mt-3 text-3xl font-black text-sky-700">
                    {formatNumber(result.waterLiters, lang, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} L
                  </p>
                </div>
                <div className="rounded-2xl border border-sky-200 bg-white p-4">
                  <p className="text-xs font-black uppercase tracking-wide text-zinc-500">{content.milliliters}</p>
                  <p className="mt-3 text-3xl font-black text-zinc-950">
                    {formatNumber(result.waterMl, lang, { maximumFractionDigits: 0 })} ml
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                <p className="font-semibold text-zinc-950">{content.summary}</p>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{content.helper}</p>
                <p className="mt-3 text-xs leading-5 text-zinc-500">{content.disclaimer}</p>
              </div>

              <div id="fitness-save" className="overflow-hidden rounded-3xl border border-sky-200 bg-zinc-950 text-white shadow-2xl shadow-sky-900/20">
                <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 p-5 text-center md:p-6">
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-sky-300">
                    {lang === "pt" ? "Próximo passo" : "Next step"}
                  </p>
                  <h3 className="text-2xl font-black tracking-tight md:text-3xl">
                    {lang === "pt" ? "Descubra também:" : "Also discover:"}
                  </h3>

                  <div className="grid w-full grid-cols-1 gap-3 text-left text-sm sm:grid-cols-2 lg:grid-cols-4">
                    {(lang === "pt"
                      ? [
                          ["⚖️", "IMC"],
                          ["🔥", "Calorias diárias"],
                          ["⚙️", "Metabolismo basal"],
                          ["🥩", "Proteína diária"],
                        ]
                      : [
                          ["⚖️", "BMI"],
                          ["🔥", "Daily calories"],
                          ["⚙️", "Basal metabolic rate"],
                          ["🥩", "Daily protein"],
                        ]
                    ).map(([icon, item]) => (
                      <div key={item} className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 text-center shadow-lg shadow-black/10">
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10 text-xl" aria-hidden="true">{icon}</span>
                        <p className="text-base font-black leading-tight text-white md:text-sm lg:text-base">{item}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap justify-center gap-3">
                    <Link href={fitnessHref} className="rounded-full bg-sky-300 px-5 py-3 text-sm font-black text-zinc-950 shadow-lg shadow-sky-950/30 transition hover:bg-sky-200">
                      {lang === "pt" ? "Gerar meu perfil fitness completo" : "Generate my full fitness profile"}
                    </Link>
                    <button type="button" onClick={saveSnapshot} className="rounded-full border border-white/20 px-5 py-3 text-sm font-black text-white transition hover:border-white/60">
                      {saved ? content.saved : content.saveButton}
                    </button>
                  </div>

                  <p className="max-w-2xl text-sm leading-6 text-zinc-300">
                    {lang === "pt"
                      ? "Você já sabe sua meta de água. Complete o painel com as métricas que conectam hidratação, energia e objetivo."
                      : "You already know your water target. Complete the dashboard with the metrics that connect hydration, energy and your goal."}
                  </p>
                </div>
              </div>

              {snapshots.length > 0 && (
                <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-black text-zinc-950">{content.historyTitle}</p>
                    <button type="button" onClick={clearHistory} className="text-xs font-bold text-zinc-500 hover:text-zinc-950">
                      {content.clear}
                    </button>
                  </div>
                  <div className="mt-4 space-y-2">
                    {snapshots.map((snapshot) => (
                      <div key={`${snapshot.createdAt}-${snapshot.waterLiters}`} className="flex items-center justify-between rounded-2xl bg-zinc-50 px-4 py-3 text-sm">
                        <span className="font-semibold text-zinc-600">{new Date(snapshot.createdAt).toLocaleDateString(lang === "pt" ? "pt-BR" : "en-US")}</span>
                        <span className="font-black text-zinc-950">{formatNumber(snapshot.waterLiters, lang, { minimumFractionDigits: 1, maximumFractionDigits: 1 })} L</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>
      </ToolSection>
    </ToolBox>
  );
}
