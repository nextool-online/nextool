import PercentageIncreaseCalculatorTool from "./component";
import { percentageIncreaseCalculatorContent } from "./content.en";

import type { ToolDefinition } from "../types";

export const percentageIncreaseCalculatorTool: ToolDefinition = {
  id: "percentage-increase-calculator",

  category: "calculators",

  featured: true,

  popular: true,

  difficulty: "basic",

  availableLanguages: ["en"],

  tags: [
    "percentage increase",
    "growth",
    "percentage change",
    "calculator",
    "finance",
    "business",
  ],

  relatedTools: [
  "percentage-calculator",
  "percentage-difference-calculator",
  "discount-calculator",
  "rule-of-three",
  ],

  ...percentageIncreaseCalculatorContent,

  component: PercentageIncreaseCalculatorTool,
};