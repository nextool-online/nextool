import BmrCalculatorTool from "./component";
import { bmrCalculatorContent } from "./content";

import type { ToolDefinition } from "../types";

export const bmrCalculatorTool: ToolDefinition = {
  id: "bmr-calculator",

  category: "calculators",

  featured: true,

  popular: true,

  isNew: true,

  difficulty: "basic",

  availableLanguages: ["en"],

  relatedTools: [
    "calorie-calculator",
    "bmi-calculator",
  ],

  tags: [
    "bmr",
    "basal metabolic rate",
    "health",
    "fitness",
    "nutrition",
    "calculator",
  ],

  ...bmrCalculatorContent,

  component: BmrCalculatorTool,
};