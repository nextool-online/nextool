"use client";

import { useMemo, useState } from "react";

import ToolBox from "../../components/ui/ToolBox";
import ToolSection from "../../components/toolkit/ToolSection";
import ToolInput from "../../components/toolkit/ToolInput";
import ToolResult from "../../components/toolkit/ToolResult";

import { getText } from "../../data/i18n";

import type { ToolComponentProps } from "../types";

function formatMoney(value: number) {
  return value.toFixed(2);
}

export default function SavingsCalculatorTool({
  lang,
  ui,
}: ToolComponentProps) {
  const toolUi = ui!;

  const [initialDeposit, setinitialDeposit] = useState("");
  const [monthlySavings, setmonthlySavings] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [years, setYears] = useState("");

  const results = useMemo(() => {
    const initialDepositValue = Number(initialDeposit);
    const monthlySavingsValue = Number(monthlySavings);
    const interestRateValue = Number(interestRate);
    const yearsValue = Number(years);

    if (
      !initialDeposit ||
      !monthlySavings ||
      !interestRate ||
      !years
    ) {
      return {
        futureValue: "",
        totalDeposited: "",
        interestEarned: "",
      };
    }

    const monthlyRate =
      interestRateValue / 100 / 12;

    const months =
      yearsValue * 12;

    let balance =
      initialDepositValue;

    for (let i = 0; i < months; i += 1) {
      balance =
        balance * (1 + monthlyRate);

      balance += monthlySavingsValue;
    }

    const totalDeposited =
      initialDepositValue +
      monthlySavingsValue * months;

    const interestEarned =
      balance - totalDeposited;

    return {
      futureValue:
        formatMoney(balance),

      totalDeposited:
        formatMoney(totalDeposited),

      interestEarned:
        formatMoney(interestEarned),
    };
  }, [
    initialDeposit,
    monthlySavings,
    interestRate,
    years,
  ]);

  return (
    <ToolBox>
      <ToolSection
        title={getText(
          toolUi.heading,
          lang
        )}
        description={getText(
          toolUi.helper,
          lang
        )}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <ToolInput
            type="number"
            value={initialDeposit}
            onChange={(event) =>
              setinitialDeposit(
                event.target.value
              )
            }
            placeholder={getText(
              toolUi.initialDeposit,
              lang
            )}
          />

          <ToolInput
            type="number"
            value={monthlySavings}
            onChange={(event) =>
              setmonthlySavings(
                event.target.value
              )
            }
            placeholder={getText(
              toolUi.monthlySavings,
              lang
            )}
          />

          <ToolInput
            type="number"
            value={interestRate}
            onChange={(event) =>
              setInterestRate(
                event.target.value
              )
            }
            placeholder={getText(
              toolUi.interestRate,
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
              toolUi.years,
              lang
            )}
          />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div>
            <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-zinc-400">
              {getText(
                toolUi.futureValue,
                lang
              )}
            </p>

            <ToolResult
              value={results.futureValue}
              placeholder="0.00"
            />
          </div>

          <div>
            <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-zinc-400">
              {getText(
                toolUi.totalDeposited,
                lang
              )}
            </p>

            <ToolResult
              value={results.totalDeposited}
              placeholder="0.00"
            />
          </div>

          <div>
            <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-zinc-400">
              {getText(
                toolUi.interestEarned,
                lang
              )}
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