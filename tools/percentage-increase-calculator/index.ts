import PercentageIncreaseCalculatorTool from "./component";
import { percentageIncreaseCalculatorContent } from "./content";

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
    "discount-calculator",
  ],

  ...percentageIncreaseCalculatorContent,

  component: PercentageIncreaseCalculatorTool,
};