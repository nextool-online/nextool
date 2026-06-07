import SavingsCalculatorTool from "./component";

import { savingsCalculatorContent as savingsCalculatorContentEn } from "./content.en";
import { savingsCalculatorContent as savingsCalculatorContentPt } from "./content.pt";

import { mergeToolContent } from "../mergeToolContent";

import type { ToolDefinition } from "../types";

const savingsCalculatorContent =
  mergeToolContent(
    savingsCalculatorContentEn,
    savingsCalculatorContentPt
  );

export const savingsCalculatorTool: ToolDefinition = {
  id: "savings-calculator",

  category: "calculators",

  featured: true,

  popular: true,

  difficulty: "basic",

  availableLanguages: ["en", "pt"],

  tags: [
    "savings",
    "interest",
    "compound interest",
    "future value",
    "financial planning",
    "money",
    "calculator",
  ],

  relatedTools: [
    "compound-interest-calculator",
    "investment-calculator",
    "retirement-calculator",
  ],

  ...savingsCalculatorContent,

  component: SavingsCalculatorTool,
};