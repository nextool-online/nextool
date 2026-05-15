"use client";

import { useMemo, useState } from "react";
import ToolBox from "../../ui/ToolBox";
import type { LanguageCode } from "../../../data/languages";

type RuleOfThreeCalculatorProps = {
  lang: LanguageCode;
};

export default function RuleOfThreeCalculator({
  lang: _lang,
}: RuleOfThreeCalculatorProps) {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    const valueA = Number(a);
    const valueB = Number(b);
    const valueC = Number(c);

    if (!valueA || !valueB || !valueC) return "";

    const calculated = (valueB * valueC) / valueA;

    return Number.isInteger(calculated)
      ? calculated.toString()
      : calculated.toFixed(4).replace(/\.?0+$/, "");
  }, [a, b, c]);

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
        <h2 className="text-xl font-bold md:text-2xl">Simple proportion</h2>

        <p className="mt-2 text-sm text-zinc-600">
          Enter A, B and C. X appears automatically.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 md:gap-4">
          <input
            type="number"
            value={a}
            onChange={(e) => setA(e.target.value)}
            placeholder="Value A"
            className="min-w-0 rounded-xl border border-zinc-300 bg-white p-3 text-center text-base font-semibold outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 md:p-4 md:text-lg"
          />

          <span className="text-sm font-bold text-zinc-400">→</span>

          <input
            type="number"
            value={b}
            onChange={(e) => setB(e.target.value)}
            placeholder="Value B"
            className="min-w-0 rounded-xl border border-zinc-300 bg-white p-3 text-center text-base font-semibold outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 md:p-4 md:text-lg"
          />
        </div>

        <div className="text-center text-xs font-semibold uppercase tracking-wide text-zinc-400">
          as
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 md:gap-4">
          <input
            type="number"
            value={c}
            onChange={(e) => setC(e.target.value)}
            placeholder="Value C"
            className="min-w-0 rounded-xl border border-zinc-300 bg-white p-3 text-center text-base font-semibold outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 md:p-4 md:text-lg"
          />

          <span className="text-sm font-bold text-zinc-400">→</span>

          <div className="flex min-w-0 items-center overflow-hidden rounded-xl border border-zinc-300 bg-zinc-100">
            <div className="min-w-0 flex-1 truncate p-3 text-center text-base font-bold md:p-4 md:text-lg">
              {result || <span className="text-zinc-400">X</span>}
            </div>

            <button
              type="button"
              onClick={copyResult}
              disabled={!result}
              aria-label="Copy result"
              className="border-l border-zinc-300 px-3 py-3 text-sm font-semibold text-zinc-600 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-40 md:px-4 md:py-4"
            >
              {copied ? "✓" : "⧉"}
            </button>
          </div>
        </div>
      </div>
    </ToolBox>
  );
}