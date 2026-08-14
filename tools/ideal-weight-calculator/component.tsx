"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import ToolBox from "../../components/ui/ToolBox";
import ToolSection from "../../components/toolkit/ToolSection";

import { getText } from "../../data/i18n";
import { getLocaleProfile } from "../../data/localeProfiles";
import { getHealthyWeightRange, kgToPounds } from "../health/bmi";

import type { ToolComponentProps } from "../types";

function parseUserNumber(value: string) {
  return Number(value.replace(",", "."));
}

function formatNumber(value: number, lang: "en" | "pt", options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat(lang === "pt" ? "pt-BR" : "en-US", options).format(value);
}

export default function IdealWeightCalculatorTool({ lang, ui }: ToolComponentProps) {
  const toolUi = ui!;
  const usesImperial = getLocaleProfile(lang).measurementSystem === "imperial";
  const [heightCm, setHeightCm] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");

  const result = useMemo(() => {
    const input = usesImperial
      ? { system: "imperial" as const, weightLb: 180, heightFt: parseUserNumber(heightFt), heightIn: parseUserNumber(heightIn) }
      : { system: "metric" as const, weightKg: 70, heightCm: parseUserNumber(heightCm) };

    const hasValidHeight = usesImperial
      ? input.system === "imperial" && (input.heightFt > 0 || input.heightIn > 0)
      : input.system === "metric" && input.heightCm > 0;

    if (!hasValidHeight) return null;

    const range = getHealthyWeightRange(input);
    const min = usesImperial ? kgToPounds(range.minKg) : range.minKg;
    const center = usesImperial ? kgToPounds(range.targetKg) : range.targetKg;
    const max = usesImperial ? kgToPounds(range.maxKg) : range.maxKg;

    return { min, center, max };
  }, [heightCm, heightFt, heightIn, usesImperial]);

  const fitnessHref = useMemo(() => {
    const params = new URLSearchParams();
    if (usesImperial) {
      if (heightFt) params.set("heightFt", heightFt);
      if (heightIn) params.set("heightIn", heightIn);
    } else if (heightCm) {
      params.set("heightCm", heightCm);
    }
    params.set("from", "ideal-weight");
    const query = params.toString();
    return `/${lang}/fitness${query ? `?${query}` : ""}`;
  }, [heightCm, heightFt, heightIn, lang, usesImperial]);

  const inputClass = "block w-full rounded-xl border border-zinc-300 bg-white p-3 text-center text-lg font-semibold text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 md:p-4";
  const unit = usesImperial ? "lb" : "kg";

  return (
    <ToolBox variant="fitness">
      <ToolSection title={getText(toolUi.heading, lang)} description={getText(toolUi.helper, lang)}>
        <div className="space-y-6">
          <div className="grid gap-3 md:grid-cols-2">
            {usesImperial ? (
              <>
                <label className="block">
                  <input type="text" inputMode="decimal" value={heightFt} onChange={(event) => setHeightFt(event.target.value)} onInput={(event) => setHeightFt(event.currentTarget.value)} placeholder={getText(toolUi.heightFt, lang)} className={inputClass} />
                </label>
                <label className="block">
                  <input type="text" inputMode="decimal" value={heightIn} onChange={(event) => setHeightIn(event.target.value)} onInput={(event) => setHeightIn(event.currentTarget.value)} placeholder={getText(toolUi.heightIn, lang)} className={inputClass} />
                </label>
              </>
            ) : (
              <label className="block md:col-span-2">
                <input type="text" inputMode="decimal" value={heightCm} onChange={(event) => setHeightCm(event.target.value)} onInput={(event) => setHeightCm(event.currentTarget.value)} placeholder={getText(toolUi.height, lang)} className={inputClass} />
              </label>
            )}
          </div>

          {result && (
            <div className="space-y-5 rounded-3xl border border-emerald-200 bg-gradient-to-br from-white to-emerald-50 p-4 shadow-sm md:p-6">
              <div className="grid gap-4 rounded-3xl bg-zinc-950 p-5 text-center text-white sm:grid-cols-2 sm:items-center">
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-sm font-bold text-zinc-400">{getText(toolUi.resultTitle, lang)}</p>
                  <p className="mt-1 text-5xl font-black tracking-tight">
                    {formatNumber(result.min, lang, { maximumFractionDigits: 1 })}–{formatNumber(result.max, lang, { maximumFractionDigits: 1 })}
                  </p>
                  <p className="mt-1 text-sm font-bold text-zinc-400">{unit}</p>
                </div>
                <div className="flex justify-center rounded-2xl bg-white/5 p-4">
                  <span className="self-center rounded-full bg-emerald-100 px-4 py-2 text-sm font-black uppercase text-emerald-700">
                    {getText(toolUi.status, lang)}
                  </span>
                </div>
              </div>

              <div className="relative px-2 pt-7 pb-8">
                <div className="relative h-4 rounded-full bg-gradient-to-r from-sky-300 via-emerald-300 to-amber-300 ring-1 ring-emerald-100">
                  {[
                    ["MIN", 6, "bg-emerald-700"],
                    [lang === "pt" ? "PESO" : "WEIGHT", 50, "bg-zinc-950"],
                    ["MAX", 94, "bg-emerald-700"],
                  ].map(([label, left, color]) => (
                    <span key={label} className="absolute top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1" style={{ left: `${left}%` }}>
                      <span className={`h-8 w-1.5 rounded-full ${color}`} />
                      <span className="absolute top-8 text-[0.62rem] font-black uppercase tracking-wide text-zinc-500">{label}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {[
                  [getText(toolUi.minTarget, lang), result.min, "text-sky-700", "bg-sky-50 border-sky-200"],
                  [getText(toolUi.centerTarget, lang), result.center, "text-emerald-700", "bg-emerald-50 border-emerald-200"],
                  [getText(toolUi.maxTarget, lang), result.max, "text-zinc-950", "bg-white border-emerald-200"],
                ].map(([label, value, textColor, boxColor]) => (
                  <div key={label as string} className={`rounded-2xl border p-4 text-center ${boxColor}`}>
                    <p className="text-xs font-black uppercase tracking-wide text-zinc-500">{label as string}</p>
                    <p className={`mt-2 text-2xl font-black ${textColor}`}>
                      {formatNumber(value as number, lang, { maximumFractionDigits: 1 })} <span className="text-sm font-black opacity-70">{unit}</span>
                    </p>
                  </div>
                ))}
              </div>

              <p className="rounded-2xl bg-white p-4 text-center text-sm font-medium leading-6 text-zinc-700 shadow-sm md:text-base">
                {getText(toolUi.resultHelper, lang)}
              </p>

              <div className="rounded-3xl bg-zinc-950 p-5 text-center text-white shadow-xl shadow-zinc-900/20 md:p-6">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-300">{getText(toolUi.ctaEyebrow, lang)}</p>
                <h3 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">{getText(toolUi.ctaTitle, lang)}</h3>
                <div className="mt-5 grid gap-3 sm:grid-cols-4">
                  {[["📏", getText(toolUi.bmi, lang)], ["🔥", getText(toolUi.calories, lang)], ["⚙️", getText(toolUi.metabolism, lang)], ["🥩", getText(toolUi.protein, lang)]].map(([icon, item]) => (
                    <div key={item} className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 text-center shadow-lg shadow-black/10">
                      <span className="text-3xl leading-none" aria-hidden="true">{icon}</span>
                      <span className="text-base font-black leading-tight text-white md:text-lg">{item}</span>
                    </div>
                  ))}
                </div>
                <Link href={fitnessHref} className="mt-6 inline-flex items-center justify-center rounded-full bg-emerald-400 px-6 py-3 text-sm font-black uppercase tracking-wide text-zinc-950 transition hover:bg-emerald-300">
                  {getText(toolUi.openFitness, lang)}
                </Link>
                <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-6 text-zinc-300 md:text-base">
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
