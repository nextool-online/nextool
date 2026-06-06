"use client";

import { useMemo, useState } from "react";

import ToolBox from "../../components/ui/ToolBox";
import ToolInput from "../../components/toolkit/ToolInput";
import ToolResult from "../../components/toolkit/ToolResult";
import ToolSection from "../../components/toolkit/ToolSection";

import { getText } from "../../data/i18n";

import { loanCalculatorContent } from "./content.en";

import type { ToolComponentProps } from "../types";

export default function LoanCalculatorTool({
  lang,
}: ToolComponentProps) {
  const ui = loanCalculatorContent.ui;

  const [amount, setAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [months, setMonths] = useState("");

  const result = useMemo(() => {
    const principal = Number(amount);
    const annualRate = Number(interestRate);
    const loanMonths = Number(months);

    if (
      !principal ||
      !annualRate ||
      !loanMonths
    ) {
      return {
        monthlyPayment: "",
        totalPayment: "",
        totalInterest: "",
      };
    }

    const monthlyRate = annualRate / 100 / 12;

    const monthlyPayment =
      (principal *
        monthlyRate *
        Math.pow(1 + monthlyRate, loanMonths)) /
      (Math.pow(1 + monthlyRate, loanMonths) - 1);

    const totalPayment =
      monthlyPayment * loanMonths;

    const totalInterest =
      totalPayment - principal;

    return {
      monthlyPayment:
        monthlyPayment.toFixed(2),

      totalPayment:
        totalPayment.toFixed(2),

      totalInterest:
        totalInterest.toFixed(2),
    };
  }, [amount, interestRate, months]);

  return (
    <ToolBox>
      <ToolSection
        title={getText(ui.heading, lang)}
        description={getText(ui.helper, lang)}
      >
        <div className="space-y-5">
          <ToolInput
            type="number"
            value={amount}
            onChange={(event) =>
              setAmount(event.target.value)
            }
            placeholder={getText(ui.amount, lang)}
          />

          <ToolInput
            type="number"
            value={interestRate}
            onChange={(event) =>
              setInterestRate(event.target.value)
            }
            placeholder={getText(
              ui.interestRate,
              lang
            )}
          />

          <ToolInput
            type="number"
            value={months}
            onChange={(event) =>
              setMonths(event.target.value)
            }
            placeholder={getText(ui.months, lang)}
          />

          <div className="grid gap-3 md:grid-cols-3">
            <div>
              <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-zinc-400">
                {getText(ui.monthlyPayment, lang)}
              </p>

              <ToolResult
                value={result.monthlyPayment}
                placeholder="0.00"
              />
            </div>

            <div>
              <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-zinc-400">
                {getText(ui.totalPayment, lang)}
              </p>

              <ToolResult
                value={result.totalPayment}
                placeholder="0.00"
              />
            </div>

            <div>
              <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-zinc-400">
                {getText(ui.totalInterest, lang)}
              </p>

              <ToolResult
                value={result.totalInterest}
                placeholder="0.00"
              />
            </div>
          </div>
        </div>
      </ToolSection>
    </ToolBox>
  );
}