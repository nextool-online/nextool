import BodyFatCalculatorTool from "./component";

import { bodyFatCalculatorContent as bodyFatCalculatorContentEn } from "./content.en";
import { bodyFatCalculatorContent as bodyFatCalculatorContentPt } from "./content.pt";

import { mergeToolContent } from "../mergeToolContent";

import type { ToolDefinition } from "../types";

const bodyFatCalculatorContent = mergeToolContent(
  bodyFatCalculatorContentEn,
  bodyFatCalculatorContentPt
);

export const bodyFatCalculatorTool: ToolDefinition = {
  id: "body-fat-calculator",

  category: "calculators",

  featured: true,

  popular: true,

  difficulty: "basic",

  availableLanguages: ["en", "pt"],

  tags: [
    "body fat",
    "body fat percentage",
    "fitness",
    "health",
    "composition",
    "calculator",
  ],

  relatedTools: [
    "bmi-calculator",
    "bmr-calculator",
    "calorie-calculator",
  ],

  ...bodyFatCalculatorContent,

  component: BodyFatCalculatorTool,
};