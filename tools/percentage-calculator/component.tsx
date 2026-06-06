"use client";

import { useMemo, useState } from "react";

import ToolBox from "../../components/ui/ToolBox";
import ToolInput from "../../components/toolkit/ToolInput";
import ToolResult from "../../components/toolkit/ToolResult";
import ToolSection from "../../components/toolkit/ToolSection";

import { dictionary } from "../../data/dictionary";
import { getText } from "../../data/i18n";

import { percentageCalculatorContent } from "./content.en";

import type { ToolComponentProps } from "../types";

export default function PercentageCalculator({ lang }: ToolComponentProps) {
  const [percentage, setPercentage] = useState("");
  const [value, setValue] = useState("");
  const [copied, setCopied] = useState(false);

  const ui = percentageCalculatorContent.ui;

  const result = useMemo(() => {
    const p = Number(percentage);
    const v = Number(value);

    if (!p || !v) return "";

    const calculated = (p / 100) * v;

    return Number.isInteger(calculated)
      ? calculated.toString()
      : calculated.toFixed(4).replace(/\.?0+$/, "");
  }, [percentage, value]);

  async function copyResult() {
    if (!result) return;

    await navigator.clipboard.writeText(result);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  }

  return (
    <ToolBox>
      <ToolSection
        title={getText(ui.heading, lang)}
        description={getText(ui.helper, lang)}
      >
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 md:gap-4">
          <ToolInput
            type="number"
            value={percentage}
            onChange={(event) => setPercentage(event.target.value)}
            placeholder={getText(ui.percentage, lang)}
          />

          <span className="text-sm font-bold text-zinc-400">%</span>

          <ToolInput
            type="number"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder={getText(ui.value, lang)}
          />
        </div>

        <div className="mt-4">
          <ToolResult
            value={result}
            placeholder={getText(dictionary.resultLabel, lang)}
            onCopy={copyResult}
            copied={copied}
            copyLabel={getText(dictionary.copyResult, lang)}
          />
        </div>
      </ToolSection>
    </ToolBox>
  );
}