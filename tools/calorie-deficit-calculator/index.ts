import CalorieDeficitCalculatorTool from "./component";

import { calorieDeficitCalculatorContent } from "./content.en";

import type { ToolDefinition } from "../types";

export const calorieDeficitCalculatorTool: ToolDefinition = {
  id: "calorie-deficit-calculator",
  category: "calculators",
  featured: true,
  popular: true,
  difficulty: "basic",
  availableLanguages: ["en"],
  tags: ["calorie deficit", "calories", "tdee", "nutrition", "fitness", "weight loss", "calculator"],
  relatedTools: ["calorie-calculator", "bmr-calculator", "bmi-calculator", "macro-calculator"],
  ...calorieDeficitCalculatorContent,
  component: CalorieDeficitCalculatorTool,
};
