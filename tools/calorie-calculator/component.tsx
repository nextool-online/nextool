"use client";
import ToolSelect from "../../components/toolkit/ToolSelect";
import { useMemo, useState } from "react";

import ToolBox from "../../components/ui/ToolBox";
import ToolInput from "../../components/toolkit/ToolInput";
import ToolResult from "../../components/toolkit/ToolResult";
import ToolSection from "../../components/toolkit/ToolSection";

import { getText } from "../../data/i18n";

import { calorieCalculatorContent } from "./content";

import type { ToolComponentProps } from "../types";

export default function CalorieCalculatorTool({
  lang,
}: ToolComponentProps) {
  const ui = calorieCalculatorContent.ui;

  const [gender, setGender] =
  useState("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activityLevel, setActivityLevel] =
  useState("1.2");

  const result = useMemo(() => {
    const ageValue = Number(age);
    const weightValue = Number(weight);
    const heightValue = Number(height);
    const activityValue = Number(activityLevel);

    if (
      !gender ||
      !age ||
      !weight ||
      !height ||
      !activityLevel
    ) {
      return {
        calories: "",
      };
    }

    let bmr = 0;

    if (
      gender.toLowerCase() === "male"
    ) {
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

    const calories =
      bmr * activityValue;

    return {
      calories:
        calories.toFixed(0),
    };
  }, [
    gender,
    age,
    weight,
    height,
    activityLevel,
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

  <ToolSelect
    value={activityLevel}
    onChange={(event) =>
      setActivityLevel(
        event.target.value
      )
    }
  >
    <option value="1.2">
      Sedentary
    </option>

    <option value="1.375">
      Lightly Active
    </option>

    <option value="1.55">
      Moderately Active
    </option>

    <option value="1.725">
      Very Active
    </option>

    <option value="1.9">
      Extra Active
    </option>
  </ToolSelect>

  <div>
    <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-zinc-400">
      {getText(
        ui.calories,
        lang
      )}
    </p>

    <ToolResult
      value={result.calories}
      placeholder="0"
    />
  </div>
</div>
            
      </ToolSection>
    </ToolBox>
  );
}