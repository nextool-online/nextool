import CalorieCalculatorTool from "./component";

import { calorieCalculatorContent as calorieCalculatorContentEn } from "./content.en";
import { calorieCalculatorContent as calorieCalculatorContentPt } from "./content.pt";

import { mergeToolContent } from "../mergeToolContent";

import type { ToolDefinition } from "../types";

const calorieCalculatorContent = mergeToolContent(
  calorieCalculatorContentEn,
  calorieCalculatorContentPt
);

export const calorieCalculatorTool: ToolDefinition = {
  id: "calorie-calculator",

  category: "calculators",

  featured: true,

  popular: true,

  difficulty: "basic",

  availableLanguages: ["en", "pt"],

  tags: [
    "calories",
    "tdee",
    "nutrition",
    "fitness",
    "weight loss",
    "calculator",
  ],

  relatedTools: [
    "bmr-calculator",
    "bmi-calculator",
    "body-fat-calculator",
  ],

  ...calorieCalculatorContent,

  component: CalorieCalculatorTool,
};