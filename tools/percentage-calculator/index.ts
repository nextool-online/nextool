import PercentageCalculator from "./component";

import { percentageCalculatorContent as percentageCalculatorContentEn } from "./content.en";
import { percentageCalculatorContent as percentageCalculatorContentPt } from "./content.pt";

import { mergeToolContent } from "../mergeToolContent";

import type { ToolDefinition } from "../types";

const percentageCalculatorContent = mergeToolContent(
  percentageCalculatorContentEn,
  percentageCalculatorContentPt
);

export const percentageCalculatorTool: ToolDefinition = {
  id: "percentage-calculator",

  category: "calculators",

  featured: true,

  popular: true,

  difficulty: "basic",

  availableLanguages: ["en", "pt"],

  tags: [
    "percentage",
    "percent",
    "discount",
    "math",
    "calculator",
    "proportion",
    "finance",
  ],

  relatedTools: [
    "percentage-increase-calculator",
    "percentage-difference-calculator",
    "discount-calculator",
  ],

  ...percentageCalculatorContent,

  component: PercentageCalculator,
};