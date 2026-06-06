"use client";

import { useMemo, useState } from "react";

import ToolBox from "../../components/ui/ToolBox";
import ToolInput from "../../components/toolkit/ToolInput";
import ToolResult from "../../components/toolkit/ToolResult";
import ToolSection from "../../components/toolkit/ToolSection";

import { getText } from "../../data/i18n";

import { breakEvenCalculatorContent } from "./content.en";

import type { ToolComponentProps } from "../types";

export default function BreakEvenCalculatorTool({
  lang,
}: ToolComponentProps) {
  const ui = breakEvenCalculatorContent.ui;

  const [fixedCosts, setFixedCosts] = useState("");
  const [pricePerUnit, setPricePerUnit] = useState("");
  const [costPerUnit, setCostPerUnit] = useState("");

  const result = useMemo(() => {
    const fixed = Number(fixedCosts);
    const price = Number(pricePerUnit);
    const cost = Number(costPerUnit);

    if (
      !fixedCosts ||
      !pricePerUnit ||
      !costPerUnit ||
      price <= cost
    ) {
      return {
        breakEvenUnits: "",
        revenueNeeded: "",
        profitPerUnit: "",
      };
    }

    const profitPerUnit = price - cost;

    const breakEvenUnits =
      fixed / profitPerUnit;

    const revenueNeeded =
      breakEvenUnits * price;

    return {
      breakEvenUnits:
        breakEvenUnits.toFixed(2),

      revenueNeeded:
        revenueNeeded.toFixed(2),

      profitPerUnit:
        profitPerUnit.toFixed(2),
    };
  }, [
    fixedCosts,
    pricePerUnit,
    costPerUnit,
  ]);

  return (
    <ToolBox>
      <ToolSection
        title={getText(ui.heading, lang)}
        description={getText(ui.helper, lang)}
      >
        <div className="grid gap-4 md:grid-cols-3">
          <ToolInput
            type="number"
            value={fixedCosts}
            onChange={(event) =>
              setFixedCosts(event.target.value)
            }
            placeholder={getText(
              ui.fixedCosts,
              lang
            )}
          />

          <ToolInput
            type="number"
            value={pricePerUnit}
            onChange={(event) =>
              setPricePerUnit(event.target.value)
            }
            placeholder={getText(
              ui.pricePerUnit,
              lang
            )}
          />

          <ToolInput
            type="number"
            value={costPerUnit}
            onChange={(event) =>
              setCostPerUnit(event.target.value)
            }
            placeholder={getText(
              ui.costPerUnit,
              lang
            )}
          />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div>
            <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-zinc-400">
              {getText(ui.breakEvenUnits, lang)}
            </p>

            <ToolResult
              value={result.breakEvenUnits}
              placeholder="0.00"
            />
          </div>

          <div>
            <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-zinc-400">
              {getText(ui.revenueNeeded, lang)}
            </p>

            <ToolResult
              value={result.revenueNeeded}
              placeholder="0.00"
            />
          </div>

          <div>
            <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-zinc-400">
              {getText(ui.profitPerUnit, lang)}
            </p>

            <ToolResult
              value={result.profitPerUnit}
              placeholder="0.00"
            />
          </div>
        </div>
      </ToolSection>
    </ToolBox>
  );
}