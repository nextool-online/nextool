import BmrCalculatorTool from "./component";

import { bmrCalculatorContent as bmrCalculatorContentEn } from "./content.en";
import { bmrCalculatorContent as bmrCalculatorContentPt } from "./content.pt";

import { mergeToolContent } from "../mergeToolContent";

import type { ToolDefinition } from "../types";

const bmrCalculatorContent = mergeToolContent(
  bmrCalculatorContentEn,
  bmrCalculatorContentPt
);

export const bmrCalculatorTool: ToolDefinition = {
  id: "bmr-calculator",

  category: "calculators",

  featured: true,

  popular: true,

  difficulty: "basic",

  availableLanguages: ["en", "pt"],

  tags: [
    "bmr",
    "basal metabolic rate",
    "metabolism",
    "calories",
    "fitness",
    "calculator",
  ],

  relatedTools: [
    "bmi-calculator",
    "calorie-calculator",
    "body-fat-calculator",
  ],

  ...bmrCalculatorContent,

  component: BmrCalculatorTool,
};