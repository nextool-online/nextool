import IdealWeightCalculatorTool from "./component";

import { idealWeightCalculatorContent as idealWeightCalculatorContentEn } from "./content.en";
import { idealWeightCalculatorContent as idealWeightCalculatorContentPt } from "./content.pt";

import { mergeToolContent } from "../mergeToolContent";

import type { ToolDefinition } from "../types";

const idealWeightCalculatorContent = mergeToolContent(
  idealWeightCalculatorContentEn,
  idealWeightCalculatorContentPt
);

export const idealWeightCalculatorTool: ToolDefinition = {
  id: "ideal-weight-calculator",
  category: "calculators",
  featured: true,
  popular: true,
  difficulty: "basic",
  availableLanguages: ["en", "pt"],
  tags: ["ideal weight", "healthy weight", "bmi", "fitness", "health", "calculator"],
  relatedTools: ["bmi-calculator", "calorie-calculator", "protein-calculator", "bmr-calculator"],
  ...idealWeightCalculatorContent,
  component: IdealWeightCalculatorTool,
};
