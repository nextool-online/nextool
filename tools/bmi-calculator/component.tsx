"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import ToolBox from "../../components/ui/ToolBox";
import ToolInput from "../../components/toolkit/ToolInput";
import ToolResult from "../../components/toolkit/ToolResult";
import ToolSection from "../../components/toolkit/ToolSection";

import { getLocaleProfile } from "../../data/localeProfiles";
import { getText } from "../../data/i18n";
import { formatDecimal, formatUnit } from "../../utils/formatters";
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

const relatedToolLinks = {
  en: [
    { href: "/en/tools/bmr-calculator", label: "BMR Calculator" },
    { href: "/en/tools/calorie-calculator", label: "Calorie Calculator" },
    { href: "/en/tools/water-intake-calculator", label: "Water Intake Calculator" },
    { href: "/en/tools/body-fat-calculator", label: "Body Fat Calculator" },
  ],
  pt: [
    { href: "/pt/tools/calculadora-tmb", label: "Calculadora de TMB" },
    { href: "/pt/tools/calculadora-calorias", label: "Calculadora de Calorias" },
    { href: "/pt/tools/calculadora-ingestao-agua", label: "Calculadora de Água" },
    { href: "/pt/tools/calculadora-gordura-corporal", label: "Calculadora de Gordura Corporal" },
  ],
};

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
    const weightValue = Number(weight);

    if (!weightValue) {
      return null;
    }

    const input = usesImperial
      ? {
          system: "imperial" as const,
          weightLb: weightValue,
          heightFt: Number(heightFt),
          heightIn: Number(heightIn),
        }
      : {
          system: "metric" as const,
          weightKg: weightValue,
          heightCm: Number(heightCm),
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

  return (
    <ToolBox>
      <ToolSection
        title={getText(toolUi.heading, lang)}
        description={getText(toolUi.helper, lang)}
      >
        <div className="space-y-6">
          <div className="grid gap-3 md:grid-cols-2">
            <ToolInput
              type="number"
              value={weight}
              onChange={(event) => setWeight(event.target.value)}
              placeholder={getText(toolUi.weight, lang)}
            />

            {usesImperial ? (
              <div className="grid grid-cols-2 gap-3">
                <ToolInput
                  type="number"
                  value={heightFt}
                  onChange={(event) => setHeightFt(event.target.value)}
                  placeholder={getText(toolUi.heightFeet, lang)}
                />

                <ToolInput
                  type="number"
                  value={heightIn}
                  onChange={(event) => setHeightIn(event.target.value)}
                  placeholder={getText(toolUi.heightInches, lang)}
                />
              </div>
            ) : (
              <ToolInput
                type="number"
                value={heightCm}
                onChange={(event) => setHeightCm(event.target.value)}
                placeholder={getText(toolUi.height, lang)}
              />
            )}
          </div>

          <ToolResult
            value={
              result
                ? `${formatDecimal(result.bmi, lang)} (${categoryLabels[result.category.id]})`
                : ""
            }
            placeholder="0"
          />

          {result && (
            <div className="space-y-5 rounded-3xl border border-zinc-200 bg-gradient-to-br from-white to-zinc-50 p-4 shadow-sm md:p-6">
              <div className="space-y-3">
                <div className="relative pt-7">
                  <div
                    className="absolute top-0 -translate-x-1/2 text-center"
                    style={{ left: `${result.markerPosition}%` }}
                  >
                    <div className="rounded-full bg-zinc-950 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
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
                <div>
                  <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-zinc-400">
                    {getText(toolUi.healthyMinLabel, lang)}
                  </p>

                  <ToolResult value={formatWeight(result.healthyRange.minKg)} />
                </div>

                <div>
                  <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-zinc-400">
                    {getText(toolUi.healthyMaxLabel, lang)}
                  </p>

                  <ToolResult value={formatWeight(result.healthyRange.maxKg)} />
                </div>

                <div>
                  <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-zinc-400">
                    {getText(toolUi.targetWeightLabel, lang)}
                  </p>

                  <ToolResult value={formatWeight(result.healthyRange.targetKg)} />
                </div>

                <div>
                  <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-zinc-400">
                    {getText(toolUi.weightDeltaLabel, lang)}
                  </p>

                  <ToolResult value={formatWeight(result.delta.kg)} />
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                <p className="text-sm font-bold text-zinc-950">
                  {getText(toolUi.relatedTitle, lang)}
                </p>

                <div className="mt-3 grid gap-2 md:grid-cols-2">
                  {relatedToolLinks[lang].map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className="rounded-xl border border-zinc-200 px-3 py-2 text-sm font-semibold text-zinc-700 transition hover:border-zinc-950 hover:text-zinc-950"
                    >
                      {tool.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </ToolSection>
    </ToolBox>
  );
}
