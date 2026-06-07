import AgeCalculatorTool from "./component";

import { ageCalculatorContent as ageCalculatorContentEn } from "./content.en";
import { ageCalculatorContent as ageCalculatorContentPt } from "./content.pt";

import { mergeToolContent } from "../mergeToolContent";

import type { ToolDefinition } from "../types";

const ageCalculatorContent = mergeToolContent(
  ageCalculatorContentEn,
  ageCalculatorContentPt
);

export const ageCalculatorTool: ToolDefinition = {
  id: "age-calculator",

  category: "calculators",

  featured: true,

  popular: true,

  difficulty: "basic",

  availableLanguages: ["en", "pt"],

  tags: [
    "age",
    "birth date",
    "date calculator",
    "years",
    "months",
    "days",
    "calculator",
  ],

  relatedTools: [
    "average-calculator",
    "bmi-calculator",
    "calorie-calculator",
  ],

  ...ageCalculatorContent,

  component: AgeCalculatorTool,
};