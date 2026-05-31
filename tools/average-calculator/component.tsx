"use client";

import ToolBox from "../../components/ui/ToolBox";
import { getText } from "../../data/i18n";

import { averageCalculatorContent } from "./content";

import type { ToolComponentProps } from "../types";

export default function AverageCalculatorTool({ lang }: ToolComponentProps) {
  const ui = averageCalculatorContent.ui;

  return (
    <ToolBox>
      <div className="mb-5">
        <h2 className="text-xl font-bold md:text-2xl">
          {getText(ui.heading, lang)}
        </h2>

        <p className="mt-2 text-sm text-zinc-600">
          {getText(ui.helper, lang)}
        </p>
      </div>

      <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-6 text-sm text-zinc-500">
        Build the tool UI here.
      </div>
    </ToolBox>
  );
}
