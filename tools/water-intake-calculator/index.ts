import WaterIntakeCalculatorTool from "./component";
import { waterIntakeCalculatorContent } from "./content";

import type { ToolDefinition } from "../types";

export const waterIntakeCalculatorTool: ToolDefinition = {
  id: "water-intake-calculator",

  category: "calculators",

  featured: true,

  popular: true,

  isNew: true,

  difficulty: "basic",

  availableLanguages: ["en"],

  relatedTools: [
  "bmi-calculator",
  "calorie-calculator",
  "bmr-calculator",
  "body-fat-calculator",
  ],

  tags: [
    "water",
    "hydration",
    "health",
    "fitness",
    "daily water",
    "calculator",
  ],

  ...waterIntakeCalculatorContent,

  component: WaterIntakeCalculatorTool,
};