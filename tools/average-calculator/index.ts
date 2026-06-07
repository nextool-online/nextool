import AverageCalculatorTool from "./component";

import { averageCalculatorContent as averageCalculatorContentEn } from "./content.en";
import { averageCalculatorContent as averageCalculatorContentPt } from "./content.pt";

import { mergeToolContent } from "../mergeToolContent";

import type { ToolDefinition } from "../types";

const averageCalculatorContent = mergeToolContent(
  averageCalculatorContentEn,
  averageCalculatorContentPt
);

export const averageCalculatorTool: ToolDefinition = {
  id: "average-calculator",

  category: "calculators",

  featured: true,

  popular: true,

  difficulty: "basic",

  availableLanguages: ["en", "pt"],

  tags: [
    "average",
    "mean",
    "arithmetic mean",
    "statistics",
    "calculator",
  ],

  relatedTools: [
    "percentage-calculator",
    "age-calculator",
    "bmi-calculator",
  ],

  ...averageCalculatorContent,

  component: AverageCalculatorTool,
};