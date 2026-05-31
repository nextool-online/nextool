import PercentageCalculator from "./component";
import { percentageCalculatorContent } from "./content";

import type { ToolDefinition } from "../types";

export const percentageCalculatorTool: ToolDefinition = {
  id: "percentage-calculator",

  category: "calculators",
  featured: true,

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

  relatedTools: ["rule-of-three"],

  ...percentageCalculatorContent,

  component: PercentageCalculator,
};