"use client";

import { useMemo, useState } from "react";

import ToolBox from "../../components/ui/ToolBox";
import ToolInput from "../../components/toolkit/ToolInput";
import ToolResult from "../../components/toolkit/ToolResult";
import ToolSection from "../../components/toolkit/ToolSection";

import { getText } from "../../data/i18n";

import type { ToolComponentProps } from "../types";

export default function RetirementCalculatorTool({
  lang,
  ui,
}: ToolComponentProps) {
  const toolUi = ui!;

  const [currentAge, setCurrentAge] = useState("");
  const [retirementAge, setRetirementAge] = useState("");
  const [currentSavings, setCurrentSavings] = useState("");
  const [monthlyContribution, setMonthlyContribution] =
    useState("");
  const [annualReturn, setAnnualReturn] =
    useState("");

  const result = useMemo(() => {
    const ageNow = Number(currentAge);
    const ageRetire = Number(retirementAge);
    const savings = Number(currentSavings);
    const contribution = Number(monthlyContribution);
    const rate = Number(annualReturn);

    if (
      !currentAge ||
      !retirementAge ||
      !currentSavings ||
      !monthlyContribution ||
      !annualReturn ||
      ageRetire <= ageNow
    ) {
      return {
        yearsUntilRetirement: "",
        totalContributions: "",
        projectedSavings: "",
      };
    }

    const years =
      ageRetire - ageNow;

    const monthlyRate =
      rate / 100 / 12;

    const months =
      years * 12;

    let balance = savings;

    for (let i = 0; i < months; i += 1) {
      balance =
        balance * (1 + monthlyRate);

      balance += contribution;
    }

    const totalContributions =
      savings +
      contribution * months;

    return {
      yearsUntilRetirement:
        years.toString(),

      totalContributions:
        totalContributions.toFixed(2),

      projectedSavings:
        balance.toFixed(2),
    };
  }, [
    currentAge,
    retirementAge,
    currentSavings,
    monthlyContribution,
    annualReturn,
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
            value={currentAge}
            onChange={(event) =>
              setCurrentAge(
                event.target.value
              )
            }
            placeholder={getText(
              toolUi.currentAge,
              lang
            )}
          />

          <ToolInput
            type="number"
            value={retirementAge}
            onChange={(event) =>
              setRetirementAge(
                event.target.value
              )
            }
            placeholder={getText(
              toolUi.retirementAge,
              lang
            )}
          />

          <ToolInput
            type="number"
            value={currentSavings}
            onChange={(event) =>
              setCurrentSavings(
                event.target.value
              )
            }
            placeholder={getText(
              toolUi.currentSavings,
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
              toolUi.monthlyContribution,
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
              toolUi.annualReturn,
              lang
            )}
          />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div>
            <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-zinc-400">
              {getText(
                toolUi.yearsUntilRetirement,
                lang
              )}
            </p>

            <ToolResult
              value={result.yearsUntilRetirement}
              placeholder="0"
            />
          </div>

          <div>
            <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-zinc-400">
              {getText(
                toolUi.totalContributions,
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
                toolUi.projectedSavings,
                lang
              )}
            </p>

            <ToolResult
              value={result.projectedSavings}
              placeholder="0.00"
            />
          </div>
        </div>
      </ToolSection>
    </ToolBox>
  );
}