"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import ToolBox from "../../components/ui/ToolBox";
import ToolSection from "../../components/toolkit/ToolSection";
import ToolSelect from "../../components/toolkit/ToolSelect";

import { getText } from "../../data/i18n";
import { getLocaleProfile } from "../../data/localeProfiles";
import { calculateBodyFatNavy, type Sex } from "../health/fitness";

import type { ToolComponentProps } from "../types";

function parseUserNumber(value: string) {
  return Number(value.replace(",", "."));
}

function formatNumber(value: number, lang: "en" | "pt", options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat(lang === "pt" ? "pt-BR" : "en-US", options).format(value);
}

function getBodyFatMarker(percent: number) {
  return Math.max(8, Math.min(94, ((percent - 8) / 32) * 100));
}

export default function BodyFatCalculatorTool({ lang, ui }: ToolComponentProps) {
  const toolUi = ui!;
  const usesImperial = getLocaleProfile(lang).measurementSystem === "imperial";
  const [gender, setGender] = useState<Sex>("male");
  const [heightCm, setHeightCm] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [neck, setNeck] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");

  const result = useMemo(() => {
    const neckValue = parseUserNumber(neck);
    const waistValue = parseUserNumber(waist);
    const hipValue = parseUserNumber(hip);
    if (!neckValue || !waistValue) return null;
    if (gender === "female" && !hipValue) return null;

    const input = usesImperial
      ? {
          system: "imperial" as const,
          sex: gender,
          heightFt: parseUserNumber(heightFt),
          heightIn: parseUserNumber(heightIn),
          neckIn: neckValue,
          waistIn: waistValue,
          hipIn: hipValue || undefined,
        }
      : {
          system: "metric" as const,
          sex: gender,
          heightCm: parseUserNumber(heightCm),
          neckCm: neckValue,
          waistCm: waistValue,
          hipCm: hipValue || undefined,
        };

    const hasValidHeight = usesImperial
      ? input.system === "imperial" && (input.heightFt > 0 || input.heightIn > 0)
      : input.system === "metric" && input.heightCm > 0;
    if (!hasValidHeight) return null;

    const bodyFat = calculateBodyFatNavy(input);
    if (!Number.isFinite(bodyFat)) return null;
    return { bodyFat, marker: getBodyFatMarker(bodyFat) };
  }, [gender, heightCm, heightFt, heightIn, hip, neck, usesImperial, waist]);

  const fitnessHref = useMemo(() => {
    const params = new URLSearchParams();
    params.set("sex", gender);
    if (usesImperial) {
      if (heightFt) params.set("heightFt", heightFt);
      if (heightIn) params.set("heightIn", heightIn);
    } else if (heightCm) {
      params.set("heightCm", heightCm);
    }
    params.set("from", "body-fat");
    const query = params.toString();
    return `/${lang}/fitness${query ? `?${query}` : ""}`;
  }, [gender, heightCm, heightFt, heightIn, lang, usesImperial]);

  const inputClass = "block w-full rounded-xl border border-zinc-300 bg-white p-3 text-center text-lg font-semibold text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 md:p-4";
  const selectClass = "text-lg font-semibold text-zinc-950";

  return (
    <ToolBox variant="fitness">
      <ToolSection title={getText(toolUi.heading, lang)} description={getText(toolUi.helper, lang)}>
        <div className="space-y-6">
          <div className="grid gap-3 md:grid-cols-2">
            <ToolSelect value={gender} aria-label={getText(toolUi.gender, lang)} onChange={(event) => setGender(event.target.value as Sex)} className={selectClass}>
              <option value="male">{getText(toolUi.male, lang)}</option>
              <option value="female">{getText(toolUi.female, lang)}</option>
            </ToolSelect>

            {usesImperial ? (
              <div className="grid grid-cols-2 gap-3">
                <input type="text" inputMode="decimal" value={heightFt} onChange={(event) => setHeightFt(event.target.value)} onInput={(event) => setHeightFt(event.currentTarget.value)} placeholder={getText(toolUi.heightFt, lang)} className={inputClass} />
                <input type="text" inputMode="decimal" value={heightIn} onChange={(event) => setHeightIn(event.target.value)} onInput={(event) => setHeightIn(event.currentTarget.value)} placeholder={getText(toolUi.heightIn, lang)} className={inputClass} />
              </div>
            ) : (
              <input type="text" inputMode="decimal" value={heightCm} onChange={(event) => setHeightCm(event.target.value)} onInput={(event) => setHeightCm(event.currentTarget.value)} placeholder={getText(toolUi.height, lang)} className={inputClass} />
            )}

            <input type="text" inputMode="decimal" value={neck} onChange={(event) => setNeck(event.target.value)} onInput={(event) => setNeck(event.currentTarget.value)} placeholder={getText(toolUi.neck, lang)} className={inputClass} />
            <input type="text" inputMode="decimal" value={waist} onChange={(event) => setWaist(event.target.value)} onInput={(event) => setWaist(event.currentTarget.value)} placeholder={getText(toolUi.waist, lang)} className={inputClass} />
            {gender === "female" && (
              <input type="text" inputMode="decimal" value={hip} onChange={(event) => setHip(event.target.value)} onInput={(event) => setHip(event.currentTarget.value)} placeholder={getText(toolUi.hip, lang)} className={`${inputClass} md:col-span-2`} />
            )}
          </div>

          {result && (
            <div className="space-y-5 rounded-3xl border border-rose-200 bg-gradient-to-br from-white to-rose-50 p-4 shadow-sm md:p-6">
              <div className="grid gap-4 rounded-3xl bg-zinc-950 p-5 text-center text-white sm:grid-cols-2 sm:items-center">
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-sm font-bold text-zinc-400">{getText(toolUi.resultTitle, lang)}</p>
                  <p className="mt-1 text-5xl font-black tracking-tight">
                    {formatNumber(result.bodyFat, lang, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%
                  </p>
                  <p className="mt-1 text-sm font-bold text-zinc-400">{getText(toolUi.bodyFat, lang)}</p>
                </div>
                <div className="flex justify-center rounded-2xl bg-white/5 p-4">
                  <span className="self-center rounded-full bg-rose-100 px-4 py-2 text-sm font-black uppercase text-rose-700">
                    {getText(toolUi.status, lang)}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="relative pt-6">
                  <div className="absolute top-0 h-5 w-1 -translate-x-1/2 rounded-full bg-rose-700" style={{ left: `${result.marker}%` }} />
                  <div className="h-4 rounded-full bg-gradient-to-r from-sky-300 via-emerald-300 via-amber-300 to-rose-500 ring-1 ring-rose-100" />
                </div>
                <div className="grid grid-cols-3 text-center text-[10px] font-bold uppercase tracking-wide text-zinc-500 md:text-xs">
                  <span>8%</span><span>24%</span><span>40%+</span>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {[[getText(toolUi.neckHelper, lang), neck], [getText(toolUi.waistHelper, lang), waist], ...(gender === "female" ? [[getText(toolUi.hipHelper, lang), hip]] : [])].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-rose-200 bg-white p-4 text-center">
                    <p className="text-xs font-black uppercase tracking-wide text-zinc-500">{label}</p>
                    <p className="mt-2 text-2xl font-black text-zinc-950">{value}</p>
                  </div>
                ))}
              </div>

              <p className="rounded-2xl bg-white p-4 text-center text-sm font-medium leading-6 text-zinc-700 shadow-sm md:text-base">{getText(toolUi.resultHelper, lang)}</p>

              <div className="rounded-3xl bg-zinc-950 p-5 text-center text-white shadow-xl shadow-zinc-900/20 md:p-6">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-300">{getText(toolUi.ctaEyebrow, lang)}</p>
                <h3 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">{getText(toolUi.ctaTitle, lang)}</h3>
                <div className="mt-5 grid gap-3 sm:grid-cols-4">
                  {[["📏", getText(toolUi.bmi, lang)], ["🔥", getText(toolUi.calories, lang)], ["🥩", getText(toolUi.protein, lang)], ["⚖️", getText(toolUi.idealWeight, lang)]].map(([icon, item]) => (
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
