"use client";

import { useMemo, useState } from "react";

import ToolBox from "../../components/ui/ToolBox";
import ToolInput from "../../components/toolkit/ToolInput";
import ToolResult from "../../components/toolkit/ToolResult";
import ToolSection from "../../components/toolkit/ToolSection";
import ToolSelect from "../../components/toolkit/ToolSelect";

import { getText } from "../../data/i18n";

import { bmrCalculatorContent } from "./content";

import type { ToolComponentProps } from "../types";

export default function BmrCalculatorTool({
  lang,
}: ToolComponentProps) {
  const ui = bmrCalculatorContent.ui;

  const [gender, setGender] =
    useState("male");

  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const result = useMemo(() => {
    const ageValue = Number(age);
    const weightValue = Number(weight);
    const heightValue = Number(height);

    if (
      !age ||
      !weight ||
      !height
    ) {
      return {
        bmr: "",
      };
    }

    let bmr = 0;

    if (gender === "male") {
      bmr =
        10 * weightValue +
        6.25 * heightValue -
        5 * ageValue +
        5;
    } else {
      bmr =
        10 * weightValue +
        6.25 * heightValue -
        5 * ageValue -
        161;
    }

    return {
      bmr: bmr.toFixed(0),
    };
  }, [
    gender,
    age,
    weight,
    height,
  ]);

  return (
    <ToolBox>
      <ToolSection
        title={getText(ui.heading, lang)}
        description={getText(ui.helper, lang)}
      >
        <div className="space-y-4">
          <ToolSelect
            value={gender}
            onChange={(event) =>
              setGender(event.target.value)
            }
          >
            <option value="male">
              Male
            </option>

            <option value="female">
              Female
            </option>
          </ToolSelect>

          <ToolInput
            type="number"
            value={age}
            onChange={(event) =>
              setAge(event.target.value)
            }
            placeholder={getText(
              ui.age,
              lang
            )}
          />

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
            value={height}
            onChange={(event) =>
              setHeight(event.target.value)
            }
            placeholder={getText(
              ui.height,
              lang
            )}
          />

          <div>
            <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-zinc-400">
              {getText(
                ui.bmr,
                lang
              )}
            </p>

            <ToolResult
              value={result.bmr}
              placeholder="0"
            />
          </div>
        </div>
      </ToolSection>
    </ToolBox>
  );
}