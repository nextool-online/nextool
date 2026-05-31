import BmiCalculatorTool from "./component";
import { bmiCalculatorContent } from "./content";

import type { ToolDefinition } from "../types";

export const bmiCalculatorTool: ToolDefinition = {
  id: "bmi-calculator",

  category: "calculators",

  featured: true,

  popular: true,

  difficulty: "basic",

  availableLanguages: ["en"],

  tags: [
    "bmi",
    "body mass index",
    "health",
    "weight",
    "fitness",
    "calculator",
  ],

  relatedTools: [
    "age-calculator",
    "unit-converter",
  ],

  ...bmiCalculatorContent,

  component: BmiCalculatorTool,
};