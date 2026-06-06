"use client";

import { useMemo, useState } from "react";

import ToolBox from "../../components/ui/ToolBox";
import ToolInput from "../../components/toolkit/ToolInput";
import ToolResult from "../../components/toolkit/ToolResult";
import ToolSection from "../../components/toolkit/ToolSection";

import { getText } from "../../data/i18n";

import { tipCalculatorContent } from "./content.en";

import type { ToolComponentProps } from "../types";

export default function TipCalculatorTool({
  lang,
}: ToolComponentProps) {
  const ui = tipCalculatorContent.ui;

  const [billAmount, setBillAmount] = useState("");
  const [tipPercentage, setTipPercentage] = useState("15");

  const result = useMemo(() => {
    const bill = Number(billAmount);
    const tip = Number(tipPercentage);

    if (!bill || tip < 0) {
      return {
        tipAmount: "",
        totalAmount: "",
      };
    }

    const tipAmount = (bill * tip) / 100;
    const totalAmount = bill + tipAmount;

    return {
      tipAmount: tipAmount.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
    };
  }, [billAmount, tipPercentage]);

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
              value={billAmount}
              onChange={(event) =>
                setBillAmount(event.target.value)
              }
              placeholder={getText(ui.billAmount, lang)}
            />

            <ToolInput
              type="number"
              value={tipPercentage}
              onChange={(event) =>
                setTipPercentage(event.target.value)
              }
              placeholder={getText(ui.tipPercentage, lang)}
            />
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-zinc-400">
                {getText(ui.tipAmount, lang)}
              </p>

              <ToolResult
                value={result.tipAmount}
                placeholder="0.00"
              />
            </div>

            <div>
              <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-zinc-400">
                {getText(ui.totalAmount, lang)}
              </p>

              <ToolResult
                value={result.totalAmount}
                placeholder="0.00"
              />
            </div>
          </div>
        </div>
      </ToolSection>
    </ToolBox>
  );
}