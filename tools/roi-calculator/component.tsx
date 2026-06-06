"use client";

import { useMemo, useState } from "react";

import ToolBox from "../../components/ui/ToolBox";
import ToolInput from "../../components/toolkit/ToolInput";
import ToolResult from "../../components/toolkit/ToolResult";
import ToolSection from "../../components/toolkit/ToolSection";

import { getText } from "../../data/i18n";

import { roiCalculatorContent } from "./content.en";

import type { ToolComponentProps } from "../types";

export default function RoiCalculatorTool({
  lang,
}: ToolComponentProps) {
  const ui = roiCalculatorContent.ui;

  const [investmentCost, setInvestmentCost] = useState("");
  const [netProfit, setNetProfit] = useState("");

  const result = useMemo(() => {
    const cost = Number(investmentCost);
    const profit = Number(netProfit);

    if (!investmentCost || !netProfit || cost === 0) {
      return {
        roi: "",
        totalReturn: "",
      };
    }

    const roi = (profit / cost) * 100;
    const totalReturn = cost + profit;

    return {
      roi: roi.toFixed(2),
      totalReturn: totalReturn.toFixed(2),
    };
  }, [investmentCost, netProfit]);

  return (
    <ToolBox>
      <ToolSection
        title={getText(ui.heading, lang)}
        description={getText(ui.helper, lang)}
      >
        <div className="space-y-5">
          <ToolInput
            type="number"
            value={investmentCost}
            onChange={(event) =>
              setInvestmentCost(event.target.value)
            }
            placeholder={getText(
              ui.investmentCost,
              lang
            )}
          />

          <ToolInput
            type="number"
            value={netProfit}
            onChange={(event) =>
              setNetProfit(event.target.value)
            }
            placeholder={getText(
              ui.netProfit,
              lang
            )}
          />

          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-zinc-400">
                {getText(ui.roi, lang)}
              </p>

              <ToolResult
                value={result.roi}
                placeholder="0.00%"
              />
            </div>

            <div>
              <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-zinc-400">
                {getText(ui.totalReturn, lang)}
              </p>

              <ToolResult
                value={result.totalReturn}
                placeholder="0.00"
              />
            </div>
          </div>
        </div>
      </ToolSection>
    </ToolBox>
  );
}