"use client";

import { useMemo, useState } from "react";

import ToolBox from "../../components/ui/ToolBox";
import ToolInput from "../../components/toolkit/ToolInput";
import ToolResult from "../../components/toolkit/ToolResult";
import ToolSection from "../../components/toolkit/ToolSection";

import { getText } from "../../data/i18n";

import type { ToolComponentProps } from "../types";

export default function InflationCalculatorTool({
  lang,
  ui,
}: ToolComponentProps) {
  const toolUi = ui!;

  const [amount, setAmount] = useState("");
  const [inflationRate, setInflationRate] = useState("");
  const [years, setYears] = useState("");

  const result = useMemo(() => {
    const currentAmount = Number(amount);
    const rate = Number(inflationRate);
    const period = Number(years);

    if (!amount || !inflationRate || !years) {
      return {
        futureValue: "",
        inflationImpact: "",
      };
    }

    const futureValue =
      currentAmount *
      Math.pow(1 + rate / 100, period);

    const inflationImpact =
      futureValue - currentAmount;

    return {
      futureValue: futureValue.toFixed(2),
      inflationImpact: inflationImpact.toFixed(2),
    };
  }, [amount, inflationRate, years]);

  return (
    <ToolBox>
      <ToolSection
        title={getText(toolUi.heading, lang)}
        description={getText(toolUi.helper, lang)}
      >
        <div className="space-y-5">
          <ToolInput
            type="number"
            value={amount}
            onChange={(event) =>
              setAmount(event.target.value)
            }
            placeholder={getText(
              toolUi.amount,
              lang
            )}
          />

          <ToolInput
            type="number"
            value={inflationRate}
            onChange={(event) =>
              setInflationRate(event.target.value)
            }
            placeholder={getText(
              toolUi.inflationRate,
              lang
            )}
          />

          <ToolInput
            type="number"
            value={years}
            onChange={(event) =>
              setYears(event.target.value)
            }
            placeholder={getText(
              toolUi.years,
              lang
            )}
          />

          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-zinc-400">
                {getText(
                  toolUi.futureValue,
                  lang
                )}
              </p>

              <ToolResult
                value={result.futureValue}
                placeholder="0.00"
              />
            </div>

            <div>
              <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-zinc-400">
                {getText(
                  toolUi.inflationImpact,
                  lang
                )}
              </p>

              <ToolResult
                value={result.inflationImpact}
                placeholder="0.00"
              />
            </div>
          </div>
        </div>
      </ToolSection>
    </ToolBox>
  );
}