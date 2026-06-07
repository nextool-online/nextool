"use client";

import { useMemo, useState } from "react";

import ToolBox from "../../components/ui/ToolBox";
import ToolInput from "../../components/toolkit/ToolInput";
import ToolResult from "../../components/toolkit/ToolResult";
import ToolSection from "../../components/toolkit/ToolSection";

import { getText } from "../../data/i18n";

import type { ToolComponentProps } from "../types";

export default function BmiCalculatorTool({
  lang,
  ui,
}: ToolComponentProps) {
  const toolUi = ui!;

  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const result = useMemo(() => {
    const weightValue = Number(weight);
    const heightValue = Number(height);

    if (!weightValue || !heightValue) {
      return {
        bmi: "",
        classification: "",
      };
    }

    const heightInMeters = heightValue / 100;

    const bmi =
      weightValue / (heightInMeters * heightInMeters);

    let classification = "";

    if (bmi < 18.5) {
      classification = "Underweight";
    } else if (bmi < 25) {
      classification = "Normal";
    } else if (bmi < 30) {
      classification = "Overweight";
    } else {
      classification = "Obesity";
    }

    return {
      bmi: bmi.toFixed(1),
      classification,
    };
  }, [weight, height]);

  return (
    <ToolBox>
      <ToolSection
        title={getText(toolUi.heading, lang)}
        description={getText(toolUi.helper, lang)}
      >
        <div className="space-y-5">
          <ToolInput
            type="number"
            value={weight}
            onChange={(event) =>
              setWeight(event.target.value)
            }
            placeholder={getText(toolUi.weight, lang)}
          />

          <ToolInput
            type="number"
            value={height}
            onChange={(event) =>
              setHeight(event.target.value)
            }
            placeholder={getText(toolUi.height, lang)}
          />

          <ToolResult
            value={
              result.bmi
                ? `${result.bmi} (${result.classification})`
                : ""
            }
            placeholder="0"
          />
        </div>
      </ToolSection>
    </ToolBox>
  );
}