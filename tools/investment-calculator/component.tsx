"use client";

import { useMemo, useState } from "react";

import ToolBox from "../../components/ui/ToolBox";
import ToolInput from "../../components/toolkit/ToolInput";
import ToolResult from "../../components/toolkit/ToolResult";
import ToolSection from "../../components/toolkit/ToolSection";

import { getText } from "../../data/i18n";

import { investmentCalculatorContent } from "./content.en";

import type { ToolComponentProps } from "../types";

export default function InvestmentCalculatorTool({
  lang,
}: ToolComponentProps) {
  const ui = investmentCalculatorContent.ui;

  const [initialInvestment, setInitialInvestment] =
    useState("");

  const [monthlyContribution, setMonthlyContribution] =
    useState("");

  const [annualReturn, setAnnualReturn] =
    useState("");

  const [years, setYears] = useState("");

  const result = useMemo(() => {
    const principal =
      Number(initialInvestment);

    const contribution =
      Number(monthlyContribution);

    const rate =
      Number(annualReturn);

    const yearsValue =
      Number(years);

    if (
      !initialInvestment ||
      !monthlyContribution ||
      !annualReturn ||
      !years
    ) {
      return {
        futureValue: "",
        totalContributions: "",
        investmentGain: "",
      };
    }

    const monthlyRate =
      rate / 100 / 12;

    const months =
      yearsValue * 12;

    let balance = principal;

    for (let i = 0; i < months; i += 1) {
      balance =
        balance * (1 + monthlyRate);

      balance += contribution;
    }

    const totalContributions =
      principal +
      contribution * months;

    const investmentGain =
      balance -
      totalContributions;

    return {
      futureValue:
        balance.toFixed(2),

      totalContributions:
        totalContributions.toFixed(2),

      investmentGain:
        investmentGain.toFixed(2),
    };
  }, [
    initialInvestment,
    monthlyContribution,
    annualReturn,
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
              setInitialInvestment(
                event.target.value
              )
            }
            placeholder={getText(
              ui.initialInvestment,
              lang
            )}
          />

          <ToolInput
            type="number"
            value={monthlyContribution}
            onChange={(event) =>
              setMonthlyContribution(
                event.target.value
              )
            }
            placeholder={getText(
              ui.monthlyContribution,
              lang
            )}
          />

          <ToolInput
            type="number"
            value={annualReturn}
            onChange={(event) =>
              setAnnualReturn(
                event.target.value
              )
            }
            placeholder={getText(
              ui.annualReturn,
              lang
            )}
          />

          <ToolInput
            type="number"
            value={years}
            onChange={(event) =>
              setYears(
                event.target.value
              )
            }
            placeholder={getText(
              ui.years,
              lang
            )}
          />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div>
            <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-zinc-400">
              {getText(ui.futureValue, lang)}
            </p>

            <ToolResult
              value={result.futureValue}
              placeholder="0.00"
            />
          </div>

          <div>
            <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-zinc-400">
              {getText(
                ui.totalContributions,
                lang
              )}
            </p>

            <ToolResult
              value={result.totalContributions}
              placeholder="0.00"
            />
          </div>

          <div>
            <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-zinc-400">
              {getText(
                ui.investmentGain,
                lang
              )}
            </p>

            <ToolResult
              value={result.investmentGain}
              placeholder="0.00"
            />
          </div>
        </div>
      </ToolSection>
    </ToolBox>
  );
}