"use client";

import { useMemo, useState } from "react";

import ToolBox from "../../components/ui/ToolBox";
import ToolInput from "../../components/toolkit/ToolInput";
import ToolResult from "../../components/toolkit/ToolResult";
import ToolSection from "../../components/toolkit/ToolSection";

import { getText } from "../../data/i18n";

import { percentageIncreaseCalculatorContent } from "./content.en";

import type { ToolComponentProps } from "../types";

export default function PercentageIncreaseCalculatorTool({
  lang,
}: ToolComponentProps) {
  const ui = percentageIncreaseCalculatorContent.ui;

  const [initialValue, setInitialValue] = useState("");
  const [finalValue, setFinalValue] = useState("");

  const result = useMemo(() => {
    const initial = Number(initialValue);
    const final = Number(finalValue);

    if (!initial || !final) {
      return "";
    }

    const increase = ((final - initial) / initial) * 100;

    return `${increase.toFixed(2)}%`;
  }, [initialValue, finalValue]);

  return (
    <ToolBox>
      <ToolSection
        title={getText(ui.heading, lang)}
        description={getText(ui.helper, lang)}
      >
        <div className="space-y-5">
          <div className="grid gap-3 md:grid-cols-2">
            <ToolInput
              type="number"
              value={initialValue}
              onChange={(event) =>
                setInitialValue(event.target.value)
              }
              placeholder={getText(ui.initialValue, lang)}
            />

            <ToolInput
              type="number"
              value={finalValue}
              onChange={(event) =>
                setFinalValue(event.target.value)
              }
              placeholder={getText(ui.finalValue, lang)}
            />
          </div>

          <div>
            <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-zinc-400">
              {getText(ui.increase, lang)}
            </p>

            <ToolResult value={result} placeholder="0%" />
          </div>
        </div>
      </ToolSection>
    </ToolBox>
  );
}