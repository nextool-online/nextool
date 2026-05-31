import PercentageIncreaseCalculatorTool from "./component";
import { percentageIncreaseCalculatorContent } from "./content";

import type { ToolDefinition } from "../types";

export const percentageIncreaseCalculatorTool: ToolDefinition = {
  id: "percentage-increase-calculator",

  category: "calculators",

  featured: true,

  availableLanguages: ["en"],

  relatedTools: [
    "percentage-calculator",
    "discount-calculator",
  ],

  ...percentageIncreaseCalculatorContent,

  component: PercentageIncreaseCalculatorTool,
};