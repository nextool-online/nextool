import BodyFatCalculatorTool from "./component";
import { bodyFatCalculatorContent } from "./content.en";

import type { ToolDefinition } from "../types";

export const bodyFatCalculatorTool: ToolDefinition = {
  id: "body-fat-calculator",

  category: "calculators",

  featured: true,

  popular: true,

  isNew: true,

  difficulty: "intermediate",

  availableLanguages: ["en"],

  relatedTools: [
  "bmi-calculator",
  "calorie-calculator",
  "bmr-calculator",
  "water-intake-calculator",
  ],

  tags: [
    "body fat",
    "fitness",
    "health",
    "body composition",
    "nutrition",
    "calculator",
  ],

  ...bodyFatCalculatorContent,

  component: BodyFatCalculatorTool,
};