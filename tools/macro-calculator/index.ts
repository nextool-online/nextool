import MacroCalculatorTool from "./component";

import { macroCalculatorContent as macroCalculatorContentEn } from "./content.en";
import { macroCalculatorContent as macroCalculatorContentPt } from "./content.pt";

import { mergeToolContent } from "../mergeToolContent";

import type { ToolDefinition } from "../types";

const macroCalculatorContent = mergeToolContent(
  macroCalculatorContentEn,
  macroCalculatorContentPt
);

export const macroCalculatorTool: ToolDefinition = {
  id: "macro-calculator",
  category: "calculators",
  featured: true,
  popular: true,
  difficulty: "basic",
  availableLanguages: ["en", "pt"],
  tags: ["macros", "protein", "carbs", "fat", "nutrition", "fitness", "calculator"],
  relatedTools: ["calorie-calculator", "protein-calculator", "body-fat-calculator", "water-intake-calculator"],
  ...macroCalculatorContent,
  component: MacroCalculatorTool,
};
