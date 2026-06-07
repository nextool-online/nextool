import PercentageIncreaseCalculatorTool from "./component";

import { percentageIncreaseCalculatorContent as percentageIncreaseCalculatorContentEn } from "./content.en";
import { percentageIncreaseCalculatorContent as percentageIncreaseCalculatorContentPt } from "./content.pt";

import { mergeToolContent } from "../mergeToolContent";

import type { ToolDefinition } from "../types";

const percentageIncreaseCalculatorContent =
  mergeToolContent(
    percentageIncreaseCalculatorContentEn,
    percentageIncreaseCalculatorContentPt
  );

export const percentageIncreaseCalculatorTool: ToolDefinition = {
  id: "percentage-increase-calculator",

  category: "calculators",

  featured: true,

  popular: true,

  difficulty: "basic",

  availableLanguages: ["en", "pt"],

  tags: [
    "percentage increase",
    "growth",
    "percentage change",
    "increase",
    "calculator",
    "finance",
    "business",
  ],

  relatedTools: [
    "percentage-calculator",
    "percentage-difference-calculator",
    "roi-calculator",
  ],

  ...percentageIncreaseCalculatorContent,

  component: PercentageIncreaseCalculatorTool,
};