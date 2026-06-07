import PercentageDifferenceCalculatorTool from "./component";

import { percentageDifferenceCalculatorContent as percentageDifferenceCalculatorContentEn } from "./content.en";
import { percentageDifferenceCalculatorContent as percentageDifferenceCalculatorContentPt } from "./content.pt";

import { mergeToolContent } from "../mergeToolContent";

import type { ToolDefinition } from "../types";

const percentageDifferenceCalculatorContent =
  mergeToolContent(
    percentageDifferenceCalculatorContentEn,
    percentageDifferenceCalculatorContentPt
  );

export const percentageDifferenceCalculatorTool: ToolDefinition = {
  id: "percentage-difference-calculator",

  category: "calculators",

  featured: true,

  popular: true,

  difficulty: "basic",

  availableLanguages: ["en", "pt"],

  tags: [
    "percentage difference",
    "difference",
    "comparison",
    "variation",
    "math",
    "calculator",
  ],

  relatedTools: [
    "percentage-calculator",
    "percentage-increase-calculator",
    "average-calculator",
  ],

  ...percentageDifferenceCalculatorContent,

  component: PercentageDifferenceCalculatorTool,
};