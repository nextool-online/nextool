import TipCalculatorTool from "./component";
import { tipCalculatorContent } from "./content";

import type { ToolDefinition } from "../types";

export const tipCalculatorTool: ToolDefinition = {
  id: "tip-calculator",

  category: "calculators",

  featured: true,

  popular: true,

  difficulty: "basic",

  availableLanguages: ["en"],

  tags: [
    "tip",
    "gratuity",
    "restaurant",
    "bill",
    "calculator",
    "percentage",
  ],

  relatedTools: [
  "discount-calculator",
  "percentage-calculator",
  "percentage-increase-calculator",
  "average-calculator",
  ],

  ...tipCalculatorContent,

  component: TipCalculatorTool,
};