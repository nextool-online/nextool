import BmiCalculatorTool from "./component";
import { bmiCalculatorContent } from "./content.en";

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
  "calorie-calculator",
  "bmr-calculator",
  "body-fat-calculator",
  "water-intake-calculator",
  ],

  ...bmiCalculatorContent,

  component: BmiCalculatorTool,
};