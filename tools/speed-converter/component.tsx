"use client";

import { useMemo, useState } from "react";

import ToolBox from "../../components/ui/ToolBox";
import ToolInput from "../../components/toolkit/ToolInput";
import ToolResult from "../../components/toolkit/ToolResult";
import ToolSection from "../../components/toolkit/ToolSection";

import { getText } from "../../data/i18n";

import type { ToolComponentProps } from "../types";

const units = {
  "m/s": 1,
  "km/h": 0.277777778,
  mph: 0.44704,
  knots: 0.514444,
};

export default function SpeedConverterTool({
  lang,
  ui,
}: ToolComponentProps) {
  const toolUi = ui!;

  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("km/h");
  const [toUnit, setToUnit] = useState("mph");

  const result = useMemo(() => {
    const numericValue = Number(value);

    if (!numericValue && value !== "0") {
      return "";
    }

    const baseValue =
      numericValue *
      units[fromUnit as keyof typeof units];

    const converted =
      baseValue /
      units[toUnit as keyof typeof units];

    return Number.isInteger(converted)
      ? converted.toString()
      : converted.toFixed(6).replace(/\.?0+$/, "");
  }, [
    value,
    fromUnit,
    toUnit,
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
        <div className="space-y-5">
          <ToolInput
            type="number"
            value={value}
            onChange={(event) =>
              setValue(
                event.target.value
              )
            }
            placeholder={getText(
              toolUi.value,
              lang
            )}
          />

          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-700">
                {getText(
                  toolUi.from,
                  lang
                )}
              </label>

              <select
                value={fromUnit}
                onChange={(event) =>
                  setFromUnit(
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-zinc-300 bg-white p-3 font-semibold"
              >
                {Object.keys(units).map((unit) => (
                  <option
                    key={unit}
                    value={unit}
                  >
                    {unit}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-700">
                {getText(
                  toolUi.to,
                  lang
                )}
              </label>

              <select
                value={toUnit}
                onChange={(event) =>
                  setToUnit(
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-zinc-300 bg-white p-3 font-semibold"
              >
                {Object.keys(units).map((unit) => (
                  <option
                    key={unit}
                    value={unit}
                  >
                    {unit}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <ToolResult
            value={
              result
                ? `${result} ${toUnit}`
                : ""
            }
            placeholder="0"
          />
        </div>
      </ToolSection>
    </ToolBox>
  );
}