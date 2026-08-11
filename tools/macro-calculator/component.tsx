"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import ToolBox from "../../components/ui/ToolBox";
import ToolSection from "../../components/toolkit/ToolSection";
import ToolSelect from "../../components/toolkit/ToolSelect";

import { getText } from "../../data/i18n";
import { getLocaleProfile } from "../../data/localeProfiles";
import { calculateMacroTargets, type FitnessGoal } from "../health/fitness";

import type { ToolComponentProps } from "../types";

function parseUserNumber(value: string) {
  return Number(value.replace(",", "."));
}

function formatNumber(value: number, lang: "en" | "pt") {
  return new Intl.NumberFormat(lang === "pt" ? "pt-BR" : "en-US", { maximumFractionDigits: 0 }).format(value);
}

export default function MacroCalculatorTool({ lang, ui }: ToolComponentProps) {
  const toolUi = ui!;
  const usesImperial = getLocaleProfile(lang).measurementSystem === "imperial";
  const [calories, setCalories] = useState("");
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState<FitnessGoal>("maintain");

  const result = useMemo(() => {
    const calorieValue = parseUserNumber(calories);
    const weightValue = parseUserNumber(weight);
    if (!calorieValue || !weightValue) return null;

    return calculateMacroTargets({
      calories: calorieValue,
      input: usesImperial
        ? { system: "imperial", weightLb: weightValue, heightFt: 5, heightIn: 10 }
        : { system: "metric", weightKg: weightValue, heightCm: 175 },
      goal,
    });
  }, [calories, goal, usesImperial, weight]);

  const fitnessHref = useMemo(() => {
    const params = new URLSearchParams();
    if (calories) params.set("calories", calories);
    if (weight) params.set("weight", weight);
    params.set("goal", goal);
    params.set("from", "macros");
    return `/${lang}/fitness?${params.toString()}`;
  }, [calories, goal, lang, weight]);

  const inputClass = "block w-full rounded-xl border border-zinc-300 bg-white p-3 text-center text-lg font-semibold text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 md:p-4";

  return (
    <ToolBox>
      <ToolSection title={getText(toolUi.heading, lang)} description={getText(toolUi.helper, lang)}>
        <div className="space-y-6">
          <div className="grid gap-3 md:grid-cols-3">
            <input type="text" inputMode="decimal" value={calories} onChange={(event) => setCalories(event.target.value)} onInput={(event) => setCalories(event.currentTarget.value)} placeholder={getText(toolUi.calories, lang)} className={inputClass} />
            <input type="text" inputMode="decimal" value={weight} onChange={(event) => setWeight(event.target.value)} onInput={(event) => setWeight(event.currentTarget.value)} placeholder={getText(toolUi.weight, lang)} className={inputClass} />
            <ToolSelect value={goal} aria-label={getText(toolUi.goal, lang)} onChange={(event) => setGoal(event.target.value as FitnessGoal)} className="text-lg font-semibold text-zinc-950">
              <option value="lose">{getText(toolUi.lose, lang)}</option>
              <option value="maintain">{getText(toolUi.maintain, lang)}</option>
              <option value="gain">{getText(toolUi.gain, lang)}</option>
            </ToolSelect>
          </div>

          {result && (
            <div className="space-y-5 rounded-3xl border border-emerald-200 bg-gradient-to-br from-white to-emerald-50 p-4 shadow-sm md:p-6">
              <div className="grid gap-4 rounded-3xl bg-zinc-950 p-5 text-center text-white sm:grid-cols-2 sm:items-center">
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-sm font-bold text-zinc-400">{getText(toolUi.resultTitle, lang)}</p>
                  <p className="mt-1 text-5xl font-black tracking-tight">{formatNumber(parseUserNumber(calories), lang)}</p>
                  <p className="mt-1 text-sm font-bold text-zinc-400">{getText(toolUi.caloriesLabel, lang)}</p>
                </div>
                <div className="flex justify-center rounded-2xl bg-white/5 p-4">
                  <span className="self-center rounded-full bg-emerald-100 px-4 py-2 text-sm font-black uppercase text-emerald-700">
                    {getText(toolUi.status, lang)}
                  </span>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {[
                  ["🥩", getText(toolUi.protein, lang), result.proteinGrams],
                  ["🍚", getText(toolUi.carbs, lang), result.carbGrams],
                  ["🥑", getText(toolUi.fat, lang), result.fatGrams],
                ].map(([icon, label, value]) => (
                  <div key={label} className="rounded-2xl border border-emerald-200 bg-white p-5 text-center shadow-sm">
                    <span className="text-3xl" aria-hidden="true">{icon}</span>
                    <p className="mt-3 text-xs font-black uppercase tracking-wide text-zinc-500">{label}</p>
                    <p className="mt-2 text-4xl font-black tracking-tight text-zinc-950">{formatNumber(Number(value), lang)} <span className="text-lg font-black text-zinc-500">{lang === "pt" ? "g/dia" : "g/day"}</span></p>
                  </div>
                ))}
              </div>

              <p className="rounded-2xl bg-white p-4 text-center text-sm font-medium leading-6 text-zinc-700 shadow-sm md:text-base">{getText(toolUi.resultHelper, lang)}</p>

              <div className="rounded-3xl bg-zinc-950 p-5 text-center text-white shadow-xl shadow-zinc-900/20 md:p-6">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-300">{getText(toolUi.ctaEyebrow, lang)}</p>
                <h3 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">{getText(toolUi.ctaTitle, lang)}</h3>
                <div className="mt-5 grid gap-3 sm:grid-cols-4">
                  {[["📏", getText(toolUi.bmi, lang)], ["🧬", getText(toolUi.bodyFat, lang)], ["💧", getText(toolUi.water, lang)], ["⚖️", getText(toolUi.idealWeight, lang)]].map(([icon, item]) => (
                    <div key={item} className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 text-center shadow-lg shadow-black/10">
                      <span className="text-3xl leading-none" aria-hidden="true">{icon}</span>
                      <span className="text-base font-black leading-tight text-white md:text-lg">{item}</span>
                    </div>
                  ))}
                </div>
                <Link href={fitnessHref} className="mt-6 inline-flex items-center justify-center rounded-full bg-emerald-400 px-6 py-3 text-sm font-black uppercase tracking-wide text-zinc-950 transition hover:bg-emerald-300">
                  {getText(toolUi.openFitness, lang)}
                </Link>
                <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-6 text-zinc-300 md:text-base">{getText(toolUi.ctaDescription, lang)}</p>
              </div>

              <p className="text-center text-xs leading-5 text-zinc-500 md:text-sm">{getText(toolUi.disclaimer, lang)}</p>
            </div>
          )}
        </div>
      </ToolSection>
    </ToolBox>
  );
}
