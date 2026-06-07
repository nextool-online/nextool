import BreakEvenCalculatorTool from "./component";

import { breakEvenCalculatorContent as breakEvenCalculatorContentEn } from "./content.en";
import { breakEvenCalculatorContent as breakEvenCalculatorContentPt } from "./content.pt";

import { mergeToolContent } from "../mergeToolContent";

import type { ToolDefinition } from "../types";

const breakEvenCalculatorContent = mergeToolContent(
  breakEvenCalculatorContentEn,
  breakEvenCalculatorContentPt
);

export const breakEvenCalculatorTool: ToolDefinition = {
  id: "break-even-calculator",

  category: "calculators",

  featured: true,

  popular: true,

  difficulty: "basic",

  availableLanguages: ["en", "pt"],

  tags: [
    "break even",
    "profitability",
    "business",
    "finance",
    "revenue",
    "calculator",
  ],

  relatedTools: [
    "roi-calculator",
    "investment-calculator",
    "loan-calculator",
  ],

  ...breakEvenCalculatorContent,

  component: BreakEvenCalculatorTool,
};