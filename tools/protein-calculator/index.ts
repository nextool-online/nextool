import ProteinCalculatorTool from "./component";

import { proteinCalculatorContent as proteinCalculatorContentEn } from "./content.en";
import { proteinCalculatorContent as proteinCalculatorContentPt } from "./content.pt";

import { mergeToolContent } from "../mergeToolContent";

import type { ToolDefinition } from "../types";

const proteinCalculatorContent = mergeToolContent(
  proteinCalculatorContentEn,
  proteinCalculatorContentPt
);

export const proteinCalculatorTool: ToolDefinition = {
  id: "protein-calculator",
  category: "calculators",
  featured: true,
  popular: true,
  difficulty: "basic",
  availableLanguages: ["en", "pt"],
  tags: ["protein", "nutrition", "fitness", "muscle gain", "weight loss", "calculator"],
  relatedTools: ["calorie-calculator", "bmr-calculator", "water-intake-calculator", "bmi-calculator"],
  ...proteinCalculatorContent,
  component: ProteinCalculatorTool,
};
