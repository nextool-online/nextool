"use client";

import { useMemo, useState } from "react";

import ToolBox from "../../components/ui/ToolBox";
import { dictionary } from "../../data/dictionary";
import { getText } from "../../data/i18n";

import { percentageCalculatorContent } from "./content";

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
      <div className="mb-5">
        <h2 className="text-xl font-bold md:text-2xl">
          {getText(ui.heading, lang)}
        </h2>

        <p className="mt-2 text-sm text-zinc-600">
          {getText(ui.helper, lang)}
        </p>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 md:gap-4">
        <input
          type="number"
          value={percentage}
          onChange={(e) => setPercentage(e.target.value)}
          placeholder={getText(ui.percentage, lang)}
          className="min-w-0 rounded-xl border border-zinc-300 bg-white p-3 text-center text-base font-semibold outline-none transition focus:border-zinc-900 md:p-4 md:text-lg"
        />

        <span className="text-sm font-bold text-zinc-400">%</span>

        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={getText(ui.value, lang)}
          className="min-w-0 rounded-xl border border-zinc-300 bg-white p-3 text-center text-base font-semibold outline-none transition focus:border-zinc-900 md:p-4 md:text-lg"
        />
      </div>

      <div className="mt-4 flex items-center overflow-hidden rounded-xl border border-zinc-300 bg-zinc-100">
        <div className="min-w-0 flex-1 truncate p-3 text-center text-base font-bold md:p-4 md:text-lg">
          {result || (
            <span className="text-zinc-400">
              {getText(dictionary.resultLabel, lang)}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={copyResult}
          disabled={!result}
          aria-label={getText(dictionary.copyResult, lang)}
          className="border-l border-zinc-300 px-3 py-3 text-sm font-semibold text-zinc-600 transition hover:bg-zinc-200 disabled:opacity-40 md:px-4 md:py-4"
        >
          {copied ? "✓" : "⧉"}
        </button>
      </div>
    </ToolBox>
  );
}