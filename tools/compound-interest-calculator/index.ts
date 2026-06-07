import CompoundInterestCalculatorTool from "./component";

import { compoundInterestCalculatorContent as compoundInterestCalculatorContentEn } from "./content.en";
import { compoundInterestCalculatorContent as compoundInterestCalculatorContentPt } from "./content.pt";

import { mergeToolContent } from "../mergeToolContent";

import type { ToolDefinition } from "../types";

const compoundInterestCalculatorContent = mergeToolContent(
  compoundInterestCalculatorContentEn,
  compoundInterestCalculatorContentPt
);

export const compoundInterestCalculatorTool: ToolDefinition = {
  id: "compound-interest-calculator",

  category: "calculators",

  featured: true,

  popular: true,

  difficulty: "basic",

  availableLanguages: ["en", "pt"],

  tags: [
    "compound interest",
    "investment",
    "finance",
    "future value",
    "returns",
    "calculator",
  ],

  relatedTools: [
    "investment-calculator",
    "savings-calculator",
    "retirement-calculator",
  ],

  ...compoundInterestCalculatorContent,

  component: CompoundInterestCalculatorTool,
};