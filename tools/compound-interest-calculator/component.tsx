"use client";

import { useMemo, useState } from "react";

import ToolBox from "../../components/ui/ToolBox";
import ToolSection from "../../components/toolkit/ToolSection";
import ToolInput from "../../components/toolkit/ToolInput";
import ToolResult from "../../components/toolkit/ToolResult";

import { getText } from "../../data/i18n";

import { compoundInterestCalculatorContent } from "./content";

import type { ToolComponentProps } from "../types";

function formatMoney(value: number) {
  return value.toFixed(2);
}

export default function CompoundInterestCalculatorTool({
  lang,
}: ToolComponentProps) {
  const ui = compoundInterestCalculatorContent.ui;

  const [initialInvestment, setInitialInvestment] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [years, setYears] = useState("");

  const results = useMemo(() => {
    const initialInvestmentValue = Number(initialInvestment);
    const monthlyContributionValue = Number(monthlyContribution);
    const interestRateValue = Number(interestRate);
    const yearsValue = Number(years);

    if (
      !initialInvestment ||
      !monthlyContribution ||
      !interestRate ||
      !years
   ) {
      return {
        finalBalance: "",
        contributions: "",
        interestEarned: "",
      };
    }

    const monthlyRate = interestRateValue / 100 / 12;
    const months = yearsValue * 12;

    let balance = initialInvestmentValue;

    for (let i = 0; i < months; i += 1) {
      balance = balance * (1 + monthlyRate);
      balance += monthlyContributionValue;
    }

    const contributions =
      initialInvestmentValue + monthlyContributionValue * months;

    const interestEarned = balance - contributions;

    return {
      finalBalance: formatMoney(balance),
      contributions: formatMoney(contributions),
      interestEarned: formatMoney(interestEarned),
    };
  }, [
    initialInvestment,
    monthlyContribution,
    interestRate,
    years,
  ]);

  return (
    <ToolBox>
      <ToolSection
        title={getText(ui.heading, lang)}
        description={getText(ui.helper, lang)}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <ToolInput
            type="number"
            value={initialInvestment}
            onChange={(event) =>
              setInitialInvestment(event.target.value)
            }
            placeholder={getText(ui.initialInvestment, lang)}
          />

          <ToolInput
            type="number"
            value={monthlyContribution}
            onChange={(event) =>
              setMonthlyContribution(event.target.value)
            }
            placeholder={getText(ui.monthlyContribution, lang)}
          />

          <ToolInput
            type="number"
            value={interestRate}
            onChange={(event) =>
              setInterestRate(event.target.value)
            }
            placeholder={getText(ui.interestRate, lang)}
          />

          <ToolInput
            type="number"
            value={years}
            onChange={(event) => setYears(event.target.value)}
            placeholder={getText(ui.years, lang)}
          />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div>
            <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-zinc-400">
              {getText(ui.finalBalance, lang)}
            </p>

            <ToolResult
              value={results.finalBalance}
              placeholder="0.00"
            />
          </div>

          <div>
            <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-zinc-400">
              {getText(ui.contributions, lang)}
            </p>

            <ToolResult
              value={results.contributions}
              placeholder="0.00"
            />
          </div>

          <div>
            <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-zinc-400">
              {getText(ui.interestEarned, lang)}
            </p>

            <ToolResult
              value={results.interestEarned}
              placeholder="0.00"
            />
          </div>
        </div>
      </ToolSection>
    </ToolBox>
  );
}