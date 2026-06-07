"use client";

import { useMemo, useState } from "react";

import ToolBox from "../../components/ui/ToolBox";
import ToolInput from "../../components/toolkit/ToolInput";
import ToolResult from "../../components/toolkit/ToolResult";
import ToolSection from "../../components/toolkit/ToolSection";

import { getText } from "../../data/i18n";

import type { ToolComponentProps } from "../types";

export default function AgeCalculatorTool({
  lang,
  ui,
}: ToolComponentProps) {
  const toolUi = ui!;

  return (
    <ToolBox>
      <ToolSection
        title={getText(toolUi.heading, lang)}
        description={getText(toolUi.helper, lang)}
      >
        <AgeCalculatorForm lang={lang} ui={toolUi} />
      </ToolSection>
    </ToolBox>
  );
}

type AgeCalculatorFormProps = {
  lang: ToolComponentProps["lang"];
  ui: NonNullable<ToolComponentProps["ui"]>;
};

function AgeCalculatorForm({
  lang,
  ui,
}: AgeCalculatorFormProps) {
  const [birthDate, setBirthDate] = useState("");

  const result = useMemo(() => {
    if (!birthDate) {
      return {
        years: "",
        months: "",
        days: "",
      };
    }

    const birth = new Date(birthDate);
    const today = new Date();

    if (birth > today || Number.isNaN(birth.getTime())) {
      return {
        years: "",
        months: "",
        days: "",
      };
    }

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;

      const previousMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        0
      );

      days += previousMonth.getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    return {
      years: years.toString(),
      months: months.toString(),
      days: days.toString(),
    };
  }, [birthDate]);

  return (
    <div className="space-y-5">
      <ToolInput
        type="date"
        value={birthDate}
        onChange={(event) => setBirthDate(event.target.value)}
        placeholder={getText(ui.birthDate, lang)}
      />

      <div className="grid gap-3 md:grid-cols-3">
        <div>
          <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-zinc-400">
            {getText(ui.years, lang)}
          </p>

          <ToolResult value={result.years} placeholder="0" />
        </div>

        <div>
          <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-zinc-400">
            {getText(ui.months, lang)}
          </p>

          <ToolResult value={result.months} placeholder="0" />
        </div>

        <div>
          <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-zinc-400">
            {getText(ui.days, lang)}
          </p>

          <ToolResult value={result.days} placeholder="0" />
        </div>
      </div>
    </div>
  );
}