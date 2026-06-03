"use client";

import { useMemo, useState } from "react";

import ToolBox from "../../components/ui/ToolBox";
import ToolInput from "../../components/toolkit/ToolInput";
import ToolResult from "../../components/toolkit/ToolResult";
import ToolSection from "../../components/toolkit/ToolSection";

import { getText } from "../../data/i18n";

import { waterIntakeCalculatorContent } from "./content";

import type { ToolComponentProps } from "../types";

export default function WaterIntakeCalculatorTool({
  lang,
}: ToolComponentProps) {
  const ui = waterIntakeCalculatorContent.ui;

  const [weight, setWeight] = useState("");
  const [activityMinutes, setActivityMinutes] =
    useState("");

  const result = useMemo(() => {
    const weightValue = Number(weight);
    const activityValue =
      Number(activityMinutes);

    if (
      !weight ||
      !activityMinutes
    ) {
      return {
        waterMl: "",
        waterLiters: "",
      };
    }

    const waterMl =
      weightValue * 35 +
      activityValue * 12;

    const waterLiters =
      waterMl / 1000;

    return {
      waterMl:
        waterMl.toFixed(0),

      waterLiters:
        waterLiters.toFixed(2),
    };
  }, [
    weight,
    activityMinutes,
  ]);

  return (
    <ToolBox>
      <ToolSection
        title={getText(ui.heading, lang)}
        description={getText(ui.helper, lang)}
      >
        <div className="space-y-4">
          <ToolInput
            type="number"
            value={weight}
            onChange={(event) =>
              setWeight(event.target.value)
            }
            placeholder={getText(
              ui.weight,
              lang
            )}
          />

          <ToolInput
            type="number"
            value={activityMinutes}
            onChange={(event) =>
              setActivityMinutes(
                event.target.value
              )
            }
            placeholder={getText(
              ui.activityMinutes,
              lang
            )}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-zinc-400">
                {getText(
                  ui.waterMl,
                  lang
                )}
              </p>

              <ToolResult
                value={result.waterMl}
                placeholder="0"
              />
            </div>

            <div>
              <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-zinc-400">
                {getText(
                  ui.waterLiters,
                  lang
                )}
              </p>

              <ToolResult
                value={result.waterLiters}
                placeholder="0.00"
              />
            </div>
          </div>
        </div>
      </ToolSection>
    </ToolBox>
  );
}