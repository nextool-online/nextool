import WaterIntakeCalculatorTool from "./component";

import { waterIntakeCalculatorContent as waterIntakeCalculatorContentEn } from "./content.en";
import { waterIntakeCalculatorContent as waterIntakeCalculatorContentPt } from "./content.pt";

import { mergeToolContent } from "../mergeToolContent";

import type { ToolDefinition } from "../types";

const waterIntakeCalculatorContent =
  mergeToolContent(
    waterIntakeCalculatorContentEn,
    waterIntakeCalculatorContentPt
  );

export const waterIntakeCalculatorTool: ToolDefinition = {
  id: "water-intake-calculator",

  category: "calculators",

  featured: true,

  popular: true,

  difficulty: "basic",

  availableLanguages: ["en", "pt"],

  tags: [
    "water",
    "hydration",
    "health",
    "fitness",
    "water intake",
    "daily water",
    "calculator",
  ],

  relatedTools: [
    "bmi-calculator",
    "calorie-calculator",
    "body-fat-calculator",
  ],

  ...waterIntakeCalculatorContent,

  component: WaterIntakeCalculatorTool,
};