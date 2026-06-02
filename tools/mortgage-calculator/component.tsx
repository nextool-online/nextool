"use client";

import { useMemo, useState } from "react";

import ToolBox from "../../components/ui/ToolBox";
import ToolInput from "../../components/toolkit/ToolInput";
import ToolResult from "../../components/toolkit/ToolResult";
import ToolSection from "../../components/toolkit/ToolSection";

import { getText } from "../../data/i18n";

import { mortgageCalculatorContent } from "./content";

import type { ToolComponentProps } from "../types";

export default function MortgageCalculatorTool({
  lang,
}: ToolComponentProps) {
  const ui = mortgageCalculatorContent.ui;

  const [homePrice, setHomePrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [years, setYears] = useState("");

  const result = useMemo(() => {
    const propertyPrice = Number(homePrice);
    const deposit = Number(downPayment);
    const annualRate = Number(interestRate);
    const loanYears = Number(years);

    const loanAmount = propertyPrice - deposit;
    const loanMonths = loanYears * 12;

    if (
      !propertyPrice ||
      annualRate <= 0 ||
      loanYears <= 0 ||
      deposit < 0 ||
      deposit >= propertyPrice
    ) {
      return {
        loanAmount: "",
        monthlyPayment: "",
        totalPayment: "",
        totalInterest: "",
      };
    }

    const monthlyRate = annualRate / 100 / 12;

    const monthlyPayment =
      (loanAmount *
        monthlyRate *
        Math.pow(1 + monthlyRate, loanMonths)) /
      (Math.pow(1 + monthlyRate, loanMonths) - 1);

    const totalPayment = monthlyPayment * loanMonths;

    const totalInterest = totalPayment - loanAmount;

    return {
      loanAmount: loanAmount.toFixed(2),
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
    };
  }, [
    homePrice,
    downPayment,
    interestRate,
    years,
  ]);

  return (
    <ToolBox>
      <ToolSection
        title={getText(ui.heading, lang)}
        description={getText(ui.helper, lang)}
      >
        <div className="space-y-5">
          <ToolInput
            type="number"
            value={homePrice}
            onChange={(event) =>
              setHomePrice(event.target.value)
            }
            placeholder={getText(ui.homePrice, lang)}
          />

          <ToolInput
            type="number"
            value={downPayment}
            onChange={(event) =>
              setDownPayment(event.target.value)
            }
            placeholder={getText(ui.downPayment, lang)}
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
            onChange={(event) =>
              setYears(event.target.value)
            }
            placeholder={getText(ui.years, lang)}
          />

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-zinc-400">
                {getText(ui.loanAmount, lang)}
              </p>

              <ToolResult
                value={result.loanAmount}
                placeholder="0.00"
              />
            </div>

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