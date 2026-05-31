import PercentageCalculator from "./component";
import { percentageCalculatorContent } from "./content";

import type { ToolDefinition } from "../types";

export const percentageCalculatorTool: ToolDefinition = {
  id: "percentage-calculator",

  category: "calculators",

  featured: true,

  popular: true,

  difficulty: "basic",

  availableLanguages: [
    "en",
    "it",
    "pt",
    "es",
    "fr",
    "de",
    "ro",
    "pl",
    "nl",
    "tr",
    "ar",
  ],

  tags: [
    "percentage",
    "percent",
    "math",
    "calculator",
    "discount",
    "finance",
  ],

  relatedTools: [
    "rule-of-three",
    "discount-calculator",
    "percentage-increase-calculator",
  ],

  ...percentageCalculatorContent,

  component: PercentageCalculator,
};