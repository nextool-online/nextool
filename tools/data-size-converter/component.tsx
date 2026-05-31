"use client";

import { useMemo, useState } from "react";

import ToolBox from "../../components/ui/ToolBox";
import ToolInput from "../../components/toolkit/ToolInput";
import ToolResult from "../../components/toolkit/ToolResult";
import ToolSection from "../../components/toolkit/ToolSection";

import { getText } from "../../data/i18n";

import { dataSizeConverterContent } from "./content";

import type { ToolComponentProps } from "../types";

const units = {
  B: 1,
  KB: 1024,
  MB: 1024 ** 2,
  GB: 1024 ** 3,
  TB: 1024 ** 4,
  PB: 1024 ** 5,
};

export default function DataSizeConverterTool({
  lang,
}: ToolComponentProps) {
  const ui = dataSizeConverterContent.ui;

  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("MB");
  const [toUnit, setToUnit] = useState("GB");

  const result = useMemo(() => {
    const numericValue = Number(value);

    if (!numericValue && value !== "0") {
      return "";
    }

    const bytes =
      numericValue *
      units[fromUnit as keyof typeof units];

    const converted =
      bytes /
      units[toUnit as keyof typeof units];

    return Number.isInteger(converted)
      ? converted.toString()
      : converted.toFixed(8).replace(/\.?0+$/, "");
  }, [value, fromUnit, toUnit]);

  return (
    <ToolBox>
      <ToolSection
        title={getText(ui.heading, lang)}
        description={getText(ui.helper, lang)}
      >
        <div className="space-y-5">
          <ToolInput
            type="number"
            value={value}
            onChange={(event) =>
              setValue(event.target.value)
            }
            placeholder={getText(ui.value, lang)}
          />

          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-700">
                {getText(ui.from, lang)}
              </label>

              <select
                value={fromUnit}
                onChange={(event) =>
                  setFromUnit(event.target.value)
                }
                className="w-full rounded-xl border border-zinc-300 bg-white p-3 font-semibold"
              >
                {Object.keys(units).map((unit) => (
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
                onChange={(event) =>
                  setToUnit(event.target.value)
                }
                className="w-full rounded-xl border border-zinc-300 bg-white p-3 font-semibold"
              >
                {Object.keys(units).map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <ToolResult
            value={result ? `${result} ${toUnit}` : ""}
            placeholder="0"
          />
        </div>
      </ToolSection>
    </ToolBox>
  );
}