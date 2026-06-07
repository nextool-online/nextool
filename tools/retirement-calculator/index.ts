import RetirementCalculatorTool from "./component";

import { retirementCalculatorContent as retirementCalculatorContentEn } from "./content.en";
import { retirementCalculatorContent as retirementCalculatorContentPt } from "./content.pt";

import { mergeToolContent } from "../mergeToolContent";

import type { ToolDefinition } from "../types";

const retirementCalculatorContent =
  mergeToolContent(
    retirementCalculatorContentEn,
    retirementCalculatorContentPt
  );

export const retirementCalculatorTool: ToolDefinition = {
  id: "retirement-calculator",

  category: "calculators",

  featured: true,

  popular: true,

  difficulty: "intermediate",

  availableLanguages: ["en", "pt"],

  tags: [
    "retirement",
    "retirement planning",
    "financial independence",
    "investing",
    "savings",
    "future value",
    "calculator",
  ],

  relatedTools: [
    "investment-calculator",
    "compound-interest-calculator",
    "savings-calculator",
  ],

  ...retirementCalculatorContent,

  component: RetirementCalculatorTool,
};