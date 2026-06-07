"use client";

import { useMemo, useState } from "react";

import ToolBox from "../../components/ui/ToolBox";
import ToolInput from "../../components/toolkit/ToolInput";
import ToolResult from "../../components/toolkit/ToolResult";
import ToolSection from "../../components/toolkit/ToolSection";

import { getText } from "../../data/i18n";

import type { ToolComponentProps } from "../types";

export default function AverageCalculatorTool({
  lang,
  ui,
}: ToolComponentProps) {
  const toolUi = ui!;

  const [values, setValues] = useState("");

  const result = useMemo(() => {
    const numbers = values
      .split(",")
      .map((item) => Number(item.trim()))
      .filter((item) => !Number.isNaN(item));

    if (numbers.length === 0) {
      return {
        average: "",
        count: "",
        sum: "",
      };
    }

    const sum = numbers.reduce(
      (total, current) => total + current,
      0
    );

    const average = sum / numbers.length;

    return {
      average: average.toFixed(2),
      count: numbers.length.toString(),
      sum: sum.toFixed(2),
    };
  }, [values]);

  return (
    <ToolBox>
      <ToolSection
        title={getText(toolUi.heading, lang)}
        description={getText(toolUi.helper, lang)}
      >
        <div className="space-y-5">
          <ToolInput
            value={values}
            onChange={(event) =>
              setValues(event.target.value)
            }
            placeholder="10, 20, 30, 40"
          />

          <div className="grid gap-3 md:grid-cols-3">
            <div>
              <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-zinc-400">
                {getText(toolUi.average, lang)}
              </p>

              <ToolResult
                value={result.average}
                placeholder="0"
              />
            </div>

            <div>
              <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-zinc-400">
                {getText(toolUi.count, lang)}
              </p>

              <ToolResult
                value={result.count}
                placeholder="0"
              />
            </div>

            <div>
              <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-zinc-400">
                {getText(toolUi.sum, lang)}
              </p>

              <ToolResult
                value={result.sum}
                placeholder="0"
              />
            </div>
          </div>
        </div>
      </ToolSection>
    </ToolBox>
  );
}