"use client";

import { useMemo, useState } from "react";

import ToolBox from "../../components/ui/ToolBox";
import ToolInput from "../../components/toolkit/ToolInput";
import ToolResult from "../../components/toolkit/ToolResult";
import ToolSection from "../../components/toolkit/ToolSection";

import { getText } from "../../data/i18n";

import { unitConverterContent } from "./content";

import type { ToolComponentProps } from "../types";

const conversionGroups = {
  length: {
    mm: 0.001,
    cm: 0.01,
    m: 1,
    km: 1000,
    in: 0.0254,
    ft: 0.3048,
    yd: 0.9144,
    mi: 1609.344,
  },

  weight: {
    mg: 0.000001,
    g: 0.001,
    kg: 1,
    oz: 0.0283495231,
    lb: 0.45359237,
  },
};

type ConversionType = keyof typeof conversionGroups;

export default function UnitConverterTool({ lang }: ToolComponentProps) {
  const ui = unitConverterContent.ui;

  const [value, setValue] = useState("");
  const [conversionType, setConversionType] =
    useState<ConversionType>("length");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("cm");

  const units = Object.keys(conversionGroups[conversionType]);

  const result = useMemo(() => {
    const numericValue = Number(value);

    if (!numericValue && value !== "0") {
      return "";
    }

    const group = conversionGroups[conversionType];

    const fromFactor = group[fromUnit as keyof typeof group];
    const toFactor = group[toUnit as keyof typeof group];

    if (!fromFactor || !toFactor) {
      return "";
    }

    const baseValue = numericValue * fromFactor;
    const convertedValue = baseValue / toFactor;

    return Number.isInteger(convertedValue)
      ? convertedValue.toString()
      : convertedValue.toFixed(6).replace(/\.?0+$/, "");
  }, [value, conversionType, fromUnit, toUnit]);

  function handleTypeChange(nextType: ConversionType) {
    setConversionType(nextType);

    if (nextType === "length") {
      setFromUnit("m");
      setToUnit("cm");
    }

    if (nextType === "weight") {
      setFromUnit("kg");
      setToUnit("g");
    }
  }

  return (
    <ToolBox>
      <ToolSection
        title={getText(ui.heading, lang)}
        description={getText(ui.helper, lang)}
      >
        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-700">
              {getText(ui.type, lang)}
            </label>

            <select
              value={conversionType}
              onChange={(event) =>
                handleTypeChange(event.target.value as ConversionType)
              }
              className="w-full rounded-xl border border-zinc-300 bg-white p-3 text-base font-semibold outline-none transition focus:border-zinc-900 md:p-4"
            >
              <option value="length">{getText(ui.length, lang)}</option>
              <option value="weight">{getText(ui.weight, lang)}</option>
            </select>
          </div>

          <ToolInput
            type="number"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder={getText(ui.value, lang)}
          />

          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-700">
                {getText(ui.from, lang)}
              </label>

              <select
                value={fromUnit}
                onChange={(event) => setFromUnit(event.target.value)}
                className="w-full rounded-xl border border-zinc-300 bg-white p-3 text-base font-semibold outline-none transition focus:border-zinc-900 md:p-4"
              >
                {units.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-700">
                {getText(ui.to, lang)}
              </label>

              <select
                value={toUnit}
                onChange={(event) => setToUnit(event.target.value)}
                className="w-full rounded-xl border border-zinc-300 bg-white p-3 text-base font-semibold outline-none transition focus:border-zinc-900 md:p-4"
              >
                {units.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-zinc-400">
              {getText(ui.result, lang)}
            </p>

            <ToolResult
              value={result ? `${result} ${toUnit}` : ""}
              placeholder="0"
            />
          </div>
        </div>
      </ToolSection>
    </ToolBox>
  );
}