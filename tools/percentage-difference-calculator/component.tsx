"use client";

import { useMemo, useState } from "react";

import ToolBox from "../../components/ui/ToolBox";
import ToolInput from "../../components/toolkit/ToolInput";
import ToolResult from "../../components/toolkit/ToolResult";
import ToolSection from "../../components/toolkit/ToolSection";

import { getText } from "../../data/i18n";

import { percentageDifferenceCalculatorContent } from "./content.en";

import type { ToolComponentProps } from "../types";

export default function PercentageDifferenceCalculatorTool({
  lang,
}: ToolComponentProps) {
  const ui = percentageDifferenceCalculatorContent.ui;

  const [valueA, setValueA] = useState("");
  const [valueB, setValueB] = useState("");

  const result = useMemo(() => {
    const a = Number(valueA);
    const b = Number(valueB);

    if (!valueA || !valueB) {
      return {
        percentageDifference: "",
        absoluteDifference: "",
        averageValue: "",
      };
    }

    const absoluteDifference = Math.abs(a - b);
    const averageValue = (a + b) / 2;

    if (averageValue === 0) {
      return {
        percentageDifference: "0.00",
        absoluteDifference: absoluteDifference.toFixed(2),
        averageValue: averageValue.toFixed(2),
      };
    }

    const percentageDifference =
      (absoluteDifference / averageValue) * 100;

    return {
      percentageDifference:
        percentageDifference.toFixed(2),
      absoluteDifference:
        absoluteDifference.toFixed(2),
      averageValue:
        averageValue.toFixed(2),
    };
  }, [valueA, valueB]);

  return (
    <ToolBox>
      <ToolSection
        title={getText(ui.heading, lang)}
        description={getText(ui.helper, lang)}
      >
        <div className="space-y-5">
          <ToolInput
            type="number"
            value={valueA}
            onChange={(event) =>
              setValueA(event.target.value)
            }
            placeholder={getText(ui.valueA, lang)}
          />

          <ToolInput
            type="number"
            value={valueB}
            onChange={(event) =>
              setValueB(event.target.value)
            }
            placeholder={getText(ui.valueB, lang)}
          />

          <div className="grid gap-3 md:grid-cols-3">
            <div>
              <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-zinc-400">
                {getText(ui.percentageDifference, lang)}
              </p>

              <ToolResult
                value={result.percentageDifference}
                placeholder="0.00%"
              />
            </div>

            <div>
              <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-zinc-400">
                {getText(ui.absoluteDifference, lang)}
              </p>

              <ToolResult
                value={result.absoluteDifference}
                placeholder="0.00"
              />
            </div>

            <div>
              <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-zinc-400">
                {getText(ui.averageValue, lang)}
              </p>

              <ToolResult
                value={result.averageValue}
                placeholder="0.00"
              />
            </div>
          </div>
        </div>
      </ToolSection>
    </ToolBox>
  );
}