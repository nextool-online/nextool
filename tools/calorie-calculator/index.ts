import CalorieCalculatorTool from "./component";
import { calorieCalculatorContent } from "./content";

import type { ToolDefinition } from "../types";

export const calorieCalculatorTool: ToolDefinition = {
  id: "calorie-calculator",

  category: "calculators",

  featured: true,

  popular: true,

  isNew: true,

  difficulty: "intermediate",

  availableLanguages: ["en"],

  relatedTools: [
  "bmi-calculator",
  "bmr-calculator",
  "body-fat-calculator",
  "water-intake-calculator",
  ],

  tags: [
    "calories",
    "diet",
    "nutrition",
    "fitness",
    "health",
    "calculator",
  ],

  ...calorieCalculatorContent,

  component: CalorieCalculatorTool,
};