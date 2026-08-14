"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import ToolBox from "../../components/ui/ToolBox";
import ToolSection from "../../components/toolkit/ToolSection";
import ToolSelect from "../../components/toolkit/ToolSelect";

import { getText } from "../../data/i18n";
import { getLocaleProfile } from "../../data/localeProfiles";
import { calculateProteinRange, type FitnessGoal } from "../health/fitness";

import type { ToolComponentProps } from "../types";

function parseUserNumber(value: string) {
  return Number(value.replace(",", "."));
}

function formatNumber(value: number, lang: "en" | "pt", options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat(lang === "pt" ? "pt-BR" : "en-US", options).format(value);
}

function getProteinMarker(maxGrams: number) {
  return Math.max(8, Math.min(94, ((maxGrams - 60) / 160) * 100));
}

export default function ProteinCalculatorTool({ lang, ui }: ToolComponentProps) {
  const toolUi = ui!;
  const usesImperial = getLocaleProfile(lang).measurementSystem === "imperial";
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState<FitnessGoal>("gain");

  const result = useMemo(() => {
    const weightValue = parseUserNumber(weight);
    if (!weightValue) return null;

    const input = usesImperial
      ? { system: "imperial" as const, weightLb: weightValue, heightFt: 5, heightIn: 8 }
      : { system: "metric" as const, weightKg: weightValue, heightCm: 170 };

    const protein = calculateProteinRange(input, goal);
    return {
      ...protein,
      marker: getProteinMarker(protein.maxGrams),
    };
  }, [goal, usesImperial, weight]);

  const fitnessHref = useMemo(() => {
    const params = new URLSearchParams();
    if (weight) params.set("weight", weight);
    params.set("goal", goal);
    params.set("from", "protein");
    const query = params.toString();
    return `/${lang}/fitness${query ? `?${query}` : ""}`;
  }, [goal, lang, weight]);

  const inputClass = "block w-full rounded-2xl border border-sky-200 bg-white p-3 text-center text-lg font-semibold text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-sky-500 md:p-4";
  const selectClass = "text-lg font-semibold text-zinc-950";
  const gramUnit = lang === "pt" ? "g/dia" : "g/day";

  return (
    <ToolBox variant="fitness">
      <ToolSection title={getText(toolUi.heading, lang)} description={getText(toolUi.helper, lang)}>
        <div className="space-y-6">
          <div className="grid gap-3 md:grid-cols-2">
            <label className="block">
              <input
                type="text"
                inputMode="decimal"
                value={weight}
                onChange={(event) => setWeight(event.target.value)}
                onInput={(event) => setWeight(event.currentTarget.value)}
                placeholder={getText(toolUi.weight, lang)}
                className={inputClass}
              />
            </label>

            <ToolSelect
              value={goal}
              aria-label={getText(toolUi.goal, lang)}
              onChange={(event) => setGoal(event.target.value as FitnessGoal)}
              className={selectClass}
            >
              <option value="lose">{getText(toolUi.lose, lang)}</option>
              <option value="maintain">{getText(toolUi.maintain, lang)}</option>
              <option value="gain">{getText(toolUi.gain, lang)}</option>
            </ToolSelect>
          </div>

          {result && (
            <div className="space-y-5 rounded-3xl border border-sky-100 bg-gradient-to-br from-white to-sky-50 p-4 shadow-sm md:p-6">
              <div className="grid gap-4 rounded-3xl border border-sky-100 bg-white p-5 text-center text-slate-950 shadow-sm sm:grid-cols-2 sm:items-center">
                <div className="rounded-2xl bg-sky-50 p-4">
                  <p className="text-sm font-bold text-slate-500">{getText(toolUi.resultTitle, lang)}</p>
                  <p className="mt-1 text-5xl font-black tracking-tight">
                    {formatNumber(result.minGrams, lang, { maximumFractionDigits: 0 })}–{formatNumber(result.maxGrams, lang, { maximumFractionDigits: 0 })}
                  </p>
                  <p className="mt-1 text-sm font-bold text-slate-500">{gramUnit}</p>
                </div>
                <div className="flex justify-center rounded-2xl bg-emerald-50 p-4">
                  <span className="self-center rounded-full bg-emerald-100 px-4 py-2 text-sm font-black uppercase text-emerald-700">
                    {getText(toolUi.status, lang)}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="relative pt-6">
                  <div className="absolute top-0 h-5 w-1 -translate-x-1/2 rounded-full bg-emerald-700" style={{ left: `${result.marker}%` }} />
                  <div className="h-4 rounded-full bg-gradient-to-r from-emerald-200 via-emerald-400 to-lime-600 ring-1 ring-emerald-100" />
                </div>
                <div className="grid grid-cols-3 text-center text-[10px] font-bold uppercase tracking-wide text-zinc-500 md:text-xs">
                  <span>60g</span>
                  <span>140g</span>
                  <span>220g+</span>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-center">
                  <p className="text-xs font-black uppercase tracking-wide text-zinc-500">{getText(toolUi.minTarget, lang)}</p>
                  <p className="mt-2 text-3xl font-black text-emerald-700">
                    {formatNumber(result.minGrams, lang, { maximumFractionDigits: 0 })} <span className="text-sm font-black text-emerald-700/70">{gramUnit}</span>
                  </p>
                </div>
                <div className="rounded-2xl border border-lime-200 bg-white p-4 text-center">
                  <p className="text-xs font-black uppercase tracking-wide text-zinc-500">{getText(toolUi.maxTarget, lang)}</p>
                  <p className="mt-2 text-3xl font-black text-zinc-950">
                    {formatNumber(result.maxGrams, lang, { maximumFractionDigits: 0 })} <span className="text-sm font-black text-zinc-500">{gramUnit}</span>
                  </p>
                </div>
              </div>

              <p className="rounded-2xl bg-white p-4 text-center text-sm font-medium leading-6 text-zinc-700 shadow-sm md:text-base">
                {getText(toolUi.resultHelper, lang)}
              </p>

              <div className="rounded-3xl border border-sky-100 bg-gradient-to-br from-sky-50 to-emerald-50 p-5 text-center text-slate-950 shadow-xl shadow-sky-100/70 md:p-6">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-sky-600">{getText(toolUi.ctaEyebrow, lang)}</p>
                <h3 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">{getText(toolUi.ctaTitle, lang)}</h3>
                <div className="mt-5 grid gap-3 sm:grid-cols-4">
                  {[
                    ["🔥", getText(toolUi.calories, lang)],
                    ["⚙️", getText(toolUi.metabolism, lang)],
                    ["💧", getText(toolUi.water, lang)],
                    ["⚖️", getText(toolUi.idealWeight, lang)],
                  ].map(([icon, item]) => (
                    <div key={item} className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-sky-200 bg-white p-4 text-center shadow-lg shadow-sky-100/80 ring-1 ring-sky-50">
                      <span className="text-3xl leading-none" aria-hidden="true">{icon}</span>
                      <span className="text-base font-black leading-tight text-slate-800 md:text-lg">{item}</span>
                    </div>
                  ))}
                </div>
                <Link href={fitnessHref} className="mt-6 inline-flex items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-sky-400">
                  {getText(toolUi.openFitness, lang)}
                </Link>
                <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-6 text-slate-600 md:text-base">
                  {getText(toolUi.ctaDescription, lang)}
                </p>
              </div>

              <p className="text-center text-xs leading-5 text-zinc-500 md:text-sm">{getText(toolUi.disclaimer, lang)}</p>
            </div>
          )}
        </div>
      </ToolSection>
    </ToolBox>
  );
}
