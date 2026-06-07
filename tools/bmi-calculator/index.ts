import BmiCalculatorTool from "./component";

import { bmiCalculatorContent as bmiCalculatorContentEn } from "./content.en";
import { bmiCalculatorContent as bmiCalculatorContentPt } from "./content.pt";

import type { ToolDefinition } from "../types";

import { mergeToolContent } from "../mergeToolContent";

const bmiCalculatorContent = mergeToolContent(
  bmiCalculatorContentEn,
  bmiCalculatorContentPt
);

export const bmiCalculatorTool: ToolDefinition = {
  id: "bmi-calculator",

  category: "calculators",

  featured: true,

  popular: true,

  difficulty: "basic",

  availableLanguages: ["en", "pt"],

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