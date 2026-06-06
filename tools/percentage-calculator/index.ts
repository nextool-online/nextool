import PercentageCalculator from "./component";
import { percentageCalculatorContent } from "./content.en";

import type { ToolDefinition } from "../types";

export const percentageCalculatorTool: ToolDefinition = {
  id: "percentage-calculator",

  category: "calculators",

  featured: true,

  popular: true,

  difficulty: "basic",

  availableLanguages: ["en"],

  tags: [
    "percentage",
    "percent",
    "math",
    "calculator",
    "discount",
    "finance",
  ],

  relatedTools: [
  "percentage-increase-calculator",
  "percentage-difference-calculator",
  "discount-calculator",
  "rule-of-three",
  ],

  ...percentageCalculatorContent,

  component: PercentageCalculator,
};